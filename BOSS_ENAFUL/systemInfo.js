const os = require('os');

module.exports = (bot) => {
    const ADMIN_ID = 6823368645;

    // ১. সিস্টেম ইনফো কমান্ড
    bot.command('sys', async (ctx) => {
        // শুধুমাত্র বস এনাফুল চেক করতে পারবেন
        if (ctx.from.id !== ADMIN_ID) {
            return ctx.reply("❌ এই গোপনীয় তথ্য দেখার এক্সেস আপনার নেই!");
        }

        const platform = os.platform();
        const arch = os.arch();
        const uptime = (os.uptime() / 3600).toFixed(2); // ঘণ্টা হিসেবে
        const freeMem = (os.freemem() / (1024 * 1024)).toFixed(2);
        const totalMem = (os.totalmem() / (1024 * 1024)).toFixed(2);

        const infoMsg = `
📊 **BOSS ENAFUL - সিস্টেম স্ট্যাটাস** 🚀
──────────────────
📱 **OS Platform:** ${platform} (${arch})
⏱️ **Bot Uptime:** ${uptime} Hours
💾 **RAM Usage:** ${totalMem - freeMem}MB / ${totalMem}MB
🔋 **System Health:** Running Smoothly
──────────────────
🫡 **Boss, সব ঠিকঠাক চলছে!**
        `;

        await ctx.reply(infoMsg);
    });

    // ২. হেল্প কমান্ড (বটের সব কমান্ড এক নজরে দেখার জন্য)
    bot.command('help', (ctx) => {
        const helpMsg = `
🛠️ **BOSS ENAFUL - কমান্ড লিস্ট**
──────────────────
🚫 /ban - ইউজার ব্যান (Reply)
🔓 /unban - ইউজার আনব্যান (ID)
👞 /kick - ইউজার কিক (Reply)
🤐 /mute - ইউজার মিউট (Reply)
🔊 /unmute - ইউজার আনব্যান (Reply)
📣 /broadcast - সবার কাছে মেসেজ
📊 /stats - ইউজার সংখ্যা দেখা
📱 /sys - সিস্টেম ইনফো দেখা
──────────────────
🔗 **Owner:** [BOSS ENAFUL](https://www.facebook.com/KINGOFENAFULE)
        `;
        ctx.replyWithMarkdown(helpMsg, { disable_web_page_preview: true });
    });

    console.log("System Info & Help Menu Loaded! 📊");
};
