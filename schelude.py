import schedule
import time
from parser import parse_banks_data
from database import save_course_to_db


def do_this():
    result_banks = parse_banks_data()

    for item in result_banks:
        save_course_to_db(item)


schedule.every().day.at("08:00").do(do_this)

schedule.run_pending()
time.sleep(1)
