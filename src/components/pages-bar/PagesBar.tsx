import './PagesBar.scss';
import { useState } from 'react';
import { IPage } from '../../models/organization.model';

export interface IPagesBarProps {
  loading: boolean;
  data: IPage;
  updatePagesData: (newPage: number, newSize: number) => void;
}

export function PagesBar({ loading, data, updatePagesData }: IPagesBarProps) {
  const [state, setState] = useState<IPage>(data);
  const [size, setSize] = useState(data?.pageSize);

  const handleSizeChange = () => {
    if (!loading) {
      setState((prevState) => ({
        ...prevState,
        pageNumber: 0,
        pageSize: size,
      }));
      updatePagesData(0, size);
    }
  };

  const changePage = (type: '+' | '-') => {
    const newPage: number =
      type === '+' ? state.pageNumber + 1 : state.pageNumber - 1;
    if (!loading) {
      setState((prevState) => ({
        ...prevState,
        pageNumber: newPage,
      }));
      updatePagesData(newPage, state.pageSize);
    }
  };

  return (
    <div className="pages-bar">
      <div className="pages-bar__state">
        <button
            type="button"
            className={
            'button pages-bar__button' + (state?.firstPage ? ' _disable' : '')
          }
          onClick={() => changePage('-')}
        >
          <div className="pages-bar__icon _arrow" />
        </button>
        <span className="pages-bar__page">{state?.pageNumber + 1}</span>
        <button
            type="button"
            className={
            'button pages-bar__button' + (state?.lastPage ? ' _disable' : '')
          }
          onClick={() => changePage('+')}
        >
          <div className="pages-bar__icon _arrow _rotate" />
        </button>
      </div>
      <form className="pages-bar__form">
        <input
          className="input pages-bar__form-field"
          type="number"
          value={size}
          onInput={(event) =>
            setSize((event.target as HTMLInputElement).value as number)
          }
        />
        <button
            type="button"
          className="button"
          onClick={(event) => {
            event.stopPropagation();
            handleSizeChange();
          }}
        >
          <div className="pages-bar__icon _reload" />
        </button>
      </form>
    </div>
  );
}
