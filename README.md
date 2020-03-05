# Creative Commons Web Component Generator

This is the repository that generate the code that is published in npm. To use the package check [his storybook](https://tx2z.github.io/creativecommons-webcomponent/) or [the package in the npm repository](https://www.npmjs.com/package/creative-commons-web-component).

This project is created with [wc-base-typescript](https://github.com/tx2z/wc-base-typescript). A project to create isolated web components with typescript

Uses:

* [typescript](https://www.typescriptlang.org/)
* [rollup](https://rollupjs.org/)
* [karma](https://karma-runner.github.io/)
* [jasmine](https://jasmine.github.io/)
* [storybook](https://storybook.js.org/)

## Contribute

Download this project for local development of web the components.

Once the project is on your computer, enter the folder and install all npm dependencies:

``` bash
npm i
```

The components are stored in "[src/components](src/components)".

To run a server in development mode run:

``` bash
npm start
```

The components will be compiled every time you save a file.

## Tests

[Karma](https://karma-runner.github.io/) & [jasmine](https://jasmine.github.io/) are used as testing environment and framework.

Inside the component folder, there is a file ending with "**spec.ts**" that include the tests.

To run the test use:

``` bash
npm test
```

## Storybook

There are two files inside the component folder that are used by storybook.

* **@component.stories.ts**: Is the file to create the story for the component.

* **README.md**: It's used to add documentation for the component using the [Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes) storybook addon.

Run storybook with:

``` bash
npm run storybook
```

## Build the component

``` bash
npm run build
```

You can find the builds in the "dist" folder.

The component will be compiled in a js file (as [ES module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)), to use it as module in any application, and in a dist.js (as [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)), to use it directly in browsers, with the same name you give to the folder in "[src/components](src/components)".

All modules include their respective [Typescript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).
