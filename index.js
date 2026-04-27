const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

// আপনার বটের টোকেন
const bot = new Telegraf('8630520684:AAGNRYDYTx_wcC5g_hCE9sZeKJB8TCFnKdY');

// আপনার ব্র্যান্ডিং নাম
const MY_NAME = "BOSS_ENAFUL"; 

// প্লাগইন ফোল্ডার পাথ সেট করা
const pluginsDir = path.join(__dirname, MY_NAME);

// যদি ফোল্ডারটি না থাকে তবে অটোমেটিক তৈরি হবে
if (!fs.existsSync(pluginsDir)) {
    fs.mkdirSync(pluginsDir);
}

// ফোল্ডার থেকে সব .js ফাইল খুঁজে বের করা
const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

console.log(`${MY_NAME} সিস্টেম থেকে ${files.length}টি ফাইল লোড হচ্ছে...`);

for (const file of files) {
    try {
        const plugin = require(`./${MY_NAME}/${file}`);
        // যদি ফাইলটি একটি ফাংশন এক্সপোর্ট করে তবেই লোড হবে
        if (typeof plugin === 'function') {
            plugin(bot);
        }
    } catch (error) {
        console.error(`${file} লোড করতে সমস্যা হয়েছে:`, error);
    }
}

// বট চালু করার মেসেজ
bot.launch().then(() => {
    console.log("------------------------------");
    console.log(`${MY_NAME} বট এখন পুরোপুরি অনলাইন!`);
    console.log("------------------------------");
});

// এরর বা সিস্টেম বন্ধ হওয়া হ্যান্ডেল করা
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
