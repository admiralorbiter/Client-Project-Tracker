"use strict";

var businessPartenrs = ['Cerner', 'Goodwill', 'Kauffman Organization'];
var helloBusinessPartner = Array.from(businessPartenrs, function (c) {
  return "Hello ".concat(c);
});
var message = helloBusinessPartner.join(' ');
var element = /*#__PURE__*/React.createElement("div", {
  title: "Outer Div"
}, /*#__PURE__*/React.createElement("h1", null, message));
ReactDOM.render(element, document.getElementById('content'));