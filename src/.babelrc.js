module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  console.log(api.env('development'));
  return {
    presets: [
      "@babel/preset-env",
      "@babel/react"
    ],
    plugins: [
      "@babel/transform-runtime",
      api.env('development') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
