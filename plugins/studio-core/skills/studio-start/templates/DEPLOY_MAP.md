# Deploy map: what each push or command publishes

One repo, several parts. Read this before pushing or deploying. Checked <date>.

## The repo
- Code home: <host / path> (remote `origin`). Push only there. <mirrors, if any: backup only, nothing deploys from them>
- Branches: work on `dev` (or a branch from `dev`); only `dev` merges into `main`. **`main` = production** for <which parts>.

## Folder -> where it goes -> how

| Folder | Goes to | Trigger | Check it |
|---|---|---|---|
| `web/` | <host project> (Root Directory `web`) -> <domain> | Automatic on push. `main` = Production, other branches = Preview | `<cli> ls <project>`: newest Production = Ready |
| `app/` JavaScript | Phones via an OTA update | Manual: `<command>` | Update id in the output; log it |
| `app/` native | Store build | Manual: `<command>` | Store console |
| `<backend>/migrations/` | Cloud database | Manual: `<command>` | `<list / dry-run command>` |
| `docs/` | Nowhere | none | none |

Say plainly which folders deploy on push and which need a command.

## Logins on this machine
- <Host CLI>: logged in as <account> (owns <projects>). <Note any second install or `npx` copy that keeps a separate login.>
- <Other CLIs>: <account>.

## After a push to production, verify
1. `<cli> ls <project>` for each auto-deploying host: newest Production = Ready (not Canceled or Error).
2. If a page must show new content: fetch it once with a cache-busting query (`?v=<commit>`); no polling loops.
