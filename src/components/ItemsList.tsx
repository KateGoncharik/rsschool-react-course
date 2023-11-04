import { useState } from 'react';
import { Film } from '../models/film.model';

export interface IItemsListProps {
  items: Film[];
}

export interface IItemsListState {
  selectedItem?: Film;
}

export function ItemsList(props: IItemsListProps) {
  const [state, setState] = useState<IItemsListState>({});

  // useEffect(() => {
  //     if (
  //         this.state.selectedItem &&
  //         this.props.items.length === 0 &&
  //         prevProps.items !== this.props.items
  //     ) {
  //         this.setState({});
  //     }
  // }, []);

  return (
    <div className="info">
      <div className="list">
        {props.items.map((item: Film) => (
          <div
            className={`list-item ${
              state.selectedItem?.episode_id === item.episode_id
                ? '_active'
                : ''
            }`}
            key={item.episode_id}
            onClick={() => setState({ selectedItem: item })}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="list">
        {state.selectedItem && props.items.length
          ? state.selectedItem.opening_crawl
          : ''}
      </div>
    </div>
  );
}
