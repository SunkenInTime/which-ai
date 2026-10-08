import { galleryManifest, getGalleryEntry } from "@/lib/gallery-manifest";
import { isGalleryGroup } from "@/lib/gallery-paths";
import type {
  GalleryEntry,
  GalleryGroupSlug,
  IterationId,
  ModelSlug,
} from "@/lib/gallery-types";

export type CompareSelection = {
  group: GalleryGroupSlug;
  model: ModelSlug;
  iteration: IterationId;
};

export type CompareState = {
  left: CompareSelection;
  right: CompareSelection;
};

type SearchParamsValue = string | string[] | undefined;
type SearchParamsLike = URLSearchParams | Record<string, SearchParamsValue>;
type CompareSearchParamKey =
  | "leftGroup"
  | "leftModel"
  | "leftIteration"
  | "rightGroup"
  | "rightModel"
  | "rightIteration";

const COMPARE_PARAM_KEYS = [
  "leftGroup",
  "leftModel",
  "leftIteration",
  "rightGroup",
  "rightModel",
  "rightIteration",
] as const satisfies readonly CompareSearchParamKey[];

export const compareGroupOrder = [
  "with-design-skill",
  "without-design-skill",
  "with-taste-skill",
  "miscellaneous",
] as const satisfies readonly GalleryGroupSlug[];

export const DEFAULT_COMPARE_STATE: CompareState = {
  left: {
    group: "with-design-skill",
    model: "gpt-5.4",
    iteration: "1",
  },
  right: {
    group: "without-design-skill",
    model: "gpt-5.4",
    iteration: "1",
  },
};

function getSingleSearchParamValue(
  searchParams: SearchParamsLike,
  key: CompareSearchParamKey,
): string | null | "multiple" {
  if (searchParams instanceof URLSearchParams) {
    const values = searchParams.getAll(key);
    if (values.length === 0) {
      return null;
    }
    if (values.length > 1) {
      return "multiple";
    }
    return values[0] ?? "";
  }

  const value = searchParams[key];
  if (typeof value === "undefined") {
    return null;
  }
  if (Array.isArray(value)) {
    return "multiple";
  }
  return value;
}

function isValidIterationForEntry(entry: GalleryEntry, iteration: string): iteration is IterationId {
  return entry.iterations.some((item) => item.id === iteration);
}

function getDefaultEntryForGroup(group: GalleryGroupSlug): GalleryEntry | null {
  const models = getModelsForGroup(group);
  if (models.length === 0) {
    return null;
  }

  return models.find((entry) => entry.model === "gpt-5.4") ?? models[0] ?? null;
}

export function getModelsForGroup(group: GalleryGroupSlug): GalleryEntry[] {
  return galleryManifest.filter((entry) => entry.group === group);
}

export function getDefaultSelectionForGroup(group: GalleryGroupSlug): CompareSelection | null {
  const entry = getDefaultEntryForGroup(group);
  if (!entry) {
    return null;
  }

  return {
    group: entry.group,
    model: entry.model,
    iteration: "1",
  };
}

export function buildCompareHref(state: CompareState): string {
  const params = new URLSearchParams([
    ["leftGroup", state.left.group],
    ["leftModel", state.left.model],
    ["leftIteration", state.left.iteration],
    ["rightGroup", state.right.group],
    ["rightModel", state.right.model],
    ["rightIteration", state.right.iteration],
  ]);

  return `/compare?${params.toString()}`;
}

export function parseCompareSearchParams(
  searchParams: SearchParamsLike,
): CompareState | "default" | "invalid" {
  const rawValues = Object.fromEntries(
    COMPARE_PARAM_KEYS.map((key) => [key, getSingleSearchParamValue(searchParams, key)]),
  ) as Record<CompareSearchParamKey, string | null | "multiple">;

  const hasAnyParams = Object.values(rawValues).some((value) => value !== null);
  if (!hasAnyParams) {
    return "default";
  }

  if (Object.values(rawValues).some((value) => value === null || value === "multiple")) {
    return "invalid";
  }

  const leftGroup = rawValues.leftGroup as string;
  const leftModel = rawValues.leftModel as string;
  const leftIteration = rawValues.leftIteration as string;
  const rightGroup = rawValues.rightGroup as string;
  const rightModel = rawValues.rightModel as string;
  const rightIteration = rawValues.rightIteration as string;

  if (
    !isGalleryGroup(leftGroup) ||
    !isGalleryGroup(rightGroup)
  ) {
    return "invalid";
  }

  const leftEntry = getGalleryEntry(leftGroup, leftModel);
  const rightEntry = getGalleryEntry(rightGroup, rightModel);
  if (!leftEntry || !rightEntry) {
    return "invalid";
  }

  if (
    !isValidIterationForEntry(leftEntry, leftIteration) ||
    !isValidIterationForEntry(rightEntry, rightIteration)
  ) {
    return "invalid";
  }

  return {
    left: {
      group: leftEntry.group,
      model: leftEntry.model,
      iteration: leftIteration,
    },
    right: {
      group: rightEntry.group,
      model: rightEntry.model,
      iteration: rightIteration,
    },
  };
}

export function getCounterpartSelection(selection: CompareSelection): CompareSelection | null {
  if (selection.group === "miscellaneous") {
    return null;
  }

  const counterpartGroup =
    selection.group === "with-design-skill" ? "without-design-skill" : "with-design-skill";
  const counterpartEntry = getGalleryEntry(counterpartGroup, selection.model);
  if (!counterpartEntry) {
    return null;
  }

  return {
    group: counterpartEntry.group,
    model: counterpartEntry.model,
    iteration: isValidIterationForEntry(counterpartEntry, selection.iteration)
      ? selection.iteration
      : "1",
  };
}

export function buildCompareHrefForSelection(left: CompareSelection): string {
  return buildCompareHref({
    left,
    right: getCounterpartSelection(left) ?? DEFAULT_COMPARE_STATE.right,
  });
}
