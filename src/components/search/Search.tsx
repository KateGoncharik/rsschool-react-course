import './Search.scss';
import { FormEvent, useEffect, useState } from 'react';

export interface ISearchProps {
  updateItemsCallback?: (newSearchValue: string) => void;
  loading?: boolean;
  searchValue?: string;
}

export function Search({
  updateItemsCallback,
  loading,
  searchValue,
}: ISearchProps) {
  const [search, setSearch] = useState<string>();

  useEffect(() => setSearch(searchValue), [searchValue]);

  return (
    <form className="search__form">
      <input
        type="text"
        className="search__form__input"
        onInput={(event: FormEvent) =>
          setSearch(
            (event.target as HTMLInputElement).value.replace(/[^a-z]/gi, '')
          )
        }
        value={search}
        placeholder="Type any value"
      />
      <button
        type="submit"
        className="search__form__button button"
        onClick={(event) => {
          event.stopPropagation();
          updateItemsCallback(search);
        }}
      >
        Search
      </button>
    </form>
  );
}
