import React, { FC } from 'react';
import Link from 'next/link';

interface IProps {
  ClassName?: string;
  ButtonLabel: string;
}

export const SetupFooter: FC<IProps> = (props) => {
  return (
    <div
      className={`${props.ClassName} py-2 h-14 w-full flex flex-col space-y-1`}
    >
      <div className="w-full flex space-x-1">
        <h6 className="text-[13px] font-normal text-white tracking-wide opacity-[0.75] flex items-center">
          Choosing
        </h6>
        <h5 className="text-[13px] font-bold whitespace-nowrap text-white tracking-wide flex items-center">
          {props.ButtonLabel}
        </h5>
        <h6 className="text-[13px] truncate font-normal text-white tracking-wide opacity-[0.75] flex items-center">
          means that you agree to the
        </h6>
        <Link
          href=""
          className="text-[13px] hidden xs-435:flex md:hidden md-1000:flex hover:underline underline-offset-2 cursor-pointer whitespace-nowrap font-medium text-sky-400 tracking-wide items-center"
        >
          priavcy policy
        </Link>
        <h6 className="text-[13px] hidden xs-470:flex md:hidden whitespace-nowrap font-normal text-white tracking-wide opacity-[0.75] items-center">
          and
        </h6>
        <Link
          href=""
          className="text-[13px] hidden sm-600:flex md:hidden hover:underline underline-offset-2 cursor-pointer whitespace-nowrap font-medium text-sky-400 tracking-wide items-center"
        >
          terms and conditions
        </Link>
      </div>
      <div className="flex space-x-1 xs-435:-ml-1 md:ml-0 md-1000:-ml-1">
        <Link
          href=""
          className="text-[13px] flex xs-435:hidden md:flex md-1000:hidden hover:underline underline-offset-2 cursor-pointer whitespace-nowrap font-medium text-sky-400 tracking-wide items-center"
        >
          priavcy policy
        </Link>
        <h6 className="text-[13px] flex xs-470:hidden md:flex whitespace-nowrap font-normal text-white tracking-wide opacity-[0.75] items-center">
          and
        </h6>
        <Link
          href=""
          className="text-[13px] flex sm-600:hidden md:flex hover:underline underline-offset-2 cursor-pointer whitespace-nowrap font-medium text-sky-400 tracking-wide items-center"
        >
          terms and conditions
        </Link>
      </div>
    </div>
  );
};