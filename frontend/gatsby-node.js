const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const stockResult = await graphql(`
    query allStocks {
      allMongodbStockInformationInformation {
        edges {
          node {
            id
            name
            image
            symbol
            sector
            latestPrice
            industry
            latestVolume
            percentChange
            historical {
              dates
              prices
            }
            news {
              data {
                source_name
                news_url
                image_url
                text
                title
              }
            }
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
            stocks
            name
            percentChange
            industry {
              data {
                image_url
                news_url
                sentiment
                source_name
                text
                title
              }
            }
          }
        }
      }
    }
  `)

  if (stockResult.errors || industryResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  stockResult.data.allMongodbStockInformationInformation.edges.forEach(
    ({ node }) => {
      createPage({
        path: `/stock/${node.symbol}`,
        component: path.resolve(`./src/layouts/StockPage.jsx`),
        context: {
          stock: JSON.stringify(node),
        },
      })
    }
  )

  industryResult.data.allMongodbStockInformationIndustry.edges.forEach(
    ({ node }) => {
      createPage({
        path: `/industry/${node.name.split(" ").join("")}`,
        component: path.resolve(`./src/layouts/IndustryPage.jsx`),
        context: {
          industry: JSON.stringify(node),
        },
      })
    }
  )
}
