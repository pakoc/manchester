var app = angular.module('app', ['ngRoute', 'ngSanitize']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/',{
			templateUrl : 'templates/preview_tpl.html',
		}).
		when('/main',{
			templateUrl : 'templates/main_tpl.html',
			controller : 'MainPageController'
		}).
		when('/overview',{
			templateUrl : 'templates/overview_tpl.html',
			controller : 'OverviewPageController'
		}).
		when('/companies',{
			templateUrl : "templates/companies_tpl.html",
			controller : 'CompanyPageController'
		}).
		when('/map',{
			templateUrl : "templates/map_tpl.html",
			controller : 'MapPageController'			 
		}).
		when('/places',{
			templateUrl : "templates/places_tpl.html",
			controller : 'PlacesPageController'	
		}).
		when('/skills',{
			
		}).
		when('/research',{
			templateUrl : "templates/research_tpl.html",
			controller : 'ResearchPageController'			
		}).
		when('/news',{
			templateUrl : 'templates/news_tpl.html',
			controller : 'NewsPageController'
		}).
		when('/people_and_networks',{
			templateUrl : 'templates/people_tpl.html',
			controller : 'PeoplePageController'			
		}).
		when('/funding',{
			templateUrl : 'templates/news_tpl.html',
			controller : 'NewsPageController'
		}).
		otherwise({
			redirectTo: '/main'
		})
}]);

 
app.controller('MainPageController',function($scope, $http){
	
	$http.get('data/main.json',{cache : false}).success(function(data)
	{
		$scope.data = data;
	});		
});

app.controller('NewsPageController',function($scope, $http, $location){	
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data)
	{
		$scope.blocks = data.blocks;
		$scope.image = [
			data.blocks[0].items[0].img,
			data.blocks[1].items[0].img
		];
		$scope.currentContent  = [
			data.blocks[0].items[0].content,
			data.blocks[1].items[0].content
		]
		$scope.setSelection($scope.blocks[0].items[0], 0);
	});
	$scope.setSelection = function(item, currentBlock)
	{
		if (item.title)
		{
			$scope.selected = item;
			$scope.currentContentBlock = currentBlock;
			$scope.currentContent[currentBlock] = item.content;
			$scope.image[currentBlock] = item.img;		
		}	
	}
	$scope.isSelected = function(item)
	{
		return $scope.selected === item;
	}	
});

app.controller('CompanyPageController',function($scope, $http, $location, $sce)
{
	$http.get('data/map.json',{cache:false}).success(function(data){
		$scope.alldata = data;	
		$scope.data = [] ; //data;
		$scope.data.items = [] ; //data;

		for (var i in $scope.alldata.items )
			{ //alert($scope.alldata.items[i])
			if ($scope.alldata.items[i].featured) 
				{
				$scope.data.items.push($scope.alldata.items[i]) ; 
				}
			}


		$scope.setSelection($scope.data.items[0]);
	});
	$scope.setSelection = function(item)
	{
		if (item.title)
		{
			$scope.selected = item;
			$scope.currentItem = $scope.data.items.indexOf(item);
		}	
	}
	$scope.getlogo = function(item)
	{
		if (item.alt_logo)
		{
			return item.alt_logo ;
		}	
		return item.logo ;
	}
	$scope.getmediacontent = function(item)
	{
		if (item.alt_media_content)
		{
			return item.alt_media_content ;
		}	
		return item.media_content ;
	}
	$scope.getinfo = function(item)
	{
		if (item.alt_info)
		{
			return item.alt_info ;
		}	
		return item.info ;
	}
	$scope.isSelected = function(item)
	{
		return $scope.selected === item;
	}	
	$scope.trustAsHtml = function(content)
	{
		//console.log(content);
		return $sce.trustAsHtml(content);
	}
});

