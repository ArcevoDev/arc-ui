# cli
- Insists on re-reading plan/context files in full before proceeding with any action, even after prior discussion — requires thorough context refresh to avoid premature decisions. Confidence: 0.5
- Always write analysis and planning output to .agent/output.txt instead of printing to terminal. Confidence: 0.92
- Always write the summary to .agent/summary-output.txt and update planning docs. Confidence: 0.85
- Keep ALL `.agent` tracking files (output.txt, summary-output.txt, AGENTS.md, CLAUDE.md) updated on every session — not just one file. Confidence: 0.75
- Deploys to Vercel for static sites and Storybook documentation builds. Confidence: 0.7
- Produces migration documentation to ease consumption by downstream projects (e.g., arc-id migration guide). Confidence: 0.6
- Prioritizes work by dependency-chain and impact — the blocking prerequisite gets tackled first (e.g., SDK auto-refresh before layout because it unblocks downstream repos). Confidence: 0.7
