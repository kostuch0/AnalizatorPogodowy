# -*- coding: utf-8 -*-

import sqlite3
import csv

def createDatabase():
    sql = sqlite3.connect("DanePogodowe2.db")
    cursor = sql.cursor()
    cursor.execute('''
    create table dane (kod_stacji TEXT,
    nazwa_stacji TEXT,
    rok INTEGER,
    miesiac INTEGER,
    dzien INTEGER,
    max_temp_dob REAL,
    stat_pomiaru_max TEXT,
    min_temp_dob REAL,
    stat_pomiaru_min TEXT,
    sred_temp_dob REAL,
    stat_pomiaru_sred TEXT,
    min_temp_grunt REAL,
    stat_pomiaru_grunt TEXT,
    suma_opad_dob REAL,
    stat_pomiaru_opad TEXT,
    rodzaj_opad TEXT,
    wys_pokr_snieg REAL,
    stat_pomiaru_snieg TEXT,
    sred_wilg_dob REAL,
    stat_pomiaru_wilg TEXT,
    sred_wiatr_dob REAL,
    stat_pomiaru_wiatr TEXT,
    sred_chmur_dob REAL,
    stat_pomiaru_chmur TEXT)''')
    cursor.close()
    sql.commit()
    sql.close()
    
def insertData(path:str):
    sql = sqlite3.connect("DanePogodowe2.db")
    cursor = sql.cursor()
    with open(path, "r") as file:
        reader = csv.reader(file, 'excel')
        for row in reader:
            cursor.execute("insert into dane values ('{0}','{1}',{2},{3},{4},{5},'{6}',{7},'{8}',{9},'{10}',{11},'{12}',{13},'{14}','{15}',{16},'{17}', 0, '', 0, '', 0, '')".format(
            row[0], row[1], row[2],
            row[3], row[4], row[5],
            row[6], row[7], row[8],
            row[9], row[10], row[11],
            row[12], row[13], row[14],
            row[15], row[16], row[17]))
    cursor.close()
    sql.commit()
    sql.close()



createDatabase()
insertData("test.csv")
#insertDataT("k_d_t_1996.csv")            