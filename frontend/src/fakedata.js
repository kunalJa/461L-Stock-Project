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
    author: "Halberg",
    title: "The Sun never sets",
    url: "www.bloomberg.com",
    description: "Why Japan is a great investment.",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed consequat risus, non efficitur dolor. Etiam posuere sagittis mi, eu porta augue volutpat non. Sed iaculis consequat nisi, in sagittis nunc pellentesque sed. Nullam mollis turpis sed condimentum vehicula. Sed ut sem efficitur, rutrum mi quis, dictum odio. Cras ligula nibh, gravida sit amet metus at, aliquam fringilla mauris. Donec elementum viverra est vel tristique. Morbi dictum interdum arcu vehicula dignissim. Phasellus molestie maximus volutpat. Proin fringilla ac ante eu maximus.",
  },
  {
    author: "Michael Reeji",
    title: "How to eat more Apple",
    url: "www.apple.com",
    description: "When to invest in Apple.",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed consequat risus, non efficitur dolor. Etiam posuere sagittis mi, eu porta augue volutpat non. Sed iaculis consequat nisi, in sagittis nunc pellentesque sed. Nullam mollis turpis sed condimentum vehicula. Sed ut sem efficitur, rutrum mi quis, dictum odio. Cras ligula nibh, gravida sit amet metus at, aliquam fringilla mauris. Donec elementum viverra est vel tristique. Morbi dictum interdum arcu vehicula dignissim. Phasellus molestie maximus volutpat. Proin fringilla ac ante eu maximus.",
  },
  {
    author: "Zombo Gam",
    title: "I hate stocks",
    url: "www.zombo.com",
    description: "We need more money",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed consequat risus, non efficitur dolor. Etiam posuere sagittis mi, eu porta augue volutpat non. Sed iaculis consequat nisi, in sagittis nunc pellentesque sed. Nullam mollis turpis sed condimentum vehicula. Sed ut sem efficitur, rutrum mi quis, dictum odio. Cras ligula nibh, gravida sit amet metus at, aliquam fringilla mauris. Donec elementum viverra est vel tristique. Morbi dictum interdum arcu vehicula dignissim. Phasellus molestie maximus volutpat. Proin fringilla ac ante eu maximus.",
  },
]

export { StockData, IndustryData, News }
