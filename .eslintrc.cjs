module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
    },
};
