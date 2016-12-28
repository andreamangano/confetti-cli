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
  // TODO: add watcher for scripts, fonts, images
};

export default watchAll;
