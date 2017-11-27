# Include Svg in your project

 * [Getting Started](#getting-started)
 * [Dependencies](#dependencies)
   * [npm](#npm)
   * [.babelrc](#babelrc)
 * [How-to](#how-to)
   * [Client-side Rendering](#client-side-rendering)
   * [Server-side Rendering](#server-side-rendering)
 * [Why so complex 😭??](#why-so-complex)

## Getting Started


## Dependencies


### npm


### .babelrc


## How-to 

### Client-Side Rendering


### Server-Side Rendering


## Why so complex 😭??
 
### esnext

The small bundles have been achieved by packaging both the compiled (`dist`) files and the origin (`esnext`) files.

The client-side code will consume the `esnext` files via Webpack.  Because we have webpack helping us out, our components are able to include the any css they need directly in the JS file.
The downside of having JS import css directly is that the server (Node) doesn't recognise what a CSS file is.

Before we publish we compile the JS into `dist`.  The compilation stage, also using webpack, removes any CSS imports and replaces any SVG imports with the actual SVG.
This means this `dist` version of the code is perfect for the server to consume.

To bring these techniques together we've altered the `package.json` of each component.  Pointing `main` to the dist version of the package and creating a `esnext` field pointing to the source.
Now node will use `main` and look at dist, and we've told webpack to first use `esnext`.

Simples 👍
