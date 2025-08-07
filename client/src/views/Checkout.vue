<template>
	<div class="position-relative min-vh-100">
		<div class="container p-2">
			<div class="row">
				<div class="col-12 col-md text-center">
					<h1 class="d-inline m-0">Review your booking</h1>
				</div>
				<div class="col-12 col-md text-center">
					<div class="row">
						<h1 class="d-inline m-0">
							Total: ${{ bookingInfo.totalPlusAddons ? bookingInfo.totalPlusAddons.toFixed(2) : bookingInfo.totalPrice }}
						</h1>
					</div>
					<div class="row justify-content-end">
						<div class="col-12">
							<a class="text-decoration-none w-auto ms-auto" ref="detailsLinkRef" href="#" @click="showDetails = !showDetails"
								>Price details</a
							>
						</div>
						<div
							ref="details"
							class="price-details col text-light bg-dark rounded text-start position-absolute p-0 text-center border border-light"
							v-if="showDetails">
							<div class="row px-3 py-3 m-0">
								<div class="col d-flex justify-content-center">
									<h1 class="m-0 p-0">Price details</h1>
									<button class="btn btn-danger w-auto ms-5 my-auto" @click="showDetails = false">X</button>
								</div>
							</div>
							<div class="row px-3 pb-1 text-nowrap w-100 mx-auto">
								<div class="col me-5 p-0">Daily/${{ bookingInfo.car.pricePerDay }} x {{ differenceInDays }} Rental days</div>
								<div class="col text-end p-0">${{ bookingInfo.totalPrice }}</div>
							</div>
							<div class="row px-3 pb-1 text-nowrap w-100 mx-auto" v-for="addon of bookingInfo.selectedAddons">
								<div class="col me-5 p-0">{{ addon.name }} ${{ addon.price }} x {{ differenceInDays }} Rental days</div>
								<div class="col text-end p-0">${{ (addon.price * differenceInDays).toFixed(2) }}</div>
							</div>
							<div>
								<h5 class="fw-bold border-top border-light px-3 py-3 mt-2 mb-0">
									Total: ${{ bookingInfo.totalPlusAddons ? bookingInfo.totalPlusAddons.toFixed(2) : bookingInfo.totalPrice }}
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-bottom"></div>
		<div class="container mt-4 mb-4">
			<div class="row justify-content-center">
				<div v-if="!user" class="col-10 col-md-8 px-md-5 px-0 d-flex flex-column mb-3">
					<h2>Enter your info</h2>
					<div class="row w-100 mx-auto">
						<div class="col p-1">
							<label class="fw-bold" for="firstName">First Name</label>
							<input class="d-block w-100 rounded p-1 border-1" type="text" name="firstName" v-model="firstName" />
						</div>
						<div class="col p-1">
							<label class="fw-bold" for="lastName">Last Name</label>
							<input class="d-block w-100 rounded p-1 border-1" type="text" name="lastName" v-model="lastName" />
						</div>
					</div>
					<div class="row w-100 mx-auto">
						<div class="col p-1">
							<label class="fw-bold" for="email">Email</label>
							<input class="d-block w-100 rounded p-1 border-1" type="text" name="Email" v-model="email" />
						</div>
						<div class="col p-1">
							<label class="fw-bold" for="password">Password</label>
							<input class="d-block w-100 rounded p-1 border-1" type="text" name="Password" v-model="password" />
						</div>
					</div>
					<div class="row w-100 mx-auto">
						<div class="col p-1">
							<label class="fw-bold" for="number">Phone Number</label>
							<input class="d-block w-100 rounded p-1 border-1" type="text" name="number" v-model="phone" />
						</div>
					</div>
				</div>
				<div class="col-10 col-md-5 bg-dark text-light p-0 p-md-3 rounded-3">
					<div class="row w-100 m-auto">
						<div class="col p-3 position-relative">
							<img class="img-fluid w-100 rounded-3" :src="bookingInfo.car.img" alt="" />
							<div class="position-absolute top-0 text-white">
								<div class="row m-auto">Brand: {{ bookingInfo.car.brand }}</div>
								<div class="row m-auto">Model: {{ bookingInfo.car.model }}</div>
								<div class="row m-auto">{{ differenceInDays }} rental days</div>
							</div>
						</div>
					</div>
					<div class="row px-3 mx-auto">
						<div class="col-12 fw-bold p-0">Pickup</div>
						<div class="col-12 px-0 py-1 ms-2">
							<img src="../assets/images/house-icon2.png" alt="" /> {{ bookingInfo.pickupLocation }}
						</div>
						<div class="col-12 pickupDate px-0 pt-1 pb-2 ms-2">
							Pickup date: {{ lastPickupDate.replace("04:00:00", `| ${pickupTime}`) }}
						</div>
						<div class="col-12 fw-bold p-0">Return</div>
						<div class="col-12 px-0 py-1 ms-2">
							<img src="../assets/images/house-icon2.png" alt="" />
							{{ bookingInfo.returnLocation ? bookingInfo.returnLocation : bookingInfo.pickupLocation }}
						</div>
						<div class="col-12 returnDate px-0 pt-1 pb-2 ms-2">
							Return date: {{ lastReturnDate.replace("04:00:00", `| ${returnTime}`) }}
						</div>
					</div>
					<div class="row border-top border-light px-3 pb-2 w-100 mx-auto" v-if="bookingInfo.selectedAddons.length">
						<h5 class="text-center m-0 pt-2 px-0">Add-ons</h5>
						<p class="m-0 py-1 px-0" v-for="addon of bookingInfo.selectedAddons">
							<img :src="addon.img" alt="" /> {{ addon.name }}
						</p>
					</div>
				</div>
			</div>
			<div class="row d-flex justify-content-center mt-3 mb-3 mb-md-0">
				<button
					v-if="!bookingLoading && !createUserLoading"
					class="col-10 col-md-5 btn btn-primary"
					@click="
						{
							{
								saveBooking();
							}
						}
					">
					Book
				</button>
				<button v-else class="col-10 col-md-5 btn btn-primary" type="button" disabled>
					<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
					<span class="visually-hidden" role="status">Loading...</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useRouter } from "vue-router";
	import { useToast } from "vue-toastification";
	import { useMutation, useLazyQuery } from "@vue/apollo-composable";
	import { CREATE_BOOKING, CREATE_USER } from "@/api/mutations";
	import { GET_USER } from "@/api/queries";

	//get booking info from sessionStorage
	const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo"));
	//--
	let user = JSON.parse(sessionStorage.getItem("user"));
	const router = useRouter();
	const toast = useToast();
	const pickupDate = new Date(bookingInfo.pickupDate);
	const returnDate = new Date(bookingInfo.returnDate);
	const lastPickupDate = pickupDate.toUTCString().replace("GMT", "");
	const lastReturnDate = returnDate.toUTCString().replace("GMT", "");
	const pickupTime = convertTo12HourFormat(bookingInfo.pickupTime);
	const returnTime = convertTo12HourFormat(bookingInfo.returnTime);
	let differenceInTime = returnDate.getTime() - pickupDate.getTime();
	let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
	let showDetails = ref(false);
	const details = ref();
	const detailsLinkRef = ref();
	let firstName = defineModel("firstName");
	let lastName = defineModel("lastName");
	let email = defineModel("email");
	let password = defineModel("password");
	let phone = defineModel("phone");
	const newUser = ref();

	const { load: getUser } = useLazyQuery();

	const { mutate: createBooking, loading: bookingLoading } = useMutation(CREATE_BOOKING, {
		update(cache, { data }) {
			const newBooking = data.createBooking;
			const userData = cache.readQuery({ query: GET_USER, variables: { email: user.email } });
			if (userData) {
				cache.writeQuery({
					query: GET_USER,
					variables: { email: user.email },
					data: {
						user: {
							...userData.user,
							bookings: [...userData.user.bookings, newBooking],
						},
					},
				});
			}
		},
	});

	const { mutate: createUser, loading: createUserLoading } = useMutation(CREATE_USER, {
		update(cache, { data }) {
			const newUser = data.createUser;
			if (newUser) {
				cache.writeQuery({
					query: GET_USER,
					variables: { email: email.value },
					data: {
						user: {
							...newUser,
						},
					},
				});
			}
		},
	});

	window.addEventListener("click", (e) => {
		if (details.value) {
			if (!details.value.contains(e.target) && !detailsLinkRef.value.contains(e.target)) {
				showDetails.value = false;
			}
		}
	});

	function convertTo12HourFormat(time) {
		const [hours, minutes] = time.split(":");
		let period = "AM";
		if (hours >= 12) {
			period = "PM";
		}

		let hours12 = hours % 12 || 12;

		return `${hours12}:${minutes} ${period}`;
	}

	let userBooking = computed(() => ({
		booking: {
			carImg: bookingInfo.car.img,
			carBrand: bookingInfo.car.brand,
			carModel: bookingInfo.car.model,
			pickupLocation: bookingInfo.pickupLocation,
			returnLocation: bookingInfo.returnLocation,
			pickupDate: lastPickupDate.replace("04:00:00", "").trim(),
			returnDate: lastReturnDate.replace("04:00:00", "").trim(),
			pickupTime: pickupTime,
			returnTime: returnTime,
			rentalDays: differenceInDays,
			pricePerDay: bookingInfo.car.pricePerDay,
			totalPrice: bookingInfo.totalPrice,
			totalPlusAddons: bookingInfo.totalPlusAddons,
			addons: bookingInfo.selectedAddons,
		},
	}));

	async function saveBooking() {
		const response = await getUser(GET_USER, { email: user?.email || email.value });
		if (response.user) {
			user = response.user;
		}
		if (!user) {
			newUser.value = {
				firstName: firstName.value,
				lastName: lastName.value,
				phone: phone.value,
				email: email.value,
				password: password.value,
				bookings: [userBooking.value.booking],
			};
			if (!Object.values(newUser.value).some((value) => value === undefined)) {
				try {
					await createUser({ user: newUser.value });
					toast.success("Booking created successfully!");
					router.push({ path: "/" });
				} catch (error) {
					console.log(error);
				}
			} else {
				toast.warning("Please fill all fields!");
			}
		} else {
			try {
				await createBooking({ booking: userBooking.value.booking, email: user.email });
				toast.success("Booking created successfully!");
				router.push({ path: "/" });
			} catch (error) {
				console.log(error);
			}
		}
	}
</script>
