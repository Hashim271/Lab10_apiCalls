// Task 1: GET with fetch()
document.getElementById('fetchButton').addEventListener('click', function () {
    const display = document.getElementById('dataDisplay');
    display.innerHTML = '<p class="loading">Loading post #1...</p>';

    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            display.innerHTML = `
                <div class="post">
                    <h3>${data.title}</h3>
                    <p>${data.body}</p>
                    <small>Post ID: ${data.id} • Fetched with fetch()</small>
                </div>
            `;
        })
        .catch(error => {
            display.innerHTML = `<p class="error">Failed to load: ${error.message}</p>`;
        });
});

// Task 2: GET with XMLHttpRequest
document.getElementById('xhrButton').addEventListener('click', function () {
    const display = document.getElementById('dataDisplay');
    display.innerHTML = '<p class="loading">Loading post #2...</p>';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            display.innerHTML = `
                <div class="post">
                    <h3>${data.title}</h3>
                    <p>${data.body}</p>
                    <small>Post ID: ${data.id} • Fetched with XMLHttpRequest</small>
                </div>
            `;
        } else {
            display.innerHTML = `<p class="error">Failed to load: ${xhr.statusText}</p>`;
        }
    };

    xhr.onerror = function () {
        display.innerHTML = '<p class="error">Network request failed</p>';
    };

    xhr.send();
});

// Task 3: POST with fetch()
document.getElementById('postForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const messageEl = document.getElementById('postMessage');
    const display = document.getElementById('dataDisplay');
    messageEl.innerHTML = '<p class="loading">Creating post...</p>';

    const postData = {
        title: document.getElementById('postTitle').value,
        body: document.getElementById('postBody').value,
        userId: 1
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`); //error
            return response.json();
        })
        .then(data => {
            messageEl.innerHTML = '<p class="success">Post created successfully!</p>';
            display.innerHTML = `
            <div class="post"> 
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <small>New post ID: ${data.id}</small>
            </div>
        `; //new post
            this.reset();
        })
        .catch(error => {
            messageEl.innerHTML = `<p class="error">Failed to create post: ${error.message}</p>`;
        });
});

// Task 4: PUT with XMLHttpRequest
document.getElementById('putForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const messageEl = document.getElementById('putMessage');
    const display = document.getElementById('dataDisplay');
    const postId = document.getElementById('putId').value;

    // Validate ID
    if (!postId || postId < 1 || postId > 100) {
        messageEl.innerHTML = '<p class="error">Please enter a valid ID (1-100)</p>'; //last digit of post id
        return;
    }

    messageEl.innerHTML = '<p class="loading">Updating post...</p>';

    const putData = {
        id: postId,
        title: document.getElementById('putTitle').value,
        body: document.getElementById('putBody').value,
        userId: 1
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            messageEl.innerHTML = '<p class="success">Post updated successfully!</p>';
            display.innerHTML = `
                <div class="post">
                    <h3>${data.title}</h3>
                    <p>${data.body}</p>
                    <small>Updated post ID: ${data.id}</small>
                </div>
            `;
            e.target.reset();
        } else {
            messageEl.innerHTML = `<p class="error">Failed to update: ${xhr.statusText}</p>`;
        }
    };

    xhr.onerror = function () {
        messageEl.innerHTML = '<p class="error">Network request failed</p>';
    };

    xhr.send(JSON.stringify(putData));
});

// Not sure how to get rid of lorep ipsum on first fetch() or XHR 