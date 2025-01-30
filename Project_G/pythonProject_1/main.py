import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_excel(r"D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject_1\data_set\Daily.xlsx")
print(df.head())

filtered_df = df[df['Date'] > '2010-01-01']
print(filtered_df.dtypes)


