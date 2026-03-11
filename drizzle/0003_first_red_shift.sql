ALTER TABLE "employements"
ALTER COLUMN "salary" TYPE numeric
USING salary::numeric;