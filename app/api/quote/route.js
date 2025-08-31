export async function POST(req) {
  try {
    const { mood } = await req.json();

    // Predefined quotes based on mood
    const quotes = {
      happy: [
        "Happiness is a choice, not a result.",
        "Smile, because life is beautiful!"
      ],
      sad: [
        "Every storm runs out of rain.",
        "Tough times never last, but tough people do."
      ],
      angry: [
        "Take a deep breath. Let it go.",
        "Anger is one letter short of danger."
      ]
    };

    // Pick a quote or default message
    const moodQuotes = quotes[mood.toLowerCase()] || ["Stay positive, no matter what!"];
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];

    return new Response(JSON.stringify({ quote: randomQuote }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(JSON.stringify({ error: "Failed to generate quote" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
