import { Utilisateur } from '@/models/user';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  console.log('Handler called with method:', req.method);

  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('Request body:', req.body);

    if (!email || !password) {
      console.log('Email ou mot de passe manquant');
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    try {
      await mongooseConnect();

      const user = await Utilisateur.findOne({ email });
      if (!user) {
        console.log('Utilisateur non trouvé');
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        console.log('Mot de passe incorrect');
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      res.status(200).json({ _id: user._id, firstname: user.firstname, name: user.name, email: user.email });
    } catch (error) {
      console.error('Erreur de connexion :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
