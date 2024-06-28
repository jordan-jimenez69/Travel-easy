import { useRouter } from "next/router";
import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteUsersPage() {
    const router = useRouter();
    const [produitInfo, setProduitInfo] = useState();
    const { id } = router.query
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/users?id=' + id).then(response => {
            setProduitInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/utilisateurs')
    }

    async function DeleteProduit() {
        await axios.delete('/api/users?id=' + id);
        goBack();
        }

    return (
            <Layout>
                <h1 className="text-center">Vous voulez vous vraiment supprimer
                    &nbsp;"{produitInfo?.title}" ?
                </h1>
                <div className="flex gap-2 justify-center">

                    <button
                        onClick={DeleteProduit}
                        className="btn-red">Oui
                    </button>

                    <button className="btn-default"
                        onClick={goBack}>Non</button>
                </div>

            </Layout>
        )
    } 