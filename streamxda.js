




window.onload = () => {
    const APP_CONST = {
        MAIN: 'main',
        CLASS: {
            MAIN_BLOG: 'main-blog'
        },
        ID: {
            COMMENT: 'comments',
            DISQUS: 'disqus_thread'
        },
        TAG: {
            DIV: 'div',
            SCRIPT: 'script'
        },
        ATTRIBUTE: {
            DATE_STAMP: 'data-timestamp',
            ID: 'id'
        },
        DISQUS_SRCIPT_URL: 'https://irobohawk.disqus.com/embed.js'

    }


    function disqusInit() {
        var d = document, c = d.getElementById(APP_CONST.ID.COMMENT);
        if (!c) return;
        var  s = d.createElement(APP_CONST.TAG.SCRIPT), div = d.createElement(APP_CONST.TAG.DIV);
        s.src = APP_CONST.DISQUS_SRCIPT_URL;
        s.setAttribute(APP_CONST.ATTRIBUTE.DATE_STAMP, new Date().getTime().toString());
        (d.head || d.body).appendChild(s);
        div.setAttribute(APP_CONST.ATTRIBUTE.ID, APP_CONST.ID.DISQUS);
        c.appendChild(div);
        var disqus_config = function () {
            this.page.url = location.href;
            this.page.identifier = location.href;
        };
    }

    disqusInit();

    //console.log('DOCUMENT LOADED');
    // const main = document.getElementById(APP_CONST.MAIN);
    // main.classList.add(APP_CONST.CLASS.MAIN_BLOG);


    // console.log('SCRIPTED DONE');
}


