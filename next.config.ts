import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Отключаем source maps в dev режиме для уменьшения предупреждений
  productionBrowserSourceMaps: false,
};

// Для Turbopack нужно использовать строковые имена плагинов
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
