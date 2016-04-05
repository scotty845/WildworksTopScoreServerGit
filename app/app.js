'use strict';


(function () {

    var app = angular.module("topScoresApp", ['ngRoute','ngSanitize','app.services','ui.bootstrap','ui']);
    app.config(function ($routeProvider) {
        $routeProvider
		
		 .when("/Scores", {
            templateUrl: '/templates/Scores.html',
            controller: "ScoresCtrl"
        })
        
		//.when("/Scores", {
          //  templateUrl: '/templates/Scores2.html',
          //  controller: "ScoresCtrl2"
        //})
		
        .otherwise({ redirectTo: "/Scores" })
		
		//.otherwise({ redirectTo: "/person" })
    });
}());
