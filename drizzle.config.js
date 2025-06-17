import { defineConfig } from "drizzle-kit"
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: "postgresql://AIInterviewprep_owner:npg_SV9GTpfw7jtv@ep-calm-breeze-a8101b5z-pooler.eastus2.azure.neon.tech/AIInterviewprep?sslmode=require",
  },
})
