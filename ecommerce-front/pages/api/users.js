import { Utilisateur } from '@/models/user';
import { mongooseConnect } from '@/lib/mongoose';
import Cookies from 'cookies';

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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
