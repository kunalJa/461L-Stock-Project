from urllib.request import urlopen
import json
import Database
import parse_industry_queries
import apiTranslateDict
import Command

class SaveIndustryInfo(Command):
    db_information = Database.getInformation()
    db_industry = Database.getIndustry()
    def get_jsonparsed_data(self,url):
        response = urlopen(url)
        data = response.read().decode("utf-8")
        return json.loads(data)
    def define_industries(self):
        queryResult = self.db_information.find({})
        myIndustries  = set()
        for stock in queryResult:
            if(stock):
                myIndustries.add(stock['industry'])
            else:
                pass
        return myIndustries
    def compare_industries(self):
        industries = self.define_industries()
        f = open("industryvs.txt","w")
        for industry in industries:
            f.write(str(industry) + "\n")
        news_industries = parse_industry_queries.return_industries()
        for industry in news_industries:
            f.write(str(industry) + "\n")
        f.close()
    def save_sector_articles(self, sector):
        financeToNewsSector = {"Basic Materials":"Basic+Materials",
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
        mappedSector = financeToNewsSector[sector]
        sectorString = "&sector=" + mappedSector
        industry_articles = self.get_jsonparsed_data(industryNews+sectorString)
        result = self.db_information.find({"sector" : sector})
        stocks = []
        for r in result:
            stocks.append(r['symbol'])
        object = {"name":sector, "industry":industry_articles, "stocks":stocks}
        print(object)
        return object

    def save_industry_articles(self,industry):
        financetoNewsIndustry = apiTranslateDict.getFinanceToNewsIndustry()
        industryNews = "https://stocknewsapi.com/api/v1/category?section=alltickers&items=50&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
        industry_articles = {}
        try:
            mappedIndustry= parse_industry_queries.return_industry_query(financetoNewsIndustry[industry])
            industry_articles = self.get_jsonparsed_data(industryNews+mappedIndustry)
        except KeyError:
            print(industry)
        result = self.db_information.find({"industry":industry})
        percentChanges=[]
        stocks = []
        for r in result:
            stocks.append(r['symbol'])
            original = r['historical'][0]['prices'][-7]
            now = r['historical'][0]['prices'][-1]
            percentChanges.append(((original - now)/original)*100)
        percentSum = 0;
        for percent in percentChanges:
            percentSum+=percent
        industry_change = percentSum/len(percentChanges)
        object = {"name":industry, "industry":industry_articles,"stocks":stocks,"percentChange":"{:.2}".format(industry_change)}
        return object

    def execute(self):
        for industry in self.define_industries():
            self.db_industry.insert_one(self.save_industry_articles(industry))
            try:
                print("Industry: " + industry + " completed")
            except:
                print("Industry not found")