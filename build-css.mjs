import { compile } from "tailwindcss";
import fs from "fs";
import path from "path";

async function run() {
  const cssPath = path.resolve("./node_modules/tailwindcss/index.css");
  const input = fs.readFileSync(cssPath, "utf8");
  
  const compiler = await compile(input, {
    base: process.cwd(),
    async loadStylesheet(id, baseDir) {
      if (id === "tailwindcss" || id === "tailwindcss/index.css") {
        const twPath = path.resolve("./node_modules/tailwindcss/index.css");
        return {
          base: path.dirname(twPath),
          content: fs.readFileSync(twPath, "utf8"),
        };
      }
      if (id.startsWith("tailwindcss/")) {
        const subPath = path.resolve(`./node_modules/tailwindcss/${id.replace("tailwindcss/", "")}`);
        return {
          base: path.dirname(subPath),
          content: fs.readFileSync(subPath, "utf8"),
        };
      }
      const resolved = path.resolve(baseDir, id);
      return {
        base: path.dirname(resolved),
        content: fs.readFileSync(resolved, "utf8"),
      };
    }
  });

  const candidates = new Set();
  
  // scan src files for class candidates
  function scan(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        scan(full);
      } else if (/\.(tsx|ts|js|jsx|html)$/.test(f)) {
        const content = fs.readFileSync(full, "utf8");
        // extract candidate strings
        const tokens = content.match(/[\w\-/:.[\]%]+/g) || [];
        for (const t of tokens) {
          if (t.length > 1 && !t.includes("http") && !t.includes("<") && !t.includes(">") && !t.includes("=") && !t.includes("(") && !t.includes(")")) {
            candidates.add(t);
          }
        }
      }
    }
  }

  scan(path.resolve("./src"));

  // Add foundational layout & utility classes to ensure complete CSS coverage
  const baselineUtilities = [
    "flex", "flex-col", "flex-row", "flex-wrap", "flex-1", "shrink-0", "grow",
    "inline-flex", "hidden", "block", "inline-block", "grid",
    "items-center", "items-start", "items-end", "items-baseline",
    "justify-center", "justify-between", "justify-start", "justify-end",
    "w-full", "w-screen", "w-64", "w-72", "w-80", "w-10", "w-11", "w-12", "w-16", "w-28", "w-32",
    "h-full", "h-screen", "min-h-screen", "h-14", "h-10", "h-11", "h-12", "h-16", "h-28", "h-32",
    "max-w-xs", "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl", "max-w-2xl", "max-w-3xl", "max-w-5xl", "max-w-7xl",
    "grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-6", "grid-cols-12",
    "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4", "sm:grid-cols-6",
    "md:grid-cols-2", "md:grid-cols-3", "md:flex-row", "lg:grid-cols-3", "lg:grid-cols-12", "lg:block", "lg:hidden",
    "p-1", "p-2", "p-3", "p-4", "p-5", "p-6", "p-8", "px-3", "px-4", "px-5", "px-6", "py-2", "py-2.5", "py-3", "py-4",
    "m-auto", "mx-auto", "my-2", "my-4", "my-6", "my-8", "mt-1", "mt-2", "mt-3", "mt-4", "mt-6", "mt-auto", "mb-1", "mb-2", "mb-3",
    "gap-1", "gap-1.5", "gap-2", "gap-2.5", "gap-3", "gap-4", "gap-6", "gap-8",
    "space-y-1", "space-y-2", "space-y-3", "space-y-4", "space-y-6", "space-y-8",
    "border", "border-t", "border-b", "border-l", "border-r", "border-slate-100", "border-slate-200", "border-slate-300", "border-teal-500",
    "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
    "bg-white", "bg-slate-50", "bg-slate-100", "bg-slate-800", "bg-slate-900", "bg-slate-950",
    "bg-teal-50", "bg-teal-100", "bg-teal-500", "bg-teal-600", "bg-teal-700", "bg-teal-900", "bg-teal-950",
    "text-white", "text-slate-400", "text-slate-500", "text-slate-600", "text-slate-700", "text-slate-800", "text-slate-900",
    "text-teal-400", "text-teal-500", "text-teal-600", "text-teal-700", "text-teal-800",
    "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl",
    "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold",
    "fixed", "absolute", "relative", "sticky", "top-0", "bottom-0", "left-0", "right-0", "inset-0", "inset-x-0", "inset-y-0",
    "z-10", "z-20", "z-30", "z-40", "z-50",
    "shadow-xs", "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
    "overflow-hidden", "overflow-y-auto", "overflow-x-auto", "truncate", "line-clamp-1", "line-clamp-2", "line-clamp-3",
    "aspect-square", "aspect-video", "aspect-16/10", "aspect-16/9", "object-cover",
    "transition", "transition-all", "transition-[width]", "duration-200", "duration-250", "duration-300", "duration-500", "ease-in-out", "delay-50", "delay-75",
    "w-[64px]", "w-[72px]", "hover:w-[240px]", "focus-within:w-[240px]", "w-[48px]", "w-[52px]", "w-20", "w-[240px]", "w-[244px]", "w-[260px]", "w-[264px]",
    "top-3", "bottom-3", "left-3", "bg-white/95", "bg-slate-100/95", "bg-[#f1f5f9]/95", "backdrop-blur-md", "border-slate-200/80", "border-slate-200/90",
    "translate-x-0", "-translate-x-2",
    "shadow-lg", "shadow-xl", "shadow-2xs",
    "group/sidebar", "group-hover/sidebar:opacity-100", "group-hover/sidebar:hidden", "group-hover/sidebar:scale-105", "group-hover/sidebar:scale-110", "group-hover/sidebar:text-slate-800", "group-hover/sidebar:rotate-90",
    "group/img", "group-hover/img:scale-105", "group-hover/img:opacity-100",
    "rotate-180", "scale-125", "items-start", "grid-cols-1", "grid-cols-2", "grid-cols-3",
    "bg-rose-50", "text-rose-600", "fill-rose-500", "text-rose-500",
    "motion-reduce:transition-none", "hover:scale-105", "hover:bg-slate-50",
    "cursor-pointer", "select-none", "outline-none"
  ];

  for (const b of baselineUtilities) candidates.add(b);

  console.log("Total unique candidates to compile:", candidates.size);
  const output = compiler.build(Array.from(candidates));
  console.log("Built Tailwind CSS length:", output.length, "bytes");

  fs.writeFileSync(path.resolve("./src/app/tailwind.css"), output, "utf8");
  console.log("Successfully generated ./src/app/tailwind.css!");
}

run().catch((err) => {
  console.error("Build CSS error:", err);
  process.exit(1);
});
