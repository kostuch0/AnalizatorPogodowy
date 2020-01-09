# -*- coding: utf-8 -*-

import csv

tablicaMistrz = []

path = "k_d_1996.csv"

with open(path, "r") as file:
        reader = csv.reader(file, 'excel')
        for row in reader:
            tablicaMistrz.append(row)
            
print(tablicaMistrz[0])