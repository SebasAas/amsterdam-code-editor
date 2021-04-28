import React, { useEffect, useRef, useContext } from 'react'
import { CodeContext } from '../../App';

function Display() {
  const { code } = useContext(CodeContext)
  const iframe = useRef('');

  const { html, css, js } = code

  useEffect(() => {
    runCode();
  }, [code])

  const runCode = () => {
    const document = iframe.current.contentDocument;
    const documentContents = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          <style>
            body {
              font-family: "Poppins", sans-serif;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script type="text/javascript">
            ${js}
          </script>
        </body>
        </html>
      `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  return (
    <section className="result">
      <iframe title="result" className="iframe" ref={iframe} />
    </section>
  )
}

export default Display
