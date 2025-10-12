import { forwardRef } from "react";
import { clsx } from "clsx";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  maxWidth?: "xl" | "lg" | "md";
};

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  xl: "max-w-[1120px]",
  lg: "max-w-5xl",
  md: "max-w-3xl",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = "div", className, maxWidth = "xl", ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          "mx-auto w-full px-6 sm:px-8 lg:px-10",
          maxWidthMap[maxWidth],
          className,
        )}
        {...rest}
      />
    );
  },
);

Container.displayName = "Container";
