// lib/db/seedSarees.ts

export const DUMMY_SAREES = [
  {
    slug: "bhagalpuri-tussar-silk-natural",
    name: "Bhagalpuri Tussar Silk",
    region: "Bhagalpur, Bihar",
    imageUrl: "/sarees/bhagalpuri-tussar-silk.png",

    reason:
      "Chosen for its soft fall and breathable comfort, ideal for composed gatherings and long rituals.",

    fabric: "Tussar silk",
    weave: "Handloom",
    feel: "Soft & breathable",
    weight: "Lightweight",

    occasions: ["Pooja & rituals", "Family gatherings"],

    price: 16500,

    // 👉 used internally (ranking / archetypes)
    borderWeight: "light",
    drape: "soft",
    colorTone: "neutral",
  },

  {
    slug: "banarasi-katan-silk-classic",
    name: "Banarasi Katan Silk",
    region: "Varanasi, Uttar Pradesh",
    imageUrl: "/sarees/banarasi-katan-silk-classic.png",

    reason:
      "Selected for its structured drape and ceremonial presence, suited for traditional occasions.",

    fabric: "Katan silk",
    weave: "Handloom",
    feel: "Rich & structured",
    weight: "Medium weight",

    occasions: ["Wedding rituals", "Formal ceremonies"],

    price: 28500,

    borderWeight: "medium",
    drape: "structured",
    colorTone: "warm",
  },
];
