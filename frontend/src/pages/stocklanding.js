import React, { useState } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import CardGrid from "../components/CardGrid"

const Stocklanding = ({ data }) => {
  const stocks = data.allMongodbStockInformationInformation.edges
  const [displayableItems, setDisplayableItems] = useState(stocks)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortFunc, setSortFunc] = useState(0)
  const [lowRange, setLowRange] = useState(0)
  const [highRange, setHighRange] = useState(Number.MAX_SAFE_INTEGER)

  const [page, setPage] = useState(0)
  const perPage = 6
  const numPages = Math.ceil(displayableItems.length / perPage)

  const highToLow = (a, b) => b.node.latestPrice - a.node.latestPrice
  const lowToHigh = (a, b) => a.node.latestPrice - b.node.latestPrice
  const alphabetical = (a, b) => a.node.symbol.localeCompare(b.node.symbol)

  function whichSort() {
    let variableFunc
    switch (sortFunc) {
      case 0:
        variableFunc = highToLow
        break;
      case 1:
        variableFunc = lowToHigh
        break;
      default:
        variableFunc = alphabetical
    }
    return variableFunc
  }

  function searchChange(e) {
    setSearchTerm(e.target.value)
  }

  function searchSubmit(e) {
    if (e.key === "Enter") {
      if (searchTerm !== "") {
        let sortedArray = [...stocks]
          .filter(item => item.node.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.node.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter(item => item.node.latestPrice >= lowRange && item.node.latestPrice < highRange)
          .sort(whichSort())
        setDisplayableItems(sortedArray)
      } else {
        let filteredList = [...stocks]
          .filter(item => item.node.latestPrice >= lowRange && item.node.latestPrice < highRange)
          .sort(whichSort())
        setDisplayableItems(filteredList)
      }
      setPage(0)
    }
  }

  function formSubmit(e) {
    if (searchTerm !== "") {
      let sortedArray = [...stocks]
        .filter(item => item.node.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.node.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => item.node.latestPrice >= lowRange && item.node.latestPrice < highRange)
        .sort(whichSort())
      setDisplayableItems(sortedArray)
    } else {
      let filteredList = [...stocks]
        .filter(item => item.node.latestPrice >= lowRange && item.node.latestPrice < highRange)
        .sort(whichSort())
      setDisplayableItems(filteredList)
    }
    setPage(0)
    e.preventDefault()
  }

  let min = 1000000;
  let max = -1000000;
  var bestStockName;
  var worstStockName;
  for (let i = 0; i < 500; i++) {
    if (stocks[i].node.percentChange > max) {
      max = stocks[i].node.percentChange
      bestStockName = stocks[i].node.name
    }
    if (stocks[i].node.percentChange < min) {
      min = stocks[i].node.percentChange
      worstStockName = stocks[i].node.name
    }
  }

  console.log(max, min);
  return (
    <>
      <Navbar />
      <div>
        <h3 className="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold' }}>
          Best performing stock of today was {bestStockName} with an increase of {max}%
        </h3>
        <h3 className="home mb-4" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold' }}>
          Worst performing stock of today was {worstStockName} with a decrease of {min}%
        </h3>
        <h2 className="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold' }}>
          Top Stocks: Click on a stock for more info!
        </h2>
      </div>
      <nav className="m-3">
        <div className="md-form">
          <input className="form-control" type="text" onKeyDown={searchSubmit} onChange={searchChange} value={searchTerm} aria-label="Search" />
        </div>
        <form className="my-3" onSubmit={formSubmit}>
          <div className="mr-2 d-inline-block">
            <p className="d-inline-block mr-2">Sort by:</p>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option1" checked={sortFunc === 0} onChange={() => {
                  if (sortFunc !== 0) {
                    setSortFunc(0)
                  }
                }} />
            highest price</label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option2" checked={sortFunc === 1} onChange={() => {
                  if (sortFunc !== 1) {
                    setSortFunc(1)
                  }
                }} />
            lowest price</label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option3" checked={sortFunc === 2} onChange={() => {
                  if (sortFunc !== 2) {
                    setSortFunc(2)
                  }
                }} />
            alphabetical symbol</label>
            </div>
          </div>
          <div className="d-inline-block">
            <div className="mr-2 d-flex flex-row align-items-center">
              <span className="mr-2">Filter by price range:</span>
              <input className="form-control w-25" type="text" value={lowRange} onChange={(e) => {
                if (e.target.value === "") {
                  setLowRange(0)
                } else {
                  setLowRange(e.target.value)
                }
              }} />
              <span className="mx-2">to</span>
              <input className="form-control w-25 mr-3" type="text" value={highRange} onChange={(e) => {
                if (e.target.value === "") {
                  setHighRange(Number.MAX_SAFE_INTEGER)
                } else {
                  setHighRange(e.target.value)
                }
              }} />
              <input className="btn btn-outline-success" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </nav>
      <div className="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
        <CardGrid items={displayableItems.slice(page * perPage, (page + 1) * perPage).map(
          ({ node }) => {
            return {
              title: node.symbol,
              footer: node.name,
              text: `Price Per Share: $${node.latestPrice}`,
              link: `/stock/${node.symbol}`,
              image_url: node.image,
              percentChange: node.percentChange
            }
          }
        )} interal_links={true} stock={true} />
      </div>
      {numPages > 0 && <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          {page !== 0 && <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(Math.max(page - 1, 0))}
            >
              Previous
            </button>
          </li>
          }

          <li className="page-item">
            <p className="page-link">{page + 1} of {numPages}</p>
          </li>

          {page !== numPages - 1 && <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(Math.min(page + 1, Math.ceil(displayableItems.length / perPage) - 1))}
            >
              Next
            </button>
          </li>
          }
        </ul>
      </nav>}
      {numPages === 0 && <h1 className="m-3">No results found</h1>}
    </>
  )
}

export default Stocklanding

export const stockData = graphql`
  query allStocks {
          allMongodbStockInformationInformation(sort: {fields: [latestPrice], order: DESC }) {
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
