import { OrganizationsList } from '../organizations-list/OrganizationsList';
import { PagesBar } from '../pages-bar/PagesBar';
import './OrganizationsBar.scss';
import { useEffect, useState } from 'react';
import starShipsApi from '../../starships-api';
import { IOrganizationsResponse, IPage } from '../../models/organization.model';
import { Search } from '../search/Search';
import { useSearchParams } from 'react-router-dom';

export function OrganizationsBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [organizations, setOrganizations] = useState([]);
  const [searchValue, setSearchValue] = useState(searchParams.get('search'));
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState<IPage>(() => {
    const queryPageNumberParam: number = searchParams.get(
      'pageNumber'
    ) as number;
    const queryPageSizeParam: number = searchParams.get('pageSize') as number;
    return {
      pageNumber:
        queryPageNumberParam && queryPageNumberParam > 0
          ? queryPageNumberParam - 1
          : 0,
      pageSize: queryPageSizeParam || 10,
      firstPage: false,
      lastPage: false,
    };
  });

  useEffect(() => {
    setLoading(true);
    starShipsApi
      .getItems(pageState.pageNumber, pageState.pageSize, searchValue)
      .then((response: IOrganizationsResponse) => {
        setOrganizations(response.organizations);
        setPageState(response.page);
        setSearchParams((prev) => {
          const newParams = {
            pageNumber: (response.page.pageNumber + 1) as string,
            pageSize: response.page.pageSize as string,
          };
          if (prev.get('uid')) {
            newParams['uid'] = prev.get('uid');
          }
          if (prev.get('search')) {
            newParams['search'] = prev.get('search');
          }
          return newParams;
        });
      })
      .finally(() => setLoading(false));
  }, [pageState.pageNumber, pageState.pageSize, searchValue]);

  return (
    <article className="organizations-bar">
      <header className="organizations-bar__header">
        <Search
          searchValue={searchValue}
          updateItemsCallback={(newSearchValue) =>
            setSearchValue(newSearchValue)
          }
        />
        <button type="button" className="button organizations-bar__error">
          Throw error
        </button>
      </header>
      <OrganizationsList items={organizations} loading={loading} />
      <PagesBar
        loading={loading}
        data={pageState}
        updatePagesData={(newPage, newSize) => {
          setPageState((prevState) => ({
            ...prevState,
            pageNumber: newPage,
            pageSize: newSize,
          }));
        }}
      />
    </article>
  );
}
