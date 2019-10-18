<div class="header-message" data-view="Message.Placeholder"></div>

<div class="header-main-wrapper">
	<div class="header-subheader">
		<div class="header-subheader-container">
			<ul class="ft-header-subheader-options-left">

				<li class="header-subheader-settings">
					<a href="#" class="header-subheader-settings-link" data-toggle="dropdown"
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
								<h5>{{translate 'Live Chat'}}</h5>
								<p>{{translate 'Quick instant advice from an experienced advisor'}}</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-info-icon"></i></li>
							<li>
								<h5>{{translate 'Support Tickets'}}</h5>
								<p>{{translate 'Report faulty goods, issues & tech support'}}</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-envelope-icon"></i></li>
							<li>
								<h5>{{translate 'Sales, Orders & Customer Service'}}</h5>
								<p>{{translate 'Email sales orders or general enquires for a promt quick reply from our customer services team.'}}
								</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-phone-icon"></i></li>
							<li>
								<h5>{{translate 'Prefer to Call?'}}</h5>
								<p class="ft-phone-large">{{translate '+44 (0) 1692 400 300'}}</p>
							</li>
						</ul>
						<ul class="ft-bullet-list">
							<li><i class="header-menu-map-icon"></i></li>
							<li>
								<h5>{{translate 'Address'}}</h5>
								<p>Flexitog<br />
									The Granary Business Park<br />
									School Road<br />
									Norwich<br />
									Norfolk<br />
									NR12 8BU<br />
									England</p>
							</li>
						</ul>
					</div>
				</li>
				<li class="header-subheader-settings">
					<a href="tel:+44 01692 400 30" class="header-subheader-settings-link">+44 01692 400 30 <i class="header-phone-icon"></i></a>
				</li>

			</ul>

			<ul class="ft-header-subheader-options">
				{{#if showLanguagesOrCurrencies}}
				<li class="header-subheader-settings">
					<a href="#" class="header-subheader-settings-link" data-toggle="dropdown"
						title="{{translate 'Settings'}}">
						{{translate 'Language/currency'}}
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
				<li data-view="StoreLocatorHeaderLink"></li>
				<li data-view="RequestQuoteWizardHeaderLink"></li>
				<li data-view="QuickOrderHeaderLink"></li>
				<li class="header-menu-profile" data-view="Header.Profile"></li>
			</ul>
		</div>
	</div>
	<nav class="header-main-nav">


		<div class="header-sidebar-toggle-wrapper">
			<button class="header-sidebar-toggle" data-action="header-sidebar-show">
				<i class="header-sidebar-toggle-icon"></i>
			</button>
			<a class="ft-header-phone-button-link" href="tel:tel:+44 01692 400 30" >
				<i class="header-phone-icon"></i>
			</a>
		</div>

		<div class="header-content">

			<div class="ft-header-secondary-wrapper" data-view="Header.Menu" >
			</div>

			<a href="/" data-touchpoint="home"><img class="ft-header-logo"
					src="{{getExtensionAssetsPath 'img/Logo.svg'}}" alt="Flexitog Logo"></a>


			<div class="header-right-menu">
				
<div data-view="Header.SiteSearch"></div>


				<div class="ft-header-menu-searchmobile" data-view="SiteSearch.Button"></div>
				<a class="ft-header-quick-link" title="{{translate 'Quick Order'}}"><i class="ft-header-quick-link-icon"></i></a>
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