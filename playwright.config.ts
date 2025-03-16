import { defineConfig } from "@playwright/test";

export default defineConfig({
  expect: {
    timeout: 10000,
  },
  testDir: "./tests",
  fullyParallel: true,
  workers: 5,
  retries: 1,
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
