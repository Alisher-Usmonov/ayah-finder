import TelegramBot from "node-telegram-bot-api";
import ENV from "../env.config.js";
import axios from "axios";
import transliterator from "./utils/transliterator.js";
import mongo from "./modules/mongo.js";
import users from "./models/UsersModel.js";

const bot = new TelegramBot(ENV.TOKEN, {
  polling: true,
});

mongo();

bot.on("message", async (msg) => {
  const { id: chatID } = msg.from;
  const { text } = msg;
  const user = await users.findOne({
    id: chatID,
  });
  try {
    if (!user) {
      user = await users.create({
        id: chatID,
      });
    } else {
      if (text == "/start") {
        bot.sendMessage(
          chatID,
          "Assalomu alaykum. O'zingizga kerakli oyatni topish uchun oyat raqamini <code>12:34</code> yoki <code>266</code> ko'rinishida yuboring😊.",
          {
            parse_mode: "HTML",
          }
        );
      } else {
        const response = await axios.get(
          `http://api.alquran.cloud/v1/ayah/${text}/uz.sodik`
        );

        const ayah = transliterator.toLatin(response.data.data.text);
        const surahName = response.data.data.surah.englishName;
        const ayahNum = response.data.data.numberInSurah;
        const location =
          response.data.data.surah.revelationType == "Medinan"
            ? "Madiniy"
            : "Makkiy";

        bot.sendMessage(
          chatID,
          `${ayah}\n\n<i>${surahName} surasi, ${ayahNum}-oyat</i>\n${location}`,
          {
            parse_mode: "HTML",
          }
        );
      }
    }
  } catch (error) {
    bot.sendMessage(chatID, "Oyat topilmadi😔.");
  }
});
