dojo.provide("dijit.form.TimeTextbox");

dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dijit.form._TimePicker");
dojo.require("dijit.form.ValidationTextbox");

dojo.declare(
	"dijit.form.TimeTextbox",
	dijit.form.RangeBoundTextbox,
	{
		// summary:
		//		A validating, serializable, range-bound date text box.

		// constraints object: min, max
		regExpGen: dojo.date.locale.regexp,
		compare: dojo.date.compare,
		format: dojo.date.locale.format,
		parse: dojo.date.locale.parse,
		serialize: dojo.date.stamp.toISOString,

		value: new Date(),
		_popupClass: "dijit.form._TimePicker",

		postMixInProperties: function(){
			dijit.form.RangeBoundTextbox.prototype.postMixInProperties.apply(this, arguments);

			var constraints = this.constraints;
			constraints.selector = 'time';
			if(typeof constraints.min == "string"){ constraints.min = dojo.date.stamp.fromISOString(constraints.min); }
 			if(typeof constraints.max == "string"){ constraints.max = dojo.date.stamp.fromISOString(constraints.max); }
		},

		onfocus: function(/*Event*/ evt){
			// open the calendar
			this._open();
			dijit.form.RangeBoundTextbox.prototype.onfocus.apply(this, arguments);
		},

		setValue: function(/*Date*/date, /*Boolean, optional*/ priorityChange){
			// summary:
			//	Sets the date on this textbox
			this.inherited('setValue', arguments);
			if(this._picker){
				this._picker.setValue(date);
			}
		},

		_open: function(){
			// summary:
			//	opens the Calendar, and sets the onValueSelected for the Calendar
			var self = this;

			if(!this._picker){
				var popupProto=dojo.getObject(this._popupClass, false);
				this._picker = new popupProto({
					onValueSelected: function(value){

						self.focus(); // focus the textbox before the popup closes to avoid reopening the popup
						setTimeout(dijit.popup.close, 1); // allow focus time to take

						// this will cause InlineEditBox and other handlers to do stuff so make sure it's last
						dijit.form.TimeTextbox.superclass.setValue.call(self, value, true);
					},
					lang: this.lang,
					constraints:this.constraints,
					isDisabledDate: function(/*Date*/ date){
						// summary:
						// 	disables dates outside of the min/max of the TimeTextbox
						return self.constraints && (dojo.date.compare(self.constraints.min,date) > 0 || dojo.date.compare(self.constraints.max,date) < 0);
					}
				});
				this._picker.setValue(this.getValue() || new Date());
			}
			if(!this._opened){
				dijit.popup.open({
					host: this,
					popup: this._picker,
					around: this.domNode,
					onClose: function(){ self._opened=false; }
				});
				this._opened=true;
			}
		},

		_onBlur: function(){
			// summary: called magically when focus has shifted away from this widget and it's dropdown
			dijit.popup.closeAll();
			this.inherited('_onBlur', arguments);
			// don't focus on <input>.  the user has explicitly focused on something else.
		},

		postCreate: function(){
			this.inherited('postCreate', arguments);
			this.connect(this.domNode, "onclick", this._open);
		},

		getDisplayedValue:function(){
			return this.textbox.value;
		},

		setDisplayedValue:function(/*String*/ value){
			this.textbox.value=value;
		}
	}
);
