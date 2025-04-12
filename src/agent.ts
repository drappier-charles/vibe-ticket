import { blModel } from "@blaxel/sdk";

async function generateVibeTicket(prompt: string) {
  try {
    const llm = await blModel("cerebras-llama-3-3-70b", {
      temperature: 0.9,
    }).ToLangChain();
    const response = await llm.invoke([
      {
        role: "system",
        content:
          "You are a product management expert with an engaging and clear tone.",
      },
      {
        role: "user",
        content: prompt,
      },
      {
        role: "system",
        content:
          "You are a product management expert with an engaging and clear tone.",
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    const vibeTicket = response.content;
    return vibeTicket;
  } catch (error) {
    console.error(error);
    throw new Error("OpenAI API error");
  }
}

export async function agent(message: string): Promise<string> {
  const prompt = `
  You're a stylish, kind, and charismatic product manager. 
  You write product tickets with real vibe: human, engaging, clear, and inspiring.

  Here's a ticket written in a monotonous way:
  ---
  ${message}
  ---

  Rewrite this ticket with the vibe. Structure if necessary (title, context, problem, solution, impact). Add emojis if relevant. Stay professional but lively.

  Response:
  `;

  const vibeTicket = await generateVibeTicket(prompt);
  return vibeTicket;
}
