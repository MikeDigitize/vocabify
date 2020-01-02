import { getChromePort, listenForHighlightedText } from './utils/content-utils';

/**
 * Creates a port to connect the web page to Vocabify background script
 */
const port = getChromePort();

/**
 * Waits for text to be highlighted in web page and then sends it to the background script
 */
listenForHighlightedText(port);