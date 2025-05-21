window.addEventListener('load', function() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let speed = 'unknown';
    
    if (connection) {
        
        speed = connection.effectiveType || 'unknown';
        
       
    }

    
    const contentDiv = document.getElementById('content');
    
    if (speed === 'slow-2g' || speed === '2g') {
        contentDiv.innerHTML = `
            <div class="slow-connection">
                <p>📶 Connection is slow - Loading simplified version...</p>
                <div class="loading-spinner"></div>
            </div>
        `;
    } else {
        
        contentDiv.innerHTML += `
            <p class="connection-info">Your connection: ${speed}</p>
        `;
    }
});