import { Categorie } from "@/models/categorie";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Categorie.findOne({ _id: req.query.id }));
        } else {
            res.json(await Categorie.find());
        }
    }

    if (method === 'POST') {
        const { name } = req.body;
        const categorieAdd = await Categorie.create({
             name 
        })
        res.json(categorieAdd);
    }
}
