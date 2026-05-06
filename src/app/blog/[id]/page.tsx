import { blogPosts } from '@/data/blogs'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import BlogPostPage from '@/components/BlogPostPage'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return blogPosts
    .filter(p => p.markdownFile)
    .map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)
  if (!post) return {}
  return {
    title: `${post.title} | Kavidu Hasaranga`,
    description: post.excerpt,
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)

  if (!post || !post.markdownFile) {
    notFound()
  }

  const mdPath = path.join(process.cwd(), 'content', 'blogs', post.markdownFile)
  const markdownContent = await fs.readFile(mdPath, 'utf-8')

  return <BlogPostPage post={post} markdownContent={markdownContent} />
}
