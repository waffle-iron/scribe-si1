var materialComponents = [
		'material.components.toolbar',
		'material.components.input',
		'material.components.tooltip'
];

function mdScribeEditorConfig($mdThemingProvider) 
{
    $mdThemingProvider.theme('scribeeditor-dark', 'default')
	.primaryPalette('indigo')
	.dark();
}

function mdScribeEditorProvider() 
{
    this.$get = function () 
    {
      return this;
    };
}

function htmlToPlainTextFilter() 
{
	return function(text) 
	{
	  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
}