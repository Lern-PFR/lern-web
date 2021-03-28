/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
// TODO: move to the official adapter once it is available
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

require('es6-promise').polyfill();
require('isomorphic-fetch');

configure({ adapter: new Adapter() });
