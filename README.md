# spfx-aurelia
Use Aurelia with SharePoint Framework (SPFx). The repository contains a working example of the traditional Aurelia Skeleton Navigation project.

If you have questions you can reach me @magnusdanielson on Twitter.

It is tested on the below versions of node and npm.

npm --v
3.10.8

node -v
v6.11.5

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO