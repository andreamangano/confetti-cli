# Confetti enriches your slide deck.
[![npm version](https://badge.fury.io/js/confetti-cli.svg)](http://badge.fury.io/js/confetti-cli)

Confetti is the static site generator that helps you to **enrich**,
**publish** and **share**
beautiful **HTML5 presentations**.
Confetti provides a way to turn your slides in an amazing online presentation
using any of supported themes. It also allows to let advanced CSS and
JavaScript for customized slide decks. Why not get started now?

**[See the online demo!](https://andreamangano.github.io/confetti-demo/)**

![cover.jpg](http://s26.postimg.org/3les310kp/confetti_theme_voice_main_preview.jpg)

## Installation
Install the library as any other global [npm](https://www.npmjs.com) package. Be sure to have npm, git and node installed. If your computer already has these, just install Confetti with npm:

``` bash
$ npm install confetti-cli -g
```

### Quick Start

#### Setup your slide deck

The init command create a folder (named ` deck `) with the assets that make
up a slide deck.

``` bash
$ confetti init
$ cd deck
```

#### Start the server
Confetti includes a local server utility to allow quick live-previewing of the slide deck.

``` bash
$ confetti server
```

When run it will build the presentation starting from the settings and data
files in the current folder in order to view and present.

> Be sure to run the command inside the your slide deck folder root.

> If you are using ` release_prefix ` on your config file (See section  [` Configuration `](#configuration))
be careful to add the value of release_prefix to the local server url. Example:

```
// Your release_prefix var is set to 'my-deck-folder'
release_prefix = my-deck-folder

// Access to your slide deck at:
http://localhost:3000/my-deck-folder
```

#### Serve the dist folder
Use the option ` --dist ` to serve the folder for distribution. This way you run the **optimised version** of your slide deck.

``` bash
$ confetti server --dist
```

### Distribution
Before you deploy your presentation, you need to build static HTML, CSS and JavaScript files.
Confetti does that using the command ` build `.

``` bash
$ confetti build
```

Once you've built your HTML5 slide deck, it's time to share it with the world!
Since you are dealing with static assets, there are several hosting options
available such as **FTP**, **GitHub pages** or **cloud hosting**. You're free
 to choose your favourite one!

> **Please note**: You need to upload just the ` dist ` folder or
the sub folder inside whenever the config attribute ` release_prefix ` is set.

## Configuration

Once you have initialized your slide deck (see more in section
"Installation"), the second step to move forward regards the data
configuration. Confetti provides two files to set your data:

* **Basic settings** (path-to-your-deck/**settings.yml**)
* **Slides info** (path-to-your-deck/**data/slides.md**)

They are detailed below.

### Basic settings
The basic settings file is located inside the root of your slide deck
(` path-to-your-deck/settings.yml `) and you need edit it for changing of primary info about your presentation (e.g. title, subtitle, publishing date, author info, html meta, selected theme and its configuration).

It's written in [YAML](http://yaml.org/) markup language in order to being more human friendly.

``` yaml
# You might put one or more categories
categories: [ category 1, category 2, ... ]

# Required
title: Title of your beautiful presentation

subtitle: Presentation subtitle

# The cover path is relative to <path-to-your-deck>/data/images/
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

# Language used in your presentation (en_EN by default)
lang: en_EN

date: January 2017

# Html meta to improve the search engines indexing
meta:
  title: Title of your beautiful presentation
  description: Description of your presentation
  tags:
    - tag 1
    - tag 2
    - ...

# If your slide deck is in a subdirectory (such as http://mysite.org/mydeck)
# set release_prefix to mydeck/
releasePrefix: mydeck/

# Theme name (voice theme by default)
theme: voice

# Theme config (if it has been provided by the selected theme and if you want
override the default config)
...

```

### Slides info
All the info relative to your slides are placed in the slides.md file (You
can find it inside your project folder ` path-to-your-deck/data/slides.md `).
Follows a sample definition of a single slide:

``` markdown
[slide]
---
title: Title of your slide
cover: cover-slide.jpg
---
You can place the description slide here using the markdown conventions.
```

> The ` [slide] `  notation is a delimiter for identifying each single slide inside the document.
> The data between the ` --- ` delimiters define the title of the slide and the cover image (both required). The image path is relative to
` path-to-your-deck/data/images/ `.

In order to make easier the editing of your slides, you might put a flag (e.g. the slide index) beside to the ` [slide] ` delimiter:

``` yaml
[slide] 1
```

#### Cover images
You should provide each slide of a cover image. Put your cover images in the folder ` path-to-your-deck/data/images ` and links them in your ` slides.md ` file as described before.

## Theming
A large part of the power of Confetti comes in the ability to quickly and easily develop themes. They allows you to customize the look and feel of your presentation. It will require a good knowledge about web design, HTML, CSS, and (sometime) JavaScript.
Confetti uses the ` PUG ` template engine and ` SASS ` processed languages by default.

A typical theme folder structure looks like:
```
    .
    ├── ...
    ├── assets
    │   ├── images              # Contains the images for theme (e.g. icons)
    │   ├── styles              # Contains Sass files
    │   └── javascripts         # Contains JavaScripts
    ├── views                   # Contains index.pug (intro page) and slide.pug (view to render a single slide page)
    ├── languages               # Contains all available languages for the theme
    │   ├── ...
    │   ├── ...                 # e.g. language for the italian theme translations
    │   └── default.yml         # default translations (Usually in english)
    └── data.yml
```

### Change current theme
You might find yourself in one of the following cases:

0. **You have already installed the theme you'd like set for your slide deck**:
   Then just change the property ` theme ` into the basic file settings ` path-to-your-deck/settings.yml ` an restart the server (see the section [Start the server](#start-the-server)).

    ``` yaml
    theme: <theme-name>
    ```
    > In order to check if a given theme is already installed (for your current
    slide deck), just look inside the folder ` <path-to-your-deck>/themes/ `

0. **The theme is not already installed**:
   Then clone the theme inside the folder themes (` <path-to-your-deck>/themes/ `) following the theme instructions on its repository. Back to the point 1.

### Theme editing
If you are going to edit the current theme and see the changes **live**, you
need to start the server in **development mode** adding the option ` --dev `.

``` bash
$ confetti server --dev
```
Then edit the styles, views, images and javascripts to achieve your goal (See
 [the typical theme folder structure](#theming) for further information).
In the case you want to make available the customised theme for all your decks, fork the theme and create your version. After install the theme as any other Confetti theme.

### Theme locals

Locals are passed to theme page templates by using a javascript object.

#### Common template locals
Follows an example with all data that the page templates (` index.pug ` and `
 slide.pug `, inside the theme folder) could received.
> Remember to check the existence of the optional parameters whenever you
get them from your template.

``` javascript
{
    categories: ['...', '...', ...]
    title: '...',
    subtitle: '...',
    cover: '...'
    author: {
        name: '...',
        role: '...',
        picture: '...',
        description: '...'
    },
    demo: '...',
    material: '...',
    description: '...',
    lang: '...',
    date: '...',
    meta: {
        title: '...',
        description: '...',
        tags: [ '...', '...', ... ]
    },
    theme: '...',
    slides: [
        {   title: '...',
            cover: [Object],
            description: '...',
            index: 1,
            url: '...',
            path: '...'
        },
        {...},
        {...}
    ],
    paths:
        to:
        {
            styles: '...',
            javascript: '...',
            images: '...',
            deckImages: '...',
            covers: '...'
        }
    }, // Relative path to the assets
    release_prefix: '...',
    themeConfig: [Object],
    translations: {
        label: '...',
        label2: '...'
  }
```

#### Additional attributes for the slide template
The ` slide.pug ` template receives additional data to render the page:

##### Current slide object

``` javascript
slide: {
    title: '...',
    cover: {
        file: '...',
        format: {
            original: '...' // Relative url
            small: '...' // Relative url
        }
    },
    description: '...',
    index: [Number],
    url: '...',
    path: '...'
}
```

##### Slide navigation object
``` javascript
sliderNav: {
    next: {
        data: [Object Slide],
        index: [Number]
    }, // It could be null (The current slide is the last one)
    prev: {
        data: [Object Slide],
        index: [Number]
    }, // It could be null (The current slide is the first one)
    current: { data: [Object Slide], index: 6 },
    total: [Number], // Total number of slides
    hasNext: [Function: hasNext], // Returns a boolen
    hasPrev: [Function: hasPrev], // Returns a boolen
    percentage: [Number] // Progress percentage
}
```


### Official themes
Confetti was born to give you a quick way to build a beautiful online presentation. The goal is providing a large number of themes for guaranteeing more customizing choises to your slide deck. Currently Confetti provides a default theme (named [Voice](https://github.com/andreamangano/confetti-theme-voice)) but new official themes are coming soon!

If you would like embracing the project, feel free to create your theme for Confetti! I will be happy to mention it here.

## Upcoming features
- Google Analytics integration
- Automated deployment to GitHub Pages
- CLI for installing, uninstalling and updating themes
- Commenting System integration

## Confetti Ecosystem
Confetti is a open source library composed by different functional packages. Confetti-cli is the master repository for all deck repositories listed below:

* [Confetti Starter](https://github.com/andreamangano/confetti-starter)
* [Confetti Generator](https://github.com/andreamangano/confetti-generator)
* [Confetti Loader](https://github.com/andreamangano/confetti-loader)

## Author

**Confetti** © Andrea Mangano, Released under the [MIT License](LICENSE).

> [andreamangano.com](https://andreamangano.com) · Twitter [@andreaman87](https://twitter.com/andreaman87)

## License

Licensed under [MIT License](LICENSE). © Andrea Mangano.
