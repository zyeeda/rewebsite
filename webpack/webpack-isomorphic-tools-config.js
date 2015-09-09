var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = {
  webpack_assets_file_path: 'webpack-stats.json',

  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },

    style_modules: {
      extension: 'scss',
      filter: function(m, regex, options, log) {
        if (!options.development) return regex.test(m.name)

        // Filter by modules with '.scss' inside name string, that also have name and moduleName that end with 'ss'(allows for css, less, sass, and scss extensions).
        // This ensures that the proper scss module is returned, so that namePrefix variable is no longer needed.
        return (regex.test(m.name) && m.name.slice(-2) === 'ss' && m.reasons[0].moduleName.slice(-2) === 'ss')
      },
      naming: function(m, options, log) {
        // Find index of '/src' inside the module name, slice it and resolve path.
        var srcIndex = m.name.indexOf('/src')
        var name = '.' + m.name.slice(srcIndex)
        // TODO: Does it need to resolve Windows path problems?
        return name
      },
      parser: function(m, options, log) {
        if (m.source) {
          var regex = options.development ? /exports\.locals = ((.|\n)+);/ : /module\.exports = ((.|\n)+);/;
          var match = m.source.match(regex);
          return match ? JSON.parse(match[1]) : {};
        }
      }
    }
  }
}
