import react from "@vitejs/plugin-react-swc";
import { build } from "vite";

build({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
