
require.def('sampleapp/appui/declui',
    [
        'antie/class',
        "antie/widgets/label",
        "antie/widgets/button",
        "antie/widgets/verticallist",
    ],
    function(Class, Label, Button, VerticalList ) {

        var DeclUI = {};




        return Class.extend({
            init: function( rootWidget, model, layout ) {
                var self;
                self = this;

                function createLayoutDOM( layout ){
                    var loader = document.createElement( "div" );

                    loader.innerHTML = layout;

                    ko.bindingHandlers.select = {
                        init: function( elem, valueAccessor ){
                           elem.talWidget.addEventListener( "select", function( evt ){
                               valueAccessor( evt );
                           });
                        },

                        update: function( elem, valueAccessor ){

                        }
                    };

                    ko.bindingHandlers.text = {
                        init : function( elem, valueAccessor ){
                            if( elem.talWidget ){
                                var i;
                                var childWidgets = elem.talWidget.getChildWidgets();

                                var textSet = false;
                                if( childWidgets ){
                                    for( i = 0; i < childWidgets.length; i++ ){
                                        if( childWidgets[ i ] instanceof Label ){
                                            childWidgets[ i ].setText( valueAccessor() );
                                            textSet = true;
                                        }
                                    }
                                }
                                if( !textSet ){
                                    elem.talWidget.appendChildWidget( new Label( valueAccessor() ) )
                                }
                            }
                        },
                        update: function( elem, valueAccessor ){
                            if( elem.talWidget ){
                                var i;
                                var childWidgets = elem.talWidget.getChildWidgets();

                                var textSet = false;
                                if( childWidgets ){
                                    for( i = 0; i < childWidgets.length; i++ ){
                                        if( childWidgets[ i ] instanceof Label ){
                                            childWidgets[ i ].setText( valueAccessor() );
                                            textSet = true;
                                        }
                                    }
                                }
                                if( !textSet ){
                                    elem.talWidget.appendChildWidget( new Label( valueAccessor() ) )
                                }
                            }
                        }
                    };

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