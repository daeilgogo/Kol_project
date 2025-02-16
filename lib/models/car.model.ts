import { Document, Schema, model, models } from "mongoose";

// Définition de l'interface IProduct
export interface IProduct extends Document {
  ad_id: string;
  title: string;
  description: string;
  price: string;
  features: {
    mileage: string;
    fuel: string;
    transmission: string;
    color: string;
    horsepower: string;
  };
  images: {
    image: string;
    description: string;
  }[];
  publication_date: Date;
  createdAt: Date;
}

// Définition du schéma Mongoose pour le modèle Product
const ProductsSchema = new Schema<IProduct>(
  {
    ad_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    features: {
      mileage: { type: String, required: true },
      fuel: { type: String, required: true },
      transmission: { type: String, required: true },
      color: { type: String, required: true },
      horsepower: { type: String, required: true }
    },
    images: [
      {
        image: { type: String, required: true },
        description: { type: String, required: true }
      }
    ],
    publication_date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Création du modèle Product
const Products = models.Products || model<IProduct>("Products", ProductsSchema);

export default Products;
