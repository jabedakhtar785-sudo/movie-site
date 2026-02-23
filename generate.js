export default async function handler(req, res) {
  try {
    const { movie } = req.body;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You explain movies in Hindi for YouTube audience." },
          { role: "user", content: `Explain movie ${movie} in Hindi in 12 minute script` }
        ]
      })
    });
    
    const data = await response.json();
    res.status(200).json({ text: data.choices[0].message.content });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}