import { test, expect } from "@playwright/test";
import { BookingApi } from "../apis/booking/booking-api.ts";
import { AuthAPI } from "../apis/auth/auth-api.ts";
import Assert from "../assert/assert.ts";
import { generateBookingData } from "../mock-data/booking-data.ts";
import { pick } from "lodash";
import { pickRandomKeys } from "../utils/keyword.util.ts";
import { faker } from "@faker-js/faker";
const assert = new Assert();
const bookingApi = new BookingApi();
const authApi = new AuthAPI();

test.describe("update booking with full updated information", async () => {
  let token: string;
  let bookingResponse;
  let bookingId: number;
  let updateBookingResponse;

  test.beforeEach("create token and prepare booking", async ({ request }) => {
    const bookingData = generateBookingData();
    await test.step("create token", async () => {
      let createTokenResponse = await authApi.createToken(request);
      token = createTokenResponse.token;
    });

    await test.step("create a new booking", async () => {
      bookingResponse = await bookingApi.createBooking(request, bookingData);
      bookingId = bookingResponse.responseBody.bookingid;
    });
  });

  test("update a booking with valid body request", async ({ request }) => {
    const updatedBookingData = generateBookingData();
    await test.step("update booking with valid information", async () => {
      updateBookingResponse = await bookingApi.updateBooking(
        request,
        token,
        bookingId,
        updatedBookingData
      );
    });

    await test.step("verify the response status is 200", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 200);
    });

    await test.step("verify the booking is updated successfully", async () => {
      let getBookingResponse = await bookingApi.getBookingById(
        request,
        bookingId
      );
      assert.assertObjectEquals(
        getBookingResponse.responseBody,
        updatedBookingData
      );
    });
  });

  test("update a booking without additionalneeds", async ({ request }) => {
    const { additionalneeds, ...bookingMissingNeeds } = generateBookingData();
    await test.step("update booking with valid information", async () => {
      updateBookingResponse = await bookingApi.updateBooking(
        request,
        token,
        bookingId,
        bookingMissingNeeds
      );
    });

    await test.step("verify the response status is 200", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 200);
    });

    await test.step("verify the booking is updated successfully", async () => {
      let getBookingResponse = await bookingApi.getBookingById(
        request,
        bookingId
      );
      await assert.assertObjectContains(
        bookingMissingNeeds,
        getBookingResponse.responseBody
      );
    });
  });

  test("update booking with invalid booking id", async ({ request }) => {
    const updatedBookingData = generateBookingData();
    await test.step("update booking with invalid booking id", async () => {
      updateBookingResponse = await bookingApi.updateBooking(
        request,
        token,
        12345,
        updatedBookingData
      );
    });

    await test.step("verify the status response is 405", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 405);
    });
  });

  test("update booking without booking id", async ({ request }) => {
    await test.step("call the update booking api without the booking id param", async () => {
      updateBookingResponse = await bookingApi.updateBooking(request, token);
    });

    await test.step("verify the status response is 400", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 400);
    });
  });

  test("cannot update a booking with partial information", async ({
    request,
  }) => {
    const bookingInfo = generateBookingData();
    const partialPayload = pick(
      bookingInfo,
      pickRandomKeys(bookingInfo, faker.number.int({ min: 1, max: 4 }))
    );
    await test.step("update booking with invalid booking id", async () => {
      updateBookingResponse = await bookingApi.updateBooking(
        request,
        token,
        bookingId,
        partialPayload
      );
    });

    await test.step("verify the status response is 400", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 400);
    });
  });
});

test.describe("partially update a booking", async () => {
  let token: string;
  let bookingResponse;
  let bookingId: number;
  let updateBookingResponse;

  test.beforeEach("create token and prepare booking", async ({ request }) => {
    const bookingData = generateBookingData();
    await test.step("create token", async () => {
      let createTokenResponse = await authApi.createToken(request);
      token = createTokenResponse.token;
    });

    await test.step("create a new booking", async () => {
      bookingResponse = await bookingApi.createBooking(request, bookingData);
      bookingId = bookingResponse.responseBody.bookingid;
    });
  });

  test("partially update a booking successfully", async ({ request }) => {
    const bookingInfo = generateBookingData();
    const partialPayload = pick(
      bookingInfo,
      pickRandomKeys(bookingInfo, faker.number.int({ min: 1, max: 4 }))
    );
    await test.step("call update booking api with partial booking payload", async () => {
      updateBookingResponse = await bookingApi.partialUpdateBooking(
        request,
        token,
        bookingId,
        partialPayload
      );
    });

    await test.step("verify the status response is 200", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 200);
    });

    await test.step("verify the booking is updated correctly", async () => {
      let getBookingById = await bookingApi.getBookingById(request, bookingId);
      await assert.assertObjectContains(
        partialPayload,
        getBookingById.responseBody
      );
    });
  });

  test("cannot partially update a booking with invalid bookingId", async ({
    request,
  }) => {
    const bookingInfo = generateBookingData();
    const partialPayload = pick(bookingInfo, pickRandomKeys(bookingInfo, 2));
    await test.step("call update booking api with partial booking payload", async () => {
      updateBookingResponse = await bookingApi.partialUpdateBooking(
        request,
        token,
        "abc",
        partialPayload
      );
    });

    await test.step("verify the status response is 405", async () => {
      assert.assertStatusCode(updateBookingResponse.status, 405);
    });
  });
});
