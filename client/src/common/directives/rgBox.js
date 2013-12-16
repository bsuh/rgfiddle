/*global angular*/
angular.
  module('directives.box', []).
  directive('rgBox', function () {
    return {
      restrict: 'EA',
      replace: true,
      template: '<span></span>',
      link: function (scope, element, attrs) {
        var spans = [];
        var pars = [];
        var texts = [];

        function removeNode(parent, node) {
          while (node.firstChild) {
            removeNode(node, node.firstChild);
          }
          node.className = '';
          if (node.tagName === 'SPAN') {
            spans.push(node);
          } else if (node.tagName === 'P') {
            pars.push(node);
          } else if (node.nodeType === 3) { // text node
            texts.push(node);
          }
          parent.removeChild(node);
        }

        var unwatch = scope.$watch(
          attrs.board + '[' + attrs.index + ']', function (newVal) {
            var node = element[0];
            var prevClasses = node.classList.contains('selected') ?
              'selected ' : '';

            if (newVal.type === 'obstacle') {
              element.replaceWith('<span class="box obstacle"></span>');
              unwatch();
              return;
            } else if (newVal.type === 'normal') {
              node.className = prevClasses + 'box normal';
              while (node.firstChild) {
                removeNode(node, node.firstChild);
              }
              return;
            }

            node.className = prevClasses +
              ['box', newVal.type, newVal.action].join(' ');

            if (newVal.hp) {
              if (node.children.length >= 1) {
                node.firstChild.firstChild.nodeValue = newVal.hp;
              } else {
                var p = pars.pop() || document.createElement('p');
                var text = texts.pop() || document.createTextNode('');
                text.nodeValue = newVal.hp;

                p.appendChild(text);
                node.appendChild(p);
              }
            }

            if (newVal.target) {
              if (node.children.length === 2) {
                node.lastChild.className = [
                    'glyphicon',
                    'glyphicon-arrow-' + newVal.target,
                    'text-' + (newVal.action === 'move' ? 'primary' : 'danger')
                ].join(' ');
              } else {
                var span = spans.pop() || document.createElement('span');
                span.className = [
                    'glyphicon',
                    'glyphicon-arrow-' + newVal.target,
                    'text-' + (newVal.action === 'move' ? 'primary' : 'danger')
                  ].join(' ');
                node.appendChild(span);
              }
            } else {
              while (node.children.length > 1) {
                removeNode(node, node.lastChild);
              }
            }
          });
      }
    };
  });
