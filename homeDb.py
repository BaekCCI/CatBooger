from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, db
import logging

app = Flask(__name__)

cred = credentials.Certificate('./serviceAccountKey.json')
name=firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://petproject-34206-default-rtdb.firebaseio.com/'
})

db_ref = db.reference()
print(name)

@app.route('/add_bathing', methods=['POST'])
def add_bathing():
    try:
        data = request.json
        user_id = data['userId']
        bathing_id = data['bathingId']
        date = data['date']
        memo = data['memo']

        # Firebase에 데이터 저장
        new_bathing_ref = db_ref.child(user_id).child('bathing').child(bathing_id)
        new_bathing_ref.push({
            'date': date,
            'memo': memo
        })

        return jsonify({"status": "success"}), 200


    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500
    

if __name__ == '__main__':   
    app.run(port=5001, debug=True)
