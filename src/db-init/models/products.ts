import mongoose from "mongoose";

let products = new mongoose.Schema(
  {
    isItemForRent: Boolean,
    categoryId: String,
    subCategoryId: String,
    productName: String,
    price: String,
    liabilityPrice: String,
    images: [String],
    sellerName: String,
    createdOn: Date,
    modifiedOn: Date,
    sellerAccountId: String,
    productAvailability: [String],
    rentalDuration: Number,
    bufferDuration: Date,
    bufferPeriod: Number,
    rating: {
      averageRatings: Number,
      totalRatings: Number,
    },
    totalRentals: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    favoritesAdded: { type: Number, default: 0 },
    productDetails: {
      description: String,
      damageDescription: String,
      additionalInfo: Object,
    },
    isPublished: Boolean,
    onRent: { type: Boolean, default: false },
    groupId: [],
    isPublic: { type: Boolean, default: true },
  },
  { collection: "products" }
);

//applying schema for specified database connection
export const Products = mongoose.model("products", products);
