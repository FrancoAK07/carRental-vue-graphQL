import { Schema, get, model } from "mongoose";
import { addonSchema } from "./index.js";

const userSchema = new Schema(
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
		password: {
			type: String,
		},
		registered: {
			type: Boolean,
			required: true,
		},
		bookings: {
			type: [
				{
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
	{ collection: "Users" }
);

export const User = model("User", userSchema);
