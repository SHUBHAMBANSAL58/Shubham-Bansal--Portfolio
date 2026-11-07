import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Search, Layers, Code, Database, Wrench, Shield, Sparkles } from 'lucide-react';
import { searchSkills } from '../utils/validation';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) {
      return false;
    }
    return true;
  });

  const searched = searchSkills(filteredCategories, searchQuery);

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Frontend Development':
        return Code;
      case 'Backend Development':
        return Layers;
      case 'Databases':
        return Database;
      case 'Programming & Foundations':
        return Sparkles;
      case 'Developer Tools':
        return Wrench;
      default:
        return Shield;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
              Technical Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Skills & Engineering Toolkit
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Practical technologies, developer workflows, and foundational knowledge applied across modern web applications.
            </p>
          </div>

          {/* Search Bar for Skills */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Interactive Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {searched.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm">
              No matching technologies found for "{searchQuery}". Try a different keyword or reset filters.
            </div>
          ) : (
            searched.map((category) => {
              const Icon = getCategoryIcon(category.title);
              return (
                <div key={category.title} className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200">
                      {category.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      ({category.skills.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-4 rounded-xl theme-card-surface group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                            {skill.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
