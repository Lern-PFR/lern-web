import {
	elevationFlat,
	elevationFirst,
	elevationSecond,
	elevationThird,
	elevationFourth,
	elevationFifth,
} from 'theme/elevations';
import { shallow } from 'enzyme';
import { StyledDiv } from 'components/shared/layout';

describe('Elevation', () => {
	describe('ElevationFlat', () => {
		it('should match previous snapshot', () => {
			const wrapper = shallow(<StyledDiv {...elevationFlat} />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('ElevationFlat', () => {
		it('should match previous snapshot', () => {
			const wrapper = shallow(<StyledDiv {...elevationFirst} />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('ElevationFlat', () => {
		it('should match previous snapshot', () => {
			const wrapper = shallow(<StyledDiv {...elevationSecond} />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('ElevationFlat', () => {
		it('should match previous snapshot', () => {
			const wrapper = shallow(<StyledDiv {...elevationThird} />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('ElevationFlat', () => {
		it('should match previous snapshot', () => {
			const wrapper = shallow(<StyledDiv {...elevationFourth} />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('ElevationFlat', () => {
		it('should match previous snapshot', () => {
			const wrapper = shallow(<StyledDiv {...elevationFifth} />);

			expect(wrapper).toMatchSnapshot();
		});
	});
});
