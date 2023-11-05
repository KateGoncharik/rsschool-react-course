import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

export function MainLayout() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getRedirectString = () => {
    return (
      `${location.pathname}?` +
      `pageNumber=${searchParams.get('pageNumber') || 1}` +
      `&pageSize=${searchParams.get('pageSize') || 10}` +
      `&search=${localStorage.getItem('searchValue') || ''}` +
      (location.pathname.includes('details')
        ? '&uid=' + searchParams.get('uid')
        : '')
    );
  };

  return (
    <>
      <Navigate to={getRedirectString()} replace={true} />
      <Outlet />
    </>
  );
}
