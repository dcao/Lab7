// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cse110lab6.herokuapp.com/entries')
        .then(response => response.json())
        .then(entries => {
            entries.forEach(entry => {
                let newPost = document.createElement('journal-entry');
                newPost.entry = entry;

                newPost.addEventListener('click', () => {
                    setState({variant: "entry", entry: entry});
                });
                
                document.querySelector('main').appendChild(newPost);
            });
        });
});

document.querySelector('header h1').addEventListener('click', () => {
    if (history.state != null && history.state.variant != 'home') {
        setState({variant: 'home'});
    };
});

document.querySelector('header img').addEventListener('click', () => {
    setState({variant: 'settings'});
});

window.addEventListener('popstate', (event) => {
    setState(event.state, true);
}); 
