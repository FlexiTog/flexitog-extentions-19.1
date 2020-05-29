<div class="ft-xs-header"></div>

<div class="header-message" data-view="Message.Placeholder"></div>

<div class="header-main-wrapper">
	<div class="header-subheader">
		<div class="header-subheader-container">
			<ul class="ft-header-subheader-options-left">

				<li class="header-subheader-settings">
					<a id="header-contact-us" href="#" class="header-subheader-settings-link" data-toggle="dropdown"
						title="{{translate 'Contact us'}}">
						{{translate 'Contact us'}}
						<i class="header-menu-contact-icon"></i>
					</a>
					<div class="ft-header-menu-contact-dropdown">
						<h2 class="header-menu-settings-dropdown-title">{{translate 'Ways to get in touch'}}</h2>
						<p class="header-menu-settings-dropdown-title">
							{{translate 'Expert advisers at your fingertips'}}</p>
						<h4 class="header-menu-settings-dropdown-title">{{translate 'Customer Support'}}</h4>

						<ul class="ft-bullet-list">
							<li><i class="header-menu-chat-icon"></i></li>
							<li>
								<h5 onclick="jivo_api.open();" style="cursor:pointer;">{{translate 'Live Chat'}}</h5>
								<p>{{translate 'Quick instant advice from an experienced advisor'}}</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-info-icon"></i></li>
							<li>
								<h5><a href="/support-tickets" >{{translate 'Support Tickets'}}</a></h5>
								<p>{{translate 'Report faulty goods, issues & tech support'}}</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-envelope-icon"></i></li>
							<li>
								<h5>{{translate 'Email'}}</h5>
								<p>{{translate 'Email sales orders or general enquires for a prompt quick reply from our customer services team.'}}<br />
								<a href="{{translate 'mailto:sales@flexitog.com'}}">{{translate 'sales@flexitog.com'}}</a>
								</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-phone-icon"></i></li>
							<li>
								<h5>{{translate 'Prefer to call?'}}</h5>
								<p class="ft-phone-large">{{translate '<small><b>International</b></small> +44 (0) 1692 400 300'}}</p>
