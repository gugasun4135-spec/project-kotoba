# SPRINT-001

# Kotoba Web MVP Development Brief v0.1

Project: Kotoba — Japanese Knowledge OS
Sprint: 001
Status: Ready for Development
Owner: Guga
Date: 2026-07-03
Input Docs:

* RFC-0001 Knowledge Model v1.0
* RFC-0002 Knowledge Catalog v1.0
* Visual Reference: 日语知识体系总览仪表盘.png

---

## 1. Sprint Goal

Build the first runnable Web MVP for **Kotoba**, a Japanese Knowledge OS.

The MVP should prove the core product logic:

```text
Knowledge Catalog
→ Textbook Lesson Mapping
→ Mastery Dashboard
→ Knowledge Detail
→ Weak Knowledge Tracking
→ Upcoming Knowledge Preview
```

This sprint is **not** about building the full AI product.

This sprint is about building a clean, usable, clickable prototype that demonstrates the knowledge graph and mastery tracking experience.

---

## 2. Product Positioning

Kotoba is not a vocabulary app.

Kotoba is not a simple grammar list.

Kotoba is a Japanese learning knowledge system that helps the learner answer:

```text
1. What knowledge points exist?
2. Which ones have I learned?
3. Which ones have I mastered?
4. Which ones are weak?
5. Which knowledge points belong to my current textbook lesson?
6. Which knowledge points are coming next?
```

---

## 3. Current User Context

The user is currently studying:

```text
Textbook: 标准日本语第三版
Book: 初级下
Current Lesson: 第27课
Lesson Title: 子供の時、大きな地震がありました
Current Target: N5 → N4
Future Expansion: N3 / N2 / N1
```

For this MVP, the product should focus on:

```text
标准日本语第三版 初级下 第24课 — 第30课
第27课 as detailed seed lesson
```

---

## 4. Key Product Decisions

### Decision 1: Knowledge Granularity

Use fine-grained knowledge items.

Examples:

```text
〜ながら
小句 + 時
动词基本形 + 時
动词た形 + 時
〜でしょう？
```

Do not only use broad categories like:

```text
时间表达
连接表达
语气表达
```

Broad categories should be Knowledge Groups.
Fine-grained forms should be Knowledge Items.

---

### Decision 2: Source Authority

Use:

```text
标准日本语第三版 as main learning path
JLPT N5–N1 as supplementary tagging system
```

All lesson mappings must be versioned.

---

## 5. Technical Stack

Use the following stack for Web MVP v0.1:

```text
Framework: Next.js
Router: App Router
Language: TypeScript
Styling: Tailwind CSS
UI Components: shadcn/ui if already available
Charts: Recharts or lightweight custom components
Data: Local JSON seed files
Database: Do NOT implement database yet
Auth: Do NOT implement login yet
AI: Do NOT implement real AI API yet
OCR: Do NOT implement OCR yet
Deployment target: Vercel-ready
```

Important:

Use local JSON data first.

Do not connect Supabase yet.

Do not hard-code learning content directly inside React components.

---

## 6. Required App Routes

Please create these routes:

```text
/
/dashboard
/knowledge
/knowledge/[id]
/lessons
/lessons/[id]
/wrong-questions
/settings
```

For MVP:

```text
/ and /dashboard can render the same dashboard.
wrong-questions can be a placeholder page.
settings can be a placeholder page.
```

---

## 7. Required Pages

### 7.1 Dashboard Page

Route:

```text
/dashboard
```

Purpose:

Show the learner’s overall Japanese learning status.

Required modules:

```text
1. Radar Chart by domain
2. Knowledge Tree summary by JLPT level
3. Selected Knowledge Graph preview
4. Lesson Mastery Heatmap
5. Learning Timeline
6. Knowledge Detail Preview Card
7. Weak Knowledge Top 10
8. Upcoming Knowledge
9. Learning Statistics
```

The visual direction should follow the previously provided dashboard image:

```text
Clean white dashboard
Card-based layout
Green / yellow / red / dark gray / blue mastery system
Simple and intuitive
More like the first image version: visual, direct, dashboard-like
Less like a dense document
```

Suggested dashboard layout:

```text
Top bar:
- Kotoba logo / title
- Current level: N5 → N4
- Current textbook: 标准日本语第三版 初级下 第27课

Main grid:
Row 1:
- Radar chart
- Knowledge tree
- Knowledge graph preview

Row 2:
- Lesson mastery heatmap
- Learning timeline
- Knowledge detail preview

Row 3:
- Weak knowledge top 10
- Upcoming knowledge
- Learning statistics
```

