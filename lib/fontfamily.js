/**
 * Define action to add shape to canvas
 */
(function () {
  "use strict";
  const fontFamilies = [
    {
      name: "주아",
      fontFamily: "BMJUA",
      url: "https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff",
      active: true,
    },
    {
      name: "나눔스퀘어",
      fontFamily: "NanumSquare",
      url: "https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css",
      active: true,
    },
    {
      name: "가람연꽃",
      fontFamily: "Garam",
      url: "https://fastly.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Garam.woff",
      active: true,
    },
    {
      name: "나눔손글씨",
      fontFamily: "Nanum Pen Script",
      url: "https://fonts.googleapis.com/earlyaccess/nanumpenscript.css",
      active: true,
    },
    {
      name: "야놀자",
      fontFamily: "YanoljaYacheR",
      url: "https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YanoljaYacheR.woff",
      active: true,
    },
    {
      name: "한나",
      fontFamily: "Hanna",
      url: "https://fonts.googleapis.com/earlyaccess/hanna.css",
      active: true,
    },
  ];

  var font = function () {
    const families = fontFamilies.map((font) => font.fontFamily);
    const urls = fontFamilies.map((font) => font.url);

    console.log(families, urls);

    WebFont.load({
      custom: {
        families: families,
        urls: urls,
      }
    });
  };

  const buildFontFamily = function () {
    const families = fontFamilies.map((font) => {
      return `<option value="${font.fontFamily}">${font.name}</option>`;
    });

    return `
      <option value=""></option>
      ${families.join("")}
    `;
  }

  window.ImageEditor.prototype.initializeFontFamily = font;
  window.ImageEditor.prototype.buildFontFamily = buildFontFamily;
})();
