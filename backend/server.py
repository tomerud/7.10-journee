from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv(dotenv_path='./.env')

# MySQL configurations
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.get_json()
    nickname = data['nickname']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO response (nickname) VALUES (%s)", (nickname,))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User added successfully'}), 201

@app.route('/api/users/<nickname>', methods=['PUT'])
def update_user(nickname):
    data = request.get_json()
    about_yourself = data['about_yourself']

    cur = mysql.connection.cursor()
    cur.execute("UPDATE response SET about_yourself = %s WHERE nickname = %s", (about_yourself, nickname))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)