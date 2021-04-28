import React from 'react'

function Editor(codeValue, codeOptions, onBeforeChange) {
  return (
    <CodeMirror
      value={codeValue}
      options={codeOptions}
      onBeforeChange={onBeforeChange}
    />
  )
}

export default Editor
