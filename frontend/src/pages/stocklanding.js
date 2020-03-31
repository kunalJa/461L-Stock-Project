import React from "react"
import { graphql, Link } from "gatsby"

import Navbar from "../components/Navbar"

const Stocklanding = ({ data }) => {
  const stocks = data.allMongodbStockInformationInformation.edges
  return (
    <>
      <Navbar />
      <div>
        <h2 class="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold'}}>
          Top Stocks: Click on a stock for more info!
          </h2>
      </div>
      <br></br>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">↑↓</th>
            <th scope="col">Industry</th>
          </tr>
        </thead>
        <tbody>
          {stocks
            .sort((a, b) => {
              return b.node.latestPrice - a.node.latestPrice
            })
            .map(({ node }, i) => {
              let sign = "", percentChangeColor = "red";
              if (node.percentChange > 0) { sign = "+"; percentChangeColor = "lime" }
              return (
                <tr key={i}>
                  <th scope="row">
                    <Link to={`/stock/${node.symbol}`}>{i}</Link>
                  </th>
                  <td>
                    <Link to={`/stock/${node.symbol}`}>{node.name}</Link>
                  </td>
                  <td>
                    <Link to={`/stock/${node.symbol}`}>{node.symbol}</Link>
                  </td>
                  <td>
                    <Link to={`/stock/${node.symbol}`}>{node.latestPrice}</Link>
                  </td>
                  <td>
                    <Link style={{color: percentChangeColor}} to={`/stock/${node.symbol}`}>{sign}{node.percentChange}</Link>
                  </td>
                  <td>
                    <Link to={`/stock/${node.symbol}`}>{node.industry}</Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <img
        style={{ width: "800px" }}
        src={
          "https://www.altran.com/as-content/uploads/sites/4/2017/05/5-0_finance_1600.jpg"
        }
        alt=""
      />
    </>
  )
}

export default Stocklanding

export const stockData = graphql`
  query allStocks {
    allMongodbStockInformationInformation {
      edges {
        node {
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
