import unittest
from pymongo import MongoClient
import stockinfoapi

###DB CONNECTION###
uri = "mongodb+srv://stockUser:stockUserPassword@cluster0-tdhz8.gcp.mongodb.net/test?retryWrites=true&w=majority";
client = MongoClient(uri)
db = client["stockInformation"]
db_information = db["information"]
db_industry = db["industry"]
db_news = db["news"]

###GLOBAL VARIABLES###
expected_tickers = ['MMM', 'ABT', 'ABBV', 'ABMD', 'ACN', 'ATVI', 'ADBE', 'AMD', 'AAP', 'AES', 'AFL', 'A', 'APD', 'AKAM',
                    'ALK', 'ALB', 'ARE', 'ALXN', 'ALGN', 'ALLE', 'AGN', 'ADS', 'LNT', 'ALL', 'GOOGL', 'GOOG', 'MO',
                    'AMZN', 'AMCR', 'AEE', 'AAL', 'AEP', 'AXP', 'AIG', 'T', 'AMT', 'AWK', 'AMP', 'ABC', 'AME', 'AMGN',
                    'APH', 'ADI', 'ANSS', 'ANTM', 'AON', 'AOS', 'APA', 'AIV', 'AAPL']
expected_number_of_stocks = len(expected_tickers);
expected_industries = {'Online Media', 'Industrial Products', 'Packaging & Containers', 'Biotechnology',
                       'Consulting & Outsourcing', 'Insurance', 'Insurance - Property & Casualty',
                       'Semiconductors', 'Utilities - Regulated', 'Chemicals', 'Medical Diagnostics & Research',
                       'REITs', 'Oil & Gas - E&P', 'Credit Services', 'Tobacco Products', 'Asset Management',
                       'Retail - Apparel & Specialty', 'Brokers & Exchanges', 'Medical Devices', 'Insurance - Life',
                       'Communication Services', 'Medical Distribution', 'Computer Hardware', 'Application Software',
                       'Health Care Plans', 'Drug Manufacturers', 'Airlines'}
expected_number_of_industries = len(expected_industries)

class TestStockInformation(unittest.TestCase):
    def test_number_of_stocks(self):
        myquery = {}
        query_result = db_information.find(myquery)
        counter = 0
        for x in query_result:
            counter+=1
        self.assertTrue(counter == expected_number_of_stocks)
    def test_all_stocks_present_once(self):
        for ticker in expected_tickers:
            myquery = {'symbol':ticker}
            self.assertEqual(db_information.count_documents(myquery),1)
    def test_stocks_have_all_attributes(self):
        for ticker in expected_tickers:
            myquery = {'symbol':ticker}
            stockInstance = db_information.find(myquery)[0]
            self.assertIsNotNone(stockInstance["latestPrice"])
            self.assertIsNotNone(stockInstance["latestVolume"])
            self.assertIsNotNone(stockInstance["percentChange"])
            self.assertIsNotNone(stockInstance["historical"])
            self.assertIsNotNone(stockInstance["news"])
            self.assertIsNotNone(stockInstance["name"])
            self.assertIsNotNone(stockInstance["industry"])
            self.assertIsNotNone(stockInstance["sector"])
            self.assertIsNotNone(stockInstance["sector"])

class IndustryTest(unittest.TestCase):
    def test_number_of_industries(self):
        myquery = {}
        queryResult = db_industry.find(myquery)
        self.assertEqual(queryResult.count(), expected_number_of_industries)
    def test_industries_have_articles(self):
        for industry in expected_industries:
            myquery = {"name":industry}
            queryResult = db_industry.find(myquery)
            self.assertEqual(queryResult.count(),1)
            self.assertEqual(queryResult[0]['name'],industry)
    def test_industries_have_all_attributes(self):
        for industry in expected_industries:
            myquery = {'name':industry}
            stockInstance = db_industry.find(myquery)[0]
            self.assertIsNotNone(stockInstance['industry'])
            self.assertIsNotNone(stockInstance['stocks'])

class NewsTest(unittest.TestCase):
    def test_articles_exist(self):
        myquery={}
        queryResult = db_news.find(myquery)
        self.assertIsNotNone(queryResult.count())

class testAPIs(unittest.TestCase):
    def test_wiki_api(self):
        tickers = stockinfoapi.save_sp500_tickers()
        self.assertEqual(len(tickers),505)
    def test_financial_modeling_and_stock_news(self):
        company = 'AAPL'
        test_object = stockinfoapi.save_stock(company)
        self.assertEqual(test_object['symbol'],company)
        self.assertIsNotNone(test_object["latestPrice"])
        self.assertIsNotNone(test_object["latestVolume"])
        self.assertIsNotNone(test_object["percentChange"])
        self.assertIsNotNone(test_object["historical"])
        self.assertIsNotNone(test_object["news"])
        self.assertIsNotNone(test_object["name"])
        self.assertIsNotNone(test_object["industry"])
        self.assertIsNotNone(test_object["sector"])
        self.assertIsNotNone(test_object["image"])
unittest.main()