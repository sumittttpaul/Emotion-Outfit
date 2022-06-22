import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { LeftArrowButton, RightArrowButton } from './ThumbnailArrow';
import { ThumbnailMap } from './ThumbnailMap';
import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  MutableRefObject,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';

interface IProps {
  AutoPlay?: boolean;
  Duration?: number;
  ParentElementRef: MutableRefObject<null>;
  Thumbnail: { Label: string; URL: string }[];
  CarouselState: { Active: number; ImageURL: string };
  setCarouselState: Dispatch<
    SetStateAction<{ Active: number; ImageURL: string }>
  >;
}

/**
 * @Thumbnail_Slider
 **/
export const ThumbnailSlider: FC<IProps> = (props) => {
  const animation = useAnimation();
  const x = useMotionValue(0);
  const dragRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [ExceptionalHover, setExceptionalHover] = useState(false);
  const [DragHover, setDragHover] = useState(false);
  const [LeftHide, setLeftHide] = useState(false);
  const [RightHide, setRightHide] = useState(false);
  const [LeftAnimate, setLeftAnimate] = useState('closed');
  const [RightAnimate, setRightAnimate] = useState('closed');
  const [ContentExceed, setContentExceed] = useState(false);
  const [LeftIndicator, setLeftIndicator] = useState(true);
  const [RightIndicator, setRightIndicator] = useState(false);
  const setIntervalTime =
    props.Duration && props.AutoPlay ? props.Duration * 1000 : undefined;
  let IntervalPause = false;
  let CarouselInterval: any;
  let intervalTime = setIntervalTime;

  const NextCarousel = () => {
    const index =
      props.CarouselState.Active === props.Thumbnail.length - 1
        ? 0
        : props.CarouselState.Active + 1;
    //
    console.log(props.CarouselState.Active);
    console.log(props.Thumbnail.length - 1);

    //
    const Image = props.Thumbnail[index];
    if (!Image) return;
    var ThumbnailWidth: any = thumbnailRef.current;
    var ContainerWidth: any = props.ParentElementRef.current;
    if (ThumbnailWidth && ContainerWidth) {
      const IndexValue = index + 2;
      const ContentExceed = ThumbnailWidth.offsetWidth * IndexValue;
      if (ContainerWidth.offsetWidth < ContentExceed) {
        const getThubnailValue = ContainerWidth.offsetWidth - ContentExceed;
        const AnimationValue = getThubnailValue + 40;
        animation.start({
          x: AnimationValue,
        });
      } else {
        animation.start({
          x: 0,
        });
      }
    }
    props.setCarouselState({
      Active: index,
      ImageURL: Image.URL,
    });
    setLeftIndicator(true);
    setRightIndicator(false);
  };

  /* const PrevCarousel = () => {
    setCarouselActive(
      CarouselActive === 0 ? Thumbnail.length - 1 : CarouselActive - 1
    );
  }; */

  const StartCarousel = () => {
    CarouselInterval = setInterval(() => {
      if (!IntervalPause) {
        NextCarousel();
      }
    }, intervalTime);
  };
  const ClearCarousel = () => {
    clearInterval(CarouselInterval);
  };

  const onHoverCarouselStart = () => {
    IntervalPause = false;
    intervalTime = 0;
    setLeftIndicator(false);
    setRightIndicator(false);
  };
  const onHoverCarouselEnd = () => {
    IntervalPause = true;
    intervalTime = setIntervalTime;
    setLeftIndicator(true);
    setRightIndicator(false);
  };

  const LeftClick = () => {
    const xPos = x.get();
    var width: any = props.ParentElementRef.current;
    if (width) {
      const newXPosition = xPos + width.offsetWidth;
      animation.start({
        x: newXPosition > 0 ? 0 : newXPosition,
      });
    }
    HideButton();
  };
  const RightClick = () => {
    const xPos = x.get();
    var width: any = props.ParentElementRef.current;
    var scrollWidth: any = dragRef.current;
    if (width && scrollWidth) {
      const newXPosition = xPos - width.offsetWidth;
      const maxScroll = scrollWidth.offsetWidth - width.offsetWidth;
      animation.start({
        x: newXPosition < -maxScroll ? -maxScroll : newXPosition,
      });
    }
    HideButton();
  };

  const DragHoverStart = () => {
    setDragHover(true);
    setExceptionalHover(false);
    if (LeftHide) setLeftAnimate('open');
    if (RightHide) setRightAnimate('open');
  };
  const DragHoverEnd = () => {
    if (LeftHide) setLeftAnimate('closed');
    if (RightHide) setRightAnimate('closed');
    setExceptionalHover(true);
    setDragHover(false);
  };
  const ParentDragHoverEnd = () => {
    if (LeftHide) setLeftAnimate('closed');
    if (RightHide) setRightAnimate('closed');
    setExceptionalHover(true);
    setTimeout(() => {
      setDragHover(false);
    }, 50);
  };

  const ExceptionalDragHover = () => {
    if (ExceptionalHover) {
      if (LeftHide === true && LeftAnimate === 'open') {
        setLeftAnimate('closed');
      }
      if (RightHide === true && RightAnimate === 'open') {
        setRightAnimate('closed');
      }
    }
  };

  const HideButton = () => {
    const xPos = x.get();
    var width: any = props.ParentElementRef.current;
    var scrollWidth: any = dragRef.current;
    // Hide Left Button
    if (xPos >= -5) {
      setLeftAnimate('closed');
      setLeftHide(false);
    } else {
      setLeftAnimate('open');
      setLeftHide(true);
    }
    // Hide Right Button
    if (width && scrollWidth) {
      const maxScroll = scrollWidth.offsetWidth - width.offsetWidth - 5;
      if (xPos <= -maxScroll) {
        setRightAnimate('closed');
        setRightHide(false);
      } else {
        setRightAnimate('open');
        setRightHide(true);
      }
    }
  };

  const HideButtonInitialState = () => {
    const xPos = x.get();
    var width: any = props.ParentElementRef.current;
    var scrollWidth: any = dragRef.current;
    // Hide Arrow Left Button
    if (xPos >= -5) {
      setLeftHide(false);
    } else {
      setLeftHide(true);
    }
    // Hide Arrow Right Button
    if (width && scrollWidth) {
      const maxScroll = scrollWidth.offsetWidth - width.offsetWidth - 5;
      if (xPos <= -maxScroll) {
        setRightHide(false);
      } else {
        setRightHide(true);
      }
    }
  };
  const IsContentExceed = () => {
    const xPos = x.get();
    var width: any = props.ParentElementRef.current;
    var scrollWidth: any = dragRef.current;
    if (width && scrollWidth) {
      if (scrollWidth.offsetWidth > width.offsetWidth) {
        if (!ContentExceed) setContentExceed(true);
      } else {
        if (ContentExceed) setContentExceed(false);
        if (xPos < 0) {
          animation.start({
            x: 0,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (props.AutoPlay && props.Duration) StartCarousel();
    return () => ClearCarousel();
  }, [props.CarouselState]);

  useEffect(() => {
    x.onChange((latest) => {
      HideButton();
      return;
    });
    HideButtonInitialState(); /* Initial State */
  });

  useLayoutEffect(() => {
    IsContentExceed(); /* Initial State */
    window.addEventListener('resize', IsContentExceed);
    return () => window.removeEventListener('resize', IsContentExceed);
  });

  return (
    <motion.div
      onHoverEnd={() => {
        ParentDragHoverEnd();
        onHoverCarouselEnd();
      }}
      className={`${ContentExceed ? 'ml-auto' : 'mr-auto'} ${'z-[1]'}`}
    >
      <motion.div
        drag={ContentExceed ? 'x' : false}
        ref={dragRef}
        animate={animation}
        onHoverStart={() => {
          DragHoverStart();
          onHoverCarouselStart();
        }}
        onAnimationComplete={ExceptionalDragHover}
        onDragTransitionEnd={ExceptionalDragHover}
        onPointerLeave={() => setExceptionalHover(true)}
        transition={{ type: 'spring', bounce: 0.25 }}
        dragConstraints={props.ParentElementRef}
        whileDrag={{ cursor: 'grab' }}
        style={{ x }}
        className={`${
          ContentExceed ? 'ml-auto' : 'mr-auto'
        } ${'w-auto z-[1] flex space-x-2 px-8 pb-1 -mt-[80px]'}`}
      >
        <ThumbnailMap
          Duration={props.Duration}
          Thumbnail={props.Thumbnail}
          ThumbnailRef={thumbnailRef}
          CarouselState={props.CarouselState}
          LeftIndicator={LeftIndicator}
          RightIndicator={RightIndicator}
          setCarouselState={props.setCarouselState}
          setLeftIndicator={setLeftIndicator}
          setRightIndicator={setRightIndicator}
        />
      </motion.div>
      {ContentExceed && DragHover && (
        <>
          <LeftArrowButton
            animate={LeftAnimate}
            onClick={() => LeftClick()}
            onHoverStart={DragHoverStart}
            onHoverEnd={DragHoverEnd}
          />
          <RightArrowButton
            animate={RightAnimate}
            onClick={() => RightClick()}
            onHoverStart={DragHoverStart}
            onHoverEnd={DragHoverEnd}
          />
        </>
      )}
    </motion.div>
  );
};