;(function ($) {
   //Generated HTML
   var $container = $('<div class="cdz-select-container"><span class="selected"></span></div>');
   var $list = $('<ul class="cdz-select" style="display:none;"></ul>');
   //Object Instance
   $.fn.cdzDropdown = function (options) { 
      var $els = $(this); 
      //Hide Original Selects
      $els.hide();
      //Go through each select and create STB Dropdown
      $els.each(function(index,value) {
         //Visuals
         //Clone Containers and List Objects
         var $currentContainer = $container.clone();
         var $currentList = $list.clone();
         //Pull out Select Info and Copy it Over to our New Structure
         var $el = $(value);
         var $options = $el.find('option'); 
         //Insert Container into DOM
         $el.after($currentContainer);
         //Move select into Container
         $el.appendTo($currentContainer); 
         //Insert our Shell List
         $currentList.appendTo($currentContainer);
         //Copy over Options into List
         $options.each(function (index, value) {
            var $option = $(value);
            var $wrapper = $("<li></li>");
            var attributes = $option.prop("attributes"); 
            $wrapper.prop("attributes", attributes);
            //Copy over teh attributes
            $.each(attributes, function(index, attribute) {
               $wrapper.attr(attribute.name, attribute.value);
            });
            $wrapper.append($option.text());
            //Add it to our list
            $currentList.append($wrapper); 
         });
         //Set the currently selected Default
         $currentContainer.find('.selected').text($($options[0]).text());
         $currentContainer.find('.selected').attr("style",$($options[0]).attr("style"));
         //Behaviorals
         $currentContainer.on("hover.cdz.select", function() {
            //When the Click on our "select" dropdown box
            var $sel = $(this);
            //Close all other boxes
            var targets = $.grep($('.cdz-select-container'), function (e) {
               return ! $sel.is($(e));
            });
            $(targets).find('ul').hide();
            //Toggle our Box
            $sel.find('ul').toggle();
         });
         $currentContainer.on("click.cdz.option", "li", function(e) { 
            //Dont Trigger General Select
            e.stopPropagation();
            //Update Selected Text
            var $li = $(this); 
            var $currentContainer = $li.parents('.cdz-select-container');
            var $currentlySelected = $currentContainer.find('span.selected');           
            $currentlySelected.text($li.text());
            //Toggle our Dropdown
            $li.parents('ul').toggle();
            //Set Select Selected
            var $select = $currentContainer.find('select');
            $select.val($li.attr('value')).change(); //Make sure you trigger the change event
         }); 
         //If an element is added after init
         $el.on("DOMNodeInserted", function (e) {
            //Add to List if it's an Option Tag
            var $option =  $(e.target); 
            if ($option.is('option')) {
               var $wrapper = $("<li></li>");
               var attributes = $option.prop("attributes"); 
               $wrapper.prop("attributes", attributes);
               $.each(attributes, function(index, attribute) {
                  $wrapper.attr(attribute.name, attribute.value);
               }); 
               $wrapper.append($option.text());
               $currentList.append($wrapper); 
            }   
         });
         //If an element is removed after init
         $el.on("DOMNodeRemoved", function (e) {
            //Remove from List if it's Option Tag
            var $option =  $(e.target);
            if ($option.is('option')) {
               $currentList.find("li:contains('"+$option.text()+"')").remove();
            }
         });
      });
   }
})(jQuery);