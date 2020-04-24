import React from "react"
import { graphql } from "gatsby"
import { LineChart } from "react-chartkick"
import "chart.js"

import Navbar from "../components/Navbar"
import ExportCSV from "../components/ExportCSV"
import Card from "../components/Card"

export default function StockPage({ data }) {
  const stock = data.mongodbStockInformationInformation
  const industry = data.mongodbStockInformationIndustry
  console.log(industry.name);
  const historicData = {}
  const weeksData = {}
  const csvData = []
  let personalRating = 0
  var high = -1;
  var low = 100000000;
  stock.historical[0].dates.forEach((key, i) => {
    historicData[key] = stock.historical[0].prices[i]
    if (i >= stock.historical[0].dates.length - 7) {
      weeksData[key] = stock.historical[0].prices[i]
      if (stock.historical[0].prices[i] < low)
        low = stock.historical[0].prices[i]
      if (stock.historical[0].prices[i] > high)
        high = stock.historical[0].prices[i]
      personalRating += (stock.historical[0].prices[i] - stock.historical[0].prices[i - 1])
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
      <div style={{ width: "100%", alignItems: "center", justifyContent: "center" }} className="d-flex flex-direction-row center mb-5">
        <div className="">
          <h2 style={{ marginLeft: 45, marginTop: 15, fontWeight: 'bold' }}>
            Symbol: {stock.symbol}
          </h2>
          <h4 style={{ marginLeft: 45 }}>Name: {stock.name}</h4>
          <h4 style={{ marginLeft: 45 }}>Latest Price: {stock.latestPrice}</h4>
          <h4 style={{ marginLeft: 45 }}>Volume: {stock.latestVolume}</h4>
          <h4 style={{ marginLeft: 45 }}>Industry: {stock.industry}</h4>
          <h4 style={{ marginLeft: 45 }}>Our Perspective: {personalRating > 0 ? "The stock is going to rise" : "The stock is going to fall"}</h4>
       </div>
        <div className="">
          <img style={{ width: "120px", marginLeft: "100px" }} className="rounded my-5" src={stock.image} alt="" />
        </div>
      </div>

      <h2 style={{ marginLeft: 45, fontWeight: 'bold' }}>Historical Data</h2>
      <div style={{ marginLeft: 30, }}>
        <ExportCSV
          csvData={csvData}
          fileName={`${stock.symbol}-data`}
          buttonText={`Download ${stock.name}'s historical data as a CSV file`}
        />
      </div>
      <LineChart data={historicData} min={null} curve={false} />
      <h2 style={{ marginLeft: 45, marginTop: 45, fontWeight: 'bold' }}>Recent Changes (2020)</h2>
      <LineChart data={weeksData} min={null} curve={false} />
      <h2 style={{ marginLeft: 45, marginTop: 50, fontWeight: 'bold' }}>Weekly High: {high}</h2>
      <h2 style={{ marginLeft: 45, marginTop: 50, fontWeight: 'bold' }}>Weekly Low: {low}</h2>
      <h2 style={{ marginLeft: 45, marginTop: 50, fontWeight: 'bold' }}>Recent News:</h2>
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
    mongodbStockInformationIndustry {
      name
    }
  }
`
