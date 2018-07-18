import sinon            from 'sinon';
import I18nInclinations from './i18next-inclinations-plugin';

describe('.I18nInclinations', function () {
	
	beforeEach(() => {
		this.sandbox = sinon.sandbox.create();
	});
	
	afterEach(() => {
		this.sandbox.restore();
	});
	
	describe('.formatter', () => {
		it('one', () => {
			const result = I18nInclinations.formatter(1, ['one', 'two', 'five']);
			expect(result).to.be.equal('one');
		});
		
		it('two', () => {
			const result = I18nInclinations.formatter(2, ['one', 'two', 'five']);
			expect(result).to.be.equal('two');
		});
		
		it('five', () => {
			const result = I18nInclinations.formatter(5, ['one', 'two', 'five']);
			expect(result).to.be.equal('five');
		});
		
		it('eleven', () => {
			const result = I18nInclinations.formatter(11, ['one', 'two', 'five']);
			expect(result).to.be.equal('five');
		});
		
		it('twenty', () => {
			const result = I18nInclinations.formatter(20, ['one', 'two', 'five']);
			expect(result).to.be.equal('five');
		});
		
		it('twenty two', () => {
			const result = I18nInclinations.formatter(22, ['one', 'two', 'five']);
			expect(result).to.be.equal('two');
		});
		
		it('float value', () => {
			const result = I18nInclinations.formatter(1.1, ['one', 'two', 'five']);
			expect(result).to.be.equal('two');
		});
		
		it('float value returns second variant all time', () => {
			const result = I18nInclinations.formatter(8.1, ['one', 'two', 'five']);
			expect(result).to.be.equal('two');
		});
		
	});
	
	it('has name inclinations and type postProcessor', () => {
		const i18n = new I18nInclinations();
		expect(i18n.name).to.be.equal('inclinations');
		expect(i18n.type).to.be.equal('postProcessor');
	});
	
	describe('#process', () => {
		const i18n = new I18nInclinations();
		
		it('one', () => {
			const result = i18n.process('Some string with 1 [[1|one value|two values|five values]]');
			expect(result).to.be.equal('Some string with 1 one value');
		});
		
		it('two', () => {
			const result = i18n.process('Some string with 2 [[2|one value|two values|five values]]');
			expect(result).to.be.equal('Some string with 2 two values');
		});
		
		it('five', () => {
			const result = i18n.process('Some string with 5 [[5|one value|two values|five values]]');
			expect(result).to.be.equal('Some string with 5 five values');
		});
		
		it('no result', () => {
			const result = i18n.process('Some string with 5');
			expect(result).to.be.equal('Some string with 5');
		});
		
		it('float value', () => {
			const result = i18n.process('Some string with 1.6 [[1.6|one value|two values|five values]]');
			expect(result).to.be.equal('Some string with 1.6 two values');
		});
		
		it('float value with second text all time', () => {
			const result = i18n.process('Some string with 6.6 [[6.6|one value|two values|five values]]');
			expect(result).to.be.equal('Some string with 6.6 two values');
		});
	});
	
	it('use custom formatter', () => {
		const fn = sinon.spy();
		const i18n = new I18nInclinations(fn);
		i18n.process('Some string with 5 [[5|one value|two values|five values]]');
		
		expect(fn.called).to.be.true;
	});
	
	it('use custom formatter calls with args', () => {
		const fn = sinon.spy();
		const i18n = new I18nInclinations(fn);
		i18n.process('Some string with 5 [[5|one value|two values|five values]]');
		const { args } = fn.getCall(0);
		
		expect(args[0]).to.be.equal(5);
		expect(args[1]).to.be.deep.eq(['one value', 'two values', 'five values']);
	});
	
	
	it('not apply formatter if value not match', () => {
		const fn = sinon.spy();
		const i18n = new I18nInclinations(fn);
		i18n.process('Some string with 5');
		
		expect(fn.called).to.be.false;
	});
	
});