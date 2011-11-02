var aws_name_fixer = {
  onLoad: function() {
    // initialization code
    try{
      this.initialized = true;
      this.strings = document.getElementById("aws_name_fixer-strings");
      main_window = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsIDocShellTreeItem).rootTreeItem.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindow);
      main_window.addEventListener("DOMContentLoaded", aws_name_fixer.onPageLoad, true);
    }catch(e){
      alert(e)
    }
  },
  onPageLoad: function(e) {
    // initialization codee) {
    //
    try{ 

      var doc = e.originalTarget;
      if(doc && doc.location &&doc.location.href&& doc.location.href.search(/^http[s]*:\/\/[www\.]*console.aws.amazon.com\/ec2/i) > -1) {
        setInterval(function(){
          try{
            if(doc.getElementById("code") && doc.getElementById('code').innerHTML.search("<span>root</span>") > -1){
              var prefs = Components.classes["@mozilla.org/preferences-service;1"]  
              .getService(Components.interfaces.nsIPrefService)  
              .getBranch("extensions.aws_name_fixer.");

              var name=prefs.getCharPref("stringpref") || "ec2-user";
              var div=doc.getElementById("code");
              div.children[0].children[1].children[1].innerHTML=name;
            }}catch(e){
              alert(e)
            }
        },500)
      }
    
    }catch(e){
        alert(e);
      }


  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
    .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                        this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    aws_name_fixer.onMenuItemCommand(e);
  }
};
window.addEventListener("load", function () { aws_name_fixer.onLoad(); }, false);
