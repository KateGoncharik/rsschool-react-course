import { useState } from 'react';
import { IOrganization } from '../models/organization.model';
import { OrganizationsBar } from '../components/organizations-bar/OrganizationsBar';
import { OrganizationDetails } from '../components/organization-details/OrganizationDetails';
import { STABDATA } from '../stabData';

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

  // const loadFilms = (searchValue: string = ''): void => {
  //   fetch(`https://swapi.dev/api/starships?search=${searchValue}`)
  //     .then((data: Response) => data.json())
  //     .then((data: OrganizationsResponse) => {
  //       if (localStorage.getItem('savedSearch')) {
  //         const storageData: Map<string, Organization[]> = getStorageData();
  //         storageData.set(searchValue, data.results);
  //         localStorage.setItem(
  //           'savedSearch',
  //           JSON.stringify(Object.fromEntries(storageData))
  //         );
  //       } else {
  //         localStorage.setItem(
  //           'savedSearch',
  //           JSON.stringify({ [searchValue]: data.results })
  //         );
  //       }
  //       setState({
  //         items: data.results,
  //         loading: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('Load data error: ', error);
  //       setState({
  //         items: [],
  //         loading: false,
  //       });
  //     });
  // };
  //
  // const handleSearch = (searchValue: string = ''): void => {
  //   if (state.loading) {
  //     return;
  //   }
  //
  //   localStorage.setItem('searchValue', searchValue || '');
  //
  //   setState({
  //     items: [],
  //     loading: true,
  //   });
  //
  //   if (localStorage.getItem('savedSearch')) {
  //     const storageData: Map<string, Organization[]> = getStorageData();
  //
  //     if (storageData.get(searchValue)) {
  //       setState({
  //         items: storageData.get(searchValue) as Organization[],
  //         loading: false,
  //       });
  //     } else {
  //       loadFilms(searchValue);
  //     }
  //   } else {
  //     loadFilms(searchValue);
  //   }
  // };
  //
  // useEffect(() => {
  //   handleSearch((localStorage.getItem('searchValue') as string) || '');
  // }, []);
  //
  // const getStorageData = (): Map<string, Organization[]> => {
  //   return new Map(
  //     Object.entries(
  //       JSON.parse(localStorage.getItem('savedSearch') as string) as {
  //         [searchValue: string]: Organization[];
  //       }
  //     )
  //   );
  // };

  if (state.simulateRenderError) {
    throw new Error('Custom error');
  }
  return (
    <>
      <OrganizationsBar />
      <OrganizationDetails data={STABDATA} />
    </>
  );
}