---

### 7.2 Knowledge Browser Page

Route:

```text
/knowledge
```

Purpose:

Let the learner browse all knowledge items.

Required functions:

```text
1. Display knowledge items grouped by domain
2. Filter by JLPT level
3. Filter by mastery status
4. Filter by textbook lesson
5. Search by title
6. Click one item to open detail page
```

Required columns/card fields:

```text
Title
Chinese title
Domain
Group
JLPT level
Difficulty
Mastery status
Mapped lesson
```

---

### 7.3 Knowledge Detail Page

Route:

```text
/knowledge/[id]
```

Purpose:

Show one knowledge item in detail.

Example default item:

```text
K-GRA-CON-NAGARA
〜ながら
```

Required sections:

```text
1. Title
2. Chinese meaning
3. Domain and group
4. JLPT level
5. Difficulty
6. Mastery score
7. Grammar form
8. Concept
9. Chinese explanation
10. Example sentence
11. Common mistakes
12. Related knowledge
13. Similar knowledge
14. Confusing knowledge
15. Prerequisite knowledge
16. Textbook mapping
17. Wrong questions placeholder
```

---

### 7.4 Lesson Browser Page

Route:

```text
/lessons
```

Purpose:

Show textbook lesson path.

Required:

```text
Display 标准日本语第三版 初级下 第24课 — 第30课
Highlight current lesson: 第27课
Show mastery color for each lesson
Show number of knowledge items per lesson
Click lesson to open detail page
```

---

### 7.5 Lesson Detail Page

Route:

```text
/lessons/[id]
```

Default detailed lesson:

```text
标准日本语第三版 初级下 第27课
子供の時、大きな地震がありました
```

Required sections:

```text
1. Lesson title
2. Textbook metadata
3. Knowledge items in this lesson
4. Mastery status for each knowledge item
5. Current lesson summary
6. Upcoming lesson preview
```

Important:

The lesson page should show:

```text
Lesson → Knowledge Items
```

But the data model should still treat Knowledge as source of truth.

---

### 7.6 Wrong Questions Page

Route:

```text
/wrong-questions
```

For MVP:

Create a placeholder page with mock data.

Required mock flow:

```text
Wrong Question
→ AI Analysis Placeholder
→ Related Knowledge
→ Mastery Update Placeholder
```

Do not call real AI API in this sprint.

---

## 8. Data Folder Structure

Create this structure:

```text
/data
├── knowledge.json
├── knowledge-groups.json
├── lessons.json
├── lesson-mappings.json
├── relationships.json
├── mastery.json
├── wrong-questions.json
└── stats.json
```

All visible learning content must come from these JSON files.

Do not put knowledge content directly inside components.

---

## 9. Seed Data Requirements

### 9.1 knowledge.json

Include at least these seed items:

