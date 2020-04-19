const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/pages/404.js"))),
  "component---src-pages-kontakt-index-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/pages/kontakt/index.js"))),
  "component---src-pages-success-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/pages/success.js"))),
  "component---src-pages-tags-index-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/pages/tags/index.js"))),
  "component---src-templates-blog-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/blog.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/blog-post.js"))),
  "component---src-templates-category-page-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/category-page.js"))),
  "component---src-templates-front-page-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/front-page.js"))),
  "component---src-templates-portfolio-page-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/portfolio-page.js"))),
  "component---src-templates-simple-page-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/simple-page.js"))),
  "component---src-templates-tags-js": hot(preferDefault(require("/Users/jornschmidt/devid/realexperts/realexperts/src/templates/tags.js")))
}

