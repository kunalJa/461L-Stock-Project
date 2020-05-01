import Database
import Command

class SaveNews(Command):
    db_information = Database.getInformation()
    db_news = Database.getNews()
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

    def execute(self):
        articles = self.get_news_stories()
        self.db_news = self.db_news.insertMany(articles)