/* eslint-disable no-console */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { checkAllImagesLoadCompleted } from './helper';

export function useImageLoadCompleted(sources = []) {
  const [completed, setComplete] = useState(false);
  const sourcesRef = useRef();

  useEffect(() => {
    sourcesRef.current = sources;
  }, [sources]);

  useEffect(() => {
    let unmounted = false;
    let allImagesSources = [];

    if (sourcesRef.current.length) {
      allImagesSources = sourcesRef.current;
    } else {
      const allImages = document.getElementsByTagName('img');
      allImagesSources = Array.from(allImages).map((img) => img.src);
    }

    checkAllImagesLoadCompleted(allImagesSources)
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        if (!unmounted) setComplete(true);
      });

    return () => { unmounted = true; };
  }, []);

  return completed;
}

export function useScrollAnimation(repeated = true) {
  const targetRef = useRef();
  const [actived, setActived] = useState(false);
  const repeatedRef = useRef(repeated);

  useEffect(() => {
    const options = {
      root: null,
      threshold: [0.2],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting, boundingClientRect } = entry;

        if (isIntersecting) {
          setActived(true);
        } else if (repeatedRef.current && boundingClientRect.top > 0) {
          setActived(false);
        }
      });
    }, options);

    observer.observe(targetRef.current);

    return () => { observer.disconnect(); };
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
  sentinelRef,
) {
  const savedFetchMoreFunc = useRef();

  useEffect(() => {
    savedFetchMoreFunc.current = fetchMoreFunc;
  });

  useEffect(() => {
    const options = {
      root: null,
      threshold: [0],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) savedFetchMoreFunc.current();
      });
    }, options);

    observer.observe(sentinelRef.current);

    return () => { observer.disconnect(); };
  }, [sentinelRef]);
}

export function useUnmounted() {
  const ummountedRef = useRef(false);
  useEffect(() => () => { ummountedRef.current = true; }, []);
  return ummountedRef;
}

export function usePreviouse(value) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;
  }, [value]);
  return prevRef.current;
}
