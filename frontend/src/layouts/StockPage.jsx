import React from "react"
import { graphql } from "gatsby"

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
      <div className="card-deck" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {stock.news.map((source, i) => {
          const article = News[source]
          console.log(article)
          return (
            <Card title={article.title} source_name={article.source_name} news_url={article.news_url} text={article.text} image_url={article.image_url} key={i} />
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
