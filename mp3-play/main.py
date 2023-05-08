from flask import Flask, Response

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/songs/<song_name>")
def play_song(song_name):
    full_song_name = song_name + '.mp3'
    print(full_song_name)
    with open(f'./songs/{full_song_name}', 'rb') as f:
        return Response(f.read(), mimetype="audio/mpeg")

@app.route('/index')
def serve_ui():
    with open('./index.html') as f:
        return Response(f.read(), mimetype="text/html")
    

if __name__ == '__main__':
    app.run()