import React from "react"

export default function Card({ title, text, source_name, news_url, image_url }) {
  return (
    <div className="card">
      <div className="card-body">
        {image_url !== "" && <img style={{ width: "300px" }} className="card-img-top" src={image_url} alt="" />}
        <a href={news_url} >
          <h5>{title}</h5>
          <p className="card-text">{text}</p>
        </a>
      </div>
      <div className="card-footer">
        <p className="text-muted">{source_name}</p>
        <a href={news_url} className="text-muted">{news_url}</a>
      </div>
    </div>
  )
}
