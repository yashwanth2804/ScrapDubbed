var Scrapapp = angular.module('scrap', ['angular-growl']);


// $scope.filters = [{
//     "name": "Watch Sample Video",
//     "url": "http://linkshrink.net/71I89n"

// },
// {
//     "name": "Watch Sample Video",
//     "url": "http://linkshrink.net/71I89n"

// }
// ];

Scrapapp.controller('scrpCtrl',
    ['$scope', '$http','growl',

        function ($scope, $http,growl) {
			
			/* $scope.showWarning=function(){
				growl.warning('This is a warning mesage.',{title:'Warning!'})
				}; */
			 $scope.addSpecialWarnMessage = function() {
        growl.addWarnMessage("This adds a warn message");
         
    }
			
            // default post header
            // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $scope.data = {};
            $scope.count = 0;
           
			 var videoID = 'videoclip';

            $scope.clk = function () {

                console.log("clicked");
				//clear all filters 
				 $scope.filters ={};
				
                var baseurl = "http://192.168.0.8:8001/search";
                var postObject = new Object();
                postObject.MovieName = $scope.search;
                

                $http({
                    url: baseurl,
                    method: "POST",
                    data: postObject,
                    headers: {
                        'Content-Type': 'application/json'
                    },

                }).then(function(data, status, headers, config) {
                    
                    console.log(data.data);
                    $scope.filters=data.data;
                 

                }, function(data, status, headers, config) {
                    console.log(data);
                });




            };


            ////ng-click function for Linksharenet

            $scope.linkSharenet = function (link) {

                console.log("Linkshare cliked"+link);
                var postObject = new Object();
                var baseurl = "http://192.168.0.8:8001/LinkSharenet";
                postObject.Link = link;
                $http({
                    url: baseurl,
                    method: "POST",
                    data: postObject,
                    headers: {
                        'Content-Type': 'application/json'
                    },

                }).then(function (data, status, headers, config) {
                     
                   console.log("data is"+typeof(data.data));
				   
					if( data.data == "01" ){
						console.log("error");
					}
				   else{
					   $scope.vidurl='';
					$scope.dwnurl ='';
                    $scope.vidurl=data.data+"?mime=true";
					$scope.dwnurl =data.data;
					$scope.neww ="";
                    
					  var sourceID = 'mp4video';
					   $scope.neww = $scope.vidurl;
					console.log("final url"+ $scope.neww);	
					
					
					var urlis = new URL($scope.neww);
					var cnhgurl = "https://oload.download"+urlis.pathname;
					$scope.chgurl= '';
					$scope.chgurl= cnhgurl;
					
					document.getElementById("videolink1dwn").classList.remove('disabled');
					document.getElementById('videolink1').disabled = false;
					   
				   }
                    
					 
					   
						 
						
					   
  

                    // $scope.url=data.data.Link;
                    // myVideo.load();myVideo.play();
                //     $scope.player = videojs("player", {
                //         "controls": true,
                //         "autoplay": false,
                //         "preload": "auto",
                //         "loop": false
                // });
                // $scope.player.src({
                //         "type": "video/ogg",
                //         "src": data.data
                // });


                }, function (data, status, headers, config) {
                    console.log(data);
                });

            };


            ///ng- clik function end

            

        }]);
