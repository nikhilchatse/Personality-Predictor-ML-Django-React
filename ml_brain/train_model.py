import pandas as pd
from sklearn.cluster import KMeans
import joblib

# 1. Load the Dataset
# Note: The Kaggle dataset is usually separated by tabs ('\t'), not commas.
print("Loading dataset... this might take a minute.")
data = pd.read_csv('data-final.csv', sep='\t')

# 2. Select the Question Columns
# The dataset has columns like EXT1, EXT2... OPN10. There are 50 questions total.
# We strip out the metadata (age, country, etc.) and keep only the answers.
columns = [f'EXT{i}' for i in range(1, 11)] + \
          [f'EST{i}' for i in range(1, 11)] + \
          [f'AGR{i}' for i in range(1, 11)] + \
          [f'CSN{i}' for i in range(1, 11)] + \
          [f'OPN{i}' for i in range(1, 11)]

# We only use the first 50,000 rows to make training faster for your laptop.
# (The full dataset is huge!)
X = data[columns].iloc[:50000]

# 3. Clean the Data
# Fill missing answers with 0 and remove rows with 0 (invalid answers usually)
X = X.dropna()
X = X[(X != 0).all(1)]

print(f"Training model on {len(X)} valid responses...")

# 4. Train the K-Means Model
# We are grouping people into 5 distinct "Personality Clusters"
kmeans = KMeans(n_clusters=5, random_state=42)
kmeans.fit(X)

# 5. Save the Brain
joblib.dump(kmeans, 'personality_model.pkl')

print("Success! Model trained and saved as 'personality_model.pkl'")