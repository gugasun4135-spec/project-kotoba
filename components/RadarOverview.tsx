import { getDomainScores } from "@/lib/data";

const labels: Record<string, string> = {
  Grammar: "语法",
  Vocabulary: "词汇",
  Kanji: "汉字",
  Expression: "表达",
  Reading: "阅读",
  Listening: "听力"
};

export function RadarOverview() {
  const data = getDomainScores();
  const size = 260;
  const center = size / 2;
  const radius = 92;
  const points = data.map((item, index) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const r = (item.average / 100) * radius;
    return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
  });

  return (
    <div className="card p-5">
      <h2 className="card-title">1. 各领域掌握度雷达图</h2>
      <div className="mt-4 flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-[260px] w-full max-w-[320px]">
          {[0.25, 0.5, 0.75, 1].map((step) => (
            <polygon
              key={step}
              points={data
                .map((_, index) => {
                  const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
                  return `${center + Math.cos(angle) * radius * step},${center + Math.sin(angle) * radius * step}`;
                })
                .join(" ")}
              fill="none"
              stroke="#dbe7de"
              strokeWidth="1"
            />
          ))}
          {data.map((item, index) => {
            const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
            const x = center + Math.cos(angle) * (radius + 34);
            const y = center + Math.sin(angle) * (radius + 34);
            return (
              <g key={item.domain}>
                <line x1={center} y1={center} x2={center + Math.cos(angle) * radius} y2={center + Math.sin(angle) * radius} stroke="#dbe7de" />
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-slate-700 text-[12px] font-bold">
                  {labels[item.domain] ?? item.domain}
                </text>
                <text x={x} y={y + 15} textAnchor="middle" dominantBaseline="middle" className="fill-matcha text-[11px] font-bold">
                  {item.average}%
                </text>
              </g>
            );
          })}
          <polygon points={points.join(" ")} fill="rgba(47,157,99,0.16)" stroke="#2f9d63" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}
