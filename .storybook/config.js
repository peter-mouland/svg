import React from 'react'
import { configure, addDecorator, setAddon } from '@storybook/react'
import infoAddon from '@storybook/addon-info'

import StorybookTheme from './StoryBook'


function addBrowserClassToDocument () {
  var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE '+(tem[1] || '');
  }
  if(M[1]==='Chrome'){
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if(tem!==null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=(ua.match(/version\/(\d+)/i))!==null)) M.splice(1, 1, tem[1]);
  document.documentElement.setAttribute('class', M[0].toLowerCase() + ' ' + M.join('-').toLowerCase())
}

setAddon(infoAddon)

addDecorator((fn, { kind, story }) => {
  addBrowserClassToDocument()
  return (
    <StorybookTheme>
      { (window.self === window.top)
        ? null
        : (
          <nav role='presentation' className='storybook-nav'>
            <div className='xs-row xs-12--none'>
            <span className='xs-10'>
              <div className='xs-row'>
                <span className='storybook-nav__project-text font-standard'>{'Components'}</span>
              </div>
              <span className='storybook-nav__kind-text'>
                <span className='font-bold'>{ kind }</span>
                <div className='font-standard'>{ story }</div>
              </span>
            </span>
            </div>
          </nav>
        )
      }
      <div className='story'>
        {fn()}
      </div>
    </StorybookTheme>
  )
})

const req = require.context(
  '../esnext',   // path where stories live
  true,            // recursive?
  /^((?!node_modules).)*\.story.jsx$/   // story files excluding node_modules
)

function loadStories () {
  require('./index.story.jsx')
  req.keys().forEach((module) => {
    req(module)
  })
}

configure(loadStories, module)
