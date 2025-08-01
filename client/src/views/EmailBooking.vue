<template>
	<div class="min-vh-100 row w-100 m-auto justify-content-center">
		<div class="col-10 col-md-4 position-relative p-0">
			<div class="row position-absolute w-100 m-auto top-50 start-50 translate-middle bg-dark text-white p-3 rounded">
				<div class="col-12 d-flex justify-content-center">
					<label class="text-nowrap" for="email">Enter email to check bookings</label>
				</div>
				<div class="col-12 d-flex justify-content-center my-3">
					<input class="w-100" type="text" name="email" placeholder="Email..." v-model="bookingEmail" />
				</div>
				<div class="col-12 d-flex justify-content-center">
					<router-link :to="{ path: '/bookings' }" class="text-decoration-none my-auto btn btn-primary w-100">Next</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeRouteLeave } from "vue-router";
	import { useToast } from "vue-toastification";
	import { useLazyQuery } from "@vue/apollo-composable";
	import { GET_USER } from "@/api/queries.js";

	const toast = useToast();
	const bookingEmail = defineModel("bookingEmail");
	let user;

	const { load: lazyQuery, refetch } = useLazyQuery();

	onBeforeRouteLeave(async (to, _, next) => {
		if (to.path === "/bookings") {
			if (bookingEmail.value && bookingEmail.value.includes("@")) {
				try {
					const response = await lazyQuery(GET_USER, { email: bookingEmail.value });
					if (response !== false) {
						if (response.user) {
							user = response.user;
							if (user.registered) {
								toast("you already have an account! Log in and check your bookings");
								next(false);
							} else {
								sessionStorage.setItem("bookingEmail", bookingEmail.value);
								next(true);
							}
						} else {
							toast.warning("User not found");
							next(false);
						}
					} else {
						const secondCall = await refetch({ email: bookingEmail.value });
						if (secondCall.data.user) {
							user = secondCall.data.user;
							if (user.registered) {
								toast("you already have an account! Log in and check your bookings");
								next(false);
							} else {
								sessionStorage.setItem("bookingEmail", bookingEmail.value);
								next(true);
							}
						} else {
							toast.warning("User not found");
							next(false);
						}
					}
				} catch (error) {
					next(false);
				}
			} else {
				toast.warning("Enter a valid email");
				next(false);
			}
		} else {
			next(true);
		}
	});
</script>
