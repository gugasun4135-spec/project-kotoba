export type MasteryStatus = "mastered" | "good" | "medium" | "weak" | "not_started" | "upcoming";

export type Knowledge = {
  id: string;
  title: string;
  title_cn: string;
  domain: string;
  group: string;
  jlpt_level: string;
  difficulty: number;
  status: string;
  description_cn: string;
  description_jp: string;
  form: string;
  concept: string;
  usage_notes: string[];
  common_mistakes: string[];
  example_jp: string;
  example_cn: string;
  source_status: string;
};

export type KnowledgeGroup = {
  id: string;
  name: string;
  name_cn: string;
  domain: string;
};

export type Lesson = {
  id: string;
  textbook_name: string;
  edition: string;
  book_level: string;
  lesson_number: number;
  lesson_title: string;
  status: "completed" | "current" | "upcoming";
};

export type LessonMapping = {
  id: string;
  lesson_id: string;
  knowledge_id: string;
  section: string;
  source_status: string;
};

export type Relationship = {
  id: string;
  from_knowledge_id: string;
  to_knowledge_id: string;
  relationship_type: "prerequisite" | "related" | "similar" | "contrast" | "confusing" | "next_learning";
  description: string;
};

export type Mastery = {
  knowledge_id: string;
  mastery_score: number;
  status: MasteryStatus;
  last_review: string;
  next_review: string;
  review_count: number;
  wrong_count: number;
  correct_count: number;
};

export type WrongQuestion = {
  id: string;
  question: string;
  correct_answer: string;
  user_answer: string;
  mock_analysis: {
    summary: string;
    error_type: string;
    related_knowledge_ids: string[];
    mastery_effect: Array<{
      knowledge_id: string;
      before: number;
      after: number;
    }>;
  };
  status: string;
};

export type Stats = {
  known_knowledge_count: number;
  mastered_knowledge_count: number;
  weak_knowledge_count: number;
  today_review_count: number;
  learning_streak_days: number;
  total_learning_hours: number;
  current_level: string;
  current_lesson_id: string;
  current_textbook: string;
  updated_at: string;
};
