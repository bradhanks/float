import type { NextConfig } from 'next'

import nextMDX from '@next/mdx'
import { Parser, Options as AcornOptions } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import { unifiedConditional } from 'unified-conditional'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
  experimental: {
    useCache: true,
  },
  turbopack: {},
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ]
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
}

function remarkMDXLayout(source: string, metaName: string) {
  const parser = Parser.extend(jsx())
  const parseOptions: AcornOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module',
  }

  return (tree: {
    children: Array<{ type: string; value: string; data: any }>
  }) => {
    const imp = `import _Layout from '${source}'`
    const exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

export default async function config() {
  const withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        rehypeUnwrapImages,
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        [
          unifiedConditional,
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('./src/app/blog'))}`,
            ),
            [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
          ],
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/customers'))}`,
            ),
            [[remarkMDXLayout, '@/app/customers/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  })
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

  return withBundleAnalyzer(withMDX(nextConfig))
}
