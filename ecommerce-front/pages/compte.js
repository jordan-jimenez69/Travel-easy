import { useContext, useEffect } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/router';
import Navbar from '@/composants/navbar';

const Compte = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
    }
  }, [ user, router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <h1>Mon Compte</h1>
        <p>Bienvenue, {user.firstname} {user.name}</p>
        <button onClick={logout}>Déconnexion</button>
      </div>
    </>

  );
};

export default Compte;
