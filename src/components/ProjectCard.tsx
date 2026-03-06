type Props = {
  title: string;
  description: string;
  tech: string[];
  github: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
}: Props) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {tech.map((t) => (
          <span key={t} className="text-sm bg-gray-800 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        className="inline-block mt-4 text-blue-400 hover:text-blue-300 hover:underline hover:translate-x-1 transition-all duration-200"
      >
        GitHub →
      </a>
    </div>
  );
}
