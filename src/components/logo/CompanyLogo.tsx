import React from 'react';
import Image from 'next/image';
import Logo from '../../../public/agewear_white.svg';

export const TopHeaderLogo = () => {
  return (
    <div className="flex relative py-[8.4px] sm:px-[12px]">
      <Image
        height={32.5}
        width={32.5}
        className="opacity-70"
        src={Logo}
        alt="logo-svg"
        priority
      />
    </div>
  );
};

export const AuthHeaderLogo = () => {
  return (
    <Image
      height={45}
      width={45}
      className="opacity-70"
      src={Logo}
      alt="logo-svg"
      priority
    />
  );
};