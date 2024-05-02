import { Categorie } from "@/models/categorie";


export default async function handle(req, res) {
    const { method } = req;

    if (method === 'POST') {
        const { name } = req.body;
        const categorieAdd = await Categorie.create({
             name 
        })
        res.json(categorieAdd);
    }
}
