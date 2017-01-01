# Confetti enriches your slide deck.
### --[ The project is still under construction.]--
---

Confetti helps you to **enrich**, **publish** and **share** beautiful HTML5 presentations.
Confetti provides a way to turn your slides in an amazing online presentation
using any of supported themes but it also allows to let advanced CSS and
JavaScript for customized slide decks. Why not get started now?

# Installation

Install the library as any other global [npm](https://www.npmjs.com) package. Be sure to have npm and node installed then launch the command:

``` bash
$ npm install confetti-cli -g
```

## Quick Start

### Setup your slide

The init command create a folder (named ‘deck’) with the assets that make up a slide deck.

``` bash
$ confetti init
$ cd deck
```

### Start the server

``` bash
$ confetti server
```
When run in a slide deck folder, this will build a presentation starting from the settings and data files in the current folder for viewing and presenting.
If you are going to edit the current theme, start the server in “development mode” adding the option “--dev”.

``` bash
$ confetti server --dev
```

## License

Licensed under [MIT License](LICENSE). © Andrea Mangano.
