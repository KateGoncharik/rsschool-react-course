import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IOrganization } from '../models/organization.model';
import { OrganizationsBar } from '../components/organizations-bar/OrganizationsBar';

interface IHomeState {
  items: IOrganization[];
  loading: boolean;
  simulateRenderError?: boolean;
}

export default function Main() {
  const [state] = useState<IHomeState>({
    items: [],
    loading: false,
  });

  if (state.simulateRenderError) {
    throw new Error('Custom error');
  }
  return (
    <>
      <OrganizationsBar />
      <Outlet/>
    </>
  );
}
