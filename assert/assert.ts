import { test, expect } from "@playwright/test";
import { deepPartialMatch } from "../utils/keyword.util";

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

  async assertObjectContains(subset: object, source: object) {
    const isContains = deepPartialMatch(subset, source);
    expect(
      isContains,
      `The partial object should be contained in an object`
    ).toBeTruthy();
  }
}
