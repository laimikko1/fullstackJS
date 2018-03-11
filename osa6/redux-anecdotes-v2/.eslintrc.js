module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
	"eslint:recommended",
	"plugin:jest/recommended"

	],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
	"jest",
	"babel-eslint"
    ],
    "rules": {
	"strict": 0,
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
