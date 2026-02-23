export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }
  
  try {
    const { movie } = req.body;
    
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Explain the movie ${movie} in Hindi as a YouTube narration script`
      })
    });
    
    const data = await r.json();
    const text = data.output_text || "No script";
    
    res.status(200).json({ text });
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
