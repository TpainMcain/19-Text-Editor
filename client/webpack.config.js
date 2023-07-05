const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Define development mode
    mode: 'development',

    // Define the entry points for the application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },

    // Define the output configuration
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // Define the plugins to be used by Webpack
    plugins: [
      // HtmlWebpackPlugin generates an HTML file, injects the output bundles and takes care of assets inclusion
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // InjectManifest is a Workbox plugin that creates a list of local files that should be precached
      // This helps with offline functionality for your web app
      new InjectManifest({
        swSrc: './src-sw.js',   // source of our service worker file
        swDest: 'src-sw.js',    // output destination of our service worker file
      }),

      // WebpackPwaManifest generates a manifest for a Progressive Web App (PWA)
      // This helps with installing the web app to a user's device and customizing the splash screen/loading appearance
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],   // icon sizes that will be generated
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // Define the loaders (transformations) to be used by Webpack
      rules: [
        // Define a rule for .css files to be handled by style-loader and css-loader
        // style-loader adds CSS to the DOM by injecting a <style> tag
        // css-loader interprets @import and url() like import/require() and will resolve them
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Define a rule for .js files to be handled by babel-loader
        // babel-loader transpiles JavaScript files using Babel and webpack
        {
          test: /\.m?js$/,
          exclude: /node_modules/,  // exclude the node_modules folder
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],  // preset-env is a smart preset that allows you to use the latest JavaScript
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // transform-runtime plugin avoids duplication in your compiled output
            },
          },
        },
      ],
    },
  };
};
