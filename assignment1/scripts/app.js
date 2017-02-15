(function(){
'use strict';
    
    angular.module('lunchCheckerApp', [])
    .controller('lunchCheckerController',lunchCheckerController);
    
    lunchCheckerController.$inject = ['$scope'];
    
    function lunchCheckerController($scope){
        $scope.message = "";
        $scope.lunchMenu = "";
        $scope.messageColor = {
            "color" : ""
        }
        $scope.textBoxBorderColor = {
            "border-color": ""
        };
        
        /* This function does not count empty characters as lunch items */
        
        $scope.checkIfTooMuch = function() {
           var lunchMenuArray = $scope.lunchMenu.split(',');
           var lunchMenuLength = $scope.lunchMenu.split(',').length;
           var length = lunchMenuLength;

            for(var i=0; i<lunchMenuLength; i++){
                if(lunchMenuArray[i] == "" || lunchMenuArray[i] == " ") {
                    length -= 1;
                }
            }
           
           if(length == 0){
               $scope.messageColor.color = "red";
               $scope.textBoxBorderColor["border-color"] = "red";
               $scope.message = "Please enter data first";
           } 
           else if(length > 3){
               $scope.messageColor.color = "green";
               $scope.textBoxBorderColor["border-color"] = "green";
               $scope.message = "Too Much!";
           }
           else if(length > 0 && length <= 3){
                $scope.messageColor.color = "green";
                $scope.textBoxBorderColor["border-color"] = "green";
                $scope.message = "Enjoy!";
           }
        };
        
    }
})();