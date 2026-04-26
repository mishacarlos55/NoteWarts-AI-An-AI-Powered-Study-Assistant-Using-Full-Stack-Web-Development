import MagicLayout from "../components/MagicLayout";

const flashcards = [
  { q: "What is CPU?", a: "CPU stands for Central Processing Unit." },
  { q: "What is RAM?", a: "RAM is volatile memory used for temporary storage." },
  { q: "What is ROM?", a: "ROM stores permanent instructions and is non-volatile." },
];

export default function FlashcardsPage() {
  return (
    <MagicLayout
      title="Flashcards Vault"
      subtitle="Flip through magical revision cards and memorize concepts faster."
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className="bg-white/90 rounded-3xl p-6 shadow-2xl border border-white/40 min-h-[240px] flex flex-col justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                Card {index + 1}
              </p>
              <h3 className="mt-4 text-xl font-black text-[#2f2116]">
                {card.q}
              </h3>
            </div>

            <div className="mt-6 rounded-2xl bg-[#fff9f0] p-4 border border-black/10">
              <p className="text-black/75">{card.a}</p>
            </div>
          </div>
        ))}
      </div>
    </MagicLayout>
  );
}