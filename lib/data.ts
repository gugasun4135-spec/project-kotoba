import knowledge from "@/data/knowledge.json";
import knowledgeGroups from "@/data/knowledge-groups.json";
import lessonMappings from "@/data/lesson-mappings.json";
import lessons from "@/data/lessons.json";
import mastery from "@/data/mastery.json";
import relationships from "@/data/relationships.json";
import stats from "@/data/stats.json";
import wrongQuestions from "@/data/wrong-questions.json";
import type { Knowledge, KnowledgeGroup, Lesson, LessonMapping, Mastery, Relationship, Stats, WrongQuestion } from "./types";

export const allKnowledge = knowledge as Knowledge[];
export const allKnowledgeGroups = knowledgeGroups as KnowledgeGroup[];
export const allLessons = lessons as Lesson[];
export const allLessonMappings = lessonMappings as LessonMapping[];
export const allRelationships = relationships as Relationship[];
export const allMastery = mastery as Mastery[];
export const allWrongQuestions = wrongQuestions as WrongQuestion[];
export const appStats = stats as Stats;

export function getKnowledgeById(id: string) {
  return allKnowledge.find((item) => item.id === id);
}

export function getLessonById(id: string) {
  return allLessons.find((lesson) => lesson.id === id);
}

export function getMasteryByKnowledgeId(id: string) {
  return allMastery.find((item) => item.knowledge_id === id);
}

export function getKnowledgeForLesson(lessonId: string) {
  const ids = allLessonMappings.filter((mapping) => mapping.lesson_id === lessonId).map((mapping) => mapping.knowledge_id);
  return allKnowledge.filter((item) => ids.includes(item.id));
}

export function getLessonsForKnowledge(knowledgeId: string) {
  const lessonIds = allLessonMappings.filter((mapping) => mapping.knowledge_id === knowledgeId).map((mapping) => mapping.lesson_id);
  return allLessons.filter((lesson) => lessonIds.includes(lesson.id));
}

export function getRelationshipsForKnowledge(knowledgeId: string) {
  return allRelationships
    .filter((relationship) => relationship.from_knowledge_id === knowledgeId || relationship.to_knowledge_id === knowledgeId)
    .map((relationship) => ({
      ...relationship,
      from: getKnowledgeById(relationship.from_knowledge_id),
      to: getKnowledgeById(relationship.to_knowledge_id)
    }));
}

export function getWeakKnowledge(limit = 10) {
  return allMastery
    .filter((item) => item.status !== "upcoming")
    .sort((a, b) => a.mastery_score - b.mastery_score)
    .slice(0, limit)
    .map((item) => ({ mastery: item, knowledge: getKnowledgeById(item.knowledge_id) }))
    .filter((item) => item.knowledge);
}

export function getUpcomingKnowledge(limit = 6) {
  const upcomingLessonIds = allLessons.filter((lesson) => lesson.status === "upcoming").map((lesson) => lesson.id);
  return allLessonMappings
    .filter((mapping) => upcomingLessonIds.includes(mapping.lesson_id))
    .slice(0, limit)
    .map((mapping) => ({
      mapping,
      knowledge: getKnowledgeById(mapping.knowledge_id),
      lesson: getLessonById(mapping.lesson_id)
    }))
    .filter((item) => item.knowledge && item.lesson);
}

export function getDomainScores() {
  const domains = Array.from(new Set(allKnowledge.map((item) => item.domain)));
  return domains.map((domain) => {
    const items = allKnowledge.filter((item) => item.domain === domain);
    const scores = items.map((item) => getMasteryByKnowledgeId(item.id)?.mastery_score ?? 0);
    const average = scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
    return { domain, average };
  });
}

export function getJlptSummary() {
  const levels = ["N5", "N4", "N3", "N2", "N1"];
  return levels.map((level) => {
    const items = allKnowledge.filter((item) => item.jlpt_level === level);
    const total = items.length || (level === "N4" ? 190 : level === "N5" ? 120 : level === "N3" ? 240 : level === "N2" ? 200 : 150);
    const realScores = items.map((item) => getMasteryByKnowledgeId(item.id)?.mastery_score ?? 0);
    const learned = realScores.filter((score) => score >= 85).length;
    const good = realScores.filter((score) => score >= 70 && score < 85).length;
    const medium = realScores.filter((score) => score >= 50 && score < 70).length;
    const weak = realScores.filter((score) => score > 0 && score < 50).length;
    const knownSeed = learned + good + medium + weak;
    const notStarted = Math.max(items.length - knownSeed, 0);
    return { level, total, learned, good, medium, weak, notStarted, seedCount: items.length };
  });
}
