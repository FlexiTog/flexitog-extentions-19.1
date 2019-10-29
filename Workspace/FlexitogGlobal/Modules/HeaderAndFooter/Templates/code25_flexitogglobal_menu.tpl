{{!----
Author : Gordon Truslove
Date : 10/15/2019, 3:19:47 PM
----}}
<nav class="ft-header-menu-secondary-nav">
	<div class="ft-sidebar-elements">
			<div class="header-sidebar-profile-menu" data-view="Header.Profile"></div>
	</div>
	<ul class="header-menu-level1">

		{{#each categories}}
		{{#if text}}
		<li {{#if categories}}data-toggle="categories-menu" {{/if}}>
			<a class="{{class}}" {{objectToAtrributes this}}>
				{{translate text}}<i class="ft-chevron-right ft-mini-icon"></i>
			</a>
			{{#if categories}}
			<ul class="header-menu-level-container">
				<li>
					<ul class="header-menu-level2">
						{{#each categories}}
						<li>
							<a class="{{class}} ft-menu-list" {{objectToAtrributes this}}>
								<img class="ft-menu-thumbnail" src="{{resizeImage additionalFields.thumbnailurl 'thumbnail'}}"
									onerror="this.src='/webapp/extensions/code25/FlexitogGlobal/1.0.0/img/ThumbnailNotFound.svg';this.onerror=null;"
									alt="{{translate text}}" />
								<div>
									<p class="ft-menu-title">{{translate text}} <i class="ft-chevron-right"></i></p>
									<p class="ft-menu-subtext">{{translate additionalFields.pageheading}}</p>
								</div>
							</a>


						</li>
						{{/each}}
					</ul>
				</li>
			</ul>
			{{/if}}
		</li>
		{{/if}}
		{{/each}}

	</ul>


	
	<div class="ft-sidebar-elements">
		{{#if showLanguages}}
		<div data-view="Global.HostSelector"></div>
		{{/if}}
		{{#if showCurrencies}}
		<div data-view="Global.CurrencySelector"></div>
		{{/if}}
		{{#if showExtendedMenu}}
	<div>
		<a class="header-sidebar-user-logout" href="#" data-touchpoint="logout" name="logout">
			<i class="header-sidebar-user-logout-icon"></i>
			{{translate 'Sign Out'}}
		</a>
	</div>
	{{/if}}
	</div>
</nav>




{{!----
Use the following context variables when customizing this template: 
	
	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}