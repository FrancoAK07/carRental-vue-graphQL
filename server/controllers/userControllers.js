import { User } from "../models/index.js";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";

export const getUser = async (email) => {
	const user = await User.findOne({ email: email });
	return user;
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
	try {
		const user = await User.findOneAndUpdate({ email: email }, { $push: { bookings: booking } }, { new: true });
		const newBooking = user.bookings[user.bookings.length - 1];
		return newBooking;
	} catch (error) {
		return new GraphQLError("Error creating booking");
	}
};

export const loginUser = async (email, password) => {
	const currentUser = await User.findOne({ email: email });
	if (!currentUser) {
		return new GraphQLError("User not found");
	} else {
		const comparison = await bcrypt.compare(password, currentUser.password);
		if (comparison) {
			return currentUser;
		} else {
			return new GraphQLError("Wrong password");
		}
	}
};

export const deleteBooking = async (email, bookingId) => {
	// await new Promise((resolve) => {
	// 	setTimeout(resolve, 3000);
	// });
	try {
		const response = await User.updateOne({ email: email }, { $pull: { bookings: { _id: bookingId } } });
		if (response.modifiedCount) {
			return "Deleted successfully";
		} else {
			return new GraphQLError("Error deleting booking");
		}
	} catch (error) {
		console.log(error);
		return new GraphQLError("Error deleting booking");
	}
};
