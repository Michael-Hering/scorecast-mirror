import React from 'react';
import { render } from '@testing-library/react';
import FixtureList from './FixtureList';

test('renders without crashing', () => {
  render(<FixtureList />);
});
