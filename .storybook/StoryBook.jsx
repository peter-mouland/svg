import React from 'react'
import PropTypes from 'prop-types'
import styles from './storybook.scss'

const StorybookTheme = ({ children }) => (
  <div className={styles.story}>
    {children}
  </div>
)
StorybookTheme.propTypes = { children: PropTypes.node }

export default StorybookTheme
