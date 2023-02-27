import telebot
import config
import templates
import parser

bot = telebot.TeleBot(config.TOKEN)


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
    print("Valuta telegram bot started...")
    bot.infinity_polling()
