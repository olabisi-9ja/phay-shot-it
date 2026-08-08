"use client";

import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect that is safe during SSR. */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