app.controller('PeoplePageController',function($scope, $http, $location, $sce)
{
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data){
		$scope.alldata = data;	
		$scope.data = data ; //data;
		$scope.setSelection($scope.data.items[0]);
	});
	$scope.setSelection = function(item)
	{
		if (item.title)
		{
			$scope.selected = item;
			$scope.currentItem = $scope.data.items.indexOf(item);
		}	
	}
	$scope.isSelected = function(item)
	{
		return $scope.selected === item;
	}	
	$scope.trustAsHtml = function(content)
	{
		//console.log(content);
		return $sce.trustAsHtml(content);
	}
});

app.controller('ResearchPageController',function($scope, $http, $location, $sce)
{
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data){
		$scope.alldata = data;	
		$scope.data = data ; //data;
		$scope.setSelection($scope.data.items[0]);
	});
	$scope.setSelection = function(item)
	{
		if (item.title)
		{
			$scope.selected = item;
			$scope.currentItem = $scope.data.items.indexOf(item);
		}	
	}
	$scope.isSelected = function(item)
	{
		return $scope.selected === item;
	}	
	$scope.trustAsHtml = function(content)
	{
		//console.log(content);
		return $sce.trustAsHtml(content);
	}
});

app.controller('PlacesPageController',function($scope, $http, $location, $sce)
{
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data){
		$scope.data = data;	
		$scope.setSelection($scope.data.items[0]);
	});
	$scope.getLimitedItems = function(item)
	{
		//if > 1 
		var ret = [] ; 
		ret.push($scope.data.items[0])
		if ($scope.currentItem == 0) 
			{
			ret = [] ; 
			for (i = 1; i < $scope.data.items.length; i++) {
				ret.push($scope.data.items[i]) ; 
				}
			}
		return ret ; 	
	}
	$scope.setSelection = function(item)
	{
		if (item.title)
		{
			$scope.selected = item;
			$scope.currentItem = $scope.data.items.indexOf(item);
		}	
	}
	$scope.isSelected = function(item)
	{
		return $scope.selected === item;
	}	
	$scope.trustAsHtml = function(content)
	{
		//console.log(content);
		return $sce.trustAsHtml(content);
	}
});


app.controller('MapPageController',function($scope, $http, $location, $sce, $filter)
{
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data){
		$scope.alldata  = data;	
		$scope.mapSlider = {
				left : 0,
				top : 0,
				gotoNewPosition : function(item, item_type)
				{
					console.log(item_type)
					var dom_obj = document.querySelector('div[data-'+item_type+'="'+item.title+'"');
					if (dom_obj)
					{						
						switch (item_type){
							case ('place') : 
								$scope.mapSlider.left = (-1)*dom_obj.offsetLeft;
								$scope.mapSlider.top = 0;
								$scope.data.items = getCompaniesByPlace(item);
								$scope.map.changeMapBounds();
								break;
							case ('company') :
								$scope.mapSlider.top = (-1)*dom_obj.offsetTop;
								break;
							default : 
								break;			
						}
					}
				}
			};
		$scope.gotoStartPosition();
	});
	
	$scope.gotoStartPosition = function()
	{
		$scope.data = {items : [].concat($scope.alldata.items)}; 
		$scope.mapSlider.left = $scope.mapSlider.top = 0;
		$scope.map.startSetItems();
		$scope.map.changeMapBounds();
	}
	 
	
	function getCompaniesByPlace(item){
		var companies = [];
		item.companies.forEach(function(item)
		{
			companies = companies.concat($scope.alldata.items.filter(function(value){
				return value.title === item;
			}));
		});
		return companies;
	};
	$scope.getCompaniesByPlace = getCompaniesByPlace;
});




app.directive('headerApp',function()
{
	return{
		templateUrl : 'templates/header_tpl.html'
	}
});



