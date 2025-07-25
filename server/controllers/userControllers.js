import { User } from "../models/index.js";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";

export const getUser = async (email) => {
	return await User.findOne({ email: email });
};

export const getUsers = async () => {
	return await User.find();
};

export const createUser = async (user) => {
	if (user.password) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	const newUser = new User({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,
		registered: user.registered,
		bookings: user.bookings,
	});

	const savedUser = await newUser.save();
	return savedUser;
};

export const createBooking = async (booking, email) => {
	return await User.updateOne({ email: email }, { $push: { bookings: booking } }, { upsert: true });
};

export const loginUser = async (user) => {
	const currentUser = await User.findOne({ email: user.email });
	if (!currentUser) {
		return new GraphQLError("User not found");
	} else {
		const comparison = bcrypt.compare(user.password, currentUser.password);
		if (comparison) {
			return currentUser;
		} else {
			return new GraphQLError("User not found");
		}
	}
};

export const deleteBooking = async (email, bookingId) => {
	const response = await User.updateOne({ email: email }, { $pull: { bookings: { _id: bookingId } } });
	if (response.modifiedCount) {
		return "Deleted successfully";
	} else {
		return "Error deleting booking";
	}
};
