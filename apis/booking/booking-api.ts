import { APIRequestContext } from "@playwright/test";
import { BookingApiResult, BookingInformation } from "./booking.interface";

export class BookingApi {
  async createBooking(
    request: APIRequestContext,
    bookingBody: object
  ): Promise<BookingApiResult<BookingInformation>> {
    const response = await request.post("/booking", {
      data: bookingBody,
    });
    if (response.status() === 200) {
      const responseBody = await response.json();
      return {
        responseBody: responseBody,
        status: response.status(),
      };
    }
    return {
      status: response.status(),
    };
  }

  async getAllBookingIds(
    request: APIRequestContext
  ): Promise<BookingApiResult> {
    const response = await request.get("/booking");
    const responseBody = await response.json();

    return {
      responseBody: responseBody,
      status: response.status(),
    };
  }

  async getBookingById(
    request: APIRequestContext,
    bookingId: number | string
  ): Promise<BookingApiResult> {
    const response = await request.get(`/booking/${bookingId}`);
    if (response.status() === 200) {
      const responseBody = await response.json();
      return {
        responseBody: responseBody,
        status: response.status(),
      };
    }
    return {
      status: response.status(),
      message: await response.text(),
    };
  }

  async updateBooking(
    request: APIRequestContext,
    authToken: string,
    bookingId: string,
    updatedBookingBody: object
  ): Promise<BookingApiResult> {
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
  ): Promise<BookingApiResult> {
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
  ): Promise<BookingApiResult> {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });

    return {
      status: response.status(),
    };
  }
}
