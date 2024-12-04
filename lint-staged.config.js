export default {
  '**/*.{ts,tsx,js,jsx}': (stagedFiles) => [
    `eslint . --fix`,
    `prettier --write ${stagedFiles.join(' ')}`
  ]
}
