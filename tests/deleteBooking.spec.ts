import { test, expect } from "@playwright/test";
import { BookingApi } from "../apis/booking/booking-api.ts";
import { AuthAPI } from "../apis/auth/auth-api.ts";
import Assert from "../assert/assert.ts";
import { bookingData } from "../mock-data/booking-data.ts";
const assert = new Assert();
const bookingApi = new BookingApi();
const authApi = new AuthAPI();

test.describe("delete booking Api", () => {
  let token: string;
  let bookingResponse;
  let bookingId: number;

  test.beforeEach("create token and prepare booking", async ({ request }) => {
    await test.step("create token", async () => {
      let createTokenResponse = await authApi.createToken(request);
      token = createTokenResponse.token;
    });

    await test.step("create a new booking", async () => {
      bookingResponse = await bookingApi.createBooking(request, bookingData);
      bookingId = bookingResponse.responseBody.bookingid;
    });
  });

  test("delete a booking successfully", async ({ request }) => {
    let deleteBookingResponse;
    await test.step("delete a newly created booking", async () => {
      deleteBookingResponse = await bookingApi.deleteBooking(
        request,
        token,
        bookingId
      );
    });

    await test.step("verify the response status is 200", async () => {
      assert.assertStatusCode(deleteBookingResponse.status, 201);
    });

    await test.step("verify the deleted booking cannot be retrieved information", async () => {
      let getBookingResponse = await bookingApi.getBookingById(
        request,
        bookingId
      );

      assert.assertStatusCode(getBookingResponse.status, 404);
    });
  });

  test("cannot delete an invalid booking", async ({ request }) => {
    let deleteBookingResponse;
    await test.step("delete a newly created booking", async () => {
      deleteBookingResponse = await bookingApi.deleteBooking(
        request,
        token,
        222222
      );
    });

    await test.step("verify the response status is 405", async () => {
      assert.assertStatusCode(deleteBookingResponse.status, 405);
    });
  });
});
