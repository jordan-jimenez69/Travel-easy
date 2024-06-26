import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/home/accueil.css";
import "@/styles/home/equipement.css";
import "@/styles/boutique/categorie.css";
import "@/styles/boutique/produit.css";
import "@/styles/compte/login.css";
import "@/styles/compte/register.css";
import "@/styles/compte/compte_user.css";

import { UserProvider } from '@/contexts/UserContext';


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
