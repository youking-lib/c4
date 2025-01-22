import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: false,
  silent: true,
  sourcemap: true,
  target: "es2022",
  clean: !options.watch,
  ...options,
}));
