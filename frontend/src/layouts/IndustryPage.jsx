import React from "react"
import { graphql, Link } from "gatsby"

import Navbar from "../components/Navbar"
import CardGrid from "../components/CardGrid"

export default function IndustryPage({ data }) {
  const industry = data.mongodbStockInformationIndustry
  return (
    <>
      <Navbar />
      <h2 style={{ marginLeft: 15, marginTop: 15, fontWeight: "bold" }}>
        Industry: {industry.name}
      </h2>

      {industry.percentChange > 1 && (
        <div className="alert alert-primary">
          Industry is doing Positively! : {industry.percentChange}%
        </div>
      )}
      {industry.percentChange < 1 && industry.percentChange > -1 && (
        <div className="alert alert-secondary">
          Industry is doing Neutral! : {industry.percentChange}%
        </div>
      )}
      {industry.percentChange < -1 && (
        <div className="alert alert-danger">
          Industry is doing Negatively! : {industry.percentChange}%
        </div>
      )}

      <h3 className="mt-3" style={{ marginLeft: 15 }}>
        Stocks that are part of this industry
      </h3>
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
        <CardGrid
          items={industry.industry.data.slice(1, 3).map(article => {
            return {
              title: article.title,
              footer: article.source_name,
              text: article.text,
              link: article.news_url,
              image_url: article.image_url,
              percentChange: 0,
            }
          })}
          interal_links={false}
          stock={false}
          percentChange={0}
        />
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query IndustryQuery($id: String!) {
    mongodbStockInformationIndustry(id: { eq: $id }) {
      stocks
      name
      percentChange
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
