import {
  Component,
  ComponentProps,
  createSignal,
  JSX,
  splitProps,
} from "solid-js";
import clsx from "clsx";
import { Dynamic } from "solid-js/web";

type ElementType = keyof JSX.IntrinsicElements | Component<any>;

type CollapsibleProps<T extends ElementType> = {
  children: JSX.Element;
  animation?: "fade" | "slide";
  value?: boolean;
  as?: T;
  closedStyles?: "string";
  openStyles?: "string";
};

function Collapsible<T extends ElementType = "div">(
  props: CollapsibleProps<T> &
    Omit<ComponentProps<T>, keyof CollapsibleProps<T>>,
) {
  const {
    children,
    animation = "default",
    value,
    closedStyles,
    openStyles,
  } = props;
  const [isOpen, setIsOpen] = createSignal(value);
  const [local, others] = splitProps(props, ["as"]);
  const component = local.as || "div";

  const toggleContent = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  return (
    <>
      <button
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-700 dark:border-gray-700"
        aria-expanded={isOpen()}
        onClick={toggleContent}
      >
        Toggle
      </button>
      <Dynamic
        component={component}
        {...others}
        class={clsx(
          `mt-2 w-full bg-orange-500 p-2 rounded-s text-white transition-all`,
          openStyles && isOpen() ? openStyles : "",
          closedStyles && !isOpen() ? closedStyles : "",
          animation === "default" && (isOpen() ? "block" : "hidden"),
          animation === "fade" && (isOpen() ? "opacity-100" : "opacity-0"),
          animation === "slide" && (isOpen() ? "absolute left-full" : "left-0"),
        )}
      >
        {children}
      </Dynamic>
    </>
  );
}

export default Collapsible;
