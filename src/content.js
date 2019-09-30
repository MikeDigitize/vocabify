/**
 * 
 */
console.log('in!');
window.addEventListener('click', function(e) {
    console.log('click', window.getSelection().toString(), window.location.href);
});