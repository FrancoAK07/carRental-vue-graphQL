import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schemas/index.js";
import dbConnection from "./config/connection.js";

const mongoConnection = () => {
	return new Promise((resolve, reject) => {
		dbConnection.on("connected", () => {
			console.log("MongoDB connected successfully!");
			resolve();
		});
		dbConnection.on("error", (error) => {
			console.log("error connecting to db");
			reject(error);
		});
	});
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

async function startServer() {
	await mongoConnection();

	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`🚀  Server ready at: ${url}`);
}

startServer();
