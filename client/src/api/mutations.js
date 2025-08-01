import gql from "graphql-tag";

export const CREATE_USER = gql`
	mutation Mutation($user: UserInput!) {
		createUser(user: $user) {
			_id
			firstName
			lastName
			email
			password
			registered
			bookings {
				_id
				country
				phone
				carImg
				carBrand
				carModel
				pickupLocation
				returnLocation
				pickupDate
				returnDate
				pickupTime
				returnTime
				rentalDays
				pricePerDay
				totalPrice
				totalPlusAddons
				addons {
					_id
					name
					price
					details
					img
				}
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Mutation($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			firstName
			lastName
			email
			registered
		}
	}
`;

export const DELETE_BOOKING = gql`
	mutation Mutation($userEmail: String!, $bookingId: ID!) {
		deleteBooking(userEmail: $userEmail, bookingId: $bookingId)
	}
`;

export const CREATE_BOOKING = gql`
	mutation Mutation($booking: BookingInput!, $email: String!) {
		createBooking(booking: $booking, email: $email) {
			_id
			country
			phone
			carImg
			carBrand
			carModel
			pickupLocation
			returnLocation
			pickupDate
			returnDate
			pickupTime
			returnTime
			rentalDays
			pricePerDay
			totalPrice
			totalPlusAddons
			addons {
				_id
				name
				price
				details
				img
			}
		}
	}
`;
