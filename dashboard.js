
console.log('location.pathname', location.pathname)
if(location.pathname === '/'){
document.getElementsByClassName("page").item(0).style.display = "none"
const DIV = 'div',
            BODY = 'body',
            GRID_CONTAINER = 'grid-container',
            GRID_ITEM = 'grid-item',
            H1 = 'h1',
            IMG = 'img',
            TITLE = 'title',
            GRID_IMG = 'grid-img',
            A = 'a',
            NEXT_BTN = 'next-btn'

        async function loadApp() {
            renderPostUI();
        }


        async function renderPostUI(nextPageToken = "", isEventRegistered = false) {
            const post = await getPosts(nextPageToken);
            if (!post) {
                return;
            }
            const posts = post.posts;
            const gridlen = posts.length;
            let container, body;
            if (!isEventRegistered) {
                container = document.createElement(DIV);
                container.classList.add(GRID_CONTAINER);
                container.setAttribute('id', GRID_CONTAINER);
                body = document.getElementById(BODY);
            }
            else {
                container = document.getElementById(GRID_CONTAINER);
                const nextBtn = document.getElementById(NEXT_BTN);
                nextBtn.setAttribute('data-id', post.nextPageToken);
            }

            for (let i = 0; i < gridlen; i++) {
                const post = posts[i];
                const grid = document.createElement(DIV);
                grid.classList.add(GRID_ITEM);
                const h1 = document.createElement(H1);
                const alink = document.createElement(A);
                alink.href = post.url;
                h1.classList.add(TITLE);
                h1.textContent = post.title;
                const img = document.createElement(IMG);
                img.src = post.img;
                img.classList.add(GRID_IMG);
                alink.appendChild(h1);
                alink.appendChild(img);
                grid.appendChild(alink);
                container.appendChild(grid);
            }

            body && body.append(container);


            if (post && post.nextPageToken && !isEventRegistered) {
                const nextbtn = document.createElement(DIV);
                nextbtn.classList.add(NEXT_BTN);
                nextbtn.textContent = 'Show More...';
                nextbtn.setAttribute('id', NEXT_BTN);
                nextbtn.setAttribute('data-id', post.nextPageToken)
                nextbtn.addEventListener('click', ($event) => {
                    const nextPageToken = $event.target.getAttribute('data-id');
                    console.log('nextbtn clicked', $event);
                    renderPostUI(nextPageToken, true);
                });
                body.append(nextbtn);
            }
        }


        async function getPosts(nextToken = '') {
            console.log('nextToken', nextToken);
            let url = 'https://www.googleapis.com/blogger/v3/blogs/4489368836732156761/posts?status=live&maxResults=5&fetchBodies=false&fetchImages=true&key=AIzaSyBaYgrLt6mRIYL2N5pAXWGTBx5-tT8LF30';
            if (nextToken) {
                url += '&pageToken=' + nextToken;
            }
            const blog = await this.sendHttpGetRequest(url, true);
            const posts = blog.items.map(p => {
                let img = ''
                try {
                    img = p.images[0].url;
                } catch (error) { }

                return {
                    img,
                    date: p.published,
                    title: p.title,
                    url: p.url
                }
            });
            console.log('blog.nextPageToken', blog.nextPageToken)
            return {
                posts,
                nextPageToken: blog.nextPageToken
            };
        }

        function sendHttpGetRequest(url, forceJsonParse = false) {
            return new Promise((resolve, rej) => {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let result = xhttp.responseText;
                        if (forceJsonParse) {
                            result = JSON.parse(result);
                        }
                        resolve(result);
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send();
            });
        }

}


