from urllib.request import urlopen
from pymongo import MongoClient
import json
import bs4 as bs
import parse_industry_queries
import requests
uri = "mongodb+srv://stockUser:stockUserPassword@cluster0-tdhz8.gcp.mongodb.net/test?retryWrites=true&w=majority";
client = MongoClient(uri)
db = client["stockInformation"]
db_information = db["information"]
db_industry = db["industry"]
db_news = db["news"]
tickers = []


def save_sp500_tickers():
    resp = requests.get('http://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
    soup = bs.BeautifulSoup(resp.text, 'html.parser')
    table = soup.find('table', {'class': 'wikitable sortable'})
    for row in table.findAll('tr')[1:]:
        ticker = row.findAll('td')[0].text
        ticker = ticker.rstrip();
        if "." in ticker:
            newTicker = "";
            for char in ticker:
                if(char == "."):
                    newTicker+="-";
                else:
                    newTicker+=char;
            ticker = newTicker;
        tickers.append(ticker)
    test_object = tickers
    return test_object


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
    companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker+"&items=10&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
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
    companyNews = "https://stocknewsapi.com/api/v1?tickers=" + ticker + "&items=10&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
    articles = get_jsonparsed_data(companyNews)
    return articles


def save_industry_articles(industry):
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
        'Personal Services':'Personal Services',
        'Insurance - Life':'Life Insurance'}
    industryNews = "https://stocknewsapi.com/api/v1/category?section=alltickers&items=50&token=l86uypwrbllclsbudagetrvxopyvom07xs0twruy"
    industry_articles = {}
    try:
        mappedIndustry= parse_industry_queries.return_industry_query(financetoNewsIndustry[industry])
        industry_articles = get_jsonparsed_data(industryNews+mappedIndustry)
    except KeyError:
        print(industry)
    result = db_information.find({"industry":industry})
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


def save_sector_articles(sector):
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
    industry_articles = get_jsonparsed_data(industryNews+sectorString)
    result = db_information.find({"sector" : sector})
    stocks = []
    for r in result:
        stocks.append(r['symbol'])
    object = {"name":sector, "industry":industry_articles, "stocks":stocks}
    print(object)
    return object


def define_industries():
    queryResult = db_information.find({})
    myIndustries  = set()
    for stock in queryResult:
        if(stock):
            myIndustries.add(stock['industry'])
        else:
            pass
    return myIndustries


def clear_db():
    db_information.drop()
    db_industry.drop()
    db_news.drop()


def compare_industries():
    industries = define_industries()
    f = open("industryvs.txt","w")
    for industry in industries:
        f.write(str(industry) + "\n")
    news_industries = parse_industry_queries.return_industries()
    for industry in news_industries:
        f.write(str(industry) + "\n")
    f.close()


def main():
    # clear_db()
    # save_sp500_tickers()
    # for ticker in tickers:
    #     db_information.insert_one(save_stock(ticker))
    #     print("Ticker: " + ticker + " completed" )
    # for industry in define_industries():
    #     db_industry.insert_one(save_industry_articles(industry))
    #     (save_industry_articles(industry))
    #     try:
    #         print("Industry: " + industry + " completed")
    #     except:
    #         print(industry)
    # articles = get_news_stories()
    # db_news.insert_many(articles)
    save_sp500_tickers()
    print(tickers)
    return

main()





