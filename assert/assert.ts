import { test, expect } from "@playwright/test";

export default class Assert {
  async assertStatusCode(receivedCode: number, expectedCode: number) {
    expect(receivedCode, `Expected code should be ${expectedCode}`).toBe(
      expectedCode
    );
  }

  async assertObjectEquals(expected: any, received: any) {
    expect(received).toEqual(expected);
  }

  async assertStringExactMatch(receivedString: string, expectedString: string) {
    expect(receivedString, `Expected string should be ${expectedString}`).toBe(
      expectedString
    );
  }
}
