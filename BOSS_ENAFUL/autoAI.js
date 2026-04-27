const userMessages = new Map();

module.exports = (bot) => {
    const ADMIN_ID = 6823368645;
    const SPAM_LIMIT = 5; // ৫ সেকেন্ডে ৫টির বেশি মেসেজ দিলে
    const TIME_WINDOW = 5000; // ৫ সেকেন্ড (মিলিসেকেন্ডে)

    bot.on('message', async (ctx, next) => {
        if (!ctx.message || ctx.from.id === ADMIN_ID) return next();

        const userId = ctx.from.id;
        const now = Date.now();

        if (!userMessages.has(userId)) {
            userMessages.set(userId, []);
        }

        const timestamps = userMessages.get(userId);
        timestamps.push(now);

        // টাইম উইন্ডোর বাইরের মেসেজগুলো রিমুভ করা
        const recentMessages = timestamps.filter(time => now - time < TIME_WINDOW);
        userMessages.set(userId, recentMessages);

        if (recentMessages.length > SPAM_LIMIT) {
            try {
                // স্প্যামারকে ওয়ার্নিং বা মিউট করার লজিক
                await ctx.reply(`⚠️ **শান্ত হন [${ctx.from.first_name}](tg://user?id=${userId})!**\nএতো স্প্যাম করবেন না, বটের মগজে জ্যাম লেগে যাচ্ছে। ৫ সেকেন্ড একটু অপেক্ষা করুন।`, { parse_mode: 'Markdown' });
                
                // ইচ্ছা করলে এখানে ডাইরেক্ট মিউট লজিক অ্যাড করা যায়
                return; 
            } catch (e) {
                console.log("AntiSpam Error: " + e.message);
            }
        }

        return next();
    });

    console.log("AntiSpam Security System Active! 🛡️🔥");
};
