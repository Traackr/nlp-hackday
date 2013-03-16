'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Relevant Web', function() {

   beforeEach(function() {
      browser().navigateTo('../../app/index.html');
   });


   it('should automatically redirect to /home', function() {
      expect(browser().location().url()).toBe("/home");
   });


   describe('home page', function() {

      beforeEach(function() {
         browser().navigateTo('#/home');
      });


      it('should add keywords', function() {

         expect(repeater('.keyword', 'keywords list').count()).toBe(0);
         input('keyword').enter('traackr');
         element('#add-kwd-submit').click();
         expect(repeater('.keyword', 'keywords list').count()).toBe(1);

      });
      
      it('should ignore dup keywords', function() {

         expect(repeater('.keyword', 'keywords list').count()).toBe(0);
         input('keyword').enter('traackr');
         element('#add-kwd-submit').click();
         input('keyword').enter('traackr');
         element('#add-kwd-submit').click();
         expect(repeater('.keyword', 'keywords list').count()).toBe(1);

      });

      it('should ignore empty strings', function() {
         
         expect(repeater('.keyword', 'keywords list').count()).toBe(0);
         element('#add-kwd-submit').click();
         expect(repeater('.keyword', 'keywords list').count()).toBe(0);

      });

      it('should add keyword comma separated', function() {

         input('keyword').enter('traackr, boston');
         element('#add-kwd-submit').click();
         expect(repeater('.keyword', 'keywords list').count()).toBe(2);

      });


      it('should delete keyword', function() {

         input('keyword').enter('traackr, boston');
         element('#add-kwd-submit').click();
         element('.keyword:first > a').click();
         expect(repeater('.keyword', 'keywords list').count()).toBe(1);

      });

   });

});
