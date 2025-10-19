import React, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";
import { SearchHeaderHovStyle } from "@/app/utils/style_vars/hover";
import { searchBarTextBold } from "@/app/utils/style_vars/plain";
import { getAdjacentSiblingElements } from "@/app/utils/functions/function";
import { useSearchBar } from "./reducer/searchBarContext";
import { SearchBarCategory, SearchBarFeature } from "./reducer/searchBarTypes";
import { useCheckAdjacentHoverFeature } from "./hooks";

interface CustomSearchBarLabelProps {
  title: string;
  value: SearchBarCategory;
  clickHandler?: () => void;
}
export function CustomSearchBarLabel({
  title,
  value,
  clickHandler,
}: CustomSearchBarLabelProps) {
  const { state, dispatch } = useSearchBar();

  function handleClick() {
    dispatch({ type: "SET_FEATURE", payload: null });
    dispatch({ type: "SET_HOVER_FEATURE", payload: null });
    dispatch({ type: "SET_CATEGORY", payload: value });
    clickHandler?.();
  }
  return (
    <>
      <button
        type="button"
        className={`${SearchHeaderHovStyle} font-sans ${
          state.categoryStatus === value
            ? "font-medium text-[#222] hover:bg-inherit"
            : "text-[#6a6a6a] hover:text-[#222]"
        } leading-5 text-[17px]  text-nowrap`}
        onClick={handleClick}
      >
        {title}
      </button>
    </>
  );
}

interface SearchBarInterButtonProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  title: string;
  value: SearchBarFeature;
  className?: string;
  clickHandler?: () => void;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  climb?: boolean;
}

export const SearchBarInterButton = forwardRef<
  HTMLDivElement,
  SearchBarInterButtonProps
>(
  (
    {
      label,
      title,
      value,
      clickHandler,
      icon,
      iconPosition = "end",
      className,
      climb = false,
      ...props
    },
    ref
  ) => {
    const { state, dispatch } = useSearchBar();
    const hoverCheck = useCheckAdjacentHoverFeature();
    const { expanded, activeFeature } = state;
    function onHoverHandler(e: MouseEvent<HTMLDivElement>) {
      const { prevSibling, nextSibling } = getAdjacentSiblingElements(e, climb);
      prevSibling?.classList.add("invisible");
      nextSibling?.classList.add("invisible");
      activeFeature && dispatch({ type: "SET_HOVER_FEATURE", payload: value });
    }

    function offHoverHandler(e: MouseEvent<HTMLDivElement>) {
      const { prevSibling, nextSibling } = getAdjacentSiblingElements(e, climb);
      prevSibling?.classList.remove("invisible");
      nextSibling?.classList.remove("invisible");
      activeFeature && dispatch({ type: "SET_HOVER_FEATURE", payload: null });
    }

    function handleClick(e: React.MouseEvent) {
      e.stopPropagation();
      dispatch({ type: "SET_FEATURE", payload: value });
      clickHandler?.();
    }
    return (
      <>
        <div
          className={`flex flex-1 justify-between items-center ${className} ${
            activeFeature === null
              ? "hover:bg-[#ebebeb]"
              : activeFeature !== value && !hoverCheck && "hover:bg-[#c8c8c857]"
          } h-full rounded-[32px] z-10`}
          onMouseEnter={onHoverHandler}
          onMouseLeave={offHoverHandler}
          onClick={handleClick}
          ref={ref}
          {...props}
        >
          <div>
            {expanded ? (
              <div className="text-[#222] text-[13px] font-medium content-center px-5 min-h-fit">
                {label}
              </div>
            ) : (
              ""
            )}
            <div
              className={`${searchBarTextBold} text-[#6a6a6a] font-normal content-center ${
                expanded ? "text-[15px] min-h-fit" : ""
              }`}
            >
              {title}
            </div>
          </div>
          {icon && (
            <div
              className={
                iconPosition === "end"
                  ? "justify-self-end"
                  : "justify-self-start"
              }
            >
              {icon}
            </div>
          )}
        </div>
      </>
    );
  }
);
