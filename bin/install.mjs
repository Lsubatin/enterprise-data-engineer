#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const skillsSourceDir = join(repoRoot, 'skills');

const args = process.argv.slice(2);
const isGlobal = args.includes('-g') || args.includes('--global');
const isHelp = args.includes('-h') || args.includes('--help');

const targetAntigravity =
  args.includes('--antigravity') ||
  (!args.includes('--claude') && !args.includes('--antigravity'));
const targetClaude =
  args.includes('--claude') ||
  (!args.includes('--claude') && !args.includes('--antigravity'));

if (isHelp) {
  console.log(`
Usage: npx github:Lsubatin/enterprise-data-engineer [options]
   or: npx skills add Lsubatin/enterprise-data-engineer

Options:
  -g, --global       Install skills globally (~/.gemini/antigravity/skills & ~/.claude/skills)
  --antigravity      Install only for Antigravity
  --claude           Install only for Claude Code
  -h, --help         Show this help message
`);
  process.exit(0);
}

const home = homedir();
const cwd = process.cwd();

const destinations = [];

if (targetAntigravity) {
  destinations.push({
    agent: 'Antigravity',
    dir: isGlobal
      ? join(home, '.gemini', 'antigravity', 'skills')
      : join(cwd, '.agents', 'skills'),
  });
}

if (targetClaude) {
  destinations.push({
    agent: 'Claude Code',
    dir: isGlobal
      ? join(home, '.claude', 'skills')
      : join(cwd, '.claude', 'skills'),
  });
}

if (!existsSync(skillsSourceDir)) {
  console.error(`Error: skills directory not found at ${skillsSourceDir}`);
  process.exit(1);
}

const skillNames = readdirSync(skillsSourceDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

for (const dest of destinations) {
  mkdirSync(dest.dir, { recursive: true });
  for (const skillName of skillNames) {
    const src = join(skillsSourceDir, skillName);
    const dst = join(dest.dir, skillName);
    cpSync(src, dst, { recursive: true });
    console.log(`✔ Installed "${skillName}" for ${dest.agent} -> ${dst}`);
  }
}
