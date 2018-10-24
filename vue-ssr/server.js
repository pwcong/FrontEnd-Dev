const server = require('express')();

// Production Environment
//const renderer = require('vue-server-renderer').createRenderer();

// Develop Environment
const { createBundleRenderer } = require('vue-server-renderer');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false // 推荐
});

const createApp = require('/path/to/built-server-bundle.js');

server.get('*', (req, res) => {
  const context = { url: req.url };

  // Production Environment
  // createApp(context).then(app => {
  //   renderer.renderToString(app, (err, html) => {
  //     if (err) {
  //       if (err.code === 404) {
  //         res.status(404).end('Page not found');
  //       } else {
  //         res.status(500).end('Internal Server Error');
  //       }
  //     } else {
  //       res.end(html);
  //     }
  //   });
  // });

  // Develop Environment
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
});
