import { useState } from 'react';
import { IOrganization } from '../../models/organization.model';
import './OrganizationsList.scss';
import { Loader, LoaderColor } from '../loader/Loader';
import { NavLink } from "react-router-dom";

export interface IOrganizationsListProps {
  loading: boolean;
  items: IOrganization[];
}

export interface IOrganizationsListState {
  selectedItem?: IOrganization;
}

export function OrganizationsList({ loading, items }: IOrganizationsListProps) {
  const [state, setState] = useState<IOrganizationsListState>({});

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
    <div className={'organizations-list' + (loading ? ' _loading' : '')}>
      {loading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : (
        items?.map((item: IOrganization) => (
          <NavLink
              to={'details/' + item.uid}
            className={`organizations-list-item ${
              state.selectedItem?.name === item.name ? '_active' : ''
            }`}
            onClick={() => setState({ selectedItem: item })}
            key={item.name}
          >
            {item.name}
          </NavLink>
        ))
      )}
    </div>
  );
}
