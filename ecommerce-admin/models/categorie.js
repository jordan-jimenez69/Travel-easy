import { model, models, Schema } from "mongoose";

const CategorieSchema = new Schema({
    name: { type: String, required: true },
});

export const Categorie = models?.Categorie || model('Categorie', CategorieSchema);