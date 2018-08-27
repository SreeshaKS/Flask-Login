import flask
import flask_login
from flask_cors import CORS,cross_origin
from flask_pymongo import PyMongo
import controllers
import json
from bson.objectid import ObjectId
from schemas import validate_login_data
from bson.json_util import dumps
from pymongo import MongoClient
from schemas import validate_user
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token
import flask_bcrypt
from flask_bcrypt import Bcrypt
import datetime
import os

client = MongoClient('mongodb://localhost/database')
db = client['database']

# class CustomJSONEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, ObjectId):
#             return str(o)
#         if isinstance(o, datetime.datetime):
#             return str(o)
#         return json.JSONEncoder.default(self, o)


app = flask.Flask(__name__)#,static_url_path='/browser-client/src')
app.secret_key = '2398749345kjerjkrgf!@#_$)#FKDINFD'
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

jwt = JWTManager(app)

# app.json_encoder = CustomJSONEncoder

CORS(app)

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

#mock database
users = {'sree': {'password': 'sree' , 'data':['comp1']}}

class User(flask_login.UserMixin):
    pass


@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user


@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    if email not in users:
        return

    user = User()
    user.id = email

    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = request.form['password'] == users[email]['password']

    return user

@app.route('/login', methods=[ 'POST'])
def login():
    data = flask.request.get_json()
    validated = validate_login_data(data)
    if validated['ok']:
        user = db.users.find_one({'email': data['email']},{"_id": 0})
        #return str({'sdarg':flask_bcrypt.generate_password_hash(data['password']),'':user['password']})
        #print flask_bcrypt.generate_password_hash(data['password'])
        #print user['password']
        if user and flask_bcrypt.check_password_hash(user['password'],data['password']):
            access_token = create_access_token(identity=data)
            refresh_token= create_refresh_token(identity=data)
            user['token']=access_token
            user['refresh']=refresh_token
            return flask.jsonify({'ok':True,'data':user}), 200
        else:
            return flask.jsonify({'ok':False,'message':'Invalid username or password'}), 401
    else:
        return flask.jsonify({'ok': False, 'message': validated['message'] }), 400
    
@app.route('/user', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def user():
    return controllers.userRoute()

@app.route('/protected')
@flask_login.login_required
def protected():
    return "{'access':['comp1','comp2']}"

@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'Logged out'

white = ['http://localhost:8081']

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response

if __name__ == '__main__':
    app.run(debug=True, port=8282, host='0.0.0.0')