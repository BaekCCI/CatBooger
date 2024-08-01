from flask import Flask, render_template, request, jsonify, make_response
from flask_jwt_extended import (
    JWTManager, create_access_token, 
    get_jwt_identity, jwt_required,
    set_access_cookies, set_refresh_cookies, 
    unset_jwt_cookies, create_refresh_token,
    # jwt_refresh_token_required,
)
from flask_cors import CORS


from kakao_controller import Oauth
from kakao_config import CLIENT_ID, REDIRECT_URI

import firebase_admin
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://petproject-34206-default-rtdb.firebaseio.com/'
})

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = "secret"
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 30
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 100
jwt = JWTManager(app)

CORS(app)  # CORS 설정

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route("/oauth")
def oauth_api():

    code = str(request.args.get('code'))
    
    oauth = Oauth()
    auth_info = oauth.auth(code)
    print(auth_info)
    user = oauth.userinfo("Bearer " + auth_info['access_token'])
    
    print(user)

    # user = UserData(user)
    # UserModel().upsert_user(user)

    ref = db.reference('users')
    userRef = db.reference('users/' + str(user['id']))
    # ref.push(user)

    new_id = user['id']
    existing_user = ref.order_by_child('id').equal_to(new_id).get()
    exist = userRef.get()
    if exist is not None:
        print("User already exists")
    else:
        # ref.push(user)
        userRef.push(user)
        print("New user inserted")

    # resp = make_response(render_template('index.html'))
    # # access_token = create_access_token(identity=user.id)
    # # refresh_token = create_refresh_token(identity=user.id)
    # access_token = create_access_token(identity=user['id'])
    # refresh_token = create_refresh_token(identity=user['id'])
    # resp.set_cookie("logined", "true")
    # set_access_cookies(resp, access_token)
    # set_refresh_cookies(resp, refresh_token)

    # return resp
    return jsonify(user)


if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)