var SvgStore = require('webpack-svgstore-plugin');

module.exports = {
    plugins: [
        new SvgStore({
            svgoOptions: {
                plugins: [
                    { removeTitle: true },
                    { path: './../../src/assests/icons/*.svg', name: 'assets/icons/sprite.svg'}
                ]
            },
            prefix: 'icon-'
        })
    ]
}