module.exports = (bot) => {
    const ADMIN_ID = 6823368645;

    // ১. ইউজার ব্যান করার কমান্ড
    bot.command('ban', async (ctx) => {
        // শুধুমাত্র আপনি (অ্যাডমিন) এই কমান্ড ব্যবহার করতে পারবেন
        if (ctx.from.id !== ADMIN_ID) {
            return ctx.reply("❌ দুঃখিত বস, এই পাওয়ার শুধুমাত্র BOSS ENAFUL-এর কাছে আছে!");
        }

        let userId;
        let userName = "";

        // ক. যদি কাউকে রিপ্লাই দিয়ে কমান্ড করা হয়
        if (ctx.message.reply_to_message) {
            userId = ctx.message.reply_to_message.from.id;
            userName = ctx.message.reply_to_message.from.first_name;
        } 
        // খ. যদি সরাসরি আইডি দেওয়া হয় (উদা: /ban 123456)
        else {
            const args = ctx.message.text.split(' ');
            if (args.length < 2) {
                return ctx.reply("⚠️ ব্যবহার বিধি: কাউকে রিপ্লাই দিয়ে `/ban` লিখুন অথবা `/ban [USER_ID]` লিখুন।");
            }
            userId = args[1];
            userName = "এই ইউজারকে";
        }

        try {
            await ctx.banChatMember(userId);
            await ctx.reply(`🚫 **অ্যাকশন কমপ্লিট বস!**\n\n${userName} (ID: ${userId}) কে গ্রুপ থেকে লাথি মেরে বের করে দেওয়া হয়েছে এবং ব্যান করা হয়েছে! 🔥`);
        } catch (e) {
            ctx.reply(`❌ এরর: সম্ভবত আমি এই গ্রুপের অ্যাডমিন নই অথবা ইউজার অলরেডি নেই।`);
            console.log("Ban Error: ", e.message);
        }
    });

    // ২. ইউজার আনব্যান করার কমান্ড
    bot.command('unban', async (ctx) => {
        if (ctx.from.id !== ADMIN_ID) return;

        const args = ctx.message.text.split(' ');
        if (args.length < 2) {
            return ctx.reply("⚠️ ব্যবহার বিধি: `/unban [USER_ID]`");
        }

        const userId = args[1];

        try {
            await ctx.unbanChatMember(userId);
            await ctx.reply(`✅ বস, ID: ${userId} কে আনব্যান করা হয়েছে। সে চাইলে আবার জয়েন করতে পারবে।`);
        } catch (e) {
            ctx.reply(`❌ ইউজারকে আনব্যান করা যাচ্ছে না।`);
        }
    });

    // ৩. কিক করার কমান্ড (ব্যান হবে না, শুধু বের করে দিবে)
    bot.command('kick', async (ctx) => {
        if (ctx.from.id !== ADMIN_ID) return;

        if (ctx.message.reply_to_message) {
            const userId = ctx.message.reply_to_message.from.id;
            try {
                await ctx.kickChatMember(userId);
                // মেম্বারকে সাথে সাথে আনব্যান করা হয় যাতে সে চাইলে পরে আবার ঢুকতে পারে (কিক মানে শুধু বের করা)
                await ctx.unbanChatMember(userId);
                await ctx.reply(`👞 বস, ওরে একটা লাথি দিয়ে গ্রুপ থেকে বের করে দিছি!`);
            } catch (e) {
                ctx.reply(`❌ কিক করা যাচ্ছে না বস।`);
            }
        } else {
            ctx.reply("⚠️ কাউকে রিপ্লাই দিয়ে `/kick` লিখুন।");
        }
    });

    console.log("Ban, Unban & Kick System Loaded! 🛡️");
};
