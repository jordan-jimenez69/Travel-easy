import { mongooseConnect } from "@/lib/mongoose";
import Utilisateur from "@/models/user";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await Utilisateur.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      res.status(200).json({ message: 'Connexion réussie', userId: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${method} non autorisée`);
  }
}
