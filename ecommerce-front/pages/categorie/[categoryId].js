import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import { Categorie } from '@/models/categorie';
import Navbar from '@/composants/navbar';
import { useRouter } from 'next/router';

const CategoryProducts = ({ products, categoryName, categoryId }) => {
  const router = useRouter();

  const handleProductClick = (categoryId, productId) => {
    router.push(`/categorie/produit/${productId}`);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1 className='Title-Product'>Produits pour la catégorie: {categoryName}</h1>
      <div className="ProductsGrid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.title}</h3>
            <button className='button-product' onClick={() => handleProductClick(categoryId, product._id)}>
              Voir le produit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { categoryId } = context.params;
  await mongooseConnect();

  const category = await Categorie.findById(categoryId);
  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = await Produit.find({ categorie: categoryId });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categoryName: category.name,
      categoryId,
    },
  };
}

export default CategoryProducts;
