import { model, Schema, models } from "mongoose";

const ProduitSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

export const Produit = models.Produit || model('Produit', ProduitSchema);