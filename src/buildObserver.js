import Generator from 'confetti-generator';
import configLoader from './config-loader';
import Loader from 'confetti-loader';
import * as logger from './logger';
class BuildObserver {
  constructor(id, subject) {
    this.id = id;
    this.subject = subject;
    this.deck = null;
    this.generator = null;
    this.loader = new Loader();
    this.subject.addListener('serverInit', data => this.onServerInit(data));
    this.subject.addListener('coverChange', data => this.onCoverChange(data));
    this.subject.addListener('stylesChange', data => this.onStylesChange(data));
    this.subject.addListener('viewsChange', data => this.onViewsChange(data));
    this.subject.addListener('javascriptChange', data => this.onJavascriptChange(data));
    this.subject.addListener('imagesChange', data => this.onImagesChange(data));
    this.subject.addListener('fontsChange', data => this.onFontsChange(data));
    this.subject.addListener('settingsChange', data => this.onSettingsChange(data));
  }

  generateDeck(cb) {
    this.generator.generate(this.deck)
      .then(() => {
        logger.success('Slide deck has been created.');
        if (cb) {
          cb();
        }
      })
      .catch(error => logger.error(error));
  }

  onServerInit(data) {
    logger.success('Confetti server is running...');
    this.deck = data.deck;
    this.generator = new Generator(this.deck.paths, data.serveDist);
    this.generateDeck();
  }

  // TODO: improve copying only the file has been changed.
  onCoverChange(data) {
    logger.message(`File changed: ${data.path}`);
    this.generator.copyCovers()
      .then(() => {
        logger.success('Covers have been copied.');
        if (data.cb) {
          data.cb();
        }
      })
      .catch(error => logger.error(error));
  }

  onStylesChange(data) {
    logger.message(`File changed: ${data.path}`);
    this.generator.compileStyles(this.deck.compilers.sass, this.deck.themeConfig)
      .then(() => {
        logger.success('Styles have been updated.');
        if (data.cb) {
          data.cb();
        }
      })
      .catch(error => logger.error(error));
  }

  onViewsChange(data) {
    logger.message(`File changed: ${data.path}`);
    this.generator.compileViews(this.deck)
      .then(() => {
        logger.success('Views have been updated.');
        if (data.cb) {
          data.cb();
        }
      })
      .catch(error => logger.error(error));
  }

  onJavascriptChange(data) {
    logger.message(`File changed: ${data.path}`);
    this.generator.compileJavascripts()
      .then(() => {
        logger.success('Javasacripts have been updated.');
        if (data.cb) {
          data.cb();
        }
      })
      .catch(error => logger.error(error));
  }

  // TODO: improve copying only the file has been changed.
  onImagesChange(data) {
    logger.message(`File changed: ${data.path}`);
    this.generator.copyImages()
      .then(() => {
        logger.success('Images have been copied.');
        if (data.cb) {
          data.cb();
        }
      })
      .catch(error => logger.error(error));
  }

  // TODO: improve copying only the file has been changed.
  onFontsChange(data) {
    logger.message(`File changed: ${data.path}`);
    this.generator.copyFonts()
      .then(() => {
        logger.success('Fonts have been copied.');
        if (data.cb) {
          data.cb();
        }
      })
      .catch(error => logger.error(error));
  }

  onSettingsChange(data) {
    logger.message(`${data.path} has been changed. Slide deck is rebuilding...`);
    this.loader.loadDeck(configLoader, data.serveDist)
      .then(deckData => {
        this.deck = deckData;
        this.generateDeck(data.cb);
      });
  }
}
export default BuildObserver;
