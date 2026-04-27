const { GoogleGenerativeAI } = require("@google-generative-ai/generative-ai");

module.exports = (bot) => {
    const ADMIN_ID = 6823368645;
    
    // আপনার দেওয়া জেমিনাই এপিআই কি এখানে সেট করে দিয়েছি
    const genAI = new GoogleGenerativeAI("AIzaSyCFpaff3K8l5Y1_mxc8lmYg0TSyRPnjTMQ");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    bot.on('message', async (ctx, next) => {
        // টেক্সট না থাকলে বা কমান্ড হলে স্কিপ করবে
        if (!ctx.message || !ctx.message.text || ctx.message.text.startsWith('/')) return next();

        const userMsg = ctx.message.text;
        const msgId = ctx.message.message_id;

        // বটকে মেনশন করলে বা বটের নাম ধরে ডাকলে AI রিপ্লাই দিবে
        const botNames = ["enaful", "ইনাফুল", "ai", "বট", "bot", "জান", "বেবি"];
        const isTargeted = botNames.some(name => userMsg.toLowerCase().includes(name));

        if (isTargeted) {
            try {
                // চ্যাটে 'typing' অ্যাকশন দেখানো
                await ctx.sendChatAction('typing');

                // Gemini AI দিয়ে উত্তর তৈরি করা
                const prompt = `You are a helpful and friendly AI assistant for a group managed by BOSS ENAFUL. Answer this message in Bengali: ${userMsg}`;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const aiReply = response.text();

                await ctx.reply(`🤖 **BOSS ENAFUL AI:**\n\n${aiReply}`, {
                    reply_to_message_id: msgId
                });
            } catch (e) {
                // এরর হ্যান্ডলিং
                console.error("Gemini AI Error:", e);
                await ctx.reply("বস, আমার মগজে একটু জ্যাম লাগছে (API Error), একটু পরে ট্রাই করেন! 🧠⚠️", {
                    reply_to_message_id: msgId
                });
            }
        } else {
            return next();
        }
    });

    console.log("BOSS ENAFUL - Gemini AI System Loaded! 🧠🔥");
};
