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
	var init_callbak_fun_arr = [];
	$scope.callBack = function(f_init)
	{
		init_callbak_fun_arr.push(f_init);
	};
	
	$http.get('data/'+$location.path()+'.json',{cache:false}).success(function(data){
		if (data.items){
			init(data);
		}
	});

	function init(data)
	{
		$scope.mainChartData = data.items;
		$scope.defaultChartData = data.overview;
		$scope.currentChartData = data.overview;
		$scope.lineChart = {
			data : '11, 102, 12',
			labels : '2013, 2014, 2015'
		}
		init_callbak_fun_arr.forEach(function(fun){
			fun();
		});
		
	};
	$scope.turnover = {
		labels : "2013,2014,2015",
		data : "1,2,3"
	}
	$scope.$watch('currentChartData',function(data)
	{
		var labels_arr = [],
			data_arr = [];
		if (data&&data.turnover)
		{
			data.turnover.forEach(function(item){
				labels_arr.push(item.year);
				data_arr.push(item.millions);
			});
			$scope.turnover.labels = labels_arr.join(',');
			$scope.turnover.data = data_arr.join(',');
		}		 
	});
		
});

app.directive('barChart',function(){
	var link  = function(scope, element, attrs)
	{
		var options = {
			part 	 : attrs.part || 0,
			all  	 : attrs.all  || 100,
			barColor : attrs.barcolor || '#00673C',
			title    : attrs.title || false,
			label    : attrs.label || false,
			leftlabel : attrs.leftlabel || false
		},
		bar = element[0].querySelector('.bar');
		bar.style.width = element[0].offsetWidth * options.part/options.all + 'px';
		bar.style.backgroundColor = options.barColor;
		scope.title = options.title;
		scope.label = options.label;
		scope.leftlabel = options.leftlabel;
	}
	return {
		template : '<div><label ng-if="title" class="bar-chart-title">{{title}}:</label><div class="bar-chart"><span ng-if="leftlabel" class="left-label">{{leftlabel}}</span><div class="bar"></div><span ng-if="label" class="bar-chart-label">{{label}}</span></div></div>',
		replace  : true,
		scope: {},
		link     : link
	}
});

