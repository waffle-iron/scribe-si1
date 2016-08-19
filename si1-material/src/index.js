angular.module('mdScribeEditor', materialComponents)
	// tema
	.config(mdScribeEditorConfig)
	// adiciona itens a barra de ferramentas
	.service('mdScribeEditorToolbarService', mdScribeEditorTbService)
	// diretiva do conteudo editavel
	.directive("contenteditable", contentEditable)
	// diretiva do editor
	.directive('mdScribeEditor', mdScribeEditorDirective);	