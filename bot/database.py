import sqlite3


con = sqlite3.connect("database.db", check_same_thread=False)


cur = con.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS banks(id, courses)''')


def save_course_to_db(item):

    insert_data = (item['id'], str(item['courses']))

    cur.execute(
        f'''INSERT OR REPLACE INTO banks VALUES (?, ?)''', insert_data)

    con.commit()

    return True


def get_course_from_db(id):
    res = cur.execute(
        f'''SELECT courses FROM banks WHERE id="{id}"''').fetchone()
    return res
