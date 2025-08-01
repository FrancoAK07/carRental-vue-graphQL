<template>
	<div class="min-vh-100">
		<h1 class="text-center border-bottom">Your Bookings</h1>
		<div class="container mb-2">
			<div v-if="loading" class="position-absolute top-50 start-50 translate-middle text-nowrap">Loading bookings...</div>
			<div v-else>
				<h1
					class="position-absolute top-50 start-50 translate-middle text-nowrap"
					v-if="userBookings.length === 0 || !userBookings">
					You dont have any active bookings
				</h1>
			</div>
			<div v-for="(car, index) in userBookings" class="border-hover rounded p-1 w-75 mx-auto">
				<div class="row bg-dark rounded w-100 mx-auto position-relative p-2">
					<div class="delete-icon position-absolute text-white w-auto p-0 rounded-5 d-flex z-1" @click="deleteBooking(car._id)">
						<img class="bg-secondary rounded-5" src="../assets/images/trashcan2.png" alt="" />
					</div>
					<div class="col-12 col-md-6 position-relative my-auto">
						<img class="img-fluid" :src="car.carImg" alt="" />
						<div class="position-absolute top-0 text-white">
							<p class="m-0">Model: {{ car.carModel }}</p>
							<p class="m-0">Brand: {{ car.carBrand }}</p>
						</div>
					</div>
					<div class="col-12 col-md-6 text-white m-auto p-0">
						<div class="row w-100">
							<h5>Pickup</h5>
							<div class="ms-2 ms-md-2 d-flex p-2">
								<img class="me-2" src="../assets/images/house2.png" alt="" />
								<p class="m-0 text-nowrap">Location: {{ car.pickupLocation }}</p>
							</div>
							<div class="ms-2 ms-md-2 d-flex p-2">
								<img class="me-2" src="../assets/images/calendar.png" alt="" />
								<p class="m-0">Date: {{ car.pickupDate }}</p>
							</div>
							<div class="ms-2 ms-md-2 d-flex p-2">
								<img class="me-2" src="../assets/images/clock.png" alt="" />
								<p class="m-0">Time: {{ car.pickupTime }}</p>
							</div>
						</div>
						<div class="row mt-3 w-100">
							<h5>Return</h5>
							<div class="ms-2 ms-md-2 d-flex p-2">
								<img class="me-2" src="../assets/images/house2.png" alt="" />
								<p class="m-0 text-nowrap">Location: {{ car.returnLocation || car.pickupLocation }}</p>
							</div>
							<div class="ms-2 ms-md-2 d-flex p-2">
								<img class="me-2" src="../assets/images/calendar.png" alt="" />
								<p class="m-0">Date: {{ car.returnDate }}</p>
							</div>
							<div class="ms-2 ms-md-2 d-flex p-2">
								<img class="me-2" src="../assets/images/clock.png" alt="" />
								<p class="m-0">Time: {{ car.returnTime }}</p>
							</div>
						</div>
					</div>
					<div
						class="details-link text-decoration-none text-center link-primary w-auto m-auto"
						@click="showDetailsClick($event, index)">
						More Details
					</div>
					<div class="booking-details col-12 text-white p-0" v-if="showDetails[index]">
						<div class="row w-100 m-auto mb-2">
							<div class="col-12 col-md p-0 w-100 text-center mb-2 m-md-0">
								<h5 class="p-0 m-0">Price</h5>
								<div class="row w-100 m-auto p-2 justify-content-center">Rental Days: {{ car.rentalDays }}</div>
								<div class="row w-100 m-auto p-2 justify-content-center">Daily: ${{ car.pricePerDay }}</div>
								<div class="row w-100 m-auto p-2 justify-content-center">Sub Total: ${{ car.totalPrice }}</div>
							</div>
							<div class="col-12 col-md p-0 w-100 text-center">
								<h5 class="p-0 m-0">Addons</h5>
								<div class="row w-100 m-auto p-2 text-nowrap" v-for="addon in car.addons">
									<div class="col-12 col-md p-0">{{ addon.name }}: ${{ addon.price }}/day</div>
									<div class="col-12 col-md p-0">Total: ${{ (addon.price * car.rentalDays).toFixed(2) }}</div>
								</div>
							</div>
						</div>
						<h5 class="row w-100 m-auto justify-content-center p-2">Total Price: ${{ car.totalPlusAddons.toFixed(2) }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useToast } from "vue-toastification";
	import { useQuery, useMutation } from "@vue/apollo-composable";
	import { GET_USER } from "@/api/queries";
	import { DELETE_BOOKING } from "@/api/mutations";

	const toast = useToast();
	const userInfo = await JSON.parse(sessionStorage.getItem("user"));
	const email = userInfo?.email ? userInfo.email : sessionStorage.getItem("bookingEmail");
	let showDetails = ref([]);
	const userBookings = ref([]);
	const deletedBookingId = ref("");
	const userId = ref();

	const { loading, onResult, onError: queryError } = useQuery(GET_USER, { email: email });

	const { mutate: bookingDelete } = useMutation(DELETE_BOOKING, {
		optimisticResponse: {
			deleteBooking: {
				__typename: "Booking",
				id: deletedBookingId.value,
			},
		},
		// update(cache) {
		// 	const userData = cache.readQuery({ query: GET_USER, variables: { email: email } });
		// 	const updatedBookings = userData.user.bookings.filter((booking) => {
		// 		return booking._id !== deletedBookingId.value;
		// 	});

		// 	cache.writeQuery({
		// 		query: GET_USER,
		// 		variables: { email: email },
		// 		data: {
		// 			user: {
		// 				...userData.user,
		// 				bookings: updatedBookings,
		// 			},
		// 		},
		// 	});
		// },
		update(cache) {
			cache.modify({
				id: cache.identify({ _id: userId.value, __typename: "User" }),
				fields: {
					bookings(existingBookings, { readField }) {
						return existingBookings.filter((booking) => deletedBookingId.value !== readField("_id", booking));
					},
				},
			});
		},
	});

	onResult((response) => {
		if (!loading.value) {
			userId.value = response.data.user._id;
			userBookings.value = [...response.data.user.bookings];
		}
	});

	queryError((error) => {
		console.log(error);
	});

	const deleteBooking = async (bookingId) => {
		if (confirm("Are you sure you want to delete this booking?")) {
			try {
				deletedBookingId.value = bookingId;
				await bookingDelete({ userEmail: email, bookingId: bookingId });
				toast.success("Booking deleted successfully!");
			} catch (error) {
				console.error(error);
				const response = JSON.parse(JSON.stringify(error));
				toast.error(response.message);
			}
		}
	};

	function showDetailsClick(e, index) {
		showDetails.value[index] = !showDetails.value[index];
		if (showDetails.value[index]) {
			e.target.innerHTML = "Close Details";
		} else {
			e.target.innerHTML = "More details";
		}
	}
</script>
