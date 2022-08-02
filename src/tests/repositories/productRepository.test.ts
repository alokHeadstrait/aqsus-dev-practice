import { createConnection, disconnect } from "../../db-init/dbConn";

describe("Testing user repository", () => {
  // Updating the Default timeout to 20 Seconds to pass the tests without any timeout error
  jest.setTimeout(20000);

  beforeAll(async () => {
    // create the connection
    await createConnection();
    console.log("before All");
  });

  afterAll(async () => {
    await disconnect();
    console.log("afterAll");
  });

  it("start of the test ", async () => {
    console.log("test started");
  });
});
