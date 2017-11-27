import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import readme from '../README.md'
import accessibility from '../A11y.md'
import CONSUMING_COMPONENTS from '../CONSUMING_COMPONENTS.md'
import DEVELOPING from '../DEVELOPING.md'
import TESTING from '../TESTING.md'
import showdown from 'showdown'

const stories = storiesOf('Welcome', module)

const converter = new showdown.Converter()
const accessibilityHtml = converter.makeHtml(accessibility)

stories.addDecorator(withKnobs)

stories.add('Components', () => <div className='markdown-style' dangerouslySetInnerHTML={{ __html: readme}} />)
stories.add('Consuming Components', () => <div className='markdown-style' dangerouslySetInnerHTML={{ __html: CONSUMING_COMPONENTS  }} />)
stories.add('Developing Components', () => <div className='markdown-style' dangerouslySetInnerHTML={{ __html: DEVELOPING  }} />)
stories.add('Testing Components', () => <div className='markdown-style' dangerouslySetInnerHTML={{ __html: TESTING  }} />)
stories.add('Accessibility', () => <div className='markdown-style' dangerouslySetInnerHTML={{ __html: accessibilityHtml }} />)
