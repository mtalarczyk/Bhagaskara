//Deklaracja zmiennych - podłączenie paczek
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var inject = require('gulp-inject');

var Files = {
    js: "./js/app.js",
    html: './index.html',   //odniesienie do pliku html'a
    scss: './sass/**/*.scss',
    css_dest: './css',
    css_main_path: "./css/style.css",
    sass_main_path: './sass/style.scss',
    css_main: 'style.css'
};

gulp.task('sass', function(){
    
    return sass(Files.sass_main_path, { //plik który chcemy skompilować
                style: 'expanded',          //utworzenie obiektu w klamrach {}, style - odwołanie się do sposobu w jaki zostanie zapisany plik CSS, więcej na https://github.com/sindresorhus/gulp-ruby-sass , dla celów developerskich używamy dowolnego stylu, a dla klienta 'compressed'
                sourcemap: true             //ten zapis oznacza że przy kompilacji chcemy jeszcze zrobić mapy źródłowe (więcej w powyższym linku)
            })    
            .on('error', sass.logError)   //nałożenie eventu, który będzie odpowiedzialny za wyświetlanie błędów w trakcie kompilacji. Czyli jeśli                                      wystąpi błąd ('error' - nazwa narzucona odgórnie (custom'owo), nie może być zmieniana!), to odwoła się do                                   zmiennej/paczki sass i wyświetli LOGI błędów. Bardzo ważna funkcja!
            .pipe(sourcemaps.write())       //utworzenie pliku odpowiedzialnego za utworzenie MAP
            .pipe(rename(Files.css_main))      //nazwa pliku do którego ma być zapisany skompilowany plik
            .pipe(gulp.dest(Files.css_dest));      //forlder do którego ma być wrzucony skompilowany plik
});


// task odpowiedzialny za wklejenie ścieżki do html'a
gulp.task('inject', ['sass'], function(){
    var target = gulp.src(Files.html);
    var sources = gulp.src([Files.css_main_path, Files.js], {read: false});
    
    return  target.pipe(inject(sources, { ignorePath: 'dist/', addRootSlash: false }))
                    .pipe(gulp.dest("./"))
                    .pipe(browserSync.reload({stream: true}));

});


gulp.task('reload', function(){
    var target = gulp.src(Files.html);
    return target.pipe(browserSync.reload({stream: true}));
});


gulp.task('default', ['inject'], function(){   //wywołanie funkcji inject
    
    browserSync.init({              //inicjalizacja serwera lokalnego
        server: {
            baseDir: "./"
        }
    });
    
    gulp.watch(Files.scss, ['inject']);    // obserwowanie zmian plików SASS
    gulp.watch(Files.js, ['inject']);      // obserwowanie zmian plików JS
    gulp.watch(Files.html, ['reload']);     // obserwowanie zmian plików HTML
    
});