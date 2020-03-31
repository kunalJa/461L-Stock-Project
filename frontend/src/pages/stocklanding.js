import React, { useState } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const Stocklanding = ({ data }) => {
  const stocks = data.allMongodbStockInformationInformation.edges
  const [page, setPage] = useState(0)
  const perPage = 6
  return (
    <>
      <Navbar />
      <div>
        <h2 class="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold' }}>
          Top Stocks: Click on a stock for more info!
        </h2>
      </div>
      <div className="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {stocks.slice(page * perPage, (page + 1) * perPage).map(({ node }, i) => {
          return (
            <Card
              title={node.symbol}
              source_name={node.name}
              news_url={`/stock/${node.symbol}`}
              text={`Price Per Share: $${node.latestPrice}`}
              image_url={node.image}
              internal
              small
              key={i}
              industry={node.industry}
              percentChange={node.percentChange}
            />
          )
        })}
      </div>
      <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.max(page - 1, 0))
              }
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <p className="page-link">{page}</p>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.min(page + 1, Math.ceil(stocks.length / perPage) - 1))
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Stocklanding

export const stockData = graphql`
  query allStocks {
    allMongodbStockInformationInformation(sort: { fields: [latestPrice], order: DESC }) {
      edges {
        node {
          image
          symbol
          name
          latestPrice
          industry
          percentChange
        }
      }
    }
  }
`
