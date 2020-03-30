import React from "react"
import { graphql, Link } from "gatsby"

import Navbar from "../components/Navbar"

const Industrylanding = ({ data }) => {
  const industries = data.allMongodbStockInformationIndustry.edges
  return (
    <>
      <Navbar />
      <div>
        <h2 class="home" style={{ marginTop: 15, marginLeft: 15, fontWeight: 'bold'}}>
          All Industries: Click on an industry for more info!
        </h2>
      </div>
      <br></br>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        {industries.map(({ node }, i) => {
          return (
            <tr key={i}>
              <td>
                <Link to={`/industry/${node.name.split(" ").join("")}`}>
                  {node.name}
                </Link>
              </td>
            </tr>
          )
        })}
      </table>
      <img
        style={{ width: "800px" }}
        src={"https://miro.medium.com/max/1000/1*yPElCHCwklSJez2yKEh3Cw.jpeg"}
        alt=""
      />
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
        }
      }
    }
  }
`
