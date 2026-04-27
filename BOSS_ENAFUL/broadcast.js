module.exports = (bot) => {
    const ADMIN_ID = 6823368645;
    // এখানে আপনার বটের ডাটাবেজ থেকে ইউজার আইডিগুলো সংগ্রহ করার লজিক থাকে।
    // আপাতত আমি একটি সেট ব্যবহার করছি ডেমো হিসেবে।
    let subscribedUsers = new Set([ADMIN_ID]); 

    // নতুন কোনো মেসেজ আসলে ইউজার আইডি স্টোর করার জন্য (যাতে তাদের ব্রডকাস্ট করা যায়)
    bot.use(async (ctx, next) => {
        if (ctx.from && ctx.from.id) {
            subscribedUsers.add(ctx.from.id);
        }
        return next();
    });

    // ১. ব্রডকাস্ট কমান্ড (/broadcast [আপনার মেসেজ])
    bot.command('broadcast', async (ctx) => {
        if (ctx.from.id !== ADMIN_ID) {
            return ctx.reply("❌ এই কমান্ড শুধু বস ইনাফুলের জন্য সংরক্ষিত!");
        }

        const message = ctx.message.text.split(' ').slice(1).join(' ');

        if (!message) {
            return ctx.reply("⚠️ ব্যবহার বিধি: `/broadcast আপনার মেসেজটি লিখুন`।");
        }

        let successCount = 0;
        let failCount = 0;

        await ctx.reply(`📣 **ব্রডকাস্ট শুরু হচ্ছে বস...**`);

        for (let userId of subscribedUsers) {
            try {
                await bot.telegram.sendMessage(userId, `📢 **BOSS ENAFUL থেকে গুরুত্বপূর্ণ বার্তা:**\n\n${message}`, { parse_mode: 'Markdown' });
                successCount++;
            } catch (e) {
                failCount++;
                console.log(`Error sending to ${userId}: ${e.message}`);
            }
        }

        await ctx.reply(`✅ **ব্রডকাস্ট সম্পন্ন!**\n\n🚀 সফল: ${successCount}\n❌ ব্যর্থ: ${failCount}\n\nসবাইকে খবর পৌঁছে দেওয়া হয়েছে বস! 🔥`);
    });

    // ২. বর্তমান ইউজার সংখ্যা চেক করা
    bot.command('stats', (ctx) => {
        if (ctx.from.id !== ADMIN_ID) return;
        ctx.reply(`📊 **বট স্ট্যাটাস:**\n\nমোট একটিভ ইউজার: ${subscribedUsers.size} জন।`);
    });

    console.log("Broadcast & Stats System Loaded! 📣");
};
