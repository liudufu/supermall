// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias:{
//         'assets': 'src/assets',
//         'common': 'src/common',
//         'components': 'src/components',
//         'network': 'src/network',
//         'views': 'src/views'
//       }
//     }
//   }
// }
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack:(config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('components', resolve('./src/components'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
  }
}
