import { describe, test, expect } from "vitest";
import i18next from "i18next";

import I18nEndings from "./index";

const t = await i18next.use(new I18nEndings()).init({
  postProcess: ["endings"],
  lng: "en",
  resources: {
    en: {
      translation: {
        /**
         * It's invalid format for English, because it has to have only 2 cases
         * but in source code of Aviasales there are a lot of strings with 3 cases
         */
        key: "some string {{count}} [[{{count}}|first|second|third]] variant",
      },
    },
  },
});

describe("I18nEndings (en)", () => {
  test.each([
    // simple cases
    { count: 1, expected: "some string 1 first variant" },
    { count: 2, expected: "some string 2 second variant" },
    { count: 5, expected: "some string 5 third variant" },
    { count: 20, expected: "some string 20 third variant" },
    { count: 21, expected: "some string 21 second variant" },
    { count: 22, expected: "some string 22 second variant" },
    // special cases
    { count: 1.1, expected: "some string 1.1 second variant" },
  ])("count $count", ({ count, expected }) => {
    const result = t("key", { count });

    expect(result).toBe(expected);
  });
});
