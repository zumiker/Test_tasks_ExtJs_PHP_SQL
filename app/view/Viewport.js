
Ext.define('AM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    alias: 'widget.viewport',
    defaults: {
        border: false
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                layout: 'hbox',
                width: '100%',
                items:[
                    {
                        xtype: 'grid',
                        width: '50%',
                        itemId: 'orggridid',
                        id: 'x',
                        autoHeight: true,
                        draggable: false,
                        columnLines: true,
                        padding: '5 0 0 0',
                        title: 'Организация',
                        tbar:[
                            {
                                text:'Добавить',
                                itemId: 'orgaddid'
                            },
                            {
                                text:'Удалить',
                                disabled: true,
                                itemId: 'orgdelid'
                            }
                        ],
                        store:{
                            xtype: 'store',
                            proxy: {
                                type: 'ajax',
                                url: 'php/get_org.php',
                                reader: {
                                    type: 'json',
                                    root: 'rows'
                                }
                            },
                            fields: ['ORG_ID','ORGNAME']
                        },
                        columns: [
                            //{ xtype: 'rownumberer', width:30 },
                            { text: 'Название Организации', dataIndex: 'ORGNAME',flex: 1}
                        ]

                    },
                    {
                        xtype: 'grid',
                        width: '50%',
                        itemId: 'mangridid',
                        autoHeight: true,
                        draggable: false,
                        columnLines: true,
                        padding: '5 0 0 1',
                        title: 'Контактное лицо',
                        tbar:[
                            {
                                text:'Добавить',
                                disabled: true,
                                itemId: 'addid'
                            },
                            {
                                text:'Удалить',
                                disabled: true,
                                itemId: 'delid'
                            }
                        ],
                        store:{
                            xtype: 'store',
                            proxy: {
                                type: 'ajax',
                                url: 'php/get_man.php',
                                reader: {
                                    type: 'json',
                                    root: 'rows'
                                }
                            },
                            fields: ['MANID','ORG_ID','NAME','PHONE','ORG_NAME']
                        },
                        columns: [
                            { xtype: 'rownumberer', width:30 },
                            { text: 'Имя', dataIndex: 'NAME',flex: 1},
                            { text: 'Организация', dataIndex: 'ORG_NAME',flex: 1},
                            { text: 'Телефон', dataIndex: 'PHONE',flex: 1},
                        ]
                    },
                    {
                        xtype: 'window',
                        width: 350,
                        title: 'Организация',
                        height: 150,
                        itemId: 'winid',
                        modal: true,
                        closable: false,
                        items:[{
                            xtype: 'textfield',
                            padding: '10px',
                            fieldLabel: 'Название',
                            width: 300,
                            labelWidth: 100,
                            itemId: 'field',
                            allowBlank: false,
                            listeners:{
                                change: function(element){
                                    //console.log(element.getValue())
                                    if(element.getValue() == "")
                                        element.up('viewport').query('#saveid')[0].disable();
                                    else 
                                        element.up('viewport').query('#saveid')[0].enable();   

                                }
                            }

                        }
                        ],
                        buttons:[{
                            //formBind: true,
                            text: 'Сохранить',
                            itemId:'saveid'
                        },
                        {
                            text: 'Закрыть',

                            itemId: 'closeid'
                        }
                        ]

                    },
                    {
                        xtype: 'window',
                        width: 350,
                        title: 'Организация',
                        height: 170,
                        itemId: 'conwinid',
                        modal: true,
                        closable: false,
                        items:[
                            {
                                xtype:'form',
                                width: '100%',
                                height: 130,
                                items:[
                                {
                                    xtype: 'textfield',
                                    padding: '10 10 3 10 10',
                                    fieldLabel: 'ФИО',
                                    width: 300,
                                    labelWidth: 100,
                                    itemId: 'fiofield',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    padding: '3 10 10 10',
                                    fieldLabel: 'Телефон',
                                    width: 300,
                                    labelWidth: 100,
                                    itemId: 'phonefield',
                                    allowBlank: false,
                                    vtype: 'passNumber'
                                }
                                ],
                                buttons:[{
                                    formBind: true,
                                    text: 'Сохранить',
                                    itemId:'consaveid'
                                },
                                {
                                    text: 'Закрыть',
                                    itemId: 'concloseid'
                                }]
                            },
                        ],                        
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});