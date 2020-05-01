import bs4 as bs
import requests

class getSP500():
    tickers = []
    def save_sp500_tickers(self):
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
            self.tickers.append(ticker)
        test_object = self.tickers
        return test_object