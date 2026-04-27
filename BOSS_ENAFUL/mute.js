module.exports = (bot) => {
    const ADMIN_ID = 6823368645;

    // ১. মিউট করার কমান্ড (/mute লিখে রিপ্লাই দিন)
    bot.command('mute', async (ctx) => {
        if (ctx.from.id !== ADMIN_ID) {
            return ctx.reply("❌ এই পাওয়ার শুধু বস ইনাফুলের! আপনি দূরে গিয়ে মরুন।");
        }

        if (ctx.message.reply_to_message) {
            const userId = ctx.message.reply_to_message.from.id;
            const userName = ctx.message.reply_to_message.from.first_name;

            try {
                // ইউজারকে মেসেজ পাঠানো থেকে বিরত রাখা (Restrict)
                await ctx.restrictChatMember(userId, {
                    permissions: { can_send_messages: false }
                });
                await ctx.reply(`🤐 **চুপ একদম!**\n\n[${userName}](tg://user?id=${userId}) কে মিউট করা হয়েছে। এখন শুধু দেখবে, কিছু বলতে পারবে না! 🔥`, { parse_mode: 'Markdown' });
            } catch (e) {
                ctx.reply("❌ মিউট করা যাচ্ছে না। হয়তো আমি অ্যাডমিন না!");
            }
        } else {
            ctx.reply("⚠️ যাকে মিউট করতে চান তাকে রিপ্লাই দিয়ে `/mute` লিখুন।");
        }
    });

    // ২. আনমিউট করার কমান্ড (/unmute লিখে রিপ্লাই দিন)
    bot.command('unmute', async (ctx) => {
        if (ctx.from.id !== ADMIN_ID) return;

        if (ctx.message.reply_to_message) {
            const userId = ctx.message.reply_to_message.from.id;
            const userName = ctx.message.reply_to_message.from.first_name;

            try {
                // সব পারমিশন ফেরত দেওয়া
                await ctx.restrictChatMember(userId, {
                    permissions: {
                        can_send_messages: true,
                        can_send_media_messages: true,
                        can_send_polls: true,
                        can_send_other_messages: true,
                        can_add_web_page_previews: true
                    }
                });
                await ctx.reply(`🔊 **ছেড়ে দিলাম!**\n\n[${userName}](tg://user?id=${userId}) কে আনমিউট করা হয়েছে। এখন কথা বলতে পারবেন।`, { parse_mode: 'Markdown' });
            } catch (e) {
                ctx.reply("❌ আনমিউট করা যাচ্ছে না বস।");
            }
        } else {
            ctx.reply("⚠️ যাকে আনমিউট করতে চান তাকে রিপ্লাই দিয়ে `/unmute` লিখুন।");
        }
    });

    console.log("Mute & Unmute System Active! 🤐");
};
