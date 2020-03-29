import React from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const IndexPage = ({ data }) => {
  const news = data.allMongodbStockInformationNews.edges
  return (
    <>
      <Navbar />
      <div>
        <h1 class="home" style={{ marginLeft: 15, marginTop: 15 }}>
          Plumbing & co. Finance
        </h1>
      </div>
      <div className="card-deck ml-3">
        <img
          style={{ float: "left" }}
          src={
            "https://ojjme2x5sm337cgpo2mhuny3-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/director-of-finance-640x230.jpg"
          }
          alt=""
        />
        <h1 className="ml-5" style={{ float: "left", width: "600px" }}>
          The stock market is doing great! Click on our navigation links (above)
          to see information about each stock, industry, or related news!
        </h1>
      </div>
      <br></br>
      <div
        className="card-deck mt-5"
        style={{ paddingLeft: 15, paddingRight: 15 }}
      >
        {news.map(({ node }, i) => {
          return (
            <Card
              title={node.article.title}
              source_name={node.article.source_name}
              news_url={node.article.news_url}
              text={node.article.text}
              image_url={node.article.image_url}
              key={i}
            />
          )
        })}
      </div>
    </>
  )
}

export default IndexPage

export const newsTeslaResult = graphql`
  query teslaNews {
    allMongodbStockInformationNews(
      filter: { company: { eq: "Tesla Inc." } }
      limit: 3
    ) {
      edges {
        node {
          article {
            source_name
            news_url
            image_url
            text
            title
          }
        }
      }
    }
  }
`
