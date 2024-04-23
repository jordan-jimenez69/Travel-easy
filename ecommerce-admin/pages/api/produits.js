import { mongooseConnect } from "@/lib/mongoose";
import { Produit } from "@/models/produit";


export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    //récupéré toute les produits
    /*if (method === 'GET') {
        res.json(await Produit.find());
    }*/


    if (method === 'GET') {
        if (req.query?.id){
            res.json(await Produit.findOne({_id:req.query.id}));
        } else {
            res.json(await Produit.find());
        }
    }

    if (method === 'POST') {
        const { title, level, price, description } = req.body;
        const produitAdd = await Produit.create({

            title, level, price, description

        })
        res.json(produitAdd);
    }
}