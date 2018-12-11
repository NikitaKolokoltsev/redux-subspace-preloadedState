const babelConfig = require('./babel.config.js');

require("@babel/register")({
  ignore: [ /node_modules/ ],
  ...babelConfig
});

const script = require('./src/index.js');

script();
