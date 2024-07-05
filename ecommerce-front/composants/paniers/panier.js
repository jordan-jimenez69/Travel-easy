import { useCart } from '@/contexts/CartContext';


const Page_Panier = () => {
    const { cart, removeFromCart } = useCart();

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    return (
        <div className="cart-container">
            <h1 className='title-page'>Votre Panier</h1>
            <div>
                {cart.length === 0 ? (
                    <p className='title-page'>Votre panier est vide.</p>
                ) : (
                    cart.map((product, index) => (
                        <div key={index} className='cart-item'>
                            <div className='image-panier'>
                                {product.images && product.images.length > 0 && (
                                    <img src={product.images[0]} alt={product.title} />
                                )} </div>
                            <div className='product-info'>
                                <h2 className='product-title'>{product.title}</h2>
                                <p className='product-price'>Prix: {product.price}€</p>
                            </div>
                            <button className='remove-button' onClick={() => handleRemove(product._id)}>Supprimer</button>
                            <button className='checkout-button'>Commander</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Page_Panier;
