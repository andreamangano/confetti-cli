const watchAll = (bs, generator, data) => {
  const sources = data.paths.sources;
  // Styles watcher
  bs.watch(sources.styles).on(
    'change', () => generator.compileStyles(data.compilers.sass, data.themeConfig)
  );
  // Views watcher
  bs.watch(sources.views).on(
    'change', () => generator.compileViews(data)
  );
  // Javascript watcher
  bs.watch(sources.javascript).on(
    'change', () => generator.compileJavascript()
  );
  // Images watcher
  bs.watch(sources.images).on(
    'change', () => generator.copyImages()
  );
  // Fonts watcher
  bs.watch(sources.fonts).on(
    'change', () => generator.copyFonts()
  );
};
export default watchAll;
