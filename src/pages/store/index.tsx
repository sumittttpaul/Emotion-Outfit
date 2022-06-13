import type { NextPage } from 'next';
import { PageContainerDark } from '../../components/container/PageContainerDark';
import { MainHeaderSlider } from '../../components/header/MainHeader/assets/MainHeaderSlider';
import { HeaderHome } from '../../components/header/MainHeader/HeaderHome';
import { HeaderHomeTop } from '../../components/header/TopHeader/HeaderHomeTop';

/**
 * @Store_Page
 **/
const Store: NextPage = () => {
  return (
    <PageContainerDark>
      <div className="w-full h-full box-border relative flex flex-col overflow-y-auto scroll-smooth">
        <HeaderHomeTop />
        <div className="w-full h-[20px] min-h-[20px] block bg-transparent" />
        <HeaderHome />
        <div className="w-full h-[20px] min-h-[20px] block bg-transparent" />
        <h6 className="text-white w-full flex justify-center">CONTENT</h6> 
      </div>
    </PageContainerDark>
  );
};

export default Store;