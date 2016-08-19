function mdScribeEditorDirective($compile, $sce, mdScribeEditorToolbarService, $filter, $mdBottomSheet, $mdToast) {
  return {
    restrict: 'E',
    scope: {
      content: '=ngModel'
    },
    link: function(scope, element) {
	  
	  var editor = '',

	  	  // conteúdio editável
	  	  contenteditable = '<div id="mdScribeEditorEditable" style="position: relative; overflow: hidden;"><div class="md-padding"' +
		  'style="border-bottom: 3px solid rgb(255, 152, 0); max-height: 267px; overflow-y: scroll;"' +
	   	  'contenteditable ng-model="content"></div></div>{{content}}',

		  // template para inserir um link, caso precisemos futuramente
		  bottomSheetTemplate = '<md-bottom-sheet class="md-list" style="padding: 0;">' +
		  '<md-content md-theme="scribeeditor-dark" style="padding: 8px 16px 88px;">' + 
			'<form ng-submit="insertLink()">' +
				'<md-list>' +
					'<md-list-item>' + 
						'<md-input-container>' +
							'<label>Site</label>' +
							'<input type="url" ng-model="link.url">' +
						'</md-input-container>' +
					'</md-list-item>' + 
					'<md-list-item>' + 
						'<md-input-container>' +
							'<label>Site</label>' +
							'<input type="text" ng-model="link.text">' +
						'</md-input-container>' +
					'</md-list-item>' + 
					'<md-list-item>' + 
						'<md-button type="submit" class="md-raised md-primary">Inserir</md-button>' +
					'</md-list-item>' + 
				'</md-list>' +
				'</form>' +
			'</md-content>' +
		 '</md-bottom-sheet>';
	   
	  element
		.addClass("md-whiteframe-z1");
		
      // inicializa a barra superior de edição
	  // pode remover para usar o template que quiser
      mdScribeEditorToolbarService.init(angular.element('<md-toolbar md-theme="scribeeditor-dark"><div class="md-toolbar-tools"></md-toolbar>'), mdScribeEditorToolbarData.length);
      
      angular.forEach(mdScribeEditorToolbarData, function(menu, index) {
      
		mdScribeEditorToolbarService.add(menu, index);
      
      });
	 
	  editor = mdScribeEditorToolbarService.toolbar[0].outerHTML + contenteditable;
	  element.append($compile(editor)(scope));
	  
	  function doAction(toolActions, selectedNode, r, $event) 
	  {	  
		  // extrai o texto selecionado
		  var parentNode = r.startContainer.parentNode,
		  	  selectedText = selectedNode.substring(r.startOffset, r.endOffset);
		  
		if(toolActions.hasOwnProperty('tag')) {

			var newNode = document.createElement(toolActions.tag);
			r.surroundContents(newNode);

			if(toolActions.hasOwnProperty('style')) {
				parentNode.style += toolActions.style;
			}
			
		}  else if(toolActions.name === "insertLink") {
			
			console.log("teste");
			
			$mdBottomSheet.show({
			  template: bottomSheetTemplate,
			  controller: function($scope) {
				  $scope.link = {
					  url: "",
					  text: selectedText
				  };
				  
				$scope.insertLink = function() {					
					
					var newNode = document.createElement("a");
				
					console.log(r.surroundContents(newNode));

					$mdBottomSheet.hide();

					$mdToast.show({
						template: '<md-toast><span flex>Site inserido!</span><md-button ng-click="closeToast()">Fechar</md-button></md-toast>',
						hideDelay: 1500,
						parent: angular.element(document.getElementById("mdScribeEditorEditable"))
					});		  
				  };  
			  },
			  parent: angular.element(document.getElementById("mdScribeEditorEditable")),
			  targetEvent: $event
			});
		}
		
	  }
      
      scope.action = function(tool, index, $event) {
		  
		    // recebe o que o usuário selecionou
		    var selection = document.getSelection(),
		  	    r = selection.getRangeAt(0),
				// coleta a ação necessária para a ferramente
				toolActions  = $filter('filter')(mdScribeEditorToolbarData[index], { name: tool }, true)[0];
			
			// confere se a seleção do usuário está no mesmo escopo
			if(r.startContainer == r.endContainer) {
				
				// pega o html do escopo superior
				var selectedNode = r.startContainer.parentNode.innerHTML;
				// executa as  ações
				doAction(toolActions, selectedNode, r, $event);
				scope.content = angular.element(element.children()[1]).children()[0].innerHTML;
			}	
      }
	}
  };
}

function contentEditable() 
{
	  return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attrs, ngModel) {

		  function read() 
		  {
			ngModel.$setViewValue(element.html());
		  }

		  ngModel.$render = function() {
			element.html(ngModel.$viewValue || "");
		  };

		  element.bind("blur keyup change", function() 
		  {
			scope.$apply(read);
		  });
		}
	  };
}