import React from "react"
import { Link } from "gatsby"

export default function Card({ title, text, source_name, news_url, image_url, internal, small }) {
  const style = small ? { width: "75px" } : { width: "250px" }
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex w-100">
          {image_url !== "" && <img style={style} className="rounded mx-auto d-block mb-3" src={image_url} alt="" />}
        </div>
        {!internal && (
          <a href={news_url} >
            <h5>{title}</h5>
            <p className="card-text">{text}</p>
          </a>
        )}
        {internal && (
          <Link to={news_url}>
            <h5>{title}</h5>
            <p className="card-text">{text}</p>
          </Link>
        )}
      </div>
      <div className="card-footer">
        <p className="text-muted">{source_name}</p>
      </div>
    </div>
  )
}
