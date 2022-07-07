import dynamic from 'next/dynamic';
import React, { FC, ReactNode } from 'react';
import { MainHeaderProps } from '../header/MainHeader/MainHeader';
import { LoadingMainheader } from '../loader/LoadingSkeleton';
// import { MainHeader } from '../header/MainHeader/MainHeader';

const MainHeader = dynamic<MainHeaderProps>(
  () => import('../header/MainHeader/MainHeader').then((x) => x.MainHeader),
  {
    loading: () => <LoadingMainheader />,
    ssr: false,
  }
);

interface IProps {
  children: ReactNode;
  ChildPage: string;
  setChildPage: (value: string) => void;
}

/**
 * @author
 * @function @PageChildLayout
 **/

export const PageChildLayout: FC<IProps> = (props) => {
  return (
    <main className="w-full flex-grow z-auto mx-auto">
      <MainHeader Page={props.ChildPage} setPage={props.setChildPage} />
      <div className="w-full flex-grow z-auto max-w-[1440px] mx-auto">
        {props.children}
      </div>
    </main>
  );
};
