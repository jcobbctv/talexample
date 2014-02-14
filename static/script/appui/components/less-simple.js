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

require.def("sampleapp/appui/components/less-simple",
    [
        "antie/widgets/component",
        "antie/declui/declui",
        "antie/declui/observable",
        "antie/declui/observable-array",
        'text!sampleapp/appui/htdocs/board0.xml',
    ],
    function (Component, DeclUI, O, OA, Layout ) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self;

                self = this;
                // It is important to call the constructor of the superclass
                this._super("simplecomponent");

                var model = {
                    buttonSelected : function( event, buttonModel ){
                        model.chosen.push( buttonModel );
                    },

                    buttonFocused : function( event, buttonModel ){
                        model.description( buttonModel.description );
                    },

                    buttons : new OA( [
                        { name : "Mr.Sazzles", imageurl: "static/img/k1.jpeg", description: "He is Sazzy" },
                        { name : "Duck Hunter D", imageurl: "static/img/k2.jpeg", description: "Raiser of Gales" },
                        { name : "Cronk", imageurl: "static/img/k3.jpeg", description: "Cronk! Cronk!" },
                        { name : "LazloZ", imageurl: "static/img/k4.jpeg", description: "Hey It's Lazlo Zee" },
                        { name : "Choicey", imageurl: "static/img/k5.jpeg", description: "Choc Ice Y?" },
                        { name : "Fleet", imageurl: "static/img/k6.jpeg", description: "Go Fleet" },
                        { name : "Arnold", imageurl: "static/img/k7.jpeg", description: "Boom! It's Arnold" }
                    ] ),

                    chosen : new OA( [] ),

                    description : new O( "This is where the description goes." )
                };

                DeclUI.buildUI( this, model, Layout );

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