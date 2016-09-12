
angular.module('timeline',['timeline.controller','timeline.service','timeline.directive','monospaced.mousewheel'])

.run(function(){
	setTimeout(function(){
		jq('body').scrollLeft(0);
	})
})