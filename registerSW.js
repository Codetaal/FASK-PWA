if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/study-dutch/sw.js', { scope: '/study-dutch/' })})}