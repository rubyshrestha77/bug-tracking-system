# Bug Tracking System

IFN636 Software Life Cycle Management — Assessment 1
Ruby Shrestha — n12643572

A web-based bug tracking system with two user roles. Reporters submit defects
and verify fixes; Developers review, assign and resolve them.

## Branch and Commit Conventions

Work is tracked in Jira (project key `BTS`). Every branch and commit references
its Jira issue so history maps directly to the backlog.

**Branches:** `feature/BTS-<id>-<short-description>`
Example: `feature/BTS-10-register-with-role-selection`

**Commits:** `BTS-<id>: <imperative summary>`
Example: `BTS-10: add User schema with role enum`

**Workflow:** feature branch → incremental commits → pull request → self-review
→ merge to `main`. History is never rewritten.