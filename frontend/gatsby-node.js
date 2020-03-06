const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const stockResult = await graphql(`
    query allStocks {
      allMongodbStockInformationInformation {
        edges {
          node {
            symbol
            id
          }
        }
      }
    }
  `)

  const industryResult = await graphql(`
    query allIndustry {
      allMongodbStockInformationIndustry {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `)

  const newsTeslaResult = await graphql(`
    query teslaNews {
      allMongodbStockInformationNews(
        filter: { company: { eq: "Tesla Inc." } }
        limit: 3
      ) {
        edges {
          node {
            article {
              title
            }
          }
        }
      }
    }
  `)

  const newsAppleResult = await graphql(`
    query appleNews {
      allMongodbStockInformationNews(
        filter: { company: { eq: "Apple Inc." } }
        limit: 3
      ) {
        edges {
          node {
            article {
              title
            }
          }
        }
      }
    }
  `)

  const newsUALResult = await graphql(`
    query ualNews {
      allMongodbStockInformationNews(
        filter: { company: { eq: "United Continental Holdings" } }
        limit: 3
      ) {
        edges {
          node {
            article {
              title
            }
          }
        }
      }
    }
  `)

  if (
    stockResult.errors ||
    industryResult.errors ||
    newsTeslaResult.errors ||
    newsAppleResult.errors ||
    newsUALResult.errors
  ) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  stockResult.data.allMongodbStockInformationIndustry.edges.forEach(
    ({ node }) => {
      createPage({
        path: `/stock/${node.symbol}`,
        component: path.resolve(`./src/layouts/StockPage.jsx`),
        context: {
          slug: `/stock/${node.symbol}`,
          id: `${node.id}`,
        },
      })
    }
  )
}