<p class="ft-phone-large">{{translate '<small><b>France</b></small> +33 (0) 1 84 88 03 00'}}</p>
<p class="ft-phone-large">{{translate '<small><b>Italy</b></small>  +39 (0) 6 83 46 44 06'}}</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-map-icon"></i></li>
							<li>
								<h5>{{translate 'Address'}}</h5>
								<p>FlexiTog<br />
									The Granary Business Park<br />
									School Road<br />
									Neatishead<br />
									Norfolk<br />
									NR12 8BU<br />
									{{translate 'England'}}</p>
							</li>
						</ul>
					</div>
				</li>
				<li class="header-subheader-settings">
					<a href="{{translate 'tel:00441692400300'}}" class="header-subheader-settings-link"><small><b>{{translate '(GB)'}}</b></small> {{translate '01692 400 300'}} <i
							class="header-phone-icon"></i></a>
				</li>

			</ul>

			<ul class="ft-header-subheader-options">
				
				{{#if showLanguagesOrCurrencies}}
				<li class="header-subheader-settings">
					<a href="#" class="header-subheader-settings-link" data-toggle="dropdown"
						title="{{translate 'Settings'}}">
						{{translate 'Language/Currency'}}
						<i class="header-menu-settings-icon"></i>
					</a>
					<div class="header-menu-settings-dropdown">
						<h5 class="header-menu-settings-dropdown-title">{{translate 'Site Settings'}}</h5>
						{{#if showLanguages}}
						<div data-view="Global.HostSelector"></div>
						{{/if}}
						{{#if showCurrencies}}
						<div data-view="Global.CurrencySelector"></div>
						{{/if}}
					</div>
				</li>
				{{/if}}
				
				
				<li class="header-menu-profile" data-view="Header.Profile"></li>
			</ul>
		</div>
	</div>
	<nav class="header-main-nav">


		<div class="header-sidebar-toggle-wrapper">
			<button class="header-sidebar-toggle" data-action="header-sidebar-show">
				<i class="header-sidebar-toggle-icon"></i>
			</button>
			<a class="ft-header-phone-button-link" href="tel:00441692400300">
				<i class="header-phone-icon"></i>
			</a>
		</div>

		<div class="header-content">

			<div class="ft-header-secondary-wrapper" data-view="Header.Menu">
			</div>

			<a href="/" data-touchpoint="home"><img class="ft-header-logo"
					src="{{getExtensionAssetsPath 'img/FTLogo.svg'}}" alt="Flexitog Logo"></a>


			<div class="header-right-menu">

				<div data-view="Header.SiteSearch"></div>


				<div class="ft-header-menu-searchmobile" data-view="SiteSearch.Button"></div>
				<span class="dropdown">
					<a id="header-quick-link" href="#" class="ft-header-quick-link" title="{{translate 'Quick Order'}}"
						data-toggle="dropdown"><i class="ft-header-quick-link-icon"></i></a>
					<div id="quick-menu" class="ft-header-menu-quick-dropdown">
						<h2 class="header-menu-settings-dropdown-title"><i class="ft-header-quick-link-icon"></i>
							{{translate 'Quicker Ordering'}}</h2>
						<p>{{translate '3 simple functions to speed up creating and processing your orders'}}</p>
						<a href="#" data-touchpoint="{{cartTouchPoint}}" data-hashtag="#cart?openQuickOrder=true" class="ft-quick-order-button">
							<div class="ft-quick-order-button-main">
								<h3>{{translate 'Quick Order'}} <i class="ft-header-quick-link-icon"></i></h3>
								<p>{{translate 'Know your product codes? Use the quick add bar in the cart to add items to your order.'}}
								</p>
							</div>
							<div class="ft-quick-order-button-arrows">»</div>
						</a>

						<a data-touchpoint="customercenter" data-hashtag="#reorderItems" class="ft-quick-order-button">
							<div class="ft-quick-order-button-main">
								<h3>{{translate 'Re-order Items'}} <i class="ft-header-refresh-icon"></i></h3>
								<p>{{translate 'Need to re-order previously items? Access a list of previously purchased items organised by popularity / frequency. '}}
								</p>
							</div>
							<div class="ft-quick-order-button-arrows">»</div>
						</a>

						<a data-touchpoint="customercenter" data-hashtag="#wishlist" class="ft-quick-order-button">
							<div class="ft-quick-order-button-main">
								<h3>{{translate 'Your Saved Products'}} <i class="ft-header-list-icon"></i></h3>
								<p>{{translate 'Create a list of items that you order on a regular basis and quickly add the entire list or part of a list to your cart.'}}
								</p>
							</div>
							<div class="ft-quick-order-button-arrows">»</div>
						</a>

						<a data-touchpoint="customercenter" data-hashtag="#quotes" class="ft-quick-order-button">
							<div class="ft-quick-order-button-main">
								<h3>{{translate 'Request a Quote'}} <i class="ft-header-edit-icon"></i></h3>
								
							</div>
							<div class="ft-quick-order-button-arrows">»</div>
						</a>

					</div>
				</span>
				<div class="header-menu-cart">
					<div class="header-menu-cart-dropdown">
						<div data-view="Header.MiniCart"></div>
					</div>
				</div>
			</div>
		</div>


	</nav>
</div>

<div class="header-sidebar-overlay" data-action="header-sidebar-hide"></div>




<div data-view="SiteSearch"></div>



{{!----
Use the following context variables when customizing this template: 
	
	profileModel (Object)
	profileModel.addresses (Array)
	profileModel.addresses.0 (Array)
	profileModel.creditcards (Array)
	profileModel.firstname (String)
	profileModel.paymentterms (undefined)
	profileModel.phoneinfo (undefined)
	profileModel.middlename (String)
	profileModel.vatregistration (undefined)
	profileModel.creditholdoverride (undefined)
	profileModel.lastname (String)
	profileModel.internalid (String)
	profileModel.addressbook (undefined)
	profileModel.campaignsubscriptions (Array)
	profileModel.isperson (undefined)
	profileModel.balance (undefined)
	profileModel.companyname (undefined)
	profileModel.name (undefined)
	profileModel.emailsubscribe (String)
	profileModel.creditlimit (undefined)
	profileModel.email (String)
	profileModel.isLoggedIn (String)
	profileModel.isRecognized (String)
	profileModel.isGuest (String)
	profileModel.priceLevel (String)
	profileModel.subsidiary (String)
	profileModel.language (String)
	profileModel.currency (Object)
	profileModel.currency.internalid (String)
	profileModel.currency.symbol (String)
	profileModel.currency.currencyname (String)
	profileModel.currency.code (String)
	profileModel.currency.precision (Number)
	showLanguages (Boolean)
	showCurrencies (Boolean)
	showLanguagesOrCurrencies (Boolean)
	showLanguagesAndCurrencies (Boolean)
	isHomeTouchpoint (Boolean)
	cartTouchPoint (String)

----}}