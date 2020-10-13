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
      img.onerror = (e) => {
        reject(e);
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

export const groupBy = (arr, groupKeyTransformFn) => {
  const groupResult = [];

  arr.forEach((element) => {
    const groupKey = groupKeyTransformFn(element);
    const existTarget = groupResult.find((gr) => gr.key === groupKey);

    if (existTarget) {
      existTarget.items.push(element);
    } else {
      groupResult.push({
        key: groupKey,
        items: [element],
      });
    }
  });

  return groupResult;
};

export const rafSchd = (fn) => {
  let lastArgs;
  let frameId = null;
  const wrappedFn = (...args) => {
    lastArgs = args;
    if (frameId) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      frameId = null;
      fn(...lastArgs);
    });
  };
  return wrappedFn;
};
