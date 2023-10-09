/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        mdxRs: true,
        serverComponentsExternalPackages: ['mongoose']
    },
    reactStrictMode: true,
    images: {
        domains: ["gravatar.com", "img.clerk.com"],
        disableStaticImages: true,
    },
}

module.exports = nextConfig