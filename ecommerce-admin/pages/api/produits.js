import { mongooseConnect } from "@/lib/mongoose";
import { Produit } from "@/models/produit";


export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Produit.find());
    }

    if (method === 'POST') {
        const { title, level, price, description } = req.body;
        const produitAdd = await Produit.create({

            title, level, price, description

        })
        res.json(produitAdd);
    }
}