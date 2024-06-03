import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import { Categorie } from '@/models/categorie';
import Navbar from '@/composants/navbar';

const CategoryProducts = ({ products, categoryName }) => {
  return (
    <div>

      <div>
        <Navbar />
      </div>

      <h1 className='Title-Prduct'>Produits pour la catégorie: {categoryName}</h1>
      <div className="ProductsGrid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { categoryId } = context.params;
  await mongooseConnect();

  // Trouvez la catégorie pour obtenir son nom
  const category = await Categorie.findById(categoryId);
  if (!category) {
    return {
      notFound: true,
    };
  }

  // Trouvez les produits associés à cette catégorie
  const products = await Produit.find({ categorie: categoryId });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categoryName: category.name,
    },
  };
}

export default CategoryProducts;