app.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {

    	var CurrentMapBounds = CurrentMapBoundsE = CurrentMapBoundsN = CurrentMapBoundsS = CurrentMapBoundsW = 0,
    		mapVisibleX = 420;
    		mapVisibleWidth = attrs.mapWidth - 420;

        	mapOptions = {
            //center: new google.maps.LatLng(53.38, -2.14),
	            center: new google.maps.LatLng(53.38, -2.14),
	            zoom: 10,
	            zoomControl : false,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            scrollwheel: false
       		 };
   
        // init the map
        function initMap() {
            if (!scope.map) {
                scope.map = new google.maps.Map(element[0], mapOptions);
                //TODO REMOVE COORDINATE CALCULATIONS
				scope.map.changeMapBounds = function()
				{
					mapVisibleX =  scope.Framewidth + scope.Frameleft ;
					var MinLat = MinLng = 9999,
						MaxLat = MaxLng = -9999 ; 
					for (var i in scope.data.items )
					{					
						if (1.0*scope.data.items[i].lat < MinLat) {MinLat = 1.0*scope.data.items[i].lat } 
						if (1.0*scope.data.items[i].lat > MaxLat) {MaxLat = 1.0*scope.data.items[i].lat }
						if (1.0*scope.data.items[i].lng < MinLng) {MinLng = 1.0*scope.data.items[i].lng } 
						if (1.0*scope.data.items[i].lng > MaxLng) {MaxLng = 1.0*scope.data.items[i].lng }
					}

					MinLng = MinLng + (MinLng - MaxLng)*(attrs.mapWidth/mapVisibleWidth) ; //not overlap left frame
					var bounds = new google.maps.LatLngBounds();
					bounds.extend(new google.maps.LatLng(MinLat,MinLng))
						  .extend(new google.maps.LatLng(MaxLat, MaxLng));
					scope.map.fitBounds(bounds);
				}
				scope.map.startSetItems = function()
				{
					scope.data.items = scope.data.items.slice(0,10);
				}

            }
        }  
        // show the map and place some markers
        initMap();  
        
        function BindToGrid(myX)
		{
			var retX = 50*Math.round(myX/50) ; 
			return retX; 
		}

        
        google.maps.event.addListener(scope.map, 'bounds_changed', function () {
			
			var _CurrentMapBounds   = (scope.map).getBounds(),
				_CurrentMapBoundsNE = _CurrentMapBounds.getNorthEast(),
				_CurrentMapBoundsSW = _CurrentMapBounds.getSouthWest();
			CurrentMapBounds  = _CurrentMapBounds ;
			CurrentMapBoundsW = _CurrentMapBoundsSW.lng();
			CurrentMapBoundsS = _CurrentMapBoundsSW.lat();
			CurrentMapBoundsE = _CurrentMapBoundsNE.lng();
			CurrentMapBoundsN = _CurrentMapBoundsNE.lat();
		
			//GRID PART
			var OccupiedCellsHash = new Object(),
				retX,
				retY,
				cell_id;
			for (each in scope.data.items) {
				
				retX = attrs.mapWidth*(scope.data.items[each].lng - CurrentMapBoundsW)/(CurrentMapBoundsE - CurrentMapBoundsW) ; 
				retY = attrs.mapHeight*(scope.data.items[each].lat - CurrentMapBoundsN)/(CurrentMapBoundsS - CurrentMapBoundsN) ;
				cell_id = Math.round(retX/50.0) + '_' + Math.round(retY/50.0) ; 
				if ((cell_id in OccupiedCellsHash) == 0) {OccupiedCellsHash[cell_id] = []}
				OccupiedCellsHash[cell_id].push(each) ;
				scope.$apply(function(){scope.data.items[each].screenX = BindToGrid(retX) ; })
				scope.$apply(function(){scope.data.items[each].screenY = BindToGrid(retY) ; })
			}
			
			//DISTRIBUTE GRID
			for (each in OccupiedCellsHash) {
				if (OccupiedCellsHash[each].length > 1) {
					eachxy = each.split('_')
					for (var i = 1; i < OccupiedCellsHash[each].length ; i++) {
						nextcellid:
						for (j = 1; j < 3; j++) {
							for (k = 1; k < 3; k++) {
							neweachxy = [j + 1*eachxy[0], k + 1*eachxy[1]] ; 
							neweach = neweachxy[0]+'_'+neweachxy[1] ; 
							if ((neweach in OccupiedCellsHash) == 0) {
									OccupiedCellsHash[neweach] = [OccupiedCellsHash[each][i]]
									break nextcellid ; 
								}
							}
						}
					}
				}
			}

			//FINALLY USE COLLECTED GRID
			for (each in OccupiedCellsHash) {
				cellsXY = each.split('_')
				retX = cellsXY[0]*50 ; 
				retY = cellsXY[1]*50 ; 
				scope.$apply(function(){scope.data.items[OccupiedCellsHash[each][0]].screenX = BindToGrid(retX) ; })
				scope.$apply(function(){scope.data.items[OccupiedCellsHash[each][0]].screenY = BindToGrid(retY) ; })
			}

        });
        
    };
    
    return {
        restrict: 'AE',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link //function already defined above
    };
});

