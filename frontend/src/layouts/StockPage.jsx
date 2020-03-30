import React from "react"
import { graphql } from "gatsby"
import { LineChart } from "react-chartkick"
import "chart.js"

import Navbar from "../components/Navbar"
import ExportCSV from "../components/ExportCSV"
import Card from "../components/Card"

export default function StockPage({ data }) {
  const stock = data.mongodbStockInformationInformation
  const historicData = {}
  const weeksData = {}
  const csvData = []
  stock.historical[0].dates.forEach((key, i) => {
    historicData[key] = stock.historical[0].prices[i]
    if (i >= stock.historical[0].dates.length - 7) {
      weeksData[key] = stock.historical[0].prices[i]
    }
    csvData.push({
      symbol: stock.symbol,
      date: key,
      price: stock.historical[0].prices[i],
    })
  })

  return (
    <>
      <Navbar />
      <h2 style={{ marginLeft: 45, marginTop: 15, fontWeight: 'bold'}}>Symbol: {stock.symbol}</h2>
      <h4 style={{ marginLeft: 45 }}>Name: {stock.name}</h4>
      <h4 style={{ marginLeft: 45 }}>Latest Price: {stock.latestPrice}</h4>
      <h4 style={{ marginLeft: 45 }}>Volume: {stock.latestVolume}</h4>
      <h4 style={{ marginLeft: 45 }}>Industry: {stock.industry}</h4>
      <br></br>
      
      <h2 style={{ marginLeft: 45, fontWeight: 'bold'}}>Historical Data</h2>
      <ExportCSV
        csvData={csvData}
        fileName={`${stock.symbol}-data`}
        buttonText={`Download ${stock.name}'s historical data as a CSV file`}
      />
      <LineChart data={historicData} min = {null} curve = {false}/>
      <h2 style={{ marginLeft: 45, fontWeight: 'bold'}}>Recent Changes (2020)</h2>
      <LineChart data= {weeksData} min = {null} curve = {false}/>
      <h2 style={{ marginLeft: 45, fontWeight: 'bold'}}>Recent News:</h2>
      <div className="card-deck" style={{ paddingLeft: 45, paddingRight: 45 }}>
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
