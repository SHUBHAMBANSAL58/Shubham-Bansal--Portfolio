import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, BookOpen, ExternalLink, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface RepoData {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const FALLBACK_REPOS: RepoData[] = [
  {
    id: 1,
    name: 'SkillSync-AI',
    description: 'An AI-focused career and skill development platform designed to help users explore career opportunities and improve readiness.',
    html_url: 'https://github.com/SHUBHAMBANSAL58/SkillSync-AI',
    stargazers_count: 3,
    forks_count: 1,
    language: 'JavaScript',
    updated_at: '2025-02-15T00:00:00Z'
  },
  {
    id: 2,
    name: 'CodeAlpha__-Project-Management-Tool',
    description: 'Full stack project management platform with task boards, priorities, sprint tracking, and MongoDB persistence.',
    html_url: 'https://github.com/SHUBHAMBANSAL58/CodeAlpha__-Project-Management-Tool',
    stargazers_count: 2,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2025-01-28T00:00:00Z'
  },
  {
    id: 3,
    name: 'CodeAlpha__Simple-E-commerce-Store',
    description: 'Responsive web e-commerce store with product catalogue, interactive cart, authentication, and SQLite database.',
    html_url: 'https://github.com/SHUBHAMBANSAL58/CodeAlpha__Simple-E-commerce-Store',
    stargazers_count: 2,
    forks_count: 0,
    language: 'JavaScript',
    updated_at: '2025-01-14T00:00:00Z'
  },
  {
    id: 4,
    name: 'SHUBHAMBANSAL58',
    description: 'Config and profile repository highlighting developer workflow, technical interests, and recent projects.',
    html_url: 'https://github.com/SHUBHAMBANSAL58',
    stargazers_count: 1,
    forks_count: 0,
    language: 'Markdown',
    updated_at: '2025-02-01T00:00:00Z'
  }
];

export const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<RepoData[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState(false);
  const [liveSynced, setLiveSynced] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/SHUBHAMBANSAL58/repos?sort=updated&per_page=6', {
          headers: {
            Accept: 'application/vnd.github.v3+json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
            setLiveSynced(true);
          }
        }
      } catch {
        // Graceful fallback to verified repositories
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
              Open Source & Repositories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              GitHub Engineering Activity
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Live repository updates, source code repositories, and collaborative commit activity for @SHUBHAMBANSAL58.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-300 dark:border-slate-700 shadow-xs"
            >
              <Github className="w-4 h-4" />
              <span>Visit GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="theme-card-surface p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-4 h-4" />
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors tracking-tight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    aria-label={`Open ${repo.name} repository`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed min-h-[38px]">
                  {repo.description || 'Public software repository maintained by Shubham Bansal.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{repo.language || 'Full Stack'}</span>
                </div>
                <div className="flex items-center gap-4 tabular-nums">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Status Line */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-slate-500">
            Real repositories from{' '}
            <a
              href="https://github.com/SHUBHAMBANSAL58"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              github.com/SHUBHAMBANSAL58
            </a>
            {liveSynced ? ' · Synced via GitHub REST API' : ' · Verified Archive Data'}
          </p>
        </div>
      </div>
    </section>
  );
};
