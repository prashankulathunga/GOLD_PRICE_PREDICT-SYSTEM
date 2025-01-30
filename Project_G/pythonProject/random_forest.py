import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import TimeSeriesSplit
from scipy.stats import randint

data = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\Daily.xlsx')
data = data[data['Date'] > '2012-01-01']
data.head()

data.set_index('Date', inplace=True)
data.head(2)
#
# # Calculate IQR
# Q1 = data['USD'].quantile(0.25)
# Q3 = data['USD'].quantile(0.75)
# IQR = Q3 - Q1
#
# # Define outlier bounds
# lower_bound = Q1 - 1.5 * IQR
# upper_bound = Q3 + 1.5 * IQR
#
# # Identify and filter outliers
# data = data[(data['USD'] >= lower_bound) & (data['USD'] <= upper_bound)]


data['Year'] = data.index.year
data['Month'] = data.index.month
data['Day'] = data.index.day

scaler = MinMaxScaler()
data['USD'] = scaler.fit_transform(data[['USD']])

print(data.isna().sum())

# Features (X) and Target (y)
X = data.drop(columns=['USD'])  # Drop the target column
y = data['USD']  # Target column

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"Training samples: {len(X_train)}, Testing samples: {len(X_test)}")

# Define a more focused parameter grid for RandomizedSearchCV
param_dist = {
    'n_estimators': randint(100, 600),  # Random distribution between 100 and 500
    'max_depth': randint(5, 25),  # Random distribution between 5 and 30
    'min_samples_split': randint(2, 12),  # Random distribution between 2 and 12
    'min_samples_leaf': randint(1, 10)  # Random distribution between 1 and 10
}

# TimeSeriesSplit for time-series data validation
tscv = TimeSeriesSplit(n_splits=12)

# Initialize the RandomizedSearchCV
random_search = RandomizedSearchCV(
    estimator=RandomForestRegressor(random_state=7),
    param_distributions=param_dist,
    n_iter=80,  # Number of parameter settings sampled
    cv=tscv,
    scoring='neg_mean_absolute_error',
    verbose=2,
    random_state=42,
    n_jobs=-1
)

# Fit the random search on the training data
random_search.fit(X_train, y_train)

# Display the best parameters and set the best model
print("Best Parameters:", random_search.best_params_)
model = random_search.best_estimator_

# Train the tuned model on the entire training data
model.fit(X_train, y_train)

# Assuming `data` is a DataFrame with a datetime index and a 'USD' column.
# Convert the index to numeric values (e.g., days since the start date).
data['date_numeric'] = (data.index - data.index.min()).days

# Define the degree of the polynomial
degree = 1  # Linear fit

# Fit the polynomial using the numeric representation of dates
coefficients = np.polyfit(data['date_numeric'], data['USD'], degree)
polynomial = np.poly1d(coefficients)

# Generate the best-fit values
data['best_fit'] = polynomial(data['date_numeric'])

# Plot the actual and best-fit lines
plt.figure(figsize=(12, 6))
plt.plot(data.index, data['USD'], color='green', label='Actual Price', alpha=0.8)
plt.plot(data.index, data['best_fit'], color='red', label='Best Fit Line')
plt.title('Best Fit Line Gold Price since 2020', pad=16)
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()

y_predict = model.predict(X_test)
print(y_predict[:5])

y_test_original = scaler.inverse_transform(y_test.values.reshape(-1, 1))
y_predict_original = scaler.inverse_transform(y_predict.reshape(-1, 1))
print("Original y_test:", y_test_original[:5])
print("Original y_predict:", y_predict_original[:5])

# Evaluate the model
mae = mean_absolute_error(y_test_original, y_predict_original)
mse = mean_squared_error(y_test_original, y_predict_original)
r2 = r2_score(y_test_original, y_predict_original)

print(f"MAE: {mae}\nMSE: {mse}\nR²: {r2}")

y_test_original = y_test_original.flatten()
y_predict_original = y_predict_original.flatten()

predictdata_frame = pd.DataFrame({
    'Date': y_test.index,
    'Actual_Price': y_test_original,
    'Predicted_Price': y_predict_original})
predictdata_frame.head()

plt.style.use('ggplot')
plt.figure(figsize=(10, 5))
plt.scatter(predictdata_frame['Date'], predictdata_frame['Actual_Price'], color='r', alpha=0.8, label='Actual Price')
plt.scatter(predictdata_frame['Date'], predictdata_frame['Predicted_Price'], color='b', alpha=0.4,
            label='Predicted Price')
plt.title('Gold Price Actual vs Predicted', pad=16)
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()

# get month data
m_data = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\month_dates.xlsx')

m_data['Date'] = pd.to_datetime(m_data['Date'])  # Ensure the column is datetime
m_data.set_index('Date', inplace=True)  # Set the 'Date' column as the index

# Now extract year, month, and day
m_data['Year'] = m_data.index.year
m_data['Month'] = m_data.index.month
m_data['Day'] = m_data.index.day

X_m = m_data.drop(columns=['USD'])  # Drop the target column
y_m = m_data['USD']  # Target column
y_m.head()

monthpredict_data = model.predict(X_m)

monthpredict_data = scaler.inverse_transform([monthpredict_data])
monthpredict_data = monthpredict_data.flatten()

monthpredict_dataframe = pd.DataFrame({
    'Actual_Price': y_m,
    'Predicted_price': monthpredict_data
})

print(monthpredict_dataframe)

mae = mean_absolute_error(y_m, monthpredict_data)
mse = mean_squared_error(y_m, monthpredict_data)
r2 = r2_score(y_m, monthpredict_data)

print(f"MAE: {mae}\nMSE: {mse}\nR²: {r2}")

plt.style.use('ggplot')
plt.figure(figsize=(10, 5))
plt.plot(monthpredict_dataframe.index, monthpredict_dataframe['Actual_Price'], color='r', alpha=0.8,
         label='Actual Price')
plt.plot(monthpredict_dataframe.index, monthpredict_dataframe['Predicted_price'], color='b', alpha=0.4,
         label='Predicted Price')
plt.title('Gold Price Actual vs Predicted', pad=16) 
plt.xlabel('Date', labelpad=12)
plt.ylabel('Price (USD)', labelpad=12)
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()
