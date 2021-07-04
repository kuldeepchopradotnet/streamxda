(function () {

    const APP_CONST = {
        MAIN = 'main',
        CLASS = {
            MAIN_BLOG = 'main-blog'
        }
    }

    console.log('DOCUMENT LOADED');
    
    const main = document.getElementById(APP_CONST.MAIN);
    main.classList.add(APP_CONST.CLASS.MAIN_BLOG);

    console.log('SCRIPTED DONE');
})();