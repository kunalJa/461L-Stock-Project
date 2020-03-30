import React from "react"
import { graphql, Link } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

export default function IndustryPage({ data }) {
  const industry = data.mongodbStockInformationIndustry
  const sentiment = industry.industry.data[3].sentiment
  return (
    <>
      <Navbar />
      <h2 style={{ marginLeft: 15, marginTop: 15, fontWeight: 'bold'}}>
        Industry: {industry.name}
      </h2>
      {sentiment === "Positive" && (
        <div className="alert alert-primary">Industry is doing Positively!</div>
      )}
      {sentiment === "Neutral" && (
        <div className="alert alert-secondary">Industry is doing Neutral!</div>
      )}
      {sentiment === "Negative" && (
        <div className="alert alert-danger">Industry is doing Negatively!</div>
      )}
      <h3 className="mt-3" style={{marginLeft: 15}}>Stocks that are part of this industry</h3>
      <ul className="mb-5">
        {industry.stocks.map((stock, i) => {
          return (
            <li key={i}>
              <Link to={`/stock/${stock}`}>{stock}</Link>
            </li>
          )
        })}
      </ul>

      <div className="card-deck" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {industry.industry.data.slice(1, 3).map((article, i) => {
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
  query IndustryQuery($id: String!) {
    mongodbStockInformationIndustry(id: { eq: $id }) {
      stocks
      name
      industry {
        data {
          image_url
          news_url
          sentiment
          source_name
          text
          title
        }
      }
    }
  }
`
