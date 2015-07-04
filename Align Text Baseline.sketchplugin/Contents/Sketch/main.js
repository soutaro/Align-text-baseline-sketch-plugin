var alignText = function(context) {
  var layers = extractLayers(context);

  if (layers.textLayers.length == 0) {
    alert("No text layer selected; bye");
    return;
  }

  if (layers.otherLayers.length == 0 && layers.textLayers.length == 1) {
    alert("Only one text layer is selected; nothing to do...")
    return;
  }

  if (layers.otherLayers.length == 0) {
    alignBaselines(layers.textLayers);
  } else {
    alignMiddle(layers);
  }
}

function maskTextLayers(context) {
  var layers = extractLayers(context);

  if (layers.textLayers.length == 0) {
    alert("No text layer selected; bye");
    return;
  }

  for (var i = 0; i < layers.textLayers.length; i++) {
    var textLayer = layers.textLayers[i];
    maskTextLayer(context.document, textLayer);
  }
}

function extractLayers(context) {
  var result = {
    textLayers: [],
    otherLayers: []
  };

  var selection = context.selection;

  for (var i=0; i<selection.count(); i++) {
    var layer = selection[i];

    if ([layer class] == MSTextLayer) {
      result.textLayers.push(layer);
    } else {
      result.otherLayers.push(layer);
    }
  }

  return result;
}

function alignBaselines(textLayers) {
  var targetLine = null;

  for (var i = 0; i < textLayers.length; i++) {
    textLayer = textLayers[i];

    if (targetLine === null) {
      var y = [[textLayer frame] y];
      var font = [textLayer font];
      var ascender = [font ascender];

      targetLine = Math.floor(y + ascender + 0.5);
    } else {
      setBaseline(textLayer, targetLine);
    }
  }
}

function setBaseline(textLayer, baseline) {
  var font = [textLayer font];
  var y = baseline - Math.floor([font ascender] + 0.5);

  [[textLayer frame] setY:y];
}

function alignMiddle(layers) {
  var bounding = null;

  for (var i = 0; i < layers.otherLayers.length; i++) {
    var layer = layers.otherLayers[i];

    if (bounding) {
      bounding = [MSRect rectWithUnionOfRects:Array([layer frame], bounding)];
    } else {
      bounding = [layer frame];
    }
  }

  var middleLine = Math.floor([bounding y] + [bounding height]/2 + 0.5);

  for (var i = 0; i < layers.textLayers.length; i++) {
    var textLayer = layers.textLayers[i];
    setCapMiddle(textLayer, middleLine);
  }
}

function setCapMiddle(textLayer, middleLine) {
  var font = [textLayer font];
  var ascender = [font ascender];
  var capHeight = [font capHeight];

  var y = middleLine - Math.floor(ascender - capHeight/2 + 0.5);

  [[textLayer frame] setY:y];
}

function maskTextLayer(doc, textLayer) {

  logTextLayerMetrics(textLayer);

  var frame = [textLayer frame];

  var font = [textLayer font];
  var ascender = [font ascender];
  var descender = [font descender];
  var height = Math.floor(ascender - descender + 0.5);

  var parentFrame = findParentFrame(textLayer);
  var maskLayer = [parentFrame addLayerOfType:"rectangle"];
  [maskLayer setName:"Shape for mask"];

  var maskFrame = [maskLayer frame];
  [maskFrame setX:[frame x]];
  [maskFrame setY:[frame y]];
  [maskFrame setWidth:[frame width]];
  [maskFrame setHeight:height];

  [maskLayer select:true byExpandingSelection:true];
}

function findParentFrame(layer) {
  var parent = [layer parentGroup];

  if (parent && [parent class] == MSArtboardGroup) {
    return parent;
  }

  if (parent && [parent class] == MSPage) {
    return parent;
  }

  return findParentFrame(parent);
}

function alert(message) {
  var app = [NSApplication sharedApplication];
  [app displayDialog:message withTitle:"Align Text Baseline"];
}

function logTextLayerMetrics(textLayer) {
  var font = [textLayer font];
  log("font = " + font);
  log("font.capHeight = " + [font capHeight]);
  log("font.descender = " + [font descender]);
  log("font.ascender = " + [font ascender]);
  log("font.boundingRectForFont = " + [font boundingRectForFont]);
  log("font.leading = " + [font leading]);

  var baseLineHeight = [textLayer baseLineHeight];
  log("layer.baseLineHeight = " + baseLineHeight);

  log("layer.frame.y =" + [[textLayer frame] y]);
}

