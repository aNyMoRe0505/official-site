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

export function useImageLoadCompleted(sources = []) {
  const [completed, setComplete] = useState(false);
  const sourcesRef = useRef();

  useEffect(() => {
    sourcesRef.current = sources;
  }, [sources]);


  useEffect(() => {
    let unmounted = false;
    let allImagesPromise;

    if (sourcesRef.current.length) {
      allImagesPromise = sourcesRef.current.map((src) => checkImageLoaded(src));
    } else {
      const allImages = document.getElementsByTagName('img');
      console.log('allImages', allImages, allImages.length);
      allImagesPromise = Array.from(allImages).map((img) => checkImageLoaded(img.src));
    }

    Promise.all(allImagesPromise)
      .then(() => {
        if (!unmounted) setComplete(true);
      })
      .catch((e) => {
        console.error(e);
      });

    return () => { unmounted = true; };
  }, []);

  return completed;
}

export function useScrollAnimation() {
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
