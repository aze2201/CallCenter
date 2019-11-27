from bottle import Bottle, request, redirect
from bottle_login import LoginPlugin


app = Bottle()
app.config['SECRET_KEY'] = 'secret'

login = app.install(LoginPlugin())

@login.load_user
def load_user_by_id(user_id):
    print ("OK")

@app.route('/')
def index():
    current_user = login.get_user()
    return current_user.name

@app.route('/signout')
def signout():
    # Implement logout
    login.logout_user()
    return redirect('/')

@app.route('/signin')
def signin():
    # Implement login (you can check passwords here or etc)
    user_id = int(request.GET.get('user_id'))
    login.login_user(user_id)
    return redirect('/')


app.run(host='0.0.0.0', port=9090,reload=True)