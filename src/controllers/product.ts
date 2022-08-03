import logger from "../utils/logger";
import * as productsRepositories from "../repositories/product";

// Controller for fethcing all products - Bhavana
const getAllProducts = async () => {
  try {
    // call the getAllProducts repo
    const productList: any = await productsRepositories.getAllProducts();

    // if product not exists in db then throw an error
    if (!productList.success) {
      throw {
        statusCode: 400,
        customMessage: productList.errorMessage,
      };
    }

    // if product not exists in db then throw an error
    if (productList?.data?.length === 0) {
      throw {
        statusCode: 400,
        customMessage: "No Products found",
      };
    }

    // If there is no error then return error as false
    return {
      data: productList.data,
      isError: false,
    };
  } catch (error) {
    logger.error(
      `at: "controllers/products/getAllProducts" => ${JSON.stringify(
        error
      )}\n${error}`
    );

    // return negative response
    return {
      isError: true,
      error: error,
    };
  }
};

export default {
  getAllProducts,
};
