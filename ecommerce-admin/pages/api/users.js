import { mongooseConnect } from "@/lib/mongoose";
import { Utilisateur } from "@/models/user";


export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();


    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Utilisateur.findOne({ _id: req.query.id }));
        } else {
            res.json(await Utilisateur.find());
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {

            await Utilisateur.deleteOne({ _id: req.query?.id });

            res.json(true);
        }
    }

}