import { UnregisteredUser } from "../models/index.js";

export const getUnregisteredUsers = async () => {
	return await UnregisteredUser.find();
};

export const getUnregisteredUser = async (email) => {
	return await UnregisteredUser.findOne({ email: email });
};

// export const createBooking = async (booking, email) => {
// 	console.log(booking);
// 	console.log(email);
// 	return await UnregisteredUser.updateOne({ email: email }, { $push: { bookings: booking } }, { upsert: true });
// };
