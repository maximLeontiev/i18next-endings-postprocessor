# i18next-endings-postprocessor

### Introduction
In russian, for example, words endings depend not only on plural or singular, as it is in English.

### Getting started

```
npm i --save i18next-endings-postprocessor
```
```javascript
import i18next      from 'i18next';
import I18nEndings  from 'i18next-endings-postprocessor';

const config = {
	postProcess: ['endings']
}

i18next.use(new I18nEndings()).init(config);

```

### Usage
```
  n   1    2-4    5-20 
[[1|first|second|third]]
```

##### JSON
```
{
	"key": "some string {{count}} [[{{count}}|first|second|third]] variant"
}
```

##### JS
```javascript
i18next.t('key', { count: 1}); // -> some string 1 first variant
i18next.t('key', { count: 2}); // -> some string 2 second variant
i18next.t('key', { count: 5}); // -> some string 5 third variant
i18next.t('key', { count: 20}); // -> some string 20 third variant
i18next.t('key', { count: 21}); // -> some string 21 first variant
i18next.t('key', { count: 22}); // -> some string 22 second variant

//float value always returns second variant
i18next.t('key', { count: 1.1}); // -> some string 1.1 second variant
```


### Customize
You can set formatting function for each language. If function for lang not set, will used default.
```javascript
i18next.use(new I18nEndings({
	pt_BR: (num : number, arrOfVariants: Array<String>) : string
})).init(config);
```