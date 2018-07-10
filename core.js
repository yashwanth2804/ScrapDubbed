var Scrapapp = angular.module('scrap', []);


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
    ['$scope', '$http',

        function ($scope, $http) {
            // default post header
            // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $scope.data = {};
            $scope.count = 0;
            $scope.filters ={};

            $scope.clk = function () {

                console.log("clicked");
                var baseurl = "http://127.0.0.1:8001/search";
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
                var baseurl = "http://127.0.0.1:8001/LinkSharenet";
                postObject.Link = link;
                $http({
                    url: baseurl,
                    method: "POST",
                    data: postObject,
                    headers: {
                        'Content-Type': 'application/json'
                    },

                }).then(function (data, status, headers, config) {
                    console.log("url"+data.data);
                    console.log(data);
                    $scope.vidurl='';
                    $scope.vidurl=data.data+"?mime=true";

                    var myVideo = document.getElementById("video1");
                    myVideo.play();

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
