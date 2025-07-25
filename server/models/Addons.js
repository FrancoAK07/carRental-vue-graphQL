import { Schema, model } from "mongoose";

export const addonSchema = new Schema(
	{
		name: {
			type: String,
		},
		price: {
			type: Number,
		},
		details: {
			type: String,
		},
		img: {
			type: String,
		},
	},
	{ collection: "Addons" }
);

export const Addon = model("Addon", addonSchema);
