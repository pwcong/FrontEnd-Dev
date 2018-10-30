const Vue = require('vue');
const Koa = require('koa');
const KoaServe = require('koa-better-serve');
const KoaRouter = require('koa-router');

const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const template = require('fs').readFileSync(
  './src/index.template.html',
  'utf-8'
);

const app = new Koa();
app.use(KoaServe('./dist', '/'));

const router = new Router();

app.use(router.routes()).use(router.allowedMethods());
