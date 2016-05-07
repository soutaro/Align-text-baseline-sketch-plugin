# Align Text Baseline for Sketch

> As of Sketch 3.7.2, vertical aligning bug has been fixed, and you don't have to use this plugin.
> Native *Align Vertically* and *Align Bottom* align text layers based on their baseline and cap height.

This plugin allows your text layers to be aligned vertically based on its font's baseline and cap height, not based on its frame.

The built in *Align Vertically* command does not work as we expect for some of CJK fonts including standard Hiragino Kaku Gothic.

The plugin provides three functionalities to help you working with text layers of CJK fonts.

* Place text layers in the middle
* Align text layers by baseline
* Add a rectangle surrouding text in the given text layer, which can be used as a mask

## Example

The following is the output of this plugin; aligning text layers with non-text layer.

![Place texts in the middle](https://raw.githubusercontent.com/soutaro/Align-text-baseline-sketch-plugin/master/capheight-example.png)

Select text layers and bounding layers, and run the plugin.
The text layers will be moved and the distnce to top of bounding rect from cap height area will equal to the distance to bottom of bounding rect.

The following is the output of this plugin; aligning text layers.

![Align by baseline](https://raw.githubusercontent.com/soutaro/Align-text-baseline-sketch-plugin/master/baseline-example.png)

Select text layers but no other layers, and run the plugin.
The layers will be moved to share one line as their baseline.

## Author

Soutaro Matsumoto (matsumoto@soutaro.com)
