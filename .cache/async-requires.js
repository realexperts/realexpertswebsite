// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-kontakt-index-js": () => import("./../src/pages/kontakt/index.js" /* webpackChunkName: "component---src-pages-kontakt-index-js" */),
  "component---src-pages-success-js": () => import("./../src/pages/success.js" /* webpackChunkName: "component---src-pages-success-js" */),
  "component---src-pages-tags-index-js": () => import("./../src/pages/tags/index.js" /* webpackChunkName: "component---src-pages-tags-index-js" */),
  "component---src-templates-blog-js": () => import("./../src/templates/blog.js" /* webpackChunkName: "component---src-templates-blog-js" */),
  "component---src-templates-blog-post-js": () => import("./../src/templates/blog-post.js" /* webpackChunkName: "component---src-templates-blog-post-js" */),
  "component---src-templates-category-page-js": () => import("./../src/templates/category-page.js" /* webpackChunkName: "component---src-templates-category-page-js" */),
  "component---src-templates-front-page-js": () => import("./../src/templates/front-page.js" /* webpackChunkName: "component---src-templates-front-page-js" */),
  "component---src-templates-portfolio-page-js": () => import("./../src/templates/portfolio-page.js" /* webpackChunkName: "component---src-templates-portfolio-page-js" */),
  "component---src-templates-simple-page-js": () => import("./../src/templates/simple-page.js" /* webpackChunkName: "component---src-templates-simple-page-js" */),
  "component---src-templates-tags-js": () => import("./../src/templates/tags.js" /* webpackChunkName: "component---src-templates-tags-js" */)
}

