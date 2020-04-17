const path = require('path')
const ghpages = require('gh-pages')

const distDir = path.resolve(__dirname, '../build');

const options = {
  message: 'Auto Deploy',
}

ghpages.publish(distDir, options, function(err) {
  if (!err) console.log('Deploy Success');
})
