const _ = require('lodash');
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

exports.sourceNodes = ({actions, getNodes, getNode}) => {
  const {createNodeField} = actions;
  const allNodes = getNodes();

  // Print some debug information on what nodes are actually there because
  // the order in which they are defined to be sourced in gatsby-config.js
  // does seem to matter!
  console.log(
    'All sourced nodes (type => id => name)',
    allNodes.map(someNode => someNode.internal.type + ' => ' + someNode.id + ' => ' + someNode.name),
  );

  const expandAuthorField = (nodeToExpand, authorTitle, fieldName) => {
    const authorNode = allNodes.find(someNode =>
      someNode.internal.type === 'MarkdownRemark' &&
      someNode.frontmatter.contentType === 'author' &&
      someNode.frontmatter.title === authorTitle,
    );
    if (authorNode) {
      // The following actually works but it's not the way it's been intended
      // since sources are considered to be immutable.
      // e.g. `settings.posts.defaultAuthor = authorNode.id;`
      createNodeField({
        node: nodeToExpand,
        name: fieldName,
        value: authorNode.id,
      });
    }
  };

  allNodes
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {

      if (node.frontmatter.featuredPost) {
        const postNode = allNodes.find(someNode =>
          someNode.internal.type === 'MarkdownRemark' &&
          someNode.frontmatter.title === node.frontmatter.featuredPost,
        );
        if (postNode) {
          createNodeField({
            node,
            name: 'featuredPost',
            value: postNode.id,
          });
        }
      }

      // Expand related posts to full blown nodes in fields.relatedPosts.
      if (node.frontmatter.relatedPosts) {
        const resolvedRelatedPosts = [];
        node.frontmatter.relatedPosts.map(relatedPost => {
          const postNode = allNodes.find(someNode =>
            someNode.internal.type === 'MarkdownRemark' &&
            someNode.frontmatter.title === relatedPost.post,
          );
          if (postNode) {
            resolvedRelatedPosts.push(postNode.id);
          }
        });
        if (resolvedRelatedPosts.length) {
          createNodeField({
            node,
            name: 'relatedPosts',
            value: resolvedRelatedPosts,
          });
        }
      }

      if (node.frontmatter.category) {
        const postNode = allNodes.find(someNode =>
          someNode.internal.type === 'MarkdownRemark' &&
          someNode.frontmatter.title === node.frontmatter.category,
        );
        if (postNode) {
          createNodeField({
            node,
            name: 'category',
            value: postNode.id,
          });
        }
      }

      if (node.frontmatter.categories) {
        const resolvedCategories = [];
        node.frontmatter.categories.map(category => {
          const postNode = allNodes.find(someNode => {
              return someNode.internal.type === 'MarkdownRemark' &&
                someNode.frontmatter.title === category.category;
            },
          );
          if (postNode) {
            resolvedCategories.push(postNode.id);
          }
        });
        if (resolvedCategories.length) {
          createNodeField({
            node,
            name: 'categories',
            value: resolvedCategories,
          });
        }
      }

      if (node.frontmatter.successStories) {
        const resolvedSuccessStories = [];
        node.frontmatter.successStories.map(successStory => {
          const postNode = allNodes.find(someNode => {
              return someNode.internal.type === 'MarkdownRemark' &&
                someNode.frontmatter.title === successStory.post;
            },
          );
          if (postNode) {
            resolvedSuccessStories.push(postNode.id);
          }
        });
        if (resolvedSuccessStories.length) {
          createNodeField({
            node,
            name: 'successStories',
            value: resolvedSuccessStories,
          });
        }
      }

      if (node.frontmatter.infoBox) {
          createNodeField({
            node,
            name: 'infoBox',
            value: node.frontmatter.infoBox,
          });
      }

      if (!!node.frontmatter.author) {
        expandAuthorField(node, node.frontmatter.author, 'author');
      }
    });

  // Expand the default author's information on the settings node.
  const settings = allNodes.find(node => node.internal.type === 'SettingsJson' && node.id === 'general-settings');
  if (!!settings.posts.defaultAuthor) {
    expandAuthorField(settings, settings.posts.defaultAuthor, 'defaultAuthor');
  }
};

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  return new Promise((resolve, reject) => {
    graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return reject(result.errors);
      }
      const {allMarkdownRemark: {edges: pages}} = result.data;

      pages.forEach(edge => {
        const id = edge.node.id;

        let slug = edge.node.fields.slug;
        if (slug === '/index/') {
          slug = '/';
        }

        createPage({
          path: slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
          ),
          // additional data can be passed via context
          context: {
            id,
            slug
          },
        });
      });

      // Create blog post list pages
      const postsPerPage = 6;
      const extraArticlesOnStartPage = 4;
      const blogArticles = pages.filter(page => page.node.frontmatter.templateKey === 'blog-post');
      const numPages = Math.ceil((blogArticles.length - extraArticlesOnStartPage) / postsPerPage);

      Array.from({length: numPages}).forEach((_, i) => {

        let numShown = i === 0 ? postsPerPage - extraArticlesOnStartPage : postsPerPage;
        let numSkip = i === 0 ? 0 : extraArticlesOnStartPage + i * postsPerPage;

        createPage({
          path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
          component: path.resolve('./src/templates/blog.js'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            slug: i === 0 ? `/blog/` : `/blog/${i + 1}`
          },
        });
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      pages.forEach(edge => {
        if (_.get(edge, `node.frontmatter.tags`)) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`;

        createPage({
          path: tagPath,
          component: path.resolve(`src/templates/tags.js`),
          context: {
            tag,
          },
        });
      });
      resolve();
    });

  });
};

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
    createNodeField({
      node,
      value,
    });

    // Fix all image paths got set by netlify-cms but are not resolvable
    // by imageSharp which needs those paths to be relative.
    // Actually, that's kind of a fragile setup since it makes the assumption
    // to find the static folder exactly three folders down from file the images
    // path was defined in.

    if (node.frontmatter.image) {
      let imagePath = node.frontmatter.image;
      if (node.frontmatter.image.startsWith('/img/')) {
        imagePath = `../../../static${node.frontmatter.image}`;
        createNodeField({
          name: `image`,
          node,
          value: imagePath,
        });
      }
    }

    if (node.frontmatter.thumbnail) {
      let imagePath = node.frontmatter.thumbnail;
      if (node.frontmatter.thumbnail.startsWith('/img/')) {
        imagePath = `../../../static${node.frontmatter.thumbnail}`;
        createNodeField({
          name: `thumbnail`,
          node,
          value: imagePath,
        });
      }
    }

    if (node.frontmatter.headerImage) {
      let imagePath = node.frontmatter.headerImage;
      if (node.frontmatter.headerImage.startsWith('/img/')) {
        imagePath = `../../../static${node.frontmatter.headerImage}`;
        createNodeField({
          name: `headerImage`,
          node,
          value: imagePath,
        });
      }
    }

    if (node.frontmatter.infoBox && node.frontmatter.infoBox.image) {
      let imagePath = node.frontmatter.infoBox.image;
      if (node.frontmatter.infoBox.image.startsWith('/img/')) {
        imagePath = `../../../static${node.frontmatter.infoBox.image}`;
        createNodeField({
          name: `infoBoxImage`,
          node,
          value: imagePath,
        });
      }
    }

    if (node.frontmatter.successStories && node.frontmatter.successStories.length > 0) {

      const successStoriesImages = node.frontmatter.successStories.map(successStory => {
        return `../../../static${successStory.storyImage}`
      });

      createNodeField({
        node,
        name: 'successStoriesImages',
        value: successStoriesImages,
      });

    }

  }

  const {frontmatter} = node;
  if (frontmatter) {
    const {headerImage, statements} = frontmatter;
    if (headerImage) {
      if (headerImage.indexOf('/img') === 0) {
        frontmatter.headerImage = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/static/', headerImage),
        );
      }
    }
    if(statements){
      statements.forEach((statement) => {
        if(statement.image && statement.image.indexOf('/img') === 0){
          statement.image = path.relative(
            path.dirname(node.fileAbsolutePath),
            path.join(__dirname, '/static/', statement.image),
          );
        }
      });
    }
  }

};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      statements: [Statement]
    }
    type Statement implements Node {
      author: String
      body: String
      image: File
    }`;

  createTypes(typeDefs)
};

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  actions: { replaceWebpackConfig }
}) => {
  switch (stage) {
    case 'build-javascript':
      // We want to include the babel polyfills before any application code,
      // so we're inserting it as an additional entry point.  Gatsby does not allow
      // this in "setWebpackConfig", so we have to use "replaceWebpackConfig"
      const config = getConfig();

      const app =
        typeof config.entry.app === 'string'
          ? [config.entry.app]
          : config.entry.app;

      config.entry.app = ['@babel/polyfill', ...app];
      replaceWebpackConfig(config);
  }
};

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  actions: { replaceWebpackConfig }
}) => {
  switch (stage) {
    case 'build-javascript':
      // We want to include the babel polyfills before any application code,
      // so we're inserting it as an additional entry point.  Gatsby does not allow
      // this in "setWebpackConfig", so we have to use "replaceWebpackConfig"
      const config = getConfig();

      const app =
        typeof config.entry.app === 'string'
          ? [config.entry.app]
          : config.entry.app;

      config.entry.app = ['@babel/polyfill', ...app];
      replaceWebpackConfig(config);
  }
};
