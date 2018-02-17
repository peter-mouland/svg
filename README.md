# React-SVG-context

> An SVG Component to help manage and reuse SVGs with minimal markup

## Intro

SVG's are often at their best when used `inline` within the HTML.  
Apart from usually saving bytes and http requests, this also enables other benefits; including : 
 * the SVG can be written once and reused with minimal markup elsewhere 
 * the SVGs can be styled in multiple ways and for multiple states (e.g. `:hover`) using standard CSS 

## How does this work?

Within your jsx, import an `.svg` and use this component to output the contents inline.

```jsx
import Svg from 'react-svg-context`
import mySvg from './mySvg.svg';

...

<Svg cacheId='my-svg'>{mySvg}</Svg>
...

```

Giving the SVG a `cacheId` means a `symbol` will automatically be created.  
The second time you try to use the same SVG (with the same `cacheId`) the component will save bytes by pointing to the `symbol` rather than output the whole SVG again.33#


## Server-side-rendering (SSR)

SSR can easily be setup by importing `ssr.js` at the top of your server.

```js
import svgSsr from 'react-svg-context/esnext/ssr.js'

svgSsr(options);
```

**options** : [object] _optional_
The options are to be passed staright to `svg-inline-loader` and should directly match your webpack setup

## More Examples

Please take a look at our StoryBook demo and [code](./esnext/svg.story.jsx)

## Whoa, does this React context?

Yup, Further Reading: https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076
