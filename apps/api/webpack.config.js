const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
    return {
        ...options,
        externals: [
            nodeExternals(),
        ],
        resolve: {
            ...options.resolve,
            extensionAlias: {
                '.js': ['.ts', '.js'],
                '.mjs': ['.mts', '.mjs'],
            },
        },
    };
};
