from urllib.request import urlopen
import json
import GetSP500
import Database
import Command


class SaveStockInfo(Command):
    tickers = GetSP500.getSP500()
    db_information = Database.getInformation()
    def get_jsonparsed_data(self,url):
        response = urlopen(url)
        data = response.read().decode("utf-8")
        return json.loads(data)
    def return_stock_articles(self,ticker):
        companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker + "&items=10&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
        articles = self.get_jsonparsed_data(companyNews)
        return articles
    def get_company_info(self,ticker):
        correcturl = "https://financialmodelingprep.com/api/v3/company/profile/"
        resp = self.get_jsonparsed_data(correcturl + ticker)
        name = resp['profile']['companyName']
        industry = resp['profile']['industry']
        sector = resp['profile']['sector']
        image = resp['profile']['image']
        return name,industry,sector,image
    def get_news_stories(self):
        stories = []
        db_stocks = self.db_information.find()
        for stock in db_stocks:
            articles = stock['news']['data']
            for article in articles:
                newsObj = {"sector" : stock["sector"],
                           "article" : article,
                           "company" : stock["name"],
                           "tickers" : article["tickers"]
                           }
                stories.append(newsObj)
        return stories
    def return_stock_articles(self, ticker):
        companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker + "&items=10&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
        articles = self.get_jsonparsed_data(companyNews)
        return articles
    def save_stock(self,ticker):
        name,industry,sector,image = self.get_company_info(ticker)
        companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker+"&items=10&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
        url = ("https://financialmodelingprep.com/")
        dailyPrice = "api/v3/historical-price-full/"
        resp=self.get_jsonparsed_data(url+dailyPrice+ "/" + ticker)
        latestPrice = resp['historical'][-1]['close']
        latestVolume = resp['historical'][-1]['volume']
        percentChange = resp['historical'][-1]['changePercent']
        news = self.return_stock_articles(ticker)
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
    def execute(self):
        for ticker in self.tickers:
            self.db_information.insert_one(self.save_stock(ticker))
            print("Ticker: " + ticker + " completed" )

