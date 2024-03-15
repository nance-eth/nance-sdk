import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "lib/esm",
      format: "es",
      sourcemap: false,
    },
    plugins: [
      typescript({ tsconfig: "tsconfig.json" }),
      commonjs(),
      nodeResolve(),
      copy({
        targets: [{ src: "src/css/*.css", dest: "lib/css" }],
      }),
    ],
    external: ["react", "@toast-ui/editor", "@toast-ui/editor/dist/toastui-editor-viewer"],
  },
];
