from urllib.request import urlopen
from pymongo import MongoClient
import json
uri = "mongodb+srv://stockUser:stockUserPassword@cluster0-tdhz8.gcp.mongodb.net/test?retryWrites=true&w=majority";
client = MongoClient(uri)
db = client["stockInformation"]
db_information = db["information"]
db_industry = db["industry"]
db_news = db["news"]

def get_company_info(ticker):
    correcturl = "https://financialmodelingprep.com/api/v3/company/profile/"
    resp = get_jsonparsed_data(correcturl + ticker)
    name = resp['profile']['companyName']
    industry = resp['profile']['industry']
    sector = resp['profile']['sector']
    image = resp['profile']['image']
    return name,industry,sector,image

def save_stock(ticker):
    name,industry,sector,image = get_company_info(ticker)
    companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker+"&items=50&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
    url = ("https://financialmodelingprep.com/")
    dailyPrice = "api/v3/historical-price-full/"
    resp=get_jsonparsed_data(url+dailyPrice+ "/" + ticker)
    latestPrice = resp['historical'][-1]['close']
    latestVolume = resp['historical'][-1]['volume']
    percentChange = resp['historical'][-1]['changePercent']
    news = return_stock_articles(ticker)
    historical = {}
    historical['dates'] = []
    historical['prices'] = []
    for i in resp['historical']:
        historical['dates'].append(i['date'])
        historical['prices'].append(i['close'])
    object = {"symbol":ticker,
              "latestPrice":latestPrice,
              "latestVolume":latestVolume,
              "percentChange":percentChange,
              "historical":[historical],
              "news":news,
              "name":name,
              "industry":industry,
              "sector":sector,
              "image":image}
    return object

def get_news_stories():
    stories = []
    db_stocks = db_information.find()
    for stock in db_stocks:
        articles = stock['news']['data']
        for article in articles:
            newsObj = {"sector" : stock["sector"],
                       "article" : article,
                       "company" : stock["name"],
                       "tickers" : article["tickers"]
                       }
            stories.append(newsObj)
    return stories;

def get_jsonparsed_data(url):
    response = urlopen(url)
    data = response.read().decode("utf-8")
    return json.loads(data)

def return_stock_articles(ticker):
    companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker + "&items=50&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
    articles = get_jsonparsed_data(companyNews)
    return articles

def save_industry_articles(sector):
    financeToNews = {"Basic Materials":"Basic+Materials",
                     "Consumer Cyclical":"Consumer+Goods",
                     "Consumer Defensive":"Consumer+Goods",
                     "Energy":"Utilities",
                     "Financial Services":"Financial",
                     "Healthcare":"Healthcare",
                     "Industrials":"Industrial+Goods",
                     "Real Estate":"Conglomerates",
                     "Technology":"Technology",
                     "Utilities":"Utilities"}
    industryNews = "https://stocknewsapi.com/api/v1/category?section=alltickers&items=50&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
    mappedSector = financeToNews[sector]
    sectorString = "&sector=" + mappedSector
    industry_articles = get_jsonparsed_data(industryNews+sectorString)
    result = db_information.find({"sector" : sector})
    stocks = []
    for r in result:
        stocks.append(r['symbol'])
    object = {"name":sector, "industry":industry_articles, "stocks":stocks}
    print(object)
    return object

def main():
    industries = ["Technology","Industrials","Consumer Cyclical"]
    tickers = ["AAPL","FB","GOOGL","AMZN","UAL","TSLA"]
    # information.drop()
    # for ticker in tickers:
    #         information.insert_one(save_stock(ticker))
    # for industry in industries:
    #     db_industry.insert_one(save_industry_articles(industry))
    # articles = get_news_stories()
    # db_news.insert_many(articles)
main()




