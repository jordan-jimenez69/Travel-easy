import Link from "next/link";
import React from "react";

export default function Equipement() {
    return (
        <>
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
        </>
    );
}