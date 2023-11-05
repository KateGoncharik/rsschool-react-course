import { Outlet } from 'react-router-dom';
import { OrganizationsBar } from '../components/organizations-bar/OrganizationsBar';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

export default function Main() {
  return (
    <>
      <ErrorBoundary>
        <OrganizationsBar />
        <Outlet />
      </ErrorBoundary>
    </>
  );
}
