import{_ as s,o as n,c as a,O as l}from"./chunks/framework.571309da.js";const p="/assets/forbidden-page.f3264977.png",o="/assets/notfound-page.5490229d.png",d=JSON.parse('{"title":"Роутинг","description":"","frontmatter":{},"headers":[],"relativePath":"common/routing/index.md","filePath":"common/routing/index.md"}'),e={name:"common/routing/index.md"},t=l(`<h1 id="роутинг" tabindex="-1">Роутинг <a class="header-anchor" href="#роутинг" aria-label="Permalink to &quot;Роутинг&quot;">​</a></h1><p>Объект роутов расположен в <strong>src/app/providers/router/config</strong>.</p><p>Пример энтри объекта:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[AppRoutes</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ADMIN_PANEL]: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> RoutePath</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">admin_panel</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">element</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">AdminPanelPage</span><span style="color:#89DDFF;"> /&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">authOnly</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">roles</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [UserRole</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">MANAGER</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> UserRole</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">ADMIN]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Проверка прав пользователя производится с помощью компонента <strong>RequireAuth</strong>, который находится тут же, но в папке <strong>ui</strong>. Компонент проверяет авторизован ли пользователь, и, если авторизован, имеет ли он требуемые для доступа к определенной странице роли.</p><p>Код компонента:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> RequireAuth </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RequireAuthProps</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">children</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">roles</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isAuth</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useSelector</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">getUserAuthData</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">userRoles</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useSelector</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">getUserRoles</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">hasRequiredRoles</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useMemo</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">roles</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">userRoles</span><span style="color:#89DDFF;">?.</span><span style="color:#82AAFF;">some</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">role</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">roles</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">includes</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">role</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">roles</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">userRoles</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">location</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useLocation</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">isAuth</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Navigate</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">RoutePath</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">main</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">state</span><span style="color:#89DDFF;">={{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">from</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> location </span><span style="color:#89DDFF;">}} </span><span style="color:#C792EA;">replace</span><span style="color:#89DDFF;"> /&gt;;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">hasRequiredRoles</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Navigate</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">RoutePath</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">forbidden</span><span style="color:#89DDFF;">} </span><span style="color:#C792EA;">state</span><span style="color:#89DDFF;">={{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">from</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> location </span><span style="color:#89DDFF;">}} </span><span style="color:#C792EA;">replace</span><span style="color:#89DDFF;"> /&gt;;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">children</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>Пример использования:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Route</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">key</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">path</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">element</span><span style="color:#89DDFF;">={</span></span>
<span class="line"><span style="color:#A6ACCD;">    route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">authOnly </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> (</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">RequireAuth</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">roles</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">roles</span><span style="color:#89DDFF;">}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">element</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">RequireAuth</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ) </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> element</span><span style="color:#89DDFF;">}  </span></span>
<span class="line"><span style="color:#89DDFF;">  /&gt;</span></span></code></pre></div><p>При попытке зайти на страницу, которая не требует обязательной авторизации, но требует определенных ролей, которых нет у пользователя, пользователь будет перенаправлен на <strong>ForbiddenPage</strong>. <img src="`+p+'" alt="Import forbidden-page screenshot"></p><p>При попытке посетить несуществующий роут, пользователь будет перенаправлен на <strong>NotFoundPage</strong>. <img src="'+o+'" alt="Import notfound-page screenshot"></p>',11),c=[t];function r(F,y,D,A,C,i){return n(),a("div",null,c)}const g=s(e,[["render",r]]);export{d as __pageData,g as default};