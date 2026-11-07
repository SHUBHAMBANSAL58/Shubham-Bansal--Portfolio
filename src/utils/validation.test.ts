import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, filterProjects, searchSkills } from './validation';
import { PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

test('validateContactForm rejects empty submissions', () => {
  const errors = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  assert.ok(errors.name, 'Name should be flagged as required');
  assert.ok(errors.email, 'Email should be flagged as required');
  assert.ok(errors.subject, 'Subject should be flagged as required');
  assert.ok(errors.message, 'Message should be flagged as required');
});

test('validateContactForm rejects malformed emails', () => {
  const errors = validateContactForm({
    name: 'Sarah Connor',
    email: 'not-an-email',
    subject: 'Project inquiry',
    message: 'Hello Shubham, let us collaborate on an AI project together.'
  });

  assert.equal(errors.name, undefined);
  assert.ok(errors.email?.includes('valid email'));
});

test('validateContactForm accepts valid entries', () => {
  const errors = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    subject: 'Project inquiry',
    message: 'Hello Shubham, let us collaborate on an AI project together.'
  });

  assert.deepEqual(errors, {});
});

test('filterProjects correctly matches categories', () => {
  const allProjects = filterProjects(PROJECTS, 'All');
  assert.equal(allProjects.length, 4);

  const aiProjects = filterProjects(PROJECTS, 'AI & Web');
  assert.equal(aiProjects.length, 1);
  assert.equal(aiProjects[0].id, 'skillsync-ai');

  const fullStackProjects = filterProjects(PROJECTS, 'Full Stack');
  assert.equal(fullStackProjects.length, 1);
  assert.equal(fullStackProjects[0].id, 'project-management-tool');

  // Tag-based filtering
  const reactTagged = filterProjects(PROJECTS, 'All', 'All', ['React']);
  assert.ok(reactTagged.length >= 2, 'Multiple projects should match React tag');

  const firebaseTagged = filterProjects(PROJECTS, 'All', 'All', ['Firebase']);
  assert.ok(firebaseTagged.length >= 1, 'Projects should match Firebase tag');
  assert.ok(firebaseTagged.some(p => p.id === 'skillsync-ai'));

  const aiTagged = filterProjects(PROJECTS, 'All', 'All', ['AI']);
  assert.ok(aiTagged.some(p => p.id === 'skillsync-ai'));
});


test('searchSkills filters skills by query text', () => {
  const reactMatches = searchSkills(SKILL_CATEGORIES, 'React');
  assert.ok(reactMatches.length >= 1);
  assert.ok(reactMatches.some((cat) => cat.skills.some((s) => s.name.includes('React'))));

  const mongoMatches = searchSkills(SKILL_CATEGORIES, 'MongoDB');
  assert.ok(mongoMatches.length >= 1);
  assert.ok(mongoMatches.some((cat) => cat.skills.some((s) => s.name.includes('MongoDB'))));
});
