export interface ContentSection {
  type: 'intro' | 'heading' | 'paragraph' | 'code' | 'list' | 'callout' | 'subheading';
  text?: string;
  language?: string;
  items?: string[];
  variant?: 'info' | 'tip' | 'warning';
}

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
  content?: ContentSection[];
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
    emoji: "🚀",
    content: [
      {
        type: "intro",
        text: "NestJS has become my go-to framework for building production-ready backend services. Its opinionated structure, native TypeScript support, and Angular-inspired module system make it incredibly powerful for teams. In this post I'll walk through the architectural decisions I make when scaffolding a new NestJS + TypeORM project.",
      },
      {
        type: "heading",
        text: "Why NestJS?",
      },
      {
        type: "paragraph",
        text: "Express is flexible — sometimes too flexible. Without conventions, large codebases devolve into spaghetti. NestJS gives you dependency injection, decorators, modules, and a clear layered architecture out of the box. Every controller, service, and repository knows exactly where it lives.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "NestJS is fully compatible with Express under the hood. You can drop down to raw Express when you need to, but you rarely will.",
      },
      {
        type: "heading",
        text: "Project Structure",
      },
      {
        type: "paragraph",
        text: "I organise by domain, not by type. Each feature (e.g. users, products, orders) gets its own module folder:",
      },
      {
        type: "code",
        language: "bash",
        text: `src/
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.entity.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── guards/
│       └── jwt-auth.guard.ts
└── app.module.ts`,
      },
      {
        type: "heading",
        text: "Setting Up TypeORM",
      },
      {
        type: "paragraph",
        text: "Install the required packages and configure the TypeORM module in AppModule. I always use environment variables for credentials and enable synchronize only in development:",
      },
      {
        type: "code",
        language: "typescript",
        text: `// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}`,
      },
      {
        type: "heading",
        text: "Defining Entities",
      },
      {
        type: "paragraph",
        text: "Entities are TypeScript classes decorated with @Entity(). I always extend a BaseEntity class that holds common columns to keep things DRY:",
      },
      {
        type: "code",
        language: "typescript",
        text: `// base.entity.ts
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// users/users.entity.ts
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' })
  role: string;
}`,
      },
      {
        type: "heading",
        text: "Guards & Role-Based Access",
      },
      {
        type: "paragraph",
        text: "NestJS guards are the cleanest way to protect routes. Here's a minimal JWT guard that also applies role checks via a custom @Roles() decorator:",
      },
      {
        type: "code",
        language: "typescript",
        text: `// guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<string[]>('roles', context.getHandler());
    if (!required) return true;

    const { user } = context.switchToHttp().getRequest();
    return required.includes(user.role);
  }
}

// Then on your controller:
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Delete(':id')
remove(@Param('id') id: string) {
  return this.usersService.remove(id);
}`,
      },
      {
        type: "heading",
        text: "Interceptors for Response Transformation",
      },
      {
        type: "paragraph",
        text: "I use a global response interceptor to wrap every API response in a consistent shape, making frontend integration predictable:",
      },
      {
        type: "code",
        language: "typescript",
        text: `@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

// Register globally in main.ts:
app.useGlobalInterceptors(new TransformInterceptor());`,
      },
      {
        type: "heading",
        text: "Key Takeaways",
      },
      {
        type: "list",
        items: [
          "Organise by domain, not by layer — every feature is self-contained",
          "Use environment variables for all config; never hardcode credentials",
          "Synchronize: true is only for development — use migrations in production",
          "Guards + Reflector metadata is the cleanest RBAC pattern in NestJS",
          "A global interceptor keeps API responses uniform across all endpoints",
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "All code samples in this post are simplified for clarity. In a real project you'd also add validation pipes (class-validator), exception filters, and a Swagger module for automatic API documentation.",
      },
    ],
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
    emoji: "⛓️",
    content: [
      {
        type: "intro",
        text: "Blockchain has become my go-to framework for building production-ready backend services. Its opinionated structure, native TypeScript support, and Angular-inspired module system make it incredibly powerful for teams. In this post I'll walk through the architectural decisions I make when scaffolding a new NestJS + TypeORM project.",
      },
      {
        type: "heading",
        text: "Why Blockchain?",
      },
      {
        type: "paragraph",
        text: "Blockchain is a distributed ledger technology that enables secure, transparent, and tamper-proof transactions. It has applications in various industries, including finance, supply chain management, and healthcare.",
      },
      {
        type: "heading",
        text: "Why Blockchain?",
      },
      {
        type: "paragraph",
        text: "Blockchain is a distributed ledger technology that enables secure, transparent, and tamper-proof transactions. It has applications in various industries, including finance, supply chain management, and healthcare.",
      },
    ],
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
    emoji: "🤖",
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
    emoji: "📱",
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
    emoji: "🐳",
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
    emoji: "🔐",
  },
];

export const categories = ["All", "Backend", "Blockchain", "AI & ML", "Mobile", "DevOps", "Security"];
