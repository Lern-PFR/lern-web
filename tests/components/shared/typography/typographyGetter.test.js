import {
	canon,
	trafalgar,
	paragon,
	doublePica,
	greatPrimer,
	bodyCopy,
	pica,
	longPrimer,
	brevier,
	minion,
} from 'theme/textStyles';
import { getTypographyStyleByName } from 'components/shared/typography';

describe('Typography styles helper method', () => {
	it('should match Canon typography style', () => {
		const actual = getTypographyStyleByName('canon');

		expect(actual).toStrictEqual(canon);
	});

	it('should match Trafalgar typography style', () => {
		const actual = getTypographyStyleByName('trafalgar');

		expect(actual).toStrictEqual(trafalgar);
	});

	it('should match Paragon typography style', () => {
		const actual = getTypographyStyleByName('paragon');

		expect(actual).toStrictEqual(paragon);
	});

	it('should match Great Primer typography style', () => {
		const actual = getTypographyStyleByName('greatprimer');

		expect(actual).toStrictEqual(greatPrimer);
	});

	it('should match Double Pica typography style', () => {
		const actual = getTypographyStyleByName('doublepica');

		expect(actual).toStrictEqual(doublePica);
	});

	it('should match Body Copy typography style', () => {
		const actual = getTypographyStyleByName('bodycopy');

		expect(actual).toStrictEqual(bodyCopy);
	});

	it('should match Pica typography style', () => {
		const actual = getTypographyStyleByName('pica');

		expect(actual).toStrictEqual(pica);
	});

	it('should match Long Primer typography style', () => {
		const actual = getTypographyStyleByName('longprimer');

		expect(actual).toStrictEqual(longPrimer);
	});

	it('should match Brevier typography style', () => {
		const actual = getTypographyStyleByName('brevier');

		expect(actual).toStrictEqual(brevier);
	});

	it('should match Minion typography style', () => {
		const actual = getTypographyStyleByName('minion');

		expect(actual).toStrictEqual(minion);
	});

	it('should match Brevier typography style', () => {
		const actual = getTypographyStyleByName('random string of text');

		expect(actual).toStrictEqual(brevier);
	});
});
