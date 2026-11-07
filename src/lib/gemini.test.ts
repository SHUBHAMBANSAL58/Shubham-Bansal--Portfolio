import test from 'node:test';
import assert from 'node:assert/strict';
import { getSystemInstructionForRole, generateGroundedPortfolioReply, executeGeminiChat } from './gemini.ts';

test('getSystemInstructionForRole returns role-tailored instructions', () => {
  const guideInstruction = getSystemInstructionForRole('portfolio_guide');
  assert.ok(guideInstruction.includes('Official AI Portfolio & Career Ambassador'));
  assert.ok(guideInstruction.includes('Shubham Bansal'));
  assert.ok(guideInstruction.includes('SkillSync AI'));

  const archInstruction = getSystemInstructionForRole('technical_architect');
  assert.ok(archInstruction.includes('Technical Architect AI Assistant'));
  assert.ok(archInstruction.includes('4-tier architectures'));

  const fastInstruction = getSystemInstructionForRole('fast_qa');
  assert.ok(fastInstruction.includes('Rapid Q&A Assistant'));
  assert.ok(fastInstruction.includes('1-3 sentences'));
});

test('generateGroundedPortfolioReply handles technical architect role', () => {
  const result = generateGroundedPortfolioReply('Explain the 4-tier architecture of SkillSync AI', 'technical_architect');
  assert.ok(result.reply.includes('SkillSync AI — 4-Tier Architectural Breakdown'));
  assert.ok(result.reply.includes('Client / Presentation Layer'));
  assert.ok(result.reply.includes('Data Persistence Tier'));
  assert.equal(result.groundingSources.length >= 1, true);
});

test('generateGroundedPortfolioReply handles fast_qa role', () => {
  const result = generateGroundedPortfolioReply('What is his email address?', 'fast_qa');
  assert.ok(result.reply.includes('bansalshubham182@gmail.com'));
});

test('executeGeminiChat succeeds without throwing', async () => {
  const result = await executeGeminiChat({
    messages: [{ role: 'user', content: 'What internships has Shubham completed?' }],
    role: 'portfolio_guide',
    model: 'gemini-3.8-flash'
  });
  assert.ok(result.reply.length > 20);
  assert.ok(result.reply.includes('CodSoft'));
  assert.ok(result.modelUsed.includes('gemini-3.8-flash'));
});

