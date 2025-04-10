import { test, expect } from "@playwright/test";
import { BookingApi } from "../apis/booking/booking-api.ts";
import Assert from "../assert/assert.ts";
import { bookingData } from "../mock-data/booking-data.ts";
const assert = new Assert();

test.describe("create booking Api", () => {
  test("create a booking successfully", async ({ request }) => {
    const createBookingApi = new BookingApi();
    let bookingResponse;

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
    const { additionalneeds, ...bookingMissingNeeds } = bookingData;
    const createBookingApi = new BookingApi();
    let bookingResponse;

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

  test("cannot create a booking without first name", async ({ request }) => {
    const { firstname, ...bookingMissingName } = bookingData;
    const createBookingApi = new BookingApi();
    let bookingResponse;

    await test.step("create a new booking with request body missing first name", async () => {
      bookingResponse = await createBookingApi.createBooking(
        request,
        bookingMissingName
      );
    });

    await test.step("verify the response status is 500", async () => {
      assert.assertStatusCode(bookingResponse.status, 500);
    });
  });

  test("cannot create a booking without booking dates", async ({ request }) => {
    const { bookingdates, ...bookingMissingDates } = bookingData;
    const createBookingApi = new BookingApi();
    let bookingResponse;

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
