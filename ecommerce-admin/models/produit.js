import {model, Schema} from "mongoose";

const ProduitSchema = new Schema ({
    title: {type:String, required: true},
    level: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
});

export const Produit = model('Produit', ProduitSchema)