import React, { useState, useEffect, useContext } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2';
import pushid from 'pushid';
// import Pusher from 'pusher-js';
// import axios from 'axios';

// Context
import { CodeContext } from '../../App';

// CSS
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css'

// JS
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchtags'

// Helpers
import { getCodeLocalStorage, addCodeLocalStorage } from '../../helpers/localStorage'

function Playground() {
  const ctxCode = useContext(CodeContext)
  const [id, setId] = useState('');
  const [html, setHtml] = useState(() => getCodeLocalStorage('codeHTML'));
  const [css, setCss] = useState(() => getCodeLocalStorage('codeCSS'));
  const [js, setJs] = useState(() => getCodeLocalStorage('codeJS'));

  useEffect(() => {
    setId(pushid())
  }, [])

  useEffect(() => {
    addCodeLocalStorage('codeHTML', html)
    ctxCode.dispatchCode({
      type: "saveHtml",
      code: html
    })
  }, [html])

  useEffect(() => {
    addCodeLocalStorage('codeCSS', css)
    ctxCode.dispatchCode({
      type: "saveCss",
      code: css
    })
  }, [css])

  useEffect(() => {
    addCodeLocalStorage('codeJS', js)
    ctxCode.dispatchCode({
      type: "saveJs",
      code: js
    })
  }, [js])

  const statusWindows = (mode) => {
    const target = document.getElementsByClassName(`${mode}-code`)[0].childNodes[1];
    target.classList.toggle('hidden')
    setTimeout(() => {
      target.classList.toggle('none')
    }, 100);

  }

  const changeStatus = (e, mode) => {
    if (mode === "html") {
      e.target.classList.toggle("down");
      statusWindows(mode);
    }
    else if (mode === "css") {
      e.target.classList.toggle("down");
      statusWindows(mode)
    }
    else if (mode === "js") {
      e.target.classList.toggle("down");
      statusWindows(mode)
    }
    else return;
  }

  const codeMirrorOptions = {
    theme: 'material',
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchTags: false,
    extraKeys: { "Ctrl-Space": "autocomplete" }
  };

  // console.log("codeContext => ", a)

  return (
    <section className="playground">
      <div className="code-editor html-code">
        <div className="editor-header">
          <div>
            <span>HTML</span>
            <span className="rotate" onClick={(e) => changeStatus(e, "html")}>v</span>
          </div>
        </div>
        <CodeMirror
          value={html}
          options={{
            mode: 'htmlmixed',
            ...codeMirrorOptions,
          }}
          onBeforeChange={(editor, data, html) => {
            setHtml(html);
          }}
        />
      </div>
      <div className="code-editor css-code">
        <div className="editor-header">
          <div>
            <span>CSS</span>
            <span className="rotate" onClick={(e) => changeStatus(e, "css")}>v</span>
          </div>
        </div>
        <CodeMirror
          value={css}
          options={{
            mode: 'css',
            ...codeMirrorOptions,
          }}
          onBeforeChange={(editor, data, css) => {
            setCss(css);
          }}
        />
      </div>
      <div className="code-editor js-code">
        <div className="editor-header">
          <div>
            <span>JavaScript</span>
            <span className="rotate" onClick={(e) => changeStatus(e, "js")}>v</span>
          </div>
        </div>
        <CodeMirror
          value={js}
          options={{
            mode: 'javascript',
            ...codeMirrorOptions,
          }}
          onBeforeChange={(editor, data, js) => {
            setJs(js);
          }}
        />
      </div>
    </section>
  )
}

export default Playground
