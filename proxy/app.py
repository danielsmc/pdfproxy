#! /usr/bin/env python

import flask
import os
import re
import subprocess

app = flask.Flask(__name__)

base_url = os.environ['BASE_URL']
catchall_redirect = os.environ['CATCHALL_REDIRECT']

munge = 'Array.prototype.forEach.call(document.querySelectorAll("a"),function(d) {if (d.href.indexOf("%s") != 0) d.href="%s?url="+encodeURIComponent(d.href);});'%(base_url,base_url)

@app.route("/")
def proxy():
    url = flask.request.args.get('url')
    if url is None:
    	return catchall()
    if re.match("^https?://", url) is None:
    	url = "http://"+url
    content = subprocess.check_output(["wkhtmltopdf",url,'--run-script',munge,'-'])
    return flask.Response(content, mimetype='application/pdf')

@app.route('/<path:path>')
def catchall(path=None):
	return flask.redirect(catchall_redirect)

if __name__ == "__main__":
    app.run()