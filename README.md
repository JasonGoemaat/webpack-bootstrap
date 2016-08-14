# Purpose

This is a sample repository I used to figure out how to use webpack to
compile custom sass into a css file.

First 'working' version had a key of reading the css-loader docs and using
an option to disable handling of url(), otherwise webpack would try to find
and require the font files:

    'css?-url'

## Steps:

First, have to create a `styles.js` file that 'requires' my sass file:

    var x = require('./main.scss');

And include it in the entries along with my 'main' js file (needed even though
I don't care about it):

    entry: {
        "app": ["./src/main.js", "./src/styles.js"]
    },

Now we need a loader to handle `*.scss` files:

    { test: /\.scss$/, loaders: [
            {
                loader: 'file',
                query: {
                    name: '[name].css'
                }
            }, 'extract', 'css?-url', 'sass' // compile with sass, then css, then extract to file
        ] 
    }

The 'test' tells it to handle any file ending in `.scss` using a regular
expression.  The 'loaders' array is processed in reverse order.  So first
the 'sass' loader is used.  Then the 'css' loader is used, with the option
that disables processing `url()` in the css file so that it doesn't try
to 'require' fonts and images.  Then the 'extract' loader (which is designed
to handle output from the html or css loader).  Then theh 'file' loader
is used to create a '.css' file with the same name as the input file.

I think '.scss' needs to be in the resolve extensions array:

    resolve: {
        extensions: ['', '.css', '.sass', '.scss', '.js',

And finally, I use the CopyWebpackPlugin to copy the font files from
bootstrap-sass:

    new CopyWebpackPlugin([
        {
            from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
            to: 'assets/fonts',
            flatten: true
        }
    ]),

So since all of the font files in the `assets/fonts` subdirectory of the
`dist` folder, I need to set the bootstrap sass variable so the css file
points to the right place and import the bootstrap sass:

    $icon-font-path: 'assets/fonts/';
    @import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
