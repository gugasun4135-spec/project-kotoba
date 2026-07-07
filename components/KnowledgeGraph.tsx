import Link from "next/link";
import { getKnowledgeById, getRelationshipsForKnowledge } from "@/lib/data";

export function KnowledgeGraph({ knowledgeId = "K-GRA-CON-NAGARA" }: { knowledgeId?: string }) {
  const knowledge = getKnowledgeById(knowledgeId);
  const relationships = getRelationshipsForKnowledge(knowledgeId);

  return (
    <div className="card p-5">
      <h2 className="card-title">3. 知识关系图</h2>
      <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center gap-4">
        <Link href={`/knowledge/${knowledgeId}`} className="rounded-lg border border-matcha/30 bg-matcha-soft px-5 py-3 text-center font-black text-matcha">
          {knowledge?.title}
          <div className="text-xs font-medium text-slate-500">{knowledge?.title_cn}</div>
        </Link>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {relationships.slice(0, 4).map((relationship) => {
            const other = relationship.from_knowledge_id === knowledgeId ? relationship.to : relationship.from;
            return (
              <Link key={relationship.id} href={`/knowledge/${other?.id}`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:border-matcha/40">
                <span className="font-bold text-slate-500">{relationship.relationship_type}</span>
                <div className="font-black text-sumi">{other?.title}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
