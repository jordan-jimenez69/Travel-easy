import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import { Categorie } from '@/models/categorie';
import Navbar from '@/composants/navbar';

const CategoryProducts = ({ initialProducts, categoryName, categoryId, properties }) => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleProductClick = (categoryId, productId) => {
    router.push(`/categorie/produit/${productId}`);
  };

  const handleFilterChange = (property, value) => {
    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      newFilters[property] = value;
      return newFilters;
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = initialProducts;
      for (const property in selectedFilters) {
        if (selectedFilters[property] !== 'Tous') {
          filtered = filtered.filter(product => product.proprietes[property] === selectedFilters[property]);
        }
      }
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [selectedFilters, initialProducts]);

  return (
    <div>
      <Navbar />
      <div className="Filters">
      <h1 className='Title-Product'>Produits pour la catégorie: {categoryName}</h1>
        {properties.map(property => (
          <div key={property.name} className="Filter">
            <h3>{property.name}</h3>
            <select
              value={selectedFilters[property.name] || 'Tous'}
              onChange={(e) => handleFilterChange(property.name, e.target.value)}
            >
              <option value="Tous">Tous</option>
              {property.values.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
         </div>
      {filteredProducts.length === 0 && (
        <p>Pas de produit disponible avec les filtres sélectionnés.</p>
      )}
      <div className="ProductsGrid">
        {filteredProducts.map(product => (
          <div key={product._id} className="category-card">
            <h3>{product.title}</h3>
            <button onClick={() => handleProductClick(categoryId, product._id)}>
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
  const properties = category.proprietes;

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
      categoryName: category.name,
      categoryId,
      properties: JSON.parse(JSON.stringify(properties)),
    },
  };
}

export default CategoryProducts;
