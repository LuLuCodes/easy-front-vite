module.exports = ({ file }) => {
  const isVant = file && file.dirname && file.dirname.indexOf('vant') > -1
  return {
    plugins: {
      'postcss-nested': {},
      tailwindcss: {},
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: isVant ? 375 : 750,
        unitPrecision: 6,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false,
      },
    },
  }
}
