export default function NewCategories({ categories }) {
  
    return (
      <div className="CategoriesGrid">
        {categories?.length > 0 ? (
          categories.map(categorie => (
            <div key={categorie._id}>{categorie.name}</div>
          ))
        ) : (
          <div>Aucune catégorie trouvée.</div>
        )}
      </div>
    );
  }