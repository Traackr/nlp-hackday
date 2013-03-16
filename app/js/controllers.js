'use strict';

/* Controllers */

function SearchController($scope, apiService, previewService) {

   
   $scope.keywords_list = [];
   $scope.keyword = '';

   // Influencers found
   $scope.influencers = [];
   // Posts found
   $scope.posts = [];
   $scope.post_urls = [];
   $scope.post_previews = [];

   var postsStartIdx = 0;
   var postsPageSize = 10;
   /*
    * Add keywords
    */
   $scope.add_keyword = function() {
    
      //console.log($scope);
      console.log('Adding keyword(s): ' + $scope.keyword);
      if ($scope.keyword) {
         var kwds = $scope.keyword.split(',');
         for ( var k in  kwds) {
            if ( _.indexOf($scope.keywords_list, kwds[k].trim()) == -1 ) {
               clear_results();
               $scope.keywords_list.push(kwds[k].trim());
            }
         }
         $scope.keyword = '';
      }

   }; // End function add_keyword

   $scope.clear_results = function() {
      
      console.log('Clear results');
      clear_results();

   }; // End function clear_resukts


   /*
    * Delete a keyword
    */
   $scope.del_keyword = function(kwd) {

      console.log('Delete keyword: ' + kwd);
      var idx =  _.indexOf($scope.keywords_list, kwd);
      if ( idx != -1 ) {
         // function is called in a repeater. Each repeater
         // gets its own scope, so here accessing via the $scope
         // variable
         clear_results();
         $scope.keywords_list.splice(idx, 1);
      }
   }; // End function del_keyword


  /*
    * Launch search
    */
   $scope.search_influencers = function() {

      // Reset results
      clear_results();
      console.log('Launch influencers search with: ');
      console.log($scope.keywords_list);
      // Launch search
      var search_results = apiService.searchInfluencers($scope.keywords_list);

      // Assign results to model when available
      search_results.success(function(data){
         console.log('Search results: ');
         console.log(data);
         // console.log(data.influencers)
         var limit = 10;
         if (data.influencers < limit)
            $scope.influencers = data.influencers;
         else
            $scope.influencers = data.influencers.slice(0, limit);
            
         for (var i = 0; i < $scope.influencers.length; i++) {
            $scope.search_posts($scope.influencers[i]);
         }
      });

   }; // End function search_influencers

   /*
    * Search posts (for influencers found)
    */
   $scope.search_posts = function(influencer) {

      console.log('Launch posts search with: ');
      console.log($scope.keywords_list);
      // Launch search
      var search_results = apiService.searchPosts($scope.keywords_list, [influencer['uid']]);

      // Assign results to model when available
      search_results.success(function(data){
         //console.log('Search results: ');
         //console.log(data);
         influencer['post_urls'] = _.pluck(data.posts, 'url');
         console.log('Influencer Post URLs size: ' + influencer['post_urls'].length)
         //$scope.get_previews();
      });

   }; // End function search_posts()


   /*
    * Get Embed.ly preview object for posts
    */
   $scope.get_previews = function () {

      console.log('Getting posts previews');
      console.log('Start: ' + postsStartIdx);
      console.log('End: ' + (postsStartIdx+postsPageSize-1));
      var urls = $scope.post_urls.slice(postsStartIdx, postsStartIdx+postsPageSize-1);
      console.log(urls);
      var previews = previewService.getPreview(urls);
      postsStartIdx += postsPageSize;

      // Disply previews
      previews.success(function(data) {
         console.log(data);
         $scope.post_previews = _.union($scope.post_previews, data);
      });

   }; // Ednd function get_previews()


   /*
    * Load more posts
    */
   $scope.load_more_posts = function() {
      console.log('Loading more posts ...');
      $scope.get_previews();
   }; // End function load_more_posts()


    /*
     * Private functions
     */
   var clear_results = function() {
      $scope.influencers = [];
      $scope.posts = [];

   }; // End function clear_results


} // End controller SearchController

SearchController.$inject = ['$scope', 'apiService', 'previewService'];
