import React from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const Newslanding = ({ data }) => {
  const news = data.allMongodbStockInformationNews.edges
  return (
    <>
      <Navbar />
      <div>
        <h2 class="home" style={{ marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>
          Latest Stock News
        </h2>
      </div>
      <br></br>
      <div class="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
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

export default Newslanding

export const newsData = graphql`
  query {
    allMongodbStockInformationNews(limit: 10) {
      edges {
        node {
          article {
            image_url
            news_url
            source_name
            text
            title
          }
        }
      }
    }
  }
`
