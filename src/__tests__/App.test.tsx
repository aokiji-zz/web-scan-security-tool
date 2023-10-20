import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HomeContainer } from '../renderer/pages/home/HomeContainer';

describe('App', () => {
  it('should render', () => {
    expect(render(<HomeContainer />)).toBeTruthy();
  });
});
