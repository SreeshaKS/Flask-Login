from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

user_schema = {
    "type": "object",
    "properties": {
        "username": {
            "type": "string",
        },
        "email": {
            "type": "string"
        },
        "password": {
            "type": "string",
            "minLength": 2
        },
        "access": {
            "type": "array"
        }
    },
    "required": ["email", "password"],
    "additionalProperties": False
}

login_schema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
        },
        "password": {
            "type": "string",
            "minLength": 2
        }
    },
    "required": ["email", "password"],
    "additionalProperties": False
}

def validate_login_data(data):
    try:
        validate(data, login_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

def validate_user(data):
    try:
        validate(data, user_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}