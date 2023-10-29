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
            type="text"
          className="form__input"
          onInput={(event: FormEvent) => this.setState({ searchValue: event.target.value.replace(/[^a-z]/gi, '') })}
            value={this.state.searchValue}
          placeholder="Type any value"
          pattern={/[a-zA-Z0-9]/i}
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