app.controller('OverviewPageController',function($scope, $http, $location){
	$scope.mainChartData = {};
	$scope.isSubChartExist = false;
	var initChart;
	$scope.callBack = function(f_initChart)
	{
		initChart = f_initChart;
	}
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data){
		console.log(data.items);
		if (data.items){
			init(data);
		}
	});

	function init(data)
	{
		$scope.mainChartData = data.items;
		initChart();
	}
});

app.directive('barChart',function(){
	var link  = function(scope, element, attrs)
	{
		var options = {
			part 	 : attrs.part || 0,
			all  	 : attrs.all || 100,
			barColor : attrs.barcolor || '#00673C',
			title    : attrs.title || false,
			label    : attrs.label || false
		},
		bar = element[0].querySelector('.bar');
		bar.style.width = element[0].offsetWidth * options.part/options.all + 'px';
		bar.style.backgroundColor = options.barColor;
		scope.title = options.title;
		scope.label = options.label;
	}
	return {
		template : '<div><label ng-if="title" class="bar-chart-title">{{title}}:</label><div class="bar-chart"><div class="bar"></div><span ng-if="label" class="bar-chart-label">{{label}}</span></div></div>',
		replace  : true,
		scope: {},
		link     : link
	}
});


app.directive('doubleDonuteChart', function()
{
	var link = function(scope,element,attrs)
		{
			var mainChartOptions = {
				donut : true,
 				donutWidth : 35,
 				height : 530,
 				width : 530,
 				labelDirection: 'explode',
 				labelOffset: 60,
 				chartPadding: 160,
 				showLabel : true,
 				responsive : false,
 				textAnchor: 'middle'

			},
			subChartOptions = {
				donut : true,
 				donutWidth : 30,
 				height : 570,
 				width : 570,
 				labelDirection: 'explode',
 				labelOffset: 30,
 				chartPadding: 150,
 				showLabel : true,
 				responsive : false
			},
			mainChart = null,
			subChart = null;
			var initChart = function()
			{
				 
				var series =[], labels = []; 
				(function()
				{
					scope.mainChartData.forEach(function(item)
					{
						series.push(item.num);
						labels.push(item.title + ' >' );
					});
				}());
				   
				var mainChartId = element[0].querySelector('.main-chart').id = getId();
 				var subChartId = element[0].querySelector('.sub-chart').id = getId();
 				mainChart =  new Chartist.Pie('#'+mainChartId,{
	 				series : series,
	 				labels : labels,
	 			},
	 			mainChartOptions);
  				var index = 0;
	 			mainChart.on('draw',function(data){
	 				if (data.type === 'slice')
	 				{
	 					data.element._node.value = data.value;
	 					data.element._node.onclick = function(e)
	 					{
	 						if (scope.isSubChartExist)
	 						{
	 							mainChart.options.showLabel = true;
	 							clearSubChart();
	 							scope.isSubChartExist = false;
	 						}
	 						else
	 						{
	 							mainChart.options.showLabel = false;
		 						drawSubChart(e.target.value);
		 						scope.isSubChartExist = true;
	 						}
	 						mainChart.update(mainChart.data, mainChart.options);	
	 					}

	 					//x_0 = 
	 				}
	 				else
	 				{
	 					data.element._node.classList.add('animated');
 						data.element._node.classList.add('fadeIn');
 						data.element._node.classList.add('animation-delay-'+ data.index);
 						//console.log(data.index)
 						var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
 						tspan.innerHTML = scope.mainChartData[data.index].num + ' companies';
 						tspan.setAttribute('dy', 16);
 						tspan.setAttribute('dx', -data.element._node.offsetWidth);
 						data.element._node.appendChild(tspan)
 						var x_0 = mainChart.container.children[0].offsetWidth/2;
 						var y_0 = mainChart.container.children[0].offsetHeight/2;
 						// console.log(data.element._node.offsetTop, x_0, y_0 );
 						var kx = 1;
 						var ky = 1;
 						var stroke = '#555555';
 						var elem_x = data.element._node.offsetLeft - x_0;
 						var elem_y = data.element._node.offsetTop + data.element._node.offsetHeight/1.8 - y_0;
 						var end_line_x = data.element._node.offsetLeft + data.element._node.offsetWidth;
 						if (elem_x < 0 ) {
 							 kx = -1 ; 
 							 elem_x = data.element._node.offsetLeft + data.element._node.offsetWidth - x_0;
 							 end_line_x = data.element._node.offsetLeft;
 						};
 						if (data.element._node.offsetLeft - y_0 < 0 ) { ky = -1 ; }
 						var ang = (Math.atan((elem_y)/(elem_x)));
 						var x1 = x_0+(kx)*Math.cos(ang)*110;
 						var y1 = y_0+(ky)*Math.sin(ang)*110;
 						var x2 = x_0+(kx)*Math.cos(ang)*140;
 						var y2 = y_0+(ky)*Math.sin(ang)*146;
 						
 						
 						//console.log(x_0+Math.cos(ang)*120, y_0+Math.sin(ang)*100, scope.mainChartData[data.index]);
 						//console.log(x_0+Math.cos(ang)*200, y_0+Math.sin(ang)*200, scope.mainChartData[data.index]);
//<polyline points="0,0 50,0 150,100 250,100 300,150" fill="rgb(249,249,249)" stroke-width="1" stroke="rgb(0,0,0)"/>
 						var line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
 						//if (kx>0)
 						{
 							line.setAttribute('points', x1 + ',' + y1 + ',' + x2 + ',' + y2 + ',' + end_line_x + ',' + y2);
 						line.setAttribute('stroke-width', '1');
 						line.setAttribute('stroke', stroke);
 						line.setAttribute('fill-opacity', '0');
 						line.setAttribute('title', scope.mainChartData[data.index].num)
 						data.element._node.parentNode.appendChild(line);
 						}
	 				}
	 				 

	 				

	 			});
	 			function clearSubChart()
	 			{
	 				 document.querySelector( '#'+subChartId+' svg').remove();
	 				 subChart.detach();
	 			}
	 			function drawSubChart(val)
	 			{
	 				 
	 				var subSeries = [],
	 					subLabels = [];
	 				var item  = scope.mainChartData.filter(function(item)
	 				{
	 					return item.num == val;
	 				});

	 				(function()
					{
						item[0].items.forEach(function(item)
						{
							subSeries.push(item.num);
							subLabels.push(item.title + '('+item.percent+'%)');
						});
					}());
	 				subChart = new Chartist.Pie('#'+subChartId,{
		 				series : subSeries,
		 				labels : subLabels
		 			},
		 			subChartOptions)
					 				.on('draw', function(data) {

											  if(data.type === 'slice') {

											    // Get the total path length in order to use for dash array animation
											    var pathLength = data.element._node.getTotalLength();

											    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
											    data.element.attr({
											      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
											    });

											    // Create animation definition while also assigning an ID to the animation for later sync usage
											    var animationDefinition = {
											      'stroke-dashoffset': {
											        id: 'anim' + data.index,
											        dur: 500,
											        from: -pathLength + 'px',
											        to:  '0px',
											        easing: Chartist.Svg.Easing.easeInSine,
											        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
											        fill: 'freeze'
											      }
											    };

											    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
											    if(data.index !== 0) {
											      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
											    }

											    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
											    data.element.attr({
											      'stroke-dashoffset': -pathLength + 'px'
											    });

											    // We can't use guided mode as the animations need to rely on setting begin manually
											    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
											    data.element.animate(animationDefinition, false);

											     
											  }
											  else
											  {

							 					data.element._node.classList.add('animated');
						 						data.element._node.classList.add('fadeIn');
						 						data.element._node.classList.add('animation-delay-'+ (parseInt(data.index)+1));
	 				 					  		}
											});
	 			}
	 			


			}
			scope.callBack(initChart);
			

			 
 			/*mainChart.responsiveOptions = {showLabel : false}

 			mainChart.on('draw',function(data)
 			{
 				if (data.type === 'slice')
 				{

 					data.element._node.onclick = function()
	 				{
	 					console.log(mainChart);
	 					mainChart.options.showLabel = false; 
	 					mainChart.update(mainChart.data,mainChart.options);
	 					drawSubChart();
	 					alert();

	 				}
 				}
 				



 				drawSubChart = function(){

		 					 
			 				subChart = new Chartist.Pie('#'+element[0].querySelector('.sub-chart').id,{
				 				series : [10,20,40,20],
				 				labels : ["20", "aaa", "vv"]
				 			},
				 			subChartOptions)
				 				.on('draw', function(data) {
								  if(data.type === 'slice') {
								    // Get the total path length in order to use for dash array animation
								    var pathLength = data.element._node.getTotalLength();

								    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
								    data.element.attr({
								      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
								    });

								    // Create animation definition while also assigning an ID to the animation for later sync usage
								    var animationDefinition = {
								      'stroke-dashoffset': {
								        id: 'anim' + data.index,
								        dur: 500,
								        from: -pathLength + 'px',
								        to:  '0px',
								        easing: Chartist.Svg.Easing.easeInOutSine,
								        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
								        fill: 'freeze'
								      }
								    };

								    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
								    if(data.index !== 0) {
								      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
								    }

								    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
								    data.element.attr({
								      'stroke-dashoffset': -pathLength + 'px'
								    });

								    // We can't use guided mode as the animations need to rely on setting begin manually
								    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
								    data.element.animate(animationDefinition, false);
								  }
								});
		 			}

 			});*/

	}


	function getId()
	{
		return '_' + Math.random().toString(36).substr(2, 9);
	}
	return {
		template : '<div style="position: relative;"><div class="main-chart"></div><div style="position : absolute; left : -20px; top : -20px;" class="sub-chart"></div></div>',
		replace : true,
		scope : 'controller',
		link : link
			 
		}
});


