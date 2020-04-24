import {
  useEffect,
  useRef,
} from 'react';

export function useBodyFetchMore(
  fetchMoreFunc,
  setLoading,
  loading,
) {
  const fetching = useRef(loading);
  const savedFetchMoreFunc = useRef();
  const savedSetLoading = useRef();

  useEffect(() => {
    savedFetchMoreFunc.current = fetchMoreFunc;
  }, [fetchMoreFunc]);

  useEffect(() => {
    savedSetLoading.current = setLoading;
  }, [setLoading]);

  useEffect(() => {
    fetching.current = loading;
  }, [loading]);

  useEffect(() => {
    const fetchMoreScope = () => {
      if (fetching.current) return;
      savedSetLoading.current(true);
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
