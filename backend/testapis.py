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
expected_tickers = ['MMM', 'ABT', 'ABBV', 'ABMD', 'ACN', 'ATVI', 'ADBE', 'AMD', 'AAP', 'AES', 'AFL', 'A', 'APD', 'AKAM', 'ALK', 'ALB', 'ARE', 'ALXN', 'ALGN', 'ALLE', 'AGN', 'ADS', 'LNT', 'ALL', 'GOOGL', 'GOOG', 'MO', 'AMZN', 'AMCR', 'AEE', 'AAL', 'AEP', 'AXP', 'AIG', 'AMT', 'AWK', 'AMP', 'ABC', 'AME', 'AMGN', 'APH', 'ADI', 'ANSS', 'ANTM', 'AON', 'AOS', 'APA', 'AIV', 'AAPL', 'AMAT', 'APTV', 'ADM', 'ANET', 'AJG', 'AIZ', 'T', 'ATO', 'ADSK', 'ADP', 'AZO', 'AVB', 'AVY', 'BKR', 'BLL', 'BAC', 'BK', 'BAX', 'BDX', 'BRK-B', 'BBY', 'BIIB', 'BLK', 'BA', 'BKNG', 'BWA', 'BXP', 'BSX', 'BMY', 'AVGO', 'BR', 'BF-B', 'CHRW', 'COG', 'CDNS', 'CPB', 'COF', 'CPRI', 'CAH', 'KMX', 'CCL', 'CARR', 'CAT', 'CBOE', 'CBRE', 'CDW', 'CE', 'CNC', 'CNP', 'CTL', 'CERN', 'CF', 'SCHW', 'CHTR', 'CVX', 'CMG', 'CB', 'CHD', 'CI', 'CINF', 'CTAS', 'CSCO', 'C', 'CFG', 'CTXS', 'CLX', 'CME', 'CMS', 'KO', 'CTSH', 'CL', 'CMCSA', 'CMA', 'CAG', 'CXO', 'COP', 'ED', 'STZ', 'COO', 'CPRT', 'GLW', 'CTVA', 'COST', 'COTY', 'CCI', 'CSX', 'CMI', 'CVS', 'DHI', 'DHR', 'DRI', 'DVA', 'DE', 'DAL', 'XRAY', 'DVN', 'FANG', 'DLR', 'DFS', 'DISCA', 'DISCK', 'DISH', 'DG', 'DLTR', 'D', 'DOV', 'DOW', 'DTE', 'DUK', 'DRE', 'DD', 'DXC', 'ETFC', 'EMN', 'ETN', 'EBAY', 'ECL', 'EIX', 'EW', 'EA', 'EMR', 'ETR', 'EOG', 'EFX', 'EQIX', 'EQR', 'ESS', 'EL', 'EVRG', 'ES', 'RE', 'EXC', 'EXPE', 'EXPD', 'EXR', 'XOM', 'FFIV', 'FB', 'FAST', 'FRT', 'FDX', 'FIS', 'FITB', 'FE', 'FRC', 'FISV', 'FLT', 'FLIR', 'FLS', 'FMC', 'F', 'FTNT', 'FTV', 'FBHS', 'FOXA', 'FOX', 'BEN', 'FCX', 'GPS', 'GRMN', 'IT', 'GD', 'GE', 'GIS', 'GM', 'GPC', 'GILD', 'GL', 'GPN', 'GS', 'GWW', 'HRB', 'HAL', 'HBI', 'HOG', 'HIG', 'HAS', 'HCA', 'PEAK', 'HP', 'HSIC', 'HSY', 'HES', 'HPE', 'HLT', 'HFC', 'HOLX', 'HD', 'HON', 'HRL', 'HST', 'HWM', 'HPQ', 'HUM', 'HBAN', 'HII', 'IEX', 'IDXX', 'INFO', 'ITW', 'ILMN', 'INCY', 'IR', 'INTC', 'ICE', 'IBM', 'IP', 'IPG', 'IFF', 'INTU', 'ISRG', 'IVZ', 'IPGP', 'IQV', 'IRM', 'JKHY', 'J', 'JBHT', 'SJM', 'JNJ', 'JCI', 'JPM', 'JNPR', 'KSU', 'K', 'KEY', 'KEYS', 'KMB', 'KIM', 'KMI', 'KLAC', 'KSS', 'KHC', 'KR', 'LB', 'LHX', 'LH', 'LRCX', 'LW', 'LVS', 'LEG', 'LDOS', 'LEN', 'LLY', 'LNC', 'LIN', 'LYV', 'LKQ', 'LMT', 'L', 'LOW', 'LYB', 'MTB', 'MRO', 'MPC', 'MKTX', 'MAR', 'MMC', 'MLM', 'MAS', 'MA', 'MKC', 'MXIM', 'MCD', 'MCK', 'MDT', 'MRK', 'MET', 'MTD', 'MGM', 'MCHP', 'MU', 'MSFT', 'MAA', 'MHK', 'TAP', 'MDLZ', 'MNST', 'MCO', 'MS', 'MOS', 'MSI', 'MSCI', 'MYL', 'NDAQ', 'NOV', 'NTAP', 'NFLX', 'NWL', 'NEM', 'NWSA', 'NWS', 'NEE', 'NLSN', 'NKE', 'NI', 'NBL', 'JWN', 'NSC', 'NTRS', 'NOC', 'NLOK', 'NCLH', 'NRG', 'NUE', 'NVDA', 'NVR', 'ORLY', 'OXY', 'ODFL', 'OMC', 'OKE', 'ORCL', 'OTIS', 'PCAR', 'PKG', 'PH', 'PAYX', 'PAYC', 'PYPL', 'PNR', 'PBCT', 'PEP', 'PKI', 'PRGO', 'PFE', 'PM', 'PSX', 'PNW', 'PXD', 'PNC', 'PPG', 'PPL', 'PFG', 'PG', 'PGR', 'PLD', 'PRU', 'PEG', 'PSA', 'PHM', 'PVH', 'QRVO', 'PWR', 'QCOM', 'DGX', 'RL', 'RJF', 'RTX', 'O', 'REG', 'REGN', 'RF', 'RSG', 'RMD', 'RHI', 'ROK', 'ROL', 'ROP', 'ROST', 'RCL', 'SPGI', 'CRM', 'SBAC', 'SLB', 'STX', 'SEE', 'SRE', 'NOW', 'SHW', 'SPG', 'SWKS', 'SLG', 'SNA', 'SO', 'LUV', 'SWK', 'SBUX', 'STT', 'STE', 'SYK', 'SIVB', 'SYF', 'SNPS', 'SYY', 'TMUS', 'TROW', 'TTWO', 'TPR', 'TGT', 'TEL', 'FTI', 'TFX', 'TXN', 'TXT', 'TMO', 'TIF', 'TJX', 'TSCO', 'TT', 'TDG', 'TRV', 'TFC', 'TWTR', 'TSN', 'UDR', 'ULTA', 'USB', 'UAA', 'UA', 'UNP', 'UAL', 'UNH', 'UPS', 'URI', 'UHS', 'UNM', 'VFC', 'VLO', 'VAR', 'VTR', 'VRSN', 'VRSK', 'VZ', 'VRTX', 'VIAC', 'V', 'VNO', 'VMC', 'WRB', 'WAB', 'WMT', 'WBA', 'DIS', 'WM', 'WAT', 'WEC', 'WFC', 'WELL', 'WDC', 'WU', 'WRK', 'WY', 'WHR', 'WMB', 'WLTW', 'WYNN', 'XEL', 'XRX', 'XLNX', 'XYL', 'YUM', 'ZBRA', 'ZBH', 'ZION', 'ZTS']
expected_number_of_stocks = 501;
expected_industries = {'Online Media', 'Industrial Products', 'Packaging & Containers', 'Biotechnology',
                       'Consulting & Outsourcing', 'Insurance', 'Insurance - Property & Casualty',
                       'Semiconductors', 'Utilities - Regulated', 'Chemicals', 'Medical Diagnostics & Research',
                       'REITs', 'Oil & Gas - E&P', 'Credit Services', 'Tobacco Products', 'Asset Management',
                       'Retail - Apparel & Specialty', 'Brokers & Exchanges', 'Medical Devices', 'Insurance - Life',
                       'Communication Services', 'Medical Distribution', 'Computer Hardware', 'Application Software',
                       'Health Care Plans', 'Drug Manufacturers', 'Airlines'}
