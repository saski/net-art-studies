# Local Agent Layer

This folder is a repository-specific extension over the global agent setup in `~/.agents`.

Load order:

1. Load and follow `~/.agents` first.
2. Use this local `.agents/` folder only for net-art-specific rules, skills, and docs.
3. If local guidance conflicts with global guidance, keep the global guidance unless the user explicitly chooses a repo-local exception.

The local layer currently adds:

- `rules/project.md`: project intent and working rules.
- `rules/browser-native-sketches.md`: sketch contract and browser constraints.
- `docs/skill-factory-skills.md`: local skill routing index.
- `skills/net-art-sketch-author/`: create or extend sketches.
- `skills/net-art-critique/`: critique artistic direction and browser-native behavior.