```json
[
  {
    "id": "K-GRA-TIME-TOKI",
    "title": "小句 + 時",
    "title_cn": "……的时候",
    "domain": "Grammar",
    "group": "Time Expression",
    "jlpt_level": "N4",
    "difficulty": 3,
    "status": "active",
    "description_cn": "表示某动作、状态或事件发生的时间背景。",
    "form": "小句简体形 + 時",
    "concept": "时间背景",
    "usage_notes": [
      "前接小句简体形。",
      "用于说明动作或状态发生的时间。"
    ],
    "common_mistakes": [
      "混淆名词 + の + 時 和小句 + 時。",
      "忽略前接形式。"
    ],
    "example_jp": "子供の時、大きな地震がありました。",
    "example_cn": "小时候，发生过大地震。",
    "source_status": "verified_by_user"
  },
  {
    "id": "K-GRA-TIME-V-DICT-TOKI",
    "title": "动词基本形 + 時",
    "title_cn": "做某事之前/将要做某事时",
    "domain": "Grammar",
    "group": "Time Expression",
    "jlpt_level": "N4",
    "difficulty": 3,
    "status": "active",
    "description_cn": "表示在某动作发生之前或即将发生时的时间背景。",
    "form": "动词基本形 + 時",
    "concept": "动作前的时间关系",
    "usage_notes": [
      "强调动作尚未完成或即将发生。",
      "需要和动词た形 + 時区分。"
    ],
    "common_mistakes": [
      "和动词た形 + 時混淆。"
    ],
    "example_jp": "映画を見る時、いちばん後ろの席に座ります。",
    "example_cn": "看电影时，我坐在最后面的座位。",
    "source_status": "verified_by_user"
  },
  {
    "id": "K-GRA-TIME-V-TA-TOKI",
    "title": "动词た形 + 時",
    "title_cn": "做了某事之后/做某事时",
    "domain": "Grammar",
    "group": "Time Expression",
    "jlpt_level": "N4",
    "difficulty": 3,
    "status": "active",
    "description_cn": "表示某动作完成之后的时间背景，或以完成状态为前提的时间表达。",
    "form": "动词た形 + 時",
    "concept": "动作后的时间关系",
    "usage_notes": [
      "强调动作已经完成。",
      "需要和动词基本形 + 時区分。"
    ],
    "common_mistakes": [
      "和动词基本形 + 時混淆。"
    ],
    "example_jp": "家へ帰った時、母に電話しました。",
    "example_cn": "回到家时，给妈妈打了电话。",
    "source_status": "verified_by_user"
  },
  {
    "id": "K-GRA-CON-NAGARA",
    "title": "〜ながら",
    "title_cn": "一边……一边……",
    "domain": "Grammar",
    "group": "Connection",
    "jlpt_level": "N4",
    "difficulty": 3,
    "status": "active",
    "description_cn": "表示同一主体同时进行两个动作，通常后项是主要动作。",
    "form": "动词ます形去ます + ながら",
    "concept": "同时进行",
    "usage_notes": [
      "前后动作通常为同一主体。",
      "后项动作通常是主要动作。",
      "前项动作常作为伴随动作。"
    ],
    "common_mistakes": [
      "前后主语不一致。",
      "把瞬间动作误用于ながら。",
      "与〜間に混淆。"
    ],
    "example_jp": "音楽を聞きながら、勉強します。",
    "example_cn": "一边听音乐，一边学习。",
    "source_status": "verified_by_user"
  },
  {
    "id": "K-GRA-MOD-DESHOU-CONFIRM",
    "title": "〜でしょう？",
    "title_cn": "……吧？",
    "domain": "Grammar",
    "group": "Mood / Modality",
    "jlpt_level": "N4",
    "difficulty": 2,
    "status": "active",
    "description_cn": "表示确认、征求对方同意或确认自己的判断。",
    "form": "简体句 + でしょう？",
    "concept": "确认语气",
    "usage_notes": [
      "常用于说话人认为对方也知道或同意的情况。",
      "句尾语调常上扬。"
    ],
    "common_mistakes": [
      "和推量用法的でしょう混淆。",
      "语气过强或使用场景不自然。"
    ],
    "example_jp": "李さん、明日パーティーに行くでしょう？",
    "example_cn": "小李，你明天去参加派对吧？",
    "source_status": "verified_by_user"
  },
  {
    "id": "K-GRA-VERB-MASU-STEM",
    "title": "动词ます形去ます",
    "title_cn": "动词ます形词干",
    "domain": "Grammar",
    "group": "Verb Conjugation",
    "jlpt_level": "N5",
    "difficulty": 1,
    "status": "active",
    "description_cn": "动词ます形去掉ます后的形式，是许多语法结构的前置基础。",
    "form": "动词ます形 - ます",
    "concept": "动词连接基础",
    "usage_notes": [
      "用于连接ながら、たい、方等表达。"
    ],
    "common_mistakes": [
      "没有正确识别ます形。",
      "词干提取错误。"
    ],
    "example_jp": "聞きます → 聞き",
    "example_cn": "聞きます 去掉 ます 后为 聞き。",
    "source_status": "seed"
  }
]
```

---

### 9.2 knowledge-groups.json

```json
[
  {
    "id": "KG-GRA-TIME",
    "name": "Time Expression",
    "name_cn": "时间表达",
    "domain": "Grammar"
  },
  {
    "id": "KG-GRA-CONNECTION",
    "name": "Connection",
    "name_cn": "连接表达",
    "domain": "Grammar"
  },
  {
    "id": "KG-GRA-MODALITY",
    "name": "Mood / Modality",
    "name_cn": "语气 / 情态",
    "domain": "Grammar"
  },
  {
    "id": "KG-GRA-VERB-CONJUGATION",
    "name": "Verb Conjugation",
    "name_cn": "动词变形",
    "domain": "Grammar"
  },
  {
    "id": "KG-GRA-PARTICLE",
    "name": "Particle",
    "name_cn": "助词",
    "domain": "Grammar"
  },
  {
    "id": "KG-GRA-CONDITION",
    "name": "Condition",
    "name_cn": "条件表达",
    "domain": "Grammar"
  }
]
```

