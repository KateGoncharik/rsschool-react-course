import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrganizationsList } from '../components/organizations-list/OrganizationsList';
import { mockOrganizations } from './mock/mock-organizations';
import { MemoryRouter } from 'react-router-dom';

describe('Cards list', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <OrganizationsList
          loading={false}
          items={mockOrganizations.organizations}
        />
      </MemoryRouter>
    );
    const itemsElements = await screen.findAllByRole('organizationListItem');
    expect(itemsElements).toHaveLength(10);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <OrganizationsList loading={false} items={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('No items')).toBeInTheDocument();
  });
});
