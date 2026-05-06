export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  emoji: string;
  link?: string;
  markdownFile?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable REST APIs with NestJS & TypeORM",
    excerpt:
      "A deep dive into structuring enterprise-grade backend services using NestJS modules, guards, interceptors, and TypeORM repositories for clean, maintainable code.",
    date: "2025-02-15",
    readTime: "8 min read",
    category: "Backend",
    tags: ["NestJS", "TypeORM", "REST API", "TypeScript"],
    featured: true,
    emoji: "",
    markdownFile: "1.md",
  },
  {
    id: "2",
    title: "Demystifying Blockchain: Smart Contracts in Practice",
    excerpt:
      "Exploring how Solidity smart contracts work under the hood — from deployment on testnets to integrating with a React frontend using ethers.js.",
    date: "2025-01-28",
    readTime: "10 min read",
    category: "Blockchain",
    tags: ["Solidity", "Ethereum", "Web3", "ethers.js"],
    featured: true,
    emoji: "",
    markdownFile: "2.md",
  },
  {
    id: "3",
    title: "Machine Learning Pipelines with Python & scikit-learn",
    excerpt:
      "Step-by-step guide to building production-ready ML pipelines: data preprocessing, feature engineering, model training, evaluation, and serialization.",
    date: "2025-01-10",
    readTime: "12 min read",
    category: "AI & ML",
    tags: ["Python", "scikit-learn", "Machine Learning", "Pipelines"],
    featured: false,
    emoji: "",
    markdownFile: "3.md",
  },
  {
    id: "4",
    title: "Flutter State Management: Riverpod vs Bloc",
    excerpt:
      "A hands-on comparison of Riverpod and Bloc for managing complex state in Flutter apps, with real-world examples and performance considerations.",
    date: "2024-12-20",
    readTime: "7 min read",
    category: "Mobile",
    tags: ["Flutter", "Riverpod", "Bloc", "Dart"],
    featured: false,
    emoji: "",
    markdownFile: "4.md",
  },
  {
    id: "5",
    title: "Zero to Docker: Containerizing a Full-Stack App",
    excerpt:
      "A practical walkthrough for containerizing a NestJS API + Next.js frontend using Docker Compose, environment configs, and reverse proxy with Nginx.",
    date: "2024-12-05",
    readTime: "9 min read",
    category: "DevOps",
    tags: ["Docker", "Nginx", "CI/CD", "DevOps"],
    featured: false,
    emoji: "",
    markdownFile: "5.md",
  },
  {
    id: "6",
    title: "Understanding Role-Based Access Control (RBAC)",
    excerpt:
      "Implementing a flexible RBAC system from scratch — designing permission tables, building guards, and testing edge cases in a multi-tenant application.",
    date: "2024-11-18",
    readTime: "6 min read",
    category: "Security",
    tags: ["RBAC", "Security", "NestJS", "MySQL"],
    featured: false,
    emoji: "",
    markdownFile: "6.md",
  },
];

export const categories = ["All", "Backend", "Blockchain", "AI & ML", "Mobile", "DevOps", "Security"];
