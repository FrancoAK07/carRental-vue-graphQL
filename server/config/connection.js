import mongoose from "mongoose";

mongoose.connect("mongodb+srv://francorivo7:2n7cPLomBalvt3G2@cluster0.wcvrqfq.mongodb.net/car_rental_aiven");

export default mongoose.connection;