---

### 9.3 lessons.json

```json
[
  {
    "id": "L-SJ3-SHIMO-24",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 24,
    "lesson_title": "Placeholder",
    "status": "completed"
  },
  {
    "id": "L-SJ3-SHIMO-25",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 25,
    "lesson_title": "Placeholder",
    "status": "completed"
  },
  {
    "id": "L-SJ3-SHIMO-26",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 26,
    "lesson_title": "Placeholder",
    "status": "completed"
  },
  {
    "id": "L-SJ3-SHIMO-27",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 27,
    "lesson_title": "子供の時、大きな地震がありました",
    "status": "current"
  },
  {
    "id": "L-SJ3-SHIMO-28",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 28,
    "lesson_title": "Placeholder",
    "status": "upcoming"
  },
  {
    "id": "L-SJ3-SHIMO-29",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 29,
    "lesson_title": "Placeholder",
    "status": "upcoming"
  },
  {
    "id": "L-SJ3-SHIMO-30",
    "textbook_name": "标准日本语",
    "edition": "第三版",
    "book_level": "初级下",
    "lesson_number": 30,
    "lesson_title": "Placeholder",
    "status": "upcoming"
  }
]
```

---

### 9.4 lesson-mappings.json

```json
[
  {
    "id": "MAP-SJ3-SHIMO-27-001",
    "lesson_id": "L-SJ3-SHIMO-27",
    "knowledge_id": "K-GRA-TIME-TOKI",
    "section": "grammar",
    "source_status": "verified_by_user"
  },
  {
    "id": "MAP-SJ3-SHIMO-27-002",
    "lesson_id": "L-SJ3-SHIMO-27",
    "knowledge_id": "K-GRA-TIME-V-DICT-TOKI",
    "section": "grammar",
    "source_status": "verified_by_user"
  },
  {
    "id": "MAP-SJ3-SHIMO-27-003",
    "lesson_id": "L-SJ3-SHIMO-27",
    "knowledge_id": "K-GRA-TIME-V-TA-TOKI",
    "section": "grammar",
    "source_status": "verified_by_user"
  },
  {
    "id": "MAP-SJ3-SHIMO-27-004",
    "lesson_id": "L-SJ3-SHIMO-27",
    "knowledge_id": "K-GRA-CON-NAGARA",
    "section": "grammar",
    "source_status": "verified_by_user"
  },
  {
    "id": "MAP-SJ3-SHIMO-27-005",
    "lesson_id": "L-SJ3-SHIMO-27",
    "knowledge_id": "K-GRA-MOD-DESHOU-CONFIRM",
    "section": "grammar",
    "source_status": "verified_by_user"
  }
]
```

---

### 9.5 relationships.json

```json
[
  {
    "id": "REL-001",
    "from_knowledge_id": "K-GRA-CON-NAGARA",
    "to_knowledge_id": "K-GRA-VERB-MASU-STEM",
    "relationship_type": "prerequisite",
    "description": "〜ながら requires understanding of the verb ます-stem."
  },
  {
    "id": "REL-002",
    "from_knowledge_id": "K-GRA-TIME-V-DICT-TOKI",
    "to_knowledge_id": "K-GRA-TIME-V-TA-TOKI",
    "relationship_type": "confusing",
    "description": "Learners often confuse dictionary-form + 時 and past-form + 時."
  },
  {
    "id": "REL-003",
    "from_knowledge_id": "K-GRA-TIME-V-TA-TOKI",
    "to_knowledge_id": "K-GRA-TIME-V-DICT-TOKI",
    "relationship_type": "confusing",
    "description": "Learners often confuse past-form + 時 and dictionary-form + 時."
  },
  {
    "id": "REL-004",
    "from_knowledge_id": "K-GRA-CON-NAGARA",
    "to_knowledge_id": "K-GRA-TIME-TOKI",
    "relationship_type": "related",
    "description": "Both can describe actions in relation to time."
  }
]
```

---

