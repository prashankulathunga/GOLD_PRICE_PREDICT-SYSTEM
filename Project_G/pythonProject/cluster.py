import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
import datetime as dt

ds = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\Daily.xlsx')
ds_anls = pd.read_excel(r'D:\University\Final Y\fnl_yr_prjct\Project_G\pythonProject\data_set\month_dates.xlsx')

# convert date to numeric
ds['od_date'] = ds['Date'].apply(lambda x: x.toordinal())
ds_anls['od_date'] = ds_anls['Date'].apply(lambda x: x.toordinal())
print(ds_anls)

ds['converted_date'] = ds['od_date'].apply(lambda x: dt.datetime.fromordinal(x))
ds_anls['converted_date'] = ds_anls['od_date'].apply(lambda x: dt.datetime.fromordinal(x))
print(ds_anls)

# cluster data finalize
x_clust = ds[['od_date', 'USD']]

# scale dataset
scaler = StandardScaler()
x_scal = scaler.fit_transform(x_clust)

# apply KMeans Clustering
Kmeans = KMeans(n_clusters=3)
Kmeans.fit(x_scal)

ds['Cluster'] = Kmeans.labels_
print(ds)

plt.figure(figsize=(12, 6))

for cluster in range(Kmeans.n_clusters):
    clusters = ds[ds['Cluster'] == cluster]
    print(clusters)
    x_cls = clusters['od_date'].values.reshape(-1, 1)
    y_cls = clusters['USD'].values

    x_train, x_test, y_train, y_test = train_test_split(x_cls, y_cls, test_size=0.2, random_state=42)

    lm = LinearRegression()
    lm.fit(x_train, y_train)

    y_prd = lm.predict(x_test)

    # create best fit line
    x_line = np.linspace(clusters['od_date'].min(), clusters['od_date'].max(), 100).reshape(-1, 1)
    y_line = lm.predict(x_line)

    x_line = x_line.astype(int)
    x_line = np.vectorize(dt.datetime.fromordinal)(x_line)

    plt.style.use('ggplot')
    plt.plot(clusters['Date'], clusters['USD'])
    plt.plot(x_line, y_line, label=f'Cluster Line {cluster + 1}')

    # get MAE each cluster
    mae_score = mean_absolute_error(y_test, y_prd)
    print(f'MAE Score : {mae_score}')

    if cluster == 2:
        y_predict_month_p = lm.predict(ds_anls['od_date'].values.reshape(-1, 1))
        print(y_predict_month_p)

        # calculate MAE for month date
        mae_score_month = mean_absolute_error(ds_anls['USD'], y_predict_month_p)
        print(f'Mean Absolute Error for Month Period = {mae_score_month}')

plt.title('Gold Price Prediction with Clustered Best Fit Line')
plt.xlabel('Date')
plt.ylabel('Price (USD)')
plt.gca().spines[:].set_visible(False)
plt.legend()
plt.show()
