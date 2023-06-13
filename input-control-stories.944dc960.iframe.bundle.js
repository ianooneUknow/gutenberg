(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[9845],{"./packages/components/src/input-control/input-suffix-wrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{U:()=>InputControlSuffixWrapper,Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _spacer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/spacer/component.tsx"),_ui_context__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/ui/context/use-context-system.js"),_ui_context__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/ui/context/context-connect.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedInputControlSuffixWrapper(props,forwardedRef){const derivedProps=(0,_ui_context__WEBPACK_IMPORTED_MODULE_1__.y)(props,"InputControlSuffixWrapper");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_spacer__WEBPACK_IMPORTED_MODULE_2__.Z,{marginBottom:0,...derivedProps,ref:forwardedRef})}UnconnectedInputControlSuffixWrapper.displayName="UnconnectedInputControlSuffixWrapper";const InputControlSuffixWrapper=(0,_ui_context__WEBPACK_IMPORTED_MODULE_3__.Iq)(UnconnectedInputControlSuffixWrapper,"InputControlSuffixWrapper"),__WEBPACK_DEFAULT_EXPORT__=InputControlSuffixWrapper;try{InputControlSuffixWrapper.displayName="InputControlSuffixWrapper",InputControlSuffixWrapper.__docgenInfo={description:"A convenience wrapper for the `suffix` when you want to apply\nstandard padding in accordance with the size variant.\n\n```jsx\nimport {\n  __experimentalInputControl as InputControl,\n  __experimentalInputControlSuffixWrapper as InputControlSuffixWrapper,\n} from '@wordpress/components';\n\n<InputControl\n  suffix={<InputControlSuffixWrapper>%</InputControlSuffixWrapper>}\n/>\n```",displayName:"InputControlSuffixWrapper",props:{children:{defaultValue:null,description:"The suffix to be inserted.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 507 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/input-control/input-suffix-wrapper.tsx#InputControlSuffixWrapper"]={docgenInfo:InputControlSuffixWrapper.__docgenInfo,name:"InputControlSuffixWrapper",path:"packages/components/src/input-control/input-suffix-wrapper.tsx#InputControlSuffixWrapper"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/visually-hidden/component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>visually_hidden_component});var use_context_system=__webpack_require__("./packages/components/src/ui/context/use-context-system.js"),context_connect=__webpack_require__("./packages/components/src/ui/context/context-connect.ts");const visuallyHidden={border:0,clip:"rect(1px, 1px, 1px, 1px)",WebkitClipPath:"inset( 50% )",clipPath:"inset( 50% )",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",width:"1px",wordWrap:"normal"};var component=__webpack_require__("./packages/components/src/view/component.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedVisuallyHidden(props,forwardedRef){const{style:styleProp,...contextProps}=(0,use_context_system.y)(props,"VisuallyHidden");return(0,jsx_runtime.jsx)(component.Z,{ref:forwardedRef,...contextProps,style:{...visuallyHidden,...styleProp||{}}})}UnconnectedVisuallyHidden.displayName="UnconnectedVisuallyHidden";const VisuallyHidden=(0,context_connect.Iq)(UnconnectedVisuallyHidden,"VisuallyHidden"),visually_hidden_component=VisuallyHidden;try{VisuallyHidden.displayName="VisuallyHidden",VisuallyHidden.__docgenInfo={description:"`VisuallyHidden` is a component used to render text intended to be visually\nhidden, but will show for alternate devices, for example a screen reader.\n\n```jsx\nimport { VisuallyHidden } from `@wordpress/components`;\n\nfunction Example() {\n  return (\n    <VisuallyHidden>\n      <label>Code is Poetry</label>\n    </VisuallyHidden>\n  );\n}\n```",displayName:"VisuallyHidden",props:{children:{defaultValue:null,description:"The children elements.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 507 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/visually-hidden/component.tsx#VisuallyHidden"]={docgenInfo:VisuallyHidden.__docgenInfo,name:"VisuallyHidden",path:"packages/components/src/visually-hidden/component.tsx#VisuallyHidden"})}catch(__react_docgen_typescript_loader_error){}},"./packages/compose/build-module/hooks/use-instance-id/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const instanceMap=new WeakMap;const __WEBPACK_DEFAULT_EXPORT__=function useInstanceId(object,prefix,preferredId){return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{if(preferredId)return preferredId;const id=function createId(object){const instances=instanceMap.get(object)||0;return instanceMap.set(object,instances+1),instances}(object);return prefix?`${prefix}-${id}`:id}),[object,preferredId,prefix])}},"./packages/deprecated/build-module/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>deprecated});var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/hooks/build-module/index.js");const logged=Object.create(null);function deprecated(feature,options={}){const{since,version,alternative,plugin,link,hint}=options,message=`${feature} is deprecated${since?` since version ${since}`:""}${version?` and will be removed${plugin?` from ${plugin}`:""} in version ${version}`:""}.${alternative?` Please use ${alternative} instead.`:""}${link?` See: ${link}`:""}${hint?` Note: ${hint}`:""}`;message in logged||((0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.Kw)("deprecated",feature,options,message),console.warn(message),logged[message]=!0)}},"./node_modules/sprintf-js/src/sprintf.js":(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var re={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/};function sprintf(key){return function sprintf_format(parse_tree,argv){var arg,i,k,match,pad,pad_character,pad_length,is_positive,sign,cursor=1,tree_length=parse_tree.length,output="";for(i=0;i<tree_length;i++)if("string"==typeof parse_tree[i])output+=parse_tree[i];else if(Array.isArray(parse_tree[i])){if((match=parse_tree[i])[2])for(arg=argv[cursor],k=0;k<match[2].length;k++){if(!arg.hasOwnProperty(match[2][k]))throw new Error(sprintf('[sprintf] property "%s" does not exist',match[2][k]));arg=arg[match[2][k]]}else arg=match[1]?argv[match[1]]:argv[cursor++];if(re.not_type.test(match[8])&&re.not_primitive.test(match[8])&&arg instanceof Function&&(arg=arg()),re.numeric_arg.test(match[8])&&"number"!=typeof arg&&isNaN(arg))throw new TypeError(sprintf("[sprintf] expecting number but found %T",arg));switch(re.number.test(match[8])&&(is_positive=arg>=0),match[8]){case"b":arg=parseInt(arg,10).toString(2);break;case"c":arg=String.fromCharCode(parseInt(arg,10));break;case"d":case"i":arg=parseInt(arg,10);break;case"j":arg=JSON.stringify(arg,null,match[6]?parseInt(match[6]):0);break;case"e":arg=match[7]?parseFloat(arg).toExponential(match[7]):parseFloat(arg).toExponential();break;case"f":arg=match[7]?parseFloat(arg).toFixed(match[7]):parseFloat(arg);break;case"g":arg=match[7]?String(Number(arg.toPrecision(match[7]))):parseFloat(arg);break;case"o":arg=(parseInt(arg,10)>>>0).toString(8);break;case"s":arg=String(arg),arg=match[7]?arg.substring(0,match[7]):arg;break;case"t":arg=String(!!arg),arg=match[7]?arg.substring(0,match[7]):arg;break;case"T":arg=Object.prototype.toString.call(arg).slice(8,-1).toLowerCase(),arg=match[7]?arg.substring(0,match[7]):arg;break;case"u":arg=parseInt(arg,10)>>>0;break;case"v":arg=arg.valueOf(),arg=match[7]?arg.substring(0,match[7]):arg;break;case"x":arg=(parseInt(arg,10)>>>0).toString(16);break;case"X":arg=(parseInt(arg,10)>>>0).toString(16).toUpperCase()}re.json.test(match[8])?output+=arg:(!re.number.test(match[8])||is_positive&&!match[3]?sign="":(sign=is_positive?"+":"-",arg=arg.toString().replace(re.sign,"")),pad_character=match[4]?"0"===match[4]?"0":match[4].charAt(1):" ",pad_length=match[6]-(sign+arg).length,pad=match[6]&&pad_length>0?pad_character.repeat(pad_length):"",output+=match[5]?sign+arg+pad:"0"===pad_character?sign+pad+arg:pad+sign+arg)}return output}(function sprintf_parse(fmt){if(sprintf_cache[fmt])return sprintf_cache[fmt];var match,_fmt=fmt,parse_tree=[],arg_names=0;for(;_fmt;){if(null!==(match=re.text.exec(_fmt)))parse_tree.push(match[0]);else if(null!==(match=re.modulo.exec(_fmt)))parse_tree.push("%");else{if(null===(match=re.placeholder.exec(_fmt)))throw new SyntaxError("[sprintf] unexpected placeholder");if(match[2]){arg_names|=1;var field_list=[],replacement_field=match[2],field_match=[];if(null===(field_match=re.key.exec(replacement_field)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(field_list.push(field_match[1]);""!==(replacement_field=replacement_field.substring(field_match[0].length));)if(null!==(field_match=re.key_access.exec(replacement_field)))field_list.push(field_match[1]);else{if(null===(field_match=re.index_access.exec(replacement_field)))throw new SyntaxError("[sprintf] failed to parse named argument key");field_list.push(field_match[1])}match[2]=field_list}else arg_names|=2;if(3===arg_names)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");parse_tree.push(match)}_fmt=_fmt.substring(match[0].length)}return sprintf_cache[fmt]=parse_tree}(key),arguments)}function vsprintf(fmt,argv){return sprintf.apply(null,[fmt].concat(argv||[]))}var sprintf_cache=Object.create(null);exports.sprintf=sprintf,exports.vsprintf=vsprintf,"undefined"!=typeof window&&(window.sprintf=sprintf,window.vsprintf=vsprintf,void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return{sprintf,vsprintf}}.call(exports,__webpack_require__,exports,module))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}()},"./node_modules/tannin/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var PRECEDENCE,OPENERS,TERMINATORS,PATTERN;__webpack_require__.d(__webpack_exports__,{Z:()=>Tannin}),PRECEDENCE={"(":9,"!":8,"*":7,"/":7,"%":7,"+":6,"-":6,"<":5,"<=":5,">":5,">=":5,"==":4,"!=":4,"&&":3,"||":2,"?":1,"?:":1},OPENERS=["(","?"],TERMINATORS={")":["("],":":["?","?:"]},PATTERN=/<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;var OPERATORS={"!":function(a){return!a},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"+":function(a,b){return a+b},"-":function(a,b){return a-b},"<":function(a,b){return a<b},"<=":function(a,b){return a<=b},">":function(a,b){return a>b},">=":function(a,b){return a>=b},"==":function(a,b){return a===b},"!=":function(a,b){return a!==b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b},"?:":function(a,b,c){if(a)throw b;return c}};function compile(expression){var terms=function postfix(expression){for(var match,operator,term,element,terms=[],stack=[];match=expression.match(PATTERN);){for(operator=match[0],(term=expression.substr(0,match.index).trim())&&terms.push(term);element=stack.pop();){if(TERMINATORS[operator]){if(TERMINATORS[operator][0]===element){operator=TERMINATORS[operator][1]||operator;break}}else if(OPENERS.indexOf(element)>=0||PRECEDENCE[element]<PRECEDENCE[operator]){stack.push(element);break}terms.push(element)}TERMINATORS[operator]||stack.push(operator),expression=expression.substr(match.index+operator.length)}return(expression=expression.trim())&&terms.push(expression),terms.concat(stack.reverse())}(expression);return function(variables){return function evaluate(postfix,variables){var i,j,args,getOperatorResult,term,value,stack=[];for(i=0;i<postfix.length;i++){if(term=postfix[i],getOperatorResult=OPERATORS[term]){for(j=getOperatorResult.length,args=Array(j);j--;)args[j]=stack.pop();try{value=getOperatorResult.apply(null,args)}catch(earlyReturn){return earlyReturn}}else value=variables.hasOwnProperty(term)?variables[term]:+term;stack.push(value)}return stack[0]}(terms,variables)}}var DEFAULT_OPTIONS={contextDelimiter:"",onMissingKey:null};function Tannin(data,options){var key;for(key in this.data=data,this.pluralForms={},this.options={},DEFAULT_OPTIONS)this.options[key]=void 0!==options&&key in options?options[key]:DEFAULT_OPTIONS[key]}Tannin.prototype.getPluralForm=function(domain,n){var config,plural,pf,getPluralForm=this.pluralForms[domain];return getPluralForm||("function"!=typeof(pf=(config=this.data[domain][""])["Plural-Forms"]||config["plural-forms"]||config.plural_forms)&&(plural=function getPluralExpression(pf){var parts,i,part;for(parts=pf.split(";"),i=0;i<parts.length;i++)if(0===(part=parts[i].trim()).indexOf("plural="))return part.substr(7)}(config["Plural-Forms"]||config["plural-forms"]||config.plural_forms),pf=function pluralForms(expression){var evaluate=compile(expression);return function(n){return+evaluate({n})}}(plural)),getPluralForm=this.pluralForms[domain]=pf),getPluralForm(n)},Tannin.prototype.dcnpgettext=function(domain,context,singular,plural,n){var index,key,entry;return index=void 0===n?0:this.getPluralForm(domain,n),key=singular,context&&(key=context+this.options.contextDelimiter+singular),(entry=this.data[domain][key])&&entry[index]?entry[index]:(this.options.onMissingKey&&this.options.onMissingKey(singular,domain),0===index?singular:plural)}},"./packages/components/src/input-control/stories/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithEdgeLabel:()=>WithEdgeLabel,WithHelpText:()=>WithHelpText,WithPrefix:()=>WithPrefix,WithSideLabel:()=>WithSideLabel,WithSuffix:()=>WithSuffix,default:()=>stories});var input_control=__webpack_require__("./packages/components/src/input-control/index.tsx"),component=__webpack_require__("./packages/components/src/spacer/component.tsx"),use_context_system=__webpack_require__("./packages/components/src/ui/context/use-context-system.js"),context_connect=__webpack_require__("./packages/components/src/ui/context/context-connect.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedInputControlPrefixWrapper(props,forwardedRef){const derivedProps=(0,use_context_system.y)(props,"InputControlPrefixWrapper");return(0,jsx_runtime.jsx)(component.Z,{marginBottom:0,...derivedProps,ref:forwardedRef})}UnconnectedInputControlPrefixWrapper.displayName="UnconnectedInputControlPrefixWrapper";const InputControlPrefixWrapper=(0,context_connect.Iq)(UnconnectedInputControlPrefixWrapper,"InputControlPrefixWrapper");try{InputControlPrefixWrapper.displayName="InputControlPrefixWrapper",InputControlPrefixWrapper.__docgenInfo={description:"A convenience wrapper for the `prefix` when you want to apply\nstandard padding in accordance with the size variant.\n\n```jsx\nimport {\n  __experimentalInputControl as InputControl,\n  __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper,\n} from '@wordpress/components';\n\n<InputControl\n  prefix={<InputControlPrefixWrapper>@</InputControlPrefixWrapper>}\n/>\n```",displayName:"InputControlPrefixWrapper",props:{children:{defaultValue:null,description:"The prefix to be inserted.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 507 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/input-control/input-prefix-wrapper.tsx#InputControlPrefixWrapper"]={docgenInfo:InputControlPrefixWrapper.__docgenInfo,name:"InputControlPrefixWrapper",path:"packages/components/src/input-control/input-prefix-wrapper.tsx#InputControlPrefixWrapper"})}catch(__react_docgen_typescript_loader_error){}var input_suffix_wrapper=__webpack_require__("./packages/components/src/input-control/input-suffix-wrapper.tsx");const stories={title:"Components (Experimental)/InputControl",component:input_control.ZP,subcomponents:{InputControlPrefixWrapper,InputControlSuffixWrapper:input_suffix_wrapper.U},argTypes:{__unstableInputWidth:{control:{type:"text"}},__unstableStateReducer:{control:{type:null}},onChange:{control:{type:null}},prefix:{control:{type:null}},suffix:{control:{type:null}},type:{control:{type:"text"}},value:{control:{disable:!0}}},parameters:{sourceLink:"packages/components/src/input-control",controls:{expanded:!0},docs:{source:{state:"open"}}}},Template=args=>(0,jsx_runtime.jsx)(input_control.ZP,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={label:"Value",placeholder:"Placeholder"};const WithHelpText=Template.bind({});WithHelpText.args={...Default.args,help:"Help text to describe the control."};const WithPrefix=Template.bind({});WithPrefix.args={...Default.args,prefix:(0,jsx_runtime.jsx)(InputControlPrefixWrapper,{children:"@"})};const WithSuffix=Template.bind({});WithSuffix.args={...Default.args,suffix:(0,jsx_runtime.jsx)(input_suffix_wrapper.U,{children:"%"})};const WithSideLabel=Template.bind({});WithSideLabel.args={...Default.args,labelPosition:"side"};const WithEdgeLabel=Template.bind({});WithEdgeLabel.args={...Default.args,__unstableInputWidth:"20em",labelPosition:"edge"},WithPrefix.parameters??={},WithPrefix.parameters.docs??={},WithPrefix.parameters.docs.description??={},WithPrefix.parameters.docs.description.story??="A `prefix` can be inserted before the input. By default, the prefix is aligned with the edge of the input border,\nwith no padding. If you want to apply standard padding in accordance with the size variant, use the provided\n`<InputControlPrefixWrapper>` convenience wrapper.",WithSuffix.parameters??={},WithSuffix.parameters.docs??={},WithSuffix.parameters.docs.description??={},WithSuffix.parameters.docs.description.story??="A `suffix` can be inserted after the input. By default, the suffix is aligned with the edge of the input border,\nwith no padding. If you want to apply standard padding in accordance with the size variant, use the provided\n`<InputControlSuffixWrapper>` convenience wrapper.";try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/input-control/stories/index.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"packages/components/src/input-control/stories/index.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}try{WithPrefix.displayName="WithPrefix",WithPrefix.__docgenInfo={description:"A `prefix` can be inserted before the input. By default, the prefix is aligned with the edge of the input border,\nwith no padding. If you want to apply standard padding in accordance with the size variant, use the provided\n`<InputControlPrefixWrapper>` convenience wrapper.",displayName:"WithPrefix",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/input-control/stories/index.tsx#WithPrefix"]={docgenInfo:WithPrefix.__docgenInfo,name:"WithPrefix",path:"packages/components/src/input-control/stories/index.tsx#WithPrefix"})}catch(__react_docgen_typescript_loader_error){}try{WithSuffix.displayName="WithSuffix",WithSuffix.__docgenInfo={description:"A `suffix` can be inserted after the input. By default, the suffix is aligned with the edge of the input border,\nwith no padding. If you want to apply standard padding in accordance with the size variant, use the provided\n`<InputControlSuffixWrapper>` convenience wrapper.",displayName:"WithSuffix",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/input-control/stories/index.tsx#WithSuffix"]={docgenInfo:WithSuffix.__docgenInfo,name:"WithSuffix",path:"packages/components/src/input-control/stories/index.tsx#WithSuffix"})}catch(__react_docgen_typescript_loader_error){}}}]);