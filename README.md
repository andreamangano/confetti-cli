# Confetti enriches your slide deck.
### --[ The project is still under construction.]--
---

Confetti helps you to **enrich**, **publish** and **share** beautiful HTML5 presentations.
Confetti provides a way to turn your slides in an amazing online presentation
using any of supported themes but it also allows to let advanced CSS and
JavaScript for customized slide decks. Why not get started now?

# Installation
Install the library as any other global [npm](https://www.npmjs.com) package. Be sure to have npm, git and node installed. If your computer already has these, just install Confetti with npm:

``` bash
$ npm install confetti-cli -g
```

## Quick Start

### Setup your slide deck

The init command create a folder (named ‘deck’) with the assets that make up a slide deck.

``` bash
$ confetti init
$ cd deck
```

### Start the server
Confetti includes a local server utility to allow quick live-previewing of the slide deck.

``` bash
$ confetti server
```
When run in a slide deck folder, this will build the presentation starting from the settings and data files in the current folder in order to view and present.
If you are going to edit the current theme and see the changes "live", you need to start the server in “development mode” adding the option “--dev”.

``` bash
$ confetti server --dev
```

## License

Licensed under [MIT License](LICENSE). © Andrea Mangano.
