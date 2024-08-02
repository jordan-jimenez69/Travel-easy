import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import Stripe from 'stripe';
import { Produit } from '@/models/produit';

const stripe = new Stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await mongooseConnect();

            const { userId, firstname, name, ville, codePost, adresse, pays, products } = req.body;

            if (!userId) {
                return res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis.' });
            }

            // Créer une nouvelle commande dans MongoDB
            const newOrder = new Order({
                userId,
                firstname,
                name,
                ville,
                codePost,
                adresse,
                pays,
                products: products.map(p => p._id), // Stocker uniquement les IDs des produits
            });

            // Enregistrer la nouvelle commande dans MongoDB
            await newOrder.save();

            // Récupérer l'ID de la commande MongoDB
            const orderId = newOrder._id.toString(); // Convertir ObjectId en string

            // Construire les line_items pour la session Stripe
            const line_items = [];
            const productIds = products.map(p => p._id);

            // Récupérer les informations détaillées sur les produits depuis MongoDB
            const productsInfos = await Produit.find({ _id: { $in: productIds } });

            // Construction de line_items à partir des produits sélectionnés
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

            // Créer une session Stripe pour le paiement
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${req.headers.origin}/success?orderId=${orderId}`,
                cancel_url: `${req.headers.origin}/cancel?orderId=${orderId}`,
                metadata: {
                    orderId: orderId, // Associer l'ID de la commande MongoDB avec la session Stripe
                },
            });

            // Retourner l'URL de la session Stripe à utiliser sur le frontend
            res.status(201).json({ url: session.url });

        } catch (error) {
            console.error("Erreur lors de la création de la session Stripe :", error);
            res.status(500).json({ error: 'Erreur lors de la création de la commande', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
