import { model, Schema, models } from "mongoose";

const ProduitSchema = new Schema({
    title: { type: String, required: true },
    level: { type: String, required: true },
    price: { type: Number, required: true },
    saison: { type: String, required: true },
    description: { type: String, required: true }
});

export const Produit = models.Produit || model('Produit', ProduitSchema);