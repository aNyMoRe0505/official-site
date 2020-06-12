/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import ghpages from 'gh-pages';
import debug from 'debug';

const debugDeploy = debug('GH-PAGES-DEPLOY:');

debug.enable('GH-PAGES-DEPLOY:*');

const distDir = path.resolve(__dirname, '../../build');

const options = {
  message: 'Auto Deploy',
  branch: 'gh-pages',
  repo: 'https://github.com/aNyMoRe0505/official-site.git',
};

debugDeploy('Deploy start...');

ghpages.publish(distDir, options, (err) => {
  if (err) {
    debugDeploy(`Deploy failed, message: ${err}`);
  } else {
    debugDeploy('Deploy Success');
  }
});
