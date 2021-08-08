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
                    debugger;
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

        const img = `data:image/jpeg;base64,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`


        const MOKE_POST = [{
            title: 'How to make pen drive',
            description: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            , date: new Date(),
            img
        }, {
            title: 'Top 10 facts of SUN',
            description: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            , date: new Date(),
            img
        }, {
            title: 'DIY cardboard vr box',
            description: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            , date: new Date(),
            img
        },
        {
            title: 'DIY cardboard vr box',
            description: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            , date: new Date(),
            img
        }, {
            title: 'DIY cardboard vr box',
            description: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            , date: new Date(),
            img
        }, {
            title: 'DIY cardboard vr box',
            description: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            , date: new Date(),
            img
        }]






