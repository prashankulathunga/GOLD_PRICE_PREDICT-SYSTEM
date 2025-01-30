import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout, Bidirectional
from keras.callbacks import EarlyStopping
from keras.optimizers import Adam


# Load dataset
data = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\Daily.xlsx')
data = data[data['Date'] > '2012-01-01']

data['Date'] = pd.to_datetime(data['Date'])
data.set_index('Date', inplace=True)

# Optional additional features
data['Year'] = data.index.year
data['Month'] = data.index.month
data['Day'] = data.index.day

scaler = MinMaxScaler(feature_range=(0, 1))
data['USD'] = scaler.fit_transform(data[['USD']])

# Convert to numpy array
values = data['USD'].values


def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i + seq_length])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)


seq_length = 90  # Increased sequence length
X, y = create_sequences(values, seq_length)

# Split data
split = int(len(X) * 0.8)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Reshape for LSTM
X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))

# Build a more complex LSTM model
model = Sequential()
model.add(Bidirectional(LSTM(64, return_sequences=True), input_shape=(X_train.shape[1], 1)))
model.add(Dropout(0.3))
model.add(Bidirectional(LSTM(64, return_sequences=False)))
model.add(Dropout(0.3))
model.add(Dense(32, activation='relu'))
model.add(Dense(1))

optimizer = Adam(learning_rate=0.001)  # Adjust learning rate if needed
model.compile(optimizer=optimizer, loss='mean_squared_error')

early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=16,
    validation_data=(X_test, y_test),
    callbacks=[early_stop],
    verbose=1
)

# Plot training and validation loss
plt.figure(figsize=(10, 5))
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss During Training')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()

# Predictions
y_pred = model.predict(X_test)

y_test_original = scaler.inverse_transform(y_test.reshape(-1, 1))
y_pred_original = scaler.inverse_transform(y_pred)

# Evaluation
mae = mean_absolute_error(y_test_original, y_pred_original)
mse = mean_squared_error(y_test_original, y_pred_original)
r2 = r2_score(y_test_original, y_pred_original)

print(f"MAE: {mae}\nMSE: {mse}\nR²: {r2}")

# Plot actual vs predicted
plt.figure(figsize=(10, 5))
plt.plot(range(len(y_test_original)), y_test_original, color='red', label='Actual Price')
plt.plot(range(len(y_pred_original)), y_pred_original, color='blue', label='Predicted Price')
plt.title('Gold Price Prediction (Enhanced LSTM)')
plt.xlabel('Days')
plt.ylabel('Price (USD)')
plt.legend()
plt.show()

act_date = data['USD'].isin(y_test)

min_len = min(len(act_date), len(y_test_original), len(y_pred_original))

predictedDataFrame = pd.DataFrame({
    "Date": act_date.index[:min_len],  # Slice the index to match the length
    "Actual_Price": y_test_original.flatten()[:min_len],
    "Predicted_Price": y_pred_original.flatten()[:min_len]
})

# Display the DataFrame
print(predictedDataFrame)

































