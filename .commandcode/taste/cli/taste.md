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
- Commits and pushes incrementally: work is committed in logical batches per completed priority/feature (with descriptive commit messages and Co-authored-by attribution), not as one giant commit at the end; each batch is pushed to origin after verification. Confidence: 0.7
- When packages are publish/deploy-ready, writes the concrete publish/deploy steps into .agent/output.txt (prereqs, version/publish commands, hosting config) rather than executing the publish itself. Confidence: 0.6
- output.txt should list only OPEN work (what remains to be done), not closed/done items: completed items are collapsed into a short process-summary section, and closed work lives in the git log rather than the tracker. Confidence: 0.8
- Prefers to run terminal/CLI work themselves ("leave terminal work to me"): the assistant should limit itself to focused verification of its own changes (e.g., package-scoped build/test) rather than driving the full terminal workflow. Confidence: 0.7
- Transient session bookmarks like .agent/nt.txt are deleted once their content is absorbed and merged into .agent/summary-output.txt: stale notes files are not kept around after being folded into the summary. Confidence: 0.6
- Tooling/quality gates are only considered "working" once verified to actually run: a dependency being installed (e.g., typescript-eslint 8.65.0) does not make lint functional — when eslint hangs even on `--version` and single-file runs on this machine, it is diagnosed as a pre-existing environment issue and tracked as open work, not silently assumed fixed. Also questions whether a gate is necessary at all ("is the linting necessary.. if yes.. is it working now") rather than assuming all standard tooling must be maintained. Confidence: 0.6
