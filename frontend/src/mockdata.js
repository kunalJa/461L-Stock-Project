const StockData = [
  {
    symbol: "AAPL",
    exchange: "NASDAQ",
    name: "Apple Inc.",
    latestPrice: 302.74,
    latestVolume: 54445841,
    open: 296.8,
    close: 302.74,
    historicClose: [
      320.3,
      313.05,
      298.18,
      288.08,
      292.65,
      273.52,
      273.36,
      298.81,
      289.32,
      302.74,
    ],
    news: [0, 1],
    industry: 0,
  },
  {
    symbol: "GOOGL",
    exchange: "NASDAQ",
    name: "Alphabet Inc. Class A",
    latestPrice: 1381.6,
    latestVolume: 2379935,
    open: 1358.96,
    close: 1381.6,
    historicClose: [
      320.3,
      313.05,
      298.18,
      288.08,
      292.65,
      273.52,
      273.36,
      298.81,
      289.32,
      302.74,
    ],
    news: [0],
    industry: 0,
  },
  {
    symbol: "FB",
    exchange: "NASDAQ",
    name: "Facebook Inc. Class A",
    latestPrice: 191.76,
    latestVolume: 22888182,
    open: 198.17,
    close: 191.76,
    historicClose: [
      120.3,
      113.05,
      198.18,
      188.08,
      192.65,
      173.52,
      173.36,
      198.81,
      189.32,
      102.74,
    ],
    news: [0, 2],
    industry: 0,
  },
]

const IndustryData = [
  {
    name: "tech",
    stocks: [0, 1, 2],
    price: 1000231,
  },
  {
    name: "media",
    stocks: [],
    price: 10001,
  },
  {
    name: "coal",
    stocks: [],
    price: 35242,
  },
]

const News = [
  {
    source_name: "Halberg",
    title: "The Sun never sets",
    news_url: "https://www.bloomberg.com",
    text: "Why Japan is a great investment.",
    image_url:
      "https://www.crystalfontz.com/images/products/CFAL12832DCW/8x8_CFAL12832D.jpg",
  },
  {
    source_name: "Michael Reeji",
    title: "How to eat more Apple",
    news_url: "https://www.apple.com",
    text: "When to invest in Apple.",
    image_url:
      "https://www.crystalfontz.com/images/products/CFAL12832DCW/8x8_CFAL12832D.jpg",
  },
  {
    source_name: "Zombo Gam",
    title: "I hate stocks",
    news_url: "https://www.uc.edu/",
    text: "We need more money",
    image_url: "",
  },
]

module.exports = { StockData, IndustryData, News }
