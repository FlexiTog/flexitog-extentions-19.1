
define(
	'code25.FlexitogGlobal.Header'
,   [
		'code25.FlexitogGlobal.Header.View'
	]
,   function (
		HeaderView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			
			if(layout)
			{
				layout.registerView('Header', function() { 
					return new HeaderView({ application: container });
				});
			}

		}
	};
});
