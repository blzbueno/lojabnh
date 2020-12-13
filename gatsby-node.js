const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsProduto {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsProduto.edges.map(({ node: produto }) => {
        createPage({
          path: `produtos/${produto.slug}`,
          component: path.resolve(`./src/templates/produto.js`),
          context: {
            slug: produto.slug,
          },
        })
      })
      resolve()
    })
  })
}
