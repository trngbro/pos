const exphbs = require('express-handlebars');

var hbs = create({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
      foo() { return 'FOO!'; },
    },
});


module.exports = {
  configureHandlebars: (app) => {
    app.engine('handlebars', hbs.engine());
    app.set('view engine', 'hbs');
    app.set("views", "views");
  },
};
