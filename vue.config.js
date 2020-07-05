module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/jump-block-website/'
    : '/',
  css: {
    extract: false
  }
}
