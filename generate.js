export default async function handler(req, res) {
  try {
    const { movie } = req.body;
    
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Explain the movie ${movie} in Hindi in a 12 minute YouTube narration script`
      })
    });
    
    const data = await response.json();
    
    const text =
      data.output?.[0]?.content?.[0]?.text ||
      "No response from AI";
    
    res.status(200).json({ text });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}