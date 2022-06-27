import React, { FC } from 'react';
import {
  Track_Order_Link,
  Return_Order_Link,
  Cancel_Order_Link,
  Privacy_Policy_Link,
  Return_Order_Policy_Link,
  Refund_Policy_Link,
  Manage_Your_Account_Link,
  Redeem_Gift_Codes_Link,
  Cart_Link,
  Facebook_Link,
  Instagram_Link,
  Twitter_Link,
  Youtube_Link,
} from '../../../../routerLinks/RouterLinks';
import { PageFooterLinks } from './PageFooterLinks';
import { PageFooterSocials } from './PageFooterSocials';
import { PageFooterSubscribe } from './PageFooterSubscribe';
import Facebook_Logo from '../../../../../public/images/social/facebook_square.png';
import Instagram_Logo from '../../../../../public/images/social/instagram_square.png';
import Twitter_Logo from '../../../../../public/images/social/twitter_square.png';
import Youtube_Logo from '../../../../../public/images/social/youtube_square.png';
import { PageFooterLinksFlex } from './PageFooterLinksFlex';

interface IProps {}

const Services = [
  {
    label: 'Track Order',
    to: Track_Order_Link,
  },
  {
    label: 'Return Order',
    to: Return_Order_Link,
  },
  {
    label: 'Cancel Order',
    to: Cancel_Order_Link,
  },
];

const Company = [
  {
    label: 'Privacy Policy',
    to: Privacy_Policy_Link,
  },
  {
    label: 'Return Order Policy',
    to: Return_Order_Policy_Link,
  },
  {
    label: 'Refund Policy',
    to: Refund_Policy_Link,
  },
];

const Account = [
  {
    label: 'Manage your Account',
    to: Manage_Your_Account_Link,
  },
  {
    label: 'Redeem Gift Codes',
    to: Redeem_Gift_Codes_Link,
  },
  {
    label: 'View all Orders',
    to: Cart_Link,
  },
];

const AccountForSmall = [
  {
    label: 'My Account',
    to: Manage_Your_Account_Link,
  },
  {
    label: 'Redeem Codes',
    to: Redeem_Gift_Codes_Link,
  },
  {
    label: 'My Orders',
    to: Cart_Link,
  },
];

const Socials = [
  {
    label: 'Facebook',
    icon: Facebook_Logo,
    to: Facebook_Link,
  },
  {
    label: 'Instagram',
    icon: Instagram_Logo,
    to: Instagram_Link,
  },
  {
    label: 'Twitter',
    icon: Twitter_Logo,
    to: Twitter_Link,
  },
  {
    label: 'Youtube',
    icon: Youtube_Logo,
    to: Youtube_Link,
  },
];

/**
 * @author
 * @function @FooterTop
 **/

export const FooterTop: FC<IProps> = (props) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm-750:flex lg-1100:grid-cols-3 lg-1100:grid-rows-1 xl-1300:grid-cols-4 xl-1300:grid-rows-1 relative w-full justify-between">
        <div className="grid w-full sm-750:grid-cols-2 sm-750:grid-rows-2">
          <PageFooterLinks heading="Services" Content={Services} />
          <PageFooterLinks heading="Company" Content={Company} />
          <PageFooterLinks heading="Account" Content={Account} />
          <PageFooterSocials heading="Socials" Content={Socials} />
        </div>
        <div className="w-full max-w-[50%] flex justify-center">
          <PageFooterSubscribe />
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex sm-750:hidden flex-col  relative w-full">
        <div className="w-full justify-center flex">
          <PageFooterSubscribe />
        </div>
        <PageFooterLinksFlex heading="Services" Content={Services} />
        <PageFooterLinksFlex heading="Company" Content={Company} />
        <PageFooterLinksFlex heading="Account" Content={AccountForSmall} />
        <PageFooterSocials heading="Socials" Content={Socials} />
      </div>
    </>
  );
};
