export type SearchBarCategory = "Stay" | "Experience";
export type SearchBarFeature =
  | "Location"
  | "Date"
  | "Guests"
  | "Check-In"
  | "Check-Out"
  | null;
export type SearchBarPointerEvents = "none" | "auto";
export interface SearchBarState {
  expanded: boolean;
  categoryStatus: SearchBarCategory;
  activeFeature: SearchBarFeature;
  hoveredFeature: SearchBarFeature;
  initialActive: boolean;
  pointerEvents: SearchBarPointerEvents;
}

export type SearchBarAction =
  | { type: "EXPAND" }
  | { type: "COLLAPSE" }
  | { type: "SET_CATEGORY"; payload: SearchBarCategory }
  | { type: "SET_FEATURE"; payload: SearchBarFeature }
  | { type: "SET_HOVER_FEATURE"; payload: SearchBarFeature }
  | { type: "SET_POINTER_EVENTS"; payload: SearchBarPointerEvents }
  | { type: "SET_INITIAL_ACTIVE"; payload: boolean };
