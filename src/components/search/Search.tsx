import './Search.scss';

export interface ISearchProps {
  updateItemsCallback?: (newSearchValue: string) => void;
  loading?: boolean;
}

// export interface ISearchState {
//   searchValue: string;
// }

export function Search(props: ISearchProps) {
  // const [state, setState] = useState<ISearchState>({ searchValue: '' });

  // useEffect(() => {
  //     setState({
  //         searchValue: localStorage.getItem('searchValue') as string,
  //     });
  // }, []);

  return (
    <form className="search__form">
      <input
        type="text"
        className="search__form__input"
        // onInput={(event: FormEvent) =>
        //   setState({
        //     searchValue: (event.target as HTMLInputElement).value.replace(
        //       /[^a-z]/gi,
        //       ''
        //     ),
        //   })
        // }
        // value={state.searchValue}
        placeholder="Type any value"
        pattern="/[a-zA-Z0-9]/i"
      />
      <button
        type="submit"
        className="search__form__button"
        // onClick={(event) => {
        //   event.stopPropagation();
        //   props.updateItemsCallback(state.searchValue);
        // }}
      >
        {props.loading ? <span className="loader" /> : <span>Search</span>}
      </button>
    </form>
  );
}
