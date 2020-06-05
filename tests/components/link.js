import React from 'react';
import Link from '../../src/components/Link';
import { shallow } from 'enzyme';

describe('Link component', () => {
    it('should match the snapshot', () => {
        // Arrange
        const sut = shallow(<Link />)

        // Act

        // Assert
        expect(sut).toMatchSnapshot();
    });

    it('should change its css class when hovered', () => {
        // Arrange       
        const sut = shallow(<Link />)

        // Act
        sut.find('a').simulate('mouseenter');

        // Assert
        expect(sut.find('a').hasClass('hovered')).toBe(true);
    });
});