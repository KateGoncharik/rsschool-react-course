import { useState } from 'react';
import { IOrganization } from '../../models/organization.model';
import './OrganizationDetails.scss';

export interface IOrganizationDetailsProps {
  data: IOrganization;
}

export function OrganizationDetails({ data }: IOrganizationDetailsProps) {
  const [state] = useState(data);

  const convertKeyToInfoFormat = (s: string) => {
    s = s[0].toUpperCase() + s.slice(1);
    let result = '';
    for (let c of s) {
      if (c === c.toUpperCase()) {
        result += ' ' + c;
      } else {
        result += c;
      }
    }
    return result.trim();
  };

  return (
    <article className="organization-details">
      <div className="organization-details__title">{data.name}</div>
      <div className="organization-details__info">
        {Object.keys(state).map((dataKey: string) => (
          // ['uid', 'name'].includes(dataKey) || !state[dataKey]
          //     ? ''
          //     :
          <div key={state[dataKey].uid}>
            {convertKeyToInfoFormat(dataKey)} - {state[dataKey]}
          </div>
        ))}
      </div>
    </article>
  );
}
