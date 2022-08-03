import productController from "../../controllers/product";
import * as repositories from "../../repositories/product";

let getAllProductsSpy: jest.SpyInstance<Promise<any>>;

describe("Testing product controller", () => {
  beforeAll(async () => {
    getAllProductsSpy = jest
      .spyOn(repositories, "getAllProducts")
      .mockImplementation(() => {
        return Promise.resolve({
          success: false,
          errorMessage: "Failed to get all products",
        });
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should test getAllProducts controller, if there is error returned from the repository", async () => {
    // call the controller
    const result: any = await productController.getAllProducts();

    // expect response
    expect(result.isError).toBe(true);
    expect(result.error.statusCode).toBe(400);
    expect(result.error.customMessage).toBe("Failed to get all products");
  });
});
