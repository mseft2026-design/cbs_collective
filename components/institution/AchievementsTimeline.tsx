import { institution } from "@/config/institution";

export function AchievementsTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--ivory-200)] md:left-1/2" aria-hidden />

      <div className="space-y-10">
        {institution.achievements.map((item, i) => (
          <div
            key={i}
            className={`relative flex flex-col md:flex-row gap-6 md:gap-10 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div
              className="absolute left-5 w-3 h-3 rounded-full bg-[var(--gold-500)] border-2 border-white shadow-sm top-1 md:left-1/2 md:-translate-x-1/2"
              aria-hidden
            />

            {/* Year bubble */}
            <div className="pl-12 md:pl-0 md:w-1/2 md:flex md:justify-end">
              <div
                className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${
                  i % 2 === 0
                    ? "bg-[var(--navy-800)] text-white md:mr-6"
                    : "bg-[var(--gold-500)] text-[var(--navy-950)] md:ml-6"
                }`}
              >
                {item.year}
              </div>
            </div>

            {/* Content */}
            <div className="pl-12 md:pl-0 md:w-1/2">
              <div className={`card p-5 ${i % 2 !== 0 ? "md:mr-6" : "md:ml-6"}`}>
                <h4 className="font-semibold text-[var(--navy-800)] mb-1">{item.title}</h4>
                <p className="text-sm text-[var(--navy-500)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
