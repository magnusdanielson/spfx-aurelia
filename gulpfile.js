'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const { AureliaPlugin } = require("aurelia-webpack-plugin");


build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
      //generatedConfiguration.resolve.modules.push("src");
      generatedConfiguration.module.rules[0].issuer = {
        // only when the issuer is a .js/.ts file, so the loaders are not applied inside templates
        test: /\.[tj]s$/i,
      };

      var rule1 = { test: /\.css$/i,issuer: [{ test: /\.html$/i }], use: "css-loader"} ;
      generatedConfiguration.module.rules.push(rule1)

      var rule2 = { test: /\.ts$/i, use: "ts-loader" };
      generatedConfiguration.module.rules.push(rule2);
      
      var rule3 = { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' };
      generatedConfiguration.module.rules.push(rule3);

      var rule4 = { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' };
      generatedConfiguration.module.rules.push(rule4);
      
      var rule5 = { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2'} } ;
      generatedConfiguration.module.rules.push(rule5); 
      

    generatedConfiguration.plugins.push(new AureliaPlugin(
      {
        aureliaApp: undefined
      }));
      
      console.log(generatedConfiguration.module.rules[0].test);  

    console.log(JSON.stringify(generatedConfiguration));
      return generatedConfiguration;
    }
  });

build.initialize(gulp);
