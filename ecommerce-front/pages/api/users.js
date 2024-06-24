import { mongooseConnect } from "@/lib/mongoose";
import Utilisateur from "@/models/user";

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

  if (method === 'POST') {
    const { firstname, name, email, password } = req.body;
    try {
      const existingutilisateur = await Utilisateur.findOne({ email });
      if (existingutilisateur) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      }


      const utilisateurAdd = await Utilisateur.create({
        firstname,
        name,
        email,
        password,
      });
      res.status(201).json(utilisateurAdd);
    } catch (error) {
      res.status(500).json({ message: 'Erreur du serveur', error });
    }
  }
}
