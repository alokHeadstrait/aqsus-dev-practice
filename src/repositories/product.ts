import { Products } from "../db-init/models/products";
import logger from "../utils/logger";

export const getAllProducts = async () => {
  try {
    const productData = await Products.find(
      { isPublished: true, isPublic: true },
      {
        _id: 1,
        productName: 1,
        price: 1,
        liabilityPrice: 1,
        rating: 1,
        images: 1,
        createdOn: 1,
        modifiedOn: 1,
        onRent: 1,
      }
    ).sort({ createdOn: -1 });

    // if product found with url the then return true
    if (productData.length !== 0 || !productData) {
      return {
        data: productData,
        success: true,
      };
    }
    // else return false
    if (productData.length == 0) {
      return {
        success: false,
        errorMessage: "Product not found",
      };
    }
  } catch (error) {
    // logging the error
    logger.error(
      `at:"repositories/products/getAllProducts" => ${JSON.stringify(
        error
      )}\n${error}`
    );
    // returning false
    return {
      success: false,
      errorMessage: JSON.stringify(error),
    };
  }
};
