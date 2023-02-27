from flask import Flask
from flask import request
import jwt
from datetime import datetime
import os

app = Flask(__name__)

# TODO: We will come back to this
users = [
    {
        "username": "david",
        "password": "my-secret"
    },
    {
        "username": "test",
        "password": "my-secret-too"
    }
]

def generate_jwt_token(username):
    return jwt.encode(
        {   "username": username, 
            "iat": datetime.timestamp(datetime.now()),
        },
        os.environ.get('JWT_SECRET'),
        algorithm="HS256"
    )

@app.route("/authorize")
def authorize():
    username = request.args.get('username')
    password = request.args.get('password')
    if username and password:
        for user in users:
            if username == user["username"] and password == user["password"]:
                return {"token": generate_jwt_token(user["username"])}
    return {"error": "user not found"}, 401

if __name__ == '__main__':
    if not os.environ.get('JWT_SECRET'):
        print("No JWT_SECRET variable found")
        exit(1)
    app.run()