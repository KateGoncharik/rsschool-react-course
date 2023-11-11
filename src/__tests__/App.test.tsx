import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Renders main page correctly', async () => {
  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(<App />);

    const organizationsElements = await screen.findAllByRole(
      'organizationListItem'
    );
    await fireEvent.click(organizationsElements[0]);

    await waitFor(async () => {
      const organizationDetailsTitle = await screen.getByRole(
        'organizationDetailsTitle'
      );
      expect(organizationDetailsTitle).toHaveTextContent(
        '21st Street Mission (Los Angeles)'
      );
    });
  });
});
