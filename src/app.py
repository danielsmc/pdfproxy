#! /usr/bin/env python

import flask
import os
import re
import subprocess

app = flask.Flask(__name__)

base_url = os.environ['BASE_URL']
munge = 'Array.prototype.forEach.call(document.querySelectorAll("a"),function(d) {d.href="%sproxy?url="+encodeURIComponent(d.href);});'%base_url

@app.route("/proxy")
def proxy():
    url = flask.request.args.get('url')
    if url is None:
    	return static_route()
    if re.match("^https?://", url) is None:
    	url = "http://"+url
    content = subprocess.check_output(["wkhtmltopdf",url,'--run-script',munge,'-'])
    return flask.Response(content, mimetype='application/pdf')

@app.route('/')
@app.route('/<path:path>')
def static_route(path="index.html"):
	return flask.send_from_directory("static",path)

if __name__ == "__main__":
    app.run()