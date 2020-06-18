const checkImageLoaded = (url) => new Promise((resolve, reject) => {
  try {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => {
        resolve();
      };
    }
  } catch (e) {
    reject(e);
  }
});

export const checkAllImagesLoadCompleted = (sources) => new Promise((resolve, reject) => {
  if (!sources.length) {
    resolve();
    return;
  }

  const allPromise = sources.map((src) => checkImageLoaded(src));
  Promise.all(allPromise)
    .then(resolve)
    .catch(reject);
});

export const debounce = (originalFunc, debounceTime = 300) => {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      originalFunc(...args);
    }, debounceTime);
  };
};

export default null;
