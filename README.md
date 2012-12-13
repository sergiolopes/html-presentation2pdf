html-presentation2pdf - by Sérgio Lopes
=======================================

Export your cool HTML5-based presentation to a boring static PDF file when boring people
need this boring format.

Requirements
============

* PhantomJS (to generate screenshots)
* ImageMagick (to generate final PDF)

Usage
=====

To generate static images (screenshots) of each slide stage:

    phantomjs export-slides.js http://example.com/myslides destination/folder/

Parameters:

* Presentation URL
* Destination folder for images
* (optional) Transition waiting time in ms (default: 50)
* (optional) Slide rendering width in px (default: 1024)
* (optional) Slide rendering height in px (default: 3/4 of width)

Complex usage:

    phantomjs export-slides.js http://example.com/myslides destination/folder/ 500 800 600

After you generate all slides builds, just convert to PDF using ImageMagick:

    convert destination/folder/*.png my-presentation.pdf

About
=====

I needed a boring PDF to publish my talk slides on InfoQ.com, so I made this.

This tool uses PhantomJS to render each slide stage and has some inteligence to detect presentation end and transition waits. It generates a bunch of PNG files (export PDF directly from Phantom is not a good idea) and then
converts everything to a simple PDF using ImageMagick.

The drawback is that PhantomJS is not perfect, so you have to check what HTML5/CSS3 features are supported. Maybe your rendered PDF will be uglier than your presentation opened on your cutting edge Google Chrome. Also, the PDF is simply a sequence of bitmapped images, not a vetorial one with selectable text and other smart features.

I assume that your presentation is navigable using the right arrow key on the user keyboard. If you have strange navigation patterns, you may need to edit the source code.

License
=======

Public domain, do whatever you want with the code. If you want to credit me, I'm **Sérgio Lopes** (http://sergiolopes.org).