import Link from "next/link";
import React from "react";

export default function Equipement() {
    return (
        <>
            <div className="titre-and-equipement">
                <div className="titre-equipement">
                    <h3>Nos équipements</h3>
                </div>

                <div class="trait"></div>

                <section className="list-equipement">

                    <div className="equipement">
                        <img className="img-list-equip" src="chaussure.jpg" />
                        <Link className="btn-equipement" href={""}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement">
                        <img className="img-list-equip" src="sac.jpg" />
                        <Link className="btn-equipement" href={""}>Acheter maintenant</Link>
                    </div>

                    <div className="equipement">
                        <img className="img-list-equip" src="tente.jpg" />
                        <Link className="btn-equipement" href={""}>Acheter maintenant</Link>
                    </div>

                </section>

                <div className="voir-plus">
                    <Link className="text-voirplus" href={""}>
                        Voir plus d'equipements
                        <div className="fleche-voirplus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </div>
                    </Link>
                </div>

            </div>
        </>
    );
}