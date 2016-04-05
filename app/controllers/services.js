 /* Generic Services */                                                                                                                                                                                                    
 angular.module('app.services', [])                                                                                                                                                                        
   .factory("genericServices", function() {         
                                    
     return {
	
	 
    getValues: function(data, stat, info)
    {
		
		
     var selectedValues = data.map(function(x) {
      return parseFloat(x[stat]);
     })
	
	 var i = selectedValues.indexOf(Math.max.apply(Math, selectedValues));
	 
	 var result = {};
	 
	 info.forEach(function(x) {
      result[x] = data[i][x];
     })
	 
	 
	 return result;
   
	
    }



	}
		
		
   
   });
