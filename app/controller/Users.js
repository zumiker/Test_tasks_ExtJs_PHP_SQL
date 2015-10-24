var passNumberVType = {
    passNumber: function(val, field){
        var passNumberRegex = /^\d{11}$/;
        return passNumberRegex.test(val);
    },
    passNumberText: 'Не правильный формат (XXXXXXXXXXX)',
    passNumberMask: /[\d]/
};

Ext.apply(Ext.form.field.VTypes, passNumberVType);

Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['Viewport'],
    init: function () {
        this.control({
        	'viewport #consaveid':{
        		click: function(element){
        			var viewport = element.up().up('viewport');
        			var congrid = viewport.query('#mangridid')[0];
        			var org_id = viewport.query('#orggridid')[0].getSelectionModel().getSelection()[0].get('ORG_ID');
        			//console.log(org_id);
        			var selmod = congrid.getSelectionModel();
        			if(selmod.getCount())
        				var manid = selmod.getSelection()[0].get('MANID');
        			Ext.Ajax.request({
						url: 'php/insert1.php',
						params: {
							manid: manid,
							fiofield: viewport.query('#fiofield')[0].getValue(),
							org_id: org_id,
							phonefield: viewport.query('#phonefield')[0].getValue()
						},
						callback: function (records, option, success) {
							if(success){
								viewport.query('#fiofield')[0].reset();
								viewport.query('#phonefield')[0].reset();
								viewport.query('#conwinid')[0].hide();
								Ext.getBody().mask('Загрузка данных...');
								congrid.store.load({
										params:{
											org_id: org_id
										},
										callback: function(record, option, success){
											if(success)
												Ext.getBody().unmask();
												//viewport.query('#orgdelid')[0].disable();
											}
									});
								Ext.example.msg('Сохранение !', 'Сохранение успешно!');
							}
						}, 
					});
        		}
        	},
        	'viewport #addid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			var win = viewport.query('#conwinid')[0];
        			var grid_contact = viewport.query('#mangridid')[0];
        			grid_contact.getSelectionModel().deselectAll();
        			viewport.query('#delid')[0].disable();
        			win.setPosition(grid_contact.getX(),grid_contact.getY());
        			win.show();
        		}
        	},
        	'viewport #mangridid':{
        		cellclick: function(element, td, cellIndex, record){
        			element.up('viewport').query('#delid')[0].enable();
        		},
        		celldblclick: function(element, td, cellIndex,record){
                	var viewport = element.up('viewport');
                	var win = viewport.query('#conwinid')[0];
                	var combo = viewport.query('#fiofield')[0];
                	var combo1 = viewport.query('#phonefield')[0];
                	combo.setValue(record.get('NAME'));
                	combo1.setValue(record.get('PHONE'));
        			win.show();
                }
        	},
        	'viewport #orggridid':{
                afterrender: function(element){
                	Ext.getBody().mask('Загрузка данных...');
                	element.store.load({
                		callback: function(records, options, success){
                			if(success)
                				Ext.getBody().unmask();
                		}
                	});
                },
                cellclick: function(element, td, cellIndex, record){
                	var viewport = element.up('viewport');
                	var grid_contact = viewport.query('#mangridid')[0];
                	viewport.query('#orgdelid')[0].enable();
                	viewport.query('#delid')[0].disable();
                	viewport.query('#addid')[0].enable();
                	grid_contact.store.load({
                		params:{
                			org_id: record.get('ORG_ID')
                		},
                		callback: function(records, option, success){
                			if(!success)
                				Ext.example.msg('Проблема !', 'Данные не загружены!');//Ext.getBody().unmask();
                		}
                	});
                },
                celldblclick: function(element, td, cellIndex,record){
                	var viewport = element.up('viewport');
                	var win = viewport.query('#winid')[0];
                	var combo = viewport.query('#field')[0];
                	combo.setValue(record.get('ORGNAME'));
        			win.show();
                }
        	},
        	'viewport #orgaddid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			var win = viewport.query('#winid')[0];
        			viewport.query('#saveid')[0].disable();
        			viewport.query('#orggridid')[0].getSelectionModel().deselectAll();
        			viewport.query('#mangridid')[0].store.load({
										callback: function(record, option, success){
											if(success)
												Ext.getBody().unmask();
												//viewport.query('#orgdelid')[0].disable();
											}
									});
        			viewport.query('#orgdelid')[0].disable();
        			viewport.query('#delid')[0].disable();
                	viewport.query('#addid')[0].disable();
        			win.show();
        		}
        	},
        	'viewport #orgdelid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			var orggrid = viewport.query('#orggridid')[0];
        			var selmod = viewport.query('#orggridid')[0].getSelectionModel();
        			if(selmod.getCount()){
        				var org_id = selmod.getSelection()[0].get('ORG_ID');
        				Ext.Ajax.request({
						url: 'php/delete.php',
						params: {
							org_id: org_id
						},
						callback: function (records, option, success) {
							if(success){
								Ext.getBody().mask('Загрузка данных...');
								orggrid.store.load({
									callback: function(record, option, success){
										if(success)
											Ext.getBody().unmask();
											viewport.query('#orgdelid')[0].disable();
											viewport.query('#delid')[0].disable();
                							viewport.query('#addid')[0].disable();
                							viewport.query('#mangridid')[0].store.load({
												callback: function(record, option, success){
													if(success)
														Ext.getBody().unmask();
														//viewport.query('#orgdelid')[0].disable();
													}
									});
									}
								});
							
						}
						}, 
					});
        			}
        			else
        				Ext.example.msg('Удаление !', 'Выбирете запись!');

        		}
        	},
        	'viewport #delid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			var mangrid = viewport.query('#mangridid')[0];
        			var manid = mangrid.getSelectionModel().getSelection()[0].get('MANID');
        				Ext.Ajax.request({
						url: 'php/delete1.php',
						params: {
							manid: manid
						},
						callback: function (records, option, success) {
							if(success){
								Ext.getBody().mask('Загрузка данных...');
								mangrid.store.load({
									params:{
										org_id: viewport.query('#orggridid')[0].getSelectionModel().getSelection()[0].get('ORG_ID')
									},
									callback: function(record, option, success){
										if(success)
											Ext.getBody().unmask();
											viewport.query('#delid')[0].disable();
									}
								});
							
						}
						}, 
					});
        			
        		}
        	},
        	'viewport #closeid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			viewport.query('#field')[0].reset();
        			viewport.query('#winid')[0].hide();
        		}
        	},
        	'viewport #concloseid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			viewport.query('#fiofield')[0].reset();
        			viewport.query('#phonefield')[0].reset();
        			viewport.query('#conwinid')[0].hide();
        		}
        	},
        	'viewport #saveid':{
        		click: function(element){
        			var viewport = element.up('viewport');
        			var orggrid = viewport.query('#orggridid')[0];
        			var selmod = viewport.query('#orggridid')[0].getSelectionModel();
        			if(selmod.getCount())
        				var org_id = selmod.getSelection()[0].get('ORG_ID');
        			else
        				var org_id = "";
        			console.log(selmod);
        			Ext.Ajax.request({
						url: 'php/insert.php',
						params: {
							field: viewport.query('#field')[0].getValue(),
							org_id: org_id
						},
						callback: function (records, option, success) {
							if(success){
								viewport.query('#field')[0].reset();
								viewport.query('#winid')[0].hide();
								Ext.getBody().mask('Загрузка данных...');
								orggrid.store.load({
								callback: function(record, option, success){
									if(success)
										Ext.getBody().unmask();
										viewport.query('#orgdelid')[0].disable();
										viewport.query('#delid')[0].disable();
                						viewport.query('#addid')[0].disable();
									}
								});
								Ext.example.msg('Сохранение !', 'Сохранение успешно!');
							}
						}, 
					});
        		}
        	}


        });
    }
});
