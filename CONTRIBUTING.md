# Contributing to Redirect Mapper Pro

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/redirect-mapper-pro.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Create a branch: `git checkout -b feat/your-feature`

## Branch Naming

- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code refactoring
- `test/` — Adding or updating tests

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add nginx export format
fix: correct URL normalization for encoded characters
docs: update README with new export formats
test: add matching algorithm edge cases
```

## Pull Request Process

1. Ensure all tests pass: `npm run test`
2. Ensure the build succeeds: `npm run build`
3. Ensure linting passes: `npm run lint`
4. Update documentation if needed
5. Submit your PR with a clear description

## Adding Translations

To add a new language:

1. Copy `src/messages/en.json` to `src/messages/[locale].json`
2. Translate all values (keep keys unchanged)
3. Add the locale to `src/i18n/routing.ts`
4. Add the locale to `middleware.ts` matcher
5. Add the locale to `generateStaticParams()` in `src/app/[locale]/layout.tsx`

## Code Style

- TypeScript strict mode is enforced
- Use functional components with hooks
- Follow existing naming conventions
- Keep components focused and small

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
