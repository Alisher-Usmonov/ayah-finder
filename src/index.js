import TelegramBot from "node-telegram-bot-api";
import ENV from "../env.config.js";
import axios from "axios";
// import transliterator from "./utils/transliterator.js";

const bot = new TelegramBot(ENV.TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  const { id: chatID } = msg.from;
  const { text } = msg;
  try {
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

      const ayah = response.data.data.text;
      const surahName = response.data.data.surah.englishName;
      const ayahNum = response.data.data.numberInSurah;
      bot.sendMessage(
        chatID,
        `${ayah}\n\n<i>${surahName} surasi, ${ayahNum}-oyat</i>`,
        {
          parse_mode: "HTML",
        }
      );
    }
  } catch (error) {
    bot.sendMessage(chatID, "Oyat topilmadi😔.");
  }
});
