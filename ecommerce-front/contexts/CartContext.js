import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    const addToCart = (product) => {
        // Vérifier si le produit est déjà dans le panier
        const productIndex = cartProducts.findIndex(item => item._id === product._id);
        if (productIndex !== -1) {
            // Produit déjà présent dans le panier : augmenter la quantité
            const updatedCart = [...cartProducts];
            updatedCart[productIndex].quantity += 1;
            setCartProducts(updatedCart);
        } else {
            // Produit non présent dans le panier : l'ajouter avec une quantité de 1
            setCartProducts(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartProducts((prevCart) => prevCart.filter(product => product._id !== productId));

        if (cartProducts.length === 1) {
            ls?.removeItem('cart');
        }
    };

    const increaseQuantity = (productId) => {
        setCartProducts(prevCart =>
            prevCart.map(product =>
                product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartProducts(prevCart =>
            prevCart.map(product =>
                product._id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
