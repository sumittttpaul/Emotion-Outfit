import { useRouter } from 'next/navigation';
import { Home_Link } from 'routers/RouterLinks';
import { FooterLogo } from 'components/logo/CompanyLogo';
import { LoaderHook } from 'hooks/Hooks.Loader';
import { HomePageHook } from 'hooks/Hooks.HomePage';
import FooterBottom from './assets/FooterBottom';
import ScrollToTopButton from './assets/ScrollToTopButton';

function FooterMobile() {
  const { setHomePage } = HomePageHook();
  const { setLoader } = LoaderHook();
  const router = useRouter();
  return (
    <div className="w-full self-end pb-3 px-3 sm:pb-5 sm:px-5">
      <div className="w-full relative pb-5 sm:pb-8 sm:px-8 px-3 box-border rounded-3xl bg-gradient-to-t from-[#151515]">
        <div className="flex flex-col items-center justify-center">
          <FooterLogo
            onValueChange={(value) => {
              setHomePage(value);
              setLoader(true);
              router.push(Home_Link);
            }}
          />
          <h6 className="text-[11.5px] text-center py-2 font-[300] leading-[22px] whitespace-normal lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[55%] flex text-white opacity-80">
            Founded in 2023, Emotion is a outfit fashion brand that makes
            creative, distinctive fashion for the trendy, contemporary Indian.
            Emotion-outfit was created on the principle of creating impact
            through innovation, honesty and thoughtfulness. We like to
            experiment freely, which allows us to balance creativity and
            relatability, and our innovative designs. Our range of products is
            always fresh and up-to-date. Discover the new you with
            Emotion-outfit.
          </h6>
          <h6 className="text-[11.5px] py-2 font-[300] whitespace-normal flex text-white">
            Discover the new you with Emotion-outfit.
          </h6>
        </div>
        <FooterBottom />
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default FooterMobile;
