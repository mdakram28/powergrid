module.exports = function(app) {
    app.directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, elem, attrs) {
                elem.replaceWith(elem.children());
            }
        };
    });
}
