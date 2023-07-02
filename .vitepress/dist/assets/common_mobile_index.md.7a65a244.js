import{_ as e,o as r,c as a,O as t}from"./chunks/framework.07b6c534.js";const o="/portfolio-project-wiki/assets/drawer-notifications.9ef24ac6.png",s="/portfolio-project-wiki/assets/drawer-feedback.e227349d.png",w=JSON.parse('{"title":"Поддержка мобильных девайсов","description":"","frontmatter":{},"headers":[],"relativePath":"common/mobile/index.md","filePath":"common/mobile/index.md"}'),n={name:"common/mobile/index.md"},i=t('<h1 id="поддержка-мобильных-деваисов" tabindex="-1">Поддержка мобильных девайсов <a class="header-anchor" href="#поддержка-мобильных-деваисов" aria-label="Permalink to &quot;Поддержка мобильных девайсов&quot;">​</a></h1><p>В проекте стилизации не уделялось большого кол-ва внимания, т. к. он был направлен больше на технические вещи, поэтому верстка не адаптировалась для мобильных устройств.</p><p>Однако кое-что для мобильных устройств все же было сделано - кастомный компонент <strong>Drawer</strong> (<em>shared/ui/redesigned/drawer</em>). <strong>Drawer</strong> представляет собой выплывающую снизу шторку, которая закрывается свайпом вниз. Для управления жестами были использованы библиотеки <a href="https://react-spring.dev/" target="_blank" rel="noreferrer">React Sptring</a> и <a href="https://use-gesture.netlify.app/docs/gestures/" target="_blank" rel="noreferrer">@use-gesture</a>.</p><p><strong>Drawer</strong> используется в двух местах: для показа списка уведомлений и для показа формы обратной связи, когда пользователь хочут оставить отзыв о статье.</p><p>Как и компонент <strong>Modal</strong>, <strong>Drawer</strong> сделан с помощью <strong>React.createPortal()</strong>, который позволяет рендерить элементы в другой части DOM, чтобы стили родительских компонентов (oveflow: hidden) и прочее не влияло на их отображение.</p><h3 id="drawer-в-уведомлениях" tabindex="-1">Drawer в уведомлениях <a class="header-anchor" href="#drawer-в-уведомлениях" aria-label="Permalink to &quot;Drawer в уведомлениях&quot;">​</a></h3><p><img src="'+o+'" alt="Import drawer-notifications screenshot"></p><h3 id="drawer-в-форме-обратнои-связи" tabindex="-1">Drawer в форме обратной связи <a class="header-anchor" href="#drawer-в-форме-обратнои-связи" aria-label="Permalink to &quot;Drawer в форме обратной связи&quot;">​</a></h3><p><img src="'+s+'" alt="Import drawer-feedback screenshot"></p>',9),c=[i];function d(p,l,_,h,m,g){return r(),a("div",null,c)}const u=e(n,[["render",d]]);export{w as __pageData,u as default};