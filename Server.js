import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.get("/", (req, res) => {
res.send("Chronical AI Server Running 🚀");
});

app.post("/chat", async (req, res) => {
try {
const msg = req.body.message;

```
    if (!msg) {
        return res.json({
            reply: "Please enter a message."
        });
    }

    if (
        msg.toLowerCase().includes("who made you") ||
        msg.toLowerCase().includes("who created you") ||
        msg.toLowerCase().includes("who is your owner") ||
        msg.toLowerCase().includes("who developed you")
    ) {
        return res.json({
            reply: "I am Chronicall AI. I was created by Swayam Sherekar."
        });
    }

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `You are Chronicall AI created by Swayam Sherekar.
```

If someone asks who created you, answer that you were created by Swayam Sherekar.

User: ${msg}`
}
]
}
]
})
}
);

```
    const data = await response.json();

    const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a reply.";

    res.json({ reply });

} catch (err) {
    console.error(err);

    res.json({
        reply: "AI Error"
    });
}
```

});

app.listen(process.env.PORT || 3000, () => {
console.log(`Server running on port ${process.env.PORT || 3000}`);
});
