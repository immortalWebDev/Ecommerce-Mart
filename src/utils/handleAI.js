import { puter } from "@heyputer/puter.js";
import toast from "react-hot-toast";

export const handleAI = async (products, setFilter,setAiLoading) => {
  setAiLoading(true)
  const userText = window.prompt("Tell me what you need:");
  if (!userText) return setAiLoading(false);

  const response = await puter.ai.chat(`
You are an intent compiler.

Never ask follow-up questions.
If the intent is unclear, choose the closest matching category anyway.
If input is unrelated, return ALL products and reply accordingly.
Never return empty. 
Always decide and return JSON.

You MUST choose ONE of the following categories EXACTLY:

electronics
jewelery
men's clothing
women's clothing

Return ONLY JSON:

{
  "reply": "friendly reply",
  "category": "",
  "maxPrice": 0,
  "keywords": []
}

User wants: ${userText}
`);

console.log(response.message.content)

  const result = response.message.content; 

  const match = result.match(/\{[\s\S]*\}/);
  if (!match) return alert("Umm..Something went wrong")

  const parsed = JSON.parse(match[0]);
  console.log(parsed)

   // show toast
    toast.success(parsed.reply, {
    duration: 10000,
    position: "top-right",
    style: {
      marginTop: "4rem",
      color: "#0275d8",
    },
  });


  let filtered = products;

  if (parsed.category) filtered = filtered.filter(p => p.category === parsed.category);
  if (parsed.maxPrice) filtered = filtered.filter(p => p.price <= parsed.maxPrice);
  if (parsed.keywords?.length) {
  const strict = filtered.filter(p =>
    parsed.keywords.some(k =>
      p.title.toLowerCase().includes(k.toLowerCase()))
  );

  if (strict.length > 0) filtered = strict;
}

  setFilter(filtered);
  setAiLoading(false)
};
