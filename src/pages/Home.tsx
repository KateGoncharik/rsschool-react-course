import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { ItemsList } from '../components/ItemsList';
import { Film, FilmsResponse } from '../models/film.model';

interface IHomeState {
  items: Film[];
  loading: boolean;
  simulateRenderError?: boolean;
}

export default function Home() {
  const [state, setState] = useState<IHomeState>({
    items: [],
    loading: false,
  });

  const loadFilms = (searchValue: string = ''): void => {
    fetch(`https://swapi.dev/api/films?search=${searchValue}`)
      .then((data: Response) => data.json())
      .then((data: FilmsResponse) => {
        if (localStorage.getItem('savedSearch')) {
          const storageData: Map<string, Film[]> = getStorageData();
          storageData.set(searchValue, data.results);
          localStorage.setItem(
            'savedSearch',
            JSON.stringify(Object.fromEntries(storageData))
          );
        } else {
          localStorage.setItem(
            'savedSearch',
            JSON.stringify({ [searchValue]: data.results })
          );
        }
        setState({
          items: data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Load data error: ', error);
        setState({
          items: [],
          loading: false,
        });
      });
  };

  const handleSearch = (searchValue: string = ''): void => {
    if (state.loading) {
      return;
    }

    localStorage.setItem('searchValue', searchValue || '');

    setState({
      items: [],
      loading: true,
    });

    if (localStorage.getItem('savedSearch')) {
      const storageData: Map<string, Film[]> = getStorageData();

      if (storageData.get(searchValue)) {
        setState({
          items: storageData.get(searchValue) as Film[],
          loading: false,
        });
      } else {
        loadFilms(searchValue);
      }
    } else {
      loadFilms(searchValue);
    }
  };

  useEffect(() => {
    handleSearch((localStorage.getItem('searchValue') as string) || '');
  }, []);

  const getStorageData = (): Map<string, Film[]> => {
    return new Map(
      Object.entries(
        JSON.parse(localStorage.getItem('savedSearch') as string) as {
          [searchValue: string]: Film[];
        }
      )
    );
  };

  if (state.simulateRenderError) {
    throw new Error('Custom error');
  }
  return (
    <>
      <Search updateItemsCallback={handleSearch} loading={state.loading} />
      <ItemsList items={state.items} />
      <button
        type="button"
        className="form__button _error"
        onClick={() =>
          setState((prev) => ({ ...prev, simulateRenderError: true }))
        }
      >
        Throw error
      </button>
    </>
  );
}
