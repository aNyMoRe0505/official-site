module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      "@babel/preset-env",
      "@babel/react"
    ],
    plugins: [
      "@babel/transform-runtime",
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
