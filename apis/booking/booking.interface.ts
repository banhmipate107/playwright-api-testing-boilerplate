export interface BookingApiResult<T = any> {
  status: number;
  responseBody?: T;
  message?: string;
}

export interface BookingInformation {
  bookingid: number;
  booking: Booking;
}

interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

interface BookingDates {
  checkin: string;
  checkout: string;
}
