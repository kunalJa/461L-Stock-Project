file = open("stocknews_industry_query",'r')
fileText = file.read()
file.close();
fileText = fileText.split("\n")
queryToParams = {}
for line in range(0,len(fileText),3):
    if(line+2 < len(fileText)):
        queryToParams[fileText[line].strip()] = fileText[line+2].strip()

def return_industry_query(industry):
    return queryToParams[industry]

def return_industries():
    return queryToParams.keys()
