<a class="ft-mobile-header-subheader-settings-link" href="#" data-touchpoint="customercenter" name="myaccount">
	<i class="header-profile-welcome-user-icon"></i>
	{{#if showExtendedMenu}}
	<p>{{translate 'My Account'}}</p>
	{{else}}
	<p>{{translate 'Sign in / Register'}}</p>
	{{/if}}
</a>

<a class="header-subheader-settings-link" href="#" data-toggle="dropdown">
	{{#if showExtendedMenu}}
	{{translate 'My Account'}}
	{{else}}
	{{translate 'Sign in / Register'}}
	{{/if}}
	<i class="header-profile-welcome-user-icon"></i>
</a>

{{#if showMyAccountMenu}}
<ul class="header-profile-menu-myaccount-container">
	<li data-view="code25.FlexitogGlobal.Menu.MyAccount"></li>
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