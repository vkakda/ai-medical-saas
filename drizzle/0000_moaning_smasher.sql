CREATE TABLE "sessionsChart" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sessionsChart_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sessionId" varchar NOT NULL,
	"notes" text,
	"SelectedDoctor" json,
	"report" json,
	"createdBy" varchar,
	"createdAt" varchar,
	CONSTRAINT "sessionsChart_sessionId_unique" UNIQUE("sessionId")
);
--> statement-breakpoint
CREATE TABLE "usersTable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "usersTable_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"credits" integer,
	CONSTRAINT "usersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "sessionsChart" ADD CONSTRAINT "sessionsChart_createdBy_usersTable_email_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."usersTable"("email") ON DELETE no action ON UPDATE no action;