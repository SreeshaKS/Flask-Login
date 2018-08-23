import flask
import flask_login
from flask_cors import CORS,cross_origin
from flask_pymongo import PyMongo

app = flask.Flask(__name__)
app.secret_key = '2398749345kjerjkrgf!@#_$)#FKDINFD'

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
    print data
    if data['password'] == users[data['username']]['password']:
        user = User()
        user.id = data['username']
        flask_login.login_user(user)
        return flask.jsonify({'ok':'true','userData':users[data['username']]['data']})

    return flask.jsonify({'error':'Bad login','ok':'false'})


@app.route('/protected')
@flask_login.login_required
def protected():
    return "{'access':['comp1','comp2']}"
    #return 'Logged in as: ' + flask_login.current_user.id

@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'Logged out'

white = ['http://localhost:8081']

@app.after_request
def add_cors_headers(response):
    r = flask.request.referrer[:-1]
    if r in white:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
        response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
        response.headers.add('Access-Control-Allow-Headers', 'Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        return response

if __name__ == '__main__':
    app.run(debug=True, port=8282, host='0.0.0.0')