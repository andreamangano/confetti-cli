import * as logger from './logger';
const watchAll = (bs, generator, data) => {
  const sources = data.paths.sources;
  // Styles watcher
  // TODO: add error handler on each generator function
  bs.watch(sources.styles).on(
    'change', () => generator.compileStyles(
      data.compilers.sass,
      data.themeConfig).catch(error => logger.error(error))
  );
  // Views watcher
  bs.watch(sources.views).on(
    'change', () => generator.compileViews(data).catch(error => logger.error(error))
  );
  // Javascript watcher
  bs.watch(sources.javascript).on(
    'change', () => generator.compileJavascript().catch(error => logger.error(error))
  );
  // Images watcher
  bs.watch(sources.images).on(
    'change', () => generator.copyImages().catch(error => logger.error(error))
  );
  // Fonts watcher
  bs.watch(sources.fonts).on(
    'change', () => generator.copyFonts().catch(error => logger.error(error))
  );
};
export default watchAll;
