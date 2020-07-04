# GitHub Action - Cascades
This GitHub action cascades releases to other repositories 

![Github JavaScript Actions CI/CD](https://github.com/dolittle/repository-here/workflows/Github%20JavaScript%20Actions%20CI/CD/badge.svg)

### Pre requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow) is available below.

For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)

### Inputs
- `token`: The token to use for the GitHub API. default: ${{ github.token }}
- `version` (required): The version the triggered the cascades
- `cascades` (required): A comma separated list of the owner/repo GitHub repositories that should be cascaded

### Example Workflow
```yaml
on:
  push:
    branches:
    - '**'
  pull_request:
    types: [closed]

name: Cascades

jobs:
  context:
    name: Cascades
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Trigger cascades
        uses: dolittle/cascades-action@v1
        with:
          version: 2.0.0
          cascades: other/repo,another/repo
        
```

## Contributing
We're always open for contributions and bug fixes!

### Pre requisites
node <= 12
yarn
git
