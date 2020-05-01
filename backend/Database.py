from pymongo import MongoClient

class Database:
    uri = "mongodb+srv://stockUser:stockUserPassword@cluster0-tdhz8.gcp.mongodb.net/test?retryWrites=true&w=majority";
    client = MongoClient(uri)
    db = client["stockInformation"]
    db_information = db["information"]
    db_industry = db["industry"]
    db_news = db["news"]
    def getInformation(self):
        return self.db_information;
    def getIndustry(self):
        return self.db_industry;
    def getNews(self):
        return self.db_news
    def clearDB(self):
        self.db_information.drop()
        self.db_industry.drop()
        self.db_news.drop()
