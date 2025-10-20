# DevUI CLI

A CLI tool for adding DevUI components to your project, similar to shadcn/ui.

## Usage

### Install a component from URL:

```bash
bunx devvarena-ui-cli@latest add https://your-site.com/api/r/card/profile-card
```

### Options:

- `-p, --path <path>`: Specify installation path (default: `./src/components/ui`)

## Example

```bash
# Add profile card component
bunx devvarena-ui-cli@latest add https://your-site.com/api/r/card/profile-card

# Add to custom path
bunx devvarena-ui-cli@latest add https://your-site.com/api/r/card/profile-card -p ./components
```

## Publishing

To publish your CLI to npm:

1. Update version in `package.json`
2. Build the package: `npm run build`
3. Publish: `npm publish`

Then users can run:

```bash
bunx your-cli-name@latest add https://your-site.com/api/r/component-name
```
