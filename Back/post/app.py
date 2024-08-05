from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


cred = credentials.Certificate('../serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://petproject-34206-default-rtdb.firebaseio.com/'
})

app = Flask(__name__)

db_ref = db.reference()

@app.route('/posts')
def get_posts():
    """Retrieves all posts from the database."""
    posts = db_ref.child('posts').get()
    return jsonify(posts)

@app.route('/posts', methods=['POST'])
def create_post():
    """Creates a new post in the database."""
    data = request.get_json()

    data['tags'] = data.get('tags', [])
    db_ref.child('posts').push(data)
    return jsonify({'message': 'Post created successfully'}), 201

@app.route('/posts/<post_id>')
def get_post(post_id):
    """Retrieves a specific post from the database."""
    post = db_ref.child('posts').child(post_id).get()
    return jsonify(post)

@app.route('/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    """Updates an existing post in the database."""
    data = request.get_json()
    
    data['tags'] = data.get('tags', [])
    db_ref.child('posts').child(post_id).update(data)
    return jsonify({'message': 'Post updated successfully'}), 200

@app.route('/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Deletes a specific post from the database."""
    db_ref.child('posts').child(post_id).delete()
    return jsonify({'message': 'Post deleted successfully'}), 200


@app.route('/posts/tags/<tag>')
def get_posts_by_tag(tag):
    """Retrieves posts associated with a specific tag."""
    posts = db_ref.child('posts').order_by_child('tags').equal_to(tag).get()
    return jsonify(posts)

@app.route('/users/<user_id>/favorite-tags', methods=['GET'])
def get_favorite_tags(user_id):
    """Retrieves favorite tags for a specific user."""
    favorite_tags = db_ref.child('users').child(user_id).child('favoriteTags').get()
    return jsonify(favorite_tags)

@app.route('/users/<user_id>/favorite-tags', methods=['POST'])
def add_favorite_tag(user_id):
    """Adds a favorite tag for a user."""
    tag = request.get_json()['tag']
    db_ref.child('users').child(user_id).child('favoriteTags').push(tag)
    return jsonify({'message': 'Favorite tag added successfully'}), 201

@app.route('/users/<user_id>/favorite-tags/<tag>', methods=['DELETE'])
def remove_favorite_tag(user_id, tag):
    """Removes a favorite tag for a user."""
    db_ref.child('users').child(user_id).child('favoriteTags').child(tag).delete()
    return jsonify({'message': 'Favorite tag removed successfully'}), 200

@app.route('/posts/<post_id>/replies')
def get_comments(post_id):
    """Retrieves comments for a specific post."""
    comments = db_ref.child('posts').child(post_id).child('replies').get()
    return jsonify(comments)

@app.route('/posts/<post_id>/replies', methods=['POST'])
def create_comment(post_id):
    data = request.get_json()
    # 'acceptedAnswers' 속성을 False로 설정 예준님 data = request.get_json() 이 코드만 쓰고싶으면 acceptedAnswers = False로 값을 넣어야해요
    # 아니면 data['acceptedAnswers'] = False 코드 주석 없애고 처음 data = request.get_json()에서 acceptedAnswers를 빼고 json코드를 작성하시면 됩니다.
    #data['acceptedAnswers'] = False
    db_ref.child('posts').child(post_id).child('replies').push(data)
    return jsonify({'message': 'Reply created successfully'}), 201

@app.route('/posts/<post_id>/replies/<replies_id>', methods=['PUT'])
def update_comment(post_id, replies_id):
    """Updates an existing replies for a post."""
    data = request.get_json()
    db_ref.child('posts').child(post_id).child('replies').child(replies_id).update(data)
    return jsonify({'message': 'replies updated successfully'}), 200

@app.route('/posts/<post_id>/replies/<replies_id>', methods=['DELETE'])
def delete_comment(post_id, replies_id):
    """Deletes a specific replies from a post."""
    db_ref.child('posts').child(post_id).child('replies').child(replies_id).delete()
    return jsonify({'message': 'replies deleted successfully'}), 200

@app.route('/posts/<post_id>/replies/<replies_id>/accept', methods=['POST'])
def accept_comment(post_id, replies_id):
    """Accepts a specific comment for a post."""
    # replies/{replies_id}/acceptedAnswers 값을 true로 업데이트
    db_ref.child('posts').child(post_id).child('replies').child(replies_id).update({'acceptedAnswers': True})
    return jsonify({'message': 'Comment accepted successfully'}), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)