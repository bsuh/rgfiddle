import bottle


@bottle.route('/')
def index():
    return bottle.static_file('index.html', root='client/src/')


@bottle.route('/client/<path:path>')
def static(path):
    return bottle.static_file(path, root='client')


if __name__ == '__main__':
    bottle.run(host='localhost', port=8080, debug=True, reloader=True)
