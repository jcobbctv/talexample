/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def("sampleapp/appui/components/simpledeclui",
    [
        "antie/widgets/component",
        "antie/declui/uibuild",
        'text!sampleapp/appui/htdocs/simple-declui.html',
    ],
    function (Component, DeclUI, LayoutData ) {
        
        // All components extend Component
        return Component.extend({
            init: function () {
                var self, helloWorldLabel, welcomeLabel, carouselButtonLabel, verticalListMenu;

                self = this;
                // It is important to call the constructor of the superclass
                this._super("simplecomponent");


                var buttonsArray = ko.observableArray( [
                    { name : ko.observable( "Button1"),
                      selected : function(){
                          model.helloWorldLabel( "Button1 Clicked");
                          console.log( "Button1 Clicked" );
                      }},
                    { name : ko.observable( "Button2"),
                        selected : function(){
                            model.helloWorldLabel( "Button2 Clicked");
                            console.log( "Button2 Clicked" );
                        }},
                    { name : ko.observable( "Button3"),
                        selected : function(){
                            model.helloWorldLabel( "Button3 Clicked");
                            console.log( "Button3 Clicked" );
                        }}
                ] );


                var model = {
                    helloWorldLabel : ko.observable( "Hello World!" ),
                    buttons :  buttonsArray
                };

                var updateCount = 0;
                setInterval( function(){
                    model.helloWorldLabel( "Updated:" + updateCount++ );
                    console.log( model.buttons()[ 0 ].name() );
                }, 1000 )

                this.koDom = DeclUI.createUI( this, model, LayoutData );

                // Add a 'beforerender' event listener to the component to do anything specific that might need to be done
                // before rendering the component
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {


            } 
        });
    }
);