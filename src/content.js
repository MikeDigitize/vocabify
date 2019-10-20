import { getChromePort, listenForHighlightedText } from './utils';

const port = getChromePort();
listenForHighlightedText(port);