app.directive('lineChart',function(){
	 
	var link = function(scope, element, attrs){
		element.id = 'linechart_' + Math.random().toString(36).substr(2, 9);
		var ctx = element[0].getContext("2d");	  
	 	var data = {
		    labels: ['2013','2014','2015'],
		    datasets: [  
		        {  
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data : [11 , 100, 200] 
		        } 
		    ]
		};
		  var lineChart = new Chart(ctx).Line(data);
		
		attrs.$observe('data',function()
		{
			data.labels = attrs.labels.split(',');
			data.datasets[0].data = attrs.data.split(',');
			data.datasets[0].data.forEach(function(val, index)
			{
				lineChart.datasets[0].points[index].value = parseInt(val);
			});
			lineChart.update();
		});
				 
	}
	return{
		replace : true,
		template : '<canvas></canvas>',
		scope : 'controller',
		link : link
	}

});
app.directive('doubleDonuteChart', function()
{
	var link = function(scope,element,attrs){

		var mainChartOptions = {
			donut : true,
				donutWidth : 35,
				height : 530,
				width : 530,
				labelDirection: 'explode',
				labelOffset: 100,
				chartPadding: 160,
				showLabel : true,
				responsive : false				
		},
		subChartOptions = {
			donut : true,
				donutWidth : 30,
				height : 570,
				width : 570,
				labelDirection: 'explode',
				labelOffset: 40,
				chartPadding: 150,
				showLabel : true,
				responsive : false
		},
		mainChart = null,
		subChart = null;
		var initChart = function()
		{

			var series  = [], labels = [],
			mainChartId = element[0].querySelector('.main-chart').id = getId(),
				subChartId  = element[0].querySelector('.sub-chart').id = getId();
			scope.mainChartData.forEach(function(item)
			{
				series.push(item.num);
				labels.push(item.title);
			});
			 
				mainChart =  new Chartist.Pie('#'+mainChartId,{
 				series : series,
 				labels : labels,
 			}, mainChartOptions);

				addAnimation(mainChart.container, 'zoomIn', 1);
				var index = 0;
 			mainChart.on('draw',function(data){
 				if (data.type === 'slice')
 				{
 					data.element._node.value = data.value;
 					data.element._node.onclick = function(e)
 					{	

 						if (scope.isSubChartExist)
 						{
  							clearSubChart();
 							scope.isSubChartExist = false;
 							mainChart.update(mainChart.data, mainChart.options);	

 							scope.$apply(scope.currentChartData = scope.defaultChartData);
 						}
 						else
 						{
  							var textFields = mainChart.container.children[0].querySelectorAll('g>text.ct-label'),
 							lines = mainChart.container.children[0].querySelectorAll('polyline');
 							[].forEach.call(textFields,function(item,index){
 								item.style.visibility = 'hidden';
 								lines[index].style.visibility = 'hidden';
 							});
							textFields[data.index].style.visibility = 'visible';
							lines[data.index].style.visibility = 'visible';
	 						drawSubChart(e.target.value);
	 						scope.isSubChartExist = true;

	 						scope.$apply(scope.currentChartData = scope.mainChartData[data.index]);
 						}
 						
 					}
 				}
 				else
 				{
					addAnimation(data.element._node, 'fadeIn', data.index);
					var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
					tspan.innerHTML = scope.mainChartData[data.index].num + ' companies';
					setAttributes(tspan, {
						'dy' : '20',
						'dx' : -data.element._node.offsetWidth
					});
					data.element._node.appendChild(tspan);
					var line = drawLineForLabel({
						wrapper : mainChart.container.children[0],
						elem : data.element._node,
						radius : 105,
						line_length : 80,
						stroke : '#999999',
						 underline : true
					})
					addAnimation(line, 'fadeIn', data.index);	 
 				}

 			});

				mainChart.on('created',function(item){
				
				var group  = document.createElementNS("http://www.w3.org/2000/svg", "g");
				 
				item.svg._node.appendChild(group);

				var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				setAttributes(circle, {
					'cx' : item.svg._node.offsetWidth/2,
					'cy' : item.svg._node.offsetHeight/2,
					'r'  : '70',
					'fill' : '#eeeeee',
				});
				group.appendChild(circle);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				 
				setAttributes(text, {
					'dx' : 209,
					'dy' : 235
				});
 
				addTspan({
					text : 'total companies:',
					wrapper : text,
					attrs : {
						'font-size' : 12,
						'dx' : 224,
					}
				});
				addTspan({
					text : '1434',
					wrapper : text,
					attrs : {
						'font-size' : 14,
						'dy' : 20,
						'dx' : -62,
						'style' : 'font-weight : bold'
					}
				});
				addTspan({
					text : 'total turnover:',
					wrapper : text,
					attrs : {
						'font-size' : 12,
						'dy' : 25,
						'dx' : -50						 
					}
				});
				addTspan({
					text : '1033.53 mil',
					wrapper : text,
					attrs : {
						'font-size' : 14,
						'dy' : 20,
						'dx' : -76,
						'style' : 'font-weight : bold'						 
					}
				});

				group.appendChild(text);

				
				 
			});

			function addTspan(options){
					var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
					tspan.innerHTML = options.text;
					options.wrapper.appendChild(tspan);
					setAttributes(tspan, options.attrs);
					return tspan;
			}
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
				item[0].items.forEach(function(item)
				{
					subSeries.push(item.num);
					subLabels.push(item.num + ' ('+item.percent+'%)');
				});
 				subChart = new Chartist.Pie('#'+subChartId,{
	 				series : subSeries,
	 				labels : subLabels
	 			},subChartOptions)
				 				.on('draw', function(data) {

										  if(data.type === 'slice') {

										    var pathLength = data.element._node.getTotalLength();

											    data.element.attr({
										      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
										    });

										     
										    var animationDefinition = {
										      'stroke-dashoffset': {
										        id: 'anim' + data.index,
										        dur: 500,
										        from: -pathLength + 'px',
										        to:  '0px',
										        easing: Chartist.Svg.Easing.easeInSine,
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
										  else
										  {
										  		var tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
										  		 
													//tspan.innerHTML = item[0][data.index].num + ' companies';
													setAttributes(tspan, {
														'dy' : '20',
														'dx' : -data.element._node.offsetWidth
													});
													tspan.innerHTML = item[0].items[data.index].title;
													data.element._node.appendChild(tspan);
													var line = drawLineForLabel({
														wrapper : subChart.container.children[0],
														elem : data.element._node,
														radius : 133,
														line_length : 12,
														stroke : '#999999',
														underline : false
													})

						 						addAnimation(data.element._node, 'fadeIn', (parseInt(data.index)+1));
					 							
 
 				 					  		}
										});
 			};
		}
		scope.callBack(initChart);

	}


	function setAttributes(item, attrs)
	{
		for (attr in attrs)
		{
			item.setAttribute(attr, attrs[attr])
		}
	}

	function addAnimation(elem, animation, delay)
	{
		elem.classList.add('animated')
		elem.classList.add(animation);
		elem.classList.add('animation-delay-'+ delay);
	}

	function drawLineForLabel(option)
	{
		// svg_container, wrapper, elem, stroke
		var x_0 = option.wrapper.offsetWidth/2,
			y_0 = option.wrapper.offsetHeight/2,
			kx = 1, ky = 1,
			elem_x = option.elem.offsetLeft - x_0,
			elem_y = option.elem.offsetTop + option.elem.offsetHeight/2 - y_0,
			end_line_x = option.elem.offsetLeft + option.elem.offsetWidth,
			x1 = 0, x2 = 0, y1 = 0, y2 = 0,
			radius = option.radius || 100,
			line_length = option.line_length || 80,
			ang = 0,
			line = null,
			stroke = option.stroke || "red";
		if (elem_x < 0)
		{
			kx = -1;
			elem_x = option.elem.offsetLeft + option.elem.offsetWidth - x_0;
			end_line_x = option.elem.offsetLeft;
		};
		if (option.elem.offsetLeft - y_0 < 0 ) { ky = -1 ; }
		  	ang = (Math.atan((elem_y)/(elem_x)));
			x1 = x_0+(kx)*Math.cos(ang)*radius;
			y1 = y_0+(ky)*Math.sin(ang)*radius;
			x2 = x_0+(kx)*Math.cos(ang)*(radius+line_length);
			y2 = y_0+(ky)*Math.sin(ang)*(radius+line_length);
		line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
		setAttributes(line, {
			'points' : (option.underline) ? (x1 + ',' + y1 + ',' + x2 + ',' + y2  + ',' + end_line_x + ',' + y2) :  (x1 + ',' + y1 + ',' + x2 + ',' + y2),
			'stroke-width' : '1',
			'stroke': stroke,
			'fill-opacity' : '0'
		});
		option.elem.parentNode.appendChild(line);
		return line;
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
 
