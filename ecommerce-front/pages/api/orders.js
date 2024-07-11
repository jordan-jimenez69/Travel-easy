import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await mongooseConnect();

        const { firstname, name, ville, codePost, adresse, pays, products } = req.body;

        console.log("Request body:", req.body);

        const newOrder = new Order({
            firstname,
            name,
            ville,
            codePost,
            adresse,
            pays,
            products
        });

        try {
            await newOrder.save();
            res.status(201).send('Order created successfully');
        } catch (error) {
            console.error("Error saving order:", error);
            res.status(500).json({ error: 'Error creating order', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
