import { createSignal } from "solid-js";

import db, { Exercise, ExerciseDifficulty, createStoreQuery } from "@shared/db";

export const getExercisesByTags = async (tags: string[] | null | undefined, count: number): Promise<Exercise[]> => {
  if (tags === null || tags === undefined || tags.length === 0) {
    return [];
  }

  return await db.exercises
    .filter(
      (exercise) =>
        exercise.tags !== undefined && exercise.tags.length !== 0 && exercise.tags.some((tag) => tags.includes(tag)),
    )
    .limit(count)
    .toArray();
};

export const deleteExercise = async (id: number | undefined) => {
  if (id === undefined) {
    return;
  }

  await db.exercises.delete(id);

  const workouts = await db.workouts.toArray();

  await db.workouts.bulkUpdate(
    workouts.map((workout) => ({
      key: workout.id!,
      changes: {
        exercises: workout.exercises.filter((exercise) => exercise.id !== id),
      },
    })),
  );

  const workoutSessions = await db.workoutSessions.toArray();

  await db.workoutSessions.bulkUpdate(
    workoutSessions.map((workout) => ({
      key: workout.id!,
      changes: {
        exercises: workout.exercises.filter((exercise) => exercise.id !== id),
      },
    })),
  );
};

export const getExerciseUniqueTags = () =>
  db.exercises.toArray().then((exercises) => {
    return Array.from(new Set(exercises.flatMap((e) => e.tags))).filter((tag) => tag !== undefined);
  });

export const getExerciseUniqueEquipment = () =>
  db.exercises.toArray().then((exercises) => {
    return Array.from(new Set(exercises.flatMap((e) => e.equipment))).filter((equipment) => equipment !== undefined);
  });

export const getExercisesCount = () => db.exercises.count();

export const createFilterableExercisesList = () => {
  const [search, setSearch] = createSignal<string>("");
  const [tags, setTags] = createSignal<string[]>();
  const [equipment, setEquipment] = createSignal<string[]>();
  const [difficulty, setDifficulty] = createSignal<ExerciseDifficulty[]>();

  const exercises = createStoreQuery(() => {
    const equipmentItems = equipment();
    const tagsItems = tags();
    const difficultyItems = difficulty();
    const searchTerm = search().toLowerCase().trim();

    return db.exercises
      .filter((exercise) => {
        const equipmentFilter =
          equipmentItems && equipmentItems.length > 0
            ? exercise.equipment && exercise.equipment.length > 0
              ? equipmentItems.some((equipment) => exercise.equipment!.includes(equipment))
              : false
            : true;

        const tagsFilter =
          tagsItems && tagsItems.length > 0
            ? exercise.tags && exercise.tags.length > 0
              ? tagsItems.some((tag) => exercise.tags!.includes(tag))
              : false
            : true;

        const difficultyFilter = difficultyItems?.length ? difficultyItems.includes(exercise.difficulty) : true;

        const searchFilter =
          (searchTerm === "" ||
            exercise.name.toLowerCase().includes(searchTerm) ||
            (exercise.description && exercise.description.toLowerCase().includes(searchTerm)) ||
            (exercise.equipment &&
              exercise.equipment.length > 0 &&
              exercise.equipment.some((equipment) => equipment.toLowerCase().includes(searchTerm))) ||
            (exercise.resources &&
              exercise.resources.length > 0 &&
              exercise.resources.some((resource) => resource.toLowerCase().includes(searchTerm))) ||
            (exercise.tags &&
              exercise.tags.length > 0 &&
              exercise.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))) ??
          false;

        return equipmentFilter && tagsFilter && difficultyFilter && searchFilter;
      })
      .toArray();
  });

  return { exercises, tags, setTags, search, setSearch, equipment, setEquipment, difficulty, setDifficulty } as const;
};
