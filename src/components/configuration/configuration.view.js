var _ = require('lodash');
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  className: 'configuration-view',
  template: _.template($('#configuration-template').html()),
  attributes: function () {
    var attributes = {id : this.model.id};
    if (this.model.attributes.hidden)
      attributes.hidden = '';
    return attributes;
  },
  events: {
    'click .delete-btn': 'delete',
    'click .edit-btn': 'edit',
    'click .cancel-btn': 'cancel',
    'click .save-btn': 'save'
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  edit: function (e) {
    this.model.set({
      editMode: true
    });
  },
  delete: function (e) {
    this.model.destroy();
  },
  cancel: function (e) {
    this.model.set({
      editMode: false
    });
  },
  save: function (e) {
    var updatedConfig = {
      editMode: false,
      name: this.$el.find('.name').val(),
      key: this.$el.find('.key').val(),
      value: this.$el.find('.value').val(),
      description: this.$el.find('.description').val(),
      type: this.$el.find('.type').val(),
      id: this.model.id
    };
    this.model.save(updatedConfig);
  }
});