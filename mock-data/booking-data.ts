import { faker } from "@faker-js/faker";

export const bookingData = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: faker.number.int({ min: 10, max: 1000 }),
  depositpaid: true,
  bookingdates: {
    checkin: faker.date
      .between({
        from: "2025-01-01",
        to: "2025-02-01",
      })
      .toISOString()
      .split("T")[0],
    checkout: faker.date
      .between({
        from: "2000-01-02",
        to: Date.now(),
      })
      .toISOString()
      .split("T")[0],
  },
  additionalneeds: faker.food.dish(),
};
