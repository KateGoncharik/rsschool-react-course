import { useEffect, useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import './OrganizationDetails.scss';
import starShipsApi from "../../starships-api";
import { Loader, LoaderColor } from "../loader/Loader";

// export function OrganizationDetails() {
//   const organization = useLoaderData()
//
//   const convertKeyToInfoFormat = (s: string) => {
//     s = s[0].toUpperCase() + s.slice(1);
//     let result = '';
//     for (let c of s) {
//       if (c === c.toUpperCase()) {
//         result += ' ' + c;
//       } else {
//         result += c;
//       }
//     }
//     return result.trim();
//   };
//
//   return (
//       <article className={'organization-details' + (!organization ? ' _loading' : '')}>
//         {
//           !organization
//               ? <Loader/>
//               : <>
//                 <div className="organization-details__title">{organization.name}</div>
//                 <div className="organization-details__info">
//                   {Object.keys(organization).map((dataKey: string) => (
//                       // ['uid', 'name'].includes(dataKey) || !state[dataKey]
//                       //     ? ''
//                       //     :
//                       <div key={organization[dataKey].uid}>
//                         {convertKeyToInfoFormat(dataKey)} - {organization[dataKey]}
//                       </div>
//                   ))}
//                 </div>
//               </>
//         }
//       </article>
//   );
// }
//
// export const organizationDetailsLoader = async ({ params }) => {
//   return await starShipsApi.getDetails(params.id);
// }

export function OrganizationDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      starShipsApi.getDetails(id)
          .then((IOrganization) => setOrganization(IOrganization))
          .finally(() => setLoading(false));
    }
  }, [id]);

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
      <article className={'organization-details' + (loading ? ' _loading' : '')}>
        {
          loading
              ? <Loader color={LoaderColor.SALMON}/>
              : <>
                <div className="organization-details__title">{organization.name}</div>
                <div className="organization-details__info">
                  {Object.keys(organization).map((dataKey: string) => (
                      // ['uid', 'name'].includes(dataKey) || !state[dataKey]
                      //     ? ''
                      //     :
                      <div key={organization[dataKey].uid}>
                        {convertKeyToInfoFormat(dataKey)} - {organization[dataKey]}
                      </div>
                  ))}
                </div>
              </>
        }
      </article>
  );
}
