(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});

		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();

        // AI Chatbot Functionality
        var chatbot = function() {
                console.log('Chatbot initializing');
                $('#chatbot-button').click(function() {
                        console.log('Chatbot button clicked');
                        $('#chatbot-window').toggleClass('open');
                });

                $('#chatbot-close').click(function() {
                        console.log('Chatbot close clicked');
                        $('#chatbot-window').removeClass('open');
                });

                $('#chatbot-send').click(function() {
                        console.log('Send button clicked');
                        sendMessage();
                });

                $('#chatbot-input').keypress(function(e) {
                        if (e.which == 13) {
                                console.log('Enter pressed');
                                sendMessage();
                        }
                });

                function sendMessage() {
                        var message = $('#chatbot-input').val().trim();
                        console.log('Sending message:', message);
                        if (message) {
                                addMessage(message, 'user');
                                $('#chatbot-input').val('');
                                // Simulate AI response
                                setTimeout(function() {
                                        var response = getAIResponse(message);
                                        console.log('AI response:', response);
                                        addMessage(response, 'bot');
                                }, 1000);
                        }
                }

                function addMessage(text, sender) {
                        console.log('Adding message:', text, sender);
                        var messageHtml = text.replace(/\n/g, '<br>');
                        var messageDiv = $('<div class="message ' + sender + '">' + messageHtml + '</div>');
                        $('#chatbot-messages').append(messageDiv);
                        $('#chatbot-messages').scrollTop($('#chatbot-messages')[0].scrollHeight);
                }

                function getAIResponse(message) {
                        var lowerMessage = message.toLowerCase();
                        
                        // Greeting responses
                        if (lowerMessage.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)/)) {
                                return 'Hello! Welcome to iZitech Solutions. How can I help you today? Feel free to ask about our services, pricing, contact information, or anything else!';
                        }
                        
                        // Services questions
                        if (lowerMessage.match(/(what|which).*(services|solutions|offer|provide)/) || lowerMessage.includes('services')) {
                                return 'We provide a comprehensive range of ICT services:\n\n• Consulting Services - Strategic IT guidance for your business\n• Managed Services - Infrastructure planning, design, and maintenance\n• Security Solutions - Firewalls, anti-spam, and risk management\n• Networking - Professional IT infrastructure design\n• Virtualization & Cloud Services - Reduce physical device dependency\n• Web & Mobile Development - Custom software solutions\n• ERP Solutions - Business process optimization\n\nVisit our <a href="services.html" target="_blank">Services page</a> to learn more!';
                        }

                        // Product / shop questions
                        if (lowerMessage.match(/(what.*sell|what do you sell|products|catalog|store|shop|sell)/)) {
                                return 'You can view our product offerings and shop directly at the Odoo store:\n\n• <a href="https://odoo.izitech.co.za/shop" target="_blank">https://odoo.izitech.co.za/shop</a>\n\nThis page shows the products and services we sell, including software, licenses, and support packages.';
                        }
                        
                        // ERP/Solutions specific
                        if (lowerMessage.match(/(erp|ekit|mine|ultra|white|band)/) || lowerMessage.includes('erp')) {
                                return 'We offer specialized solutions including:\n\n• ERP Solutions - Enterprise resource planning\n• eKit Solution - Connectivity solutions\n• Ultra White Band - Communication system\n• Mine Solution - Specialized mining operations software\n\nTo explore these further, check our Services dropdown menu!';
                        }
                        
                        // iZitech / contact specific
                        if (lowerMessage.includes('izitech') && lowerMessage.match(/(contact|phone|number|call|reach|get.*touch)/)) {
                                return 'iZitech contact details:\n\n• Phone: +27 10 123 4567\n• Email: info@izitech.co.za\n• Contact form: <a href="contact.html" target="_blank">Contact Page</a>\n• Odoo customer portal: <a href="https://odoo.izitech.co.za/" target="_blank">https://odoo.izitech.co.za/</a>\n\nFeel free to message us directly or use the chat for instant guidance!';
                        }

                        // Odoo related
                        if (lowerMessage.includes('odoo') || lowerMessage.includes('odoo.izitech')) {
                                return 'For Odoo-specific services visit <a href="https://odoo.izitech.co.za/" target="_blank">Odoo iZitech</a>.\n\nWe can help with Odoo implementation, support, migration, and training.';
                        }

                        // Location questions (use contact page location info)
                        if (lowerMessage.match(/(location|address|where.*located|where.*find|directions|map|gps|site)/)) {
                                return 'Our office is located at:\n\nBlock B, Whitby Manor Office Estate, 167 14th Rd, Noordwyk, Midrand, 1687\n\nFor map directions and the full location section, visit: <a href="contact.html#contact" target="_blank">Contact page location</a>.';
                        }

                        // General contact information
                        if (lowerMessage.match(/(contact|phone|call|email|reach|how.*reach|get.*touch)/) || lowerMessage.includes('contact')) {
                                return 'You can reach us in multiple ways:\n\n• <a href="contact.html" target="_blank">Contact page</a> for the form and location\n• Phone: 012 110 4650\n• Email: info@izitech.co.za\n• Odoo portal: <a href="https://odoo.izitech.co.za/" target="_blank">Odoo Portal</a>\n\nWe typically respond within 24 hours!';
                        }
                        
                        // About company
                        if (lowerMessage.match(/(about|who.*are|company.*info|expertise|experience)/) || lowerMessage.includes('about')) {
                                return 'About iZitech Solutions:\n\nWe have over 7 years of experience in Information Technology. Our expertise includes:\n\n✓ Infrastructure planning and implementation\n✓ Cloud and virtualization solutions\n✓ Enterprise security\n✓ Custom software development\n✓ IT consulting and support\n\nOur goal is to provide tailored ICT solutions that give your business a competitive advantage!';
                        }
                        
                        // Pricing questions
                        if (lowerMessage.match(/(price|pricing|cost|how much|rate|plan)/) || lowerMessage.includes('pricing')) {
                                return 'We offer flexible pricing for different needs:\n\n• Starter - R1,000/month (500MB space, 5 email accounts)\n• Bronze - R1,500/month (1GB space, 10 email accounts)\n• Silver - R2,400/month (5GB space, 20 email accounts)\n• Gold - R3,200/month (10GB space, unlimited emails)\n\nEach plan includes domain registration, unlimited bandwidth, and free setup. Custom enterprise solutions also available!\n\nLearn more: <a href="services.html" target="_blank">Services & Plans</a> (includes pricing details).';
                        }
                        
                        // Project/Portfolio questions
                        if (lowerMessage.match(/(project|portfolio|portfolio|work|case study|completed)/) || lowerMessage.includes('project')) {
                                return 'We\'ve successfully completed numerous projects including:\n\n• iZitech Pty Ltd Website\n• MGN Engineering Company (Web & Mobile)\n• Afrisucess - Digital Marketing\n• Linothe - Web & Email Hosting\n\nVisit our Projects page to see our complete portfolio and case studies!';
                        }
                        
                        // Security questions
                        if (lowerMessage.match(/(security|secure|protect|firewall|threat)/) || lowerMessage.includes('security')) {
                                return 'iZitech Solutions provides comprehensive security services:\n\n🔒 Risk Management\n🔒 Email Security (Anti-spam)\n🔒 Network Firewall Solutions\n🔒 Proactive Threat Detection\n🔒 Backup & Disaster Recovery\n\nProtecting your business data is our priority. Contact us for a security assessment!';
                        }
                        
                        // Hosting/Domain questions
                        if (lowerMessage.match(/(host|domain|email|web.*hosting|bandwidth)/) || lowerMessage.includes('hosting')) {
                                return 'We offer complete web hosting solutions with:\n\n✓ Domain registration & renewal\n✓ Web hosting with unlimited bandwidth\n✓ Professional email accounts\n✓ Secure hosting infrastructure\n✓ 24/7 support\n\nChoose from our Starter, Bronze, Silver, or Gold plans. Contact us for custom enterprise packages!';
                        }
                        
                        // Support questions
                        if (lowerMessage.match(/(support|help|issue|problem|troubleshoot|assistance)/) || lowerMessage.includes('support')) {
                                return 'We provide comprehensive support:\n\n📞 Technical Support - Quick resolution of IT issues\n📧 Email Support - Detailed problem analysis\n🎯 Proactive Monitoring - Prevention of potential issues\n📋 Documentation - Guides and resources\n\nOur team is ready to help! Contact us or use our Contact page.';
                        }
                        
                        // Default helpful response
                        return 'Thank you for your question! We\'d love to help more. You can:\n\n• Ask about our services\n• Learn about pricing and plans\n• Get contact information\n• Explore our company background\n• Review our completed projects\n\nOr contact our team directly through the Contact page for specialized assistance!';
                }
        };
        chatbot();


})(jQuery);

