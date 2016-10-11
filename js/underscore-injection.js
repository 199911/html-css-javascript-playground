var ascii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
var data = {
  "text": ascii,
  "textWithHTML": "Lorem Ipsum is simply dummy text of</p><p>the printing and typesetting industry.<script>console.log('Injection in textWithHTML!')</script>",
  "urlWithAllChar": "underscore-template-injection.html#" + ascii,
  "encodedUrlWithAllChar": encodeURI("underscore-template-injection.html#" + ascii),
  "asciiWithInjection": ascii + "<script>console.log('Another injection in asciiWithInjection');</script>",
  "injectionData": '{"html":"<pre> `hi` "hi" \'hi\' </div> </pre>"}'
};
var tmplStr = {
  pEsc: "<p><%- text %></p>",
  pNoEsc: "<p><%= text %></p>",
  pWithHtmlEsc: "<p><%- textWithHTML %></p>",
  pWithHtmlNoEsc: "<p><%= textWithHTML %></p>",
  aEsc: "<a href='<%- urlWithAllChar %>'>I am a Link</a>",
  aNoEsc: "<a href='<%= urlWithAllChar %>'>I am a Link</a>",
  aEncodedEsc: "<a href='<%- encodedUrlWithAllChar %>'>I am a Link</a>",
  aEncodedNoEsc: "<a href='<%= encodedUrlWithAllChar %>'>I am a Link</a>",
  aPrint: "<a href='<% print(encodeURI(urlWithAllChar)) %>'>I am a Link</a>",
  aPrintNoEncode: "<a href='<% print(urlWithAllChar) %>'>I am a Link</a>",
  dataEsc: "<p data-str='<%- asciiWithInjection %>'>",
  dataNoEsc: "<p data-str='<%= asciiWithInjection %>'>",
  injection1: "<p data-str='<%= injectionData %>'>",
  injection2: "<p data-str='<%- injectionData %>'>"
};
var tmpl = {};
_.each(tmplStr, function(str, key){ tmpl[key] = _.template(str);});
$('div[data-tmpl]').each(function(key, dom){
  var $dom = $(dom);
  var tmplName = $dom.data('tmpl');
  $dom.append(tmpl[tmplName](data));
});
$('p[data-str]').each(function(key, dom){
  var $dom = $(dom);
  var data = $dom.data('str');
  $dom.html('Data attribute: <code>' + _.escape(data) + '</code>');
});
