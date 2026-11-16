import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const formspreeEndpointPattern = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/i;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const endpoint = env.VITE_FORMSPREE_ENDPOINT?.trim();

  if (endpoint && !formspreeEndpointPattern.test(endpoint)) {
    throw new Error("VITE_FORMSPREE_ENDPOINT must be a public Formspree URL such as https://formspree.io/f/your-form-id.");
  }

  return {
    plugins: [react(), tailwindcss()],
    base: "/",
  };
});
