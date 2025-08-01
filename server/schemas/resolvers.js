import {
	getUser,
	getUsers,
	getCars,
	getUnregisteredUsers,
	getUnregisteredUser,
	getAddons,
	createBooking,
	createUser,
	loginUser,
	deleteBooking,
} from "../controllers/index.js";

const resolvers = {
	Query: {
		cars: async () => {
			return await getCars();
		},
		users: async () => {
			return await getUsers();
		},
		user: async (_, args) => {
			return await getUser(args.email);
		},
		unregisteredUsers: async () => {
			return await getUnregisteredUsers();
		},
		unregisteredUser: async (_, args) => {
			return await getUnregisteredUser(args.email);
		},
		addons: async () => {
			return await getAddons();
		},
	},
	Mutation: {
		createBooking: async (_, args) => {
			return await createBooking(args.booking, args.email);
		},
		createUser: async (_, args) => {
			return await createUser(args.user);
		},
		loginUser: async (_, args) => {
			const response = await loginUser(args.email, args.password);
			return response;
		},
		deleteBooking: async (_, args) => {
			return await deleteBooking(args.userEmail, args.bookingId);
		},
	},
};

export { resolvers };
