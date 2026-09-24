# enterprise-data-engineer

A collection of enterprise data engineering skills for AI coding agents, compatible with **Antigravity** and **Claude Code**.

## Available Skills

### [`generate-sample-data`](./skills/generate-sample-data/SKILL.md)
Generates configurable scripts (SQL DDL/DML, Python 3.14 with `uv`, and Bash runners) to create realistic sample data with data quality assertions and tear-down scripts across five scenarios:
1. **Quick Demo Data** – Minimal, self-contained examples for specific SQL functions or features.
2. **Real-Life Business Data** – Multi-table schemas with referential integrity, currencies, languages, units of measure, and realistic distributions.
3. **Data for Analytics** – Star/analytical schemas with time and geographical dimensions plus semi-structured/unstructured fields.
4. **Data for Statistics or Machine Learning** – Datasets with statistically meaningful correlations, anomalies, and optional continuous generators.
5. **Data for Performance or Cost Experiments** – High-volume datasets incorporating partitioning, clustering, streaming, or Managed Spark jobs (>1M rows).

---

## Installation with `npx`

### Option 1: Using the `skills` CLI (Recommended)

Install into your current project for **both Antigravity and Claude Code**:

```bash
npx skills add Lsubatin/enterprise-data-engineer -a antigravity -a claude-code
```

Install **globally** (so the skill is available across all workspaces in `~/.gemini/antigravity/skills` and `~/.claude/skills`):

```bash
npx skills add Lsubatin/enterprise-data-engineer -g -a antigravity -a claude-code
```

Install only the `generate-sample-data` skill:

```bash
npx skills add Lsubatin/enterprise-data-engineer --skill generate-sample-data -a antigravity -a claude-code
```

### Option 2: Direct `npx` Installer

You can also run the repository installer directly via `npx`:

```bash
# Install to current project (.agents/skills & .claude/skills)
npx github:Lsubatin/enterprise-data-engineer

# Install globally (~/.gemini/antigravity/skills & ~/.claude/skills)
npx github:Lsubatin/enterprise-data-engineer --global
```

---

## Repository Structure

```text
enterprise-data-engineer/
├── skills/
│   └── generate-sample-data/
│       └── SKILL.md           # Main skill definition (Antigravity & Claude Code)
├── .claude-plugin/
│   └── plugin.json            # Claude Code plugin manifest
├── plugin.json                # Antigravity / Jetski plugin manifest
├── bin/
│   └── install.mjs            # Direct npx installer for Antigravity & Claude Code
└── package.json
```
