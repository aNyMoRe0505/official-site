/* eslint-disable no-console */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

const checkImageLoaded = (url) => new Promise((resolve) => {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    resolve();
  } else {
    img.onload = () => {
      resolve();
    };
  }
});

export function useImageLoadCompleted() {
  const [completed, setComplete] = useState(false);

  useEffect(() => {
    let unmounted = false;

    const allImages = document.getElementsByTagName('img');
    const allImagesPromise = Array.from(allImages).map((img) => checkImageLoaded(img.src));
    Promise.all(allImagesPromise)
      .then(() => {
        if (!unmounted) setComplete(true);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => { unmounted = true; };
  }, []);

  return completed;
}

export function useAnimation() {
  const targetRef = useRef();
  const [actived, setActived] = useState(false);
  const activedRef = useRef();

  useEffect(() => {
    activedRef.current = actived;
  }, [actived]);

  useEffect(() => {
    const scrollFun = () => {
      if (!activedRef.current) {
        const { top } = targetRef.current.getBoundingClientRect();
        if (top <= window.innerHeight / 1.5) {
          setActived(true);
        }
      }
    };

    window.addEventListener('scroll', scrollFun);

    return () => window.removeEventListener('scroll', scrollFun);
  }, []);

  return [targetRef, actived];
}

export function useRepeatedAnimation(gapTime) {
  const [actived, setActived] = useState(true);
  const animationElement = useRef();

  useEffect(() => {
    let unMounted = false;
    const element = animationElement.current;

    const animationEndFunc = () => {
      setActived(false);

      setTimeout(() => {
        if (!unMounted) setActived(true);
      }, gapTime);
    };

    element.addEventListener('animationend', animationEndFunc);

    return () => {
      unMounted = true;
      element.removeEventListener('animationend', animationEndFunc);
    };
  }, [gapTime]);

  return [animationElement, actived];
}

export function useBodyFetchMore(
  fetchMoreFunc,
  loading,
) {
  const fetching = useRef(loading);
  const savedFetchMoreFunc = useRef();

  useEffect(() => {
    savedFetchMoreFunc.current = fetchMoreFunc;
  }, [fetchMoreFunc]);

  useEffect(() => {
    fetching.current = loading;
  }, [loading]);

  useEffect(() => {
    const fetchMoreScope = () => {
      if (fetching.current) return;
      savedFetchMoreFunc.current();
    };

    const scrolling = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      const remainingHeight = scrollHeight - (scrollTop + clientHeight);
      if (remainingHeight < 200) {
        fetchMoreScope();
      }
    };

    window.addEventListener('scroll', scrolling);

    return () => window.removeEventListener('scroll', scrolling);
  }, []);
}

export function useUnmounted() {
  const ummountedRef = useRef(false);
  useEffect(() => () => { ummountedRef.current = true; }, []);
  return ummountedRef;
}
