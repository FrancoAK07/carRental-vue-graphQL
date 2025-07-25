import { Addon } from "../models/index.js";

export const getAddons = async () => {
	return await Addon.find();
};
