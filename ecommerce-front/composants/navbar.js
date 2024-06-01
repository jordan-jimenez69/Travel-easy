import Link from "next/link";

export default function Navbar () {
    return (
        <nav className="navbar">
        <div className="logo-navbar">
            <h2>TravelEasy</h2>
        </div>     
        <div className='liste-navbar'>
            <ul>
                <Link className="li-navbar" href={"./"}>Accueil</Link>
                <Link className="li-navbar" href={"./boutique"}>Boutique</Link>
                <Link className="li-navbar" href={""}>Randonnées</Link>
                <Link className="li-navbar" href={""}>Panier</Link>
                <Link className="li-navbar" href={""}>Compte</Link>
            </ul>
        </div>
    </nav>
    );
}