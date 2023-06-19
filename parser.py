import requests
import scripts
from bs4 import BeautifulSoup


endpoint = "https://valuta.kg/"

banks = ["bakaibank", "mcs", "salymfinance", "ecoislamicbank", "fkb", "capitalbank", "cbkbank", "aiylbank", "finca", "azia", "ksbc",
         "halykbank", "kgkb", "ayugrand", "baitushum", "amanbank", "kompanion", "doscredobank", "rskbank", "optimabank", "tolubay", "esb"]


def get_data(endpoint):
    response = requests.get(endpoint)
    if response.status_code != 200:
        return
    return response.content


def parse_nbkr_data(formated=False):
    data = get_data(endpoint)

    soup = BeautifulSoup(data, "html.parser")

    table = soup.find("div", {"class": "col-md-8"})

    result = []

    for item in table.find_all("td"):
        value = item.get_text().split()
        value = "".join(value)

        try:
            value = float(value)
            result.append(value)
        except:
            continue

    if formated:
        return scripts.format_nbkr_data(result)

    return result


def parse_banks_data(formated=False):
    data = get_data(endpoint)

    soup = BeautifulSoup(data, "html.parser")

    result = []

    for i in range(len(banks)):
        bank = soup.find("tr", {"id": f"js-member-{banks[i]}"})

        if not bank:
            continue

        bank_title = bank.find("a").get_text()
        courses = []
        try:
            bank_time = bank.find("span", {"class": "text-success"}).get_text()
        except:
            bank_time = ""

        for el in bank.find_all("div", {"class": "td-rate__wrp"}):
            text = el.get_text().split()
            courses.append("".join(text))

        result.append({
            "title": bank_title,
            "id": banks[i],
            "courses": [
                {
                    "buy": courses[0],
                    "sell": courses[1]
                },
                {
                    "buy": courses[2],
                    "sell": courses[3]
                },
                {
                    "buy": courses[4],
                    "sell": courses[5]
                },
                {
                    "buy": courses[6],
                    "sell": courses[7]
                }
            ],
            "time": bank_time})
    if formated:
        return scripts.format_banks_data(result)

    return result


def parse_mossovet_photos():
    data = get_data(endpoint)
    soup = BeautifulSoup(data, "html.parser")
    photos_selector = soup.find_all(
        "a", {"class": "js-lightbox js-rates-gallery"})

    photos = []

    for photo in photos_selector:
        photos.append(photo.get("href"))

    return photos
