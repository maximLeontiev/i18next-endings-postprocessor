const REFERENCE_ORDER = ["zero", "one", "two", "few", "many", "other"];

export default class I18nEndings {
	type = 'postProcessor';
	name = 'endings';
	search = /\[\[[0-9\.]+(\|.[^\[]+)+\]\]/gm;
	
	constructor(options) {
		this.options = options;
	}
	
	getVariant(number, values, translator) {
		if (this.options && typeof this.options[translator.language] === 'function') {
			return this.options[translator.language](number, values);
		}
		
		let numericCase = 0
		try {
			/**
			 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions}
			 * @type {Array<'zero' | 'one' | 'two' | 'few' | 'many' | 'other'>}
			 */
			const availableCases = translator.pluralResolver
			  .getRule(translator.language)
			  .resolvedOptions().pluralCategories;
	  
			/**
			 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select}
			 * @type {'zero' | 'one' | 'two' | 'few' | 'many' | 'other'}
			 */
			let textCase = translator.pluralResolver
			  .getRule(translator.language)
			  .select(number);
	  
			const order = REFERENCE_ORDER.filter((item) =>
			  availableCases.includes(item)
			);
	  
			numericCase = order.indexOf(textCase);
		  } catch (e) {}
		
		return values[numericCase];
	}
	
	process(value, key, options, translator) {
		if (this.search.test(value)) {
			const inclinations = value.match(this.search);
			inclinations.map((inc) => {
				const values = inc.replace('[[', '').replace(']]', '').split('|');
				const number = parseFloat(values[0], 10);
				
				values.splice(0, 1);
				const variant = this.getVariant(number, values, translator);
				
				value = value.replace(inc, variant);
			});
			
			return value;
		}
		
		return value;
	}
}
