const Workout = require("../models/Workout");
const { errorHandler } = require('../auth.js');

module.exports.addWorkout = async (req, res) => {
  try {
    const { name, duration, status } = req.body;

    if (!name || !duration)
      return res.status(400).send({ message: 'Name and duration are required' });

    const workout = await Workout.create({
      userId: req.user.id,
      name,
      duration,
      status
    });

    return res.status(201).send(workout);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};

module.exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    return res.status(200).send({ 
      workouts: workouts 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};

// module.exports.getWorkoutById = async (req, res) => {
//   try {
//     const workout = await Workout.findOne({
//       _id: req.params.id,
//       userId: req.user.id
//     });

//     if (!workout)
//       return res.status(404).send({ message: 'Workout not found' });

//     return res.status(200).send(workout);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ message: 'Server error' });
//   }
// };

module.exports.updateWorkout = async (req, res) => {
  try {
    const { name, duration, status } = req.body;

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, duration, status },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).send({ message: 'Workout not found' });
  }
    return res.status(200).send({
      message: 'Workout Updated Successfully',
      updatedWorkout: workout
  });
  
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};

module.exports.deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted)
      return res.status(404).send({ message: 'Workout not found' });

    return res.status(200).send({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};

module.exports.completeWorkoutStatus = async (req, res) => {
  try {
    
    const workoutId = req.params.id;

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: workoutId, userId: req.user.id },
      { status: 'completed' },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).send({ message: 'Workout not found' });
    }

    return res.status(200).send({
      message: 'Workout status updated successfully',
      updatedWorkout
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};
