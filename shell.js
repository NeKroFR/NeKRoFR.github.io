/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/js-shell-emulator/jsShell.js":
/*!***************************************************!*\
  !*** ./node_modules/js-shell-emulator/jsShell.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   JsShell: () => (/* binding */ JsShell)\n/* harmony export */ });\n/*! jsShell.js | https://github.com/francoisburdy/js-shell-emulator */\r\n\r\nclass JsShell {\r\n  // Prompt types\r\n  static PROMPT_INPUT = 1;\r\n  static PROMPT_PASSWORD = 2;\r\n  static PROMPT_CONFIRM = 3;\r\n  static PROMPT_PAUSE = 4;\r\n\r\n  constructor(container, options = {}) {\r\n    if (typeof container === 'string') {\r\n      if (container.charAt(0) === '#') {\r\n        container = container.substring(1);\r\n      }\r\n      this.containerNode = document.getElementById(container);\r\n      if (!this.containerNode) {\r\n        throw new Error(`Failed instantiating JsShell object: dom node with id \"${container}\" not found in document.`);\r\n      }\r\n    } else if (container instanceof Element) {\r\n      this.containerNode = container;\r\n    } else {\r\n      throw new Error('JsShell constructor requires parameter \"container\" to be a dom Element or node string ID');\r\n    }\r\n\r\n    this.html = document.createElement('div');\r\n    this.html.setAttribute('tabindex', 0);\r\n    this.html.className = options.className || 'jsShell';\r\n    this._innerWindow = document.createElement('div');\r\n    this._output = document.createElement('p');\r\n    this._promptPS1 = document.createElement('span');\r\n    this._inputLine = document.createElement('span'); // the span element where the users input is put\r\n    this.cursorType = options.cursorType || 'large';\r\n    this.cursorSpeed = options.cursorSpeed || 500;\r\n    this.makeCursor();\r\n    this._input = document.createElement('div'); // the full element administering the user input, including cursor\r\n    this._shouldBlinkCursor = true;\r\n    this.cursorTimer = null;\r\n    this._input.appendChild(this._promptPS1);\r\n    this._input.appendChild(this._inputLine);\r\n    this._input.appendChild(this._cursor);\r\n    this._innerWindow.appendChild(this._output);\r\n    this._innerWindow.appendChild(this._input);\r\n    this.html.appendChild(this._innerWindow);\r\n\r\n    this.setBackgroundColor(options.backgroundColor || '#000')\r\n      .setFontFamily(options.fontFamily || 'Ubuntu Mono, Monaco, Courier, monospace')\r\n      .setTextColor(options.textColor || '#fff')\r\n      .setTextSize(options.textSize || '1em')\r\n      .setForceFocus(options.forceFocus !== false)\r\n      .setPrompt(options.promptPS || '')\r\n      .setWidth(options.width || '100%')\r\n      .setHeight(options.height || '300px')\r\n      .setMargin(options.margin || '0');\r\n\r\n    this.html.style.overflowY = options.overflow || 'auto';\r\n    this.html.style.whiteSpace = options.whiteSpace || 'break-spaces';\r\n    this._innerWindow.style.padding = options.padding || '10px';\r\n    this._input.style.margin = '0';\r\n    this._output.style.margin = '0';\r\n    this._input.style.display = 'none';\r\n\r\n    this.containerNode.innerHTML = '';\r\n    this.containerNode.appendChild(this.html);\r\n  }\r\n\r\n  makeCursor() {\r\n    if (this.cursorType === 'large') {\r\n      this._cursor = document.createElement('span');\r\n      this._cursor.innerHTML = 'O'; // put something in the cursor...\r\n    } else {\r\n      this._cursor = document.createElement('div');\r\n      this._cursor.style.borderRightStyle = 'solid';\r\n      this._cursor.style.borderRightColor = 'white';\r\n      this._cursor.style.height = '1em';\r\n      this._cursor.style.borderRightWidth = '3px';\r\n      this._cursor.style.paddingTop = '0.15em';\r\n      this._cursor.style.paddingBottom = '0.15em';\r\n      this._cursor.style.position = 'absolute';\r\n      this._cursor.style.zIndex = '1';\r\n      this._cursor.style.marginTop = '-0.15em';\r\n    }\r\n    this._cursor.className = 'cursor';\r\n    this._cursor.style.display = 'none'; // then hide it\r\n  }\r\n\r\n  print(message) {\r\n    const newLine = document.createElement('div');\r\n    newLine.textContent = message;\r\n    this._output.appendChild(newLine);\r\n    this.scrollBottom();\r\n    return this;\r\n  }\r\n\r\n  newLine() {\r\n    const newLine = document.createElement('br');\r\n    this._output.appendChild(newLine);\r\n    this.scrollBottom();\r\n    return this;\r\n  }\r\n\r\n  write(message) {\r\n    const newLine = document.createElement('span');\r\n    newLine.innerHTML = `${message}`;\r\n    this._output.appendChild(newLine);\r\n    this.scrollBottom();\r\n    return this;\r\n  }\r\n\r\n  async type(message, speed = 50) {\r\n    const newLine = document.createElement('span');\r\n    newLine.style.borderRight = `${this.cursorType === 'large' ? '9px' : '3px'} solid ${this._cursor.style.color}`;\r\n    this._output.appendChild(newLine);\r\n    const timeout = (ms) => {\r\n      return new Promise(resolve => setTimeout(resolve, ms));\r\n    };\r\n    for await (const char of message) {\r\n      await timeout(speed);\r\n      newLine.textContent += char;\r\n      this.scrollBottom();\r\n    }\r\n    newLine.style.borderRight = 'none';\r\n  }\r\n\r\n  printHTML(content) {\r\n    const newLine = document.createElement('div');\r\n    newLine.innerHTML = `${content}`;\r\n    this._output.appendChild(newLine);\r\n    this.scrollBottom();\r\n    return this;\r\n  }\r\n\r\n  fireCursorInterval() {\r\n    if (this.cursorTimer) {\r\n      clearTimeout(this.cursorTimer);\r\n    }\r\n    this.cursorTimer = setTimeout(() => {\r\n      if (this._shouldBlinkCursor) {\r\n        this._cursor.style.visibility = this._cursor.style.visibility === 'visible' ? 'hidden' : 'visible';\r\n        this.fireCursorInterval();\r\n      } else {\r\n        this._cursor.style.visibility = 'visible';\r\n      }\r\n    }, this.cursorSpeed);\r\n  };\r\n\r\n  scrollBottom() {\r\n    this.html.scrollTop = this.html.scrollHeight;\r\n    return this;\r\n  }\r\n\r\n  async _prompt(message = '', promptType) {\r\n    return new Promise(async(resolve) => {\r\n      const shouldDisplayInput = (promptType === JsShell.PROMPT_INPUT || promptType === JsShell.PROMPT_CONFIRM);\r\n      const inputField = document.createElement('input');\r\n      inputField.setAttribute('autocapitalize', 'none');\r\n      inputField.style.position = 'relative';\r\n      inputField.style.zIndex = '-100';\r\n      inputField.style.outline = 'none';\r\n      inputField.style.border = 'none';\r\n      inputField.style.opacity = '0';\r\n      inputField.style.top = '0'; // prevents from viewport scroll moves\r\n\r\n      this._inputLine.textContent = '';\r\n      this._input.style.display = 'block';\r\n      this.html.appendChild(inputField);\r\n      this.fireCursorInterval();\r\n\r\n      // Show input message\r\n      if (message.length) {\r\n        if (promptType !== JsShell.PROMPT_PAUSE) {\r\n          this.printHTML(promptType === JsShell.PROMPT_CONFIRM ? `${message} (y/n)` : message);\r\n        }\r\n      }\r\n\r\n      inputField.onblur = () => {\r\n        this._cursor.style.display = 'none';\r\n      };\r\n\r\n      inputField.onfocus = () => {\r\n        inputField.value = this._inputLine.textContent;\r\n        this._cursor.style.display = 'inline-block';\r\n      };\r\n\r\n      this.html.onclick = () => {\r\n        if (this.shouldFocus()) {\r\n          inputField.focus();\r\n        }\r\n      };\r\n\r\n      inputField.onkeydown = (e) => {\r\n        if (e.code === 'ArrowUp' || e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowDown' || e.code === 'Tab') {\r\n          e.preventDefault();\r\n        }\r\n        // keep cursor visible while active typing\r\n        this._cursor.style.visibility = 'visible';\r\n      };\r\n\r\n      inputField.onkeyup = (e) => {\r\n        this.fireCursorInterval();\r\n        const inputValue = inputField.value;\r\n        if (shouldDisplayInput && !this.isKeyEnter(e)) {\r\n          this._inputLine.textContent = inputField.value;\r\n        }\r\n\r\n        if (promptType === JsShell.PROMPT_CONFIRM && !this.isKeyEnter(e)) {\r\n          if (!this.isKeyYorN(e)) { // PROMPT_CONFIRM accept only \"Y\" and \"N\"\r\n            this._inputLine.textContent = inputField.value = '';\r\n            return;\r\n          }\r\n          if (this._inputLine.textContent.length > 1) { // PROMPT_CONFIRM accept only one character\r\n            this._inputLine.textContent = inputField.value = this._inputLine.textContent.substr(-1);\r\n          }\r\n        }\r\n\r\n        if (promptType === JsShell.PROMPT_PAUSE) {\r\n          inputField.blur();\r\n          this.html.removeChild(inputField);\r\n          this.scrollBottom();\r\n          resolve();\r\n          return;\r\n        }\r\n\r\n        if (this.isKeyEnter(e)) {\r\n          if (promptType === JsShell.PROMPT_CONFIRM) {\r\n            if (!inputValue.length) { // PROMPT_CONFIRM doesn't accept empty string. It requires answer.\r\n              return;\r\n            }\r\n          }\r\n          this._input.style.display = 'none';\r\n          if (shouldDisplayInput) {\r\n            this.printHTML(this._promptPS1.innerHTML + inputValue);\r\n          }\r\n          if (promptType === JsShell.PROMPT_CONFIRM) {\r\n            const confirmChar = inputValue.toUpperCase()[0];\r\n            if (confirmChar === 'Y') {\r\n              resolve(true);\r\n            } else if (confirmChar === 'N') {\r\n              resolve(false);\r\n            } else {\r\n              throw new Error(`PROMPT_CONFIRM failed: Invalid input (${confirmChar}})`);\r\n            }\r\n          } else {\r\n            resolve(inputValue);\r\n          }\r\n          this.html.removeChild(inputField); // remove input field in the end of each callback\r\n          this.scrollBottom(); // scroll to the bottom of the terminal\r\n        }\r\n      };\r\n      if (this.shouldFocus()) {\r\n        inputField.focus();\r\n      }\r\n    });\r\n  }\r\n\r\n  async expect(cmdList, inputMessage, notFoundMessage) {\r\n    let cmd = await this.input(inputMessage);\r\n    while (!cmdList.includes(cmd)) {\r\n      cmd = await this.input(notFoundMessage);\r\n    }\r\n    return cmd;\r\n  }\r\n\r\n  async input(message) {\r\n    return await this._prompt(message, JsShell.PROMPT_INPUT);\r\n  }\r\n\r\n  async pause(message) {\r\n    this._promptPS1_backup = this._promptPS1.innerHTML;\r\n    this.setPrompt(message);\r\n\r\n    await this._prompt(message, JsShell.PROMPT_PAUSE);\r\n\r\n    this.setPrompt(this._promptPS1_backup);\r\n    this._promptPS1_backup = '';\r\n  }\r\n\r\n  async password(message) {\r\n    return await this._prompt(message, JsShell.PROMPT_PASSWORD);\r\n  }\r\n\r\n  async confirm(message) {\r\n    return await this._prompt(message, JsShell.PROMPT_CONFIRM);\r\n  }\r\n\r\n  clear() {\r\n    this._output.innerHTML = '';\r\n    return this;\r\n  }\r\n\r\n  static async sleep(milliseconds) {\r\n    await new Promise(resolve => setTimeout(resolve, milliseconds));\r\n  }\r\n\r\n  setTextSize(size) {\r\n    this._output.style.fontSize = size;\r\n    this._input.style.fontSize = size;\r\n    return this;\r\n  }\r\n\r\n  setForceFocus(focus) {\r\n    this._forceFocus = !!focus;\r\n    return this;\r\n  }\r\n\r\n  setTextColor(col) {\r\n    this.html.style.color = col;\r\n    this._cursor.style.background = col;\r\n    this._cursor.style.color = col;\r\n    this._cursor.style.borderRightColor = col;\r\n    return this;\r\n  }\r\n\r\n  setFontFamily(font) {\r\n    this.html.style.fontFamily = font;\r\n    return this;\r\n  }\r\n\r\n  setBackgroundColor(col) {\r\n    this.html.style.background = col;\r\n    return this;\r\n  }\r\n\r\n  setWidth(width) {\r\n    this.html.style.width = width;\r\n    return this;\r\n  }\r\n\r\n  setHeight(height) {\r\n    this.html.style.height = height;\r\n    return this;\r\n  }\r\n\r\n  setMargin(margin) {\r\n    this.html.style.margin = margin;\r\n    return this;\r\n  }\r\n\r\n  setBlinking(bool) {\r\n    bool = bool.toString().toUpperCase();\r\n    this._shouldBlinkCursor = (bool === 'TRUE' || bool === '1' || bool === 'YES');\r\n    return this;\r\n  }\r\n\r\n  setPrompt(promptPS) {\r\n    this._promptPS1.innerHTML = promptPS;\r\n    return this;\r\n  }\r\n\r\n  isKeyEnter(event) {\r\n    return event.keyCode === 13 || event.code === 'Enter';\r\n  }\r\n\r\n  isKeyYorN(event) {\r\n    if (event.code) {\r\n      return event.code === 'KeyY' || event.code === 'KeyN';\r\n    }\r\n\r\n    // fix for Chrome Android\r\n    let kCd = event.keyCode || event.which;\r\n    if (event.srcElement && (kCd === 0 || kCd === 229)) {\r\n      const val = event.srcElement.value;\r\n      kCd = val.charCodeAt(val.length - 1);\r\n    }\r\n    return [121, 89, 78, 110].includes(kCd);\r\n  }\r\n\r\n  setVisible(visible) {\r\n    this.html.style.display = visible ? 'block' : 'none';\r\n    return this;\r\n  }\r\n\r\n  shouldFocus() {\r\n    return this._forceFocus ||\r\n      this.html.matches(':focus-within') ||\r\n      this.html.matches(':hover');\r\n  }\r\n\r\n  focus(force = false) {\r\n    const lastChild = this.html.lastElementChild;\r\n    if (lastChild && (this.shouldFocus() || force)) {\r\n      lastChild.focus();\r\n    }\r\n    return this;\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://nekrofr.github.io-master/./node_modules/js-shell-emulator/jsShell.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var js_shell_emulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-shell-emulator */ \"./node_modules/js-shell-emulator/jsShell.js\");\n// Installing dependencies: npm install\r\n// Build the Project: npx webpack\r\n\r\n\r\n\r\nwindow.onload = function() {\r\n    const shell = new js_shell_emulator__WEBPACK_IMPORTED_MODULE_0__.JsShell('#shell', {\r\n        backgroundColor: '#000',\r\n        textColor: '#00ff00',\r\n        className: 'jsShell',\r\n        cursorType: 'large',\r\n        cursorSpeed: 500,\r\n        fontFamily: 'Ubuntu Mono, Monaco, Courier, monospace',\r\n        forceFocus: false,\r\n        textSize: '1em',\r\n        promptPS: '$ ',\r\n        width: '100%',\r\n        height: '100vh',\r\n        margin: '0',\r\n        overflow: 'auto',\r\n        whiteSpace: 'break-spaces',\r\n        padding: '10px',\r\n    });\r\n\r\n    (async function() {\r\n        await shell.printHTML('<span style=\"color: #fff; font-size: 2em;\">Nothing to see here.</span>');\r\n        while (true) {\r\n            await shell.input('');\r\n            await shell.type(`You are in a sandbox.`, 50);\r\n        }\r\n    })();\r\n};\n\n//# sourceURL=webpack://nekrofr.github.io-master/./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script.js");
/******/ 	
/******/ })()
;
