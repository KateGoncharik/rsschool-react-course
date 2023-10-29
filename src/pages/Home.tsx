import { Component } from 'react';
import { Search } from '../components/Search';
import { ItemsList } from '../components/ItemsList';
import { Film, FilmsResponse } from '../models/film.model';

interface IHomeState {
  items: Film[];
  loading: boolean;
  simulateRenderError?: boolean;
}

export default class Home extends Component<unknown, IHomeState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
    };
  }

  public handleSearch = (searchValue: string = ''): void => {
    this.setState({
      items: [],
      loading: true,
    });
    fetch(`https://swapi.dev/api/films?search=${searchValue}`)
      .then((data: Response) => data.json())
      .then((data: FilmsResponse) => {
        this.setState({
          items: data.results,
          loading: false,
        });
      });
  };

  public componentDidMount = (): void => {
    this.handleSearch();
  }

  render() {
      if (this.state.simulateRenderError) {
          throw new Error('Custom error');
      }
    return (
      <>
        <Search
          updateItemsCallback={this.handleSearch}
          loading={this.state.loading}
        />
        <ItemsList items={this.state.items} />
        <button className="form__button _error" onClick={() => this.setState((prev) => ({ ...prev, simulateRenderError: true }))}>Throw error</button>
      </>
    );
  }
}
