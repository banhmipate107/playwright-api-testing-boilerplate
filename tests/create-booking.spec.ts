import { test, expect } from "@playwright/test";
import { BookingApi } from "../apis/booking/booking-api.ts";
import Assert from "../assert/assert.ts";
import { generateBookingData } from "../mock-data/booking-data.ts";
import { pick } from "lodash";
import { pickRandomKeys } from "../utils/keyword.util.ts";
const assert = new Assert();

test.describe("create booking Api", () => {
  const createBookingApi = new BookingApi();
  let bookingResponse;
  test("create a booking successfully", async ({ request }) => {
    const bookingData = generateBookingData();
    await test.step("create a new booking", async () => {
      bookingResponse = await createBookingApi.createBooking(
        request,
        bookingData
      );
    });

    await test.step("verify the response status is 200", async () => {
      assert.assertStatusCode(bookingResponse.status, 200);
    });

    await test.step("verify the response returns the same as the request body", async () => {
      assert.assertObjectEquals(
        bookingResponse.responseBody.booking,
        bookingData
      );
    });
  });

  test("create a booking successfully without additional needs", async ({
    request,
  }) => {
    const { additionalneeds, ...bookingMissingNeeds } = generateBookingData();

    await test.step("create a new booking without additional needs", async () => {
      bookingResponse = await createBookingApi.createBooking(
        request,
        bookingMissingNeeds
      );
    });

    await test.step("verify the response status is 200", async () => {
      assert.assertStatusCode(bookingResponse.status, 200);
    });

    await test.step("verify the response returns the same as the request body", async () => {
      assert.assertObjectEquals(
        bookingResponse.responseBody.booking,
        bookingMissingNeeds
      );
    });
  });

  test("cannot create a booking without one required information", async ({
    request,
  }) => {
    const bookingInfor = generateBookingData();
    const bookingMissingRequired = pick(
      bookingInfor,
      pickRandomKeys(bookingInfor, 4, "additionalneeds")
    );
    await test.step("create a new booking with request body missing first name", async () => {
      bookingResponse = await createBookingApi.createBooking(
        request,
        bookingMissingRequired
      );
    });

    await test.step("verify the response status is 500", async () => {
      assert.assertStatusCode(bookingResponse.status, 500);
    });
  });

  test("cannot create a booking without booking dates", async ({ request }) => {
    const { bookingdates, ...bookingMissingDates } = generateBookingData();

    await test.step("create a new booking with request body missing booking dates", async () => {
      bookingResponse = await createBookingApi.createBooking(
        request,
        bookingMissingDates
      );
    });

    await test.step("verify the response status is 500", async () => {
      assert.assertStatusCode(bookingResponse.status, 500);
    });
  });
});
