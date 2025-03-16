import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { For, splitProps, ValidComponent } from "solid-js";
import { tv } from "tailwind-variants";

import Tag from "@shared/ui/tag";

export type ExerciseTagsOptions = {
  tags: string[];
  class?: string | undefined;
};

export type ExerciseTagsProps = ExerciseTagsOptions;

export const styles = tv({
  base: "flex flex-wrap gap-1",
});

export const ExerciseTags = <T extends ValidComponent = "ul">(props: PolymorphicProps<T, ExerciseTagsProps>) => {
  const [localProps, otherProps] = splitProps(props, ["tags", "class"]);

  return (
    <Polymorphic as="ul" class={styles({ class: localProps.class })} {...otherProps}>
      <For each={localProps.tags}>{(tag) => <Tag as="li" value={tag} />}</For>
    </Polymorphic>
  );
};
