module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'style',
                'test',
                'dependency',
                'build',
                'ci',
                'docs',
                'refactor',
                'revert',
            ],
        ],
    },
};
