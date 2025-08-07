export const typeDefs = `#graphql
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    phone: String!
    email: String!
    password: String!
    bookings: [Booking]!
  }


  type Booking {
    _id: ID!
    carImg: String
    carBrand: String
    carModel: String
    pickupLocation: String
    returnLocation: String
    pickupDate: String
    returnDate: String
    pickupTime: String
    returnTime: String
    rentalDays: Int
    pricePerDay: Int
    totalPrice: Float
    totalPlusAddons: Float
    addons: [Addon]
  }

  type Car {
    _id: ID!
    model: String
    brand: String
    img: String
    pickupDate: String
    returnDate: String
    year: Int
    pricePerDay: Int
    Gearshift: String
    Passengers: Int
    Type: String

  }

  type Addon {
    _id: ID!
    name: String
    price: Float
    details: String
    img: String
  }

#Input types
  input AddonInput {
    name: String!
    price: Float!
    details: String!
    img: String!
  }

  input BookingInput {
    carImg: String
    carBrand: String
    carModel: String
    pickupLocation: String
    returnLocation: String
    pickupDate: String
    returnDate: String
    pickupTime: String
    returnTime: String
    rentalDays: Int
    pricePerDay: Int
    totalPrice: Float
    totalPlusAddons: Float
    addons: [AddonInput] = []
  }

  input UserInput {
    firstName: String!
    lastName: String!
    phone: String!
    email: String!
    password: String!
    bookings: [BookingInput!] = []
  }


  type Query {
    user(email: String!): User
    users: [User!]
    cars: [Car!]
    addons: [Addon!]
  }

  type Mutation {
    createBooking(booking: BookingInput!, email: String!): Booking
    createUser(user: UserInput!): User
    loginUser(email: String!, password: String!): User
    deleteBooking(userEmail: String!, bookingId: ID!): String
  }
`;
