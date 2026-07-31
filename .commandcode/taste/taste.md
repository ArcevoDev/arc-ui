# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# cli
See [cli/taste.md](cli/taste.md)
# architecture
See [architecture/taste.md](architecture/taste.md)
# Communication
- Prefers concise, direct go-ahead signals (e.g., "sure - proceed...") when satisfied with a proposed plan: trusts the assistant to execute the full plan without micromanaging or requiring per-step re-approval. Avoids verbose confirmation cycles when the direction is already clear. Confidence: 0.65
- Dislikes AI-sounding marketing copy: explicitly flags em dashes ("—"), boilerplate descriptions, and generic "from zero to production" phrasing as "AIish." Prefers natural, human-sounding copy that avoids patterns typical of AI-generated promotional text. Applies to landing pages, READMEs, and any public-facing documentation. Confidence: 0.8
