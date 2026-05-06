# Agent Configuration

Use the global agent configuration first:

```text
~/.agents
```

In this workspace, `~/.agents` points to:

```text
/Users/ignacio.viejo/saski/augmentedcode-configuration/.agents
```

The local `.agents/` folder in this repository is only a project-specific extension for browser-native net art studies. It should add context, constraints, and skills for this repository without replacing the global rules, workflows, or shared skills.

## Precedence

1. Global configuration in `~/.agents`.
2. Repository-specific configuration in `.agents/`.
3. Task-specific user instructions from the current conversation.

When rules appear to conflict, prefer the global configuration unless the user explicitly asks for a repo-local exception.
