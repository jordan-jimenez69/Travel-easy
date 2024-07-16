import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import Stripe from 'stripe';
import { Produit } from '@/models/produit';

const stripe = new Stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await mongooseConnect();

            const { firstname, name, ville, codePost, adresse, pays, products } = req.body;

            console.log("Request body:", req.body);

            const uniqueIds = [...new Set(products.map(p => p._id))];
            const productsInfos = await Produit.find({ _id: { $in: uniqueIds } });

            let line_items = [];
            for (const product of products) {
                const productInfo = productsInfos.find(p => p._id.toString() === product._id);
                const quantity = product.quantity;
                if (quantity > 0 && productInfo) {
                    line_items.push({
                        price_data: {
                            currency: 'usd',
                            product_data: { name: productInfo.title },
                            unit_amount: productInfo.price * 100,
                        },
                        quantity: quantity
                    });
                }
            }

            const newOrder = new Order({
                firstname,
                name,
                ville,
                codePost,
                adresse,
                pays,
                products: products.map(p => p._id) // Sauvegarder seulement les IDs
            });
            await newOrder.save();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cancel`,
            });

            res.status(201).json({ url: session.url });
        } catch (error) {
            console.error("Error creating Stripe session:", error);
            res.status(500).json({ error: 'Error creating order', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
