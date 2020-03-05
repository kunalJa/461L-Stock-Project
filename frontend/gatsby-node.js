const path = require(`path`)
const { StockData } = require("./src/fakedata.js")

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  StockData.forEach(stock => {
    createPage({
      path: `/stock/${stock.symbol}`,
      component: path.resolve(`./src/components/StockPage.jsx`),
      context: {
        slug: `/stock/${stock.symbol}`,
        id: `SitePage /stock/${stock.symbol}`,
        stock: stock,
      },
    })
  })
}
