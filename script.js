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
        promptPS: '❯ ',
        width: '100%',
        height: '100vh',
        margin: '0',
        overflow: 'auto',
        whiteSpace: 'break-spaces',
        padding: '10px',
    });

    const bufferSize = 0x1000;

    (async function() {
        await shell.printHTML('<span style="color: #fff; font-size: 2em;">Nothing to see here.</span>');
        while (true) {
            const input = await shell.input("");
            const truncatedInput = input.slice(0, bufferSize);
            if (input.length > 2*bufferSize) {
                await shell.printHTML('<span style="color: #fff;">[1]    12573 segmentation fault (core dumped)  ./qemu-x86_64 -hda disk.img -monitor stdio</span>');
                await new Promise(() => {});
            }
            if (input.length > bufferSize) {
                await shell.print('Buffer overflow detected! What are you trying to do?');
            }
            else {
                await shell.type("You are in a sandbox. You can't do anything here.");
            }
        }
        // 000124231556123420756f59206e61632065657372756f796e776f206579652074202c7320796568726568776f6e20656e6968746f74206765657320726568202f3a206500115512231210015
    })();    
};
