export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  github2?: string;
  liveDemo?: string;
  slug: string;
  markdownFile: string;
  /** Main cover image shown as a hero at the top of the detail page */
  coverImage?: string;
  /** Screenshot paths (relative to /public) shown as a grid on the detail page */
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    title: "Go4 - AI Powered Multimodal Retail Guide",
    description: "Bridging the gap between physical retail and digital convenience with a Flutter and Node.js stack powered by Gemini AI and Serper APIs.",
    tech: ["Flutter", "Node.js", "Gemini API", "Docker", "Mobile App","University Group Project"],
    github: "https://github.com/KavishkaDulshan/Go4-Group-Project.git",
    liveDemo: "",
    slug: "go4",
    markdownFile: "go4.md",
    coverImage: "/content/projects/images/go4-cover.jpg",
    screenshots: [
      "/content/projects/images/Go4_2.png",
      "/content/projects/images/Go4_3.png",
      "/content/projects/images/Go4_4.png",
      "/content/projects/images/Go4_5.png",
      "/content/projects/images/Go4_6.png",
      "/content/projects/images/Go4_7.png",
    ],
  },
  {
    title: "RiderWatch - Riders Net Profit Watch App",
    description: "A fullstack mobile & web application for delivery riders to track trips, monitor earnings, and analyse net profit. Built with Flutter and Node.js / Express backed by SQLite.",
    tech: ["Flutter", "Node.js", "Express", "SQLite", "Mobile App"],
    github: "https://github.com/KaviduRavishanHasaranga/RiderWatch.git",
    liveDemo: "https://drive.google.com/drive/folders/19YzY_KKv0awOoEo9bl_ocrj1_k5KIrLE?usp=sharing",
    slug: "riderwatch",
    markdownFile: "riderwatch.md",
    coverImage: "/content/projects/images/riderwatch-coverimage.png",
    screenshots: [
      "/content/projects/images/riderwatch-1.jpeg",
      "/content/projects/images/riderwatch-2.jpeg",
      "/content/projects/images/riderwatch-3.jpeg",
      "/content/projects/images/riderwatch-4.jpeg",
      "/content/projects/images/riderwatch-5.jpeg",
      "/content/projects/images/riderwatch-6.jpeg",
    ],
  },
  {
    title: "Printify Hub - Printing Shop Management System",
    description: "A full-stack billing and invoice management system built for printing and design businesses.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma ORM"],
    github: "https://github.com/KaviduRavishanHasaranga/Printify-Hub-billing.git",
    liveDemo: "https://printifyhub.app/login",
    slug: "printifyhub",
    markdownFile: "printifyhub.md",
    coverImage: "/content/projects/images/printifyhub-cover.png",
    screenshots: [
      "/content/projects/images/printifyhub-1.png",
      "/content/projects/images/printifyhub-2.png",
      "/content/projects/images/printifyhub-3.png",
      "/content/projects/images/printifyhub-4.png",
      "/content/projects/images/printifyhub-5.png",
      "/content/projects/images/printifyhub-6.png",
    ],
  },
  {
    title: "Optimax Opticle - Billing System",
    description: "A full-stack billing and invoice management system for an optical shop. Built with React, Node.js, Express, PostgreSQL, and Prisma ORM.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma ORM"],
    github: "https://github.com/KaviduRavishanHasaranga/optical-shop-bill-system.git",
    liveDemo: "https://optimaxbill.app/login",
    slug: "optimax",
    markdownFile: "optimax.md",
    coverImage: "/content/projects/images/optimax-cover.png",
    screenshots: [
      "/content/projects/images/optimax-1.png",
      "/content/projects/images/optimax-2.png",
      "/content/projects/images/optimax-3.png",
      "/content/projects/images/optimax-4.png",
      "/content/projects/images/optimax-5.png",
      "/content/projects/images/optimax-6.png",
    ],
  },
  {
    title: "Personal Portfolio",
    description: "A first personal portfolio built with Next.js, React, and Tailwind CSS v4. Blog posts and projects are written as Markdown files — no backend required.",
    tech: ["Next.js", "React", "Tailwind CSS v4"],
    github: "https://github.com/KaviduRavishanHasaranga/kaviduhasaranga.me.git",
    liveDemo: "https://kaviduhasaranga.me",
    slug: "personal-portfolio",
    markdownFile: "personal-portfolio.md",
    coverImage: "/content/projects/images/personal-portfolio-cover.png",
  },
  {
    title: "Student Management System",
    description: "A modern web application for managing student information, attendance, grades, and institutional operations in educational organizations.",
    tech: ["Java","Jakarta EE","MySQL","JSP","Tailwind CSS","JavaScript","University Group Project"],
    github: "https://github.com/tharinduxn/student-management-system.git",
    liveDemo: "",
    slug: "student-management-system",
    markdownFile: "student-management-system.md",
    coverImage: "/content/projects/images/student-management-system-cover.png",
    screenshots: [
      "/content/projects/images/athera-1.png",
      "/content/projects/images/athera-2.png",
      "/content/projects/images/athera-3.png",
      "/content/projects/images/athera-4.png",
      "/content/projects/images/athera-5.png",
      "/content/projects/images/athera-6.png",
    ],
  },
  {
    title:"Gems Selling Website + Admin Dashboard",
    description:"A full-stack automated student-level project evaluation and peer-review system built with Python and Streamlit.",
    tech:["HTML","CSS", "JavaScript", "PHP","MySQL", "University Group Project"],
    github:"https://github.com/KaviduRavishanHasaranga/Web_Application_Final_Project_Group-R.git",
    github2:"https://github.com/KaviduRavishanHasaranga/Admin-Dashboard-Group-R.git",
    liveDemo:"",
    slug:"gems_selling_website",
    markdownFile:"gems_selling_website.md",
    coverImage:"/content/projects/images/gems_selling_website-cover.png",
    screenshots:[
      "/content/projects/images/Gems1.png",
      "/content/projects/images/Gems2.png",
      "/content/projects/images/Gems3.png",
      "/content/projects/images/Gems4.png",
      "/content/projects/images/Gems5.png",
      "/content/projects/images/Gems6.png",
    ],
  }
];
