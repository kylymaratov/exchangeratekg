import telebot
import time
import logging
import flask
import init
import templates
import parser
import os
from dotenv import load_dotenv

load_dotenv()

bot = telebot.TeleBot(init.TOKEN)
logger = telebot.logger
telebot.logger.setLevel(logging.INFO)
app = flask.Flask(__name__)

logger = telebot.logger
telebot.logger.setLevel(logging.DEBUG)
logging.basicConfig(filename="logger.log", level=logging.ERROR)


@bot.message_handler(commands=["start", "help", "banks", "nbkr", "mossovet"])
def commands_handler(message):
    if message.chat.type != "private":
        return

    bot.send_chat_action(message.chat.id, "typing")
    if message.text == "/start":
        return bot.send_message(message.chat.id, templates.START)
    elif message.text == "/help":
        return bot.send_message(message.chat.id, templates.HELP)
    elif message.text == "/banks":
        banks_result = parser.parse_banks_data(formated=True)

        return bot.send_message(message.chat.id, str(banks_result), parse_mode="Markdown")
    elif message.text == "/nbkr":
        nbkr_result = parser.parse_nbkr_data(formated=True)

        print(nbkr_result)
        return bot.send_message(message.chat.id, str(nbkr_result), parse_mode="Markdown")
    elif message.text == "/mossovet":
        photos = parser.parse_mossovet_photos()
        if len(photos) == 0:
            return bot.reply_to(message, templates.NO_DATA)
        for photo in photos:
            bot.send_photo(message.chat.id, photo)
    else:
        bot.reply_to(message, templates.UKNOWN_COMMAND)


@bot.message_handler(content_types=['text'])
def text_handler(message):
    if message.chat.type != "private":
        return
    bot.reply_to(message, templates.ONLY_COMMANDS)


if __name__ == "__main__":
    if bool(os.getenv("WEBHOOK_MODE")):
        WEBHOOK_URL_PATH = "/valutakg/%s/" % (bot.token)
        WEBHOOK_HOST = os.getenv("WEBHOOK_HOST")
        WEBHOOK_LISTEN = os.getenv("WEBHOOK_LISTEN")
        WEBHOOK_PORT = os.getenv("WEBHOOK_PORT")

        @app.route(WEBHOOK_URL_PATH, methods=['POST'])
        def webhook():
            if flask.request.headers.get('content-type') == 'application/json':
                json_string = flask.request.get_data().decode('utf-8')
                update = telebot.types.Update.de_json(json_string)
                bot.process_new_updates([update])
                return ''
            else:
                lask.abort(403)

        bot.remove_webhook()
        time.sleep(0.1)

        bot.set_webhook(
            (str(WEBHOOK_HOST) + str(WEBHOOK_URL_PATH)), max_connections=1)
        app.run(WEBHOOK_LISTEN,
                int(WEBHOOK_PORT)
                )
    else:
        bot.remove_webhook()
        bot.infinity_polling()
