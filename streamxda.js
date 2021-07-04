window.onload = () => {

    const APP_CONST = {
        MAIN: 'main',
        CLASS: {
            MAIN_BLOG: 'main-blog'
        }
    }

    console.log('DOCUMENT LOADED');
    const main = document.getElementById(APP_CONST.MAIN);
    main.classList.add(APP_CONST.CLASS.MAIN_BLOG);


    var form = document.getElementById('searchthis')
    var title = document.getElementById('blog-title')
    title.appendChild(form)



    console.log('SCRIPTED DONE');
}