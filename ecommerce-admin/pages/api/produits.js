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
        const { title, price, description, categorie, proprietes } = req.body;
        const produitAdd = await Produit.create({

            title, price, description, categorie, proprietes,

        })
        res.json(produitAdd);
    }
    if (method === 'PUT') {
        const { title, price, description, categorie, proprietes, _id } = req.body;
        await Produit.updateOne({ _id }, { title, price, description, categorie, proprietes })

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {

            await Produit.deleteOne({ _id: req.query?.id });

            res.json(true);
        }
    }

}
