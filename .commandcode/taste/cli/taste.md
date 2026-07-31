# cli
- Insists on re-reading plan/context files in full before proceeding with any action, even after prior discussion: requires thorough context refresh to avoid premature decisions. Confidence: 0.65
- Verifies every claim in tracking/plan files (.agent/, *.md) against actual filesystem state before executing any task: does not trust documentation alone; cross-references claims (directory existence, file counts, code patterns) with real on-disk state. Confidence: 0.9
- Always write analysis and planning output to .agent/output.txt instead of printing to terminal. Confidence: 0.92
- Always write the summary to .agent/summary-output.txt and update planning docs. Confidence: 0.85
- Keep ALL `.agent` tracking files (output.txt, summary-output.txt, AGENTS.md, CLAUDE.md) updated on every session: not just one file. Confidence: 0.75
- Planning/context docs (CLAUDE.md, AGENTS.md, .agent/*) must be proactively synced to actual filesystem state after every state-changing action: if versions, build details, task statuses, or gap lists are stale, fix them immediately rather than only verifying claims before starting work. "Synced to what exists" is the standard; stale documentation is a bug. Confidence: 0.8
- Uses `.agent/nt.txt` as a session continuity bookmark: before proceeding with work, always read `nt.txt` to resume from where the previous session stopped, ensuring no work is re-done or skipped. Confidence: 0.9
- Deploys to Vercel for static sites and Storybook documentation builds. Confidence: 0.7
- Produces migration documentation to ease consumption by downstream projects (e.g., arc-id migration guide). Confidence: 0.6
- Prioritizes work by dependency-chain and impact: the blocking prerequisite gets tackled first (e.g., SDK auto-refresh before layout because it unblocks downstream repos). Confidence: 0.7
n and impact: the blocking prerequisite gets tackled first (e.g., SDK auto-refresh before layout because it unblocks downstream repos). Confidence: 0.7
