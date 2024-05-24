import Accueil from "@/composants/accueil";
import Equipement from "@/composants/equipements";
import Navbar from "@/composants/navbar";

export default function Home() {
  return (

    <>
      <div>
        <Navbar />
      </div>

      <div>
        <Accueil />
      </div>

      <div>
        <Equipement />
      </div>

    </>
  );
}
