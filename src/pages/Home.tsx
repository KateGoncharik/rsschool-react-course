import { Component } from 'react';
import { Search } from '../components/Search';
import { ItemsList } from '../components/ItemsList';
import { Film, FilmsResponse } from '../models/film.model';

interface HomeState {
  items: Film[];
  loading: boolean;
}

export default class Home extends Component<unknown, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
    };
  }

  handleSearch(searchValue: string): void {
    this.setState({
      items: [],
      loading: true,
    });
    fetch('https://swapi.dev/api/films/')
      .then((data: Response) => data.json())
      .then((data: FilmsResponse) => {
        this.setState({
          items: data.results,
          loading: false,
        });
      });
  }

  render() {
    return (
      <>
        <Search
          updateItemsCallback={this.handleSearch.bind(this)}
          loading={this.state.loading}
        />
        <ItemsList items={this.state.items} />
      </>
    );
  }
}
