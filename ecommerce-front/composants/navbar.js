import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="navbar">
        <div className="logo-navbar">
          <h2>TravelEasy</h2>
        </div>     
        <div className='liste-navbar'>
          <ul>
            <li className="li-navbar">
              <Link href="/">Accueil</Link>
            </li>
            <li className="li-navbar">
              <Link href="/boutique">Boutique</Link>
            </li>
            <li className="li-navbar">
              <Link href="/randonnees">Randonnées</Link>
            </li>
            <li className="li-navbar">
              <Link href="/panier">Panier</Link>
            </li>
            <li className="li-navbar">
              <Link href="/login">Compte</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }