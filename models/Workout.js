const mongoose = require("mongoose");


const workoutSchema = new mongoose.Schema({

	userId: {
		type: String,
		required: [true, "User ID is Required"]
	},
	name: {
		type: String,
		required: [true, "name is Required"]
	},

	duration: {
      	type: String,
      	required: true
    },
    
	dateAdded: {
		type: Date,
		default: Date.now
	},

	status: {
		type: String,
		default: "pending"
	}
});


module.exports = mongoose.model('Workout', workoutSchema);