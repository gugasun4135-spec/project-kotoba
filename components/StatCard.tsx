export function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`mt-2 text-3xl font-black ${accent ?? "text-sumi"}`}>{value}</div>
    </div>
  );
}
