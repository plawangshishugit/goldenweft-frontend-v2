// components/internal/LaunchChecklist.tsx

const CHECKLIST = [
  {
    title: "Core functionality",
    items: [
      "Trial upload works without storing images",
      "Session personalisation stores & clears correctly",
      "PDP loads with and without personalisation",
      "No console or network errors",
    ],
  },
  {
    title: "Editorial consistency",
    items: [
      "Saree images follow consistent lighting",
      "Archetype images feel calm & cultural",
      "No AI or body-centric language in copy",
    ],
  },
  {
    title: "Trust & ethics",
    items: [
      "Personalisation is optional",
      "Clear opt-out visible",
      "No hidden data usage",
    ],
  },
  {
    title: "Business readiness",
    items: [
      "Pricing explanation visible",
      "CTA tone is respectful",
      "Support / contact path exists",
    ],
  },
];

export default function LaunchChecklist() {
  return (
    <section className="max-w-3xl space-y-8 bg-white p-8 rounded-2xl border border-gray-200">
      <h2 className="font-serif text-2xl text-gray-900">
        GoldenWeft – Launch Checklist
      </h2>

      {CHECKLIST.map((group) => (
        <div key={group.title} className="space-y-2">
          <h3 className="font-serif text-lg text-gray-800">
            {group.title}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {group.items.map((item) => (
              <li
                key={item}
                className="font-sans text-sm text-gray-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
