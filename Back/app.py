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

    access_token = create_access_token(identity=user['id'])
    refresh_token = create_refresh_token(identity=user['id'])
    resp = make_response("User logged in")
    resp.set_cookie("logined", "true")
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)

    response_data = {
        'user': user['id'],
        'exists': exist, 
        'token': access_token
    }

    return jsonify(response_data)
    # return jsonify(user)
    
@app.route('/oauth/url')
def oauth_url_api():
    """
    Kakao OAuth URL 가져오기
    """
    return jsonify(
        kakao_oauth_url="https://kauth.kakao.com/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code" \
        % (CLIENT_ID, REDIRECT_URI)
    )

@app.route('/oauth/nickname', methods=['POST'])
def add_nickname():
    data = request.json

    who = data.get('who')
    nickname = data.get('nickname')
    if not all([who, nickname]):
        return jsonify({"error": "Missing data fields"}), 400

    nameRef = db.reference('users/' + str(who))
    nameRef.update({
        'nickname': nickname
    })

    return jsonify({"message": "nickname add", "name" : nameRef.key}), 201

@app.route('/nickname/<user_id>')
def nickname(user_id):
    nameRef = db.reference('users/' + user_id + '/nickname')
    name = nameRef.get()

    if name is not None: 
        return name
    else:
        return user_id

# @app.route('/token/refresh')
# @jwt_required()
# def token_refresh_api():
#     """
#     Refresh Token을 이용한 Access Token 재발급
#     """
#     user_id = get_jwt_identity()
#     resp = jsonify({'result': True})
#     access_token = create_access_token(identity=user_id)
#     set_access_cookies(resp, access_token)
#     return resp


# @app.route('/token/remove')
# def token_remove_api():
#     """
#     Cookie에 등록된 Token 제거
#     """
#     resp = jsonify({'result': True})
#     unset_jwt_cookies(resp)
#     resp.delete_cookie('logined')
#     return resp


# # @app.route("/userinfo")
# @app.route("/userinfo")
# @jwt_required()
# def userinfo():
#     """
#     Access Token을 이용한 DB에 저장된 사용자 정보 가져오기
#     """
#     user_id = get_jwt_identity()
#     print(user_id)
    
#     userRef = db.reference('users/' + str(user_id))
#     # ref.push(user)

#     exist = userRef.get()
#     if exist is not None:
#         print("User already exists")
#     else:
#         # ref.push(user)
#         userRef.push(user)
#         print("New user inserted")

#     return user_id

#     # infoRef = db.reference(f'users/{user_id}')
#     # userinfo = infoRef.get()
#     # return jsonify(userinfo)


# @app.route("/oauth/refresh", methods=['POST'])
# def oauth_refesh_api():
#     """
#     # OAuth Refresh API
#     refresh token을 인자로 받은 후,
#     kakao에서 access_token 및 refresh_token을 재발급.
#     (% refresh token의 경우, 
#     유효기간이 1달 이상일 경우 결과에서 제외됨)
#     """
#     refresh_token = request.get_json()['refresh_token']
#     result = Oauth().refresh(refresh_token)
#     return jsonify(result)


# @app.route("/oauth/userinfo", methods=['POST'])
# def oauth_userinfo_api():
#     """
#     # OAuth Userinfo API
#     kakao access token을 인자로 받은 후,
#     kakao에서 해당 유저의 실제 Userinfo를 가져옴
#     """
#     access_token = request.get_json()['access_token']
#     result = Oauth().userinfo("Bearer " + access_token)
#     return jsonify(result)


if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)