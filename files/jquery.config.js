
// Author: Michael Pumo
// Date: 12/12/2011

$(document).ready(function() {

	// Let's fire up the initial functions.
	init();
	slides();
	cycle();
	setLine();

	$(window).resize(function() {

		// Let's refire the init() method to modify dimensions.
		init();

	});
	
});

function init() {
	
	// Cache elements.
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	var $content = $("#content");
	var $slides = $("div.slide");
	var $panels = $("div.panel");

	// Set the dimensions of elements to achieve full screen effect.
	$content
		.add($slides)
			.css({ "width" : winWidth + "px", "height" : winHeight + "px" })
				.find("img")
					.fullBg();
	
	// Set slides except the current one to be off-screen.
	$slides
		.not(".current")
			.css({ "left" : winWidth + "px" });
			
	// Set panels except the current one to be off-screen.
	$panels
		.not(".current")
			.css({ "left" : "-600px" });
			
	// Set the vertical alignment of the panels.
	if ( winHeight < 660 ) {

		// Fix it if the screen is getting to the point where there would be logo overlap.
		$panels
			.css({ "top" : "0", "margin-top" : "150px" });
			
	} else { 
		
		// Else...let's just apply the previous styles like we had in the CSS.
		$panels
			.css({ "top" : "50%", "margin-top" : "-180px" });
			
	}
					

}

function moveLine(widthTo,positionTo) {

	var $line = $("#line");
	
	$line
		.stop(true,false)
			.delay(100)
				.animate({ "width" : widthTo + "px", "left" : positionTo + "px" }, 1000, "easeOutExpo");
	
}

function setLine() {

	var $line = $("#line");
	var $nav = $("#nav");
	var $currentItem = $nav.find("li.current");
	var widthTo = $currentItem.width();
	var positionTo = Math.floor( $currentItem.position().left ) + 15 // The margin-left.
			
	$line
		.css({ "width" : widthTo + "px", "left" : positionTo + "px" });
		
	$line
		.off("mouseenter");
	
	$line
		.off("mouseleave");
	
}

function slides() {
	
	var $nav = $("#nav");
	var winWidth = $(window).width();

	$nav
		.find("li")
			.on({

				// Begin: Mouseenter Handler.
				mouseenter: function(){
					
					var $this = $(this);
					
					if( $this.attr("id") != "line" ) {
						
						moveLine( 
							$this.width(),
							Math.floor( $this.position().left ) + 15 // The margin-left.
						);
					
					}
					
				},
				// End: Mouseenter Handler.
				
				
				// Begin: Mouseleave Handler.
				mouseleave: function(){
					
					var $this = $(this);
					var $currentItem = $nav.find("li.current");
					
					if( $this.attr("id") != "line" ) {
						
						moveLine( 
							$currentItem.width(),
							Math.floor( $currentItem.position().left ) + 15 // The margin-left.
						);
					
					}
					
				},
				// Begin: Mouseleave Handler.
				
				
				// Begin: Click Handler.
				click: function(){
	
						// Cache this scope.
						var $this = $(this);
						
						// Make sure no slides are animating before we go to the next slide.
						// Also make sure that the link we are clicking on isn't already the current one.
						if( 
								!$("div.slide, div.panel").is(":animated") && 
								!$this.hasClass("current") 
						
						) {
			
					
							// Parse the ID out of the ID attribute to match against a panel / slide.
							var tag = $this.attr("id").replace("nav-","");
							
							// Slides
							var $thisSlide = $("#slide-" + tag);
							var $thisSlideSiblings = $thisSlide.siblings("div.slide");
							
							// Panels
							var $thisPanel = $("#panel-" + tag);
							var $thisPanelSiblings = $thisPanel.siblings("div.panel");
							var $currentPanel = $(".panel.current");
		
		
							// Set the clicked navigation item to current highlight.
							$this
								.siblings()
									.removeAttr("class")
								.end()
									.addClass("current");
									
							
							// Now set the line into position.
							setLine();
							
							
							// Set the z-index of siblings() to 0 to get their stacking correct ready for next slide.
							$thisSlideSiblings
									.css({ "z-index" : "0" })
										.removeClass("current");
							
							
							// Slide in the current (selected) slide and then set the siblings back to the start.
							$thisSlide
								.addClass("current")
									.css({ "opacity" : "1", "z-index" : "30" })
										.animate({ "left" : "0px" }, 1500, "easeOutExpo", function(){
										
											// Set sibling slides to hidden again.
											$thisSlideSiblings
												.css({ "opacity" : "0", "left" : winWidth + "px" });
		
										});
										
										
							// Fade out the current panel.
							$currentPanel
								.animate({ "opacity" : "0" }, 1000, "easeOutExpo", function(){
									
									// Now that the panel has faded, let's move it back to a suitable position.
									// Because some panels dynamically change width, we need to calculate the current width first.
									// Once this is done, we move it minus its width off screen to the left.
									// ...also ADD 70 to its width to factor in the padding left and right.
								
									var $thisPanel = $(this);
									var thisPanelWidth = $thisPanel.width() + 70;
									
									// Now move the panel from the calculations above and remove the current class.
									
									$thisPanel
										.css({ "left" : "-" + thisPanelWidth + "px" })
											.removeClass("current");
		
								});
								
							
							// Slide in the selected panel.
							$thisPanel
								.css({ "opacity" : "1" })
									.delay(300)
										.animate({ "left" : "0" }, 1500, "easeOutExpo", function(){
																								 
											$(this)
												.addClass("current");
											
										});
		
							
						}
						
						
						
				}
				// End: Click Handler.
				
			});
	
}


