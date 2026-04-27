module.exports = (bot) => {
    const ADMIN_ID = 6823368645;

    bot.on('message', async (ctx, next) => {
        // যদি মেসেজে টেক্সট না থাকে বা কোনো মেসেজ না থাকে তবে স্কিপ করবে
        if (!ctx.message || !ctx.message.text) return next();

        const messageText = ctx.message.text.toLowerCase();
        const userId = ctx.from.id;
        const msgId = ctx.message.message_id;

        // লিঙ্কের জন্য শক্তিশালী রেজেক্স (Regex)
        const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|t\.me\/[^\s]+|bit\.ly\/[^\s]+)/gi;

        // ১. মেসেজে যদি লিঙ্ক থাকে
        if (linkRegex.test(messageText)) {
            
            // ২. চেক করবে মেসেজটি কি অ্যাডমিন (বস ইনাফুল) পাঠিয়েছে?
            if (userId === ADMIN_ID) {
                console.log("বস ইনাফুল লিঙ্ক পাঠিয়েছেন, অনুমতি দেওয়া হলো।");
                return next(); // বস লিঙ্ক দিলে ডিলিট হবে না
            }

            // ৩. সাধারণ ইউজার হলে লিঙ্ক ডিলিট এবং ওয়ার্নিং
            try {
                // মেসেজ ডিলিট করা
                await ctx.deleteMessage(msgId);
                
                // ইউজারকে মেনশন করে ওয়ার্নিং দেওয়া
                const warningMsg = `🚫 **লিঙ্ক শেয়ার নিষেধ!**\n\nশুনুন [${ctx.from.first_name}](tg://user?id=${userId}), এই গ্রুপে কোনো প্রকার লিঙ্ক শেয়ার করা কঠোরভাবে নিষিদ্ধ। আবার লিঙ্ক দিলে আপনাকে গ্রুপ থেকে বের করে দেওয়া হতে পারে! ⚠️`;
                
                return ctx.replyWithMarkdown(warningMsg);
            } catch (e) {
                console.log("AntiLink Error: " + e.message);
            }
        }

        return next();
    });

    console.log("AntiLink System Active! 🛡️ (No links allowed except Admin)");
};
