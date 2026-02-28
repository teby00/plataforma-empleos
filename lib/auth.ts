import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import { localization } from "better-auth-localization";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      description: { type: "string", required: false },
      role: { type: "string" },
    },
  },
  plugins: [
    localization({
      defaultLocale: "es-ES",
    }),
  ],
});
