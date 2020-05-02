import React from "react"

import Card from "../components/Card"

const CardGrid = ({ items, internal_links, stock }) => {
  return (
    <>
      {items.map(({ title, footer, link, text, image_url, percentChange }, i) => {
        return (
          <Card
            internalLinks={internal_links}
            title={title}
            footer={footer}
            link={link}
            text={text}
            image_url={image_url}
            stock={stock}
            percentChange={percentChange}
            key={i}
          />
        )
      })}
    </>
  )
}

export default CardGrid
