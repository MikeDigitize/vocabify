import { getChromePort, listenForHighlightedText } from './utils/content-utils';

const port = getChromePort();
listenForHighlightedText(port);