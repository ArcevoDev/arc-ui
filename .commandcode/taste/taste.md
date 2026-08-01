# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# cli

See [cli/taste.md](cli/taste.md)

# architecture

See [architecture/taste.md](architecture/taste.md)

# Communication

- Prefers concise, direct go-ahead signals (e.g., "sure - proceed...", or simply "continue" to resume leftover work from a prior session) when satisfied with a proposed plan: trusts the assistant to execute the full plan without micromanaging or requiring per-step re-approval. Avoids verbose confirmation cycles when the direction is already clear. Confidence: 0.7
- Dislikes AI-sounding marketing copy: explicitly flags em dashes ("—"), boilerplate descriptions, and generic "from zero to production" phrasing as "AIish." Prefers natural, human-sounding copy that avoids patterns typical of AI-generated promotional text. Applies to landing pages, READMEs, and any public-facing documentation. Confidence: 0.8
- Wants the assistant to confirm the actual root cause of a reported error before fixing it ("confirm and fix"): diagnose with concrete evidence (files on disk, running processes, resolution paths), apply the fix, and verify the fix end-to-end before reporting done — rather than jumping to a speculative fix or churning config. Confidence: 0.7
