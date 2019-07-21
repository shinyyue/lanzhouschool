module.exports = {
    presets: [
        ['@vue/app', {
            // polyfills按使用引用，无法预估使用的类型
            // polyfills: [
            //     'es6.promise',
            //     'es6.symbol'
            // ],
            // polyfills引用规则,值有： usage、entry、逐个列举
            useBuiltIns: 'entry'
        }]
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
