import React from 'react';
import styles from './styles.css'

// Dumb component that renders a section with header, optional message, result and an input
function Section(props) {
  const { header, message, result, inputPlaceholder, onInputChange, ..._props } = props;
  return <section className={styles.section} {..._props}>
    <div className={styles.header}> {header}</div>
    <input placeholder={inputPlaceholder} size="30" onChange={onInputChange}/>
    { message  ? <span className={styles.message}>{message}</span> : null}
    { result  ? <span className={styles.result}>{result}</span> : null}
  </section>
}