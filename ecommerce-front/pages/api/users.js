import { Utilisateur } from '@/models/user';
import { mongooseConnect } from '@/lib/mongoose';
import Cookies from 'cookies';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  console.log('Handler called with method:', req.method);
  await mongooseConnect();

  if (req.method === 'GET') {
    const cookies = new Cookies(req, res);
    const userId = cookies.get('userId');

    if (userId) {
      try {
        const user = await Utilisateur.findById(userId).select('-password');
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
      }
    } else {
      console.log('Non autorisé, pas de userId');
      res.status(401).json({ message: 'Non autorisé' });
    }
  } else if (req.method === 'POST') {
    const { firstname, name, email, password } = req.body;
    console.log('Request body:', req.body);

    if (!firstname || !name || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
      const existingUser = await Utilisateur.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Utilisateur({ firstname, name, email, password: hashedPassword });
      await newUser.save();

      const cookies = new Cookies(req, res);
      cookies.set('userId', newUser._id.toString(), {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        path: '/',
      });
      console.log('Cookie userId défini:', newUser._id.toString());

      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
