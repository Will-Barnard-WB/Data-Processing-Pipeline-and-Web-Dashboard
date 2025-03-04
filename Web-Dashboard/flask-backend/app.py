from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Database Configuration
DB_HOST = "postgres"
DB_NAME = "postgres"
DB_USER = "airflow"
DB_PASS = "airflow"

# Function to get database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# API Route to Fetch Stock Data
@app.route("/", methods=["GET"])
def get_stock_data():
    conn = get_db_connection()
    if conn is None:
        response = jsonify({"error": "Database connection failed"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500

    cur = conn.cursor()
    try:
        cur.execute("SELECT dt, stock_symbol, open_price, close_price FROM stock_data;")
        rows = cur.fetchall()
        
        stocks = [
            {"datetime": row[0], "symbol": row[1], "open_price": row[2], "close_price": row[3]}
            for row in rows
        ]

        response = jsonify({"stocks": stocks})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    except Exception as e:
        response = jsonify({"error": f"Error fetching stock data: {str(e)}"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5050)
