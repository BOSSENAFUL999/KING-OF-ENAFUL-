const { Markup } = require('telegraf');

module.exports = (bot) => {
    const ADMIN_ID = 6823368645;
    const FB_LINK = "https://www.facebook.com/KINGOFENAFULE";
    const GITHUB_LINK = "https://github.com/BossEnaful"; // আপনার গিটহাব লিঙ্ক দিন

    bot.command(['owner', 'developer', 'enaful'], async (ctx) => {
        const ownerInfo = `
👑 **DEVELOPER INFORMATION** 👑
─────────────────────
👤 **Name:** BOSS ENAFUL
🛡️ **Team:** CYBER BOSS ENAFUL
📱 **Device:** Oppo A77s (Environment Manager)
🛠️ **Speciality:** Termux, Python & Bot Development
─────────────────────
🔥 **"আমি একা আসি নাই, পুরো টিম নিয়ে আসছি।"**
        `;

        await ctx.replyWithPhoto(
            { url: 'https://i.ibb.co/vz6mPq6/owner-image.jpg' }, // এখানে আপনার একটি সুন্দর ছবির লিঙ্ক দিন
            {
                caption: ownerInfo,
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [
                        Markup.button.url("Facebook 👤", FB_LINK),
                        Markup.button.url("GitHub 🚀", GITHUB_LINK)
                    ],
                    [Markup.button.url("Join bot maker🛡️", "https://t.me/CYBER_ATTACK_69_ZONE")]
                ])
            }
        );
    });

    // মেম্বারদের জন্য একটি গাইডেন্স কমান্ড
    bot.command('about', (ctx) => {
        const aboutMsg = `
📖 **বট সম্পর্কে কিছু কথা:**
এই বটটি **BOSS ENAFUL** দ্বারা তৈরি করা হয়েছে তার গ্রুপ এবং সিস্টেম ম্যানেজমেন্টের জন্য। এটি জেমিনাই এআই (Gemini AI) দ্বারা চালিত এবং এতে আছে পাওয়ারফুল অ্যাডমিন টুলস।

⚠️ **সতর্কতা:** বটের কোনো কোড কপি বা মড করার আগে মালিকের অনুমতি নিন।
        `;
        ctx.reply(aboutMsg);
    });

    console.log("Owner & Info System Loaded! 👑");
};
