var global=this;
(function(){function i(a){var b=Array(80-(a.length+1)).join("-");j&&console.log("\n"+a+" "+b+"\n")}function g(){j&&console.log.apply(console,arguments)}function h(a){var b=arguments;return a.replace(/{(\d+)}/g,function(a,f){return String(b[Number(f)+1]||"")})}function c(a){this.buffers=[[]];this.call_stack=[];this.locals=a;this.this_={};this.namespaces={};this.filters={h:function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},u:function(a){return escape(a)},trim:function(a){return a.replace(/^\s\s*/,
"").replace(/\s\s*$/,"")}}}function k(a){a=h("with(context.namespaces) {\nwith(context.locals) {\n{0}\n}\n}",a);i("Sandboxed ");g(a);try{this.impl=new Function("context",a)}catch(b){i("Compilation Error  "),g(b)}}function e(a){return function(b){(b=b.match(a))&&delete b.input;return b}}var j=!0,l=/^\${([^}]*)}/,m=/([a-zA-Z_]\w+)\:([a-zA-Z_]\w+)/,o=/\s*(\w+)\s*=\s*(?:'([^']*)'|\"([^\"]*)\")/g;if(!global.console)global.console={log:function(a){System.err.println(JSON.stringify(a))}};c.prototype.peek_buffer=
function(){return this.buffers[this.buffers.length-1]};c.prototype.filter=function(a,b){return this.filters[a](b)};c.prototype.add_filter=function(a,b){this.filters[a]=b};c.prototype.write=function(a,b){for(var a=String(a||"").toString(),b=b||[],d=0;d<b.length;d++)a=this.filter(b[d],a);return this.peek_buffer().push(a.toString())};c.prototype.get=function(){return this.peek_buffer().join("")};c.prototype.push_buffer=function(){return this.buffers.push([])};c.prototype.pop_buffer=function(){var a=
this.get();this.buffers.pop();return a};c.prototype.add_function=function(a,b){this.this_[a]=b};c.prototype.invoke=function(a,b,d){return a.call(this.this_,b,d)};c.prototype.push_call=function(a,b){this.push_buffer();this.call_stack.push({func:a,attrs:b})};c.prototype.pop_call=function(){var a=this.pop_buffer(),b=this.call_stack.pop();this.invoke(b.func,b.attrs,a)};k.prototype.render=function(a){context=new c(a);i("Rendering");try{this.impl.call(context.this_,context)}catch(b){throw a=b.constructor("Error in Evaled Script: "+
b.message),a.lineNumber=b.lineNumber-a.lineNumber+3,a;}return context.get()};var p=e(/^\<%([\w\.\:]+)((?:\s+\w+|\s*=\s*|".*?"|'.*?')*)\s*(\/)?>/),q=e(l),n=[{name:"block",match:function(a){var b=null;a.match(/^<%/)&&(close=a.match(/%>/))&&(b={0:a.substring(0,close.index+2),1:a.substring(2,close.index)});return b}},{name:"expression",match:function(a){if(a=q(a)){var b=a[1].split(/\|/);a[1]=b[0];b[1]&&(a[2]=b[1].split(/, ?/))}return a}},{name:"start-tag",match:function(a){if(a=p(a)){a.attrs={};for(var b;b=
o.exec(a[2]);)a.attrs[b[1]]=b[3];a.inline=a[3]=="/"}return a}},{name:"end-tag",match:e(/^\<\/%[\t ]*(.+?)[\t ]*>/)},{name:"end-control",match:e(/^%end([^\n]+)\n/)},{name:"else",match:e(/^%else\n/)},{name:"start-control",match:e(/^%([^\n]+)\n/)},{name:"text",match:e(/^((.|\n)*?)((?=\${)|(?=<\/?%)|(?=%\w+)|$)/)}],r={text:function(a){return h("context.write({0});",'"'+a.data[1].replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"')},expression:function(a){for(var b=h,d=a.data[1]||'""',a=a.data[2]||["h"],f=[],
c=0;c<a.length;c++)f.push("'"+a[c]+"'");a="["+f.join(", ")+"]";return b("context.write({0}, {1});",d,a)},block:function(a){return a.data[1]},"start-control":function(a){return a.data[1]+"{"},"end-control":function(){return"}"},"else":function(){return"} else { "},"start-tag":function(a){var b=a.data[1],d;if(b=="function")return h("context.add_function( '{0}', function (attrs, body) {",a.data.attrs.name);else if(b!="namespace"&&(d=b.match(m))){var b=d[1]+"."+d[2],f;d=a.data.attrs;var c=[];for(f in d){var e=
d[f],g=e.match(l),e=g?g[1]:"'"+e+"'";c.push(f+": "+e)}f="{"+c.join(", ")+"}";return h("context.{0}({1}, {2});",a.data.inline?"invoke":"push_call",b,f)}},"end-tag":function(a){a=a.data[1];if(a=="function")return"});";else if(match=a.match(m))return"context.pop_call();"}};this.tiger=function(a){var b;a:{for(var d=[];a;){for(var c,e=0;e<n.length;e++)if(c=n[e],b=c.match(a))break;if(!b){g("Parse error");g(d);g(a);b=[];break a}pos=b[0].length;d.push({name:c.name,data:b});a=a.substring(pos)}b=d}i("Compile");
g(b);c=[];for(a=0;a<b.length;a++)d=b[a],d=r[d.name](d),c.push(d);b=c.join("\n    ");return new k(b)}})();
