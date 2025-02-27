import { APIRequestContext, APIResponse } from "@playwright/test";

export class AuthAPI {
  async createToken(request: APIRequestContext) {
    const createTokenBody = {
      username: "admin",
      password: "password123",
    };

    const response = await request.post("/auth", {
      data: createTokenBody,
    });

    const responseBody = await response.json();

    return responseBody.token;
  }
}
