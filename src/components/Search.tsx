import { Component, FormEvent } from 'react';

export interface ISearchProps {
  updateItemsCallback: (newSearchValue: string) => void;
  loading: boolean;
}

export interface ISearchState {
  searchValue: string;
}

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props) {
    super(props);
    this.state = { searchValue: '' };
  }

  handleSearch(event: MouseEvent): void {
    event.preventDefault();
    this.props.updateItemsCallback(this.state.searchValue);
  }

  render() {
    return (
      <form className="form">
        <input
          className="form__input"
          onInput={(event: FormEvent) =>
            this.setState({ searchValue: event.target.value })
          }
          placeholder="Type any value"
        />
        <button
          type="submit"
          className="form__button"
          onClick={(event: MouseEvent) => this.handleSearch(event)}
        >
          {this.props.loading ? (
            <span className="loader" />
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>
    );
  }
}
