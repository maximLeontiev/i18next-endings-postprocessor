import { describe, test, expect } from "vitest";
import i18next from "i18next";

import I18nEndings from "./index";

const t = await i18next.use(new I18nEndings()).init({
  postProcess: ["endings"],
  lng: "ru",
  resources: {
    ru: {
      translation: {
        key: "Пора покупать {{count}} [[{{count}}|билет|билета|билетов]]!",
      },
    },
  },
});

describe("I18nEndings", () => {
  test.each([
    // simple cases
    { count: 1, expected: "Пора покупать 1 билет!" },
    { count: 2, expected: "Пора покупать 2 билета!" },
    { count: 3, expected: "Пора покупать 3 билета!" },
    { count: 4, expected: "Пора покупать 4 билета!" },
    { count: 5, expected: "Пора покупать 5 билетов!" },
    { count: 6, expected: "Пора покупать 6 билетов!" },
    { count: 7, expected: "Пора покупать 7 билетов!" },
    { count: 8, expected: "Пора покупать 8 билетов!" },
    { count: 9, expected: "Пора покупать 9 билетов!" },
    { count: 10, expected: "Пора покупать 10 билетов!" },
    { count: 11, expected: "Пора покупать 11 билетов!" },
    // // special cases
    { count: 0, expected: "Пора покупать 0 билетов!" },
    { count: 21, expected: "Пора покупать 21 билет!" },
    { count: 25, expected: "Пора покупать 25 билетов!" },
  ])("count $count", ({ count, expected }) => {
    const result = t("key", { count });

    expect(result).toBe(expected);
  });
});
