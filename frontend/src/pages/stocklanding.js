import React, { useState } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const Stocklanding = ({ data }) => {
  const stocks = data.allMongodbStockInformationInformation.edges
  const [page, setPage] = useState(0)
  const [displayableItems, setDisplayableItems] = useState(stocks)
  const perPage = 6
  const numPages = Math.ceil(displayableItems.length / perPage)

  const searchFunction = e => {
    if (e.target.value !== "") {
      setDisplayableItems(stocks.filter(item => item.node.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.node.symbol.toLowerCase().includes(e.target.value.toLowerCase())))
      setPage(0)
    } else {
      setDisplayableItems(stocks);
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <h2 className="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold' }}>
          Top Stocks: Click on a stock for more info!
        </h2>
      </div>
      <div className="md-form m-3">
        <input className="form-control" type="text" onChange={searchFunction} placeholder="Search by name or symbol" aria-label="Search" />
      </div>
      <div className="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {displayableItems.slice(page * perPage, (page + 1) * perPage).map(({ node }, i) => {
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
      {numPages > 0 && <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          {page !== 0 && <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.max(page - 1, 0))
              }
            >
              Previous
            </button>
          </li>}
          <li className="page-item">
            <p className="page-link">{page + 1} of {numPages}</p>
          </li>
          {page !== numPages - 1 && <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.min(page + 1, Math.ceil(displayableItems.length / perPage) - 1))
              }
            >
              Next
            </button>
          </li>}
        </ul>
      </nav>}
      {numPages === 0 && <h1 className="m-3">No results found</h1>}
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
