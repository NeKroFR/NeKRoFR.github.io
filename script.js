// Installing dependencies: npm install
// Build the Project: npx webpack

import { JsShell } from 'js-shell-emulator';

window.onload = function() {
    const shell = new JsShell('#shell', {
        backgroundColor: '#000',
        textColor: '#00ff00',
        className: 'jsShell',
        cursorType: 'large',
        cursorSpeed: 500,
        fontFamily: 'Ubuntu Mono, Monaco, Courier, monospace',
        forceFocus: false,
        textSize: '1em',
        promptPS: '$ ',
        width: '100%',
        height: '100vh',
        margin: '0',
        overflow: 'auto',
        whiteSpace: 'break-spaces',
        padding: '10px',
    });

    (async function() {
        await shell.printHTML('<span style="color: #fff; font-size: 2em;">Nothing to see here...</span>');
        while (true) {
            await shell.input('');
            shell.print(`You are in a sandbox.`);
        }
    })();
};