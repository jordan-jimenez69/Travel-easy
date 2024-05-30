import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  return <Layout>
    <div className="text-orange-400 flex">
      <h2>
      hello, {session?.user?.name}
      </h2>
    </div>
  </Layout>
}