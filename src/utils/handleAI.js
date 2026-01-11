import { puter } from "@heyputer/puter.js";
import toast from "react-hot-toast";
import { fetchUserProfile } from "./firebaseHelper";

export const handleAI = async (products, setFilter, setAiLoading) => {
  setAiLoading(true);

  const name = await fetchUserProfile()
  const userText = window.prompt(`Hey ${name || "there"} 👋 What can I help you find today?`);

  if (!userText) return setAiLoading(false);

  const response = await puter.ai.chat(`
  You are a filtering engine.

  Return ONLY valid JSON in this exact format:

  {
    "reply": "The "reply" must be warm, friendly, and reassuring. Sound like a helpful shop assistant. Never sound robotic.",
    "products": [ ...filtered products from the list ]
  }

  Rules:
  - Do NOT invent products
  - Do NOT add text outside JSON
  - Never return empty. Always find some closest matching product if prompt is unclear.

  PRODUCTS:
  ${JSON.stringify(products)}

  USER QUERY:
  ${userText}
 `);

  let parsed;
  try {
    parsed = JSON.parse(response.message.content);
    console.log(parsed)
  } catch {
    toast.error("Oops, our AI seems busy handling customers..");
    setAiLoading(false);
    return;
  }

  toast.success(parsed.reply, {
    duration: 6000,
    position: "top-right",
    style: { marginTop: "4rem", color: "#0275d8" },
  });

  setFilter(parsed.products);
  setAiLoading(false);
};
