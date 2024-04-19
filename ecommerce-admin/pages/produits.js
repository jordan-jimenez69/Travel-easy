import Layout from "@/components/layout";
import Link from "next/link";

export default function Produits() {
    return(
        <Layout> 
            <Link className="bg-blue-600 rounded-md text-white py-1 px-2" href={'/produits/add'}>Ajouté nouveau Produit</Link>
        </Layout>
    );
}

