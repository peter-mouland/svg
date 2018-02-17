import React from 'react'
import { configure } from '@storybook/react'

function loadStories () {
  require('../esnext/svg.story.jsx')
}

configure(loadStories, module)
