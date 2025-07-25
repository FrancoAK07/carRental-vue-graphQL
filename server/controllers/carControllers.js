import { Car } from "../models/index.js";

export const getCars = async () => {
	return await Car.find();
};
