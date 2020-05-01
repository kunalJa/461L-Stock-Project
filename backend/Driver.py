import Database
import SaveIndustryInfo
import SaveNews
import SaveStockInfo

def main():
    Database.clearDB()
    SaveStockInfo.execute()
    SaveIndustryInfo.execute()
    SaveNews.execute()

main()