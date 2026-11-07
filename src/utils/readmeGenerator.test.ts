import test from 'node:test';
import assert from 'node:assert/strict';
import { generateProjectReadme } from './readmeGenerator';

test('generateProjectReadme generates complete markdown with sections', () => {
  const md = generateProjectReadme({
    projectTitle: 'SkillSync AI',
    tagline: 'Intelligent Career Readiness Platform',
    description: 'An AI-powered career assistant',
    technologies: ['React', 'Node.js', 'AI'],
    features: ['Resume Matcher', 'Skill Gap Analyzer'],
    problem: 'Job seekers lack tailored insights',
    solution: 'Built neural embedding engine',
  });

  assert.ok(md.includes('# SkillSync AI'));
  assert.ok(md.includes('> Intelligent Career Readiness Platform'));
  assert.ok(md.includes('## ✨ Key Features'));
  assert.ok(md.includes('- **Resume Matcher**'));
  assert.ok(md.includes('## 🛠️ Technology Stack'));
  assert.ok(md.includes('## 🚀 Getting Started'));
  assert.ok(md.includes('Shubham Bansal'));
});
