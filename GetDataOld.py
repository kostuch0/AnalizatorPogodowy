# -*- coding: utf-8 -*-

import requests, os, sys, zipfile
print('Spokojnie. Zaczynam pobieranie zestawu plików.')


url = 'http://dane.imgw.pl/data/dane_pomiarowo_obserwacyjne/dane_meteorologiczne/dobowe/klimat'
for rok in range(1951, 1997, 5):
    try:
        os.mkdir('%s\%s\\' % (os.path.dirname(sys.argv[0]), rok))
    except:
        print('nie udało się utworzyc katalogu, prawdopodobnie już istnieje')
    print('pobieramy pliki z roku: %s' % rok)
    for miesiac in range(rok, rok+5):
        filename = str.format("{}_k.zip", miesiac)
        rok4 = int(rok) + 4
        plik = str(rok) + "_" + str(rok4)
        dlurl = url + "/"+ plik + "/" + filename
        print(dlurl)
        response = requests.get(dlurl)
        if(response.status_code == 200):
            with open('%s/%s' %(rok, filename),"wb") as code:
                code.write(response.content)
                print('Pobrano: '+ filename)
        else:
            print('Nie znaleziono pliku: ' + filename)
 
 
def Rozpakuj():
    for rok_rozpakuj in range(2001,2020):
        path = '{0}/{1}'.format(os.path.dirname(sys.argv[0]),rok_rozpakuj)
        print(path)
        for miesiac in range(1,13):
            filename = '{}_{:02d}_k.zip'.format(rok_rozpakuj,miesiac)     
            file_path = '{0}/{1}'.format(path,filename)
            try:
                os.mkdir('%s\dane\%s\\' % (os.path.dirname(sys.argv[0]), rok))
            except:
                pass
            try:
                with zipfile.ZipFile(file_path,'r') as zip_ref:
                    zip_ref.extractall('dane\{0}'.format(rok_rozpakuj))
                    print('Rozpakowano: {0}'.format(filename))
            except:
                print('Niepowodzenie pliku: {0}'.format(filename))
            
            
