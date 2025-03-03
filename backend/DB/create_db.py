import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path='../.env')

# Database connection configuration without specifying the database
config = {
    'user': os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD'),
    'host': os.getenv('MYSQL_HOST'),
}

conn = mysql.connector.connect(**config)
cursor = conn.cursor()

cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('MYSQL_DB')}")

cursor.close()
conn.close()

config['database'] = os.getenv('MYSQL_DB')

conn = mysql.connector.connect(**config)
cursor = conn.cursor()

# Create table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS response (
        nickname VARCHAR(255) PRIMARY KEY,
        about_yourself TEXT
    )
""")

# Close the connection
cursor.close()
conn.close()

print("Database and table created successfully.")