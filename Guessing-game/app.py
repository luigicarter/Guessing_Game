from flask import Flask, render_template, request, redirect, url_for, flash, session
import json

from flask_session import Session

from random import randint as rand

path = "mylib.json"


with open(path, 'r') as mypass:
    mysheet = json.load(mypass)

app = Flask(__name__)
app.config['SECRET_KEY'] = mysheet["pass"]
app.config["SESSION_TYPE"] = "filesystem"
app.config['PERMANENT_SESSION_LIFETIME'] = 4 * 60 * 60
Session(app)


def create_random_number():
    if 'random_number' not in session:
        session['random_number'] = rand(1, 10)
    elif 'new_number' in session and session['new_number'] is not None:
        session['random_number'] = session['new_number']
        session['new_number'] = None
    print(session['random_number'])
    return session['random_number']
def check_border():
    if 'border-size' not in session:
        session['border-size'] = 0



@app.route('/', methods=['GET', 'POST'])
def home():

    create_random_number()
    check_border()

    if request.method == 'POST':
        guess = int(request.form['guess'])
        if guess == session['random_number'] :
                print('Correct!')
                session['new_number'] = rand(1, 10)
                session['border-size'] = 0
                return render_template('won.html', random_number=session['random_number'], border= session["border-size"])
        else:
                flash('Incorrect, guess again!')
                session["border-size"] = session["border-size"] + 1
                print(session["border-size"])
                return render_template('index.html', random_number=session['random_number'], border= session["border-size"])

    return render_template('index.html', random_number=session['random_number'], border= session["border-size"])

@app.route('/reset', methods=['POST'])
def reset_border():
    session['border-size'] = 0
    return redirect(url_for('home'))



if __name__ == '__main__':
    app.run(port=6590)
