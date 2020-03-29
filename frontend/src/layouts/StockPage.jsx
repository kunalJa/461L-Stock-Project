import React from "react"
import { graphql } from "gatsby"
import { LineChart } from "react-chartkick"
import "chart.js"
import { CSVLink, CSVDownload } from "react-csv";

import Navbar from "../components/Navbar"
import Card from "../components/Card"

export default function StockPage({ data }) {
  console.log(data)
  const stock = data.mongodbStockInformationInformation
  const historicData = {}
  const csvData = []
  stock.historical[0].dates.forEach(
    (key, i) => (historicData[key] = stock.historical[0].prices[i]),
  )

  return (
    <>
      <Navbar />
      <h2 style={{ marginLeft: 45, marginTop: 15 }}>Symbol: {stock.symbol}</h2>
      <h4 style={{ marginLeft: 45 }}>Name: {stock.name}</h4>
      <h3 style={{ marginLeft: 45 }}>Latest Price: {stock.latestPrice}</h3>
      <h4 style={{ marginLeft: 45 }}>Volume: {stock.latestVolume}</h4>
      <h4 style={{ marginLeft: 45 }}>Industry: {stock.industry}</h4>
      <br></br>
      <h2 style={{ marginLeft: 15 }}>Recent News:</h2>
      <CSVLink style={{ marginLeft: 45 }} data={stock.historical}> Download {stock.name}'s Stock Price as CSV</CSVLink>
      <LineChart data={historicData} />

      <div className="card-deck" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {stock.news.data.slice(1, 3).map((article, i) => {
          return (
            <Card
              title={article.title}
              source_name={article.source_name}
              news_url={article.news_url}
              text={article.text}
              image_url={article.image_url}
              key={i}
            />
          )
        })}
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query StockQuery($id: String!) {
    mongodbStockInformationInformation(id: { eq: $id }) {
      name
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
`
