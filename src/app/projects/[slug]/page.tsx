import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import ProjectDetailPage from '@/components/ProjectDetailPage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.markdownFile)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} | Kavidu Hasaranga`,
    description: project.description,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project || !project.markdownFile) {
    notFound()
  }

  const mdPath = path.join(process.cwd(), 'content', 'projects', project.markdownFile)
  const markdownContent = await fs.readFile(mdPath, 'utf-8')

  return <ProjectDetailPage project={project} markdownContent={markdownContent} />
}
