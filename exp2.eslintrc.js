module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: ["airbnb", "prettier"],
  plugins: ["react", "jsx-a11y", "import", "react-hooks", "prettier"],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    // "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "allowShortCircuit": 0,
    "linebreak-style": 0,
    "max-len": [
      "error",
      {
        code: 120
      }
    ],
    "indent": [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    "semi": [2, "never"],
    "comma-dangle": ["off"],
    "import/extensions": 0,
    "no-unused-vars": ["warn"],
    "no-nested-ternary": ["off"],
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true
      }
    ],
    "object-curly-spacing": ["off"],
    "padded-blocks": ["off"],
    "react/jsx-closing-bracket-location": ["off"],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "react/jsx-space-before-closing": ["off"],
    "react/jsx-closing-tag-location": ["off"],
    "react/prefer-stateless-function": ["off"],
    "react/jsx-indent": [0, 0],
    "react/jsx-indent-props": [0, 0],
    "react/prop-types": 0,
    "no-underscore-dangle": [
      "error",
      {
        allowAfterThis: true
      }
    ],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": [
      "error",
      {
        ignore: [
          "core",
          "api",
          "ui",
          "storage",
          "helpers",
          "models",
          "config",
          "axiosConfig",
          "modules",
          "appConfig",
          "workflows"
        ]
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"]
      }
    ]
  }
};
