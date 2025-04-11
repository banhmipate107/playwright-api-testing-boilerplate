import { test, expect } from "@playwright/test";
import { BookingApi } from "../apis/booking/booking-api.ts";
import Assert from "../assert/assert.ts";
import { generateBookingData } from "../mock-data/booking-data.ts";
const assert = new Assert();
const bookingApi = new BookingApi();

test.describe("get booking by id", () => {
  let bookingResponse;
  let bookingId: number;
  let getBookingResponse;
  const bookingData = generateBookingData();
  test.beforeAll("create a booking", async ({ request }) => {
    await test.step("create a new booking", async () => {
      bookingResponse = await bookingApi.createBooking(request, bookingData);
      bookingId = bookingResponse.responseBody.bookingid;
    });
  });

  test("filter booking by valid id successfully", async ({ request }) => {
    await test.step("get booking by id", async () => {
      getBookingResponse = await bookingApi.getBookingById(request, bookingId);
    });

    await test.step("verify the status code is 200", async () => {
      assert.assertStatusCode(bookingResponse.status, 200);
    });

    await test.step("verify the booking information is correct", async () => {
      assert.assertObjectEquals(getBookingResponse.responseBody, bookingData);
    });
  });

  test("cannot filter booking by invalid id successfully", async ({
    request,
  }) => {
    await test.step("get booking by invalid id", async () => {
      getBookingResponse = await bookingApi.getBookingById(request, "abc");
    });

    await test.step("verify the response status is 404", async () => {
      assert.assertStatusCode(getBookingResponse.status, 404);
    });

    await test.step("verify the response message", async () => {
      assert.assertStringExactMatch(getBookingResponse.message, "Not Found");
    });
  });
});

test.describe("get all booking ids", () => {
  let getAllBookingResponse;
  let bookingId: number;
  let bookingFirstName: string;
  let bookingLastName: string;
  let bookingIdElement = {};
  test.beforeAll("create a booking", async ({ request }) => {
    await test.step("create a new booking", async () => {
      getAllBookingResponse = await bookingApi.createBooking(
        request,
        generateBookingData()
      );
      bookingId = getAllBookingResponse.responseBody.bookingid;
      bookingFirstName = getAllBookingResponse.responseBody.booking.firstname;
      bookingLastName = getAllBookingResponse.responseBody.booking.lastname;

      bookingIdElement = {
        bookingid: bookingId,
      };
    });
  });

  test("get all booking ids successfully", async ({ request }) => {
    await test.step("get all booking ids", async () => {
      getAllBookingResponse = await bookingApi.getAllBookingIds(request);
    });

    await test.step("verify the status code is 200", async () => {
      assert.assertStatusCode(getAllBookingResponse.status, 200);
    });

    await test.step("verify the created booking id contains in the booking ids list", async () => {
      const foundBooking = getAllBookingResponse.responseBody.find(
        ({ bookingid }) => bookingid === bookingId
      );
      assert.assertObjectEquals(foundBooking, bookingIdElement);
    });
  });

  test("get all booking ids by name", async ({ request }) => {
    await test.step("get booking ids by first name and last name params", async () => {
      getAllBookingResponse = await bookingApi.getAllBookingIdsByName(
        request,
        bookingFirstName,
        bookingLastName
      );
    });

    await test.step("verify the status code is 200", async () => {
      assert.assertStatusCode(getAllBookingResponse.status, 200);
    });

    await test.step("verify the created booking id contains in the booking ids list", async () => {
      const foundBooking = getAllBookingResponse.responseBody.find(
        ({ bookingid }) => bookingid === bookingId
      );
      assert.assertObjectEquals(foundBooking, bookingIdElement);
    });
  });
});
