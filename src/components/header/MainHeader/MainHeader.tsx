import { useCycle } from 'framer-motion';
import Router from 'next/router';
import React, { FC, useState } from 'react';
import { Cart_Link, Wishlist_Link } from '../../../routerLinks/RouterLinks';
import { MainHeaderCartButton } from '../../button/header/MainHeaderCartButton';
import { MainHeaderSearchButton } from '../../button/header/MainHeaderSearchButton';
import { MainHeaderWishlistButton } from '../../button/header/MainHeaderWishlistButton';
import { MainHeaderNav } from './assets/MainHeaderNav';
import { MainHeaderSlider } from './assets/MainHeaderSlider';

interface IProps {}

/**
 * @author
 * @function @ContentHeader
 **/

export const ContentHeader: FC<IProps> = (props) => {
  const [open, setOpen] = useCycle(false, true);
  const [Content, setContent] = useState('Discover');
  return (
    <div className="flex flex-col sticky-top items-start box-border w-full py-3 sm:py-4 backdrop-blur-sm bg-[rgba(18,18,18,0.85)]">
      <div className="flex relative box-border w-full max-w-[1440px] mx-auto justify-between items-center sm:px-5 px-3">
        <div className="flex relative md-900:space-x-6 items-center">
          <MainHeaderSearchButton />
          <MainHeaderNav
            open={open}
            onOpen={() => setOpen()}
            Value={Content}
            onValueChange={(value) => setContent(value)}
          />
        </div>
        <div className="flex relative space-x-2.5 sm:space-x-4 items-center">
          <MainHeaderWishlistButton
            Click={() => {
              setTimeout(() => {
                Router.push(Wishlist_Link);
              }, 150);
            }}
          />
          <MainHeaderCartButton
            Click={() => {
              setTimeout(() => {
                Router.push(Cart_Link);
              }, 150);
            }}
          />
        </div>
      </div>
      <MainHeaderSlider
        open={open}
        onClose={() => setOpen()}
        Value={Content}
        onValueChange={(value) => setContent(value)}
      />
    </div>
  );
};