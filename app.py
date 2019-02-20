from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/')
def home_redirect():
    return redirect('/index')


@app.route('/index')
def question_page():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
