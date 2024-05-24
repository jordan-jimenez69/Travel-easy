import React from "react";

export default function Equipement() {
    return (
        <>
            <div className="titre-equipement">
                <h3>Nos équipements</h3>
            </div>

            <div class="trait"></div>
            
            <section className="list-equipement">
                <div className="list-equipement-chaussure">
                    <img className="img-chaussure" src="img-accueil.jpg" />
                    <h3>Acheter maintenant</h3>
                </div>
            </section>
        </>
    );
}