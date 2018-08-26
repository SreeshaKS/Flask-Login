import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost/database'
app.config['JWT_SECRET_KEY'] = 'sdafsfrgfdss'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)

mongo = PyMongo(app)

from controllers import *