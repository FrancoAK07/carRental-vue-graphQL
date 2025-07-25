import { Schema, model } from "mongoose";

const carSchema = new Schema(
	{
		model: {
			type: String,
		},
		brand: {
			type: String,
		},
		img: {
			type: String,
		},
		pickupDate: {
			type: String,
		},
		returnDate: {
			type: String,
		},
		year: {
			type: Number,
		},
		pricePerDay: {
			type: Number,
		},
		Passengers: {
			type: Number,
		},
		Gearshift: {
			type: String,
		},
		Type: {
			type: String,
		},
	},
	{ collection: "Cars" }
);

export const Car = model("Car", carSchema);
