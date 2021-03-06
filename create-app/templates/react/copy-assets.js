const path = require('path');
const generateHomePage = require('./generate-home-page');
const generateRoot = require('./generate-root');

module.exports = (options) => {
  const cwd = options.cwd || process.cwd();
  const { template, bundler } = options;
  const toCopy = [];

  // Copy Pages
  const pages = [
    '404',
    'about',
    'dynamic-route',
    'form',
    'request-and-load',
    ...(template === 'tabs' ? [
      'catalog',
      'product',
      'settings',
    ] : []),
    ...(template === 'split-view' ? [
      'left-page-1',
      'left-page-2',
    ] : []),
  ];

  pages.forEach((p) => {
    const src = path.resolve(__dirname, 'pages', `${p}.jsx`);
    const dest = path.resolve(cwd, 'src', 'pages', `${p}.jsx`);
    toCopy.push({
      from: src,
      to: dest,
    });
  });
  toCopy.push({
    content: generateHomePage(options),
    to: path.resolve(cwd, 'src', 'pages', 'home.jsx'),
  });
  toCopy.push({
    content: generateRoot(options),
    to: path.resolve(cwd, 'src', 'components', 'app.jsx'),
  });

  if (bundler) {
    toCopy.push({
      from: path.resolve(__dirname, 'babel.config.js'),
      to: path.resolve(cwd, 'babel.config.js'),
    });
  }

  if (bundler === 'rollup') {
    toCopy.push({
      from: path.resolve(cwd, 'node_modules/framework7/css/framework7.bundle.min.css'),
      to: path.resolve(cwd, 'src/css/framework7.bundle.min.css'),
    });
  }

  return toCopy;
};
