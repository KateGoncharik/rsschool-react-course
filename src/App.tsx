import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { OrganizationDetails } from "./components/organization-details/OrganizationDetails";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/" element={<Main />}>
                <Route
                    path="details/:id"
                    element={<OrganizationDetails />}
                    // loader={organizationDetailsLoader}
                />
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Route>
    )
);

export function App() {
  return (
    <ErrorBoundary>
        <RouterProvider router={router}/>
    </ErrorBoundary>
  );
}
