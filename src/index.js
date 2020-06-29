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
		
		let textCase = 0;
		
		try {
			textCase = translator.pluralResolver.getRule(translator.language).plurals(number);
		} catch (e) {
		}
		
		return values[textCase];
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
