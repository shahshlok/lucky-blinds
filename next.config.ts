import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // <--- This creates the "out" folder
    images: {
        unoptimized: true, // Required for static exports
    },
};

export default nextConfig;
