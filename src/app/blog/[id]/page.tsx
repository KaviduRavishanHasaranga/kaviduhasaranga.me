import { blogPosts } from '@/data/blogs'
import { notFound } from 'next/navigation'
import BlogPostPage from '@/components/BlogPostPage'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return blogPosts
    .filter(p => p.content && p.content.length > 0)
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

  if (!post || !post.content || post.content.length === 0) {
    notFound()
  }

  return <BlogPostPage post={post} />
}
