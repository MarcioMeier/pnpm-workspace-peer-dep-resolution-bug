## PNPM workspace peer dependencies bug scenario
The PNPM currently has a bug that the packages managed by the pnpm workspace doesn't declare its peer dependencies like a published library.
This issue make impossible to use peer dependencies between workspace packages.

### Use case
The `packages/package-b` has declared `zod` as peer dependency
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

In the `packages/package-a` we have declared the `zod` library and the `package-b` as dependencies:

```json
{
  "dependencies": {
    "zod": "3.22.4",
    "package-b": "workspace:*"
  }
}
```

It was expected the `package-a` to not break as the `package-b` should use the `zod` version declared in the `package-a`.

## How to reproduce
```bash
nvm install # install the node version
nvm use # use the node version

corepack enable # enables the corepack
corepack prepare # prepare the pnpm version

pnpm install

# build the package-b
pnpm --filter ./packages/package-b run build

# build the package-a (will break with typescript error due to zod version miss match)
pnpm --filter ./packages/package-a run build
```