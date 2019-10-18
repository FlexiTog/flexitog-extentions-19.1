
<a class="ft-mobile-header-subheader-settings-link" href="#" data-touchpoint="customercenter" name="myaccount">
	<i class="header-profile-welcome-user-icon"></i>
	<p>{{translate 'My Account'}}</p>
	
</a>
	
	<a class="header-subheader-settings-link" href="#" data-toggle="dropdown">
		{{translate 'My Account'}}
		<i class="header-profile-welcome-user-icon"></i>
	</a>

	{{#if showMyAccountMenu}}
		<ul class="header-profile-menu-myaccount-container">
			<li data-view="Header.Menu.MyAccount"></li>
		</ul>
	{{/if}}


{{!----
Use the following context variables when customizing this template:

	showExtendedMenu (Boolean)
	showLoginMenu (Boolean)
	showLoadingMenu (Boolean)
	showMyAccountMenu (Boolean)
	displayName (String)
	showLogin (Boolean)
	showRegister (Boolean)

----}}
