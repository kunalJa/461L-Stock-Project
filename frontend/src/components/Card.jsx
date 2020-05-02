import React from "react"
import { Link } from "gatsby"

export default function Card({ title, text, footer, link, image_url, internal_links, stock, percentChange }) {
  const style = stock ? { width: "75px" } : { width: "250px" }
  let percentChangeColor = "red", percentChangeSign = "↓";
  if (percentChange > 0) { percentChangeColor = "green"; percentChangeSign = "↑"; }
  return (
    <div className="card text-white bg-dark mb-3">
      <div className="card-body">
        <div className="d-flex w-100">
          {image_url !== "" && <img style={style} className="rounded mx-auto d-block mb-3" src={image_url} alt="" />}
        </div>

        {!internal_links && (
          <a href={link} >
            <h5>{title}</h5>
            <p className="card-text">{text}</p>
          </a>
        )}

        {internal_links && !stock && (
          <Link to={link}>
            <h5>{title}</h5>
            <p className="card-text">{text}</p>
          </Link>
        )}

        {internal_links && stock && (
          <Link to={link}>
            <h5>{title}</h5>
            <p style={{ color: percentChangeColor }} className="card-text">{percentChangeSign}{percentChange.toString().substring(1)}%</p>
            <p className="card-text">{text}</p>
          </Link>
        )}

      </div>
      <div className="card-footer">
        <p className="text-muted">{footer}</p>
      </div>
    </div>
  )
}
