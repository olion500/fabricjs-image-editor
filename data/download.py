import requests
import json

# Function to download HTML content and make it one line
def download_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        html_content = response.text
        # html_content = ''.join(response.text.split())
        # html_content = response.text.replace('\n', '').replace('\r', '')
        # html_content = html_content.replace('  ', 'F')
        return html_content
    else:
        return None

with open('./shape.json') as f:
  data = json.load(f)

  for item in data:
      url = item['image']['url']
      html_content = download_html(url)
      if html_content:
          print(f"`{html_content}`,")
