"use client";
import { useEffect, useRef } from "react";
import { useSpring, animated, AnimatedProps } from "react-spring";
import {
  userMenuBorder,
  searchBarTextBold,
} from "@/app/utils/style_vars/plain";

import { FaSearch } from "react-icons/fa";
import { CustomSearchBarLabel, SearchBarInterButton } from "./elements";
import { useSearchBar } from "./reducer/searchBarContext";
import { useCheckAdjacentHoverFeature, useHoverHighlight } from "./hooks";

const springInitialVal = {
  width: "337px", // 350px
  height: "50px",
  borderRadius: "24px",
  marginTop: "0px",
};

const searchBtnSpringInitialVal = {
  padding: "10px",
};

const searchBarWrpprSpringInitialVal = {
  height: "31px",
  PointerEvent: "none",
};

const searchBarLabelSpringInitialVal = {
  height: "0px",
  width: "0px",
};

const rippleSpanSpringInitialVal = {
  left: 0,
  width: 0,
  height: 0,
  borderRadius: 32,
  background: "white",
  position: "absolute",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  zIndex: 1,
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0,
};

const resetSearchBarConfig = {
  config: {
    duration: 350,
    easing: (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  },
};

export default function SearchBar() {
  const { state, dispatch } = useSearchBar();
  const {
    categoryStatus,
    expanded,
    pointerEvents,
    activeFeature,
    initialActive,
  } = state;

  const { buttonRefs, hoverHighlightSpring } = useHoverHighlight();

  const pointerEventListeners = {
    onStart: () => dispatch({ type: "SET_POINTER_EVENTS", payload: "none" }),
    onRest: () => dispatch({ type: "SET_POINTER_EVENTS", payload: "auto" }),
  };
  const [springs, api] = useSpring(() => ({
    // main search bar container...
    from: {
      ...springInitialVal,
    },
    ...resetSearchBarConfig,
  }));

  // span tag button animation styling...
  const [rippleSpanSpring, rippleSpanApi] = useSpring(() => ({
    from: {
      ...rippleSpanSpringInitialVal,
    },
  }));

  const [searchBtnSpring, searchBtnApi] = useSpring(() => ({
    // search button...
    from: {
      ...searchBtnSpringInitialVal,
    },
    ...resetSearchBarConfig,
  }));

  const [searchBarWrpprSpring, searchBarWrpprApi] = useSpring(() => ({
    // searchBar comp wrapper...
    from: {
      ...searchBarWrpprSpringInitialVal,
    },
    ...resetSearchBarConfig,
  }));

  const [searchBarLabelSpring, searchBarLabelApi] = useSpring(() => ({
    // searchBar Label ...
    from: {
      ...searchBarLabelSpringInitialVal,
      visibility: "hidden",
    },
    ...resetSearchBarConfig,
  }));

  function handleClick() {
    dispatch({ type: "EXPAND" });

    searchBarLabelApi.start({
      to: {
        height: "44px",
        width: "328px",
        visibility: "visible",
      },
      ...pointerEventListeners,
    });

    searchBarWrpprApi.start({
      to: {
        height: "128px",
      },
    });

    searchBtnApi.start({
      to: {
        padding: "18px",
      },
    });

    api.start({
      to: {
        width: "850px",
        height: "70px",
        borderRadius: "33px",
        marginTop: "20px",
      },
      ...pointerEventListeners,
    });
  }

  const SearchBarIcon = (
    <animated.div
      className="bg-[#ff385c] w-min p-[10px] rounded-full justify-self-end m-2 ml-0"
      style={searchBtnSpring as AnimatedProps<React.CSSProperties>}
    >
      <FaSearch className="text-sm text-white " size={expanded ? 18 : 10} />
    </animated.div>
  );

  function resetSearchBarStyle() {
    searchBarLabelApi.start({
      to: {
        ...searchBarLabelSpringInitialVal,
        visibility: "hidden",
      },
      // ...resetSearchBarConfig,
      ...pointerEventListeners,
    });

    searchBarWrpprApi.start({
      to: {
        ...searchBarWrpprSpringInitialVal,
      },
      // ...resetSearchBarConfig,
    });

    searchBtnApi.start({
      to: {
        ...searchBtnSpringInitialVal,
      },
      // ...resetSearchBarConfig,
    });

    api.start({
      to: {
        ...springInitialVal,
      },
      // ...resetSearchBarConfig,
      ...pointerEventListeners,
    });
  }

  useEffect(() => {
    if (activeFeature === null) {
      rippleSpanApi.start({ ...rippleSpanSpringInitialVal, immediate: true });
      dispatch({ type: "SET_INITIAL_ACTIVE", payload: true });
      return;
    }
    const el = buttonRefs[activeFeature]?.current;
    if (!el) return;
    const { offsetLeft: left, offsetWidth: width, offsetHeight: height } = el;
    if (initialActive) {
      rippleSpanApi.start({
        to: async (next) => {
          // Step 1: Instantly move + hide
          await next({
            left,
            width: 0,
            height: 0,
            opacity: 0,
            immediate: true,
          });

          // Step 2: Fade in + grow
          await next({
            opacity: 1,
            width,
            height,
            immediate: false, // animate this
            // config: { tension: 250, friction: 22 }, // tweak feel as needed
          });
        },
      });

      dispatch({ type: "SET_INITIAL_ACTIVE", payload: false });
    } else {
      rippleSpanApi.start({ left, width, height });
    }
  }, [activeFeature]);

  useEffect(() => {
    function handleEscKey(event: { key: string }) {
      if (event.key === "Escape" && expanded) {
        dispatch({ type: "COLLAPSE" });
        dispatch({ type: "SET_FEATURE", payload: null });
        resetSearchBarStyle();
      }
    }
    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [expanded]);
  return (
    <animated.div
      className="
      relative 
      min-w-[328px]
      flex
      flex-col
      items-center
      cursor-pointer
      "
      style={{
        ...(searchBarWrpprSpring as AnimatedProps<React.CSSProperties>),
        pointerEvents: pointerEvents,
      }}
    >
      <animated.div
        className="flex items-center justify-center overflow-hidden"
        style={searchBarLabelSpring as AnimatedProps<React.CSSProperties>}
      >
        <CustomSearchBarLabel title="Stays" value="Stay" />
        <CustomSearchBarLabel title="Experiences" value="Experience" />
      </animated.div>
      <animated.div
        className={`absolute bottom-0 flex items-center font-sans 
          rounded-3xl shadow-md hover:shadow-lg ${userMenuBorder} box-border ${
          activeFeature && "bg-[#ebebeb]"
        }
          `}
        style={springs as AnimatedProps<React.CSSProperties>}
        onClick={handleClick}
      >
        {expanded ? (
          <>
            <animated.div
              style={rippleSpanSpring as AnimatedProps<React.CSSProperties>}
            />
            <animated.div
              style={hoverHighlightSpring as AnimatedProps<React.CSSProperties>}
            />
            <span></span>
            <SearchBarInterButton
              label="Where"
              value="Location"
              title="Search destinations"
              className="flex-[1_1_22%]"
              ref={buttonRefs.Location}
            />
            <span className={`h-8  ${userMenuBorder} border-[#ebebeb]`}></span>
            <div className="flex items-center flex-[1_1_16%] h-full">
              {categoryStatus === "Stay" ? (
                <>
                  <SearchBarInterButton
                    label="Check in"
                    value="Check-In"
                    title="Add dates"
                    climb={true}
                    ref={buttonRefs["Check-In"]}
                  />
                  <span
                    className={`h-8  ${userMenuBorder} border-[#ebebeb]`}
                  ></span>
                  <SearchBarInterButton
                    label="Check out"
                    value={"Check-Out"}
                    title="Add dates"
                    climb={true}
                    ref={buttonRefs["Check-Out"]}
                  />
                </>
              ) : (
                <>
                  <SearchBarInterButton
                    label="Date"
                    value={"Date"}
                    title="Add dates"
                    climb={true}
                    ref={buttonRefs.Date}
                  />
                </>
              )}
            </div>
            <span className={`h-8  ${userMenuBorder} border-[#ebebeb]`}></span>
            <SearchBarInterButton
              label="Who"
              value="Guests"
              title="Add guests"
              icon={SearchBarIcon}
              className="flex-[1_1_20%]"
              ref={buttonRefs.Guests}
            />
          </>
        ) : (
          <>
            <button className={`${searchBarTextBold} px-4 pl-[1.1rem]`}>
              Anywhere
            </button>
            <span className={`h-6 ${userMenuBorder} `}></span>
            <button className={`${searchBarTextBold} px-[.9rem]`}>
              Any week
            </button>
            <span className={`h-6 ${userMenuBorder} `}></span>
            <button className={`${searchBarTextBold} px-[.9rem]`}>
              Add guests
            </button>
            <div className="ml-auto">{SearchBarIcon}</div>
          </>
        )}
      </animated.div>
    </animated.div>
  );
}
