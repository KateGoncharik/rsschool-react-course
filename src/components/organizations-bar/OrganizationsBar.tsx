import { OrganizationsList } from '../organizations-list/OrganizationsList';
import { PagesBar } from '../pages-bar/PagesBar';
import './OrganizationsBar.scss';
import { useEffect, useState } from 'react';
import starShipsApi from '../../starships-api';
import { IOrganizationsResponse, IPage } from '../../models/organization.model';
import { Search } from '../search/Search';

export function OrganizationsBar() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState<IPage>({
    pageNumber: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setLoading(true);
    starShipsApi
      .getItems(pageState.pageNumber, pageState.pageSize)
      .then((response: IOrganizationsResponse) => {
        setOrganizations(response.organizations);
        setPageState(response.page);
      })
      .finally(() => setLoading(false));
  }, [pageState.pageNumber, pageState.pageSize]);

  return (
    <aside className="organizations-bar">
      <header className="organizations-bar__header">
        <Search />
        <button type="button" className="button organizations-bar__error">
          Throw error
        </button>
      </header>
      <OrganizationsList items={organizations} loading={loading} />
      <PagesBar
        loading={loading}
        data={pageState}
        updatePagesData={(newPage, newSize) => {
          setPageState({
            ...pageState,
            pageNumber: newPage,
            pageSize: newSize,
          });
        }}
      />
    </aside>
  );
}
