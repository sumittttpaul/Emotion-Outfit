import React, { FC, Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, IconButton } from '@mui/material';
import { XIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useAvatarState } from '../../providers/state/AvatarState';

interface IProps {}

/**
 * @author
 * @function @ShowAvatar
 **/

const ShowAvatar: FC<IProps> = (props) => {
  const { AvatarState, setAvatarState } = useAvatarState();

  const closeModal = () => {
    setAvatarState({ setShow: false });
  };

  return (
    <Transition appear show={AvatarState.setShow} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-75"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <Dialog.Panel className="absolute sm:max-w-sm sm:relative h-full w-full sm:w-auto sm:h-auto transform overflow-hidden sm:rounded-lg bg-white text-center align-middle shadow-xl transition-all">
                <div className="flex flex-col justify-center items-center">
                  {/* Header */}
                  <div className="flex w-full justify-between items-center p-1">
                    <h6 className="text-black font-medium pl-4">
                      Profile picture
                    </h6>
                    <IconButton
                      onClick={() => {
                        closeModal();
                      }}
                      className="hover:bg-[rgba(0,0,0,0.07)] p-3"
                    >
                      <XIcon className="h-5" />
                    </IconButton>
                  </div>
                  {/* Main */}
                  <div className="px-5 pb-5 space-y-5 flex flex-col items-center justify-center w-full">
                    <h6 className="text-[13px] text-black text-left w-full">
                      A picture helps people recognize you and lets you know
                      when you’re signed in to your account.
                    </h6>
                    <Button className="h-[288px] w-[288px] rounded-full p-0">
                      <Image
                        height={288}
                        width={288}
                        src="/images/user.jpg"
                        alt="user photo"
                      />
                    </Button>
                    <div className="flex space-x-2 w-full">
                      <Button 
                        sx={{
                          border: '1px solid rgba(26, 115, 232, 0.5)'
                        }}
                        className="button-text-lower text-[#1a73e8] w-full hover:bg-transparent active:bg-transparent">
                        <div className="flex space-x-2 items-center justify-center">
                          <Image height={20} width={20} src="/icons/edit.svg" />
                          <h6 className="text-[13px]">Change</h6>
                        </div>
                      </Button>
                      <Button 
                        sx={{
                          border: '1px solid rgba(26, 115, 232, 0.5)'
                        }}
                        className="button-text-lower text-[#1a73e8] w-full hover:bg-transparent active:bg-transparent">
                        <div className="flex space-x-2 items-center justify-center">
                          <Image height={20} width={20} src="/icons/edit.svg" />
                          <h6 className="text-[13px]">Remove</h6>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowAvatar;
