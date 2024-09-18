import{a as re}from"./chunk-XQT4T4VT.js";import{A as O,E as U,b,c as d,d as C,e as h,h as y,j as S,l as w,s as x,u as ee,w as E}from"./chunk-EDFPERD6.js";import{$a as k,A as v,B as q,Ca as c,G as X,H as Y,P as m,Q as p,Sa as P,Ua as I,X as s,Z as l,a as K,ba as n,ca as i,cb as Z,da as u,gb as $,ia as F,ib as _,ja as f,jb as N,lb as D,mb as te,q as Q,ta as a,w as T}from"./chunk-ETE6ETIJ.js";var ie=t=>({"is-invalid":t});function me(t,o){t&1&&(n(0,"div"),a(1,"Username is required"),i())}function le(t,o){if(t&1&&(n(0,"small",19),s(1,me,2,0,"div",20),i()),t&2){let r=f();m(),l("ngIf",r.f.username.errors==null?null:r.f.username.errors.required)}}function se(t,o){t&1&&(n(0,"div"),a(1,"Password is required"),i())}function de(t,o){if(t&1&&(n(0,"small",19),s(1,se,2,0,"div",20),i()),t&2){let r=f();m(),l("ngIf",r.f.password.errors==null?null:r.f.password.errors.required)}}var A=class t{constructor(o,r,e,g){this.fb=o;this.router=r;this.authService=e;this.messageService=g;this.loginForm=this.fb.group({username:["",[d.required]],password:["",d.required]})}loginForm;submitted=!1;get f(){return this.loginForm.controls}onSubmit=()=>{this.submitted=!0;let{username:o,password:r}=this.loginForm.getRawValue();this.loginForm.invalid||this.authService.getUserByUsername(o).subscribe(e=>{e.length>0&&e[0].password===r?(sessionStorage.setItem("username",o),sessionStorage.setItem("first_name",e[0].first_name),sessionStorage.setItem("last_name",e[0].last_name),sessionStorage.setItem("is_admin",String(e[0].is_admin)),console.log(sessionStorage.getItem("is_admin")),e[0].is_admin?this.router.navigate(["/admin"]):this.router.navigate(["/home"])):this.messageService.add({severity:"error",summary:"Error",detail:"Username or password is incorrect"})},e=>{this.messageService.add({severity:"error",summary:"Error",detail:"Error in logging in"})})};static \u0275fac=function(r){return new(r||t)(p(x),p(_),p(E),p(O))};static \u0275cmp=v({type:t,selectors:[["app-login"]],decls:30,vars:9,consts:[[1,"form-wrapper"],[1,"form-container"],[1,"text-center"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Type your user name",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["for","password",1,"form-label"],["type","password","formControlName","password","id","password","placeholder","Type your password",1,"form-control",3,"ngClass"],[1,"row","mb-3"],[1,"col-md-6","d-flex","justify-content-center"],[1,"form-check","mb-3","mb-md-0"],["type","checkbox","value","","id","loginCheck","checked","",1,"form-check-input"],["for","loginCheck",1,"form-check-label"],["routerLink","/auth/forgot-password"],["type","submit",1,"btn","btn-primary","w-100"],[1,"form-text","mt-3","text-center"],["routerLink","/auth/register"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(r,e){r&1&&(n(0,"div",0)(1,"div",1)(2,"h3",2),a(3,"Login"),i(),n(4,"form",3),F("ngSubmit",function(){return e.onSubmit()}),n(5,"div",4)(6,"label",5),a(7,"User Name"),i(),u(8,"input",6),s(9,le,2,1,"small",7),i(),n(10,"div",4)(11,"label",8),a(12,"Password"),i(),u(13,"input",9),s(14,de,2,1,"small",7),i(),n(15,"div",10)(16,"div",11)(17,"div",12),u(18,"input",13),n(19,"label",14),a(20," Remember me "),i()()(),n(21,"div",11)(22,"a",15),a(23,"Forgot password?"),i()()(),n(24,"button",16),a(25,"Sign In"),i(),n(26,"p",17),a(27," Not a member? "),n(28,"a",18),a(29,"Register"),i()()()()()),r&2&&(m(4),l("formGroup",e.loginForm),m(4),l("ngClass",c(5,ie,e.submitted&&e.f.username.errors)),m(),l("ngIf",e.f.username.invalid&&(e.f.username.dirty||e.f.username.touched)),m(4),l("ngClass",c(7,ie,e.submitted&&e.f.password.errors)),m(),l("ngIf",e.f.password.invalid&&(e.f.password.dirty||e.f.password.touched)))},dependencies:[P,I,N,y,b,C,h,S,w],styles:[".form-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f8f9fa}.form-container[_ngcontent-%COMP%]{width:540px;background-color:#fff;padding:30px;border-radius:8px;box-shadow:0 0 15px #0000001a}.form-control.is-invalid[_ngcontent-%COMP%]{border-color:#dc3545}.invalid-feedback[_ngcontent-%COMP%]{color:#dc3545;font-size:.875rem}.btn-primary[_ngcontent-%COMP%]{background-color:#007bff;border:none}.btn-primary[_ngcontent-%COMP%]:disabled{background-color:#d1e7fd}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#6c757d}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]})};var M=t=>({"is-invalid":t});function ue(t,o){t&1&&(n(0,"div"),a(1,"First name is required"),i())}function pe(t,o){if(t&1&&(n(0,"small",28),s(1,ue,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.first_name.errors==null?null:r.f.first_name.errors.required)}}function fe(t,o){t&1&&(n(0,"div"),a(1,"Last name is required"),i())}function ce(t,o){if(t&1&&(n(0,"small",28),s(1,fe,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.last_name.errors==null?null:r.f.last_name.errors.required)}}function ge(t,o){t&1&&(n(0,"div"),a(1,"User name is required"),i())}function ve(t,o){if(t&1&&(n(0,"small",28),s(1,ge,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.username.errors==null?null:r.f.username.errors.required)}}function _e(t,o){t&1&&(n(0,"small",28),a(1," Username already exists "),i())}function be(t,o){t&1&&(n(0,"div"),a(1,"Email is required"),i())}function Ce(t,o){t&1&&(n(0,"div"),a(1,"Email should be valid"),i())}function he(t,o){if(t&1&&(n(0,"small",28),s(1,be,2,0,"div",29)(2,Ce,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.email.errors==null?null:r.f.email.errors.required),m(),l("ngIf",r.f.email.errors==null?null:r.f.email.errors.email)}}function ye(t,o){t&1&&(n(0,"div"),a(1,"Mobile number is required"),i())}function Se(t,o){t&1&&(n(0,"div"),a(1,"Mobile number is invalid"),i())}function we(t,o){if(t&1&&(n(0,"small",28),s(1,ye,2,0,"div",29)(2,Se,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.mobile_num.errors==null?null:r.f.mobile_num.errors.required),m(),l("ngIf",(r.f.mobile_num.errors==null?null:r.f.mobile_num.errors.pattern)||(r.f.mobile_num.errors==null?null:r.f.mobile_num.errors.maxlength))}}function xe(t,o){t&1&&(n(0,"div"),a(1,"Password is required"),i())}function Ee(t,o){if(t&1&&(n(0,"small",28),s(1,xe,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.password.errors==null?null:r.f.password.errors.required)}}function Me(t,o){t&1&&(n(0,"div"),a(1,"Please confirm your password"),i())}function Fe(t,o){if(t&1&&(n(0,"small",28),s(1,Me,2,0,"div",29),i()),t&2){let r=f();m(),l("ngIf",r.f.confirm_password.errors==null?null:r.f.confirm_password.errors.required)}}function Pe(t,o){t&1&&(n(0,"small",28),a(1," Password should match "),i())}var j=class t{constructor(o,r,e,g,je){this.fb=o;this.router=r;this.authService=e;this.messageService=g;this.usernameValidator=je;this.registerForm=this.fb.group({first_name:["",d.required],last_name:["",d.required],username:["",[d.required],this.usernameIsUnique.bind(this)],email:["",[d.required,d.email]],is_admin:[!1],deactivated:[!1],mobile_num:["",[d.required,d.pattern(/^(9)\d{9}/),d.maxLength(10)]],password:["",d.required],confirm_password:["",d.required]},{validators:re})}registerForm;submitted=!1;get f(){return this.registerForm.controls}get usernameAlreadyTaken(){return this.f.username.hasError("usernameExists")}usernameIsUnique=o=>this.usernameValidator.checkIfUsernameUnique(o.value).pipe(Q(r=>r?{usernameExists:!0}:null));capitalizeWord=o=>{let r=o.split(" "),e=" ";return r.forEach(g=>{e+=g.charAt(0).toUpperCase()+g.slice(1)+" "}),console.log(e.trim()),e};onSubmit=()=>{this.submitted=!0;let o=K({},this.registerForm.getRawValue());delete o.confirm_password,o.first_name=this.capitalizeWord(o.first_name),o.last_name=this.capitalizeWord(o.last_name),o.profile_img="default_profile_img-100.png",!this.registerForm.invalid&&this.authService.checkIfUsernameExists(o.username).subscribe(r=>{r?this.messageService.add({severity:"error",summary:"Error",detail:"Username already exists"}):this.authService.registerUser(o).subscribe(e=>{console.log("Registered user: ",e),this.messageService.add({severity:"success",summary:"Success",detail:"Registered successfully!"}),this.router.navigate(["/auth/login"])},e=>{console.log("Error Registration: ",e),this.messageService.add({severity:"error",summary:"Error",detail:"Error registering user"})})})};static \u0275fac=function(r){return new(r||t)(p(x),p(_),p(E),p(O),p(U))};static \u0275cmp=v({type:t,selectors:[["app-register"]],decls:53,vars:31,consts:[[1,"form-wrapper"],[1,"form-container"],[1,"text-center"],[3,"ngSubmit","formGroup"],[1,"fullname","form-group"],[1,"mb-3"],["for","firstname",1,"form-label"],["type","text","formControlName","first_name","id","firstname","placeholder","Type your first name",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["for","lastname",1,"form-label"],["type","text","formControlName","last_name","id","lastname","placeholder","Type your last name",1,"form-control",3,"ngClass"],[1,"mb-3","form-group"],["for","username",1,"form-label"],["type","text","formControlName","username","id","username","placeholder","Type your user name",1,"form-control",3,"ngClass"],[1,"contacts","form-group"],["for","email",1,"form-label"],["type","email","formControlName","email","id","email","placeholder","Type your email",1,"form-control",3,"ngClass"],["for","mobile-number",1,"form-label"],[1,"input-group"],[1,"input-group-text"],["type","text","id","mobile-number","formControlName","mobile_num","placeholder","Enter mobile number",1,"form-control",3,"ngClass"],["for","password",1,"form-label"],["type","password","formControlName","password","id","password","placeholder","Type your password",1,"form-control",3,"ngClass"],["for","confirm-password",1,"form-label"],["type","password","formControlName","confirm_password","id","confirm-password","placeholder","Confirm Password",1,"form-control",3,"ngClass"],["type","submit",1,"btn","btn-primary","w-100"],[1,"form-text","mt-3","text-center"],["routerLink","/auth/login"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(r,e){r&1&&(n(0,"div",0)(1,"div",1)(2,"h3",2),a(3,"Register"),i(),n(4,"form",3),F("ngSubmit",function(){return e.onSubmit()}),n(5,"div",4)(6,"div",5)(7,"label",6),a(8,"First Name"),i(),u(9,"input",7),s(10,pe,2,1,"small",8),i(),n(11,"div",5)(12,"label",9),a(13,"Last Name"),i(),u(14,"input",10),s(15,ce,2,1,"small",8),i()(),n(16,"div",11)(17,"label",12),a(18,"User Name"),i(),u(19,"input",13),s(20,ve,2,1,"small",8)(21,_e,2,0,"small",8),i(),n(22,"div",14)(23,"div",5)(24,"label",15),a(25,"Email"),i(),u(26,"input",16),s(27,he,3,2,"small",8),i(),n(28,"div",5)(29,"label",17),a(30,"Mobile Number"),i(),n(31,"div",18)(32,"span",19),a(33,"+63"),i(),u(34,"input",20),s(35,we,3,2,"small",8),i()()(),n(36,"div",11)(37,"label",21),a(38,"Password"),i(),u(39,"input",22),s(40,Ee,2,1,"small",8),i(),n(41,"div",11)(42,"label",23),a(43,"Confirm Password"),i(),u(44,"input",24),s(45,Fe,2,1,"small",8)(46,Pe,2,0,"small",8),i(),n(47,"button",25),a(48,"Register"),i(),n(49,"p",26),a(50," Already a member? "),n(51,"a",27),a(52,"Login"),i()()()()()),r&2&&(m(4),l("formGroup",e.registerForm),m(5),l("ngClass",c(17,M,e.submitted&&e.f.first_name.errors)),m(),l("ngIf",e.f.first_name.invalid&&(e.f.first_name.dirty||e.f.last_name.touched)),m(4),l("ngClass",c(19,M,e.submitted&&e.f.last_name.errors)),m(),l("ngIf",e.f.last_name.invalid&&(e.f.last_name.dirty||e.f.last_name.touched)),m(4),l("ngClass",c(21,M,e.submitted&&e.f.username.errors||e.usernameAlreadyTaken&&e.f.username.touched)),m(),l("ngIf",e.f.username.invalid&&(e.f.username.dirty||e.f.username.touched)),m(),l("ngIf",e.usernameAlreadyTaken),m(5),l("ngClass",c(23,M,e.submitted&&e.f.email.errors)),m(),l("ngIf",e.f.email.invalid&&(e.f.email.dirty||e.f.email.touched)),m(7),l("ngClass",c(25,M,e.submitted&&e.f.mobile_num.errors||e.f.mobile_num.touched&&((e.f.mobile_num.errors==null?null:e.f.mobile_num.errors.pattern)||(e.f.mobile_num.errors==null?null:e.f.mobile_num.errors.maxlength)))),m(),l("ngIf",e.f.mobile_num.invalid&&(e.f.mobile_num.dirty||e.f.mobile_num.touched)),m(4),l("ngClass",c(27,M,e.submitted&&e.f.password.errors)),m(),l("ngIf",e.f.password.invalid&&(e.f.password.dirty||e.f.password.touched)),m(4),l("ngClass",c(29,M,e.submitted&&e.f.confirm_password.errors||e.f.confirm_password.touched&&(e.registerForm.errors==null?null:e.registerForm.errors.passwordMismatch))),m(),l("ngIf",e.f.confirm_password.invalid&&(e.f.confirm_password.dirty||e.f.confirm_password.touched)),m(),l("ngIf",(e.registerForm.errors==null?null:e.registerForm.errors.passwordMismatch)&&e.f.confirm_password.valid&&e.f.password.valid))},dependencies:[P,I,N,y,b,C,h,S,w],styles:[".form-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f8f9fa}.form-container[_ngcontent-%COMP%]{width:540px;background-color:#fff;padding:30px;border-radius:8px;box-shadow:0 0 15px #0000001a}.form-control.is-invalid[_ngcontent-%COMP%]{border-color:#dc3545}.invalid-feedback[_ngcontent-%COMP%]{color:#dc3545;font-size:.875rem}.btn-primary[_ngcontent-%COMP%]{background-color:#007bff;border:none}.btn-primary[_ngcontent-%COMP%]:disabled{background-color:#d1e7fd}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#6c757d}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.fullname[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}.fullname[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%}.fullname[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child{margin-right:20px}.contacts[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}.contacts[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%}.contacts[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child{margin-right:20px}.contacts[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]{width:100%}"]})};var J=t=>({"is-invalid":t});function Ie(t,o){t&1&&(n(0,"div"),a(1,"Username is required"),i())}function Ne(t,o){if(t&1&&(n(0,"small",15),s(1,Ie,2,0,"div",16),i()),t&2){let r=f();m(),l("ngIf",r.f.username.errors==null?null:r.f.username.errors.required)}}function Oe(t,o){t&1&&(n(0,"div"),a(1,"Email is required"),i())}function Re(t,o){t&1&&(n(0,"div"),a(1,"Email should be valid"),i())}function Te(t,o){if(t&1&&(n(0,"small",15),s(1,Oe,2,0,"div",16)(2,Re,2,0,"div",16),i()),t&2){let r=f();m(),l("ngIf",r.f.email.errors==null?null:r.f.email.errors.required),m(),l("ngIf",r.f.email.errors==null?null:r.f.email.errors.email)}}function qe(t,o){t&1&&(n(0,"div"),a(1,"Mobile number is required"),i())}function ke(t,o){t&1&&(n(0,"div"),a(1,"Mobile number is invalid"),i())}function Ue(t,o){if(t&1&&(n(0,"small",15),s(1,qe,2,0,"div",16)(2,ke,2,0,"div",16),i()),t&2){let r=f();m(),l("ngIf",r.f.mobile_num.errors==null?null:r.f.mobile_num.errors.required),m(),l("ngIf",(r.f.mobile_num.errors==null?null:r.f.mobile_num.errors.pattern)||(r.f.mobile_num.errors==null?null:r.f.mobile_num.errors.maxlength))}}var L=class t{constructor(o,r,e,g){this.fb=o;this.router=r;this.authService=e;this.messageService=g;this.forgotPasswordForm=this.fb.group({username:["",[d.required]],email:["",[d.required,d.email]],mobile_num:["",[d.required,d.pattern(/^(9)\d{9}/),d.maxLength(10)]]})}forgotPasswordForm;submitted=!1;get f(){return this.forgotPasswordForm.controls}onSubmit=()=>{this.submitted=!0;let{username:o,email:r,mobile_num:e}=this.forgotPasswordForm.getRawValue();this.forgotPasswordForm.invalid||this.authService.getUserByUsername(o).subscribe(g=>{g.length>0&&g[0].email===r&&g[0].mobile_num===e?(sessionStorage.setItem("username",o),this.router.navigate(["/auth/user-creds"],{queryParams:{user:o}})):this.messageService.add({severity:"error",summary:"Error",detail:"Invalid email or mobile number"})},g=>{this.messageService.add({severity:"error",summary:"Error",detail:"Username does not exist"})})};static \u0275fac=function(r){return new(r||t)(p(x),p(_),p(E),p(O))};static \u0275cmp=v({type:t,selectors:[["app-forgot-password"]],decls:25,vars:13,consts:[[1,"form-wrapper"],[1,"form-container"],[1,"text-center"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Type your user name",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["for","email",1,"form-label"],["type","email","formControlName","email","id","email","placeholder","Type your email",1,"form-control",3,"ngClass"],["for","mobile-number",1,"form-label"],[1,"input-group"],[1,"input-group-text"],["type","text","id","mobile-number","formControlName","mobile_num","placeholder","Enter mobile number",1,"form-control",3,"ngClass"],["type","submit",1,"btn","btn-primary","w-100"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(r,e){r&1&&(n(0,"div",0)(1,"div",1)(2,"h3",2),a(3,"Forgot Password"),i(),n(4,"form",3),F("ngSubmit",function(){return e.onSubmit()}),n(5,"div",4)(6,"label",5),a(7,"User Name"),i(),u(8,"input",6),s(9,Ne,2,1,"small",7),i(),n(10,"div",4)(11,"label",8),a(12,"Email"),i(),u(13,"input",9),s(14,Te,3,2,"small",7),i(),n(15,"div",4)(16,"label",10),a(17,"Mobile Number"),i(),n(18,"div",11)(19,"span",12),a(20,"+63"),i(),u(21,"input",13),s(22,Ue,3,2,"small",7),i()(),n(23,"button",14),a(24,"Submit"),i()()()()),r&2&&(m(4),l("formGroup",e.forgotPasswordForm),m(4),l("ngClass",c(7,J,e.submitted&&e.f.username.errors)),m(),l("ngIf",e.f.username.invalid&&(e.f.username.dirty||e.f.username.touched)),m(4),l("ngClass",c(9,J,e.submitted&&e.f.email.errors)),m(),l("ngIf",e.f.email.invalid&&(e.f.email.dirty||e.f.email.touched)),m(7),l("ngClass",c(11,J,e.submitted&&e.f.mobile_num.errors||e.f.mobile_num.touched&&((e.f.mobile_num.errors==null?null:e.f.mobile_num.errors.pattern)||(e.f.mobile_num.errors==null?null:e.f.mobile_num.errors.maxlength)))),m(),l("ngIf",e.f.mobile_num.invalid&&(e.f.mobile_num.dirty||e.f.mobile_num.touched)))},dependencies:[P,I,y,b,C,h,S,w],styles:[".form-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f8f9fa}.form-container[_ngcontent-%COMP%]{width:540px;background-color:#fff;padding:30px;border-radius:8px;box-shadow:0 0 15px #0000001a}.form-control.is-invalid[_ngcontent-%COMP%]{border-color:#dc3545}.invalid-feedback[_ngcontent-%COMP%]{color:#dc3545;font-size:.875rem}.btn-primary[_ngcontent-%COMP%]{background-color:#007bff;border:none}.btn-primary[_ngcontent-%COMP%]:disabled{background-color:#d1e7fd}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#6c757d}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]})};var V=class t{constructor(o,r,e,g){this.fb=o;this.route=r;this.router=e;this.authService=g;this.userCredsForm=this.fb.group({username:["",d.required],email:["",d.required],mobile_num:["",d.required],password:["",d.required]})}userCredsForm;submitted=!1;ngOnInit(){this.userCredsForm.disable(),this.route.queryParams.subscribe(o=>{console.log(o.user),this.authService.getUserByUsername(o.user).subscribe(r=>{r.length>0&&(this.userCredsForm.patchValue({username:r[0].username}),this.userCredsForm.patchValue({email:r[0].email}),this.userCredsForm.patchValue({mobile_num:r[0].mobile_num}),this.userCredsForm.patchValue({password:r[0].password}))})})}static \u0275fac=function(r){return new(r||t)(p(x),p($),p(_),p(E))};static \u0275cmp=v({type:t,selectors:[["app-user-creds"]],decls:30,vars:1,consts:[[1,"form-wrapper"],[1,"form-container"],[1,"back"],["routerLink","/auth/login"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 512 512"],["d","M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L392 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-214.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z"],[1,"text-center"],[3,"formGroup"],[1,"profile"],["src","assets/img/profile.png","alt",""],[1,"mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Type your user name",1,"form-control"],["for","email",1,"form-label"],["type","email","formControlName","email","id","email","placeholder","Type your email",1,"form-control"],["for","mobile-number",1,"form-label"],[1,"input-group"],[1,"input-group-text"],["type","text","id","mobile-number","formControlName","mobile_num","placeholder","Enter mobile number",1,"form-control"],["for","password",1,"form-label"],["type","text","formControlName","password","id","password","placeholder","Type your password",1,"form-control"]],template:function(r,e){r&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"a",3),X(),n(4,"svg",4),u(5,"path",5),i()()(),Y(),n(6,"h3",6),a(7,"User Credentials"),i(),n(8,"form",7)(9,"div",8),u(10,"img",9),i(),n(11,"div",10)(12,"label",11),a(13,"User Name"),i(),u(14,"input",12),i(),n(15,"div",10)(16,"label",13),a(17,"Email"),i(),u(18,"input",14),i(),n(19,"div",10)(20,"label",15),a(21,"Mobile Number"),i(),n(22,"div",16)(23,"span",17),a(24,"+63"),i(),u(25,"input",18),i()(),n(26,"div",10)(27,"label",19),a(28,"Password"),i(),u(29,"input",20),i()()()()),r&2&&(m(8),l("formGroup",e.userCredsForm))},dependencies:[N,y,b,C,h,S,w],styles:[".form-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#f8f9fa}.form-container[_ngcontent-%COMP%]{width:400px;background-color:#fff;padding:30px;border-radius:8px;box-shadow:0 0 15px #0000001a}.form-control.is-invalid[_ngcontent-%COMP%]{border-color:#dc3545}.invalid-feedback[_ngcontent-%COMP%]{color:#dc3545;font-size:.875rem}.btn-primary[_ngcontent-%COMP%]{background-color:#007bff;border:none}.btn-primary[_ngcontent-%COMP%]:disabled{background-color:#d1e7fd}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#6c757d}.form-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.profile[_ngcontent-%COMP%]{width:100;display:flex;justify-content:center;align-items:center}.profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:200px}.back[_ngcontent-%COMP%]{text-align:left}.back[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{height:25px;fill:#5e5e5e;cursor:pointer}"]})};var Ae=[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:A},{path:"register",component:j},{path:"forgot-password",component:L},{path:"user-creds",component:V}],G=class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=q({type:t});static \u0275inj=T({imports:[D.forChild(Ae),k,D]})};var ae=class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=q({type:t});static \u0275inj=T({providers:[U],imports:[k,G,ee,Z,te]})};export{ae as AuthModule};