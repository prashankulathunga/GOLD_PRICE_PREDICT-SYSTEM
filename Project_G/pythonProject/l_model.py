import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

plt.style.use('ggplot')

filtered_df = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\Gdata.xlsx')
print(filtered_df.head(2))

# NOTE: plot filtered data
plt.figure(figsize=(12, 6))
plt.plot(filtered_df['Date'], filtered_df['USD'], color='green', alpha=0.8)
plt.title('Gold Price from 2020', pad=16)
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.show()

print(filtered_df.isnull().sum())
print(filtered_df.dtypes)

# NOTE: convert date to ordinal
filtered_df['od_date'] = pd.to_datetime(filtered_df['Date']).astype('int64')
filtered_df.head(2)

# NOTE: train test split data
x_val = filtered_df['od_date'].values.reshape(-1, 1)
y_val = filtered_df['USD'].values

x_train, x_test, y_train, y_test = train_test_split(x_val, y_val, test_size=0.3, random_state=42)
print('xtr, x_te, y_tr, y_te shape:', x_train.shape, x_train.shape, y_train.shape, y_test.shape)

# NOTE: Train Model -> Liner Regression
liner_m = LinearRegression()
liner_m.fit(x_train, y_train)

y_predict = liner_m.predict(x_test)

# NOTE: best fit line plot
degree = 1
coefficients = np.polyfit(filtered_df['od_date'], filtered_df['USD'], degree)
polynomial = np.poly1d(coefficients)
best_fit = polynomial(filtered_df['od_date'])

plt.figure(figsize=(12, 6))
plt.plot(filtered_df['Date'], filtered_df['USD'], color='green', label='Actual Price', alpha=0.8)
plt.plot(filtered_df['Date'], best_fit, color='red', label='Best Fit Line')
plt.title('Best Fit Line Gold Price since 2020', pad=16)
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()

x_test = x_test.flatten()

df_data = pd.to_datetime(filtered_df['Date']).astype('int64')

temp_data1 = filtered_df[df_data.isin(x_test)]
pred_data = pd.DataFrame({'Date': temp_data1['Date'], 'Actual_Price': temp_data1['USD'], 'Predicted_Price': y_predict})
print('Liner Model Predictions Data Info: \n', pred_data)

# NOTE: plot in predictions
plt.figure(figsize=(12, 6))
plt.scatter(pred_data['Date'], pred_data['Actual_Price'], color='green', label='Actual USD', alpha=0.5)
plt.scatter(pred_data['Date'], pred_data['Predicted_Price'], color='orange', label='Predicted USD', alpha=0.5)

plt.title('Actual price vs predicted price scatter plot', pad=16)
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()

# NOTE: mean absolute error in
mae_score = mean_absolute_error(y_test, y_predict)
print('Mean Absolute Error: ', mae_score)

# NOTE: get one-month data to get predict
one_mdf = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\month_dates.xlsx')
one_mdf.head(2)

# NOTE: convert date to ordinal
one_mdf['od_date'] = pd.to_datetime(one_mdf['Date']).astype('int64')
one_mdf.head(2)

# NOTE: reshape values
x_month = one_mdf['od_date'].values.reshape(-1, 1)
y_month = one_mdf['USD'].values

# NOTE: predict data
y_month_predict = liner_m.predict(x_month)

month_df = pd.DataFrame({'Date': one_mdf['Date'], 'Actual_Price': one_mdf['USD'], 'Predicted_Price': y_month_predict})
print('One Month Predictions Data Info: \n', month_df)

# NOTE: mean absolute error month period
mae_month_score = mean_absolute_error(y_month, y_month_predict)
print('Mean Absolute Error Month Prediction: ', mae_month_score)

# NOTE: plot in month predictions
plt.figure(figsize=(12, 6))
plt.scatter(month_df['Date'], month_df['Actual_Price'], color='green', label='Actual USD', alpha=0.8)
plt.scatter(month_df['Date'], month_df['Predicted_Price'], color='orange', label='Predicted USD', alpha=0.8)

plt.title('Month actual price vs predicted price scatter plot', pad=16)
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()
 
