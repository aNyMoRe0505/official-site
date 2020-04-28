import {
  useEffect,
  useRef,
  useState,
} from 'react';

export function useRepeatedAnimation(gapTime) {
  const [actived, setActived] = useState(true);
  const animationElement = useRef();

  useEffect(() => {
    const element = animationElement.current;

    element.addEventListener('animationend', () => {
      setActived(false);
      setTimeout(() => {
        setActived(true);
      }, gapTime);
    });

    return () => {
      element.removeEventListener('animationend');
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

    return () => {
      window.removeEventListener('scroll', scrolling);
    };
  }, []);
}
