module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
    },
    "rules": {
        "react/jsx-filename-extension": 0,
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/destructuring-assignment": ['never'],
        "react/forbid-prop-types": 0,
        "import/no-extraneous-dependencies": 0,
        "indent": ["error", 4],
        "react/no-unused-state": 0,
        "react/prop-types": ["error", {
            ignore: [
                "children", // ignore children for Context API
                "history" // ignore history for react router
            ],
        }],

        "max-len": ["error", { "code": 140, "tabWidth": 4 }],
        "class-methods-use-this": 0,

        "jsx-a11y/anchor-is-valid": [ "error", {
            "specialLink": [ "to" ],
        }],
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/label-has-for": 0,
        "max-len": ["error", { "code": 9000 }]
    }
};