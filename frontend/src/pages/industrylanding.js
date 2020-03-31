import React, { useState } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const Industrylanding = ({ data }) => {
  const industries = data.allMongodbStockInformationIndustry.edges
  const [page, setPage] = useState(0)
  const perPage = 6

  return (
    <>
      <Navbar />
      <div>
        <h2 class="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold' }}>
          All Industries: Click on an industry for more info!
        </h2>
      </div>
      <div className="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {industries.slice(page * perPage, (page + 1) * perPage).map(({ node }, i) => {
          return (
            <Card
              title={node.name}
              source_name={`Stocks included: ${node.stocks.toString()}`}
              news_url={`/industry/${node.name.split(" ").join("")}`}
              text={``}
              image_url={node.industry.data[32].image_url}
              internal
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
                () => setPage(Math.min(page + 1, Math.ceil(industries.length / perPage) - 1))
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

export default Industrylanding

export const industryData = graphql`
  query allIndustry {
    allMongodbStockInformationIndustry {
      edges {
        node {
          name
          stocks
          industry {
            data {
              image_url
            }
          }
        }
      }
    }
  }
`
