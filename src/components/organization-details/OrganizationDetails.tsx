import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './OrganizationDetails.scss';
import starShipsApi from '../../starships-api';
import { Loader, LoaderColor } from '../loader/Loader';

export function OrganizationDetails() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);
  const id = searchParams.get('uid');

  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        starShipsApi
          .getDetails(id)
          .then((IOrganization) => setOrganization(IOrganization))
          .finally(() => setLoading(false));
      } catch {
        throw new Error(`Can not find organization with uid=${id}`);
      }
    }
  }, [id]);

  const convertKeyToInfoFormat = (key: string) => {
    const copyKey = key[0].toUpperCase() + key.slice(1);
    let result = '';
    for (let char of copyKey) {
      result += char === char.toUpperCase() ? ' ' + char : char;
    }
    return result.trim();
  };

  const getLinkUrl = () => {
    return (
      'details/?' +
      `pageNumber=${searchParams.get('pageNumber')}` +
      `&pageSize=${searchParams.get('pageSize')}` +
      `&search=${searchParams.get('search')}`
    );
  };

  return (
    <article className={'organization-details' + (loading ? ' _loading' : '')}>
      {loading ? (
        <Loader color={LoaderColor.SALMON} />
      ) : (
        <>
          <NavLink className="organization-details__cross" to={getLinkUrl()} />
          <div className="organization-details__title">{organization.name}</div>
          <div className="organization-details__info">
            {Object.keys(organization).map((dataKey: string) => (
              // ['uid', 'name'].includes(dataKey) || !state[dataKey]
              //     ? ''
              //     :
              <div key={organization.uid + dataKey}>
                {convertKeyToInfoFormat(dataKey)} -{' '}
                {organization[dataKey] ? 'Yes' : 'No'}
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
