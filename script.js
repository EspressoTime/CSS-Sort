//ToDo: Fix spacing in values, removing commas
//No selector

function getSelectors(input) {
  //create an array with arrays of each selector and properties
  input = input.replace(/[,\n\r ]+/g, ""); //remove commas and whitespace
  let allSelectorsArr = input.split(/{|}/).filter(x => x); //removes undefined split
  let selectors = [];
  for (var i = 0; i < allSelectorsArr.length - 1; ++i) {
    if (i % 2 == 0) {
      selectors.push([allSelectorsArr[i], allSelectorsArr[i + 1]]);
    }
  }
  return selectors;
}

function getProperties(selectors) {
  let propsToSort = [];
  for (var i = 0; i < selectors.length; i++) {
    let eachSelector = selectors[i][0];
    let eachProp = selectors[i][1].split(";").filter(x => x); //removes undefined split after last semicolon
    let propertyObj = {};
    for (var x = 0; x < eachProp.length; x++) {
      let propSplit = eachProp[x].split(":"); //separate property and value
      let property = propSplit[0];
      let value = propSplit[1];
      propertyObj[property] = value;
    }
    propsToSort.push([eachSelector, propertyObj]);
  }
  return propsToSort;
}

function sortProperties(byProperties) {
  //const theOrder = ['z-index', 'display', 'font-size', 'font-weight', 'width', 'dogs'];
  const theOrder = bootstrapOrder;
  for (var i = 0; i < byProperties.length; i++) {
    //skip if there is only one property..
    if (Object.keys(byProperties[i][1]).length < 2) {
      continue;
    }
    let propObj = byProperties[i][1];
    let sortedProps = {};
    //let orderedKeys = [];
    for (const key of theOrder) {
      if (key in propObj) {
        sortedProps[key] = propObj[key];
      }
    }
    // for (var x=0; x<theOrder.length; x++) {
    //   if (Object.keys(propObj).indexOf(theOrder[x]) > -1) {
    //     orderedKeys.push(theOrder[x]);
    //   }
    // }
    // orderedKeys.forEach(function(key) {
    //   sortedProps[key] = propObj[key];
    // });
    byProperties[i][1] = sortedProps;
  }
  return byProperties;
}

function reassemble(sorted, inclStyles) {
  let output = "";
  let whitespace;
  inclStyles ? (whitespace = "  ") : (whitespace = "");
  for (const ea of sorted) {
    output += whitespace + ea[0] + " {\n";
    Object.keys(ea[1]).map(function(key, index) {
      output += whitespace + "  " + key + ": " + ea[1][key] + ";\n";
    });
    output += whitespace + "}\n\n";
  }
  if (inclStyles) {
    output = "<style>\n" + output + "</style>";
  }
  return output;
}

function main() {
  let input = document.getElementById("CSSinput").value;
  if (input.includes("<style>")) {
    var inclStyle = true;
    input = input.replace(/<style>|<\\style>/g, "");
  }
  let bySelectors = getSelectors(input);
  let byProperties = getProperties(bySelectors);
  let sortedProperties = sortProperties(byProperties);
  let reassembled = reassemble(sortedProperties, inclStyle);
  console.log(reassembled);
  document.getElementById("results").innerHTML = reassembled;
}

bootstrapOrder = [
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "z-index",
  "box-sizing",
  "display",
  "flex",
  "flex-align",
  "flex-basis",
  "flex-direction",
  "flex-wrap",
  "flex-flow",
  "flex-shrink",
  "flex-grow",
  "flex-order",
  "flex-pack",
  "align-content",
  "align-items",
  "align-self",
  "justify-content",
  "order",
  "float",
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "overflow",
  "overflow-x",
  "overflow-y",
  "-webkit-overflow-scrolling",
  "-ms-overflow-x",
  "-ms-overflow-y",
  "-ms-overflow-style",
  "columns",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-width",
  "column-rule-style",
  "column-rule-color",
  "column-span",
  "column-width",
  "orphans",
  "widows",
  "clip",
  "clear",
  "font",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "font-variant",
  "font-size-adjust",
  "font-stretch",
  "font-effect",
  "font-emphasize",
  "font-emphasize-position",
  "font-emphasize-style",
  "font-smooth",
  "src",
  "hyphens",
  "line-height",
  "color",
  "text-align",
  "text-align-last",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-style",
  "text-emphasis-position",
  "text-decoration",
  "text-indent",
  "text-justify",
  "text-outline",
  "-ms-text-overflow",
  "text-overflow",
  "text-overflow-ellipsis",
  "text-overflow-mode",
  "text-shadow",
  "text-transform",
  "text-wrap",
  "-webkit-text-size-adjust",
  "-ms-text-size-adjust",
  "letter-spacing",
  "-ms-word-break",
  "word-break",
  "word-spacing",
  "-ms-word-wrap",
  "word-wrap",
  "overflow-wrap",
  "tab-size",
  "white-space",
  "vertical-align",
  "direction",
  "unicode-bidi",
  "list-style",
  "list-style-position",
  "list-style-type",
  "list-style-image",
  "pointer-events",
  "-ms-touch-action",
  "touch-action",
  "cursor",
  "visibility",
  "zoom",
  "table-layout",
  "empty-cells",
  "caption-side",
  "border-spacing",
  "border-collapse",
  "content",
  "quotes",
  "counter-reset",
  "counter-increment",
  "resize",
  "user-select",
  "nav-index",
  "nav-up",
  "nav-right",
  "nav-down",
  "nav-left",
  "background",
  "background-color",
  "background-image",
  "filter",
  "background-repeat",
  "background-attachment",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-clip",
  "background-origin",
  "background-size",
  "border",
  "border-color",
  "border-style",
  "border-width",
  "border-top",
  "border-top-color",
  "border-top-style",
  "border-top-width",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-style",
  "border-bottom-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "border-image",
  "border-image-source",
  "border-image-slice",
  "border-image-width",
  "border-image-outset",
  "border-image-repeat",
  "outline",
  "outline-width",
  "outline-style",
  "outline-color",
  "outline-offset",
  "box-shadow",
  "opacity",
  "-ms-interpolation-mode",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "transition",
  "transition-delay",
  "transition-timing-function",
  "transition-duration",
  "transition-property",
  "transform",
  "transform-origin",
  "perspective",
  "appearance",
  "animation",
  "animation-name",
  "animation-duration",
  "animation-play-state",
  "animation-timing-function",
  "animation-delay",
  "animation-iteration-count",
  "animation-direction",
  "animation-fill-mode",
  "fill",
  "stroke"
];
