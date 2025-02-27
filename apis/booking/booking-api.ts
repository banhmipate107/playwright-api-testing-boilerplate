import { APIRequestContext, APIResponse } from "@playwright/test";

export class BookingApi {
  async createBooking(request: APIRequestContext, bookingBody: object) {
    const response = await request.post("/booking", {
      data: bookingBody,
    });
    const responseBody = await response.json();

    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }

  async getAllBookingIds(request: APIRequestContext) {
    const response = await request.get("/booking");
    const responseBody = await response.json();

    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }

  async getBookingById(request: APIRequestContext, bookingId: string) {
    const response = await request.get(`/booking/${bookingId}`);
    const responseBody = await response.json();

    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }

  async updateBooking(
    request: APIRequestContext,
    authToken: string,
    bookingId: string,
    updatedBookingBody: object
  ) {
    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: updatedBookingBody,
    });
    const responseBody = await response.json();

    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }

  async partialUpdateBooking(
    request: APIRequestContext,
    authToken: string,
    bookingId: string,
    partialBookingBody: object
  ) {
    const response = await request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: partialBookingBody,
    });
    const responseBody = await response.json();

    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }

  async deleteBooking(
    request: APIRequestContext,
    authToken: string,
    bookingId: string
  ) {
    const response = await request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });
    const responseBody = await response.json();
    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }
}