### 9.6 mastery.json

```json
[
  {
    "knowledge_id": "K-GRA-TIME-TOKI",
    "mastery_score": 78,
    "status": "good",
    "review_count": 6,
    "wrong_count": 2,
    "correct_count": 8
  },
  {
    "knowledge_id": "K-GRA-TIME-V-DICT-TOKI",
    "mastery_score": 62,
    "status": "medium",
    "review_count": 4,
    "wrong_count": 3,
    "correct_count": 5
  },
  {
    "knowledge_id": "K-GRA-TIME-V-TA-TOKI",
    "mastery_score": 48,
    "status": "weak",
    "review_count": 3,
    "wrong_count": 4,
    "correct_count": 3
  },
  {
    "knowledge_id": "K-GRA-CON-NAGARA",
    "mastery_score": 86,
    "status": "mastered",
    "review_count": 8,
    "wrong_count": 1,
    "correct_count": 12
  },
  {
    "knowledge_id": "K-GRA-MOD-DESHOU-CONFIRM",
    "mastery_score": 55,
    "status": "medium",
    "review_count": 2,
    "wrong_count": 2,
    "correct_count": 3
  },
  {
    "knowledge_id": "K-GRA-VERB-MASU-STEM",
    "mastery_score": 90,
    "status": "mastered",
    "review_count": 10,
    "wrong_count": 1,
    "correct_count": 15
  }
]
```

---

### 9.7 wrong-questions.json

```json
[
  {
    "id": "WQ-001",
    "question": "音楽を聞くながら、勉強します。",
    "correct_answer": "音楽を聞きながら、勉強します。",
    "user_answer": "音楽を聞くながら、勉強します。",
    "analysis": "The user used dictionary form before ながら. The correct form is the verb ます-stem + ながら.",
    "related_knowledge_ids": [
      "K-GRA-CON-NAGARA",
      "K-GRA-VERB-MASU-STEM"
    ],
    "status": "mock"
  }
]
```

---

## 10. Mastery Color Rules

Use the following mapping consistently:

```text
85–100 = mastered = green
70–84 = good = light green
50–69 = medium = yellow
1–49 = weak = red
0 = not_started = dark gray
future = upcoming = blue
```

Labels:

```text
mastered = 已掌握
good = 较好
medium = 一般
weak = 薄弱
not_started = 未学习
upcoming = 即将学习
```

---

## 11. Required Components

Create reusable components.

Suggested structure:

```text
/components
├── AppShell.tsx
├── Sidebar.tsx
├── TopNav.tsx
├── StatCard.tsx
├── MasteryBadge.tsx
├── KnowledgeCard.tsx
├── KnowledgeDetailCard.tsx
├── KnowledgeGraph.tsx
├── KnowledgeTree.tsx
├── LessonTimeline.tsx
├── LessonHeatmap.tsx
├── RadarOverview.tsx
├── WeakKnowledgeList.tsx
├── UpcomingKnowledgeList.tsx
└── SearchFilterBar.tsx
```

---

## 12. Suggested Project Structure

```text
/app
├── page.tsx
├── dashboard
│   └── page.tsx
├── knowledge
│   ├── page.tsx
│   └── [id]
│       └── page.tsx
├── lessons
│   ├── page.tsx
│   └── [id]
│       └── page.tsx
├── wrong-questions
│   └── page.tsx
└── settings
    └── page.tsx

/components
/lib
├── data.ts
├── mastery.ts
└── utils.ts

/data
├── knowledge.json
├── knowledge-groups.json
├── lessons.json
├── lesson-mappings.json
├── relationships.json
├── mastery.json
├── wrong-questions.json
└── stats.json
```

---

## 13. UI Direction

The MVP should feel like:

```text
A learning dashboard
A personal knowledge map
A clean productivity tool
```

Avoid:

```text
Game-like UI
Children’s app style
Overly dense academic document style
Too many colors
Too much animation
```

Visual style:

```text
White background
Soft cards
Rounded corners
Clean hierarchy
Green as main positive color
Red/yellow for learning risk
Dark gray for not learned
Blue for upcoming
```

Reference layout:

```text
9-card dashboard:
1. Radar chart
2. Knowledge tree
3. Knowledge graph
4. Heatmap
5. Timeline
6. Detail card
7. Weak top 10
8. Upcoming knowledge
9. Stats
```

---

## 14. Functional Requirements

