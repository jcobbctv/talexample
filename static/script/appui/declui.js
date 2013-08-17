
require.def('sampleapp/appui/declui',
    [
        'antie/class',
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/verticallist",
    ],
    function(Class, Label, Button, VerticalList ) {

        return Class.extend({
            init: function( rootWidget,layout ) {
                var self;
                self = this;

                function createLayoutDOM( layout ){
                    var loader = document.createElement( "div" );

                    loader.innerHTML = layout;

                    var model = {};

                    model.buttons = [
                        { name : "button1" },
                        { name : "button2" },
                        { name : "button3" },
                    ];

                    var focusButton;

                    ko.bindingHandlers.taltype = {
                        init : function( elem, valueAccessor ){
                            switch( valueAccessor() ){
                                case "label":
                                    if( elem.id ){
                                        elem.talWidget = new Label( elem.id, elem.innerText );
                                     }else{
                                        elem.talWidget = new Label( elem.innerText );
                                    }
                                    break;

                                case "button":
                                    elem.talWidget = new Button( elem.id );
                                    if( elem.innerText ){
                                        var talLabel = new Label( elem.innerText );
                                        elem.talWidget.appendChildWidget( talLabel );
                                    }
                                    break;

                                case "verticallist":
                                    elem.talWidget = new VerticalList( elem.id );
                                    break;
                            }

                            if( elem.parentElement && elem.parentElement.talWidget ){
                                elem.parentElement.talWidget.appendChildWidget( elem.talWidget );
                            }else{
                                rootWidget.appendChildWidget( elem.talWidget );
                            }
                        }
                    };

                    ko.applyBindings( model, loader );

                    return loader;
                }

                this.layoutDOM = createLayoutDOM( layout );
            }
        });
    }
);