function cycle() {
	
	// Services Cycle.
	var $cycleServices = $(".cycle-services");
	
	// The paging.
	$cycleServices
		.before('<ul class="cycle-services-pager" />');
		
	// Let's put in the next button.
	$cycleServices
		.after("<div class='cycleServicesNext'>Next</div>");
	
	$cycleServices.cycle({ 
		fx:     "scrollHorz", 
		speed:  800, 
		easing: "easeOutExpo",
		timeout: 0, 
		pager: 	".cycle-services-pager",
		next:   ".cycleServicesNext",
		prev:   ".cycleServicesPrevious",
		pagerAnchorBuilder: function(idx, slide) { 
			return '<li id="cycle-services-pager-' + idx + '">' + idx + '</li>'; 
		}
	});

	// Resize Panel according to slide cycle selected.
	var $panelServices = $("#panel-services");
	
	$("#cycle-services-pager-0")
		.on("click", function() {
			$panelServices
				.animate({ "width" : "430px" }, 800, "easeOutExpo");
		});
		
	$("#cycle-services-pager-1")
		.on("click", function() {
			$panelServices
				.animate({ "width" : "650px" }, 800, "easeOutExpo");
		});
	
	$("#cycle-services-pager-2")
		.on("click", function() {
			$panelServices
				.animate({ "width" : "650px" }, 800, "easeOutExpo");
		});
		
	$(".cycleServicesNext")
		.on("click", function() {
			
			var thePanelID = $(".cycle-services-pager").find("li.activeSlide").text();			  
			
			if ( thePanelID == 0 ) { 
				
				$panelServices
					.animate({ "width" : "430px" }, 800, "easeOutExpo");
			
			} else { 
			
				$panelServices
					.animate({ "width" : "650px" }, 800, "easeOutExpo");
				
			}
			
			
				
		});



	
	// Team Cycle.
	var $cycleTeam = $(".cycle-team");
	
	// The paging.
	$cycleTeam
		.before('<ul class="cycle-team-pager" />');
		
	// Let's put in the next button.
	$cycleTeam
		.after("<div class='cycleTeamNext'>Next</div>");
	
	$cycleTeam.cycle({ 
		fx:     "scrollHorz", 
		speed:  800, 
		easing: "easeOutExpo",
		timeout: 0, 
		pager: 	".cycle-team-pager",
		next:   ".cycleTeamNext",
		prev:   ".cycleTeamPrevious",
		pagerAnchorBuilder: function(idx, slide) { 
			return '<li id="cycle-team-pager-' + idx + '">' + idx + '</li>'; 
		}
	});
	
	// Resize Panel according to slide cycle selected.
	var $panelTeam = $("#panel-team");
	
	$("#cycle-team-pager-0")
		.on("click", function() {
			$panelTeam
				.animate({ "width" : "430px" }, 800, "easeOutExpo");
		});
		
	$("#cycle-team-pager-1")
		.on("click", function() {
			$panelTeam
				.animate({ "width" : "860px" }, 800, "easeOutExpo");
		});
		
	$(".cycleTeamNext")
		.on("click", function() {
			
			var thePanelID = $(".cycle-team-pager").find("li.activeSlide").text();			  
			
			if ( thePanelID == 0 ) { 
				
				$panelTeam
					.animate({ "width" : "430px" }, 800, "easeOutExpo");
			
			} else { 
			
				$panelTeam
					.animate({ "width" : "860px" }, 800, "easeOutExpo");
				
			}
			
			
				
		});

	
}



