### Must Have

```text
1. App runs locally
2. Dashboard renders from local JSON data
3. Knowledge Browser lists knowledge items
4. Knowledge Detail page works
5. Lesson Browser lists lessons
6. Lesson 27 Detail page shows mapped knowledge
7. Mastery status colors work
8. Relationships display for selected knowledge
9. Weak Knowledge Top 10 calculated from mastery data
10. Upcoming Knowledge list displayed from lesson status
```

### Nice to Have

```text
1. Search by keyword
2. Filter by JLPT level
3. Filter by mastery status
4. Filter by domain/group
5. Simple graph visualization
```

### Do Not Build Yet

```text
1. Real user login
2. Database
3. Supabase
4. Real AI API
5. OCR
6. File upload
7. Payment
8. Mobile app
9. Spaced repetition algorithm
10. Full N5–N1 catalog
```

---

## 15. Acceptance Criteria

The sprint is accepted when:

```text
1. The app can be started locally.
2. Dashboard is visible and visually close to the provided reference direction.
3. User can click from Dashboard to Knowledge Detail.
4. User can browse Knowledge items.
5. User can browse Lessons.
6. Lesson 27 shows the correct mapped knowledge items.
7. 〜ながら detail page shows explanation, example, mastery, prerequisite, and related items.
8. Mastery colors are consistent across pages.
9. All learning content is stored in /data JSON files.
10. No real AI/OCR/database/auth implementation is included.
```

---

## 16. Development Order

Please implement in this order:

```text
Step 1: Initialize Next.js + TypeScript + Tailwind project
Step 2: Create /data JSON files
Step 3: Create data loading helpers in /lib/data.ts
Step 4: Build AppShell, Sidebar, TopNav
Step 5: Build Dashboard page
Step 6: Build Knowledge Browser
Step 7: Build Knowledge Detail page
Step 8: Build Lesson Browser
Step 9: Build Lesson Detail page
Step 10: Build Wrong Questions placeholder
Step 11: Polish UI and responsive layout
Step 12: Run type check and fix errors
```

---

## 17. Codex Execution Prompt

Use this prompt when starting the task:

```text
You are building Kotoba Web MVP v0.1.

Read RFC-0001 Knowledge Model and RFC-0002 Knowledge Catalog first.

Build a Next.js + TypeScript + Tailwind web app using local JSON seed data.

Do not implement database, login, OCR, or real AI API yet.

Create a clean dashboard-style learning app with these pages:

- /dashboard
- /knowledge
- /knowledge/[id]
- /lessons
- /lessons/[id]
- /wrong-questions
- /settings

Use the provided seed data structure:

/data/knowledge.json
/data/knowledge-groups.json
/data/lessons.json
/data/lesson-mappings.json
/data/relationships.json
/data/mastery.json
/data/wrong-questions.json
/data/stats.json

The first detailed lesson is:
标准日本语第三版 初级下 第27课
子供の時、大きな地震がありました

The first detailed knowledge item is:
K-GRA-CON-NAGARA
〜ながら

The dashboard should visually follow the reference:
a clean 9-card Japanese knowledge system dashboard with radar chart, knowledge tree, knowledge graph, lesson heatmap, timeline, detail card, weak knowledge list, upcoming knowledge list, and statistics.

Keep content editable through JSON files.
Do not hard-code Japanese knowledge content in UI components.

After implementation, provide:
1. Summary of files created
2. How to run locally
3. Known limitations
4. Suggested next development sprint
```

---

## 18. Known Limitations

This MVP intentionally uses seed data and mock mastery.

It does not yet validate the full Standard Japanese Third Edition catalog.

It does not yet perform real AI wrong-question diagnosis.

It does not yet store personal learning records.

It is a visual and structural MVP.

---

## 19. Next Sprint Preview

After SPRINT-001, the recommended next sprint is:

```text
SPRINT-002: Wrong Question Analysis Prototype
```

Scope:

```text
1. Manual wrong question input
2. Mock AI analysis flow
3. Link wrong question to knowledge items
4. Update mastery score locally
5. Show wrong question history
```

Only after that should the project move toward:

```text
Supabase
User login
Real AI API
OCR
Spaced repetition
```

---

## 20. Final Instruction to Codex

Build a working, clean, clickable MVP.

Prefer simplicity over completeness.

Do not over-engineer.

The goal is to make the knowledge system visible and testable.
