import { readFileSync } from 'node:fs';

const packageName = JSON.parse(readFileSync('sfdx-project.json', 'utf8')).packageDirectories.find(
    (packageDirectory) => packageDirectory.default
).package;

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/exec',
            {
                shell: '/bin/bash',
                // create package version for default package directory
                publishCmd: `sf package version create --package "${packageName}" --version-number "\${nextRelease.version}.NEXT" --installation-key-bypass --code-coverage --wait 30 --json`,
                // output package version id for GitHub Actions
                // promote package version
                successCmd: `echo "packageVersionId=\${releases[0].result.SubscriberPackageVersionId}" >> "\${process.env.GITHUB_OUTPUT}";
                    echo "version=\${releases[0].result.VersionNumber}" >> "\${process.env.GITHUB_OUTPUT}";
                    sf package version promote --package "\${releases[0].result.SubscriberPackageVersionId}" --no-prompt --json`
            }
        ],
        '@semantic-release/github'
    ]
};
