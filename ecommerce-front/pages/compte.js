import LoginForm from "@/composants/comptes/login";
import Navbar from "@/composants/navbar";

export default function boutique({newCategories}) {
  console.log({newCategories})
    return (
  
      <>
        <div>
          <Navbar />
        </div>

        <div>
          <LoginForm />
        </div>
  
      </>
    );
  }