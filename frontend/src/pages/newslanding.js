import React, { useState } from "react"
import { graphql } from "gatsby"

import Navbar from "../components/Navbar"
import Card from "../components/Card"

const Newslanding = ({ data }) => {
  const uniqueTitles = new Set(data.allMongodbStockInformationNews.edges.map(a => a.node.article.title))
  const news = data.allMongodbStockInformationNews.edges.filter(a => {
    let seen = uniqueTitles.has(a.node.article.title)
    uniqueTitles.delete(a.node.article.title)
    return seen
  })
  const [displayableItems, setDisplayableItems] = useState(news)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortFunc, setSortFunc] = useState(0)

  const [page, setPage] = useState(0)
  const perPage = 6
  const numPages = Math.ceil(displayableItems.length / perPage)

  const alphabetical = (a, b) => a.node.article.title.localeCompare(b.node.article.title)
  const alphabeticalRev = (a, b) => b.node.article.title.localeCompare(a.node.article.title)

  function whichSort() {
    let variableFunc
    switch (sortFunc) {
      case 0:
        variableFunc = alphabetical
        break;
      default:
        variableFunc = alphabeticalRev
    }
    return variableFunc
  }

  function searchChange(e) {
    setSearchTerm(e.target.value)
  }

  function searchSubmit(e) {
    if (e.key === "Enter") {
      if (searchTerm !== "") {
        let sortedArray = [...news]
          .filter(item => item.node.article.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.node.article.source_name.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort(whichSort())
        setDisplayableItems(sortedArray)
      } else {
        let filteredList = [...news]
          .sort(whichSort())
        setDisplayableItems(filteredList)
      }
      setPage(0)
    }
  }

  function formSubmit(e) {
    if (searchTerm !== "") {
      let sortedArray = [...news]
        .filter(item => item.node.article.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.node.article.source_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort(whichSort())
      setDisplayableItems(sortedArray)
    } else {
      let filteredList = [...news]
        .sort(whichSort())
      setDisplayableItems(filteredList)
    }
    setPage(0)
    e.preventDefault()
  }

  return (
    <>
      <Navbar />
      <div>
        <h2 className="home" style={{ marginLeft: 15, marginTop: 15, fontWeight: 'bold' }}>
          Latest Stock News
        </h2>
      </div>
      <nav className="m-3">
        <div className="md-form">
          <input className="form-control" type="text" onKeyDown={searchSubmit} onChange={searchChange} value={searchTerm} aria-label="Search" />
        </div>
        <form className="my-3" onSubmit={formSubmit}>
          <div className="mr-2 d-inline-block">
            <p className="d-inline-block mr-2">Sort by:</p>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option1" checked={sortFunc === 0} onChange={() => {
                  if (sortFunc !== 0) {
                    setSortFunc(0)
                  }
                }} />
            ascending alphabetical</label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option2" checked={sortFunc === 1} onChange={() => {
                  if (sortFunc !== 1) {
                    setSortFunc(1)
                  }
                }} />
            descending alphabetical</label>
            </div>
          </div>
          <div className="d-inline-block">
            <input className="btn btn-outline-success" type="submit" value="Submit" />
          </div>
        </form>
      </nav>
      <div className="card-columns" style={{ paddingLeft: 15, paddingRight: 15 }}>
        {displayableItems.slice(page * perPage, (page + 1) * perPage).map(({ node }, i) => {
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
      {numPages > 0 && <nav aria-label="Page navigation" className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          {page !== 0 && <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.max(page - 1, 0))
              }
            >
              Previous
            </button>
          </li>}
          <li className="page-item">
            <p className="page-link">{page + 1} of {numPages}</p>
          </li>
          {page !== numPages - 1 && <li className="page-item">
            <button
              className="page-link"
              onClick={
                () => setPage(Math.min(page + 1, Math.ceil(displayableItems.length / perPage) - 1))
              }
            >
              Next
            </button>
          </li>}
        </ul>
      </nav>}
      {numPages === 0 && <h1 className="m-3">No results found</h1>}
    </>
  )
}

export default Newslanding

export const newsData = graphql`
  query {
    allMongodbStockInformationNews(limit: 750) {
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
