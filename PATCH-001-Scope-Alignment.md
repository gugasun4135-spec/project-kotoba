PATCH-001
Scope Alignment for SPRINT-001

Project: Kotoba — Japanese Knowledge OS
Patch: PATCH-001
Status: Accepted
Date: 2026-07-03
Applies to:

RFC-0001 Knowledge Model v1.0
RFC-0002 Knowledge Catalog v1.0
SPRINT-001 Web MVP Development Brief v0.1
1. Purpose

This patch resolves a scope ambiguity between RFC-0001 and SPRINT-001.

RFC-0001 lists AI Analysis as part of the MVP scope.

SPRINT-001 correctly states that the first Web MVP should not implement real AI/OCR/database/auth.

This patch clarifies the intended meaning:

In SPRINT-001, AI Analysis means AI Analysis Placeholder only.

2. Final Scope Decision

For SPRINT-001, Codex should build a clickable Web MVP with a mock wrong-question analysis flow.

SPRINT-001 should include:

Wrong Question
→ Mock AI Analysis
→ Related Knowledge Items
→ Mock Mastery Change

SPRINT-001 should not include:

Real AI API
OCR
Image upload
Supabase
PostgreSQL
User login
Real spaced repetition algorithm
Persistent personal learning records
3. Updated Definition of “AI Analysis” in MVP

Whenever RFC-0001 or SPRINT-001 mentions AI Analysis in the context of MVP v0.1, interpret it as:

AI Analysis Placeholder

Meaning:

1. Show a mock wrong question.
2. Show a mock analysis result.
3. Show related Knowledge IDs.
4. Show which knowledge points would be affected.
5. Show a simulated mastery score change.
6. Do not call any external AI model.

Example:

Wrong question:
音楽を聞くながら、勉強します。

Mock analysis:
The user used dictionary form before ながら.
The correct form is ます-stem + ながら.

Related knowledge:
- K-GRA-CON-NAGARA
- K-GRA-VERB-MASU-STEM

Mock mastery change:
K-GRA-CON-NAGARA: 86 → 82
K-GRA-VERB-MASU-STEM: 90 → 88
4. Updated MVP Scope

The final SPRINT-001 MVP scope is:

1. Dashboard
2. Knowledge Browser
3. Knowledge Detail Page
4. Lesson Browser
5. Lesson Detail Page
6. Wrong Question Placeholder
7. Local JSON Seed Data
8. Mastery Color System
9. Knowledge Relationships Display

The MVP should demonstrate the experience of:

Knowledge Catalog
→ Lesson Mapping
→ Mastery Dashboard
→ Knowledge Relationship
→ Wrong Question Placeholder
5. Implementation Priority

Codex should prioritize implementation in this order:

1. Local JSON data structure
2. Dashboard layout
3. Knowledge Browser
4. Knowledge Detail Page
5. Lesson Browser
6. Lesson Detail Page
7. Wrong Question Placeholder
8. UI polish

Do not spend time on real AI infrastructure in this sprint.

6. File-Level Guidance

Recommended local data structure remains:

/data
├── knowledge.json
├── knowledge-groups.json
├── lessons.json
├── lesson-mappings.json
├── relationships.json
├── mastery.json
├── wrong-questions.json
└── stats.json

The wrong-questions.json file should include mock analysis data.

Suggested structure:

[
  {
    "id": "WQ-001",
    "question": "音楽を聞くながら、勉強します。",
    "correct_answer": "音楽を聞きながら、勉強します。",
    "user_answer": "音楽を聞くながら、勉強します。",
    "mock_analysis": {
      "summary": "The user used dictionary form before ながら. The correct form is ます-stem + ながら.",
      "error_type": "verb_form_error",
      "related_knowledge_ids": [
        "K-GRA-CON-NAGARA",
        "K-GRA-VERB-MASU-STEM"
      ],
      "mastery_effect": [
        {
          "knowledge_id": "K-GRA-CON-NAGARA",
          "before": 86,
          "after": 82
        },
        {
          "knowledge_id": "K-GRA-VERB-MASU-STEM",
          "before": 90,
          "after": 88
        }
      ]
    },
    "status": "mock"
  }
]
7. UI Requirement for Wrong Question Placeholder

The Wrong Question page should show a simple mock flow:

Card 1: Wrong Question
Card 2: Mock AI Analysis
Card 3: Related Knowledge
Card 4: Mock Mastery Change

This page should clearly label the result as:

AI Analysis Placeholder

or in Chinese:

AI 分析占位演示

This prevents the user from assuming real AI diagnosis is already implemented.

8. Updated Acceptance Criteria

SPRINT-001 is accepted only if:

1. The app runs locally.
2. Dashboard renders from local JSON data.
3. Knowledge Browser works.
4. Knowledge Detail Page works.
5. Lesson Browser works.
6. Lesson 27 Detail Page shows mapped knowledge items.
7. Wrong Question page shows a mock AI analysis flow.
8. The mock AI analysis does not call any real AI API.
9. No OCR, database, login, or Supabase implementation exists.
10. All visible learning content is editable through JSON files.
9. Priority Rule

If there is any conflict between RFC-0001, RFC-0002, SPRINT-001, and this patch, follow this priority:

PATCH-001
> SPRINT-001
> RFC-0002
> RFC-0001
10. Instruction to Codex

Codex should proceed with SPRINT-001 under the clarified scope:

Build a local JSON-driven clickable Web MVP.

Include a Wrong Question Placeholder that simulates AI analysis.

Do not implement real AI, OCR, database, Supabase, login, or persistent user records.

Focus on making the knowledge system visible, navigable, and testable.
11. Recommended Next Document

After this patch, the next useful document is:

SPRINT-001 v0.2 — Consolidated Development Brief

This document can merge SPRINT-001 and PATCH-001 into one clean development brief.

However, SPRINT-001 v0.2 is not required before development starts.