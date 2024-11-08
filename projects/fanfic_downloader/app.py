from flask import Flask, render_template, request, send_from_directory, flash, redirect, url_for
import requests
import os
import zipfile
import io

app = Flask(__name__)
app.secret_key = "your_secret_key"

DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

FICHUB_API_URL = "https://fichub.net/api/v1/story"

def download_fanfic(story_url, format="epub"):
    """Downloads fanfiction from FanFiction.net via FicHub."""
    payload = {
        "site": "ffnet",
        "story_url": story_url,
        "output_format": format
    }

    response = requests.post(FICHUB_API_URL, json=payload)

    if response.status_code != 200:
        return None, f"Failed to retrieve download link. Status: {response.status_code}"

    data = response.json()
    download_url = data.get("download_url")
    
    if not download_url:
        return None, "Download URL not found."

    file_name = f"{data.get('title', 'fanfic')}.{format}"
    file_path = os.path.join(DOWNLOAD_FOLDER, file_name)

    fic_response = requests.get(download_url)
    if fic_response.status_code == 200:
        with open(file_path, "wb") as f:
            f.write(fic_response.content)
        return file_name, None
    else:
        return None, f"Failed to download the file. Status: {fic_response.status_code}"

def download_multiple_fanfics(story_urls, format="epub"):
    """Downloads multiple fanfics and returns the path to a ZIP file with all downloaded fanfics."""
    zip_filename = "fanfic_downloads.zip"
    zip_path = os.path.join(DOWNLOAD_FOLDER, zip_filename)

    with zipfile.ZipFile(zip_path, "w") as zipf:
        for url in story_urls:
            file_name, error = download_fanfic(url, format)
            if file_name:
                zipf.write(os.path.join(DOWNLOAD_FOLDER, file_name), file_name)
            else:
                flash(f"Error downloading {url}: {error}", "error")
    
    return zip_filename

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        story_urls = request.form["story_urls"].strip().splitlines()
        format = request.form.get("format", "epub")

        if not story_urls:
            flash("At least one story URL is required!", "error")
            return redirect(url_for("index"))

        zip_filename = download_multiple_fanfics(story_urls, format)
        return redirect(url_for("download_file", filename=zip_filename))

    return render_template("index.html")

@app.route("/fanficdownloads/<filename>")
def download_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)