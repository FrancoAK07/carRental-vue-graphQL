export const typeDefs = `#graphql
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    registered: Boolean!
    bookings: [Booking]!
  }

  type UnregisteredUser {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: Int!
    bookings: [Booking]
  }

  type Booking {
    _id: ID!
    country: String
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
    pricePerday: Int
    Passengers: Int
    GearShift: String
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
    country: String
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
    email: String!
    password: String
    registered: Boolean!
    bookings: [BookingInput] = []
  }


  type Query {
    user(email: String!): User
    users: [User!]
    unregisteredUser(email: String!): UnregisteredUser!
    unregisteredUsers: [UnregisteredUser!]
    cars: [Car!]
    addons: [Addon!]
  }

  type Mutation {
    createBooking(booking: BookingInput!, email: String!): Booking
    createUser(user: UserInput!): User
    loginUser(user: UserInput!): User
    deleteBooking(userEmail: String!, bookingId: ID!): String
  }
`;
