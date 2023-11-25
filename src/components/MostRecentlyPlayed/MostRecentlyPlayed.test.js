import { render, screen } from '@testing-library/react';
import MostRecentlyPlayed from './MostRecentlyPlayed';

test('renders learn react link', () => {
  render(<MostRecentlyPlayed />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
