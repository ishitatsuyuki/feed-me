$((function(){var e;($(document).on("change","#elementType",(function(){$(".element-select").hide(),$(".element-select-"+$(this).val()).show()})),$("#elementType").trigger("change"),$(document).on("change",".element-parent-group select",(function(){var e,t,s=$(this).parents(".element-sub-group").data("items")["item_"+$(this).val()],n=$(".element-child-group select").val(),i='<option value="">'+Craft.t("None")+"</option>";$.each(s,(function(e,t){e&&(i+='<option value="'+e+'">'+t+"</option>")})),$(".element-child-group select").html(i),n?$(".element-child-group select").val(n):$($(".element-child-group select").children()[1]).attr("selected",!0)})),$(".element-parent-group select").trigger("change"),$(document).on("change","#feedType",(function(){$("#primaryElement").html(""),"rss"==$(this).val()?$("#primaryElement").val("item"):"atom"==$(this).val()?$("#primaryElement").val("entry"):$("#primaryElement").val("")})),$("#primaryElement").keypress((function(){$(this).data("manual")})),$(".feedme-uniques").length)&&($('.feedme-uniques input[type="checkbox"]:checked').length||$('.feedme-uniques input[type="checkbox"]:first').prop("checked",!0));$(".assets-uploads input").on("change",(function(e){var t=$(this).parents(".field-extra-settings").find(".select"),s=$(this).parents(".field-extra-settings").find(".asset-label-hide");$(this).prop("checked")?(s.css({opacity:1,visibility:"visible"}),t.css({opacity:1,visibility:"visible"})):(s.css({opacity:0,visibility:"hidden"}),t.css({opacity:0,visibility:"hidden"}))})),$(".assets-uploads input").trigger("change"),$(".feedme-mapping select").selectize({allowEmptyOption:!0}),$(document).on("click","input[data-action]",(function(e){var t=$(this).parents("form"),s=$(this).data("action");t.find('input[name="action"]').val(s),t.submit()})),new Craft.FeedMeTaskProgress})),function(){var e='<div><span data-icon="check"></span> '+Craft.t("Processing complete!")+'</div><div class="feedme-success-btns"><a class="btn submit" href="'+Craft.getUrl("feedme/feeds")+'">Back to Feeds</a><a class="btn" href="'+Craft.getUrl("feedme/logs")+'">View logs</a></div>';Craft.FeedMeTaskProgress=Garnish.Base.extend({runningTask:null,$spinnerScreen:null,$pendingScreen:null,$runningScreen:null,init:function(){this.$spinnerScreen=$(".feedme-status-spinner"),this.$pendingScreen=$(".feedme-fullpage.fullpage-waiting"),this.$runningScreen=$(".feedme-fullpage.fullpage-running"),this.updateTasks()},updateTasks:function(){Craft.postActionRequest("tasks/getTaskInfo",$.proxy((function(e,t){"success"==t&&this.showTaskInfo(e[0])}),this))},showTaskInfo:function(t){this.$spinnerScreen.addClass("hidden"),t?(this.$runningScreen.removeClass("hidden"),this.runningTask?this.runningTask.updateStatus(t):this.runningTask=new Craft.FeedMeTaskProgress.Task(t),"error"!=t.status&&setTimeout($.proxy(this,"updateTasks"),500)):this.runningTask?this.runningTask.complete():this.$pendingScreen.hasClass("cp-triggered")?(this.$runningScreen.removeClass("hidden"),this.$runningScreen.find(".progress-container").html(e)):this.$pendingScreen.removeClass("hidden")}}),Craft.FeedMeTaskProgress.Task=Garnish.Base.extend({progressBar:null,init:function(e){this.$statusContainer=$(".feedme-fullpage.fullpage-running .progress-container"),this.$statusContainer.empty(),this.progressBar=new Craft.ProgressBar(this.$statusContainer),this.progressBar.showProgressBar(),this.updateStatus(e)},updateStatus:function(e){this.progressBar.setProgressPercentage(100*e.progress),"error"==e.status&&this.fail()},complete:function(){this.progressBar.setProgressPercentage(100),setTimeout($.proxy(this,"success"),300)},success:function(){this.$statusContainer.html(e)},fail:function(){this.$statusContainer.html('<div class="error">'+Craft.t('Processing failed. <a class="go" href="'+Craft.getUrl("feedme/logs")+'">View logs</a>')+"</div>")}})}();