app.directive('donuteChart',function()
{
	var link = function(scope,element,attrs)
	{
		element[0].id = 'chart_'+getId();
	 	 
		var options = {
			donut : true,
			donutWidth : 20,
			height : attrs.height || 200,
			width  : attrs.width || 200,
		}

		 
		var chart = new Chartist.Pie('#'+element[0].id, {
		  series : attrs.series.split(','),
		  labels : attrs.labels.split(',')
		},
		options);
		
		chart.on('draw', function(data) {
		  if(data.type === 'slice') {
		  	
		  	if (attrs.stroke) element[0].querySelector('path').style.stroke= attrs.stroke;
		    
		    if (attrs.animate) 
	    	{
	    		var pathLength = data.element._node.getTotalLength();

			    data.element.attr({
			      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
			    });

			    var animationDefinition = {
			      'stroke-dashoffset': {
			        id: 'anim' + data.index,
			        dur: 2000,
			        from: -pathLength + 'px',
			        to:  '0px',
			        easing: Chartist.Svg.Easing.easeOutQuint,
			        fill: 'freeze'
			      }
			    };

			   
			    if(data.index !== 0) {
			      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
			    }

			    
			    data.element.attr({
			      'stroke-dashoffset': -pathLength + 'px'
			    });

			    data.element.animate(animationDefinition, false);
			  }
			}
	});
		
	};
	function getId()
	{
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	return {
		template : '<div class="donute-chart"></div>',
		replace : true,
		scope : {},
		link : link
	}
});

app.filter('randomize', function()
{
	return function(input)
	{	
		if (input)	return Math.floor((Math.random()*input)+1);
	}
});
 
