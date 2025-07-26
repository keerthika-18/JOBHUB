# convert_to_csv.py
import pandas as pd

# Load Excel file
df = pd.read_excel("C:\\Users\\Keethika P\\Downloads\\job_dataset.xlsx")

# Save as CSV
df.to_csv("data/jobs_dataset.csv", index=False)

print("Conversion complete! Saved to data/jobs_dataset.csv")
