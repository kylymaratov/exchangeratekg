

country_flags = ["USD 🇺🇸", "EUR 🇪🇺", "RUB 🇷🇺", "KZT 🇰🇿"]
share_country_flags = ["USD 🇺🇸", "EUR 🇪🇺",
                       "RUB 🇷🇺", "KZT 🇰🇿", "CNY 🇨🇳", "GBP 🇬🇧"]


def format_nbkr_data(data):
    result = f"Current official NBRK course\n\n"

    current_course = data[:12]
    middle_course = data[:12 + len(current_course)][-12:]
    of_course = data[-6:]

    for i in range(3):
        if i == 0:
            result += f"Current course\n"
        if i == 1:
            result += f"Middle course\n"
        if i == 2:
            result += f"Official course\n"

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
    result = f"Current course from banks of KG\nPurchase | Sale\n\n"

    for item in data:
        result += f"{item['title']}\n"

        for i in range(len(country_flags)):
            result += f"*{country_flags[i]}: {item['courses'][i]['buy']} | {item['courses'][i]['sell']}*\n"

        result += f"_Time_: {item['time']}\n\n"
    return result
