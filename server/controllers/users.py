import os
from flask import request, jsonify
from bson.json_util import dumps
from pymongo import MongoClient
from schemas import validate_user
import flask_bcrypt
client = MongoClient('mongodb://localhost/database')
db = client['database']


def user():
    if request.method == 'GET':
        query = request.args
        data = db.users.find(query)
        return dumps(data), 200

    data = request.get_json()
    if request.method == 'POST':
        validated =  validate_user(data)
        if validated['ok']:
            data['password'] = flask_bcrypt.generate_password_hash(data['password'])
            db.users.insert_one(data)
            return jsonify({'ok': True, 'message': 'User created successfully!'}), 200
        else:
            return jsonify({'ok': False, 'message': validated['message']}), 400

    if request.method == 'DELETE':
        if data.get('email', None) is not None:
            db_response = db.users.delete_one({'email': data['email']})
            if db_response.deleted_count == 1:
                response = {'ok': True, 'message': 'deleted'}
            else:
                response = {'ok': True, 'message': 'no record found'}
            return jsonify(response), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400
    if request.method == 'PATCH':
        if data.get('email', None) is not None:
            db_response = db.users.update_one({'email': data['email']},{'$set':{"access":data.get('access')}})
            response = {'ok': True, 'message': 'updated'}
            return jsonify(response), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400