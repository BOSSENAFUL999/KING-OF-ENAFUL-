const { Telegraf } = require('telegraf');

// আপনার দেওয়া টোকেনটি এখানে বসিয়ে দিলাম
const bot = new Telegraf('8630520684:AAGNRYDYTx_wcC5g_hCE9sZeKJB8TCFnKdY');

// আপনার সব মডিউল বা ফাইলগুলো এখানে কানেক্ট করা হচ্ছে
try {
    require('./BOSS_ENAFUL/reactionHandler')(bot);
    require('./BOSS_ENAFUL/ban')(bot);
    require('./BOSS_ENAFUL/antiLink')(bot);
    require('./BOSS_ENAFUL/mute')(bot);
    require('./BOSS_ENAFUL/broadcast')(bot);
    require('./BOSS_ENAFUL/systemInfo')(bot);
    require('./BOSS_ENAFUL/autoAI')(bot);
    require('./BOSS_ENAFUL/owner')(bot);

    console.log("✅ BOSS ENAFUL - বটের সব সিস্টেম সফলভাবে কানেক্ট হয়েছে!");
    console.log("🚀 বট এখন অনলাইনে আছে... রাজত্ব শুরু হোক!");
} catch (error) {
    console.error("❌ ফাইল কানেক্ট করতে সমস্যা হয়েছে:", error.message);
}

// বট চালু করা
bot.launch();

// স্মুথ স্টপ নিশ্চিত করা
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
