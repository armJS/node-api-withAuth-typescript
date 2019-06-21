module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
    },
    rules:  {
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/interface-name-prefix': 0,
    },
};