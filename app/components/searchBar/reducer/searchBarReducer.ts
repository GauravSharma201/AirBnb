import { SearchBarAction, SearchBarState } from "./searchBarTypes";

export const initialSearchBarState: SearchBarState = {
  categoryStatus: "Stay",
  expanded: false,
  activeFeature: null,
  hoveredFeature: null,
  pointerEvents: "auto",
  initialActive: true,
};

export function searchBarReducer(
  state: SearchBarState,
  action: SearchBarAction
): SearchBarState {
  switch (action.type) {
    case "EXPAND":
      return { ...state, expanded: true };
    case "COLLAPSE":
      return { ...state, expanded: false };
    case "SET_CATEGORY":
      return { ...state, categoryStatus: action.payload };
    case "SET_FEATURE":
      return { ...state, activeFeature: action.payload };
    case "SET_POINTER_EVENTS":
      return { ...state, pointerEvents: action.payload };
    case "SET_HOVER_FEATURE":
      return { ...state, hoveredFeature: action.payload };
    case "SET_INITIAL_ACTIVE":
      return { ...state, initialActive: action.payload };
    default:
      return state;
  }
}
