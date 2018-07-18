export default class I18nEndings {
	
	type = 'postProcessor';
	name = 'endings';
	search = /\[\[[0-9\.]+(\|[\wА-Яа-я ]+)+\]\]/gm;
	
	
	constructor(options) {
		this.options = options;
	}
	
	
	static formatter(num, endings) {
		const isFloat = num % 1 !== 0;
		
		if ( isFloat ) {
			return endings[1];
		}
		
		const cases = [2, 0, 1, 1, 1, 2];
		return endings[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
	}
	
	
	getVariant(number, values, lang) {
		let fn = I18nEndings.formatter;
		
		if ( this.options && typeof this.options[lang] === 'function' ) {
			fn = this.options[lang];
		}
		
		return fn(number, values);
	}
	
	
	process(value, key, options, translator) {
		
		if ( this.search.test(value) ) {
			const inclinations = value.match(this.search);
			
			inclinations.map(inc => {
				const values = inc.replace('[[', '').replace(']]', '').split('|');
				const number = parseFloat(values[0], 10);
				
				values.splice(0, 1);
				const variant = this.getVariant(number, values, translator.language);
				
				value = value.replace(inc, variant);
			});
			
			return value;
		}
		
		return value;
	}
}