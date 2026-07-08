# Development Guidelines

## Working with AI Assistant

### Core Principles
1. **Financial/audit data calculations ALWAYS go to backend**, never frontend
   - Includes: loan summaries, payment totals, balance tracking, any reportable metrics
   - Reason: immutability, single source of truth, audit trail, pagination-safe
   - Even if frontend has the data, backend must confirm it

2. **Before suggesting solutions, ask constraints**:
   - "Will this paginate?"
   - "Is this financial/critical?"
   - "What's the consistency requirement?"

### Before Asking "What's Next?"
**ALWAYS search the codebase first** to check what's already implemented:
- Use `grep`, `find`, or codebase search to verify implementation status
- Don't ask if feature X is done without checking
- Only ask when actually blocked or unclear on next steps

This saves tokens, reduces back-and-forth, and catches assumptions early.

### Code Review Protocol
- Always check your changes with `npm run build` or `npm run lint` before considering complete
- If making changes without explicit permission, ask first
- Use `git status` to verify what files changed

### Making Requests
- Be explicit: "fix this" vs "check if this is fixed"
- "Check by yourself" = diagnose, not auto-fix
- Don't change code without clear go-ahead

## Quick Commands
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Check linting
```
