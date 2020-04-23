const path = require('path')
const ghpages = require('gh-pages')

const distDir = path.resolve(__dirname, '../build');

const options = {
  message: 'Auto Deploy',
  branch: 'gh-pages',
  repo: 'https://github.com/aNyMoRe0505/official-site.git'
}

ghpages.publish(distDir, options, function(err) {
  console.log(err);
  if (!err) console.log('Deploy Success');
})
