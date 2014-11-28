define("views/SelectedDisciplinesView", [
		"templates",
		"views/BaseView",
		"chaplin",
		"underscore",
		"fastdom",
		"views/SelectedDisciplineView"
], function(templates, BaseView, Chaplin, _, fastdom, selectedDisciplineView){
	"use strict";
	var SelectedDisciplinesView = BaseView.extend({
		"template" : templates.selectedDisciplines,
		"itemView": selectedDisciplineView,
		"listSelector": "tbody",
		"tagName": "table",
		"listen": {
      		"addedToDOM": "applyFoundation",
      		"change:combination collection": "updateViews"
		},
		"events": {
			"click #nextCombination": "nextCombination",
			"click #previousCombination": "previousCombination"
		},
		"initialize": function(options){
			_.extend(this, _.pick(options, "status"));
			BaseView.prototype.initialize.apply(this, [options]);
			Chaplin.CollectionView.prototype.initialize.apply(this, [options]);
		},
		"updateViews": function(){
			this.collection.each(function(discipline) {
				this.renderItem(discipline); // Forces update of the view
			}, this);
			this.updateCombinationStatus();
		},
		"updateCombinationStatus": function(){
			fastdom.write(function(){
				this.$("#combinationStatus").html(this.getCombinationStatus());
			}, this);
		},
		"getCombinationStatus": function(){
			var combinationTotal, combinationNumber;
			combinationTotal = this.collection.combinationCount();
			combinationNumber = combinationTotal > 0 ? this.collection.getSelectedCombination()+1 : 0;
			return combinationNumber+"/"+combinationTotal;
		},
		"nextCombination": function(){
			this.collection.nextCombination();
		},
		"previousCombination": function(){
			this.collection.previousCombination();
		},
		"initItemView": function(model){
			if (this.itemView) {
				return new this.itemView({
					autoRender: false,
					model: model,
					status: this.status
				});
			} else {
				throw new Error("The CollectionView#itemView property " + "must be defined or the initItemView() must be overridden.");
			}
		},
		"render": function(){
			BaseView.prototype.render.apply(this, []);
			fastdom.write(function() {
				Chaplin.CollectionView.prototype.render.apply(this, []);
				this.updateCombinationStatus();
			}, this);
		},
	});
	_.extend(SelectedDisciplinesView.prototype, 
		_.omit(
			Chaplin.CollectionView.prototype,
			_.keys(SelectedDisciplinesView.prototype),
			_.keys(BaseView.prototype)
		)
	);
	return SelectedDisciplinesView;
});