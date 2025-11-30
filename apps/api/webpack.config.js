const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
    return {
        ...options,
        // Only externalize Prisma and native modules
        externals: [
            nodeExternals({
                // Bundle everything except Prisma client and .prisma folder
                allowlist: [/^(?!(@prisma\/client|\.prisma\/client)).*$/]
            }),
        ],
        resolve: {
            ...options.resolve,
            extensionAlias: {
                '.js': ['.ts', '.js'],
                '.mjs': ['.mts', '.mjs'],
            },
        },
        output: {
            ...options.output,
            libraryTarget: 'commonjs2'
        },
        optimization: {
            ...options.optimization,
            minimize: false, // NestJS doesn't need minification
            nodeEnv: 'production'
        }
    };
};