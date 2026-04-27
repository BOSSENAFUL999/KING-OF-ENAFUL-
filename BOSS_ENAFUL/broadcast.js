module.exports = (bot) => {
    const ADMIN_ID = 6823368645;
    
    // ডাটাবেজের বিকল্প হিসেবে ইউজারদের আইডি স্টোর করার সেট
    let subscribedUsers = new Set([ADMIN_ID]);

    // প্রতিটি মেসেজ থেকে ইউজার আইডি সংগ্রহ করা যাতে পরে ব্রডকাস্ট করা যায়
    bot.use(async (ctx, next) => {
        if (ctx.from && ctx.from.id) {
            subscribedUsers.add(ctx.from.id);
        }
        return next();
    });

    // ১. ব্রডকাস্ট কমান্ড: /broadcast [মেসেজ]
    bot.command('broadcast', async (ctx) => {
        if (ctx.from.id !== ADMIN_ID) {
            return ctx.reply("❌ এই কমান্ড শুধু বস ইনাফুলের জন্য! আপনার কোনো পারমিশন নেই।");
        }

        const message = ctx.message.text.split(' ').slice(1).join(' ');

        if (!message) {
            return ctx.reply("⚠️ ব্যবহার বিধি: `/broadcast আপনার মেসেজটি লিখুন`।");
        }

        let successCount = 0;
        let failCount = 0;

        await ctx.reply(`📣 **বস, আপনার বার্তা সবার কাছে পৌঁছানো শুরু হয়েছে...**`);

        // লুপের মাধ্যমে সব ইউজারের কাছে মেসেজ পাঠানো
        for (let userId of subscribedUsers) {
            try {
                await bot.telegram.sendMessage(userId, `📢 **নতুন আপডেট - BOSS ENAFUL**\n\n${message}`, {
                    parse_mode: 'Markdown'
                });
                successCount++;
            } catch (e) {
                failCount++;
                console.log(`Error: ${userId} কে মেসেজ পাঠানো যায়নি।`);
            }
        }

        await ctx.reply(`✅ **প্রচার সম্পন্ন হয়েছে বস!**\n\n🚀 সাকসেস: ${successCount}\n❌ ফেইল: ${failCount}\n\nসবাইকে সতর্ক করা হয়েছে! 🔥`);
    });

    // ২. বটের ইউজার সংখ্যা জানার জন্য
    bot.command('stats', (ctx) => {
        if (ctx.from.id !== ADMIN_ID) return;
        ctx.reply(`📊 **বস ইনাফুল, বটের বর্তমান অবস্থা:**\n\nমোট ইউজার: ${subscribedUsers.size} জন।`);
    });

    console.log("BOSS ENAFUL Broadcast System Ready! 📣");
};
