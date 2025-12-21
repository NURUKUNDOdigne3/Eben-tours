export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "what-to-pack-volcano-trek",
    title: "What to pack for a volcano trek",
    excerpt:
      "Essential gear and clothing recommendations to stay comfortable and safe during your mountain adventure.",
    image: "/gorila.jpg",
    readTime: "5 min read",
    category: "Safety tips",
    content: [
      "A volcano trek is one of the most rewarding experiences in East Africa — but it’s also physically demanding and weather can change quickly. Packing well can be the difference between an unforgettable adventure and a difficult day.",
      "Start with proper footwear. Waterproof hiking boots with good ankle support are strongly recommended. Pair them with moisture-wicking socks (bring an extra pair) to avoid blisters.",
      "Layering is key. Bring a breathable base layer, a warm mid-layer, and a waterproof jacket. Even if the morning is sunny, rain and cold wind can appear without warning.",
      "Don’t forget essentials: sunscreen, insect repellent, a hat, reusable water bottle, and a small snack. A lightweight daypack and a rain cover are also very helpful.",
      "Finally, bring a camera or phone with enough storage and battery — and consider a small power bank. You’ll want to capture every moment.",
    ],
  },
  {
    id: "gorilla-trekking-etiquette",
    title: "Gorilla trekking etiquette: how to behave respectfully",
    excerpt:
      "A quick guide to responsible gorilla trekking that protects wildlife and ensures a better experience for everyone.",
    image: "/gorila.jpg",
    readTime: "6 min read",
    category: "Conservation",
    content: [
      "Gorilla trekking is a privilege. These are wild animals and the rules exist to protect them — and you.",
      "Always follow your guide’s instructions. Maintain the recommended distance, avoid sudden movements, and never attempt to touch the gorillas.",
      "Keep voices low and avoid direct eye contact for extended periods. If a gorilla approaches, stay calm and let your guide manage the situation.",
      "Photography is allowed, but no flash. Flash can stress the gorillas and disrupt the encounter.",
      "If you’re feeling unwell, inform your guide. Gorillas can catch human illnesses, and responsible tourism means protecting their health.",
    ],
  },
  {
    id: "best-time-to-visit-rwanda",
    title: "Best time to visit Rwanda: weather and travel seasons",
    excerpt:
      "Learn how Rwanda’s seasons affect gorilla trekking, safaris, and cultural travel — and plan the perfect trip.",
    image: "/lion.jpg",
    readTime: "7 min read",
    category: "Travel planning",
    content: [
      "Rwanda is a year-round destination, but the experience varies depending on rainfall and trail conditions.",
      "The dry seasons (typically January–February and June–September) are popular for trekking because trails are less muddy and visibility is often better.",
      "The rainy seasons can bring lush landscapes and fewer crowds, but trekking can be more challenging due to slippery terrain.",
      "If your priority is wildlife viewing, ask us about the best time for your specific route and parks — different regions can behave differently.",
      "No matter the season, packing layers and rain protection is always a good idea in the highlands.",
    ],
  },
];
