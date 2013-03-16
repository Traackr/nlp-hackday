'use strict';

/* jasmine specs for controllers go here */

describe('SearchController', function(){

   var scope, api, searchCtrl;

   beforeEach(function() {
      module('relevantWeb.services');
      inject(function($rootScope, $controller, $injector) {
         scope = $rootScope.$new();
         api = $injector.get('apiService');
         searchCtrl = $controller(SearchController, {$scope: scope, apiService: api});
      });
   });


   it('should have no keywords initially', function() {
      expect(scope.keywords_list.length).toBe(0);
   });

   it('should add keywords', function() {
      
      // Add single keyword
      scope.keyword = 'traackr'
      scope.add_keyword();
      expect(scope.keywords_list.length).toBe(1);
      expect(scope.influencers.length).toBe(0);
      expect(scope.keywords_list).toEqual(['traackr']);

      // Ignore dups
      scope.keyword = 'traackr'
      scope.add_keyword();
      expect(scope.keywords_list.length).toBe(1);
      expect(scope.keywords_list).toEqual(['traackr']);


      // Add multi keywords coma separated
      scope.keyword = 'social, media'
      scope.add_keyword();
      expect(scope.keywords_list.length).toBe(3);
      expect(scope.keywords_list).toEqual(['traackr', 'social', 'media']);

      // Delete keyword
      scope.del_keyword('traackr');
      expect(scope.keywords_list.length).toBe(2);
      expect(scope.keywords_list).toEqual(['social', 'media']);

      // Delete unknown keyword
      scope.del_keyword('foobar');
      expect(scope.keywords_list.length).toBe(2);
      expect(scope.keywords_list).toEqual(['social', 'media']);

   });

}); // SearchController test
