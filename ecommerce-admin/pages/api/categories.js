import { Categorie } from "@/models/categorie";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Categorie.findOne({ _id: req.query.id }));
        } else {
            res.json(await Categorie.find().populate('parent'));
        }
    }

    if (method === 'POST') {
        const { name, parentCategorie } = req.body;
        const categorieAdd = await Categorie.create({
            name, parent: parentCategorie,
        })
        res.json(categorieAdd);
    }


    if (method === 'PUT') {
        const { name, parentCategorie,_id } = req.body;
        const categorieAdd = await Categorie.updateOne({_id},{
            name, parent: parentCategorie,
        })
        res.json(categorieAdd);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {

            await Categorie.deleteOne({ _id: req.query?.id });

            res.json(true);
        }
    }

}
