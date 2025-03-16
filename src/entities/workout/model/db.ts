import { createSignal } from "solid-js";

import db, { createStoreQuery, Workout } from "@shared/db";

export const deleteWorkout = async (id: number | undefined) => {
  if (id === undefined) {
    return;
  }

  await db.workouts.delete(id);

  const workoutSessions = await db.workoutSessions.filter((w) => w.workoutId === id).toArray();
  const ids = workoutSessions.map((w) => w.id!);

  await db.workoutSessions.bulkDelete(ids);
};

export const addWorkoutToFavorites = (id: number) => {
  db.workouts.update(id, { favorite: true });
};

export const removeWorkoutFromFavorites = (id: number) => {
  db.workouts.update(id, { favorite: false });
};

export const getCompletedWorkoutsCountForCurrentWeek = () => {
  const currentWeekStart = new Date();

  currentWeekStart.setHours(0, 0, 0, 0);
  currentWeekStart.setDate(currentWeekStart.getDate() - ((currentWeekStart.getDay() + 6) % 7));

  return db.workoutSessions
    .filter((session) => session.endTimestamp !== undefined && session.endTimestamp >= currentWeekStart.getTime())
    .count();
};

export const getFavoriteWorkouts = () => {
  return db.workouts.filter((workout) => workout.favorite).toArray();
};

export const getWorkoutsCount = () => db.workouts.count();
export const getWorkoutSessionsCount = () => db.workoutSessions.count();

export const createFilterableWorkoutsList = () => {
  const [search, setSearch] = createSignal<string>("");

  const workouts = createStoreQuery(() => {
    const searchTerm = search();

    return db.workouts
      .filter((workout) => {
        const searchFilter = searchTerm === "" || workout.name.toLowerCase().includes(searchTerm);

        return searchFilter;
      })
      .toArray();
  });

  return { workouts, search, setSearch };
};

export const getWorkoutExercises = (workout: Workout) => db.exercises.bulkGet(workout.exercises.map(({ id }) => id));

export const getWorkoutExercisesWithGoal = async (workout: Workout) => {
  const workoutExercises = workout.exercises;

  const filteredExercises = (await getWorkoutExercises(workout)).filter((exercise) => exercise !== undefined);

  const exerciseMap = new Map(filteredExercises.map((e) => [e.id, e]));

  return workoutExercises
    .map((w) => {
      const exercise = exerciseMap.get(w.id);
      return exercise ? { ...exercise, goal: w.goal } : null;
    })
    .filter((exercise) => exercise !== null);
};

export const getWorkoutSessions = (workout: Workout) =>
  db.workoutSessions.filter((session) => session.workoutId === workout.id).toArray();
