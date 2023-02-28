import telebot
import time
import logging
import flask
import config
import templates
import parser

bot = telebot.TeleBot(config.TOKEN)
logger = telebot.logger
telebot.logger.setLevel(logging.INFO)
app = flask.Flask(__name__)

logger = telebot.logger
telebot.logger.setLevel(logging.DEBUG)
logging.basicConfig(filename="logger.log", level=logging.ERROR)


@bot.message_handler(commands=["start", "help", "banks", "nbkr", "mossovet"])
def send_welcome(message):
    if message.chat.type != "private":
        return

    bot.send_chat_action(message.chat.id, "typing")
    if message.text == "/start":
        return bot.send_message(message.chat.id, templates.START)
    elif message.text == "/help":
        return bot.send_message(message.chat.id, templates.HELP)
    elif message.text == "/banks":
        return bot.send_message(message.chat.id, parser.parse_banks_data(formated=True), parse_mode="Markdown")
    elif message.text == "/nbkr":
        return bot.send_message(message.chat.id, parser.parse_nbkr_data(formated=True), parse_mode="Markdown")
    elif message.text == "/mossovet":
        photos = parser.parse_mossovet_photos()
        if len(photos) == 0:
            return bot.reply(str("No data, please try later"))
        for photo in photos:
            bot.send_photo(message.chat.id, photo)
    else:
        bot.reply_to(templates.UKNOWN_COMMAND)


if __name__ == "__main__":
    if config.WEBHOOK_MODE:
        WEBHOOK_URL_PATH = "/bot/%s/" % (bot.token)

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
            (str(config.WEBHOOK_HOST) + str(WEBHOOK_URL_PATH)), max_connections=1)
        app.run(host=config.WEBHOOK_LISTEN,
                port=config.WEBHOOK_PORT
                )
    else:
        bot.infinity_polling()
