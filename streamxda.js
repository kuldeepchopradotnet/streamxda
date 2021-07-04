




window.onload = () => {
    const APP_CONST = {
        MAIN: 'main',
        CLASS: {
            MAIN_BLOG: 'main-blog'
        }
    }


    function disqusInit() {
        var d = document, s = d.createElement('script'), div = d.createElement('div');
        s.src = 'https://irobohawk.disqus.com/embed.js';
        s.setAttribute('data-timestamp', new Date().getTime().toString());
        (d.head || d.body).appendChild(s);
        div.setAttribute('id', 'disqus_thread');
        var c = d.getElementById('comments');
        //c.innerHTML = '';
        c.appendChild(div);
        var disqus_config = function () {
            this.page.url = location.href;
            this.page.identifier = location.href;
            console.log('disqus_config');
        };
    }

    disqusInit();

    //console.log('DOCUMENT LOADED');
    // const main = document.getElementById(APP_CONST.MAIN);
    // main.classList.add(APP_CONST.CLASS.MAIN_BLOG);


    // console.log('SCRIPTED DONE');
}


