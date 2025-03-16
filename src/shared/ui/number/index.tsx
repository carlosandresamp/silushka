import { useLocale } from "@kobalte/core/i18n";
import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { createMemo, splitProps, ValidComponent } from "solid-js";

export type NumberOptions = {
  children: number;
  options: Intl.NumberFormatOptions;
};

export type NumberProps = NumberOptions;

export const Number = <T extends ValidComponent = "span">(props: PolymorphicProps<T, NumberProps>) => {
  const locale = useLocale();

  const [localProps, otherProps] = splitProps(props as NumberProps, ["children", "options"]);
  const value = createMemo(() =>
    new Intl.NumberFormat(locale.locale(), localProps.options).format(localProps.children),
  );

  return (
    <Polymorphic as="span" {...otherProps}>
      {value()}
    </Polymorphic>
  );
};

export default Number;
