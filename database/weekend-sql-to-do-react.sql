DROP TABLE IF EXISTS task_list;

CREATE TABLE "task_list" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(80) NOT NULL,
	"description" text,
	"priority" varchar(10) NOT NULL
  CHECK ("priority" ILIKE 'low' OR "priority" ILIKE 'medium' OR "priority" ILIKE 'high'),
  "complete" boolean NOT NULL
);

INSERT INTO "task_list" ("title", "description", "priority", "complete")
VALUES ('Urgent Task', 'I am a high priority task', 'high', 'false'),
('Routine Task', 'I am a medium priority task', 'medium', 'false'),
('Trivial Task', 'I am a low priority task', 'low', 'false');