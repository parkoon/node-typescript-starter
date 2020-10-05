import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
    '@': path.join(__dirname, 'src'),
    '@Exceptions': path.join(__dirname, 'src/exceptions'),
    '@Commands': path.join(__dirname, 'src/commands'),
    '@Controllers': path.join(__dirname, 'src/controllers'),
    '@Helpers': path.join(__dirname, 'src/helpers'),
    '@Interfaces': path.join(__dirname, 'src/interfaces'),
    '@Middleware': path.join(__dirname, 'src/middleware'),
    '@Models': path.join(__dirname, 'src/models'),
    '@Routes': path.join(__dirname, 'src/routes'),
});
