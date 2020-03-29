import React, { useState } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const Newslanding = ({ data }) => {
  const news = data.allMongodbStockInformationNews.edges
  const [page, setPage] = useState(0)
  const perPage = 6

  return (
    <>
      <Navbar />
      <div>
        <h2 className="home" style={{ marginLeft: 15, marginTop: 15 }}>
          Latest Stock News
        </h2>
      </div>
      <br></br>
      <div className="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {news.slice(page * perPage, (page + 1) * perPage).map(({ node }, i) => {
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
      <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.max(page - 1, 0))
              }
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <p className="page-link">{page}</p>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.min(page + 1, Math.ceil(news.length / perPage)))
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Newslanding

export const newsData = graphql`
  query {
    allMongodbStockInformationNews(limit: 500) {
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
