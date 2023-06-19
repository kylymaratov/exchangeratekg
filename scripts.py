
from database import get_course_from_db, save_course_to_db
import json

country_flags = ["USD 🇺🇸", "EUR 🇪🇺", "RUB 🇷🇺", "KZT 🇰🇿"]
share_country_flags = ["USD 🇺🇸", "EUR 🇪🇺",
                       "RUB 🇷🇺", "KZT 🇰🇿", "CNY 🇨🇳", "GBP 🇬🇧"]


def format_nbkr_data(data):
    result = f"Официальный курс нац.банка Кыргызской Республики\n\n"

    current_course = data[:12]
    middle_course = data[:12 + len(current_course)][-12:]
    of_course = data[-6:]

    for i in range(3):
        if i == 0:
            result += f"Средний курс\n"
        if i == 1:
            result += f"Лучший курс\n"
        if i == 2:
            result += f"Официальный курс\n"

        for j in range(len(share_country_flags)):
            if i == 0:
                result += f"*{share_country_flags[j]}: {current_course[j]} | {current_course[j + 1]}*\n"
            if i == 1:
                result += f"*{share_country_flags[j]}: {middle_course[j]} | {middle_course[j + 1]}*\n"
            if i == 2:
                result += f"*{share_country_flags[j]}: {of_course[j]}*\n"

        result += "\n\n"

    return result


def format_banks_data(data):
    result = f"Текущий курс в банках Кыргызской Республики\nПокупка | Продажа\n\n"

    for item in data:

        old_courses = get_course_from_db(item['id'])

        if not old_courses:
            save_course_to_db(item)
            old_courses = get_course_from_db(item['id'])

        old_courses = format_oldcourse_data(old_courses[0])

        result += f"{item['title']}\n"

        for i in range(len(country_flags)):
            procent = find_procent(old_courses, item, i)
            result += f"*{country_flags[i]}: {item['courses'][i]['buy']} | {item['courses'][i]['sell']}*   _{procent}_\n"

        result += f"_Время_: {item['time']}\n\n"
    return result


def format_oldcourse_data(text):
    result = []

    clear_text = text.replace('[', '').replace(']', '').split("}, ")

    for el in clear_text:
        item = el.replace("'", '"')

        if "}" not in el:
            result.append(json.loads(item + "}"))
            continue

        result.append(json.loads(item))

    return result


def find_procent(old_courses, item, iteration):
    result = ""

    old_course = float(old_courses[iteration]['buy']) + \
        float(old_courses[iteration]['sell'])

    new_course = float(item['courses'][iteration]['buy']) + \
        float(item['courses'][iteration]['sell'])

    if old_course < new_course:
        procent = round((new_course / old_course - 1) * 100)
        if procent != 0:
            result += f"+{procent}% "

    elif old_course > new_course:
        procent = round((old_course / new_course - 1) * 100)
        if procent != 0:
            result += f"-{procent}% "
    else:
        result = ""

    return result
