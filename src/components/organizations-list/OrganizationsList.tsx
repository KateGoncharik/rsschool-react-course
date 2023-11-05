import { useEffect, useState } from 'react';
import { IOrganization } from '../../models/organization.model';
import './OrganizationsList.scss';
import { Loader, LoaderColor } from '../loader/Loader';
import { NavLink, useSearchParams } from 'react-router-dom';

export interface IOrganizationsListProps {
  loading: boolean;
  items: IOrganization[];
}

export function OrganizationsList({ loading, items }: IOrganizationsListProps) {
  const [searchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<IOrganization>();

  useEffect(() => {
    const urlUid: string = searchParams.get('uid');
    setSelectedItem(items.find((item) => item.uid === urlUid) as IOrganization);
  }, [items]);

  const getLinkUrl = (uid) => {
    return (
      'details/?' +
      `pageNumber=${searchParams.get('pageNumber')}` +
      `&pageSize=${searchParams.get('pageSize')}` +
      `&search=${searchParams.get('search')}` +
      `&uid=${uid}`
    );
  };
  return (
    <div className={'organizations-list' + (loading ? ' _loading' : '')}>
      {loading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : (
        items?.map((item: IOrganization) => (
          <NavLink
            to={getLinkUrl(item.uid)}
            className={`organizations-list-item ${
              selectedItem?.name === item.name ? '_active' : ''
            }`}
            onClick={() => setSelectedItem(item)}
            key={item.name}
          >
            {item.name}
          </NavLink>
        ))
      )}
    </div>
  );
}
