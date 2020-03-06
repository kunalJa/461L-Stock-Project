import React from "react"
import { graphql } from "gatsby"
import { LineChart } from "react-chartkick"
import "chart.js"

import Navbar from "../components/Navbar"
import Card from "../components/Card"
import { News } from "../fakedata.js"

export default function StockPage({ data }) {
  const stock = data.allSitePage.edges[0].node.context.stock
  return (
    <>
      <Navbar />
      <h2 style={{ marginLeft: 45, marginTop: 15 }}>{stock.symbol}</h2>
      <h3 style={{ marginLeft: 45 }}>{stock.latestPrice}</h3>
      <h4 style={{ marginLeft: 45 }}>Name:{stock.name}</h4>
      <h4 style={{ marginLeft: 45 }}>Open:{stock.open}</h4>
      <h4 style={{ marginLeft: 45 }}>Close:{stock.close}</h4>
      <h4 style={{ marginLeft: 45 }}>Industry:{stock.industry}</h4>
      <br></br>
      <h2 style={{ marginLeft: 15 }}>Recent News:</h2>

      <LineChart
        data={{
          "2020-03-13": 320.3,
          "2020-03-14": 313.05,
          "2020-03-15": 298.18,
          "2020-03-16": 288.08,
          "2020-03-17": 292.65,
          "2020-03-18": 273.52,
          "2020-03-19": 273.36,
          "2020-03-20": 298.81,
          "2020-03-21": 289.32,
          "2020-03-22": 302.74,
          "2020-03-23": 320.3,
          "2020-03-24": 313.05,
          "2020-03-25": 298.18,
          "2020-03-26": 288.08,
          "2020-03-27": 292.65,
          "2020-03-28": 273.52,
          "2020-03-29": 273.36,
          "2020-03-30": 298.81,
          "2020-03-31": 289.32,
          "2020-04-1": 302.74,
          "2020-04-2": 320.3,
          "2020-04-3": 313.05,
          "2020-04-4": 298.18,
          "2020-04-5": 288.08,
          "2020-04-6": 292.65,
          "2020-04-7": 273.52,
          "2020-04-8": 273.36,
          "2020-04-9": 298.81,
          "2020-04-10": 289.32,
          "2020-04-11": 302.74,
          "2020-04-12": 320.3,
          "2020-04-13": 313.05,
          "2020-04-14": 298.18,
          "2020-04-15": 288.08,
          "2020-04-16": 292.65,
          "2020-04-17": 273.52,
          "2020-04-18": 273.36,
          "2020-04-19": 298.81,
          "2020-04-20": 289.32,
          "2020-04-21": 302.74,
        }}
      />

      <div className="card-deck" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {stock.news.map((source, i) => {
          const article = News[source]
          console.log(article)
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
    allSitePage(filter: { id: { eq: $id } }) {
      edges {
        node {
          context {
            stock {
              name
              latestPrice
              symbol
              open
              news
              latestVolume
              industry
              historicClose
              exchange
              close
            }
          }
        }
      }
    }
  }
`
