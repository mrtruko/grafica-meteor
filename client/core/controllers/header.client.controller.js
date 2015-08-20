'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus',
	function($scope,$rootScope, Authentication, Menus) {
		$scope.msgInput = "";
		$scope.contenido="";
		
		
		
		$rootScope.authentication = Authentication;
		$rootScope.isCollapsed = false;
		$rootScope.currentPage = ''; // current page
		$rootScope.collapsed = false; //sidebar collapsed
		$rootScope.is_mobile = false; //is screen mobile?
		$rootScope.is_mini_menu = false; //is mini-menu activated
		$rootScope.is_fixed_header = false; //is fixed header activated
		$rootScope.responsiveFunctions = []; //responsive function holder
		
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
		
		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		
    $scope.comun = function(){
    		$scope.handleTeamView();
			$scope.checkLayou;	//Function to check if mini menu/fixed header is activated
			$scope.handleSidebar(); //Function to display the sidebar
			$scope.handleSidebarCollapse; //Function to display the sidebar
			$scope.handleSidebarCollapse(); //Function to hide or show sidebar
			$scope.handleSidebarAndContentHeight();  //Function to hide sidebar and main content height
			$scope.responsiveSidebar();		//Function to handle sidebar responsively
			 //Function to toggle team view
			$scope.handleHomePageTooltips(); //Function to handle tooltips
			$scope.handleBoxTools(); //Function to handle box tools
			$scope.handleSlimScrolls(); //Function to handle slim scrolls
			$scope.handlePopovers(); //Function to handle popovers
			$scope.handleMessenger(); //Function to handle messenger
			$scope.handleAlerts(); //Function to handle alerts
			$scope.handleCustomTabs(); //Function to handle min-height of custom tabs
			$scope.handleGoToTop(); 	//Funtion to handle goto top buttons
			$scope.handleNavbarFixedTop();		//Function to check & handle if navbar is fixed top
			$scope.handleThemeSkins();		//Function to handle theme skins
}	
	
	$scope.checkLayout = function() {
		//Check if sidebar has mini-menu
		$rootScope.is_mini_menu = $('#sidebar').hasClass('mini-menu');
		//Check if fixed header is activated
		$rootScope.is_fixed_header = $('#header').hasClass('navbar-fixed-top');
        $scope.alert
	}
	$('.backstretch').hide();
	$scope.handleSidebarAndContentHeight = function () {
        var content = $('#content');
        var sidebar = $('#sidebar');
        var body = $('body');
        var height;

        if (body.hasClass('sidebar-fixed')) {
            height = $(window).height() - $('#header').height() + 1;
        } else {
            height = sidebar.height() + 20;
        }
        if (height >= content.height()) {
            content.attr('style', 'min-height:' + height + 'px !important');
        }
    }
 $scope.getViewPort = function () {
        $scope.e = window;
        $scope.a = 'inner';
        if (!('innerWidth' in window)) {
            $scope.a = 'client';
            $scope.e = document.documentElement || document.body;
        }
        return {
            width: $scope.e[$scope.a + 'Width'],
            height: $scope.e[$scope.a + 'Height']
        }
    }
    
    $scope.handleSidebarCollapse = function () {
		$scope.viewport = $scope.getViewPort;
        if ($.cookie('mini_sidebar') === '1') {
			/* For Navbar */
			jQuery('.navbar-brand').addClass("mini-menu");
			/* For sidebar */
			jQuery('#sidebar').addClass("mini-menu");
			jQuery('#main-content').addClass("margin-left-50");
			$rootScope.collapsed = true;
        }
		//Handle sidebar collapse on user interaction
		jQuery('.sidebar-collapse').click(function () {

			//Handle mobile sidebar toggle
			if($rootScope.is_mobile && !($rootScope.is_mini_menu)){
				//If sidebar is collapsed
				if($rootScope.collapsed){
					jQuery('body').removeClass("slidebar");
					jQuery('.sidebar').removeClass("sidebar-fixed");
					//Add fixed top nav if exists
					if($rootScope.is_fixed_header) {
						jQuery('#header').addClass("navbar-fixed-top");
						jQuery('#main-content').addClass("margin-top-100");
					}
					$rootScope.collapsed = false;
					$.cookie('mini_sidebar', '0');

				}
				else {
					jQuery('body').addClass("slidebar");
					jQuery('.sidebar').addClass("sidebar-fixed");
					//Remove fixed top nav if exists
					if($rootScope.is_fixed_header) {
						jQuery('#header').removeClass("navbar-fixed-top");
						jQuery('#main-content').removeClass("margin-top-100");
					}
					$rootScope.collapsed = true;
					$.cookie('mini_sidebar', '1');
					$scope.handleMobileSidebar();
				}
			}
			else { //Handle regular sidebar toggle
				$scope.iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
				$scope.iconLeft = $scope.iconElem.getAttribute("data-icon1");
				$scope.iconRight = $scope.iconElem.getAttribute("data-icon2");
				//If sidebar is collapsed
				if($rootScope.collapsed){
					/* For Navbar */
					jQuery('.navbar-brand').removeClass("mini-menu");
					/* For sidebar */
					jQuery('#sidebar').removeClass("mini-menu");
					jQuery('#main-content').removeClass("margin-left-50");
					jQuery('.sidebar-collapse i').removeClass($scope.iconRight);
					jQuery('.sidebar-collapse i').addClass($scope.iconLeft);
					/* Add placeholder from Search Bar */
					jQuery('.search').attr('placeholder', "Search");
					$rootScope.collapsed = false;
					$.cookie('mini_sidebar', '0');
				}
				else {
					/* For Navbar */
					jQuery('.navbar-brand').addClass("mini-menu");
					/* For sidebar */
					jQuery('#sidebar').addClass("mini-menu");
					jQuery('#main-content').addClass("margin-left-50");
					jQuery('.sidebar-collapse i').removeClass($scope.iconLeft);
					jQuery('.sidebar-collapse i').addClass($scope.iconRight);
					/* Remove placeholder from Search Bar */
					jQuery('.search').attr('placeholder', '');
					$rootScope.collapsed = true;
					$.cookie('mini_sidebar', '1');
				}
				$("#main-content").on('resize', function (e) {
					e.stopPropagation();
				});
			}
        });
	}
	$scope.handleSidebarAndContentHeight = function () {
        var content = $('#content');
        var sidebar = $('#sidebar');
        var body = $('body');
        var height;

        if (body.hasClass('sidebar-fixed')) {
            height = $(window).height() - $('#header').height() + 1;
        } else {
            height = sidebar.height() + 20;
        }
        if (height >= content.height()) {
            content.attr('style', 'min-height:' + height + 'px !important');
        }
    }
   $scope.handleSidebar = function () {
	jQuery('.sidebar-menu .has-sub > a').click(function () {
            var last = jQuery('.has-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
            
			var thisElement = $(this);
			var slideOffeset = -200;
            var slideSpeed = 200;
			
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
				sub.slideUp(slideSpeed, function () {
					if ($('#sidebar').hasClass('sidebar-fixed') == false) {
						App.scrollTo(thisElement, slideOffeset);
					}
					$scope.handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
					if ($('#sidebar').hasClass('sidebar-fixed') == false) {
						App.scrollTo(thisElement, slideOffeset);
					}
					$scope.handleSidebarAndContentHeight();
                });
            }
        });
		
	// Handle sub-sub menus
	jQuery('.sidebar-menu .has-sub .sub .has-sub-sub > a').click(function () {
           $scope.last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
            $scope.last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
                
            $scope.sub = jQuery(this).next();
            if ($scope.sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                $scope.sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                $scope.sub.slideDown(200);
            }
        });
	}
    $scope.responsiveSidebar = function () {
		//Handle sidebar collapse on screen width
		$scope.menu = "";
		var width = $(window).width();
		if ( width < 768 ) {
			$rootScope.is_mobile = true;
			//Hide the sidebar completely
			jQuery('#main-content').addClass("margin-left-0");
		}
		else {
			$rootScope.is_mobile = false;
			//Show the sidebar completely
			jQuery('#main-content').removeClass("margin-left-0");
			$scope.menu = $('.sidebar');
			if ($scope.menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before resizing
				$scope.menu.slimScroll({
					destroy: true
				});
				$scope.menu.removeAttr('style');
				$('#sidebar').removeAttr('style');
			}
		}
	}
	$scope.handleTeamView = function () {
		$scope.c;
		$(".team-status-toggle").click(function (y) {
            y.preventDefault();
            $scope.w(this);
            $(this).parent().toggleClass("open");
            $scope.z = $scope.x(this);
            $($scope.z).slideToggle(200, function () {
                $(this).toggleClass("open")
            })
        });
        $("body").click(function (z) {
            $scope.y = z.target.className.split(" ");
            if ($.inArray("team-status", $scope.y) == -1 && $.inArray("team-status-toggle", $scope.y) == -1 && $(z.target).parents().index($(".team-status")) == -1 && $(z.target).parents(".team-status-toggle").length == 0) {
                $scope.w
            }
        });
        $scope.w = function (y) {
            $(".team-status").each(function () {
                var z = $(this);
                if (z.is(":visible")) {
                    var A = $scope.x(y);
                    if (A != ("#" + z.attr("id"))) {
                        $(this).slideUp(200, function () {
                            $(this).toggleClass("open");
                            $(".team-status-toggle").each(function () {
                                var B = x(this);
                                if (B == ("#" + z.attr("id"))) {
                                    $(this).parent().removeClass("open")
                                }
                            })
                        })
                    }
                }
            })
        };
        $scope.x = function (y) {
            var z = $(y).data("teamStatus");
            if (typeof z == "undefined") {
                z = "#team-status"
            }
            return z
        }
	}
	$scope.c = function () {
        $(".team-status").each(function () {
            var x = $(this);
            x.css("position", "absolute").css("margin-top", "-1000px").show();
            var w = 0;
            $("ul li", this).each(function () {
                w += $(this).outerWidth(true) + 15
            });
            x.css("position", "relative").css("margin-top", "0").hide();
            $("ul", this).width(w)
        })
    };
    $scope.handleHomePageTooltips = function () {
		//On Hover
		//Default tooltip (Top)
		$('.tip').tooltip();
		//Bottom tooltip
		$('.tip-bottom').tooltip({
			placement : 'bottom'
		});
		//Left tooltip
		$('.tip-left').tooltip({
			placement : 'left'
		});
		//Right tooltip
		$('.tip-right').tooltip({
			placement : 'right'
		});
		//On Focus
		//Default tooltip (Top)
		$('.tip-focus').tooltip({
			trigger: 'focus'
		});
	}
	$scope.handleBoxTools = function () {
		//Collapse
		jQuery('.box .tools .collapse, .box .tools .expand').click(function () {
            $scope.el = jQuery(this).parents(".box").children(".box-body");
            if (jQuery(this).hasClass("collapse")) {
				jQuery(this).removeClass("collapse").addClass("expand");
                $scope.i = jQuery(this).children(".fa-chevron-up");
				$scope.i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
                $scope.el.slideUp(200);
            } else {
				jQuery(this).removeClass("expand").addClass("collapse");
                $scope.i = jQuery(this).children(".fa-chevron-down");
				$scope.i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
                $scope.el.slideDown(200);
            }
        });
		
		/* Close */
		jQuery('.box .tools a.remove').click(function () {
            $scope.removable = jQuery(this).parents(".box");
            if ($scope.removable.next().hasClass('box') || $scope.removable.prev().hasClass('box')) {
                jQuery(this).parents(".box").remove();
            } else {
                jQuery(this).parents(".box").parent().remove();
            }
        });
		
		/* Reload */
		jQuery('.box .tools a.reload').click(function () {
            $scope.el = jQuery(this).parents(".box");
            App.blockUI(el);
            window.setTimeout(function () {
                App.unblockUI(el);
            }, 1000);
        });
	}
	$scope.handleSlimScrolls = function () {
        if (!jQuery().slimScroll) {
            return;
        }

        $('.scroller').each(function () {
            $(this).slimScroll({
                size: '7px',
                color: '#a1b2bd',
				height: $(this).attr("data-height"),
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
				railOpacity: 0.1,
                disableFadeOut: true
            });
        });
    }
	$scope.handlePopovers = function () {
		//Default (Right)
		$('.pop').popover();
		//Bottom 
		$('.pop-bottom').popover({
			placement : 'bottom'
		});
		//Left 
		$('.pop-left').popover({
			placement : 'left'
		});
		//Top 
		$('.pop-top').popover({
			placement : 'top'
		});
		//Trigger hover 
		$('.pop-hover').popover({
			trigger: 'hover'
		});
	}
	$scope.handleMessenger = function () {
		
		//Normal
		$("#normal").click(function(){
			var mytheme = $('input[name=theme]:checked').val();
			var mypos = $('input[name=position]:checked').val();
			//Set theme
			Messenger.options = {
				extraClasses: 'messenger-fixed '+mypos,
				theme: mytheme
			}
			//Call
			Messenger().post({
				message:"This is a normal notification!",
				showCloseButton: true
			});
		});
		//Interactive
		$("#interactive").click(function(){
			var mytheme = $('input[name=theme]:checked').val();
			var mypos = $('input[name=position]:checked').val();
			//Set theme
			Messenger.options = {
				extraClasses: 'messenger-fixed '+mypos,
				theme: mytheme
			}
			var msg;
			msg = Messenger().post({
			  message: 'Launching thermonuclear war...',
			  type: 'info',
			  actions: {
				cancel: {
				  label: 'cancel launch',
				  action: function() {
					return msg.update({
					  message: 'Thermonuclear war averted',
					  type: 'success',
					  showCloseButton: true,
					  actions: false
					});
				  }
				}
			  }
			});
		});
		//Timer
		$("#timer").click(function(){
			var mytheme = $('input[name=theme]:checked').val();
			var mypos = $('input[name=position]:checked').val();
			//Set theme
			Messenger.options = {
				extraClasses: 'messenger-fixed '+mypos,
				theme: mytheme
			}
			var i;
			i = 0;
			Messenger().run({
			  errorMessage: 'Error destroying alien planet',
			  successMessage: 'Alien planet destroyed!',
			  showCloseButton: true,
			  action: function(opts) {
				if (++i < 3) {
				  return opts.error({
					status: 500,
					readyState: 0,
					responseText: 0
				  });
				} else {
				  return opts.success();
				}
			  }
			});
		});
		//Prompts
		$("#prompts").click(function(){
			var mytheme = $('input[name=theme]:checked').val();
			var mypos = $('input[name=position]:checked').val();
			//Set theme
			Messenger.options = {
				extraClasses: 'messenger-fixed '+mypos,
				theme: mytheme
			}
			Messenger().run({
			  successMessage: 'Data saved.',
			  errorMessage: 'Error saving data',
			  progressMessage: 'Saving data',
			  showCloseButton: true,
			}, {
			  url: 'http://www.example.com/data'
			});
		});
	}
	$scope.handleAlerts = function () {
		$(".alert").alert();
	}
	$scope.handleCustomTabs = function () {
			var adjustMinHeight = function (y) {
				$(y).each(function () {
					var A = $($($(this).attr("href")));
					var z = $(this).parent().parent();
					if (z.height() > A.height()) {
						A.css("min-height", z.height())
					}
				})
			};
			$("body").on("click", '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function () {
				adjustMinHeight($(this))
			});
			adjustMinHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');
			if (location.hash) {
				var w = location.hash.substr(1);
				$('a[href="#' + w + '"]').click()
			}
	}
	$scope.handleGoToTop = function () {
		$('.footer-tools').on('click', '.go-top', function (e) {
			App.scrollTo();
			e.preventDefault();
		});
	} 
	$scope.handleNavbarFixedTop = function () {
		if($rootScope.is_mobile && $rootScope.is_fixed_header) {
			//Manage margin top
			$('#main-content').addClass('margin-top-100');
		}
		if(!($rootScope.is_mobile) && $rootScope.is_fixed_header){
			//Manage margin top
			$('#main-content').removeClass('margin-top-100').addClass('margin-top-50');
		}
	} 
	$scope.handleThemeSkins = function () {
		// Handle theme colors
        var setSkin = function (color) {
            $('#skin-switcher').attr("href", "css/themes/" + color + ".css");
            $.cookie('skin_color', color);
        }
		$('ul.skins > li a').click(function () {
            var color = $(this).data("skin");
            setSkin(color);
        });
		
		//Check which theme skin is set
		 if ($.cookie('skin_color')) {
            setSkin($.cookie('skin_color'));
        }
	}
	}
]);