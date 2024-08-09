# This repository contains

## Skeleton SF Project
Based on [Hutte Project Template](https://github.com/hutte-recipes/hutte-project-template)

## Sample source and GitHub Actions to build/promote/install package versions

Check [Creating a 2GP for AppExchange](https://hutte-io.notion.site/Creating-a-2GP-for-AppExchange-c3a92c93261d4cb1a658fff696622bdb) for learning more about generating your first 2GP

When using this template, please make sure to replace the namespace Hutte in all files inside the force-app directory (replace Hutte__ with YourNamespace__) as well as in sfdx-project.json (property "namespace").

The GitHub actions shipped with this package:

- create a package build when a pull request gets opened which follows semantic release convention
- create a package versions, promotes it and installs it to a target org when a PR following semantic release convention gets merged

> This recipe uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) with [semantic-release-sfdx](https://github.com/leboff/semantic-release-sfdx) to create package versions based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Setup: Create Secrets

Create the following two GitHub Action Secrets (`Settings > Secrets and variables > Actions > New repository secret`) to allow the GitHub action access to your Dev Hub (required to create package versions) and to a target org where you want to automatically install each new package version:

```console
sf org display --verbose --json -o <MY_DEVHUB_ALIAS>
```

Copy the value of `sfdxAuthUrl` to the clipboard.

| Name                       | Secret                    |
| -------------------------- | ------------------------- |
| `SFDX_AUTH_URL_DEVHUB`     | `<PASTE_THE_sfdxAuthUrl>` |

```console
sf org display --verbose --json -o <MY_TARGETORG_ALIAS>
```

Copy the value of `sfdxAuthUrl` to the clipboard.

| Name                       | Secret                    |
| -------------------------- | ------------------------- |
| `SFDX_AUTH_URL_TARGETORG`     | `<PASTE_THE_sfdxAuthUrl>` |