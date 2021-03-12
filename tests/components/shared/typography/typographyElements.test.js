import { shallow } from 'enzyme';
import {
	Canon,
	Trafalgar,
	Paragon,
	GreatPrimer,
	DoublePica,
	BodyCopy,
	Pica,
	LongPrimer,
	Brevier,
	Minion,
} from 'components/shared/typography';

describe ('Exported typography elements', () => {
	describe('Canon', () => {
		it('should match previous snapshot', () => {
			const sut = (<Canon>Hello, world!</Canon>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Trafalgar', () => {
		it('should match previous snapshot', () => {
			const sut = (<Trafalgar>Hello, world!</Trafalgar>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Paragon', () => {
		it('should match previous snapshot', () => {
			const sut = (<Paragon>Hello, world!</Paragon>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('GreatPrimer', () => {
		it('should match previous snapshot', () => {
			const sut = (<GreatPrimer>Hello, world!</GreatPrimer>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('DoublePica', () => {
		it('should match previous snapshot', () => {
			const sut = (<DoublePica>Hello, world!</DoublePica>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('BodyCopy', () => {
		it('should match previous snapshot', () => {
			const sut = (<BodyCopy>Hello, world!</BodyCopy>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Pica', () => {
		it('should match previous snapshot', () => {
			const sut = (<Pica>Hello, world!</Pica>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('LongPrimer', () => {
		it('should match previous snapshot', () => {
			const sut = (<LongPrimer>Hello, world!</LongPrimer>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Brevier', () => {
		it('should match previous snapshot', () => {
			const sut = (<Brevier>Hello, world!</Brevier>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Minion', () => {
		it('should match previous snapshot', () => {
			const sut = (<Minion>Hello, world!</Minion>);
			const wrapper = shallow(sut);
			
			expect(wrapper).toMatchSnapshot();
		});
	});
});
