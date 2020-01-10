import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';

export default function App() {

  document.addEventListener(
    'visibilitychange',
    function() {
      if (!document.hidden) {
        location.reload(true);
      }
    },
    false
  );

  return (
    <Container />
  )
  
}

ReactDOM.render(<App />, document.getElementById('vocabify'));

/**
 * 
 * 
 */

// fetch('https://words.bighugelabs.com/api/2/572698ba07a9e0baa4543f8df1889d3b/advocate/json').then(function(response) { 
// 	// Convert to JSON
// 	return response.json();
// }).then(function(j) {
// 	// Yay, `j` is a JavaScript object
// 	console.log(j); 
// });
