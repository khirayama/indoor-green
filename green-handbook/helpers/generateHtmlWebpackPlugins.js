const HtmlWebpackPlugin = require('html-webpack-plugin');

const { Resource } = require('publisher');

Resource.init();

// options
// - locale
// - use key
function generateHtmlWebpackPlugins(config) {
  const entrypoints = [];
  const plugins = [];

  const localeUrls = ['/'];

  if (config.locales.length > 1) {
    for (let i = 0; i < config.locales.length; i += 1) {
      const locale = config.locales[i];
      localeUrls.push(`/${locale}`);
    }
  }

  for (let i = 0; i < localeUrls.length; i += 1) {
    const baseUrl = localeUrls[i];

    entrypoints.push(baseUrl);

    for (let j = 0; j < config.resourceTypes.length; j += 1) {
      const resourceType = config.resourceTypes[j];
      entrypoints.push(`${baseUrl === '/' ? '' : baseUrl}/${resourceType.name}`);

      for (let k = 0; k < Resource.rows.resources.length; k += 1) {
        const row = Resource.rows.resources[k];
        if (row.type === resourceType.type) {
          entrypoints.push(`${baseUrl === '/' ? '' : baseUrl}/${resourceType.name}/${row.key || row.id}`);
        }
      }
    }
  }

  return entrypoints.map((entrypoint) => {
    return new HtmlWebpackPlugin({
      template: './helpers/renderer.tsx',
      filename: `.${entrypoint === '/' ? '' : entrypoint}/index.html`,
      inject: false,
    });
  });
}

module.exports = generateHtmlWebpackPlugins;
