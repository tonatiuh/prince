// Load services
require('./services/configuration').start();
require('./services/server')       .start();

// Load routes
require('./routes');
