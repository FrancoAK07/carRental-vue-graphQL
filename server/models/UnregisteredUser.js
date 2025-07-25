import { Schema, model } from "mongoose";
import { addonSchema } from "./index.js";

const unregisteredUserSchema = new Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		bookings: {
			type: [
				{
					country: String,
					carImg: String,
					carBrand: String,
					carModel: String,
					pickupLocation: String,
					returnLocation: String,
					pickupDate: String,
					returnDate: String,
					pickupTime: String,
					returnTime: String,
					rentalDays: Number,
					pricePerDay: String,
					totalPrice: Number,
					totalPlusAddons: Number,
					addons: [addonSchema],
				},
			],
		},
	},
	{ collection: "UnregisteredUsers" }
);

export const UnregisteredUser = model("UnregisteredUser", unregisteredUserSchema);
