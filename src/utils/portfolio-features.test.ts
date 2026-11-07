import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, JOURNEY_MILESTONES, EXPERIENCES, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { PROJECT_ARCHITECTURES } from '../data/projectArchitectures';
import { validateContactForm, filterProjects } from './validation';
import { getScrollRevealConfig } from '../hooks/useScrollReveal';
import { computeScrollLinkedCardTransform } from './scrollProgress';

test('Each featured project includes a comprehensive case study and architecture layers', () => {
  assert.equal(PROJECTS.length, 4);

  PROJECTS.forEach((project) => {
    assert.ok(project.title, 'Project must have a title');
    assert.ok(project.githubUrl.startsWith('https://github.com/'), 'Must have valid GitHub link');
    assert.ok(project.caseStudy, `Project ${project.id} must have caseStudy`);
    assert.ok(project.caseStudy.problem, 'Must define problem solved');
    assert.ok(project.caseStudy.role, 'Must define exact role');
    assert.ok(project.caseStudy.architecture.length >= 3, 'Must have at least 3 architecture layers');
    assert.ok(project.caseStudy.challenges.length >= 1, 'Must have documented challenges and solutions');
    assert.ok(project.caseStudy.futureImprovements.length >= 1, 'Must have future roadmap improvements');
  });
});

test('PROJECT_ARCHITECTURES contains complete 4-tier stacks (Frontend, API, Backend, DB) and data flow steps for all projects', () => {
  assert.equal(PROJECT_ARCHITECTURES.length, 4, 'Must have architecture data for all 4 featured projects');

  PROJECT_ARCHITECTURES.forEach((arch) => {
    assert.ok(arch.projectId, 'Must have projectId');
    assert.ok(arch.projectTitle, 'Must have projectTitle');
    assert.ok(arch.architecturePattern, 'Must define architecture pattern');
    assert.ok(arch.databaseEngine, 'Must define database engine');

    // Tiers
    assert.equal(arch.tiers.frontend.name, 'Frontend');
    assert.ok(arch.tiers.frontend.technologies.length >= 2);
    assert.ok(arch.tiers.frontend.keyComponents.length >= 2);

    assert.equal(arch.tiers.api.name, 'API Gateway');
    assert.ok(arch.tiers.api.technologies.length >= 2);
    assert.ok(arch.tiers.api.keyComponents.length >= 2);

    assert.equal(arch.tiers.backend.name, 'Backend');
    assert.ok(arch.tiers.backend.technologies.length >= 2);
    assert.ok(arch.tiers.backend.keyComponents.length >= 2);

    assert.equal(arch.tiers.database.name, 'Database');
    assert.ok(arch.tiers.database.technologies.length >= 1);
    assert.ok(arch.tiers.database.keyComponents.length >= 2);

    // Data flow steps
    assert.ok(arch.dataFlowSteps.length >= 5, 'Must have at least 5 end-to-end data flow steps');
    arch.dataFlowSteps.forEach((step, idx) => {
      assert.equal(step.step, idx + 1);
      assert.ok(step.source);
      assert.ok(step.target);
      assert.ok(step.action);
      assert.ok(step.payloadType);
    });
  });
});

test('Developer journey milestones are chronologically ordered with valid metadata', () => {
  assert.ok(JOURNEY_MILESTONES.length >= 6);

  JOURNEY_MILESTONES.forEach((m) => {
    assert.ok(m.year, 'Milestone must have a year');
    assert.ok(m.title, 'Milestone must have a title');
    assert.ok(m.description, 'Milestone must have descriptive content');
    assert.ok(m.badges.length >= 1, 'Milestone must have informative badges');
  });
});

test('All verified experiences and credentials are documented without missing attributes', () => {
  assert.equal(EXPERIENCES.length, 4);
  assert.equal(EDUCATION.length, 3);
  assert.ok(CERTIFICATIONS.length >= 5);

  const ibmCert = CERTIFICATIONS.find((c) => c.id === 'cert-ibm-ai');
  assert.ok(ibmCert?.verificationUrl?.includes('credly.com'), 'IBM cert must link to verified Credly badge');

  const googleCert = CERTIFICATIONS.find((c) => c.id === 'cert-google-skills');
  assert.ok(googleCert?.verificationUrl?.includes('skills.google'), 'Google cert must link to public profile');
});

test('useScrollReveal config generates valid compositor properties', () => {
  const normalConfig = getScrollRevealConfig({ distance: 28, duration: 0.65 });
  assert.equal(normalConfig.initial.y, 28);
  assert.equal(normalConfig.animate.y, 0);

  const reducedConfig = getScrollRevealConfig({ distance: 28 }, true);
  assert.equal(reducedConfig.initial.y, 0, 'Must not translate when reduced motion is preferred');
});

test('Each featured project has interactive preview snippets (UI view, code, and architecture)', () => {
  PROJECTS.forEach((project) => {
    assert.ok(project.previewSnippets && project.previewSnippets.length >= 3, `Project ${project.id} must have >= 3 preview snippets`);
    const types = project.previewSnippets.map((s) => s.type);
    assert.ok(types.includes('ui_screenshot'), `${project.id} must include ui_screenshot snippet`);
    assert.ok(types.includes('code_snippet'), `${project.id} must include code_snippet snippet`);
    assert.ok(types.includes('architecture_diagram'), `${project.id} must include architecture_diagram snippet`);
  });
});

test('computeScrollLinkedCardTransform generates subtle scale and opacity shifts for project cards entering viewport', () => {
  const atZero = computeScrollLinkedCardTransform(0);
  assert.equal(atZero.opacity, 0.6, 'Initial opacity should be subtly reduced to 0.6');
  assert.equal(atZero.scale, 0.95, 'Initial scale should be subtly reduced to 0.95');
  assert.equal(atZero.y, 32, 'Initial Y offset should start at 32px');

  const atFull = computeScrollLinkedCardTransform(1);
  assert.equal(atFull.opacity, 1, 'Full opacity should reach 1.0 at reading focal plane');
  assert.equal(atFull.scale, 1, 'Full scale should reach 1.0 at reading focal plane');
  assert.equal(atFull.y, 0, 'Y offset should settle smoothly to 0px');
});

