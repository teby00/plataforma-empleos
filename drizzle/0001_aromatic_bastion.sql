CREATE TYPE "public"."application_state" AS ENUM('pending', 'published', 'rejected');--> statement-breakpoint
ALTER TABLE "aplications" RENAME TO "applications";--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT "aplications_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT "aplications_employement_id_employements_id_fk";
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_employement_id_employements_id_fk" FOREIGN KEY ("employement_id") REFERENCES "public"."employements"("id") ON DELETE cascade ON UPDATE no action;