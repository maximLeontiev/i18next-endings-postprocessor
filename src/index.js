import i18next from 'i18next';

export default class I18nEndings {
	
	type = 'postProcessor';
	name = 'endings';
	search = /\[\[[0-9\.]+(\|.+)+\]\]/gm;
	
	
	constructor(options) {
		this.options = options;
	}
	
	
	static formatter(num, endings) {
		let textCase = 0;
		
		try {
			textCase = i18next.services.pluralResolver.getRule(i18next.language).plurals(num)
		} catch (e) {
			console.log(e);
		}
		
		return endings[textCase];
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
				const variant = this.getVariant(number, values, translator.lang);
				
				value = value.replace(inc, variant);
			});
			
			return value;
		}
		
		return value;
	}
}
