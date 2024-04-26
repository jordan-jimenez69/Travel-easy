import { mongooseConnect } from "@/lib/mongoose";
import { Produit } from "@/models/produit";


export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();


    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Produit.findOne({ _id: req.query.id }));
        } else {
            res.json(await Produit.find());
        }
    }

    if (method === 'POST') {
        const { title, level, price, description, saison } = req.body;
        const produitAdd = await Produit.create({

            title, level, price, description, saison

        })
        res.json(produitAdd);
    }
    if (method === 'PUT') {
        const { title, level, price, description, saison, _id } = req.body;
        await Produit.updateOne({ _id }, { title, level, price, description, saison })

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {

            await Produit.deleteOne({ _id: req.query?.id });

            res.json(true);
        }
    }

}
