import React, { FC } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Button, IconButton } from '@mui/material';
import { TooltipDark } from '../../tooltip/TooltipDark';

interface IProps {}

/**
 * @author
 * @function @MainHeaderSearchButton
 **/

export const MainHeaderSearchButton: FC<IProps> = (props) => {
  return (
    <>
     <TooltipDark
        arrow
        placement="bottom-start"
        title={<h6 className="font-[400]">Search by product, category or collection</h6>}
      >
      <Button
        aria-label="desktop-search-button"
        disableRipple
        disableFocusRipple
        disableTouchRipple
        className="hidden md-900:block header-button-hover transition-all duration-300 text-white w-[160px] cursor-text justify-start button-text-lower p-[10px] rounded-full bg-[#202020] hover:bg-[#202020]"
      >
        <div className="space-x-3 flex items-center opacity-60 ml-1">
          <SearchIcon className="h-[14px] w-[14px]" />
          <h6 className="text-[12px] font-normal">Search</h6>
        </div>
      </Button>
      </TooltipDark>
      <TooltipDark
        arrow
        placement="bottom"
        title={<h6 className="font-[400]">Search by product, category or collection</h6>}
      >
        <IconButton
          disableFocusRipple
          aria-label="mobile-search-button"
          className="block md-900:hidden opacity-80 header-button-hover transition-all duration-300 button-text-lower h-full p-2.5 border border-solid border-[rgba(255,255,255,0.23)]"
          sx={{
            borderRadius: '6px !important',
            '.MuiTouchRipple-child': {
              borderRadius: '0 !important',
              backgroundColor: 'rgba(225, 225, 255, 0.5) !important',
            },
          }}
        >
          <SearchIcon className="h-4 w-4 opacity-80 header-icon-hover text-white" />
        </IconButton>
      </TooltipDark>
    </>
  );
};