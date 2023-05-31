import os
from optparse import OptionParser
from flask import Flask, jsonify,  flash, request, redirect, url_for, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from openpyxl import load_workbook
from detect import *

UPLOAD_FOLDER = 'static/uploads/'

app = Flask(__name__)
CORS(app)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route("/api")
def hello_world():
    return jsonify({'success': 'ok'})

@app.route('/api', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    else:
        uploads = os.path.join(app.root_path, "static/data/")
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        #print('upload_video filename: ' + filename)
        flash('Video successfully uploaded and displayed below')	
       
        opt = parse_opt('static/uploads/' + filename)
        res = main(opt)
        if res: 
            return send_from_directory(directory=uploads,path=filename+'.xlsx',as_attachment=True)
        else:
            return jsonify({'success': 'fail'})

@app.route('/api/display/<filename>')
def display_video(filename):
    #print('display_video filename: ' + filename)
    return redirect(url_for('static', filename='uploads/' + filename), code=301)

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)