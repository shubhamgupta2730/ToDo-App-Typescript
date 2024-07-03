module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Use Prettier for code formatting
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    node: true, // Define global variables available in Node.js
    es6: true, // Enable all ECMAScript 6 features except for modules
  },
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable requirement for explicit return types on functions
    '@typescript-eslint/no-explicit-any': 'warn', // Warn when 'any' type is used
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Error on unused variables, but allow _ prefix to indicate intention
    '@typescript-eslint/no-var-requires': 'error', // Disallow require statements except in import statements
    '@typescript-eslint/consistent-type-imports': 'error', // Enforce consistent usage of type imports

    // General JavaScript/TypeScript rules
    'no-console': 'warn', // Warn on console statements (useful for debugging, but should be avoided in production)
    'no-debugger': 'error', // Disallow use of debugger
    'no-unused-vars': 'off', // Turn off core rule in favor of @typescript-eslint/no-unused-vars
    'prefer-const': 'error', // Prefer const over let where possible
    'no-var': 'error', // Disallow use of var (prefer let and const)
    'prettier/prettier': 'error', // Ensure code follows Prettier formatting

    // Node.js-specific rules
    'callback-return': 'error', // Enforce return after a callback
    'global-require': 'error', // Require all calls to require() to be at the top level of the module
    'handle-callback-err': 'error', // Enforce error handling in callbacks
    'no-mixed-requires': ['error', { grouping: true, allowCall: true }], // Disallow require calls to be mixed with regular variable declarations
    'no-new-require': 'error', // Disallow new require
    'no-path-concat': 'error', // Disallow string concatenation with __dirname and __filename
    'no-process-exit': 'error', // Disallow process.exit()
    'no-sync': 'warn' // Warn on synchronous methods (e.g., fs.readFileSync)
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts']
      }
    }
  }
};
