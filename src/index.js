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
		
		/**
		 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select}
		 * @type {'zero' | 'one' | 'two' | 'few' | 'many' | 'other'}
		 */
		let textCase = 'few';
		try {
			textCase = translator.pluralResolver.getRule(translator.language).select(number);
		} catch (e) {
		}

		const numericCase = {
			'one': 0,
			'few': 1,
			'many': 2,
			'other': 1,
		}
		
		return values[numericCase[textCase] || 0];
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
