import { createConnection, disconnect } from "../../db-init/dbConn";
import { Products } from "../../db-init/models/products";
import { getAllProducts } from "../../repositories/product";
import logger from "../../utils/logger";

describe("Testing products repository", () => {
  // Updating the Default timeout to 20 Seconds to pass the tests without any timeout error
  jest.setTimeout(20000);

  const testProductData = [
    {
      isItemForRent: true,
      categoryId: "6225c98e9061a0084d28824d",
      subCategoryId: "6225ca2e9061a0084d288250",
      productName: "public test product",
      price: "1",
      liabilityPrice: "2",
      images: [
        "https://storage.googleapis.com/aqsusmarketplace/image_picker_1BB8672B-C5EF-4099-8548-7BB5AA9A78ED-47268-0000007209F62B78.jpg",
        "https://storage.googleapis.com/aqsusmarketplace/image_picker_179AF52A-E798-49F6-BAB6-B5181049EA59-47268-000000720FB3BA67.jpg",
      ],
      sellerName: "test seller",
      createdOn: new Date(),
      modifiedOn: new Date(),
      sellerAccountId: "test-user.aqsus-dev.testnet",
      productAvailability: ["2022-08-08/2022-08-12"],
      rentalDuration: 12,
      bufferPeriod: 3,
      rating: {
        totalRatings: 0,
        averageRatings: 0,
      },
      productDetails: {
        description: "public test product",
        damageDescription: "none",
        additionalInfo: {
          "Shirt Material": "cotton",
        },
      },
      isPublished: true,
      onRent: false,
      groupId: [],
      isPublic: true,
    },
    {
      isItemForRent: true,
      categoryId: "6225c98e9061a0084d28824d",
      subCategoryId: "6225ca2e9061a0084d288250",
      productName: "private test product",
      price: "1",
      liabilityPrice: "2",
      images: [
        "https://storage.googleapis.com/aqsusmarketplace/image_picker_1BB8672B-C5EF-4099-8548-7BB5AA9A78ED-47268-0000007209F62B78.jpg",
        "https://storage.googleapis.com/aqsusmarketplace/image_picker_179AF52A-E798-49F6-BAB6-B5181049EA59-47268-000000720FB3BA67.jpg",
      ],
      sellerName: "test seller",
      createdOn: new Date(),
      modifiedOn: new Date(),
      sellerAccountId: "test-user.aqsus-dev.testnet",
      productAvailability: ["2022-08-08/2022-08-12"],
      rentalDuration: 12,
      bufferPeriod: 3,
      rating: {
        totalRatings: 0,
        averageRatings: 0,
      },
      productDetails: {
        description: "private test product",
        damageDescription: "none",
        additionalInfo: {
          "Shirt Material": "cotton",
        },
      },
      isPublished: true,
      onRent: false,
      groupId: [],
      isPublic: false,
    },
  ];

  let testProductIds: any[];

  beforeAll(async () => {
    // create the connection
    createConnection();

    // add test products for testing purpose
    const addedProduct = await Products.insertMany(testProductData);

    // store the id of the added test product
    testProductIds = [addedProduct[0]._id, addedProduct[1]._id];

    logger.info(`inserted test products with ids \n  ${testProductIds}`);
  });

  afterAll(async () => {
    // delete products added for testing purpose
    await Products.deleteMany({ _id: testProductIds });

    logger.info("deleted all test products");
    disconnect();
  });

  it("should return all products available which are published and are public and results shorted in descending order on there creation date", async () => {
    // calling the repo function to get products
    const result: any = await getAllProducts();

    // expect response
    expect(result.success).toBe(true);
    expect(result.data).toBeTruthy();
    expect(result.data.length).toBeGreaterThan(0);

    // loop through the results
    result.data.forEach((product: any) => {
      // assert that product which is not public is not fetched
      expect(product.productName).not.toEqual("private test product");

      // assert the returned product objects contain only those keys which are mentioned exclusively
      expect(Object.keys(product.toJSON()).sort()).toStrictEqual(
        [
          "_id",
          "productName",
          "price",
          "liabilityPrice",
          "rating",
          "images",
          "createdOn",
          "modifiedOn",
          "onRent",
        ].sort()
      );
    });
  });

  it("should return error message if no products are available in the database", async () => {
    // delete all records from the database first
    await Products.deleteMany();

    // calling the repo function to get products
    const result: any = await getAllProducts();

    // expect response
    expect(result.success).toBe(false);
    expect(result.data).toBeFalsy();
    expect(result.errorMessage).toBe("Product not found");
  });
});
