/**
 * Ajax Page Rename
 * Allows the user to quickly rename a page without having to load Special:MovePage
 * http://community.wikia.com/wiki/User:Cörey
 */
 
;(function($, mw) {
	var currentName = mw.config.get("wgPageName"),
	    token = mw.user.tokens.get("editToken");
	
	$(".WikiaMenuElement li:last").after('<li><a href="#" id="ajax-rename">Ajax Rename</a></li>');
	
	$('#ajax-rename').click(function() {
		renamePage();
	});
	
	function renamePage() {
		var newName = prompt('What would you like to rename the page to?', ''),
		moveReason = prompt('Reason: ', 'Renaming page');
		
		if (newName === null) {
			return;
		}
		
		if (moveReason === null) {
			return;
		}
		
		new mw.Api().post({
			action: 'move',
			from: currentName,
			to: newName,
			movesubpages: '',
			movetalk: '',
			reason: moveReason,
			token: token
		}).done(function(ajaxrename) {
			if (!ajaxrename.error) {
				alert(currentName + ' has been renamed to ' + newName);
				location.reload(true);
			} else {
				alert('Unable to rename page. ' + ajaxrename.error.code);
			}
		}).fail(function() {
			alert('Unable to rename page.');
		});
	}
}) (this.jQuery, this.mediaWiki);
