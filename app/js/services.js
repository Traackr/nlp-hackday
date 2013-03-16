'use strict';

/* Services */
angular.module('relevantWeb.services', [], function($provide) {
   
   // API Service
   $provide.factory('apiService', function($http) {
      $http.defaults.headers.common['X-Requested-With'] = '';
      var apiKey = 'ac03630f937f9c0ed27cfca2e6380a5a409234db';
      var api = {

         // Influencers search
         searchInfluencers: function(keywords) {
            console.log('API search influencers: ');
            console.log(keywords);
            var q = keywords.map(escape).join(',');
            return $http.get('http://nlp-hackday.traackr.com/1.0/influencers/search?count=25&key='+apiKey+'&keywords='+q);
         }, // End function search()

         // Influencers search
         searchPosts: function(keywords, influencerUids) {
            console.log('API search posts: ');
            console.log(keywords);
            console.log(influencerUids);
            var q = keywords.map(escape).join(',');
            var i = influencerUids.map(escape).join(',');
            return $http.get('http://nlp-hackday.traackr.com/1.0/posts/search?count=50&key='+apiKey+'&keywords='+q+'&influencers='+i);
         } // End function search()

      }; // End API object
      
      // Factory method returns API object
      return api;

   }); // End API service


   // Embed.ly API
   $provide.factory('previewService', function($http) {

      var apiKey = 'c2bcc9d51a7d4c2b873807a2b6562b38';
      var api = {

         // get preview embed.ly object for an array of URLs
         getPreview: function(urls) {
            console.log('Embed.ly preview for: ' + urls);
            var u = urls.map(escape).join(',');
            return $http.get('http://api.embed.ly/1/oembed?key='+apiKey+'&urls='+u);
         } // End function getPreview()

      } // End API object

      // Factory method retiurns API objetc
      return api;

   }); // End Embed.ly API


}); // End services module
