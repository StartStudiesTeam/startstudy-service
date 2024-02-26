const app = require("../../src/index");
const request = require("supertest");

describe("Register User", () => {
  test("Register an account stating the complete and valid request body", async () => {
    const response = await request(app).post("/api/v1/signup").send({
      name: "Ruan",
      email: "ruan@gmail.com",
      password: "amoastartstudies",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });
    expect.any(String);
  });

  test("Register account informed request body empty", async () => {
    const response = await request(app).post("/api/v1/signup").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("Register an account without the name property inserted", async () => {
    const response = await request(app).post("/api/v1/signup").send({
      email: "ruan@gmail.com",
      password: "amoastartstudies",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("Register an account without the email property inserted", async () => {
    const response = await request(app).post("/api/v1/signup").send({
      name: "Ruan",
      password: "amoastartstudies",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("Register an account without the password property inserted", async () => {
    const response = await request(app).post("/api/v1/signup").send({
      name: "Ruan",
      email: "ruan@gmail.com",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("Register an account without the nickname property inserted", async () => {
    const response = await request(app).post("/api/v1/signup").send({
      name: "Ruan",
      email: "ruan@gmail.com",
      password: "amoastartstudies",
      phone_number: "11911223344",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("Register an account by providing duplicate/existing email", async () => {
    await request(app).post("/api/v1/signup").send({
      name: "Ruan",
      email: "ruan@gmail.com",
      password: "amoastartstudies",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });

    const response = await request(app).post("/api/v1/signup").send({
      name: "Érico",
      email: "ruan@gmail.com",
      password: "amoastartstudies",
      nick_name: "ericoteste",
      phone_number: "11911223344",
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  test("Register an account reporting a duplicate/existing nickname", async () => {
    await request(app).post("/api/v1/signup").send({
      name: "Ruan",
      email: "ruan@gmail.com",
      password: "amoastartstudies",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });

    const response = await request(app).post("/api/v1/signup").send({
      name: "Érico",
      email: "erico@gmail.com",
      password: "amoastartstudies",
      nick_name: "ruanteste",
      phone_number: "11911223344",
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
