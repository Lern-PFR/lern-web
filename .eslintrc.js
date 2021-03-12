module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "jest": true,
    },
    "rules": {
        "arrow-parens": ["error", "always"],
        "comma-dangle": ["error", {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "always-multiline",
          "exports": "always-multiline",
          "functions": "ignore",
        }],
        "curly": ["error", "all"],
        "function-paren-newline": ["error", "consistent"],
        "import/prefer-default-export": "off",
        "indent": ["error", "tab", { "SwitchCase": 1 }],
		"no-tabs": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
        }],
        "jsx-a11y/label-has-for": "off",
        "max-len": ["warn", 180],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
        "no-plusplus": "off",
        "object-curly-newline": "off",
        "padding-line-between-statements": ["error", { "blankLine": "always", "prev": "*", "next": "return" }],
        "prefer-promise-reject-errors": "off",
        "react/forbid-prop-types": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent": ["error", "tab"],
        "react/jsx-indent-props": ["error", "tab"],
        "react/no-did-update-set-state": "off",
        "react/require-default-props": 0,
		"react/jsx-uses-react": "off", // can be toggled off since react 17 when using eslint-plugin-react
	    "react/react-in-jsx-scope": "off" // can be toggled off since react 17 when using eslint-plugin-react
    },
}
