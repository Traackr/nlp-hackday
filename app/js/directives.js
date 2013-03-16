'use strict';

/* Directives */

angular.module('relevantWeb.directives', []).
   directive('whenScrolled', function() {
      console.log('Directive factory');
      return function(scope, elm, att) {
         var raw = elm[0];
         // console.log('whenScrolled directive elm:');
         // console.log(elm)
         // console.log(raw)

         // console.log('Top: ' + raw.scrollTop);
         // console.log('Height: ' + raw.scrollHeight);

         var rez = elm.bind('scroll', function() {
            // console.log('Scrolling ...');
            // console.log('Top: ' + raw.scrollTop);
            // console.log('Offset height: ' + raw.offsetHeight);
            // console.log('Height: ' + raw.scrollHeight);
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
               // console.log('Call function: ');
               // console.log(att.whenScrolled);
               // console.log(scope);
               scope.$eval(att.whenScrolled);
            }
         }); // End elm event binding
         // console.log(rez);
      }; // End directive factory
   }); // End directive definition
