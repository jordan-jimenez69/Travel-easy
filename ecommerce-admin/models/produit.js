<<<<<<< HEAD
import { model, Schema, models } from "mongoose";

const ProduitSchema = new Schema({
    title: { type: String, required: true },
    level: { type: String, required: true },
    price: { type: Number, required: true },
    saison: { type: String, required: true },
    description: { type: String, required: true }
=======
import mongoose, { model, Schema, models } from "mongoose";

const ProduitSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    categorie: { type: mongoose.Types.ObjectId, ref: 'Categorie', required: true },
    proprietes: { type: Object },
>>>>>>> jordan
});

export const Produit = models.Produit || model('Produit', ProduitSchema);