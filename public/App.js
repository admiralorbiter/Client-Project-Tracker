"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var initialProjects = [{
  id: 1,
  status: 'new',
  owner: 'Jon',
  effort: 5,
  due: new Date('2018-08-08'),
  title: 'Refactoring Code for Modularization'
}, {
  id: 2,
  status: 'assigned',
  owner: 'Jon',
  effort: 18,
  due: new Date('2018-08-08'),
  title: 'Standards and Style Guide'
}];
var sampleProjects = {
  status: 'new',
  owner: 'Jon',
  effort: 5,
  due: new Date('2018-08-08'),
  title: 'New thing'
};

var ProjectTable = /*#__PURE__*/function (_React$Component) {
  _inherits(ProjectTable, _React$Component);

  var _super = _createSuper(ProjectTable);

  function ProjectTable() {
    _classCallCheck(this, ProjectTable);

    return _super.apply(this, arguments);
  }

  _createClass(ProjectTable, [{
    key: "render",
    value: function render() {
      var projectRows = this.props.projects.map(function (project) {
        return /*#__PURE__*/React.createElement(ProjectRow, {
          key: project.id,
          project: project
        });
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Id"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, projectRows));
    }
  }]);

  return ProjectTable;
}(React.Component);

var ProjectRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(ProjectRow, _React$Component2);

  var _super2 = _createSuper(ProjectRow);

  function ProjectRow() {
    _classCallCheck(this, ProjectRow);

    return _super2.apply(this, arguments);
  }

  _createClass(ProjectRow, [{
    key: "render",
    value: function render() {
      var project = this.props.project;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, project.id), /*#__PURE__*/React.createElement("td", null, project.status), /*#__PURE__*/React.createElement("td", null, project.owner), /*#__PURE__*/React.createElement("td", null, project.effort), /*#__PURE__*/React.createElement("td", null, project.due ? project.due.toDateString() : ''), /*#__PURE__*/React.createElement("td", null, project.title));
    }
  }]);

  return ProjectRow;
}(React.Component);

var ProjectFilter = /*#__PURE__*/function (_React$Component3) {
  _inherits(ProjectFilter, _React$Component3);

  var _super3 = _createSuper(ProjectFilter);

  function ProjectFilter() {
    _classCallCheck(this, ProjectFilter);

    return _super3.apply(this, arguments);
  }

  _createClass(ProjectFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is place holder for filter");
    }
  }]);

  return ProjectFilter;
}(React.Component);

var ProjectAdd = /*#__PURE__*/function (_React$Component4) {
  _inherits(ProjectAdd, _React$Component4);

  var _super4 = _createSuper(ProjectAdd);

  function ProjectAdd() {
    var _this;

    _classCallCheck(this, ProjectAdd);

    _this = _super4.call(this);
    setTimeout(function () {
      _this.props.createProject(sampleProjects);
    }, 2000);
    return _this;
  }

  _createClass(ProjectAdd, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is place holder for add");
    }
  }]);

  return ProjectAdd;
}(React.Component);

var ProjectList = /*#__PURE__*/function (_React$Component5) {
  _inherits(ProjectList, _React$Component5);

  var _super5 = _createSuper(ProjectList);

  function ProjectList() {
    var _this2;

    _classCallCheck(this, ProjectList);

    _this2 = _super5.call(this);
    _this2.state = {
      projects: []
    };
    return _this2;
  }

  _createClass(ProjectList, [{
    key: "createProject",
    value: function createProject(project) {
      project.id = this.state.projects.length + 1;
      project.created = new Date();
      var newProjects = this.state.projects.slice();
      newProjects.push(project);
      this.setState({
        projects: newProjects
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this3 = this;

      setTimeout(function () {
        _this3.setState({
          projects: initialProjects
        });
      }, 500);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Projects"), /*#__PURE__*/React.createElement(ProjectFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProjectTable, {
        projects: this.state.projects
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProjectAdd, {
        createProject: this.createProject.bind(this)
      }));
    }
  }]);

  return ProjectList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ProjectList, null);
ReactDOM.render(element, document.getElementById('content'));