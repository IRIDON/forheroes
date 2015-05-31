this["JST"] = this["JST"] || {};

this["JST"]["templates/project.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"js-block\" data-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n	<div class=\"wrapper\">\r\n		<section class=\"proj-b\">\r\n			<h1 class=\"proj-b__title\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</h1>\r\n\r\n			<div class=\"box-c\">\r\n				<div class=\"info-t\">Зібрано: <b>"
    + alias3(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"amount","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currency","hash":{},"data":data}) : helper)))
    + "</b></div>\r\n				<div class=\"info-t\">Треба зібрати: <b>"
    + alias3(((helper = (helper = helpers.required_amount || (depth0 != null ? depth0.required_amount : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"required_amount","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currency","hash":{},"data":data}) : helper)))
    + "</b></div>\r\n\r\n				<div class=\"row-fluid box-c-btn\">\r\n					<form action=\"http://app.forheroes.org.ua:8082/api/donate\" method=\"POST\">\r\n						<div class=\"span6\">\r\n							<div class=\"cur-input\">\r\n								<span class=\"cur-input__t\">"
    + alias3(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currency","hash":{},"data":data}) : helper)))
    + "</span>\r\n\r\n								<div class=\"cur-input__w\">\r\n									<input class=\"cur-input__num\" type=\"number\" name=\"amount\" value=\""
    + alias3(((helper = (helper = helpers.default_amount || (depth0 != null ? depth0.default_amount : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"default_amount","hash":{},"data":data}) : helper)))
    + "\">\r\n								</div>\r\n							</div>\r\n						</div>\r\n						<div class=\"span6\">\r\n							<button class=\"btn\">Сплатити</button>\r\n							<p class=\"btn-sub-t\">\r\n								<a class=\"js-showDes\" href=\"#\">Куди підуть кошти?</a>\r\n							</p>\r\n\r\n							<input type=\"hidden\" name=\"project_id\" value=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n						</div>\r\n					</form>\r\n				</div>\r\n			</div>\r\n			\r\n			<p class=\"proj-b__des js-destination\">"
    + alias3(((helper = (helper = helpers.destination || (depth0 != null ? depth0.destination : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destination","hash":{},"data":data}) : helper)))
    + "</p>\r\n			<div class=\"galery-b js-galery\">\r\n			"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.images : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</section>\r\n	</div>\r\n</li>\r\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"galery-b__i\"> \r\n					<a target=\"_blank\" title=\""
    + alias3(((helper = (helper = helpers.image_description || (depth0 != null ? depth0.image_description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_description","hash":{},"data":data}) : helper)))
    + "\" href=\"http://app.forheroes.org.ua:8082/images/"
    + alias3(((helper = (helper = helpers.image_name || (depth0 != null ? depth0.image_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_name","hash":{},"data":data}) : helper)))
    + "\" data-gallery=\"\">\r\n						<img width=\"240\" height=\"180\" alt=\""
    + alias3(((helper = (helper = helpers.image_description || (depth0 != null ? depth0.image_description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_description","hash":{},"data":data}) : helper)))
    + "\" src=\"http://app.forheroes.org.ua:8082/images/"
    + alias3(((helper = (helper = helpers.image_tmb_name || (depth0 != null ? depth0.image_tmb_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_tmb_name","hash":{},"data":data}) : helper)))
    + "\" draggable=\"false\">\r\n					</a>\r\n				</div>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.proj : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});