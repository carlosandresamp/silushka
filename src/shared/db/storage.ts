import Dexie, { Table } from "dexie";

import { DATABASE_NAME } from "./config";
import { Exercise } from "./entities/Exercise";
import { Workout, WorkoutSession } from "./entities/Workout";
import exercises from "./initial/exercises";
import workouts from "./initial/workouts";

export default class Storage extends Dexie {
  exercises!: Table<Exercise, number>;
  workouts!: Table<Workout, number>;
  workoutSessions!: Table<WorkoutSession, number>;

  constructor() {
    super(DATABASE_NAME);

    this.version(1).stores({
      exercises: "++id, name, difficulty, description, resources, equipment, tags",
      workouts: "++id, name, pause, favorite, exercises",
      workoutSessions: "++id, workoutId, exercises, startDate, endDate",
    });

    this.on("populate", () => {
      this.exercises.bulkPut(exercises);
      this.workouts.bulkPut(workouts);
    });
  }
}
