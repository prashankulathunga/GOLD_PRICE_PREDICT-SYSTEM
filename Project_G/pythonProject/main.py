import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
import datetime as dt

ds = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\Daily.xlsx')
ds_anls = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\month_dates.xlsx')

# convert Date ordinal
ds['od_date'] = ds['Date'].apply(lambda x: x.toordinal())
ds_anls['od_date'] = ds['Date'].apply(lambda x: x.toordinal())

x_val = ds['od_date'].values.reshape(-1, 1)
y_val = ds['USD']

# train set and test set
x_train, x_test, y_train, y_test = train_test_split(x_val, y_val, test_size=0.2, random_state=42)

# linear model (lm) create
lm = LinearRegression()
lm.fit(x_train, y_train)

#  predict data in x_test values
y_predict = lm.predict(x_test)
print(pd.DataFrame(pd.DataFrame(y_predict)))


 # predict data for one month using model

x_month_test = ds_anls['od_date'].values.reshape(-1,1)

y_predict_month_p = lm.predict(x_month_test)
print(y_predict_month_p)

x_line = np.linspace(ds['od_date'].min(), ds['od_date'].max(), 100).reshape(-1,1)
y_line = lm.predict(x_line)

x_line = x_line.astype(int)
x_line = np.vectorize(dt.datetime.fromordinal)(x_line)

plt.style.use('ggplot')
plt.figure(figsize=(12, 6))
plt.plot(ds['Date'], ds['USD'], color='green', label='Actual Price')
plt.plot(x_line, y_line, color='red', label='Best Fit Line')

plt.title('Gold Price Prediction with Best Fit Line')
plt.xlabel('Date')
plt.ylabel('Price (USD)')
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()

# mean absolute error
mae_score = mean_absolute_error(y_test, y_predict)
print(f'Mean Absolute Error in Data Set: {mae_score}')

# calculate MAE for month date
mae_score_month = mean_absolute_error(ds_anls['USD'], y_predict_month_p)
print(f'Mean Absolute Error for Month Period = {mae_score_month}')