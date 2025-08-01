import gql from "graphql-tag";

export const GET_ALL_CARS = gql`
	query Query {
		cars {
			_id
			model
			brand
			img
			pickupDate
			returnDate
			year
			pricePerDay
			Passengers
			Gearshift
			Type
		}
	}
`;

export const GET_ALL_USERS = gql`
	query getAllUsers {
		users {
			firstName
			lastName
		}
	}
`;

export const GET_USER = gql`
	query Query($email: String!) {
		user(email: $email) {
			_id
			email
			registered
			bookings {
				_id
				totalPrice
				totalPlusAddons
				returnTime
				returnLocation
				returnDate
				rentalDays
				pricePerDay
				pickupTime
				pickupLocation
				pickupDate
				country
				carModel
				carImg
				carBrand
				addons {
					price
					name
					img
					details
				}
			}
		}
	}
`;

export const GET_ADDONS = gql`
	query Query {
		addons {
			name
			details
			img
			price
		}
	}
`;

export const GET_USER_BOOKINGS = gql`
	query Query($email: String!) {
		user(email: $email) {
			_id
			email
			registered
			bookings {
				_id
				totalPrice
				totalPlusAddons
				returnTime
				returnLocation
				returnDate
				rentalDays
				pricePerDay
				pickupTime
				pickupLocation
				pickupDate
				country
				carModel
				carImg
				carBrand
				addons {
					price
					name
					img
					details
				}
			}
		}
	}
`;
