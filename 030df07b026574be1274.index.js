(()=>{"use strict";function e(e){return document.querySelector(e)}function t(t){t.preventDefault();const s=e("#contacts-name"),o=e("#contacts-phone"),a=e("#contacts-text"),u=e("#contacts-agree"),i=o.value.replace(/\D+/g,"");[n(s,"input_has-error"),c(o,"input_has-error",i),n(a,"input_has-error"),r(u,"contacts__checkbox-error_visible")].includes(!1)||alert("Валидация прошла успешно: "+JSON.stringify({name:s.value,phone:i,text:a.value},null,2))}function n(e,t){const n=e.parentElement;return e.value.trim()?(n.classList.remove(t),!0):(n.classList.add(t),!1)}function r(t,n){const r=e("#checkbox-error");return t.checked?(r.classList.remove(n),!0):(r.classList.add(n),!1)}function c(e,t,n){const r=e.parentElement;return 11===n.length?(r.classList.remove(t),!0):(r.classList.add(t),!1)}document.addEventListener("DOMContentLoaded",(()=>{document.querySelector("#contacts-form").addEventListener("submit",t)}))})();