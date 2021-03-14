if (!process.env.SITE_URL) {
    console.error(`Please run 'source ${require('path').resolve()}/${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}-conf.sh' command!`);
    process.exit(1);
} else {
    // Set options as a parameter, environment variable, or rc file.
    var require = require("esm")(module/*, options*/);
    module.exports = require("./bin/www").default;
}
