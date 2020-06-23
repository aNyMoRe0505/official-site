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
) {
  const savedFetchMoreFunc = useRef();

  useEffect(() => {
    savedFetchMoreFunc.current = fetchMoreFunc;
  });

  useEffect(() => {
    const scrolling = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      const remainingHeight = scrollHeight - (scrollTop + clientHeight);
      if (remainingHeight < 100) {
        savedFetchMoreFunc.current();
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
