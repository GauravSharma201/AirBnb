import { MouseEvent } from "react";
export function getAdjacentSiblingElements(
  event: MouseEvent<HTMLDivElement>,
  climb: boolean
) {
  const target = event.currentTarget as HTMLElement;
  let prevSibling = target.previousElementSibling as HTMLElement | null;
  let nextSibling = target.nextElementSibling as HTMLElement | null;
  if (climb && (!prevSibling || !nextSibling)) {
    const el = target.parentElement;
    if (el) {
      prevSibling = !prevSibling
        ? (el?.previousElementSibling as HTMLElement)
        : prevSibling;
      nextSibling = !nextSibling
        ? (el?.nextElementSibling as HTMLElement)
        : nextSibling;
    }
  }
  return { prevSibling, nextSibling };
}
