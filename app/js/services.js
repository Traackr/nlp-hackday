'use strict';

/* Services */
angular.module('relevantWeb.services', [], function($provide) {
   
   // API Service
   $provide.factory('apiService', function($http) {
      $http.defaults.headers.common['X-Requested-With'] = '';
      var api = {

         // Influencers search
         searchInfluencers: function(keywords) {
            console.log('API search influencers: ');
            console.log(keywords);
            var q = keywords.map(escape).join(',');
            return $http.get('http://nlp-hackday.traackr.com/1.0/influencers/search?count=25&keywords='+q);
         }, // End function search()

         // Influencers search
         searchPosts: function(keywords, influencerUids) {
            console.log('API search posts: ');
            console.log(keywords);
            console.log(influencerUids);
            var q = keywords.map(escape).join(',');
            var i = influencerUids.map(escape).join(',');
            return $http.get('http://nlp-hackday.traackr.com/1.0/posts/search?count=10&keywords='+q+'&influencers='+i);
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

      }; // End API object

      // Factory method returns API objetc
      return api;

   }); // End Embed.ly API

   // Alchemy API service
   $provide.factory('alchemyService', function($http) {

      var baseUrl = 'http://access.alchemyapi.com';
      var apiKey = '9c289a3a07bd29bbbfac4ac7405aaf98b5e0793b';
      var api = {

         // Get keywords for a post URL
         extractKeywords: function(url, index) {

            console.log('Alchemy URLGetRankedKeywrods()');
            
            var reqUrl = baseUrl + '/calls/url/URLGetRankedKeywords?apikey='+apiKey+'&outputMode=json&jsonp=JSON_CALLBACK&url='+url;
            if (url.indexOf('http://twitter.com') == 0) {
                reqUrl += '&sourceText=xpath&xpath=//html/body/div/div[2]/div/div/div/div/p';
            }
            var rez = $http.jsonp(reqUrl);
            rez.success(function(data) {
               data.index = index;
            });
            return rez;
            //var kwds = {
               //"url": "http://traackr.com/blog/2013/03/how-to-use-influencer-marketing-to-launch-a-new-product/",
               //"language": "english",
               //"keywords": [
                 // {
                    // "text": "influencers",
                  //   "relevance": "0.949607"
                //  }
              // ]
            //};
            //return kwds
         } // 

      }; // End api object

      // Factory method returns API object
      return api;

   });

}); // End services module
