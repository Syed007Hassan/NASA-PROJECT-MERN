// supertest is a library that allows us to test HTTP endpoints without having to run the server
const request = require("supertest");
const app = require("../app");
const { connectDb, mongooseDisconnect } = require("../server");
jest.setTimeout(30000);

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  await connectDb();
});

// Clear all test data after every test and removing db connections
afterAll(async () => {
  await mongooseDisconnect();
});

describe("Test Get /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app).get("/v1/launches");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-442 b",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC-1701-D",
    target: "Kepler-442 b",
  };
  test("It should response with 201 created", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send({
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-442 b",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send({
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-186 f",
        launchDate: "fake date",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});

describe("Test DELETE /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app).delete("/v1/launches/100");
    expect(response.statusCode).toBe(200);
  });
});
