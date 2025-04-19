export const askGemini = async (userMessage: string) => {
    const API_KEY = "AIzaSyAJC5ncK3jDkm2ypxonYKOEq4M5zZYpXfY";
  
    const res = await fetch(
      `        https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      }
    );
  
    const data = await res.json();
    console.log("Gemini Response:", data);
    return data;
  };
  