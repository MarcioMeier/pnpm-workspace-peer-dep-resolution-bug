## PNPM workspace peer dependencies bug scenario
The PNPM currently has a bug that the packages managed by the pnpm workspace doesn't declare its peer dependencies like a published library.
This issue make impossible to use peer dependencies between workspace packages.

### Use case
The `packages/package-a` has declared `zod` as peer dependency
```json
{
  "dependencies": {
    "zod": "^3.23.8"
  },
  "peerDependencies": {
    "zod": ">=3"
  }
}
```

In the `packages/package-b` we have declared the `zod` library and the `package-a` as dependencies:

```json
{
  "dependencies": {
    "zod": "3.22.4",
    "package-a": "workspace:*"
  }
}
```

It was expected the `package-b` not break as the `package-a` should use the `zod` version declared in the `package-b`.

## How to reproduce
```bash
nvm install # install the node version
nvm use # use the node version

corepack enable # enables the corepack
corepack prepare # prepare the pnpm version

pnpm install

# build the package-a
pnpm --filter ./packages/package-a run build

# build the package-b (will break with typescript error due to zod version miss match)
pnpm --filter ./packages/package-b run build
```