expected_number_of_industries = 77

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
        self.assertEqual(len(tickers),1010)
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
    def test_financial_modeling_only(self):
        name,industry,sector,image = stockinfoapi.get_company_info('AAPL')
        self.assertEqual(name,"Apple Inc.")
        self.assertEqual(industry,"Computer Hardware")
        self.assertEqual(sector, "Technology")
        self.assertEqual(image, "https://financialmodelingprep.com/images-New-jpg/AAPL.jpg")

class testIndustryValid(unittest.TestCase):
    def verify_stocknews_industry(self):
        financetoNewsIndustry = {
            'Medical Diagnostics & Research':'Medical Laboratories & Research',
            'Retail - Apparel & Specialty':'Specialty Retail, Other',
            'Biotechnology':'Biotechnology',
            'Consulting & Outsourcing':'Staffing & Outsourcing Services',
            'Drug Manufacturers': 'Drug Manufacturers - Major',
            'Insurance - Property & Casualty': 'Property & Casualty Insurance',
            'Online Media':'Internet Software & Services',
            'Insurance':'Insurance Brokers',
            'Application Software':'Application Software',
            'Medical Devices':'Medical Appliances & Equipment',
            'Oil & Gas - E&P':'Oil & Gas Equipment & Services',
            'Brokers & Exchanges':'Investment Brokerage - National',
            'Semiconductors':'Semiconductor - Integrated Circuits',
            'Credit Services':'Credit Services',
            'Airlines':'Major Airlines',
            'Tobacco Products':'Tobacco Products, Other',
            'Medical Distribution':'Medical Instruments & Supplies',
            'Chemicals':'Chemicals - Major Diversified',
            'Health Care Plans':'Health Care Plans',
            'Utilities - Regulated':'Diversified Utilities',
            'Industrial Products':'Industrial Equipment Wholesale',
            'Insurance—Life':'Life Insurance',
            'Packaging & Containers':'Packaging & Containers',
            'Communication Services':'Diversified Communication Services',
            'Computer Hardware':'Diversified Computer Systems',
            'REITs':'REIT - Diversified',
            'Asset Management':'Asset Management',
            "Oil & Gas - Refining & Marketing":"Oil & Gas Refining & Marketing",
            'Industrial Distribution':'Industrial Equipment Wholesale',
            'Agricultural Inputs':'Farm Products',
            'Transportation & Logistics':'Trucking',
            'REIT   Healthcare Facilities': 'REIT - Healthcare Facilities',
            'Specialty Chemicals':'Specialty Chemicals',
            'Oil & Gas - Integrated':'Major Integrated Oil & Gas',
            'Beverages - Non-Alcoholic':'Beverages - Soft Drinks',
            'Health Care Providers':'Healthcare Information Services',
            'Metals & Mining':'Industrial Metals & Minerals',
            'Oil & Gas - Midstream':'Independent Oil & Gas',
            'Engineering & Construction':'Heavy Construction',
            'Manufacturing - Apparel & Furniture':'Textile - Apparel Clothing',
            'Medical Instruments & Equipment':'Medical Appliances & Equipment',
            'Autos': 'Auto Manufacturers - Major',
            'Employment Services':'General Contractors',
            'Insuranceâ€”Diversified':'Insurance Brokers',
            'Agriculture':'Farm Products',
            'Homebuilding & Construction':'Residential Construction',
            'Truck Manufacturing':'Trucks & Other Vehicles',
            'Advertising & Marketing Services':'Advertising Agencies',
            'Apparel Manufacturing':'Textile - Apparel Clothing',
            'Retail - Defensive':'Specialty Retail, Other',
            'Software—Infrastructure':'Technical & System Software',
            'Aerospace & Defense':'Aerospace/Defense - Major Diversified',
            'Travel & Leisure':'Lodging',
            'Business Services':'Business Services',
            'Beverages - Alcoholic':'Beverages - Wineries & Distillers',
            'Utilities—Regulated Electric':'Electric Utilities',
            'Farm & Construction Machinery':'Farm & Construction Machinery',
            'Banks   Regional':'Regional - Mid-Atlantic Banks',
            'Oil & Gas Equipment & Services':'Major Integrated Oil & Gas',
            'Oil & Gas - Drilling':'Oil & Gas Drilling & Exploration',
            'Insurance - Specialty':'Surety & Title Insurance',
            'Beveragesâ€”Wineries & Distilleries':'Beverages - Brewers',
            'Banks':'Money Center Banks',
            'Entertainment':'Entertainment - Diversified',
            'Consumer Packaged Goods':'Processed & Packaged Goods',
            'None':'Wireless Communications',
            'Waste Management':'Waste Management',
            'Utilities - Independent Power Producers':'Insurance Brokers',
            'Restaurants':'Restaurants',
            'Conglomerates':'Conglomerates',
            'Real Estate Services':'Real Estate Development',
            'Forest Products':'Lumber, Wood Production',
            'Oil & Gas - Services':"Oil & Gas Equipment & Services",
            'Building Materials':'Building Materials Wholesale',
            'Steel':'Steel & Iron',
            'Communication Equipment':'Communication Equipment',
            'Personal Services':'Personal Services'}
        f = open('stocknews_industry_raw.txt',encoding="utf8");
        keys = financetoNewsIndustry.keys()
        for line in f.readlines():
            if line.rstrip() not in keys:
                self.fail("line")
unittest.main()