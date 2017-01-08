# Confetti enriches your slide deck.
### --[ The project is still under construction.]--
---

Confetti helps you to **enrich**, **publish** and **share** beautiful HTML5 presentations.
Confetti provides a way to turn your slides in an amazing online presentation
using any of supported themes but it also allows to let advanced CSS and
JavaScript for customized slide decks. Why not get started now?

## Installation
Install the library as any other global [npm](https://www.npmjs.com) package. Be sure to have npm, git and node installed. If your computer already has these, just install Confetti with npm:

``` bash
$ npm install confetti-cli -g
```

### Quick Start

#### Setup your slide deck

The init command create a folder (named ‘deck’) with the assets that make up a slide deck.

``` bash
$ confetti init
$ cd deck
```

#### Start the server
Confetti includes a local server utility to allow quick live-previewing of the slide deck.

``` bash
$ confetti server
```
When run in a slide deck folder, this will build the presentation starting from the settings and data files in the current folder in order to view and present.

#### Theme development mode
If you are going to edit the current theme and see the changes **live**, you need to start the server in **development mode** adding the option `` --dev ``.

``` bash
$ confetti server --dev
```

#### Serve the dist folder
Use the option `` --dist `` to serve the folder for distribution. This way you run the **optimised version** of your slide deck.

``` bash
$ confetti server --dist
```

#### Build
Before you deploy your presentation, you need to build static HTML, CSS and JavaScript files.
Confetti does that using the command build.

``` bash
$ confetti build
```

Once you've built your HTML5 slide deck, it's time to share it with the world! 
Since you are dealing with static assets, there are several hosting options available such as FTP, GitHub pages or cloude hosting. You're free to choose your favourite one!

##### PLEASE NOTE: Remember you need to upload just the "dist" folder.

## Configuration

Once you have initialized your slide deck (see more in section “Installation”), the second step to move forward regards the data configuration. Confetti provides three different files to set your data:

* **Basic settings** (path-to-your-deck/**settings.yml**)
* **Slides info** (path-to-your-deck/**data/slides.md**)

They are detailed below.

### Basic settings
The basic settings file is located inside the root of your slide deck (path-to-your-deck/**settings.yml**) and you need edit it for changing of primary info about your presentation (e.g. title, subtitle, publishing date, author info, html meta, selected theme and its configuration).

It's written in [YAML](http://yaml.org/) markup language in order to being more human friendly.

``` yaml
# You might put one or more categories
categories: [ category 1, category 2, ... ]

# Required
title: Title of your beautiful presentation

subtitle: Presentation subtitle

# Relative path to <path-to-your-deck>/**data/images/**
cover: cover-intro.jpg

# Required
author:
  # Required
  name: Author Name
  role: Author role
  picture: author-picture.jpg
  description: >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>

demo: url/to/demo

material: url/to/material

# You might use html tags
description: >
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel aliquam eros,quis commodo arcu...
  </p>

# (en_EN by default) 
lang: en_EN

# Confetti uses Moment.js to parse and display date
# You can customize the date format as defined in
# http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD

// Html meta to improve indexing on search engines
meta:
  title: Title of your beautiful presentation
  description: Description of your presentation
  tags:
    - tag 1
    - tag2 
    - ...

# (voice theme by default) 
theme: voice

# Theme config (if it has been provided for the selected theme)
...

```

## Official themes
Confetti was born to give you a quick way to build a beautiful online presentation. The goal is providing a large number of themes for guaranteeing more customizing choises to your slide deck. Currently Confetti provides a default theme (named [Voice](https://github.com/andreamangano/confetti-theme-voice)) but new official themes are coming soon!

If you would like embracing the project, feel free to create your theme for Confetti! I will be happy to mention it here.

## Confetti Ecosystem
Confetti is a open source library composed by different functional packages. Confetti-cli is the master repository for all deck repositories listed below:

* [Confetti Starter](https://github.com/andreamangano/confetti-starter)
* [Confetti Generator](https://github.com/andreamangano/confetti-generator)
* [Confetti Loader](https://github.com/andreamangano/confetti-loader)


## License

Licensed under [MIT License](LICENSE). © Andrea Mangano.
