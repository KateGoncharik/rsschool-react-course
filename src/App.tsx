import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { OrganizationDetails } from './components/organization-details/OrganizationDetails';
import { MainLayout } from './MainLayout';
import { OrganizationDetailsError } from './components/organization-details/OrganizationDetailsError';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Main />}>
        <Route
          path="details"
          element={<OrganizationDetails />}
          errorElement={<OrganizationDetailsError />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
