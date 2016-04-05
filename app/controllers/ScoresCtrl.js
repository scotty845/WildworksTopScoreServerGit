'use strict';


(function () {
    var topScoresApp = angular.module("topScoresApp");
	
    var ScoresCtrl = function ($scope,$filter, $http,genericServices)
    {
		 
		$scope.working = 'Angular is Working';
		$scope.genericServices = genericServices;
        $scope.formData = {};
		$scope.formValid = {};
		$scope.truefalse = "true";
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function
		
		//after game server http.get('/scores')
		//set $scope.mytopscores for display and manipulation
		var onSurveyGetQuestionsCompleted = function(response){
     		  $scope.mytopscores = response.data.mytopscores;
			
			  console.log('the scores are....' + JSON.stringify($scope.mytopscores))
			 
			  console.log('the response from the server is');
			  console.log(response);
			  
			  $scope.adminRights = response.data.admin;
			  console.log('the $scope.adminRights is..' +$scope.adminRights );
			  
			  $scope.sessionData = response.data.sessionData;
			  
			  $scope.highestScorer = genericServices.getValues($scope.mytopscores,"topScore",["uname","topScore"]);
			  
    	}
		
		// funtion refresh 
		//call node game server API app.get(/Scores)
		//called again after post/insert and put/update
		//called on iitial page load to /Scores
		 var refresh = function(){
        	
			$http.get('/Scores')
        	   .then(onSurveyGetQuestionsCompleted, onError);	 
				   
         }
        
        refresh();
		
		
		
	    // set addscores div to false to hide
		$scope.showContent = false;

		//function to toggle add scores
        $scope.myToggleAddScores = function() {
            $scope.showContent = !$scope.showContent;
        }
		
		
		
	//
	// logoutUser
	//
    //call node game server API app.get /Logout
	//API game server logsout user returns last inserted id
    $scope.logoutUser = function () {
		console.log('at logout user..');
        //console.log('the $scope.formValid is ...'  + JSON.stringify($scope.formValid ) );
		
	   
	    $http.get('/Logout')
	  
			.success(function(data) {
            console.log('just did a user validation');
			console.log('the server data is');
			console.log(data);
			
			//clear out form for next entry
			//$scope.formValid.ValidUserName = "";
			//$scope.formValid.ValidEmailName = "";
			
			
			refresh(); // called to update data for display
			
			
           }).error(function(data) {
            console.error("error in get logout");
			console.log('the server data is');
			console.log(data);
           })
	
	
	};
	
	
	//
	// logoutUser
	//	
		
		
		
		
		
		
		
		
		
		
		
	//
	// validateUser
	//
    //call node game server API app.post /Login
	//API game server returns last inserted id
    $scope.validateUser = function () {
		console.log('at validate user..');
        console.log('the $scope.formValid is ...'  + JSON.stringify($scope.formValid ) );
		
	   
	    $http.post('/Login', $scope.formValid)
	  
			.success(function(data) {
            console.log('just did a user validation');
			console.log('the server data is');
			console.log(data);
			
			//clear out form for next entry
			$scope.formValid.ValidUserName = "";
			$scope.formValid.ValidEmailName = "";
			
			
			refresh(); // called to update data for display
			
			
           }).error(function(data) {
            console.error("error in posting");
			console.log('the server data is');
			console.log(data);
           })
	
	
	};
	
	
	//
	// validateUser
	//
		
		
		
	
	//
	// addScore
	//
    //call node game server API app.post /addScore
	//API game server returns last inserted id
    $scope.addScore = function (entryId) {
		console.log('at add score..');
        console.log('the $scope.formData is ...'  + JSON.stringify($scope.formData ) );
		console.log('the $scope.value is ...'  + $scope.quantity2  );
		
	   
	    $http.post('/addScore', {entrybyUserId:entryId,addedUserName:$scope.formData.addedUserName,addedUserEmail:$scope.formData.addedUserEmail,addedUserScore:$scope.formData.addedUserScore} )
	  
			.success(function(data) {
            console.log('just added user score');
			console.log('the server data is');
			console.log(data);
			
			//clear out form for next entry
			$scope.formData.addedUserName = "";
			$scope.formData.addedUserEmail = "";
			$scope.formData.addedUserScore = "";
			
			refresh(); // called to update data for display
			
			
           }).error(function(data) {
            console.error("error in posting");
			console.log('the server data is');
			console.log(data);
           })
	
	
	};
	
	
	//
	// addScore
	//
	
  
	    //
		// updateQuestion 
	    //
		//call node game server API app.put /updateScore
	    //API game server returns effected update id
		 $scope.updateScore = function(score){
			
            console.log('the passed in question in updateScore is ' + JSON.stringify(score));
			 
			console.log('the passed in score.id in updateScore is ' + JSON.stringify(score.score_id));
			  
			  
			
		$http.put('/updateScore/' + score.score_id + '/' + score.topScore, {params: {scoreId:score.score_id, scoreAmount:score.score}})
			
			.success(function(data) {
             console.log("updated score successfully");
			 console.log('the server data is');
			 console.log(data)
			 refresh(); // to update display data
			
        }).error(function(data) {
            console.error("error in updating score");
			console.log('the server data is');
			console.log(data)
        })
			
			
			
		   
        };
		//
		// updateQuestion 
		//
			
		
		

	}

	
	
	// FOR INLINE EDITING
topScoresApp.directive('inlineEdit', function($timeout){
  return {
        scope: {
            model: '=inlineEdit',
            handleSave: '&onSave',
            handleCancel: '&onCancel',
            presetValues: '=presetValues',
			handleDelete: '&onDelete'
        },
        link: function (scope, elm, attr) {
            var previousValue,
                previousSelectVal;

            scope.inputType = {
                settingValuesSelectbox: (scope.presetValues && scope.presetValues.length > 0) ? scope.presetValues : false
            };

            scope.edit = function () {
                scope.editMode = true;

                previousValue = scope.model;


                if (scope.inputType.settingValuesSelectbox) {

                } else if (scope.model !== 'true' && scope.model !== 'false') {
                    $timeout(function () {
                        elm.find('input')[0].focus();
                    }, 0, false);
                }
            };
			
			
				//scope.delete
			     scope.deleteItem = function () {
					 console.log('deleteItem');
					
                      scope.handleDelete({ value: scope.model });
				   
					  scope.editMode = false; 
			
               };

			   //scope.delete
			
			

            scope.save = function (param) {                
                scope.handleSave({ value: scope.model });
                scope.editMode = false;
				//console.log(param)
            };

            scope.cancel = function () {
                scope.editMode = false;
                scope.model = previousValue;
                scope.handleCancel({ value: scope.model });
            };

		
			
            scope.selectChanged = function (param) {
                previousSelectVal = param;
            };
        },
        templateUrl: 'inlineEditTemplate'
    };
	
	});
	
	// FOR INLINE EDITING
	
	
	
	//
	//
	
	//area to place additional app directives if neccessary
	
	//
	//
	
	

    topScoresApp.controller('ScoresCtrl', ScoresCtrl);
}());