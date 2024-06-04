import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import Navbar from '@/composants/navbar';

const ProductDetail = ({ product }) => {
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='product-details'>
                <h1 className='product-title'>Détails du produit: {product.title}</h1>
                <p className='product-description'>Description: {product.description}</p>
                <p className='product-price'>Prix: {product.price}€</p>
                <button className='button-product'>Ajouté au panier</button>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { productId } = context.params;
    await mongooseConnect();

    const product = await Produit.findById(productId);
    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}

export default ProductDetail;
