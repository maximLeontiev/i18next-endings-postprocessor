# `i18next-endings-postprocessor`

### Introduction

In many languages, words endings depend not only on plural or singular form, but also on the number itself. For example, in Russian, the word "day" has three forms: "день", "дня" and "дней". This postprocessor allows you to use such forms in your translations.

It built on top of native [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules). This postprocessor allows you to use many counters in the one string. It helps to safe full sentence meaning in one key.

### Getting started

```bash
npm i --save i18next-endings-postprocessor
```

```javascript
import i18next from "i18next";
import I18nEndings from "i18next-endings-postprocessor";

const config = {
  postProcess: ["endings"],
};

i18next.use(new I18nEndings()).init(config);
```

### Usage

```
[[n|zero|one|two|few|many|other]]
```

> If your language does not have particular plural case (e.g. 'zero'), you can skip it.

##### JSON

```
{
	"key": "some string {{count}} [[{{count}}|first|second]] variant"
}
```

##### JS

```javascript
i18next.t("key", { count: 1 }); // -> some string 1 first variant
i18next.t("key", { count: 2 }); // -> some string 2 second variant
i18next.t("key", { count: 5 }); // -> some string 5 second variant
i18next.t("key", { count: 20 }); // -> some string 20 second variant
i18next.t("key", { count: 21 }); // -> some string 21 second variant
i18next.t("key", { count: 22 }); // -> some string 22 second variant

// float value always returns last variant
i18next.t("key", { count: 1.1 }); // -> some string 1.1 second variant
```

### Customize

You can set formatting function for each language. If function for language not set, will use default.

```javascript
i18next.use(new I18nEndings({
	pt_BR: (num : Number, arrOfVariants: Array<String>) : String
})).init(config);
```
