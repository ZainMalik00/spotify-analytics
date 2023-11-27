import { render, screen } from '@testing-library/react';
import MostRecentlyPlayedList from './MostRecentlyPlayedList';

test('renders learn react link', () => {
  render(<MostRecentlyPlayedList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
