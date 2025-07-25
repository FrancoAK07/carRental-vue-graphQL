import { createApp, provide } from "vue";
import App from "./App.vue";
import "./dist/style.css";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

const apolloPlugin = {
	install(App) {
		App.provide(DefaultApolloClient, client);
	},
};

const app = createApp(App);

app.use(router).use(Toast).use(apolloPlugin).mount("#app");
