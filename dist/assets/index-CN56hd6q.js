(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const gi={USERS:"jsr_users_v1",CURRENT_USER:"jsr_current_user_v1",SETTINGS:"jsr_settings_v1"},og=[{id:"USR-001",fullName:"Anderson González",dni:"72819034",phone:"+51 987 654 321",email:"andersongonzalez@multiserviciosjsr.com",role:"ADMIN",username:"admin",password:"admin123",status:"ACTIVE",createdAt:new Date().toISOString(),avatarUrl:"https://api.dicebear.com/7.x/identicon/svg?seed=Anderson"},{id:"USR-002",fullName:"Ing. Alexis Ruiz",dni:"45901238",phone:"+51 912 345 678",email:"alexis.ruiz@multiserviciosjsr.com",role:"TECNICO",username:"tecnico",password:"tecnico123",status:"ACTIVE",createdAt:new Date().toISOString(),avatarUrl:"https://api.dicebear.com/7.x/identicon/svg?seed=Alexis"}],Qp={companyName:"Multiservicios JSR",ruc:"20601234567",phone:"+51 987 654 321",address:"Av. Central 450, Lima, Perú",email:"contacto@multiserviciosjsr.com",baseDiagnosticFee:80,defaultWarrantyDays:90,preventiveMaintenanceMonths:6,themeMode:"cyber-dark"};function Fc(){localStorage.getItem(gi.USERS)||localStorage.setItem(gi.USERS,JSON.stringify(og)),localStorage.getItem(gi.SETTINGS)||localStorage.setItem(gi.SETTINGS,JSON.stringify(Qp))}function el(){return Fc(),JSON.parse(localStorage.getItem(gi.USERS))||[]}function tl(){return Fc(),JSON.parse(localStorage.getItem(gi.CURRENT_USER))||null}function Jd(n,e){const i=el().find(r=>r.username.toLowerCase()===n.trim().toLowerCase()&&r.password===e);return i?i.status==="INACTIVE"?{success:!1,message:"Su cuenta se encuentra desactivada por el Administrador."}:(localStorage.setItem(gi.CURRENT_USER,JSON.stringify(i)),{success:!0,user:i}):{success:!1,message:"Usuario o contraseña incorrectos."}}function em(n){const e=el();if(e.find(r=>r.username.toLowerCase()===n.username.trim().toLowerCase()))return{success:!1,message:`El nombre de usuario "${n.username}" ya está registrado.`};const i={id:`USR-${Date.now().toString().slice(-4)}`,fullName:n.fullName||"",dni:n.dni||"",phone:n.phone||"",email:n.email||"",role:n.role||"TECNICO",username:n.username.trim(),password:n.password,status:"ACTIVE",createdAt:new Date().toISOString(),avatarUrl:`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(n.username)}`};return e.push(i),localStorage.setItem(gi.USERS,JSON.stringify(e)),{success:!0,user:i}}function lg(){localStorage.removeItem(gi.CURRENT_USER)}function cg(n){const e=el(),t=e.findIndex(r=>r.id===n.id);t>=0?e[t]={...e[t],...n}:e.push(n),localStorage.setItem(gi.USERS,JSON.stringify(e));const i=tl();return i&&i.id===n.id&&localStorage.setItem(gi.CURRENT_USER,JSON.stringify(e[t>=0?t:e.length-1])),n}function ug(n){let e=el();e=e.filter(t=>t.id!==n),localStorage.setItem(gi.USERS,JSON.stringify(e))}function tm(){return Fc(),JSON.parse(localStorage.getItem(gi.SETTINGS))||Qp}function Kd(n){const t={...tm(),...n};return localStorage.setItem(gi.SETTINGS,JSON.stringify(t)),t}function hg(n,e){const t=tl();if(!t)return document.createElement("div");const i=document.createElement("div");i.className="profile-dropdown-wrapper",i.style.cssText="position: relative; display: inline-block;",i.innerHTML=`
    <button type="button" id="btn-avatar-menu" style="
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-glass);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      color: white;
      transition: all var(--transition-fast);
    ">
      <img src="${t.avatarUrl}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-cyan);">
      <span style="font-family: var(--font-heading); font-weight: 600; font-size: 0.85rem; max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${t.username}
      </span>
      <span style="font-size: 0.7rem; color: var(--text-muted);">▼</span>
    </button>

    <!-- Dropdown Menu Box (Inspired by the GitHub-style requested design) -->
    <div id="avatar-dropdown-menu" style="
      display: none;
      position: absolute;
      top: 120%;
      right: 0;
      width: 240px;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-glass-glow);
      border-radius: var(--radius-md);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), var(--shadow-glow);
      padding: 0.6rem 0;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    ">
      <!-- User Info Header -->
      <div style="padding: 0.6rem 1rem 0.8rem 1rem; border-bottom: 1px solid var(--border-glass);">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <img src="${t.avatarUrl}" style="width: 34px; height: 34px; border-radius: 50%; background: var(--accent-cyan);">
          <div style="overflow: hidden;">
            <strong style="color: white; font-size: 0.875rem; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${t.fullName}
            </strong>
            <span class="badge ${t.role==="ADMIN"?"badge-cyan":"badge-green"}" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">
              ${t.role}
            </span>
          </div>
        </div>
      </div>

      <!-- Menu Links -->
      <div style="display: flex; flex-direction: column; padding: 0.35rem 0;">
        <button class="dropdown-item-btn" id="menu-btn-profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Mi Perfil
        </button>

        <button class="dropdown-item-btn" id="menu-btn-users">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Registro de Usuarios
        </button>

        <button class="dropdown-item-btn" id="menu-btn-settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Configuración
        </button>
      </div>

      <div style="border-top: 1px solid var(--border-glass); padding-top: 0.35rem;">
        <button class="dropdown-item-btn" id="menu-btn-logout" style="color: #ff3366;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  `;const r=document.createElement("style");r.textContent=`
    .dropdown-item-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      color: var(--text-main);
      padding: 0.55rem 1rem;
      font-family: var(--font-heading);
      font-size: 0.85rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .dropdown-item-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--accent-cyan);
    }
  `,i.appendChild(r);const s=i.querySelector("#btn-avatar-menu"),a=i.querySelector("#avatar-dropdown-menu");return s.onclick=o=>{o.stopPropagation();const l=a.style.display==="block";a.style.display=l?"none":"block"},document.addEventListener("click",()=>{a&&(a.style.display="none")}),i.querySelector("#menu-btn-users").onclick=()=>{n&&n("users")},i.querySelector("#menu-btn-settings").onclick=()=>{n&&n("settings")},i.querySelector("#menu-btn-profile").onclick=()=>{n&&n("users")},i.querySelector("#menu-btn-logout").onclick=()=>{lg(),e&&e()},i}const Vi={ORDERS:"jsr_service_orders_v1",INVENTORY:"jsr_inventory_v1",NOTIFICATIONS:"jsr_notifications_v1"},dg=[{id:1,type:"stock",title:"Repuesto SSD bajo stock",message:'Pantalla LED 15.6" con 3 unidades en almacén.',timeAgo:"Hace 20 min",isRead:!1,icon:"📙"},{id:2,type:"order",title:"Nueva Orden JSR-1024 asignada",message:"Laptop Asus TUF A15 asignada a Ing. Alexis Ruiz.",timeAgo:"Hace 13 min",isRead:!1,icon:"🔴"},{id:3,type:"status",title:"Orden JSR-2058 en Reparación",message:"Lenovo ThinkPad E14 en taller de cambio de Fan.",timeAgo:"Hace 10 min",isRead:!1,icon:"🟠"},{id:4,type:"ready",title:"Orden JSR-3099 Lista para Recojo",message:"Dell XPS 13 finalizada para entrega a Juan Pérez.",timeAgo:"Hace 5 min",isRead:!1,icon:"🟢"}],fg=[{id:"PART-001",name:"Memoria RAM Kingston DDR4 16GB 3200MHz",category:"RAM",stock:8,cost:120,price:180,code:"RAM-DDR4-16"},{id:"PART-002",name:"Disco SSD M.2 NVMe 1TB Kingston NV2",category:"Almacenamiento",stock:12,cost:190,price:280,code:"SSD-NVME-1TB"},{id:"PART-003",name:"Fan / Cooler Térmico Asus TUF/ROG",category:"Refrigeración",stock:5,cost:45,price:95,code:"COOL-ASUS-01"},{id:"PART-004",name:"Batería Interna Dell 56Wh 3 celdas",category:"Energía",stock:4,cost:140,price:230,code:"BAT-DELL-56"},{id:"PART-005",name:"Pasta Térmica Arctic MX-4 High Performance",category:"Mantenimiento",stock:18,cost:20,price:45,code:"PASTE-MX4"},{id:"PART-006",name:'Pantalla LED 15.6" FHD 144Hz 30 Pines',category:"Pantallas",stock:3,cost:280,price:420,code:"SCR-156-144"},{id:"PART-007",name:"Teclado Retroiluminado Lenovo Legion RGB",category:"Teclados",stock:6,cost:85,price:150,code:"KBD-LENOVO-RGB"}],pg=[{id:"JSR-1024",customerName:"Carlos Mendoza",customerPhone:"+51 987 654 321",customerDni:"72819034",deviceModel:"Laptop Asus TUF Gaming A15",deviceSerial:"SN-ASUS-99182",status:"DIAGNOSTICO",technician:"Ing. Alexis Ruiz",createdAt:new Date(Date.now()-2*24*60*60*1e3).toISOString(),faults3D:[{id:1,part:"Pantalla / Tapa Superior",note:"Raya profunda en tapa y parpadeo de imagen",x:-.4,y:.8,z:-.2},{id:2,part:"Puerto USB Lateral",note:"Pin sulfatado, no reconoce dispositivos",x:1.1,y:-.1,z:.3}],usedParts:[],estimatedCost:220,warrantyDays:60},{id:"JSR-2058",customerName:"María Torres",customerPhone:"+51 912 345 678",customerDni:"45901238",deviceModel:"Lenovo ThinkPad E14 Gen 2",deviceSerial:"SN-LNV-44019",status:"REPARACION",technician:"Téc. Fernando Silva",createdAt:new Date(Date.now()-1*24*60*60*1e3).toISOString(),faults3D:[{id:1,part:"Módulo de Ventilador",note:"Zumbido metálico y alta temperatura (92°C)",x:.2,y:.1,z:.1}],usedParts:[{partId:"PART-003",name:"Fan / Cooler Térmico Asus TUF/ROG",qty:1,price:95},{partId:"PART-005",name:"Pasta Térmica Arctic MX-4 High Performance",qty:1,price:45}],estimatedCost:140,warrantyDays:90},{id:"JSR-3099",customerName:"Juan Pérez",customerPhone:"+51 955 112 233",customerDni:"10923847",deviceModel:"Dell XPS 13 9310",deviceSerial:"SN-DELL-88210",status:"LISTO",technician:"Ing. Alexis Ruiz",createdAt:new Date(Date.now()-5*24*60*60*1e3).toISOString(),deliveredAt:new Date(Date.now()-1*24*60*60*1e3).toISOString(),faults3D:[{id:1,part:"Teclado y Batería",note:"Batería inflada y tecla Espacio trabada",x:0,y:-.1,z:.2}],usedParts:[{partId:"PART-004",name:"Batería Interna Dell 56Wh 3 celdas",qty:1,price:230}],estimatedCost:280,warrantyDays:90,nextMaintenanceDate:new Date(Date.now()+180*24*60*60*1e3).toISOString()}];function Uc(){localStorage.getItem(Vi.INVENTORY)||localStorage.setItem(Vi.INVENTORY,JSON.stringify(fg)),localStorage.getItem(Vi.ORDERS)||localStorage.setItem(Vi.ORDERS,JSON.stringify(pg))}function Hr(){return Uc(),JSON.parse(localStorage.getItem(Vi.ORDERS))||[]}function Zd(n){return Hr().find(t=>t.id.toUpperCase()===n.toUpperCase())||null}function nm(n){const e=Hr(),t=e.findIndex(i=>i.id===n.id);return t>=0?e[t]={...e[t],...n}:e.unshift(n),localStorage.setItem(Vi.ORDERS,JSON.stringify(e)),n}function mg(n,e){const t=Hr(),i=t.find(r=>r.id===n);if(i){if(i.status=e,e==="LISTO"&&!i.deliveredAt){i.deliveredAt=new Date().toISOString();const r=new Date;r.setMonth(r.getMonth()+6),i.nextMaintenanceDate=r.toISOString()}localStorage.setItem(Vi.ORDERS,JSON.stringify(t))}return i}function Ys(){return Uc(),JSON.parse(localStorage.getItem(Vi.INVENTORY))||[]}function gg(n,e=1){const t=Ys(),i=t.find(r=>r.id===n);return i&&i.stock>=e?(i.stock-=e,localStorage.setItem(Vi.INVENTORY,JSON.stringify(t)),{success:!0,updatedItem:i}):{success:!1,message:"Stock insuficiente"}}function Qd(n){const e=Ys(),t=e.findIndex(i=>i.id===n.id);return t>=0?e[t]=n:e.push(n),localStorage.setItem(Vi.INVENTORY,JSON.stringify(e)),n}function Jh(){return Uc(),JSON.parse(localStorage.getItem(Vi.NOTIFICATIONS))||dg}function vg(){const n=Jh();return n.forEach(e=>e.isRead=!0),localStorage.setItem(Vi.NOTIFICATIONS,JSON.stringify(n)),n}function _g(){const n=document.createElement("div");n.className="notifications-dropdown-wrapper",n.style.cssText="position: relative; display: inline-block; margin-right: 0.5rem;";function e(){const t=Jh(),i=t.filter(o=>!o.isRead).length;n.innerHTML=`
      <button type="button" id="btn-bell-toggle" style="
        position: relative;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border-glass);
        width: 38px;
        height: 38px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        transition: all var(--transition-fast);
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        ${i>0?`
          <span style="
            position: absolute;
            top: -2px;
            right: -2px;
            background: var(--accent-red);
            color: white;
            font-size: 0.65rem;
            font-weight: 700;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 8px var(--accent-red-glow);
            animation: pulseRed 2s infinite;
          ">${i}</span>
        `:""}
      </button>

      <!-- Dropdown Card -->
      <div id="notifications-panel" style="
        display: none;
        position: absolute;
        top: 120%;
        right: 0;
        width: 310px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--border-glass-glow);
        border-radius: var(--radius-md);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), var(--shadow-glow);
        padding: 0.85rem;
        z-index: 1000;
        animation: fadeIn 0.2s ease-out;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem; margin-bottom: 0.65rem;">
          <strong style="color: white; font-family: var(--font-heading); font-size: 0.9rem;">🔔 Notificaciones Recientes</strong>
          ${i>0?`
            <button type="button" id="btn-mark-read" style="background: none; border: none; color: var(--accent-cyan); font-size: 0.725rem; cursor: pointer; font-weight: 600;">
              Marcar leídas
            </button>
          `:""}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.55rem; max-height: 280px; overflow-y: auto;">
          ${t.length===0?`
            <p style="color: var(--text-dim); font-size: 0.8rem; text-align: center; padding: 1rem 0;">No hay notificaciones recientes.</p>
          `:t.map(o=>`
            <div style="
              display: flex;
              gap: 0.6rem;
              padding: 0.55rem 0.65rem;
              background: ${o.isRead?"rgba(255, 255, 255, 0.02)":"rgba(0, 229, 255, 0.06)"};
              border-left: 3px solid ${o.type==="stock"?"#ff9900":o.type==="ready"?"#00ff9d":"#00e5ff"};
              border-radius: var(--radius-sm);
            ">
              <span style="font-size: 1.1rem; line-height: 1;">${o.icon||"🔔"}</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: white; font-size: 0.8rem;">${o.title}</strong>
                  <span style="font-size: 0.65rem; color: var(--text-muted);">${o.timeAgo}</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.15rem; line-height: 1.25;">${o.message}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;const r=n.querySelector("#btn-bell-toggle"),s=n.querySelector("#notifications-panel");r.onclick=o=>{o.stopPropagation();const l=s.style.display==="block";s.style.display=l?"none":"block"},document.addEventListener("click",()=>{s&&(s.style.display="none")});const a=n.querySelector("#btn-mark-read");a&&(a.onclick=o=>{o.stopPropagation(),vg(),e()})}return e(),n}function yg(n="dashboard",e,t){const i=document.createElement("header");i.className="navbar",i.innerHTML=`
    <div class="navbar-container">
      <a href="#" class="brand-logo" id="brand-home">
        <div class="brand-icon">3D</div>
        <div class="brand-title">Multiservicios <span>JSR</span></div>
      </a>

      <nav>
        <ul class="nav-links">
          <li>
            <a href="#dashboard" class="nav-link ${n==="dashboard"?"active":""}" data-module="dashboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Inicio
            </a>
          </li>
          <li>
            <a href="#reception" class="nav-link ${n==="reception"?"active":""}" data-module="reception">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
              Recepción 3D
            </a>
          </li>
          <li>
            <a href="#workshop" class="nav-link ${n==="workshop"?"active":""}" data-module="workshop">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              Taller & Despiece
            </a>
          </li>
          <li>
            <a href="#tracking" class="nav-link ${n==="tracking"?"active":""}" data-module="tracking">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              Rastreo 3D
            </a>
          </li>
          <li>
            <a href="#inventory" class="nav-link ${n==="inventory"?"active":""}" data-module="inventory">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Inventario & Órdenes
            </a>
          </li>
          <li>
            <a href="#reports" class="nav-link ${n==="reports"?"active":""}" data-module="reports">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              Reportes
            </a>
          </li>
          <li>
            <a href="#warranties" class="nav-link ${n==="warranties"?"active":""}" data-module="warranties">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Garantías
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right Slot for Notifications 🔔 and User Profile Dropdown -->
      <div id="navbar-profile-slot" style="display: flex; align-items: center;"></div>
    </div>
  `,i.querySelectorAll(".nav-link").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault();const l=a.getAttribute("data-module");e&&e(l)})});const r=i.querySelector("#brand-home");r&&r.addEventListener("click",a=>{a.preventDefault(),e&&e("dashboard")});const s=i.querySelector("#navbar-profile-slot");if(s){const a=_g(),o=hg(e,t);s.appendChild(a),s.appendChild(o)}return i}function bg(n,e){let t=!1;function i(){n.innerHTML=`
      <div class="login-page-container" style="
        min-height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(rgba(11, 15, 25, 0.4), rgba(6, 9, 17, 0.7)),
                    url('https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
        padding: 1.5rem;
      ">
        <div class="modal-card" style="
          width: 100%;
          max-width: 480px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 255, 0.2);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
        ">
          <!-- Logo Header -->
          <div style="text-align: center; margin-bottom: 1.75rem;">
            <div style="
              width: 52px;
              height: 52px;
              background: linear-gradient(135deg, var(--accent-cyan), #00a8ff);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-heading);
              font-size: 1.5rem;
              font-weight: 800;
              color: #040914;
              margin: 0 auto 0.75rem auto;
              box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
            ">3D</div>
            <h2 style="color: white; font-size: 1.6rem;">Multiservicios <span style="color: var(--accent-cyan);">JSR</span></h2>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem;">
              Plataforma de Inspección 3D y Control de Taller
            </p>
          </div>

          <!-- Auth Mode Tabs -->
          <div style="
            display: flex;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border-glass);
            border-radius: var(--radius-sm);
            padding: 0.25rem;
            margin-bottom: 1.5rem;
          ">
            <button type="button" class="btn btn-sm ${t?"btn-secondary":"btn-primary"}" id="tab-mode-login" style="flex: 1; border-radius: 6px;">
              🔑 Iniciar Sesión
            </button>
            <button type="button" class="btn btn-sm ${t?"btn-primary":"btn-secondary"}" id="tab-mode-register" style="flex: 1; border-radius: 6px;">
              📝 Registro de Datos
            </button>
          </div>

          ${t?`
            <!-- REGISTER FORM (DATOS PERSONALES) -->
            <form id="auth-register-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Nombres y Apellidos Completos *</label>
                <input type="text" id="reg-fullname" class="form-control" placeholder="Ej. Anderson González" required>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">DNI / RUC *</label>
                  <input type="text" id="reg-dni" class="form-control" placeholder="72819034" required>
                </div>
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">Teléfono / WhatsApp *</label>
                  <input type="text" id="reg-phone" class="form-control" placeholder="+51 987 654 321" required>
                </div>
              </div>

              <div class="form-group" style="margin: 0;">
                <label class="form-label">Correo Electrónico *</label>
                <input type="email" id="reg-email" class="form-control" placeholder="correo@ejemplo.com" required>
              </div>

              <div class="form-group" style="margin: 0;">
                <label class="form-label">Rol de Usuario</label>
                <select id="reg-role" class="form-control">
                  <option value="TECNICO">Técnico de Taller</option>
                  <option value="ADMIN">Administrador General</option>
                  <option value="CLIENTE">Cliente Registrado</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">Nombre de Usuario *</label>
                  <input type="text" id="reg-username" class="form-control" placeholder="ej. anderson99" required>
                </div>
                <div class="form-group" style="margin: 0;">
                  <label class="form-label">Contraseña *</label>
                  <input type="password" id="reg-password" class="form-control" placeholder="******" required>
                </div>
              </div>

              <button type="submit" class="btn btn-success" style="padding: 0.85rem; margin-top: 0.5rem; font-size: 0.95rem;">
                📝 Crear y Registrar Cuenta
              </button>
            </form>
          `:`
            <!-- LOGIN FORM -->
            <form id="auth-login-form" style="display: flex; flex-direction: column; gap: 1.1rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Usuario</label>
                <input type="text" id="login-username" class="form-control" placeholder="Ingrese su usuario" value="admin" required style="background: rgba(255,255,255,0.9); color: #1e293b; font-weight: 600;">
              </div>

              <div class="form-group" style="margin: 0;">
                <label class="form-label">Contraseña</label>
                <input type="password" id="login-password" class="form-control" placeholder="Ingrese su contraseña" value="admin123" required style="background: rgba(255,255,255,0.9); color: #1e293b; font-weight: 600;">
              </div>

              <button type="submit" class="btn" style="
                background: linear-gradient(135deg, #0088ff, #0066cc);
                color: white;
                font-size: 1rem;
                padding: 0.85rem;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 136, 255, 0.4);
                margin-top: 0.5rem;
              ">
                Iniciar Sesión
              </button>

              <div style="text-align: center; margin-top: 0.5rem;">
                <p style="color: var(--text-dim); font-size: 0.8rem;">
                  Cuentas de prueba: 
                  <a href="#" class="demo-login-fill" data-u="admin" data-p="admin123" style="color: var(--accent-cyan);">admin</a> | 
                  <a href="#" class="demo-login-fill" data-u="tecnico" data-p="tecnico123" style="color: var(--accent-green);">tecnico</a>
                </p>
              </div>
            </form>
          `}
        </div>
      </div>
    `,n.querySelector("#tab-mode-login").onclick=()=>{t=!1,i()},n.querySelector("#tab-mode-register").onclick=()=>{t=!0,i()};const r=n.querySelector("#auth-login-form");r&&(r.onsubmit=a=>{a.preventDefault();const o=n.querySelector("#login-username").value,l=n.querySelector("#login-password").value,u=Jd(o,l);u.success?e&&e(u.user):alert(u.message)});const s=n.querySelector("#auth-register-form");s&&(s.onsubmit=a=>{a.preventDefault();const o={fullName:n.querySelector("#reg-fullname").value.trim(),dni:n.querySelector("#reg-dni").value.trim(),phone:n.querySelector("#reg-phone").value.trim(),email:n.querySelector("#reg-email").value.trim(),role:n.querySelector("#reg-role").value,username:n.querySelector("#reg-username").value.trim(),password:n.querySelector("#reg-password").value},l=em(o);l.success?(alert(`¡Cuenta registrada exitosamente!
Bienvenido, ${l.user.fullName}`),Jd(o.username,o.password),e&&e(l.user)):alert(l.message)}),n.querySelectorAll(".demo-login-fill").forEach(a=>{a.onclick=o=>{o.preventDefault();const l=a.getAttribute("data-u"),u=a.getAttribute("data-p");n.querySelector("#login-username").value=l,n.querySelector("#login-password").value=u}})}i()}function xg(){return`JSR-${Math.floor(1e3+Math.random()*9e3)}`}function yr(n){return`S/ ${(parseFloat(n)||0).toFixed(2)}`}function Kh(n){if(!n)return"-";const e=new Date(n);return isNaN(e.getTime())?n:new Intl.DateTimeFormat("es-PE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(e)}function ef(n){if(!n)return 0;const i=new Date(n)-new Date;return Math.ceil(i/(1e3*60*60*24))}function tf(n,e){const t=Hr();Ys();const i=tl(),r=Jh(),s=t.length||30,a=t.filter(_=>_.status==="LISTO").length,o=s>0&&Math.round(a/s*100)||92,l=t.reduce((_,m)=>_+(m.estimatedCost||0),0),u={REPARACION:t.filter(_=>_.status==="REPARACION").length||4,LISTO:t.filter(_=>_.status==="LISTO").length||3,DIAGNOSTICO:t.filter(_=>_.status==="DIAGNOSTICO").length||2,INICIAR:1},h=u.REPARACION+u.LISTO+u.DIAGNOSTICO+u.INICIAR,p=Math.round(u.REPARACION/h*100),g=Math.round(u.LISTO/h*100),d=Math.round(u.DIAGNOSTICO/h*100),x=100-(p+g+d);n.innerHTML=`
    <div class="dashboard-module">
      <!-- Top Title Bar -->
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 1.85rem; color: white; margin-bottom: 0.2rem;">
            Panel de Control - Multiservicios JSR TechFix 3D
          </h1>
          <p style="color: var(--text-muted); font-size: 0.925rem;">
            Resumen en tiempo real de operaciones, estado del taller e indicadores de rendimiento.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(17, 24, 39, 0.7); border: 1px solid var(--border-glass); padding: 0.4rem 0.85rem; border-radius: var(--radius-full);">
          <img src="${i?i.avatarUrl:""}" style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-cyan);">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Técnico: <strong style="color: white;">${i?i.fullName:"Ing. Alexis Ruiz"}</strong></span>
        </div>
      </div>

      <!-- KPI Summary Cards Row (Matching requested design) -->
      <div class="grid-3" style="margin-bottom: 1.75rem;">
        <!-- KPI Card 1: Órdenes Totales -->
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.35rem;">
          <div>
            <span style="color: var(--text-muted); font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Órdenes Totales Mes</span>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
              <h2 style="font-size: 2.2rem; color: white;">${s}</h2>
              <span style="color: var(--accent-green); font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 0.2rem;">
                ↗️ +12%
              </span>
            </div>
          </div>
          <div style="width: 48px; height: 48px; background: rgba(0, 229, 255, 0.12); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; justify-content: center; color: var(--accent-cyan); font-size: 1.4rem;">
            📈
          </div>
        </div>

        <!-- KPI Card 2: Reparaciones Exitosas -->
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.35rem;">
          <div>
            <span style="color: var(--text-muted); font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Reparaciones Exitosas</span>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
              <h2 style="font-size: 2.2rem; color: white;">${o}%</h2>
            </div>
          </div>
          <div style="width: 48px; height: 48px; background: rgba(0, 255, 157, 0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-green); font-size: 1.4rem;">
            ✅
          </div>
        </div>

        <!-- KPI Card 3: Ingresos Calculados de Hoy -->
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.35rem;">
          <div>
            <span style="color: var(--text-muted); font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Ingresos de Hoy</span>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
              <h2 style="font-size: 2.2rem; color: var(--accent-green); font-family: var(--font-heading);">${yr(l)}</h2>
            </div>
          </div>
          <div style="width: 48px; height: 48px; background: rgba(255, 153, 0, 0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-amber); font-size: 1.4rem;">
            💵
          </div>
        </div>
      </div>

      <!-- Middle Grid: Donut Chart & Notifications Sidebar (Matching requested design) -->
      <div class="grid-2-1" style="margin-bottom: 1.75rem;">
        <!-- Left: Donut Chart Box -->
        <div class="glass-panel" style="display: flex; flex-direction: column;">
          <h3 style="color: white; font-size: 1.15rem; margin-bottom: 1.25rem;">
            📊 Estado General de Órdenes
          </h3>

          <div style="display: flex; align-items: center; justify-content: space-around; flex: 1; flex-wrap: wrap; gap: 1.5rem;">
            <!-- SVG Donut Chart Vector -->
            <div style="position: relative; width: 180px; height: 180px;">
              <svg width="180" height="180" viewBox="0 0 42 42" style="transform: rotate(-90deg);">
                <!-- Track circle -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="5.5"></circle>
                <!-- Segment 1: En Reparación (Amber 40%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ff9900" stroke-width="5.5" stroke-dasharray="${p} ${100-p}" stroke-dashoffset="0"></circle>
                <!-- Segment 2: Listo para Recoger (Green 30%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#00ff9d" stroke-width="5.5" stroke-dasharray="${g} ${100-g}" stroke-dashoffset="${100-p}"></circle>
                <!-- Segment 3: En Diagnostico (Red 20%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ff3366" stroke-width="5.5" stroke-dasharray="${d} ${100-d}" stroke-dashoffset="${100-(p+g)}"></circle>
                <!-- Segment 4: Por Iniciar (Cyan 10%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#00e5ff" stroke-width="5.5" stroke-dasharray="${x} ${100-x}" stroke-dashoffset="${100-(p+g+d)}"></circle>
              </svg>
              <!-- Center Total Label -->
              <div style="position: absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; pointer-events:none;">
                <span style="font-size: 1.5rem; font-weight: 800; color: white;">100%</span>
                <span style="font-size: 0.7rem; color: var(--text-muted);">TALLER</span>
              </div>
            </div>

            <!-- Legend List -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #ff9900; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">En Reparación</span>
                <strong style="color: #ff9900; font-size: 0.9rem; margin-left: auto;">${p}%</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #00ff9d; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">Listo para Recoger</span>
                <strong style="color: #00ff9d; font-size: 0.9rem; margin-left: auto;">${g}%</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #ff3366; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">En Diagnóstico</span>
                <strong style="color: #ff3366; font-size: 0.9rem; margin-left: auto;">${d}%</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #00e5ff; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">Por Iniciar</span>
                <strong style="color: #00e5ff; font-size: 0.9rem; margin-left: auto;">${x}%</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Notifications Panel (Matching requested sidebar design) -->
        <div class="glass-panel" style="display: flex; flex-direction: column;">
          <h3 style="color: white; font-size: 1.15rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🔔 Notificaciones Recientes
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; flex: 1;">
            ${r.slice(0,4).map(_=>`
              <div style="
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid var(--border-glass);
                padding: 0.75rem;
                border-radius: var(--radius-sm);
              ">
                <div style="
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background: ${_.type==="stock"?"rgba(255, 153, 0, 0.15)":_.type==="ready"?"rgba(0, 255, 157, 0.15)":"rgba(0, 229, 255, 0.15)"};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.95rem;
                ">
                  ${_.icon||"🔔"}
                </div>
                <div style="flex: 1;">
                  <strong style="color: white; font-size: 0.825rem; display: block;">${_.title}</strong>
                  <span style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 0.1rem;">${_.timeAgo}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Bottom Table: Recent Orders Activity (Matching requested table design) -->
      <div class="glass-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="color: white; font-size: 1.15rem;">
            📋 Actividad Reciente de Órdenes
          </h3>
          <button class="btn btn-secondary btn-sm" id="btn-goto-inventory">
            Ver Todas las Órdenes ➔
          </button>
        </div>

        <div style="overflow-x: auto;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Nombre Cliente</th>
                <th>Equipo Registrado</th>
                <th>Estado de Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${t.map(_=>`
                <tr>
                  <td><strong style="color: white; font-size: 0.9rem;">${_.customerName}</strong></td>
                  <td><span style="color: var(--text-main); font-size: 0.875rem;">${_.deviceModel}</span></td>
                  <td>
                    <span class="badge ${_.status==="DIAGNOSTICO"?"badge-red":_.status==="REPARACION"?"badge-amber":"badge-green"}" style="font-size: 0.8rem;">
                      ${_.status==="DIAGNOSTICO"?"En Diagnóstico":_.status==="REPARACION"?"En Reparación":"Listo para Recoger"}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm view-details-btn" data-id="${_.id}">
                      Ver Detalles 3D
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;const b=n.querySelector("#btn-goto-inventory");b&&(b.onclick=()=>{e&&e("inventory")}),n.querySelectorAll(".view-details-btn").forEach(_=>{_.onclick=()=>{const m=_.getAttribute("data-id");window.location.hash=`#tracking?ticket=${m}`,e&&e("tracking")}})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zh="160",Sg=0,nf=1,wg=2,im=1,rm=2,zr=3,_s=0,vi=1,vr=2,ms=0,Wa=1,rf=2,sf=3,af=4,Mg=5,Gs=100,Ag=101,Eg=102,of=103,lf=104,Tg=200,Lg=201,Cg=202,Rg=203,xh=204,Sh=205,Pg=206,Ng=207,Ig=208,Dg=209,Fg=210,Ug=211,Og=212,kg=213,Bg=214,zg=0,Gg=1,Hg=2,Mc=3,Vg=4,qg=5,Wg=6,jg=7,sm=0,Xg=1,Yg=2,gs=0,$g=1,Jg=2,Kg=3,Zg=4,Qg=5,e1=6,am=300,Ka=301,Za=302,wh=303,Mh=304,Oc=306,Ah=1e3,ir=1001,Eh=1002,ai=1003,cf=1004,Ru=1005,Gi=1006,t1=1007,$o=1008,vs=1009,n1=1010,i1=1011,Qh=1012,om=1013,hs=1014,ds=1015,Jo=1016,lm=1017,cm=1018,qs=1020,r1=1021,rr=1023,s1=1024,a1=1025,Ws=1026,Qa=1027,o1=1028,um=1029,l1=1030,hm=1031,dm=1033,Pu=33776,Nu=33777,Iu=33778,Du=33779,uf=35840,hf=35841,df=35842,ff=35843,fm=36196,pf=37492,mf=37496,gf=37808,vf=37809,_f=37810,yf=37811,bf=37812,xf=37813,Sf=37814,wf=37815,Mf=37816,Af=37817,Ef=37818,Tf=37819,Lf=37820,Cf=37821,Fu=36492,Rf=36494,Pf=36495,c1=36283,Nf=36284,If=36285,Df=36286,pm=3e3,js=3001,u1=3200,h1=3201,mm=0,d1=1,Hi="",Hn="srgb",Vr="srgb-linear",ed="display-p3",kc="display-p3-linear",Ac="linear",on="srgb",Ec="rec709",Tc="p3",xa=7680,Ff=519,f1=512,p1=513,m1=514,gm=515,g1=516,v1=517,_1=518,y1=519,Uf=35044,Of="300 es",Th=1035,Gr=2e3,Lc=2001;class so{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kf=1234567;const qo=Math.PI/180,Ko=180/Math.PI;function ao(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xn[n&255]+Xn[n>>8&255]+Xn[n>>16&255]+Xn[n>>24&255]+"-"+Xn[e&255]+Xn[e>>8&255]+"-"+Xn[e>>16&15|64]+Xn[e>>24&255]+"-"+Xn[t&63|128]+Xn[t>>8&255]+"-"+Xn[t>>16&255]+Xn[t>>24&255]+Xn[i&255]+Xn[i>>8&255]+Xn[i>>16&255]+Xn[i>>24&255]).toLowerCase()}function oi(n,e,t){return Math.max(e,Math.min(t,n))}function td(n,e){return(n%e+e)%e}function b1(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function x1(n,e,t){return n!==e?(t-n)/(e-n):0}function Wo(n,e,t){return(1-t)*n+t*e}function S1(n,e,t,i){return Wo(n,e,1-Math.exp(-t*i))}function w1(n,e=1){return e-Math.abs(td(n,e*2)-e)}function M1(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function A1(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function E1(n,e){return n+Math.floor(Math.random()*(e-n+1))}function T1(n,e){return n+Math.random()*(e-n)}function L1(n){return n*(.5-Math.random())}function C1(n){n!==void 0&&(kf=n);let e=kf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function R1(n){return n*qo}function P1(n){return n*Ko}function Lh(n){return(n&n-1)===0&&n!==0}function N1(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Cc(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function I1(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),u=s((e+i)/2),h=a((e+i)/2),p=s((e-i)/2),g=a((e-i)/2),d=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*h,l*p,l*g,o*u);break;case"YZY":n.set(l*g,o*h,l*p,o*u);break;case"ZXZ":n.set(l*p,l*g,o*h,o*u);break;case"XZX":n.set(o*h,l*x,l*d,o*u);break;case"YXY":n.set(l*d,o*h,l*x,o*u);break;case"ZYZ":n.set(l*x,l*d,o*h,o*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ba(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ri(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const vm={DEG2RAD:qo,RAD2DEG:Ko,generateUUID:ao,clamp:oi,euclideanModulo:td,mapLinear:b1,inverseLerp:x1,lerp:Wo,damp:S1,pingpong:w1,smoothstep:M1,smootherstep:A1,randInt:E1,randFloat:T1,randFloatSpread:L1,seededRandom:C1,degToRad:R1,radToDeg:P1,isPowerOfTwo:Lh,ceilPowerOfTwo:N1,floorPowerOfTwo:Cc,setQuaternionFromProperEuler:I1,normalize:ri,denormalize:Ba};class kt{constructor(e=0,t=0){kt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(oi(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(e,t,i,r,s,a,o,l,u){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,u)}set(e,t,i,r,s,a,o,l,u){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],u=i[1],h=i[4],p=i[7],g=i[2],d=i[5],x=i[8],b=r[0],_=r[3],m=r[6],S=r[1],M=r[4],P=r[7],q=r[2],G=r[5],U=r[8];return s[0]=a*b+o*S+l*q,s[3]=a*_+o*M+l*G,s[6]=a*m+o*P+l*U,s[1]=u*b+h*S+p*q,s[4]=u*_+h*M+p*G,s[7]=u*m+h*P+p*U,s[2]=g*b+d*S+x*q,s[5]=g*_+d*M+x*G,s[8]=g*m+d*P+x*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],h=e[8];return t*a*h-t*o*u-i*s*h+i*o*l+r*s*u-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],h=e[8],p=h*a-o*u,g=o*l-h*s,d=u*s-a*l,x=t*p+i*g+r*d;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/x;return e[0]=p*b,e[1]=(r*u-h*i)*b,e[2]=(o*i-r*a)*b,e[3]=g*b,e[4]=(h*t-r*l)*b,e[5]=(r*s-o*t)*b,e[6]=d*b,e[7]=(i*l-u*t)*b,e[8]=(a*t-i*s)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*a+u*o)+a+e,-r*u,r*l,-r*(-u*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Uu.makeScale(e,t)),this}rotate(e){return this.premultiply(Uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uu=new Ft;function _m(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Rc(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function D1(){const n=Rc("canvas");return n.style.display="block",n}const Bf={};function jo(n){n in Bf||(Bf[n]=!0,console.warn(n))}const zf=new Ft().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Gf=new Ft().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Vl={[Vr]:{transfer:Ac,primaries:Ec,toReference:n=>n,fromReference:n=>n},[Hn]:{transfer:on,primaries:Ec,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[kc]:{transfer:Ac,primaries:Tc,toReference:n=>n.applyMatrix3(Gf),fromReference:n=>n.applyMatrix3(zf)},[ed]:{transfer:on,primaries:Tc,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Gf),fromReference:n=>n.applyMatrix3(zf).convertLinearToSRGB()}},F1=new Set([Vr,kc]),$t={enabled:!0,_workingColorSpace:Vr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!F1.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Vl[e].toReference,r=Vl[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Vl[n].primaries},getTransfer:function(n){return n===Hi?Ac:Vl[n].transfer}};function ja(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ou(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Sa;class ym{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Sa===void 0&&(Sa=Rc("canvas")),Sa.width=e.width,Sa.height=e.height;const i=Sa.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Sa}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Rc("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ja(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ja(t[i]/255)*255):t[i]=ja(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let U1=0;class bm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:U1++}),this.uuid=ao(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ku(r[a].image)):s.push(ku(r[a]))}else s=ku(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ku(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ym.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let O1=0;class Li extends so{constructor(e=Li.DEFAULT_IMAGE,t=Li.DEFAULT_MAPPING,i=ir,r=ir,s=Gi,a=$o,o=rr,l=vs,u=Li.DEFAULT_ANISOTROPY,h=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:O1++}),this.uuid=ao(),this.name="",this.source=new bm(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(jo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===js?Hn:Hi),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==am)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ah:e.x=e.x-Math.floor(e.x);break;case ir:e.x=e.x<0?0:1;break;case Eh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ah:e.y=e.y-Math.floor(e.y);break;case ir:e.y=e.y<0?0:1;break;case Eh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return jo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Hn?js:pm}set encoding(e){jo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===js?Hn:Hi}}Li.DEFAULT_IMAGE=null;Li.DEFAULT_MAPPING=am;Li.DEFAULT_ANISOTROPY=1;class un{constructor(e=0,t=0,i=0,r=1){un.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,u=l[0],h=l[4],p=l[8],g=l[1],d=l[5],x=l[9],b=l[2],_=l[6],m=l[10];if(Math.abs(h-g)<.01&&Math.abs(p-b)<.01&&Math.abs(x-_)<.01){if(Math.abs(h+g)<.1&&Math.abs(p+b)<.1&&Math.abs(x+_)<.1&&Math.abs(u+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(u+1)/2,P=(d+1)/2,q=(m+1)/2,G=(h+g)/4,U=(p+b)/4,H=(x+_)/4;return M>P&&M>q?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=G/i,s=U/i):P>q?P<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(P),i=G/r,s=H/r):q<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(q),i=U/s,r=H/s),this.set(i,r,s,t),this}let S=Math.sqrt((_-x)*(_-x)+(p-b)*(p-b)+(g-h)*(g-h));return Math.abs(S)<.001&&(S=1),this.x=(_-x)/S,this.y=(p-b)/S,this.z=(g-h)/S,this.w=Math.acos((u+d+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class k1 extends so{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new un(0,0,e,t),this.scissorTest=!1,this.viewport=new un(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(jo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===js?Hn:Hi),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gi,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Li(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bm(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $s extends k1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class xm extends Li{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ai,this.minFilter=ai,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class B1 extends Li{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ai,this.minFilter=ai,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nl{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],u=i[r+1],h=i[r+2],p=i[r+3];const g=s[a+0],d=s[a+1],x=s[a+2],b=s[a+3];if(o===0){e[t+0]=l,e[t+1]=u,e[t+2]=h,e[t+3]=p;return}if(o===1){e[t+0]=g,e[t+1]=d,e[t+2]=x,e[t+3]=b;return}if(p!==b||l!==g||u!==d||h!==x){let _=1-o;const m=l*g+u*d+h*x+p*b,S=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const q=Math.sqrt(M),G=Math.atan2(q,m*S);_=Math.sin(_*G)/q,o=Math.sin(o*G)/q}const P=o*S;if(l=l*_+g*P,u=u*_+d*P,h=h*_+x*P,p=p*_+b*P,_===1-o){const q=1/Math.sqrt(l*l+u*u+h*h+p*p);l*=q,u*=q,h*=q,p*=q}}e[t]=l,e[t+1]=u,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],u=i[r+2],h=i[r+3],p=s[a],g=s[a+1],d=s[a+2],x=s[a+3];return e[t]=o*x+h*p+l*d-u*g,e[t+1]=l*x+h*g+u*p-o*d,e[t+2]=u*x+h*d+o*g-l*p,e[t+3]=h*x-o*p-l*g-u*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,u=o(i/2),h=o(r/2),p=o(s/2),g=l(i/2),d=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=g*h*p+u*d*x,this._y=u*d*p-g*h*x,this._z=u*h*x+g*d*p,this._w=u*h*p-g*d*x;break;case"YXZ":this._x=g*h*p+u*d*x,this._y=u*d*p-g*h*x,this._z=u*h*x-g*d*p,this._w=u*h*p+g*d*x;break;case"ZXY":this._x=g*h*p-u*d*x,this._y=u*d*p+g*h*x,this._z=u*h*x+g*d*p,this._w=u*h*p-g*d*x;break;case"ZYX":this._x=g*h*p-u*d*x,this._y=u*d*p+g*h*x,this._z=u*h*x-g*d*p,this._w=u*h*p+g*d*x;break;case"YZX":this._x=g*h*p+u*d*x,this._y=u*d*p+g*h*x,this._z=u*h*x-g*d*p,this._w=u*h*p-g*d*x;break;case"XZY":this._x=g*h*p-u*d*x,this._y=u*d*p-g*h*x,this._z=u*h*x+g*d*p,this._w=u*h*p+g*d*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],u=t[2],h=t[6],p=t[10],g=i+o+p;if(g>0){const d=.5/Math.sqrt(g+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-u)*d,this._z=(a-r)*d}else if(i>o&&i>p){const d=2*Math.sqrt(1+i-o-p);this._w=(h-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+u)/d}else if(o>p){const d=2*Math.sqrt(1+o-i-p);this._w=(s-u)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+p-i-o);this._w=(a-r)/d,this._x=(s+u)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(oi(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,u=t._z,h=t._w;return this._x=i*h+a*o+r*u-s*l,this._y=r*h+a*l+s*o-i*u,this._z=s*h+a*u+i*l-r*o,this._w=a*h-i*o-r*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),h=Math.atan2(u,o),p=Math.sin((1-t)*h)/u,g=Math.sin(t*h)/u;return this._w=a*p+this._w*g,this._x=i*p+this._x*g,this._y=r*p+this._y*g,this._z=s*p+this._z*g,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class be{constructor(e=0,t=0,i=0){be.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,u=2*(a*r-o*i),h=2*(o*t-s*r),p=2*(s*i-a*t);return this.x=t+l*u+a*p-o*h,this.y=i+l*h+o*u-s*p,this.z=r+l*p+s*h-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Bu.copy(this).projectOnVector(e),this.sub(Bu)}reflect(e){return this.sub(Bu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(oi(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bu=new be,Hf=new nl;class il{constructor(e=new be(1/0,1/0,1/0),t=new be(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ji.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ji.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ji.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ji):Ji.fromBufferAttribute(s,a),Ji.applyMatrix4(e.matrixWorld),this.expandByPoint(Ji);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ql.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ql.copy(i.boundingBox)),ql.applyMatrix4(e.matrixWorld),this.union(ql)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ji),Ji.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oo),Wl.subVectors(this.max,Oo),wa.subVectors(e.a,Oo),Ma.subVectors(e.b,Oo),Aa.subVectors(e.c,Oo),rs.subVectors(Ma,wa),ss.subVectors(Aa,Ma),Ds.subVectors(wa,Aa);let t=[0,-rs.z,rs.y,0,-ss.z,ss.y,0,-Ds.z,Ds.y,rs.z,0,-rs.x,ss.z,0,-ss.x,Ds.z,0,-Ds.x,-rs.y,rs.x,0,-ss.y,ss.x,0,-Ds.y,Ds.x,0];return!zu(t,wa,Ma,Aa,Wl)||(t=[1,0,0,0,1,0,0,0,1],!zu(t,wa,Ma,Aa,Wl))?!1:(jl.crossVectors(rs,ss),t=[jl.x,jl.y,jl.z],zu(t,wa,Ma,Aa,Wl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ji).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ji).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Dr=[new be,new be,new be,new be,new be,new be,new be,new be],Ji=new be,ql=new il,wa=new be,Ma=new be,Aa=new be,rs=new be,ss=new be,Ds=new be,Oo=new be,Wl=new be,jl=new be,Fs=new be;function zu(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Fs.fromArray(n,s);const o=r.x*Math.abs(Fs.x)+r.y*Math.abs(Fs.y)+r.z*Math.abs(Fs.z),l=e.dot(Fs),u=t.dot(Fs),h=i.dot(Fs);if(Math.max(-Math.max(l,u,h),Math.min(l,u,h))>o)return!1}return!0}const z1=new il,ko=new be,Gu=new be;class Bc{constructor(e=new be,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):z1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const t=ko.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ko,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(Gu)),this.expandByPoint(ko.copy(e.center).sub(Gu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fr=new be,Hu=new be,Xl=new be,as=new be,Vu=new be,Yl=new be,qu=new be;class nd{constructor(e=new be,t=new be(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fr.copy(this.origin).addScaledVector(this.direction,t),Fr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Hu.copy(e).add(t).multiplyScalar(.5),Xl.copy(t).sub(e).normalize(),as.copy(this.origin).sub(Hu);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Xl),o=as.dot(this.direction),l=-as.dot(Xl),u=as.lengthSq(),h=Math.abs(1-a*a);let p,g,d,x;if(h>0)if(p=a*l-o,g=a*o-l,x=s*h,p>=0)if(g>=-x)if(g<=x){const b=1/h;p*=b,g*=b,d=p*(p+a*g+2*o)+g*(a*p+g+2*l)+u}else g=s,p=Math.max(0,-(a*g+o)),d=-p*p+g*(g+2*l)+u;else g=-s,p=Math.max(0,-(a*g+o)),d=-p*p+g*(g+2*l)+u;else g<=-x?(p=Math.max(0,-(-a*s+o)),g=p>0?-s:Math.min(Math.max(-s,-l),s),d=-p*p+g*(g+2*l)+u):g<=x?(p=0,g=Math.min(Math.max(-s,-l),s),d=g*(g+2*l)+u):(p=Math.max(0,-(a*s+o)),g=p>0?s:Math.min(Math.max(-s,-l),s),d=-p*p+g*(g+2*l)+u);else g=a>0?-s:s,p=Math.max(0,-(a*g+o)),d=-p*p+g*(g+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Hu).addScaledVector(Xl,g),d}intersectSphere(e,t){Fr.subVectors(e.center,this.origin);const i=Fr.dot(this.direction),r=Fr.dot(Fr)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const u=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,g=this.origin;return u>=0?(i=(e.min.x-g.x)*u,r=(e.max.x-g.x)*u):(i=(e.max.x-g.x)*u,r=(e.min.x-g.x)*u),h>=0?(s=(e.min.y-g.y)*h,a=(e.max.y-g.y)*h):(s=(e.max.y-g.y)*h,a=(e.min.y-g.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-g.z)*p,l=(e.max.z-g.z)*p):(o=(e.max.z-g.z)*p,l=(e.min.z-g.z)*p),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fr)!==null}intersectTriangle(e,t,i,r,s){Vu.subVectors(t,e),Yl.subVectors(i,e),qu.crossVectors(Vu,Yl);let a=this.direction.dot(qu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;as.subVectors(this.origin,e);const l=o*this.direction.dot(Yl.crossVectors(as,Yl));if(l<0)return null;const u=o*this.direction.dot(Vu.cross(as));if(u<0||l+u>a)return null;const h=-o*as.dot(qu);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wn{constructor(e,t,i,r,s,a,o,l,u,h,p,g,d,x,b,_){wn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,u,h,p,g,d,x,b,_)}set(e,t,i,r,s,a,o,l,u,h,p,g,d,x,b,_){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=l,m[2]=u,m[6]=h,m[10]=p,m[14]=g,m[3]=d,m[7]=x,m[11]=b,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wn().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ea.setFromMatrixColumn(e,0).length(),s=1/Ea.setFromMatrixColumn(e,1).length(),a=1/Ea.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),u=Math.sin(r),h=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const g=a*h,d=a*p,x=o*h,b=o*p;t[0]=l*h,t[4]=-l*p,t[8]=u,t[1]=d+x*u,t[5]=g-b*u,t[9]=-o*l,t[2]=b-g*u,t[6]=x+d*u,t[10]=a*l}else if(e.order==="YXZ"){const g=l*h,d=l*p,x=u*h,b=u*p;t[0]=g+b*o,t[4]=x*o-d,t[8]=a*u,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=d*o-x,t[6]=b+g*o,t[10]=a*l}else if(e.order==="ZXY"){const g=l*h,d=l*p,x=u*h,b=u*p;t[0]=g-b*o,t[4]=-a*p,t[8]=x+d*o,t[1]=d+x*o,t[5]=a*h,t[9]=b-g*o,t[2]=-a*u,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const g=a*h,d=a*p,x=o*h,b=o*p;t[0]=l*h,t[4]=x*u-d,t[8]=g*u+b,t[1]=l*p,t[5]=b*u+g,t[9]=d*u-x,t[2]=-u,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const g=a*l,d=a*u,x=o*l,b=o*u;t[0]=l*h,t[4]=b-g*p,t[8]=x*p+d,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-u*h,t[6]=d*p+x,t[10]=g-b*p}else if(e.order==="XZY"){const g=a*l,d=a*u,x=o*l,b=o*u;t[0]=l*h,t[4]=-p,t[8]=u*h,t[1]=g*p+b,t[5]=a*h,t[9]=d*p-x,t[2]=x*p-d,t[6]=o*h,t[10]=b*p+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(G1,e,H1)}lookAt(e,t,i){const r=this.elements;return Ai.subVectors(e,t),Ai.lengthSq()===0&&(Ai.z=1),Ai.normalize(),os.crossVectors(i,Ai),os.lengthSq()===0&&(Math.abs(i.z)===1?Ai.x+=1e-4:Ai.z+=1e-4,Ai.normalize(),os.crossVectors(i,Ai)),os.normalize(),$l.crossVectors(Ai,os),r[0]=os.x,r[4]=$l.x,r[8]=Ai.x,r[1]=os.y,r[5]=$l.y,r[9]=Ai.y,r[2]=os.z,r[6]=$l.z,r[10]=Ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],u=i[12],h=i[1],p=i[5],g=i[9],d=i[13],x=i[2],b=i[6],_=i[10],m=i[14],S=i[3],M=i[7],P=i[11],q=i[15],G=r[0],U=r[4],H=r[8],A=r[12],D=r[1],E=r[5],R=r[9],X=r[13],N=r[2],J=r[6],Q=r[10],ie=r[14],ee=r[3],te=r[7],ae=r[11],xe=r[15];return s[0]=a*G+o*D+l*N+u*ee,s[4]=a*U+o*E+l*J+u*te,s[8]=a*H+o*R+l*Q+u*ae,s[12]=a*A+o*X+l*ie+u*xe,s[1]=h*G+p*D+g*N+d*ee,s[5]=h*U+p*E+g*J+d*te,s[9]=h*H+p*R+g*Q+d*ae,s[13]=h*A+p*X+g*ie+d*xe,s[2]=x*G+b*D+_*N+m*ee,s[6]=x*U+b*E+_*J+m*te,s[10]=x*H+b*R+_*Q+m*ae,s[14]=x*A+b*X+_*ie+m*xe,s[3]=S*G+M*D+P*N+q*ee,s[7]=S*U+M*E+P*J+q*te,s[11]=S*H+M*R+P*Q+q*ae,s[15]=S*A+M*X+P*ie+q*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],u=e[13],h=e[2],p=e[6],g=e[10],d=e[14],x=e[3],b=e[7],_=e[11],m=e[15];return x*(+s*l*p-r*u*p-s*o*g+i*u*g+r*o*d-i*l*d)+b*(+t*l*d-t*u*g+s*a*g-r*a*d+r*u*h-s*l*h)+_*(+t*u*p-t*o*d-s*a*p+i*a*d+s*o*h-i*u*h)+m*(-r*o*h-t*l*p+t*o*g+r*a*p-i*a*g+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],h=e[8],p=e[9],g=e[10],d=e[11],x=e[12],b=e[13],_=e[14],m=e[15],S=p*_*u-b*g*u+b*l*d-o*_*d-p*l*m+o*g*m,M=x*g*u-h*_*u-x*l*d+a*_*d+h*l*m-a*g*m,P=h*b*u-x*p*u+x*o*d-a*b*d-h*o*m+a*p*m,q=x*p*l-h*b*l-x*o*g+a*b*g+h*o*_-a*p*_,G=t*S+i*M+r*P+s*q;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/G;return e[0]=S*U,e[1]=(b*g*s-p*_*s-b*r*d+i*_*d+p*r*m-i*g*m)*U,e[2]=(o*_*s-b*l*s+b*r*u-i*_*u-o*r*m+i*l*m)*U,e[3]=(p*l*s-o*g*s-p*r*u+i*g*u+o*r*d-i*l*d)*U,e[4]=M*U,e[5]=(h*_*s-x*g*s+x*r*d-t*_*d-h*r*m+t*g*m)*U,e[6]=(x*l*s-a*_*s-x*r*u+t*_*u+a*r*m-t*l*m)*U,e[7]=(a*g*s-h*l*s+h*r*u-t*g*u-a*r*d+t*l*d)*U,e[8]=P*U,e[9]=(x*p*s-h*b*s-x*i*d+t*b*d+h*i*m-t*p*m)*U,e[10]=(a*b*s-x*o*s+x*i*u-t*b*u-a*i*m+t*o*m)*U,e[11]=(h*o*s-a*p*s-h*i*u+t*p*u+a*i*d-t*o*d)*U,e[12]=q*U,e[13]=(h*b*r-x*p*r+x*i*g-t*b*g-h*i*_+t*p*_)*U,e[14]=(x*o*r-a*b*r-x*i*l+t*b*l+a*i*_-t*o*_)*U,e[15]=(a*p*r-h*o*r+h*i*l-t*p*l-a*i*g+t*o*g)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,u=s*a,h=s*o;return this.set(u*a+i,u*o-r*l,u*l+r*o,0,u*o+r*l,h*o+i,h*l-r*a,0,u*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,u=s+s,h=a+a,p=o+o,g=s*u,d=s*h,x=s*p,b=a*h,_=a*p,m=o*p,S=l*u,M=l*h,P=l*p,q=i.x,G=i.y,U=i.z;return r[0]=(1-(b+m))*q,r[1]=(d+P)*q,r[2]=(x-M)*q,r[3]=0,r[4]=(d-P)*G,r[5]=(1-(g+m))*G,r[6]=(_+S)*G,r[7]=0,r[8]=(x+M)*U,r[9]=(_-S)*U,r[10]=(1-(g+b))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ea.set(r[0],r[1],r[2]).length();const a=Ea.set(r[4],r[5],r[6]).length(),o=Ea.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ki.copy(this);const u=1/s,h=1/a,p=1/o;return Ki.elements[0]*=u,Ki.elements[1]*=u,Ki.elements[2]*=u,Ki.elements[4]*=h,Ki.elements[5]*=h,Ki.elements[6]*=h,Ki.elements[8]*=p,Ki.elements[9]*=p,Ki.elements[10]*=p,t.setFromRotationMatrix(Ki),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Gr){const l=this.elements,u=2*s/(t-e),h=2*s/(i-r),p=(t+e)/(t-e),g=(i+r)/(i-r);let d,x;if(o===Gr)d=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Lc)d=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=h,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Gr){const l=this.elements,u=1/(t-e),h=1/(i-r),p=1/(a-s),g=(t+e)*u,d=(i+r)*h;let x,b;if(o===Gr)x=(a+s)*p,b=-2*p;else if(o===Lc)x=s*p,b=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-g,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=b,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ea=new be,Ki=new wn,G1=new be(0,0,0),H1=new be(1,1,1),os=new be,$l=new be,Ai=new be,Vf=new wn,qf=new nl;class zc{constructor(e=0,t=0,i=0,r=zc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],u=r[5],h=r[9],p=r[2],g=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(oi(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(g,u),this._z=0);break;case"YXZ":this._x=Math.asin(-oi(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(oi(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-oi(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(g,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(oi(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-oi(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(g,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Vf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qf.setFromEuler(this),this.setFromQuaternion(qf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zc.DEFAULT_ORDER="XYZ";class id{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let V1=0;const Wf=new be,Ta=new nl,Ur=new wn,Jl=new be,Bo=new be,q1=new be,W1=new nl,jf=new be(1,0,0),Xf=new be(0,1,0),Yf=new be(0,0,1),j1={type:"added"},X1={type:"removed"};class Vn extends so{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:V1++}),this.uuid=ao(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vn.DEFAULT_UP.clone();const e=new be,t=new zc,i=new nl,r=new be(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wn},normalMatrix:{value:new Ft}}),this.matrix=new wn,this.matrixWorld=new wn,this.matrixAutoUpdate=Vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new id,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ta.setFromAxisAngle(e,t),this.quaternion.multiply(Ta),this}rotateOnWorldAxis(e,t){return Ta.setFromAxisAngle(e,t),this.quaternion.premultiply(Ta),this}rotateX(e){return this.rotateOnAxis(jf,e)}rotateY(e){return this.rotateOnAxis(Xf,e)}rotateZ(e){return this.rotateOnAxis(Yf,e)}translateOnAxis(e,t){return Wf.copy(e).applyQuaternion(this.quaternion),this.position.add(Wf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jf,e)}translateY(e){return this.translateOnAxis(Xf,e)}translateZ(e){return this.translateOnAxis(Yf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ur.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Jl.copy(e):Jl.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ur.lookAt(Bo,Jl,this.up):Ur.lookAt(Jl,Bo,this.up),this.quaternion.setFromRotationMatrix(Ur),r&&(Ur.extractRotation(r.matrixWorld),Ta.setFromRotationMatrix(Ur),this.quaternion.premultiply(Ta.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(j1)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(X1)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ur.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ur.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ur),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,e,q1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,W1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,h=l.length;u<h;u++){const p=l[u];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),u=a(e.textures),h=a(e.images),p=a(e.shapes),g=a(e.skeletons),d=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),g.length>0&&(i.skeletons=g),d.length>0&&(i.animations=d),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const l=[];for(const u in o){const h=o[u];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Vn.DEFAULT_UP=new be(0,1,0);Vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zi=new be,Or=new be,Wu=new be,kr=new be,La=new be,Ca=new be,$f=new be,ju=new be,Xu=new be,Yu=new be;let Kl=!1;class nr{constructor(e=new be,t=new be,i=new be){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Zi.subVectors(e,t),r.cross(Zi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Zi.subVectors(r,t),Or.subVectors(i,t),Wu.subVectors(e,t);const a=Zi.dot(Zi),o=Zi.dot(Or),l=Zi.dot(Wu),u=Or.dot(Or),h=Or.dot(Wu),p=a*u-o*o;if(p===0)return s.set(0,0,0),null;const g=1/p,d=(u*l-o*h)*g,x=(a*h-o*l)*g;return s.set(1-d-x,x,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,kr)===null?!1:kr.x>=0&&kr.y>=0&&kr.x+kr.y<=1}static getUV(e,t,i,r,s,a,o,l){return Kl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Kl=!0),this.getInterpolation(e,t,i,r,s,a,o,l)}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,kr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,kr.x),l.addScaledVector(a,kr.y),l.addScaledVector(o,kr.z),l)}static isFrontFacing(e,t,i,r){return Zi.subVectors(i,t),Or.subVectors(e,t),Zi.cross(Or).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zi.subVectors(this.c,this.b),Or.subVectors(this.a,this.b),Zi.cross(Or).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nr.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nr.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Kl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Kl=!0),nr.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return nr.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return nr.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nr.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;La.subVectors(r,i),Ca.subVectors(s,i),ju.subVectors(e,i);const l=La.dot(ju),u=Ca.dot(ju);if(l<=0&&u<=0)return t.copy(i);Xu.subVectors(e,r);const h=La.dot(Xu),p=Ca.dot(Xu);if(h>=0&&p<=h)return t.copy(r);const g=l*p-h*u;if(g<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(La,a);Yu.subVectors(e,s);const d=La.dot(Yu),x=Ca.dot(Yu);if(x>=0&&d<=x)return t.copy(s);const b=d*u-l*x;if(b<=0&&u>=0&&x<=0)return o=u/(u-x),t.copy(i).addScaledVector(Ca,o);const _=h*x-d*p;if(_<=0&&p-h>=0&&d-x>=0)return $f.subVectors(s,r),o=(p-h)/(p-h+(d-x)),t.copy(r).addScaledVector($f,o);const m=1/(_+b+g);return a=b*m,o=g*m,t.copy(i).addScaledVector(La,a).addScaledVector(Ca,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Sm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},Zl={h:0,s:0,l:0};function $u(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ut{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$t.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=$t.workingColorSpace){return this.r=e,this.g=t,this.b=i,$t.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=$t.workingColorSpace){if(e=td(e,1),t=oi(t,0,1),i=oi(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=$u(a,s,e+1/3),this.g=$u(a,s,e),this.b=$u(a,s,e-1/3)}return $t.toWorkingColorSpace(this,r),this}setStyle(e,t=Hn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Hn){const i=Sm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ja(e.r),this.g=ja(e.g),this.b=ja(e.b),this}copyLinearToSRGB(e){return this.r=Ou(e.r),this.g=Ou(e.g),this.b=Ou(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Hn){return $t.fromWorkingColorSpace(Yn.copy(this),e),Math.round(oi(Yn.r*255,0,255))*65536+Math.round(oi(Yn.g*255,0,255))*256+Math.round(oi(Yn.b*255,0,255))}getHexString(e=Hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$t.workingColorSpace){$t.fromWorkingColorSpace(Yn.copy(this),t);const i=Yn.r,r=Yn.g,s=Yn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,u;const h=(o+a)/2;if(o===a)l=0,u=0;else{const p=a-o;switch(u=h<=.5?p/(a+o):p/(2-a-o),a){case i:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-i)/p+2;break;case s:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=u,e.l=h,e}getRGB(e,t=$t.workingColorSpace){return $t.fromWorkingColorSpace(Yn.copy(this),t),e.r=Yn.r,e.g=Yn.g,e.b=Yn.b,e}getStyle(e=Hn){$t.fromWorkingColorSpace(Yn.copy(this),e);const t=Yn.r,i=Yn.g,r=Yn.b;return e!==Hn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ls),this.setHSL(ls.h+e,ls.s+t,ls.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ls),e.getHSL(Zl);const i=Wo(ls.h,Zl.h,t),r=Wo(ls.s,Zl.s,t),s=Wo(ls.l,Zl.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yn=new Ut;Ut.NAMES=Sm;let Y1=0;class oo extends so{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Y1++}),this.uuid=ao(),this.name="",this.type="Material",this.blending=Wa,this.side=_s,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xh,this.blendDst=Sh,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=Mc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ff,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xa,this.stencilZFail=xa,this.stencilZPass=xa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wa&&(i.blending=this.blending),this.side!==_s&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==xh&&(i.blendSrc=this.blendSrc),this.blendDst!==Sh&&(i.blendDst=this.blendDst),this.blendEquation!==Gs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ff&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xa&&(i.stencilFail=this.stencilFail),this.stencilZFail!==xa&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==xa&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class rd extends oo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=sm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ln=new be,Ql=new kt;class ar{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ds,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ql.fromBufferAttribute(this,t),Ql.applyMatrix3(e),this.setXY(t,Ql.x,Ql.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ln.fromBufferAttribute(this,t),Ln.applyMatrix3(e),this.setXYZ(t,Ln.x,Ln.y,Ln.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ln.fromBufferAttribute(this,t),Ln.applyMatrix4(e),this.setXYZ(t,Ln.x,Ln.y,Ln.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ln.fromBufferAttribute(this,t),Ln.applyNormalMatrix(e),this.setXYZ(t,Ln.x,Ln.y,Ln.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ln.fromBufferAttribute(this,t),Ln.transformDirection(e),this.setXYZ(t,Ln.x,Ln.y,Ln.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ba(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ri(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ba(t,this.array)),t}setX(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ba(t,this.array)),t}setY(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ba(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ba(t,this.array)),t}setW(e,t){return this.normalized&&(t=ri(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ri(t,this.array),i=ri(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ri(t,this.array),i=ri(i,this.array),r=ri(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ri(t,this.array),i=ri(i,this.array),r=ri(r,this.array),s=ri(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uf&&(e.usage=this.usage),e}}class wm extends ar{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Mm extends ar{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ei extends ar{constructor(e,t,i){super(new Float32Array(e),t,i)}}let $1=0;const zi=new wn,Ju=new Vn,Ra=new be,Ei=new il,zo=new il,On=new be;class qi extends so{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$1++}),this.uuid=ao(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_m(e)?Mm:wm)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ft().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zi.makeRotationFromQuaternion(e),this.applyMatrix4(zi),this}rotateX(e){return zi.makeRotationX(e),this.applyMatrix4(zi),this}rotateY(e){return zi.makeRotationY(e),this.applyMatrix4(zi),this}rotateZ(e){return zi.makeRotationZ(e),this.applyMatrix4(zi),this}translate(e,t,i){return zi.makeTranslation(e,t,i),this.applyMatrix4(zi),this}scale(e,t,i){return zi.makeScale(e,t,i),this.applyMatrix4(zi),this}lookAt(e){return Ju.lookAt(e),Ju.updateMatrix(),this.applyMatrix4(Ju.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ra).negate(),this.translate(Ra.x,Ra.y,Ra.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ei(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new il);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new be(-1/0,-1/0,-1/0),new be(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ei.setFromBufferAttribute(s),this.morphTargetsRelative?(On.addVectors(this.boundingBox.min,Ei.min),this.boundingBox.expandByPoint(On),On.addVectors(this.boundingBox.max,Ei.max),this.boundingBox.expandByPoint(On)):(this.boundingBox.expandByPoint(Ei.min),this.boundingBox.expandByPoint(Ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new be,1/0);return}if(e){const i=this.boundingSphere.center;if(Ei.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];zo.setFromBufferAttribute(o),this.morphTargetsRelative?(On.addVectors(Ei.min,zo.min),Ei.expandByPoint(On),On.addVectors(Ei.max,zo.max),Ei.expandByPoint(On)):(Ei.expandByPoint(zo.min),Ei.expandByPoint(zo.max))}Ei.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)On.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(On));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let u=0,h=o.count;u<h;u++)On.fromBufferAttribute(o,u),l&&(Ra.fromBufferAttribute(e,u),On.add(Ra)),r=Math.max(r,i.distanceToSquared(On))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ar(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,u=[],h=[];for(let D=0;D<o;D++)u[D]=new be,h[D]=new be;const p=new be,g=new be,d=new be,x=new kt,b=new kt,_=new kt,m=new be,S=new be;function M(D,E,R){p.fromArray(r,D*3),g.fromArray(r,E*3),d.fromArray(r,R*3),x.fromArray(a,D*2),b.fromArray(a,E*2),_.fromArray(a,R*2),g.sub(p),d.sub(p),b.sub(x),_.sub(x);const X=1/(b.x*_.y-_.x*b.y);isFinite(X)&&(m.copy(g).multiplyScalar(_.y).addScaledVector(d,-b.y).multiplyScalar(X),S.copy(d).multiplyScalar(b.x).addScaledVector(g,-_.x).multiplyScalar(X),u[D].add(m),u[E].add(m),u[R].add(m),h[D].add(S),h[E].add(S),h[R].add(S))}let P=this.groups;P.length===0&&(P=[{start:0,count:i.length}]);for(let D=0,E=P.length;D<E;++D){const R=P[D],X=R.start,N=R.count;for(let J=X,Q=X+N;J<Q;J+=3)M(i[J+0],i[J+1],i[J+2])}const q=new be,G=new be,U=new be,H=new be;function A(D){U.fromArray(s,D*3),H.copy(U);const E=u[D];q.copy(E),q.sub(U.multiplyScalar(U.dot(E))).normalize(),G.crossVectors(H,E);const X=G.dot(h[D])<0?-1:1;l[D*4]=q.x,l[D*4+1]=q.y,l[D*4+2]=q.z,l[D*4+3]=X}for(let D=0,E=P.length;D<E;++D){const R=P[D],X=R.start,N=R.count;for(let J=X,Q=X+N;J<Q;J+=3)A(i[J+0]),A(i[J+1]),A(i[J+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ar(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let g=0,d=i.count;g<d;g++)i.setXYZ(g,0,0,0);const r=new be,s=new be,a=new be,o=new be,l=new be,u=new be,h=new be,p=new be;if(e)for(let g=0,d=e.count;g<d;g+=3){const x=e.getX(g+0),b=e.getX(g+1),_=e.getX(g+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,b),a.fromBufferAttribute(t,_),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,_),o.add(h),l.add(h),u.add(h),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(_,u.x,u.y,u.z)}else for(let g=0,d=t.count;g<d;g+=3)r.fromBufferAttribute(t,g+0),s.fromBufferAttribute(t,g+1),a.fromBufferAttribute(t,g+2),h.subVectors(a,s),p.subVectors(r,s),h.cross(p),i.setXYZ(g+0,h.x,h.y,h.z),i.setXYZ(g+1,h.x,h.y,h.z),i.setXYZ(g+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)On.fromBufferAttribute(e,t),On.normalize(),e.setXYZ(t,On.x,On.y,On.z)}toNonIndexed(){function e(o,l){const u=o.array,h=o.itemSize,p=o.normalized,g=new u.constructor(l.length*h);let d=0,x=0;for(let b=0,_=l.length;b<_;b++){o.isInterleavedBufferAttribute?d=l[b]*o.data.stride+o.offset:d=l[b]*h;for(let m=0;m<h;m++)g[x++]=u[d++]}return new ar(g,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qi,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],u=e(l,i);t.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const l=[],u=s[o];for(let h=0,p=u.length;h<p;h++){const g=u[h],d=e(g,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],h=[];for(let p=0,g=u.length;p<g;p++){const d=u[p];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const u in r){const h=r[u];this.setAttribute(u,h.clone(t))}const s=e.morphAttributes;for(const u in s){const h=[],p=s[u];for(let g=0,d=p.length;g<d;g++)h.push(p[g].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,h=a.length;u<h;u++){const p=a[u];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jf=new wn,Us=new nd,ec=new Bc,Kf=new be,Pa=new be,Na=new be,Ia=new be,Ku=new be,tc=new be,nc=new kt,ic=new kt,rc=new kt,Zf=new be,Qf=new be,ep=new be,sc=new be,ac=new be;class Ht extends Vn{constructor(e=new qi,t=new rd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){tc.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const h=o[l],p=s[l];h!==0&&(Ku.fromBufferAttribute(p,e),a?tc.addScaledVector(Ku,h):tc.addScaledVector(Ku.sub(t),h))}t.add(tc)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ec.copy(i.boundingSphere),ec.applyMatrix4(s),Us.copy(e.ray).recast(e.near),!(ec.containsPoint(Us.origin)===!1&&(Us.intersectSphere(ec,Kf)===null||Us.origin.distanceToSquared(Kf)>(e.far-e.near)**2))&&(Jf.copy(s).invert(),Us.copy(e.ray).applyMatrix4(Jf),!(i.boundingBox!==null&&Us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Us)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,u=s.attributes.uv,h=s.attributes.uv1,p=s.attributes.normal,g=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,b=g.length;x<b;x++){const _=g[x],m=a[_.materialIndex],S=Math.max(_.start,d.start),M=Math.min(o.count,Math.min(_.start+_.count,d.start+d.count));for(let P=S,q=M;P<q;P+=3){const G=o.getX(P),U=o.getX(P+1),H=o.getX(P+2);r=oc(this,m,e,i,u,h,p,G,U,H),r&&(r.faceIndex=Math.floor(P/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const x=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let _=x,m=b;_<m;_+=3){const S=o.getX(_),M=o.getX(_+1),P=o.getX(_+2);r=oc(this,a,e,i,u,h,p,S,M,P),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,b=g.length;x<b;x++){const _=g[x],m=a[_.materialIndex],S=Math.max(_.start,d.start),M=Math.min(l.count,Math.min(_.start+_.count,d.start+d.count));for(let P=S,q=M;P<q;P+=3){const G=P,U=P+1,H=P+2;r=oc(this,m,e,i,u,h,p,G,U,H),r&&(r.faceIndex=Math.floor(P/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const x=Math.max(0,d.start),b=Math.min(l.count,d.start+d.count);for(let _=x,m=b;_<m;_+=3){const S=_,M=_+1,P=_+2;r=oc(this,a,e,i,u,h,p,S,M,P),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function J1(n,e,t,i,r,s,a,o){let l;if(e.side===vi?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===_s,o),l===null)return null;ac.copy(o),ac.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(ac);return u<t.near||u>t.far?null:{distance:u,point:ac.clone(),object:n}}function oc(n,e,t,i,r,s,a,o,l,u){n.getVertexPosition(o,Pa),n.getVertexPosition(l,Na),n.getVertexPosition(u,Ia);const h=J1(n,e,t,i,Pa,Na,Ia,sc);if(h){r&&(nc.fromBufferAttribute(r,o),ic.fromBufferAttribute(r,l),rc.fromBufferAttribute(r,u),h.uv=nr.getInterpolation(sc,Pa,Na,Ia,nc,ic,rc,new kt)),s&&(nc.fromBufferAttribute(s,o),ic.fromBufferAttribute(s,l),rc.fromBufferAttribute(s,u),h.uv1=nr.getInterpolation(sc,Pa,Na,Ia,nc,ic,rc,new kt),h.uv2=h.uv1),a&&(Zf.fromBufferAttribute(a,o),Qf.fromBufferAttribute(a,l),ep.fromBufferAttribute(a,u),h.normal=nr.getInterpolation(sc,Pa,Na,Ia,Zf,Qf,ep,new be),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const p={a:o,b:l,c:u,normal:new be,materialIndex:0};nr.getNormal(Pa,Na,Ia,p.normal),h.face=p}return h}class cn extends qi{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],u=[],h=[],p=[];let g=0,d=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ei(u,3)),this.setAttribute("normal",new ei(h,3)),this.setAttribute("uv",new ei(p,2));function x(b,_,m,S,M,P,q,G,U,H,A){const D=P/U,E=q/H,R=P/2,X=q/2,N=G/2,J=U+1,Q=H+1;let ie=0,ee=0;const te=new be;for(let ae=0;ae<Q;ae++){const xe=ae*E-X;for(let T=0;T<J;T++){const F=T*D-R;te[b]=F*S,te[_]=xe*M,te[m]=N,u.push(te.x,te.y,te.z),te[b]=0,te[_]=0,te[m]=G>0?1:-1,h.push(te.x,te.y,te.z),p.push(T/U),p.push(1-ae/H),ie+=1}}for(let ae=0;ae<H;ae++)for(let xe=0;xe<U;xe++){const T=g+xe+J*ae,F=g+xe+J*(ae+1),V=g+(xe+1)+J*(ae+1),K=g+(xe+1)+J*ae;l.push(T,F,K),l.push(F,V,K),ee+=6}o.addGroup(d,ee,A),d+=ee,g+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function eo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function si(n){const e={};for(let t=0;t<n.length;t++){const i=eo(n[t]);for(const r in i)e[r]=i[r]}return e}function K1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Am(n){return n.getRenderTarget()===null?n.outputColorSpace:$t.workingColorSpace}const Z1={clone:eo,merge:si};var Q1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Js extends oo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Q1,this.fragmentShader=e2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=eo(e.uniforms),this.uniformsGroups=K1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Em extends Vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wn,this.projectionMatrix=new wn,this.projectionMatrixInverse=new wn,this.coordinateSystem=Gr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class li extends Em{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ko*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ko*2*Math.atan(Math.tan(qo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/u,r*=a.width/l,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Da=-90,Fa=1;class t2 extends Vn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new li(Da,Fa,e,t);r.layers=this.layers,this.add(r);const s=new li(Da,Fa,e,t);s.layers=this.layers,this.add(s);const a=new li(Da,Fa,e,t);a.layers=this.layers,this.add(a);const o=new li(Da,Fa,e,t);o.layers=this.layers,this.add(o);const l=new li(Da,Fa,e,t);l.layers=this.layers,this.add(l);const u=new li(Da,Fa,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const u of t)this.remove(u);if(e===Gr)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,u,h]=this.children,p=e.getRenderTarget(),g=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(p,g,d),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Tm extends Li{constructor(e,t,i,r,s,a,o,l,u,h){e=e!==void 0?e:[],t=t!==void 0?t:Ka,super(e,t,i,r,s,a,o,l,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class n2 extends $s{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(jo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===js?Hn:Hi),this.texture=new Tm(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Gi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new cn(5,5,5),s=new Js({name:"CubemapFromEquirect",uniforms:eo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vi,blending:ms});s.uniforms.tEquirect.value=t;const a=new Ht(r,s),o=t.minFilter;return t.minFilter===$o&&(t.minFilter=Gi),new t2(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const Zu=new be,i2=new be,r2=new Ft;class ks{constructor(e=new be(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Zu.subVectors(i,t).cross(i2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Zu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||r2.getNormalMatrix(e),r=this.coplanarPoint(Zu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Os=new Bc,lc=new be;class sd{constructor(e=new ks,t=new ks,i=new ks,r=new ks,s=new ks,a=new ks){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Gr){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],u=r[4],h=r[5],p=r[6],g=r[7],d=r[8],x=r[9],b=r[10],_=r[11],m=r[12],S=r[13],M=r[14],P=r[15];if(i[0].setComponents(l-s,g-u,_-d,P-m).normalize(),i[1].setComponents(l+s,g+u,_+d,P+m).normalize(),i[2].setComponents(l+a,g+h,_+x,P+S).normalize(),i[3].setComponents(l-a,g-h,_-x,P-S).normalize(),i[4].setComponents(l-o,g-p,_-b,P-M).normalize(),t===Gr)i[5].setComponents(l+o,g+p,_+b,P+M).normalize();else if(t===Lc)i[5].setComponents(o,p,b,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(e){return Os.center.set(0,0,0),Os.radius=.7071067811865476,Os.applyMatrix4(e.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(lc.x=r.normal.x>0?e.max.x:e.min.x,lc.y=r.normal.y>0?e.max.y:e.min.y,lc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(lc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lm(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function s2(n,e){const t=e.isWebGL2,i=new WeakMap;function r(u,h){const p=u.array,g=u.usage,d=p.byteLength,x=n.createBuffer();n.bindBuffer(h,x),n.bufferData(h,p,g),u.onUploadCallback();let b;if(p instanceof Float32Array)b=n.FLOAT;else if(p instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)b=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=n.UNSIGNED_SHORT;else if(p instanceof Int16Array)b=n.SHORT;else if(p instanceof Uint32Array)b=n.UNSIGNED_INT;else if(p instanceof Int32Array)b=n.INT;else if(p instanceof Int8Array)b=n.BYTE;else if(p instanceof Uint8Array)b=n.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)b=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:b,bytesPerElement:p.BYTES_PER_ELEMENT,version:u.version,size:d}}function s(u,h,p){const g=h.array,d=h._updateRange,x=h.updateRanges;if(n.bindBuffer(p,u),d.count===-1&&x.length===0&&n.bufferSubData(p,0,g),x.length!==0){for(let b=0,_=x.length;b<_;b++){const m=x[b];t?n.bufferSubData(p,m.start*g.BYTES_PER_ELEMENT,g,m.start,m.count):n.bufferSubData(p,m.start*g.BYTES_PER_ELEMENT,g.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}d.count!==-1&&(t?n.bufferSubData(p,d.offset*g.BYTES_PER_ELEMENT,g,d.offset,d.count):n.bufferSubData(p,d.offset*g.BYTES_PER_ELEMENT,g.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function a(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function o(u){u.isInterleavedBufferAttribute&&(u=u.data);const h=i.get(u);h&&(n.deleteBuffer(h.buffer),i.delete(u))}function l(u,h){if(u.isGLBufferAttribute){const g=i.get(u);(!g||g.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const p=i.get(u);if(p===void 0)i.set(u,r(u,h));else if(p.version<u.version){if(p.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,u,h),p.version=u.version}}return{get:a,remove:o,update:l}}class ad extends qi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),u=o+1,h=l+1,p=e/o,g=t/l,d=[],x=[],b=[],_=[];for(let m=0;m<h;m++){const S=m*g-a;for(let M=0;M<u;M++){const P=M*p-s;x.push(P,-S,0),b.push(0,0,1),_.push(M/o),_.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const M=S+u*m,P=S+u*(m+1),q=S+1+u*(m+1),G=S+1+u*m;d.push(M,P,G),d.push(P,q,G)}this.setIndex(d),this.setAttribute("position",new ei(x,3)),this.setAttribute("normal",new ei(b,3)),this.setAttribute("uv",new ei(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ad(e.width,e.height,e.widthSegments,e.heightSegments)}}var a2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,o2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,l2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,c2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,u2=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,h2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d2=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,f2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,p2=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,m2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,g2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,v2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_2=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,y2=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,b2=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,x2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,S2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,w2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,M2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,A2=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,E2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,T2=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,L2=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,C2=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,R2=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,P2=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,N2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,I2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,F2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,U2="gl_FragColor = linearToOutputTexel( gl_FragColor );",O2=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,k2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,B2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,z2=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,G2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,H2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,V2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,q2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,W2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,j2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X2=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Y2=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,J2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,K2=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Z2=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Q2=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,iv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,av=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ov=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,dv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_v=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,xv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Sv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,wv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ev=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Iv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ov=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Hv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$v=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,e5=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,t5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,i5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,r5=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const s5=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,a5=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l5=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u5=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h5=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,d5=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,f5=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,p5=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,m5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,g5=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v5=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_5=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y5=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,b5=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x5=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S5=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w5=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,M5=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A5=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,E5=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,T5=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L5=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C5=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R5=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P5=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N5=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I5=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,D5=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F5=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U5=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,O5=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,k5=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dt={alphahash_fragment:a2,alphahash_pars_fragment:o2,alphamap_fragment:l2,alphamap_pars_fragment:c2,alphatest_fragment:u2,alphatest_pars_fragment:h2,aomap_fragment:d2,aomap_pars_fragment:f2,batching_pars_vertex:p2,batching_vertex:m2,begin_vertex:g2,beginnormal_vertex:v2,bsdfs:_2,iridescence_fragment:y2,bumpmap_pars_fragment:b2,clipping_planes_fragment:x2,clipping_planes_pars_fragment:S2,clipping_planes_pars_vertex:w2,clipping_planes_vertex:M2,color_fragment:A2,color_pars_fragment:E2,color_pars_vertex:T2,color_vertex:L2,common:C2,cube_uv_reflection_fragment:R2,defaultnormal_vertex:P2,displacementmap_pars_vertex:N2,displacementmap_vertex:I2,emissivemap_fragment:D2,emissivemap_pars_fragment:F2,colorspace_fragment:U2,colorspace_pars_fragment:O2,envmap_fragment:k2,envmap_common_pars_fragment:B2,envmap_pars_fragment:z2,envmap_pars_vertex:G2,envmap_physical_pars_fragment:Q2,envmap_vertex:H2,fog_vertex:V2,fog_pars_vertex:q2,fog_fragment:W2,fog_pars_fragment:j2,gradientmap_pars_fragment:X2,lightmap_fragment:Y2,lightmap_pars_fragment:$2,lights_lambert_fragment:J2,lights_lambert_pars_fragment:K2,lights_pars_begin:Z2,lights_toon_fragment:ev,lights_toon_pars_fragment:tv,lights_phong_fragment:nv,lights_phong_pars_fragment:iv,lights_physical_fragment:rv,lights_physical_pars_fragment:sv,lights_fragment_begin:av,lights_fragment_maps:ov,lights_fragment_end:lv,logdepthbuf_fragment:cv,logdepthbuf_pars_fragment:uv,logdepthbuf_pars_vertex:hv,logdepthbuf_vertex:dv,map_fragment:fv,map_pars_fragment:pv,map_particle_fragment:mv,map_particle_pars_fragment:gv,metalnessmap_fragment:vv,metalnessmap_pars_fragment:_v,morphcolor_vertex:yv,morphnormal_vertex:bv,morphtarget_pars_vertex:xv,morphtarget_vertex:Sv,normal_fragment_begin:wv,normal_fragment_maps:Mv,normal_pars_fragment:Av,normal_pars_vertex:Ev,normal_vertex:Tv,normalmap_pars_fragment:Lv,clearcoat_normal_fragment_begin:Cv,clearcoat_normal_fragment_maps:Rv,clearcoat_pars_fragment:Pv,iridescence_pars_fragment:Nv,opaque_fragment:Iv,packing:Dv,premultiplied_alpha_fragment:Fv,project_vertex:Uv,dithering_fragment:Ov,dithering_pars_fragment:kv,roughnessmap_fragment:Bv,roughnessmap_pars_fragment:zv,shadowmap_pars_fragment:Gv,shadowmap_pars_vertex:Hv,shadowmap_vertex:Vv,shadowmask_pars_fragment:qv,skinbase_vertex:Wv,skinning_pars_vertex:jv,skinning_vertex:Xv,skinnormal_vertex:Yv,specularmap_fragment:$v,specularmap_pars_fragment:Jv,tonemapping_fragment:Kv,tonemapping_pars_fragment:Zv,transmission_fragment:Qv,transmission_pars_fragment:e5,uv_pars_fragment:t5,uv_pars_vertex:n5,uv_vertex:i5,worldpos_vertex:r5,background_vert:s5,background_frag:a5,backgroundCube_vert:o5,backgroundCube_frag:l5,cube_vert:c5,cube_frag:u5,depth_vert:h5,depth_frag:d5,distanceRGBA_vert:f5,distanceRGBA_frag:p5,equirect_vert:m5,equirect_frag:g5,linedashed_vert:v5,linedashed_frag:_5,meshbasic_vert:y5,meshbasic_frag:b5,meshlambert_vert:x5,meshlambert_frag:S5,meshmatcap_vert:w5,meshmatcap_frag:M5,meshnormal_vert:A5,meshnormal_frag:E5,meshphong_vert:T5,meshphong_frag:L5,meshphysical_vert:C5,meshphysical_frag:R5,meshtoon_vert:P5,meshtoon_frag:N5,points_vert:I5,points_frag:D5,shadow_vert:F5,shadow_frag:U5,sprite_vert:O5,sprite_frag:k5},et={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},gr={basic:{uniforms:si([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:si([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:si([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:si([et.common,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.roughnessmap,et.metalnessmap,et.fog,et.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:si([et.common,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.gradientmap,et.fog,et.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:si([et.common,et.bumpmap,et.normalmap,et.displacementmap,et.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:si([et.points,et.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:si([et.common,et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:si([et.common,et.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:si([et.common,et.bumpmap,et.normalmap,et.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:si([et.sprite,et.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:si([et.common,et.displacementmap,{referencePosition:{value:new be},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:si([et.lights,et.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};gr.physical={uniforms:si([gr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const cc={r:0,b:0,g:0};function B5(n,e,t,i,r,s,a){const o=new Ut(0);let l=s===!0?0:1,u,h,p=null,g=0,d=null;function x(_,m){let S=!1,M=m.isScene===!0?m.background:null;M&&M.isTexture&&(M=(m.backgroundBlurriness>0?t:e).get(M)),M===null?b(o,l):M&&M.isColor&&(b(M,1),S=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),M&&(M.isCubeTexture||M.mapping===Oc)?(h===void 0&&(h=new Ht(new cn(1,1,1),new Js({name:"BackgroundCubeMaterial",uniforms:eo(gr.backgroundCube.uniforms),vertexShader:gr.backgroundCube.vertexShader,fragmentShader:gr.backgroundCube.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(q,G,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=$t.getTransfer(M.colorSpace)!==on,(p!==M||g!==M.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,p=M,g=M.version,d=n.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(u===void 0&&(u=new Ht(new ad(2,2),new Js({name:"BackgroundMaterial",uniforms:eo(gr.background.uniforms),vertexShader:gr.background.vertexShader,fragmentShader:gr.background.fragmentShader,side:_s,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=M,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=$t.getTransfer(M.colorSpace)!==on,M.matrixAutoUpdate===!0&&M.updateMatrix(),u.material.uniforms.uvTransform.value.copy(M.matrix),(p!==M||g!==M.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,p=M,g=M.version,d=n.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null))}function b(_,m){_.getRGB(cc,Am(n)),i.buffers.color.setClear(cc.r,cc.g,cc.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(_,m=1){o.set(_),l=m,b(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,b(o,l)},render:x}}function z5(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=_(null);let u=l,h=!1;function p(N,J,Q,ie,ee){let te=!1;if(a){const ae=b(ie,Q,J);u!==ae&&(u=ae,d(u.object)),te=m(N,ie,Q,ee),te&&S(N,ie,Q,ee)}else{const ae=J.wireframe===!0;(u.geometry!==ie.id||u.program!==Q.id||u.wireframe!==ae)&&(u.geometry=ie.id,u.program=Q.id,u.wireframe=ae,te=!0)}ee!==null&&t.update(ee,n.ELEMENT_ARRAY_BUFFER),(te||h)&&(h=!1,H(N,J,Q,ie),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ee).buffer))}function g(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function d(N){return i.isWebGL2?n.bindVertexArray(N):s.bindVertexArrayOES(N)}function x(N){return i.isWebGL2?n.deleteVertexArray(N):s.deleteVertexArrayOES(N)}function b(N,J,Q){const ie=Q.wireframe===!0;let ee=o[N.id];ee===void 0&&(ee={},o[N.id]=ee);let te=ee[J.id];te===void 0&&(te={},ee[J.id]=te);let ae=te[ie];return ae===void 0&&(ae=_(g()),te[ie]=ae),ae}function _(N){const J=[],Q=[],ie=[];for(let ee=0;ee<r;ee++)J[ee]=0,Q[ee]=0,ie[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:J,enabledAttributes:Q,attributeDivisors:ie,object:N,attributes:{},index:null}}function m(N,J,Q,ie){const ee=u.attributes,te=J.attributes;let ae=0;const xe=Q.getAttributes();for(const T in xe)if(xe[T].location>=0){const V=ee[T];let K=te[T];if(K===void 0&&(T==="instanceMatrix"&&N.instanceMatrix&&(K=N.instanceMatrix),T==="instanceColor"&&N.instanceColor&&(K=N.instanceColor)),V===void 0||V.attribute!==K||K&&V.data!==K.data)return!0;ae++}return u.attributesNum!==ae||u.index!==ie}function S(N,J,Q,ie){const ee={},te=J.attributes;let ae=0;const xe=Q.getAttributes();for(const T in xe)if(xe[T].location>=0){let V=te[T];V===void 0&&(T==="instanceMatrix"&&N.instanceMatrix&&(V=N.instanceMatrix),T==="instanceColor"&&N.instanceColor&&(V=N.instanceColor));const K={};K.attribute=V,V&&V.data&&(K.data=V.data),ee[T]=K,ae++}u.attributes=ee,u.attributesNum=ae,u.index=ie}function M(){const N=u.newAttributes;for(let J=0,Q=N.length;J<Q;J++)N[J]=0}function P(N){q(N,0)}function q(N,J){const Q=u.newAttributes,ie=u.enabledAttributes,ee=u.attributeDivisors;Q[N]=1,ie[N]===0&&(n.enableVertexAttribArray(N),ie[N]=1),ee[N]!==J&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,J),ee[N]=J)}function G(){const N=u.newAttributes,J=u.enabledAttributes;for(let Q=0,ie=J.length;Q<ie;Q++)J[Q]!==N[Q]&&(n.disableVertexAttribArray(Q),J[Q]=0)}function U(N,J,Q,ie,ee,te,ae){ae===!0?n.vertexAttribIPointer(N,J,Q,ee,te):n.vertexAttribPointer(N,J,Q,ie,ee,te)}function H(N,J,Q,ie){if(i.isWebGL2===!1&&(N.isInstancedMesh||ie.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;M();const ee=ie.attributes,te=Q.getAttributes(),ae=J.defaultAttributeValues;for(const xe in te){const T=te[xe];if(T.location>=0){let F=ee[xe];if(F===void 0&&(xe==="instanceMatrix"&&N.instanceMatrix&&(F=N.instanceMatrix),xe==="instanceColor"&&N.instanceColor&&(F=N.instanceColor)),F!==void 0){const V=F.normalized,K=F.itemSize,ne=t.get(F);if(ne===void 0)continue;const ce=ne.buffer,fe=ne.type,pe=ne.bytesPerElement,Ce=i.isWebGL2===!0&&(fe===n.INT||fe===n.UNSIGNED_INT||F.gpuType===om);if(F.isInterleavedBufferAttribute){const Ie=F.data,re=Ie.stride,Xe=F.offset;if(Ie.isInstancedInterleavedBuffer){for(let Ve=0;Ve<T.locationSize;Ve++)q(T.location+Ve,Ie.meshPerAttribute);N.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=Ie.meshPerAttribute*Ie.count)}else for(let Ve=0;Ve<T.locationSize;Ve++)P(T.location+Ve);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let Ve=0;Ve<T.locationSize;Ve++)U(T.location+Ve,K/T.locationSize,fe,V,re*pe,(Xe+K/T.locationSize*Ve)*pe,Ce)}else{if(F.isInstancedBufferAttribute){for(let Ie=0;Ie<T.locationSize;Ie++)q(T.location+Ie,F.meshPerAttribute);N.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let Ie=0;Ie<T.locationSize;Ie++)P(T.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let Ie=0;Ie<T.locationSize;Ie++)U(T.location+Ie,K/T.locationSize,fe,V,K*pe,K/T.locationSize*Ie*pe,Ce)}}else if(ae!==void 0){const V=ae[xe];if(V!==void 0)switch(V.length){case 2:n.vertexAttrib2fv(T.location,V);break;case 3:n.vertexAttrib3fv(T.location,V);break;case 4:n.vertexAttrib4fv(T.location,V);break;default:n.vertexAttrib1fv(T.location,V)}}}}G()}function A(){R();for(const N in o){const J=o[N];for(const Q in J){const ie=J[Q];for(const ee in ie)x(ie[ee].object),delete ie[ee];delete J[Q]}delete o[N]}}function D(N){if(o[N.id]===void 0)return;const J=o[N.id];for(const Q in J){const ie=J[Q];for(const ee in ie)x(ie[ee].object),delete ie[ee];delete J[Q]}delete o[N.id]}function E(N){for(const J in o){const Q=o[J];if(Q[N.id]===void 0)continue;const ie=Q[N.id];for(const ee in ie)x(ie[ee].object),delete ie[ee];delete Q[N.id]}}function R(){X(),h=!0,u!==l&&(u=l,d(u.object))}function X(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:R,resetDefaultState:X,dispose:A,releaseStatesOfGeometry:D,releaseStatesOfProgram:E,initAttributes:M,enableAttribute:P,disableUnusedAttributes:G}}function G5(n,e,t,i){const r=i.isWebGL2;let s;function a(h){s=h}function o(h,p){n.drawArrays(s,h,p),t.update(p,s,1)}function l(h,p,g){if(g===0)return;let d,x;if(r)d=n,x="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[x](s,h,p,g),t.update(p,s,g)}function u(h,p,g){if(g===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let x=0;x<g;x++)this.render(h[x],p[x]);else{d.multiDrawArraysWEBGL(s,h,0,p,0,g);let x=0;for(let b=0;b<g;b++)x+=p[b];t.update(x,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=u}function H5(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(U){if(U==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const u=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),b=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,P=a||e.has("OES_texture_float"),q=M&&P,G=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:d,maxCubemapSize:x,maxAttributes:b,maxVertexUniforms:_,maxVaryings:m,maxFragmentUniforms:S,vertexTextures:M,floatFragmentTextures:P,floatVertexTextures:q,maxSamples:G}}function V5(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ks,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,g){const d=p.length!==0||g||i!==0||r;return r=g,i=p.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,g){t=h(p,g,0)},this.setState=function(p,g,d){const x=p.clippingPlanes,b=p.clipIntersection,_=p.clipShadows,m=n.get(p);if(!r||x===null||x.length===0||s&&!_)s?h(null):u();else{const S=s?0:i,M=S*4;let P=m.clippingState||null;l.value=P,P=h(x,g,M,d);for(let q=0;q!==M;++q)P[q]=t[q];m.clippingState=P,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=S}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(p,g,d,x){const b=p!==null?p.length:0;let _=null;if(b!==0){if(_=l.value,x!==!0||_===null){const m=d+b*4,S=g.matrixWorldInverse;o.getNormalMatrix(S),(_===null||_.length<m)&&(_=new Float32Array(m));for(let M=0,P=d;M!==b;++M,P+=4)a.copy(p[M]).applyMatrix4(S,o),a.normal.toArray(_,P),_[P+3]=a.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,_}}function q5(n){let e=new WeakMap;function t(a,o){return o===wh?a.mapping=Ka:o===Mh&&(a.mapping=Za),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===wh||o===Mh)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const u=new n2(l.height/2);return u.fromEquirectangularTexture(n,a),e.set(a,u),a.addEventListener("dispose",r),t(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Cm extends Em{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ha=4,tp=[.125,.215,.35,.446,.526,.582],Hs=20,Qu=new Cm,np=new Ut;let eh=null,th=0,nh=0;const Bs=(1+Math.sqrt(5))/2,Ua=1/Bs,ip=[new be(1,1,1),new be(-1,1,1),new be(1,1,-1),new be(-1,1,-1),new be(0,Bs,Ua),new be(0,Bs,-Ua),new be(Ua,0,Bs),new be(-Ua,0,Bs),new be(Bs,Ua,0),new be(-Bs,Ua,0)];class rp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){eh=this._renderer.getRenderTarget(),th=this._renderer.getActiveCubeFace(),nh=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=op(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ap(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(eh,th,nh),e.scissorTest=!1,uc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ka||e.mapping===Za?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),eh=this._renderer.getRenderTarget(),th=this._renderer.getActiveCubeFace(),nh=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gi,minFilter:Gi,generateMipmaps:!1,type:Jo,format:rr,colorSpace:Vr,depthBuffer:!1},r=sp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sp(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=W5(s)),this._blurMaterial=j5(s,e,t)}return r}_compileMaterial(e){const t=new Ht(this._lodPlanes[0],e);this._renderer.compile(t,Qu)}_sceneToCubeUV(e,t,i,r){const o=new li(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,g=h.toneMapping;h.getClearColor(np),h.toneMapping=gs,h.autoClear=!1;const d=new rd({name:"PMREM.Background",side:vi,depthWrite:!1,depthTest:!1}),x=new Ht(new cn,d);let b=!1;const _=e.background;_?_.isColor&&(d.color.copy(_),e.background=null,b=!0):(d.color.copy(np),b=!0);for(let m=0;m<6;m++){const S=m%3;S===0?(o.up.set(0,l[m],0),o.lookAt(u[m],0,0)):S===1?(o.up.set(0,0,l[m]),o.lookAt(0,u[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,u[m]));const M=this._cubeSize;uc(r,S*M,m>2?M:0,M,M),h.setRenderTarget(r),b&&h.render(x,o),h.render(e,o)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=g,h.autoClear=p,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ka||e.mapping===Za;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=op()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ap());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ht(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;uc(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Qu)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ip[(r-1)%ip.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,p=new Ht(this._lodPlanes[r],u),g=u.uniforms,d=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Hs-1),b=s/x,_=isFinite(s)?1+Math.floor(h*b):Hs;_>Hs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Hs}`);const m=[];let S=0;for(let U=0;U<Hs;++U){const H=U/b,A=Math.exp(-H*H/2);m.push(A),U===0?S+=A:U<_&&(S+=2*A)}for(let U=0;U<m.length;U++)m[U]=m[U]/S;g.envMap.value=e.texture,g.samples.value=_,g.weights.value=m,g.latitudinal.value=a==="latitudinal",o&&(g.poleAxis.value=o);const{_lodMax:M}=this;g.dTheta.value=x,g.mipInt.value=M-i;const P=this._sizeLods[r],q=3*P*(r>M-Ha?r-M+Ha:0),G=4*(this._cubeSize-P);uc(t,q,G,3*P,2*P),l.setRenderTarget(t),l.render(p,Qu)}}function W5(n){const e=[],t=[],i=[];let r=n;const s=n-Ha+1+tp.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Ha?l=tp[a-n+Ha-1]:a===0&&(l=0),i.push(l);const u=1/(o-2),h=-u,p=1+u,g=[h,h,p,h,p,p,h,h,p,p,h,p],d=6,x=6,b=3,_=2,m=1,S=new Float32Array(b*x*d),M=new Float32Array(_*x*d),P=new Float32Array(m*x*d);for(let G=0;G<d;G++){const U=G%3*2/3-1,H=G>2?0:-1,A=[U,H,0,U+2/3,H,0,U+2/3,H+1,0,U,H,0,U+2/3,H+1,0,U,H+1,0];S.set(A,b*x*G),M.set(g,_*x*G);const D=[G,G,G,G,G,G];P.set(D,m*x*G)}const q=new qi;q.setAttribute("position",new ar(S,b)),q.setAttribute("uv",new ar(M,_)),q.setAttribute("faceIndex",new ar(P,m)),e.push(q),r>Ha&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function sp(n,e,t){const i=new $s(n,e,t);return i.texture.mapping=Oc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function uc(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function j5(n,e,t){const i=new Float32Array(Hs),r=new be(0,1,0);return new Js({name:"SphericalGaussianBlur",defines:{n:Hs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:od(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ms,depthTest:!1,depthWrite:!1})}function ap(){return new Js({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:od(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ms,depthTest:!1,depthWrite:!1})}function op(){return new Js({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:od(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ms,depthTest:!1,depthWrite:!1})}function od(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function X5(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,u=l===wh||l===Mh,h=l===Ka||l===Za;if(u||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let p=e.get(o);return t===null&&(t=new rp(n)),p=u?t.fromEquirectangular(o,p):t.fromCubemap(o,p),e.set(o,p),p.texture}else{if(e.has(o))return e.get(o).texture;{const p=o.image;if(u&&p&&p.height>0||h&&p&&r(p)){t===null&&(t=new rp(n));const g=u?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,g),o.addEventListener("dispose",s),g.texture}else return null}}}return o}function r(o){let l=0;const u=6;for(let h=0;h<u;h++)o[h]!==void 0&&l++;return l===u}function s(o){const l=o.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Y5(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function $5(n,e,t,i){const r={},s=new WeakMap;function a(p){const g=p.target;g.index!==null&&e.remove(g.index);for(const x in g.attributes)e.remove(g.attributes[x]);for(const x in g.morphAttributes){const b=g.morphAttributes[x];for(let _=0,m=b.length;_<m;_++)e.remove(b[_])}g.removeEventListener("dispose",a),delete r[g.id];const d=s.get(g);d&&(e.remove(d),s.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function o(p,g){return r[g.id]===!0||(g.addEventListener("dispose",a),r[g.id]=!0,t.memory.geometries++),g}function l(p){const g=p.attributes;for(const x in g)e.update(g[x],n.ARRAY_BUFFER);const d=p.morphAttributes;for(const x in d){const b=d[x];for(let _=0,m=b.length;_<m;_++)e.update(b[_],n.ARRAY_BUFFER)}}function u(p){const g=[],d=p.index,x=p.attributes.position;let b=0;if(d!==null){const S=d.array;b=d.version;for(let M=0,P=S.length;M<P;M+=3){const q=S[M+0],G=S[M+1],U=S[M+2];g.push(q,G,G,U,U,q)}}else if(x!==void 0){const S=x.array;b=x.version;for(let M=0,P=S.length/3-1;M<P;M+=3){const q=M+0,G=M+1,U=M+2;g.push(q,G,G,U,U,q)}}else return;const _=new(_m(g)?Mm:wm)(g,1);_.version=b;const m=s.get(p);m&&e.remove(m),s.set(p,_)}function h(p){const g=s.get(p);if(g){const d=p.index;d!==null&&g.version<d.version&&u(p)}else u(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function J5(n,e,t,i){const r=i.isWebGL2;let s;function a(d){s=d}let o,l;function u(d){o=d.type,l=d.bytesPerElement}function h(d,x){n.drawElements(s,x,o,d*l),t.update(x,s,1)}function p(d,x,b){if(b===0)return;let _,m;if(r)_=n,m="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[m](s,x,o,d*l,b),t.update(x,s,b)}function g(d,x,b){if(b===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<b;m++)this.render(d[m]/l,x[m]);else{_.multiDrawElementsWEBGL(s,x,0,o,d,0,b);let m=0;for(let S=0;S<b;S++)m+=x[S];t.update(m,s,1)}}this.setMode=a,this.setIndex=u,this.render=h,this.renderInstances=p,this.renderMultiDraw=g}function K5(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Z5(n,e){return n[0]-e[0]}function Q5(n,e){return Math.abs(e[1])-Math.abs(n[1])}function e_(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new un,o=[];for(let u=0;u<8;u++)o[u]=[u,0];function l(u,h,p){const g=u.morphTargetInfluences;if(e.isWebGL2===!0){const d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=d!==void 0?d.length:0;let b=s.get(h);if(b===void 0||b.count!==x){let N=function(){R.dispose(),s.delete(h),h.removeEventListener("dispose",N)};b!==void 0&&b.texture.dispose();const S=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,q=h.morphAttributes.position||[],G=h.morphAttributes.normal||[],U=h.morphAttributes.color||[];let H=0;S===!0&&(H=1),M===!0&&(H=2),P===!0&&(H=3);let A=h.attributes.position.count*H,D=1;A>e.maxTextureSize&&(D=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const E=new Float32Array(A*D*4*x),R=new xm(E,A,D,x);R.type=ds,R.needsUpdate=!0;const X=H*4;for(let J=0;J<x;J++){const Q=q[J],ie=G[J],ee=U[J],te=A*D*4*J;for(let ae=0;ae<Q.count;ae++){const xe=ae*X;S===!0&&(a.fromBufferAttribute(Q,ae),E[te+xe+0]=a.x,E[te+xe+1]=a.y,E[te+xe+2]=a.z,E[te+xe+3]=0),M===!0&&(a.fromBufferAttribute(ie,ae),E[te+xe+4]=a.x,E[te+xe+5]=a.y,E[te+xe+6]=a.z,E[te+xe+7]=0),P===!0&&(a.fromBufferAttribute(ee,ae),E[te+xe+8]=a.x,E[te+xe+9]=a.y,E[te+xe+10]=a.z,E[te+xe+11]=ee.itemSize===4?a.w:1)}}b={count:x,texture:R,size:new kt(A,D)},s.set(h,b),h.addEventListener("dispose",N)}let _=0;for(let S=0;S<g.length;S++)_+=g[S];const m=h.morphTargetsRelative?1:1-_;p.getUniforms().setValue(n,"morphTargetBaseInfluence",m),p.getUniforms().setValue(n,"morphTargetInfluences",g),p.getUniforms().setValue(n,"morphTargetsTexture",b.texture,t),p.getUniforms().setValue(n,"morphTargetsTextureSize",b.size)}else{const d=g===void 0?0:g.length;let x=i[h.id];if(x===void 0||x.length!==d){x=[];for(let M=0;M<d;M++)x[M]=[M,0];i[h.id]=x}for(let M=0;M<d;M++){const P=x[M];P[0]=M,P[1]=g[M]}x.sort(Q5);for(let M=0;M<8;M++)M<d&&x[M][1]?(o[M][0]=x[M][0],o[M][1]=x[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(Z5);const b=h.morphAttributes.position,_=h.morphAttributes.normal;let m=0;for(let M=0;M<8;M++){const P=o[M],q=P[0],G=P[1];q!==Number.MAX_SAFE_INTEGER&&G?(b&&h.getAttribute("morphTarget"+M)!==b[q]&&h.setAttribute("morphTarget"+M,b[q]),_&&h.getAttribute("morphNormal"+M)!==_[q]&&h.setAttribute("morphNormal"+M,_[q]),r[M]=G,m+=G):(b&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),_&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),r[M]=0)}const S=h.morphTargetsRelative?1:1-m;p.getUniforms().setValue(n,"morphTargetBaseInfluence",S),p.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function t_(n,e,t,i){let r=new WeakMap;function s(l){const u=i.render.frame,h=l.geometry,p=e.get(l,h);if(r.get(p)!==u&&(e.update(p),r.set(p,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return p}function a(){r=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:a}}class Rm extends Li{constructor(e,t,i,r,s,a,o,l,u,h){if(h=h!==void 0?h:Ws,h!==Ws&&h!==Qa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ws&&(i=hs),i===void 0&&h===Qa&&(i=qs),super(null,r,s,a,o,l,h,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:ai,this.minFilter=l!==void 0?l:ai,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Pm=new Li,Nm=new Rm(1,1);Nm.compareFunction=gm;const Im=new xm,Dm=new B1,Fm=new Tm,lp=[],cp=[],up=new Float32Array(16),hp=new Float32Array(9),dp=new Float32Array(4);function lo(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=lp[r];if(s===void 0&&(s=new Float32Array(r),lp[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Nn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function In(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Gc(n,e){let t=cp[e];t===void 0&&(t=new Int32Array(e),cp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function n_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function i_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;n.uniform2fv(this.addr,e),In(t,e)}}function r_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nn(t,e))return;n.uniform3fv(this.addr,e),In(t,e)}}function s_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;n.uniform4fv(this.addr,e),In(t,e)}}function a_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),In(t,e)}else{if(Nn(t,i))return;dp.set(i),n.uniformMatrix2fv(this.addr,!1,dp),In(t,i)}}function o_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),In(t,e)}else{if(Nn(t,i))return;hp.set(i),n.uniformMatrix3fv(this.addr,!1,hp),In(t,i)}}function l_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),In(t,e)}else{if(Nn(t,i))return;up.set(i),n.uniformMatrix4fv(this.addr,!1,up),In(t,i)}}function c_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function u_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;n.uniform2iv(this.addr,e),In(t,e)}}function h_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;n.uniform3iv(this.addr,e),In(t,e)}}function d_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;n.uniform4iv(this.addr,e),In(t,e)}}function f_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function p_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nn(t,e))return;n.uniform2uiv(this.addr,e),In(t,e)}}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nn(t,e))return;n.uniform3uiv(this.addr,e),In(t,e)}}function g_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nn(t,e))return;n.uniform4uiv(this.addr,e),In(t,e)}}function v_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Nm:Pm;t.setTexture2D(e||s,r)}function __(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Dm,r)}function y_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Fm,r)}function b_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Im,r)}function x_(n){switch(n){case 5126:return n_;case 35664:return i_;case 35665:return r_;case 35666:return s_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return u_;case 35668:case 35672:return h_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return v_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return b_}}function S_(n,e){n.uniform1fv(this.addr,e)}function w_(n,e){const t=lo(e,this.size,2);n.uniform2fv(this.addr,t)}function M_(n,e){const t=lo(e,this.size,3);n.uniform3fv(this.addr,t)}function A_(n,e){const t=lo(e,this.size,4);n.uniform4fv(this.addr,t)}function E_(n,e){const t=lo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function T_(n,e){const t=lo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function L_(n,e){const t=lo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function C_(n,e){n.uniform1iv(this.addr,e)}function R_(n,e){n.uniform2iv(this.addr,e)}function P_(n,e){n.uniform3iv(this.addr,e)}function N_(n,e){n.uniform4iv(this.addr,e)}function I_(n,e){n.uniform1uiv(this.addr,e)}function D_(n,e){n.uniform2uiv(this.addr,e)}function F_(n,e){n.uniform3uiv(this.addr,e)}function U_(n,e){n.uniform4uiv(this.addr,e)}function O_(n,e,t){const i=this.cache,r=e.length,s=Gc(t,r);Nn(i,s)||(n.uniform1iv(this.addr,s),In(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Pm,s[a])}function k_(n,e,t){const i=this.cache,r=e.length,s=Gc(t,r);Nn(i,s)||(n.uniform1iv(this.addr,s),In(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Dm,s[a])}function B_(n,e,t){const i=this.cache,r=e.length,s=Gc(t,r);Nn(i,s)||(n.uniform1iv(this.addr,s),In(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Fm,s[a])}function z_(n,e,t){const i=this.cache,r=e.length,s=Gc(t,r);Nn(i,s)||(n.uniform1iv(this.addr,s),In(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Im,s[a])}function G_(n){switch(n){case 5126:return S_;case 35664:return w_;case 35665:return M_;case 35666:return A_;case 35674:return E_;case 35675:return T_;case 35676:return L_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return P_;case 35669:case 35673:return N_;case 5125:return I_;case 36294:return D_;case 36295:return F_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return O_;case 35679:case 36299:case 36307:return k_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return z_}}class H_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=x_(t.type)}}class V_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=G_(t.type)}}class q_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ih=/(\w+)(\])?(\[|\.)?/g;function fp(n,e){n.seq.push(e),n.map[e.id]=e}function W_(n,e,t){const i=n.name,r=i.length;for(ih.lastIndex=0;;){const s=ih.exec(i),a=ih.lastIndex;let o=s[1];const l=s[2]==="]",u=s[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===r){fp(t,u===void 0?new H_(o,n,e):new V_(o,n,e));break}else{let p=t.map[o];p===void 0&&(p=new q_(o),fp(t,p)),t=p}}}class yc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);W_(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function pp(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const j_=37297;let X_=0;function Y_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function $_(n){const e=$t.getPrimaries($t.workingColorSpace),t=$t.getPrimaries(n);let i;switch(e===t?i="":e===Tc&&t===Ec?i="LinearDisplayP3ToLinearSRGB":e===Ec&&t===Tc&&(i="LinearSRGBToLinearDisplayP3"),n){case Vr:case kc:return[i,"LinearTransferOETF"];case Hn:case ed:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function mp(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Y_(n.getShaderSource(e),a)}else return r}function J_(n,e){const t=$_(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function K_(n,e){let t;switch(e){case $g:t="Linear";break;case Jg:t="Reinhard";break;case Kg:t="OptimizedCineon";break;case Zg:t="ACESFilmic";break;case e1:t="AgX";break;case Qg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Z_(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Va).join(`
`)}function Q_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Va).join(`
`)}function ey(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ty(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Va(n){return n!==""}function gp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ny=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(n){return n.replace(ny,ry)}const iy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ry(n,e){let t=Dt[e];if(t===void 0){const i=iy.get(e);if(i!==void 0)t=Dt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ch(t)}const sy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _p(n){return n.replace(sy,ay)}function ay(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function yp(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function oy(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===im?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===rm?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===zr&&(e="SHADOWMAP_TYPE_VSM"),e}function ly(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ka:case Za:e="ENVMAP_TYPE_CUBE";break;case Oc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cy(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Za:e="ENVMAP_MODE_REFRACTION";break}return e}function uy(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case sm:e="ENVMAP_BLENDING_MULTIPLY";break;case Xg:e="ENVMAP_BLENDING_MIX";break;case Yg:e="ENVMAP_BLENDING_ADD";break}return e}function hy(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function dy(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=oy(t),u=ly(t),h=cy(t),p=uy(t),g=hy(t),d=t.isWebGL2?"":Z_(t),x=Q_(t),b=ey(s),_=r.createProgram();let m,S,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Va).join(`
`),m.length>0&&(m+=`
`),S=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Va).join(`
`),S.length>0&&(S+=`
`)):(m=[yp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Va).join(`
`),S=[d,yp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gs?"#define TONE_MAPPING":"",t.toneMapping!==gs?Dt.tonemapping_pars_fragment:"",t.toneMapping!==gs?K_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,J_("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Va).join(`
`)),a=Ch(a),a=gp(a,t),a=vp(a,t),o=Ch(o),o=gp(o,t),o=vp(o,t),a=_p(a),o=_p(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Of?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Of?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const P=M+m+a,q=M+S+o,G=pp(r,r.VERTEX_SHADER,P),U=pp(r,r.FRAGMENT_SHADER,q);r.attachShader(_,G),r.attachShader(_,U),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function H(R){if(n.debug.checkShaderErrors){const X=r.getProgramInfoLog(_).trim(),N=r.getShaderInfoLog(G).trim(),J=r.getShaderInfoLog(U).trim();let Q=!0,ie=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,G,U);else{const ee=mp(r,G,"vertex"),te=mp(r,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Program Info Log: `+X+`
`+ee+`
`+te)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(N===""||J==="")&&(ie=!1);ie&&(R.diagnostics={runnable:Q,programLog:X,vertexShader:{log:N,prefix:m},fragmentShader:{log:J,prefix:S}})}r.deleteShader(G),r.deleteShader(U),A=new yc(r,_),D=ty(r,_)}let A;this.getUniforms=function(){return A===void 0&&H(this),A};let D;this.getAttributes=function(){return D===void 0&&H(this),D};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,j_)),E},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=X_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=G,this.fragmentShader=U,this}let fy=0;class py{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new my(e),t.set(e,i)),i}}class my{constructor(e){this.id=fy++,this.code=e,this.usedTimes=0}}function gy(n,e,t,i,r,s,a){const o=new id,l=new py,u=[],h=r.isWebGL2,p=r.logarithmicDepthBuffer,g=r.vertexTextures;let d=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(A){return A===0?"uv":`uv${A}`}function _(A,D,E,R,X){const N=R.fog,J=X.geometry,Q=A.isMeshStandardMaterial?R.environment:null,ie=(A.isMeshStandardMaterial?t:e).get(A.envMap||Q),ee=ie&&ie.mapping===Oc?ie.image.height:null,te=x[A.type];A.precision!==null&&(d=r.getMaxPrecision(A.precision),d!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",d,"instead."));const ae=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,xe=ae!==void 0?ae.length:0;let T=0;J.morphAttributes.position!==void 0&&(T=1),J.morphAttributes.normal!==void 0&&(T=2),J.morphAttributes.color!==void 0&&(T=3);let F,V,K,ne;if(te){const tn=gr[te];F=tn.vertexShader,V=tn.fragmentShader}else F=A.vertexShader,V=A.fragmentShader,l.update(A),K=l.getVertexShaderID(A),ne=l.getFragmentShaderID(A);const ce=n.getRenderTarget(),fe=X.isInstancedMesh===!0,pe=X.isBatchedMesh===!0,Ce=!!A.map,Ie=!!A.matcap,re=!!ie,Xe=!!A.aoMap,Ve=!!A.lightMap,_e=!!A.bumpMap,Y=!!A.normalMap,lt=!!A.displacementMap,He=!!A.emissiveMap,B=!!A.metalnessMap,I=!!A.roughnessMap,se=A.anisotropy>0,ye=A.clearcoat>0,Me=A.iridescence>0,Re=A.sheen>0,qe=A.transmission>0,Oe=se&&!!A.anisotropyMap,je=ye&&!!A.clearcoatMap,nt=ye&&!!A.clearcoatNormalMap,Je=ye&&!!A.clearcoatRoughnessMap,Pe=Me&&!!A.iridescenceMap,ze=Me&&!!A.iridescenceThicknessMap,pt=Re&&!!A.sheenColorMap,it=Re&&!!A.sheenRoughnessMap,ht=!!A.specularMap,$e=!!A.specularColorMap,ct=!!A.specularIntensityMap,It=qe&&!!A.transmissionMap,mt=qe&&!!A.thicknessMap,St=!!A.gradientMap,Be=!!A.alphaMap,le=A.alphaTest>0,Ke=!!A.alphaHash,We=!!A.extensions,Ye=!!J.attributes.uv1,Ze=!!J.attributes.uv2,Bt=!!J.attributes.uv3;let Et=gs;return A.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Et=n.toneMapping),{isWebGL2:h,shaderID:te,shaderType:A.type,shaderName:A.name,vertexShader:F,fragmentShader:V,defines:A.defines,customVertexShaderID:K,customFragmentShaderID:ne,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:d,batching:pe,instancing:fe,instancingColor:fe&&X.instanceColor!==null,supportsVertexTextures:g,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Vr,map:Ce,matcap:Ie,envMap:re,envMapMode:re&&ie.mapping,envMapCubeUVHeight:ee,aoMap:Xe,lightMap:Ve,bumpMap:_e,normalMap:Y,displacementMap:g&&lt,emissiveMap:He,normalMapObjectSpace:Y&&A.normalMapType===d1,normalMapTangentSpace:Y&&A.normalMapType===mm,metalnessMap:B,roughnessMap:I,anisotropy:se,anisotropyMap:Oe,clearcoat:ye,clearcoatMap:je,clearcoatNormalMap:nt,clearcoatRoughnessMap:Je,iridescence:Me,iridescenceMap:Pe,iridescenceThicknessMap:ze,sheen:Re,sheenColorMap:pt,sheenRoughnessMap:it,specularMap:ht,specularColorMap:$e,specularIntensityMap:ct,transmission:qe,transmissionMap:It,thicknessMap:mt,gradientMap:St,opaque:A.transparent===!1&&A.blending===Wa,alphaMap:Be,alphaTest:le,alphaHash:Ke,combine:A.combine,mapUv:Ce&&b(A.map.channel),aoMapUv:Xe&&b(A.aoMap.channel),lightMapUv:Ve&&b(A.lightMap.channel),bumpMapUv:_e&&b(A.bumpMap.channel),normalMapUv:Y&&b(A.normalMap.channel),displacementMapUv:lt&&b(A.displacementMap.channel),emissiveMapUv:He&&b(A.emissiveMap.channel),metalnessMapUv:B&&b(A.metalnessMap.channel),roughnessMapUv:I&&b(A.roughnessMap.channel),anisotropyMapUv:Oe&&b(A.anisotropyMap.channel),clearcoatMapUv:je&&b(A.clearcoatMap.channel),clearcoatNormalMapUv:nt&&b(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Je&&b(A.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&b(A.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&b(A.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&b(A.sheenColorMap.channel),sheenRoughnessMapUv:it&&b(A.sheenRoughnessMap.channel),specularMapUv:ht&&b(A.specularMap.channel),specularColorMapUv:$e&&b(A.specularColorMap.channel),specularIntensityMapUv:ct&&b(A.specularIntensityMap.channel),transmissionMapUv:It&&b(A.transmissionMap.channel),thicknessMapUv:mt&&b(A.thicknessMap.channel),alphaMapUv:Be&&b(A.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Y||se),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,vertexUv1s:Ye,vertexUv2s:Ze,vertexUv3s:Bt,pointsUvs:X.isPoints===!0&&!!J.attributes.uv&&(Ce||Be),fog:!!N,useFog:A.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:X.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:T,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:A.dithering,shadowMapEnabled:n.shadowMap.enabled&&E.length>0,shadowMapType:n.shadowMap.type,toneMapping:Et,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ce&&A.map.isVideoTexture===!0&&$t.getTransfer(A.map.colorSpace)===on,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===vr,flipSided:A.side===vi,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:We&&A.extensions.derivatives===!0,extensionFragDepth:We&&A.extensions.fragDepth===!0,extensionDrawBuffers:We&&A.extensions.drawBuffers===!0,extensionShaderTextureLOD:We&&A.extensions.shaderTextureLOD===!0,extensionClipCullDistance:We&&A.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()}}function m(A){const D=[];if(A.shaderID?D.push(A.shaderID):(D.push(A.customVertexShaderID),D.push(A.customFragmentShaderID)),A.defines!==void 0)for(const E in A.defines)D.push(E),D.push(A.defines[E]);return A.isRawShaderMaterial===!1&&(S(D,A),M(D,A),D.push(n.outputColorSpace)),D.push(A.customProgramCacheKey),D.join()}function S(A,D){A.push(D.precision),A.push(D.outputColorSpace),A.push(D.envMapMode),A.push(D.envMapCubeUVHeight),A.push(D.mapUv),A.push(D.alphaMapUv),A.push(D.lightMapUv),A.push(D.aoMapUv),A.push(D.bumpMapUv),A.push(D.normalMapUv),A.push(D.displacementMapUv),A.push(D.emissiveMapUv),A.push(D.metalnessMapUv),A.push(D.roughnessMapUv),A.push(D.anisotropyMapUv),A.push(D.clearcoatMapUv),A.push(D.clearcoatNormalMapUv),A.push(D.clearcoatRoughnessMapUv),A.push(D.iridescenceMapUv),A.push(D.iridescenceThicknessMapUv),A.push(D.sheenColorMapUv),A.push(D.sheenRoughnessMapUv),A.push(D.specularMapUv),A.push(D.specularColorMapUv),A.push(D.specularIntensityMapUv),A.push(D.transmissionMapUv),A.push(D.thicknessMapUv),A.push(D.combine),A.push(D.fogExp2),A.push(D.sizeAttenuation),A.push(D.morphTargetsCount),A.push(D.morphAttributeCount),A.push(D.numDirLights),A.push(D.numPointLights),A.push(D.numSpotLights),A.push(D.numSpotLightMaps),A.push(D.numHemiLights),A.push(D.numRectAreaLights),A.push(D.numDirLightShadows),A.push(D.numPointLightShadows),A.push(D.numSpotLightShadows),A.push(D.numSpotLightShadowsWithMaps),A.push(D.numLightProbes),A.push(D.shadowMapType),A.push(D.toneMapping),A.push(D.numClippingPlanes),A.push(D.numClipIntersection),A.push(D.depthPacking)}function M(A,D){o.disableAll(),D.isWebGL2&&o.enable(0),D.supportsVertexTextures&&o.enable(1),D.instancing&&o.enable(2),D.instancingColor&&o.enable(3),D.matcap&&o.enable(4),D.envMap&&o.enable(5),D.normalMapObjectSpace&&o.enable(6),D.normalMapTangentSpace&&o.enable(7),D.clearcoat&&o.enable(8),D.iridescence&&o.enable(9),D.alphaTest&&o.enable(10),D.vertexColors&&o.enable(11),D.vertexAlphas&&o.enable(12),D.vertexUv1s&&o.enable(13),D.vertexUv2s&&o.enable(14),D.vertexUv3s&&o.enable(15),D.vertexTangents&&o.enable(16),D.anisotropy&&o.enable(17),D.alphaHash&&o.enable(18),D.batching&&o.enable(19),A.push(o.mask),o.disableAll(),D.fog&&o.enable(0),D.useFog&&o.enable(1),D.flatShading&&o.enable(2),D.logarithmicDepthBuffer&&o.enable(3),D.skinning&&o.enable(4),D.morphTargets&&o.enable(5),D.morphNormals&&o.enable(6),D.morphColors&&o.enable(7),D.premultipliedAlpha&&o.enable(8),D.shadowMapEnabled&&o.enable(9),D.useLegacyLights&&o.enable(10),D.doubleSided&&o.enable(11),D.flipSided&&o.enable(12),D.useDepthPacking&&o.enable(13),D.dithering&&o.enable(14),D.transmission&&o.enable(15),D.sheen&&o.enable(16),D.opaque&&o.enable(17),D.pointsUvs&&o.enable(18),D.decodeVideoTexture&&o.enable(19),A.push(o.mask)}function P(A){const D=x[A.type];let E;if(D){const R=gr[D];E=Z1.clone(R.uniforms)}else E=A.uniforms;return E}function q(A,D){let E;for(let R=0,X=u.length;R<X;R++){const N=u[R];if(N.cacheKey===D){E=N,++E.usedTimes;break}}return E===void 0&&(E=new dy(n,D,A,s),u.push(E)),E}function G(A){if(--A.usedTimes===0){const D=u.indexOf(A);u[D]=u[u.length-1],u.pop(),A.destroy()}}function U(A){l.remove(A)}function H(){l.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:P,acquireProgram:q,releaseProgram:G,releaseShaderCache:U,programs:u,dispose:H}}function vy(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function _y(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function bp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function xp(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(p,g,d,x,b,_){let m=n[e];return m===void 0?(m={id:p.id,object:p,geometry:g,material:d,groupOrder:x,renderOrder:p.renderOrder,z:b,group:_},n[e]=m):(m.id=p.id,m.object=p,m.geometry=g,m.material=d,m.groupOrder=x,m.renderOrder=p.renderOrder,m.z=b,m.group=_),e++,m}function o(p,g,d,x,b,_){const m=a(p,g,d,x,b,_);d.transmission>0?i.push(m):d.transparent===!0?r.push(m):t.push(m)}function l(p,g,d,x,b,_){const m=a(p,g,d,x,b,_);d.transmission>0?i.unshift(m):d.transparent===!0?r.unshift(m):t.unshift(m)}function u(p,g){t.length>1&&t.sort(p||_y),i.length>1&&i.sort(g||bp),r.length>1&&r.sort(g||bp)}function h(){for(let p=e,g=n.length;p<g;p++){const d=n[p];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:h,sort:u}}function yy(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new xp,n.set(i,[a])):r>=s.length?(a=new xp,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function by(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new be,color:new Ut};break;case"SpotLight":t={position:new be,direction:new be,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new be,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":t={direction:new be,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":t={color:new Ut,position:new be,halfWidth:new be,halfHeight:new be};break}return n[e.id]=t,t}}}function xy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Sy=0;function wy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function My(n,e){const t=new by,i=xy(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new be);const s=new be,a=new wn,o=new wn;function l(h,p){let g=0,d=0,x=0;for(let R=0;R<9;R++)r.probe[R].set(0,0,0);let b=0,_=0,m=0,S=0,M=0,P=0,q=0,G=0,U=0,H=0,A=0;h.sort(wy);const D=p===!0?Math.PI:1;for(let R=0,X=h.length;R<X;R++){const N=h[R],J=N.color,Q=N.intensity,ie=N.distance,ee=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)g+=J.r*Q*D,d+=J.g*Q*D,x+=J.b*Q*D;else if(N.isLightProbe){for(let te=0;te<9;te++)r.probe[te].addScaledVector(N.sh.coefficients[te],Q);A++}else if(N.isDirectionalLight){const te=t.get(N);if(te.color.copy(N.color).multiplyScalar(N.intensity*D),N.castShadow){const ae=N.shadow,xe=i.get(N);xe.shadowBias=ae.bias,xe.shadowNormalBias=ae.normalBias,xe.shadowRadius=ae.radius,xe.shadowMapSize=ae.mapSize,r.directionalShadow[b]=xe,r.directionalShadowMap[b]=ee,r.directionalShadowMatrix[b]=N.shadow.matrix,P++}r.directional[b]=te,b++}else if(N.isSpotLight){const te=t.get(N);te.position.setFromMatrixPosition(N.matrixWorld),te.color.copy(J).multiplyScalar(Q*D),te.distance=ie,te.coneCos=Math.cos(N.angle),te.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),te.decay=N.decay,r.spot[m]=te;const ae=N.shadow;if(N.map&&(r.spotLightMap[U]=N.map,U++,ae.updateMatrices(N),N.castShadow&&H++),r.spotLightMatrix[m]=ae.matrix,N.castShadow){const xe=i.get(N);xe.shadowBias=ae.bias,xe.shadowNormalBias=ae.normalBias,xe.shadowRadius=ae.radius,xe.shadowMapSize=ae.mapSize,r.spotShadow[m]=xe,r.spotShadowMap[m]=ee,G++}m++}else if(N.isRectAreaLight){const te=t.get(N);te.color.copy(J).multiplyScalar(Q),te.halfWidth.set(N.width*.5,0,0),te.halfHeight.set(0,N.height*.5,0),r.rectArea[S]=te,S++}else if(N.isPointLight){const te=t.get(N);if(te.color.copy(N.color).multiplyScalar(N.intensity*D),te.distance=N.distance,te.decay=N.decay,N.castShadow){const ae=N.shadow,xe=i.get(N);xe.shadowBias=ae.bias,xe.shadowNormalBias=ae.normalBias,xe.shadowRadius=ae.radius,xe.shadowMapSize=ae.mapSize,xe.shadowCameraNear=ae.camera.near,xe.shadowCameraFar=ae.camera.far,r.pointShadow[_]=xe,r.pointShadowMap[_]=ee,r.pointShadowMatrix[_]=N.shadow.matrix,q++}r.point[_]=te,_++}else if(N.isHemisphereLight){const te=t.get(N);te.skyColor.copy(N.color).multiplyScalar(Q*D),te.groundColor.copy(N.groundColor).multiplyScalar(Q*D),r.hemi[M]=te,M++}}S>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=et.LTC_FLOAT_1,r.rectAreaLTC2=et.LTC_FLOAT_2):(r.rectAreaLTC1=et.LTC_HALF_1,r.rectAreaLTC2=et.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=et.LTC_FLOAT_1,r.rectAreaLTC2=et.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=et.LTC_HALF_1,r.rectAreaLTC2=et.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=g,r.ambient[1]=d,r.ambient[2]=x;const E=r.hash;(E.directionalLength!==b||E.pointLength!==_||E.spotLength!==m||E.rectAreaLength!==S||E.hemiLength!==M||E.numDirectionalShadows!==P||E.numPointShadows!==q||E.numSpotShadows!==G||E.numSpotMaps!==U||E.numLightProbes!==A)&&(r.directional.length=b,r.spot.length=m,r.rectArea.length=S,r.point.length=_,r.hemi.length=M,r.directionalShadow.length=P,r.directionalShadowMap.length=P,r.pointShadow.length=q,r.pointShadowMap.length=q,r.spotShadow.length=G,r.spotShadowMap.length=G,r.directionalShadowMatrix.length=P,r.pointShadowMatrix.length=q,r.spotLightMatrix.length=G+U-H,r.spotLightMap.length=U,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=A,E.directionalLength=b,E.pointLength=_,E.spotLength=m,E.rectAreaLength=S,E.hemiLength=M,E.numDirectionalShadows=P,E.numPointShadows=q,E.numSpotShadows=G,E.numSpotMaps=U,E.numLightProbes=A,r.version=Sy++)}function u(h,p){let g=0,d=0,x=0,b=0,_=0;const m=p.matrixWorldInverse;for(let S=0,M=h.length;S<M;S++){const P=h[S];if(P.isDirectionalLight){const q=r.directional[g];q.direction.setFromMatrixPosition(P.matrixWorld),s.setFromMatrixPosition(P.target.matrixWorld),q.direction.sub(s),q.direction.transformDirection(m),g++}else if(P.isSpotLight){const q=r.spot[x];q.position.setFromMatrixPosition(P.matrixWorld),q.position.applyMatrix4(m),q.direction.setFromMatrixPosition(P.matrixWorld),s.setFromMatrixPosition(P.target.matrixWorld),q.direction.sub(s),q.direction.transformDirection(m),x++}else if(P.isRectAreaLight){const q=r.rectArea[b];q.position.setFromMatrixPosition(P.matrixWorld),q.position.applyMatrix4(m),o.identity(),a.copy(P.matrixWorld),a.premultiply(m),o.extractRotation(a),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),q.halfWidth.applyMatrix4(o),q.halfHeight.applyMatrix4(o),b++}else if(P.isPointLight){const q=r.point[d];q.position.setFromMatrixPosition(P.matrixWorld),q.position.applyMatrix4(m),d++}else if(P.isHemisphereLight){const q=r.hemi[_];q.direction.setFromMatrixPosition(P.matrixWorld),q.direction.transformDirection(m),_++}}}return{setup:l,setupView:u,state:r}}function Sp(n,e){const t=new My(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(p){i.push(p)}function o(p){r.push(p)}function l(p){t.setup(i,p)}function u(p){t.setupView(i,p)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o}}function Ay(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Sp(n,e),t.set(s,[l])):a>=o.length?(l=new Sp(n,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class Ey extends oo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=u1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ty extends oo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ly=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ry(n,e,t){let i=new sd;const r=new kt,s=new kt,a=new un,o=new Ey({depthPacking:h1}),l=new Ty,u={},h=t.maxTextureSize,p={[_s]:vi,[vi]:_s,[vr]:vr},g=new Js({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:Ly,fragmentShader:Cy}),d=g.clone();d.defines.HORIZONTAL_PASS=1;const x=new qi;x.setAttribute("position",new ar(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ht(x,g),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=im;let m=this.type;this.render=function(G,U,H){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||G.length===0)return;const A=n.getRenderTarget(),D=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),R=n.state;R.setBlending(ms),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const X=m!==zr&&this.type===zr,N=m===zr&&this.type!==zr;for(let J=0,Q=G.length;J<Q;J++){const ie=G[J],ee=ie.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;r.copy(ee.mapSize);const te=ee.getFrameExtents();if(r.multiply(te),s.copy(ee.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/te.x),r.x=s.x*te.x,ee.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/te.y),r.y=s.y*te.y,ee.mapSize.y=s.y)),ee.map===null||X===!0||N===!0){const xe=this.type!==zr?{minFilter:ai,magFilter:ai}:{};ee.map!==null&&ee.map.dispose(),ee.map=new $s(r.x,r.y,xe),ee.map.texture.name=ie.name+".shadowMap",ee.camera.updateProjectionMatrix()}n.setRenderTarget(ee.map),n.clear();const ae=ee.getViewportCount();for(let xe=0;xe<ae;xe++){const T=ee.getViewport(xe);a.set(s.x*T.x,s.y*T.y,s.x*T.z,s.y*T.w),R.viewport(a),ee.updateMatrices(ie,xe),i=ee.getFrustum(),P(U,H,ee.camera,ie,this.type)}ee.isPointLightShadow!==!0&&this.type===zr&&S(ee,H),ee.needsUpdate=!1}m=this.type,_.needsUpdate=!1,n.setRenderTarget(A,D,E)};function S(G,U){const H=e.update(b);g.defines.VSM_SAMPLES!==G.blurSamples&&(g.defines.VSM_SAMPLES=G.blurSamples,d.defines.VSM_SAMPLES=G.blurSamples,g.needsUpdate=!0,d.needsUpdate=!0),G.mapPass===null&&(G.mapPass=new $s(r.x,r.y)),g.uniforms.shadow_pass.value=G.map.texture,g.uniforms.resolution.value=G.mapSize,g.uniforms.radius.value=G.radius,n.setRenderTarget(G.mapPass),n.clear(),n.renderBufferDirect(U,null,H,g,b,null),d.uniforms.shadow_pass.value=G.mapPass.texture,d.uniforms.resolution.value=G.mapSize,d.uniforms.radius.value=G.radius,n.setRenderTarget(G.map),n.clear(),n.renderBufferDirect(U,null,H,d,b,null)}function M(G,U,H,A){let D=null;const E=H.isPointLight===!0?G.customDistanceMaterial:G.customDepthMaterial;if(E!==void 0)D=E;else if(D=H.isPointLight===!0?l:o,n.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const R=D.uuid,X=U.uuid;let N=u[R];N===void 0&&(N={},u[R]=N);let J=N[X];J===void 0&&(J=D.clone(),N[X]=J,U.addEventListener("dispose",q)),D=J}if(D.visible=U.visible,D.wireframe=U.wireframe,A===zr?D.side=U.shadowSide!==null?U.shadowSide:U.side:D.side=U.shadowSide!==null?U.shadowSide:p[U.side],D.alphaMap=U.alphaMap,D.alphaTest=U.alphaTest,D.map=U.map,D.clipShadows=U.clipShadows,D.clippingPlanes=U.clippingPlanes,D.clipIntersection=U.clipIntersection,D.displacementMap=U.displacementMap,D.displacementScale=U.displacementScale,D.displacementBias=U.displacementBias,D.wireframeLinewidth=U.wireframeLinewidth,D.linewidth=U.linewidth,H.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const R=n.properties.get(D);R.light=H}return D}function P(G,U,H,A,D){if(G.visible===!1)return;if(G.layers.test(U.layers)&&(G.isMesh||G.isLine||G.isPoints)&&(G.castShadow||G.receiveShadow&&D===zr)&&(!G.frustumCulled||i.intersectsObject(G))){G.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,G.matrixWorld);const X=e.update(G),N=G.material;if(Array.isArray(N)){const J=X.groups;for(let Q=0,ie=J.length;Q<ie;Q++){const ee=J[Q],te=N[ee.materialIndex];if(te&&te.visible){const ae=M(G,te,A,D);G.onBeforeShadow(n,G,U,H,X,ae,ee),n.renderBufferDirect(H,null,X,ae,G,ee),G.onAfterShadow(n,G,U,H,X,ae,ee)}}}else if(N.visible){const J=M(G,N,A,D);G.onBeforeShadow(n,G,U,H,X,J,null),n.renderBufferDirect(H,null,X,J,G,null),G.onAfterShadow(n,G,U,H,X,J,null)}}const R=G.children;for(let X=0,N=R.length;X<N;X++)P(R[X],U,H,A,D)}function q(G){G.target.removeEventListener("dispose",q);for(const H in u){const A=u[H],D=G.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function Py(n,e,t){const i=t.isWebGL2;function r(){let le=!1;const Ke=new un;let We=null;const Ye=new un(0,0,0,0);return{setMask:function(Ze){We!==Ze&&!le&&(n.colorMask(Ze,Ze,Ze,Ze),We=Ze)},setLocked:function(Ze){le=Ze},setClear:function(Ze,Bt,Et,qt,tn){tn===!0&&(Ze*=qt,Bt*=qt,Et*=qt),Ke.set(Ze,Bt,Et,qt),Ye.equals(Ke)===!1&&(n.clearColor(Ze,Bt,Et,qt),Ye.copy(Ke))},reset:function(){le=!1,We=null,Ye.set(-1,0,0,0)}}}function s(){let le=!1,Ke=null,We=null,Ye=null;return{setTest:function(Ze){Ze?pe(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(Ze){Ke!==Ze&&!le&&(n.depthMask(Ze),Ke=Ze)},setFunc:function(Ze){if(We!==Ze){switch(Ze){case zg:n.depthFunc(n.NEVER);break;case Gg:n.depthFunc(n.ALWAYS);break;case Hg:n.depthFunc(n.LESS);break;case Mc:n.depthFunc(n.LEQUAL);break;case Vg:n.depthFunc(n.EQUAL);break;case qg:n.depthFunc(n.GEQUAL);break;case Wg:n.depthFunc(n.GREATER);break;case jg:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}We=Ze}},setLocked:function(Ze){le=Ze},setClear:function(Ze){Ye!==Ze&&(n.clearDepth(Ze),Ye=Ze)},reset:function(){le=!1,Ke=null,We=null,Ye=null}}}function a(){let le=!1,Ke=null,We=null,Ye=null,Ze=null,Bt=null,Et=null,qt=null,tn=null;return{setTest:function(tt){le||(tt?pe(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(tt){Ke!==tt&&!le&&(n.stencilMask(tt),Ke=tt)},setFunc:function(tt,Jt,gn){(We!==tt||Ye!==Jt||Ze!==gn)&&(n.stencilFunc(tt,Jt,gn),We=tt,Ye=Jt,Ze=gn)},setOp:function(tt,Jt,gn){(Bt!==tt||Et!==Jt||qt!==gn)&&(n.stencilOp(tt,Jt,gn),Bt=tt,Et=Jt,qt=gn)},setLocked:function(tt){le=tt},setClear:function(tt){tn!==tt&&(n.clearStencil(tt),tn=tt)},reset:function(){le=!1,Ke=null,We=null,Ye=null,Ze=null,Bt=null,Et=null,qt=null,tn=null}}}const o=new r,l=new s,u=new a,h=new WeakMap,p=new WeakMap;let g={},d={},x=new WeakMap,b=[],_=null,m=!1,S=null,M=null,P=null,q=null,G=null,U=null,H=null,A=new Ut(0,0,0),D=0,E=!1,R=null,X=null,N=null,J=null,Q=null;const ie=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,te=0;const ae=n.getParameter(n.VERSION);ae.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(ae)[1]),ee=te>=1):ae.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),ee=te>=2);let xe=null,T={};const F=n.getParameter(n.SCISSOR_BOX),V=n.getParameter(n.VIEWPORT),K=new un().fromArray(F),ne=new un().fromArray(V);function ce(le,Ke,We,Ye){const Ze=new Uint8Array(4),Bt=n.createTexture();n.bindTexture(le,Bt),n.texParameteri(le,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(le,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Et=0;Et<We;Et++)i&&(le===n.TEXTURE_3D||le===n.TEXTURE_2D_ARRAY)?n.texImage3D(Ke,0,n.RGBA,1,1,Ye,0,n.RGBA,n.UNSIGNED_BYTE,Ze):n.texImage2D(Ke+Et,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ze);return Bt}const fe={};fe[n.TEXTURE_2D]=ce(n.TEXTURE_2D,n.TEXTURE_2D,1),fe[n.TEXTURE_CUBE_MAP]=ce(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(fe[n.TEXTURE_2D_ARRAY]=ce(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),fe[n.TEXTURE_3D]=ce(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),u.setClear(0),pe(n.DEPTH_TEST),l.setFunc(Mc),He(!1),B(nf),pe(n.CULL_FACE),Y(ms);function pe(le){g[le]!==!0&&(n.enable(le),g[le]=!0)}function Ce(le){g[le]!==!1&&(n.disable(le),g[le]=!1)}function Ie(le,Ke){return d[le]!==Ke?(n.bindFramebuffer(le,Ke),d[le]=Ke,i&&(le===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Ke),le===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Ke)),!0):!1}function re(le,Ke){let We=b,Ye=!1;if(le)if(We=x.get(Ke),We===void 0&&(We=[],x.set(Ke,We)),le.isWebGLMultipleRenderTargets){const Ze=le.texture;if(We.length!==Ze.length||We[0]!==n.COLOR_ATTACHMENT0){for(let Bt=0,Et=Ze.length;Bt<Et;Bt++)We[Bt]=n.COLOR_ATTACHMENT0+Bt;We.length=Ze.length,Ye=!0}}else We[0]!==n.COLOR_ATTACHMENT0&&(We[0]=n.COLOR_ATTACHMENT0,Ye=!0);else We[0]!==n.BACK&&(We[0]=n.BACK,Ye=!0);Ye&&(t.isWebGL2?n.drawBuffers(We):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(We))}function Xe(le){return _!==le?(n.useProgram(le),_=le,!0):!1}const Ve={[Gs]:n.FUNC_ADD,[Ag]:n.FUNC_SUBTRACT,[Eg]:n.FUNC_REVERSE_SUBTRACT};if(i)Ve[of]=n.MIN,Ve[lf]=n.MAX;else{const le=e.get("EXT_blend_minmax");le!==null&&(Ve[of]=le.MIN_EXT,Ve[lf]=le.MAX_EXT)}const _e={[Tg]:n.ZERO,[Lg]:n.ONE,[Cg]:n.SRC_COLOR,[xh]:n.SRC_ALPHA,[Fg]:n.SRC_ALPHA_SATURATE,[Ig]:n.DST_COLOR,[Pg]:n.DST_ALPHA,[Rg]:n.ONE_MINUS_SRC_COLOR,[Sh]:n.ONE_MINUS_SRC_ALPHA,[Dg]:n.ONE_MINUS_DST_COLOR,[Ng]:n.ONE_MINUS_DST_ALPHA,[Ug]:n.CONSTANT_COLOR,[Og]:n.ONE_MINUS_CONSTANT_COLOR,[kg]:n.CONSTANT_ALPHA,[Bg]:n.ONE_MINUS_CONSTANT_ALPHA};function Y(le,Ke,We,Ye,Ze,Bt,Et,qt,tn,tt){if(le===ms){m===!0&&(Ce(n.BLEND),m=!1);return}if(m===!1&&(pe(n.BLEND),m=!0),le!==Mg){if(le!==S||tt!==E){if((M!==Gs||G!==Gs)&&(n.blendEquation(n.FUNC_ADD),M=Gs,G=Gs),tt)switch(le){case Wa:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rf:n.blendFunc(n.ONE,n.ONE);break;case sf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case af:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",le);break}else switch(le){case Wa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rf:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case sf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case af:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",le);break}P=null,q=null,U=null,H=null,A.set(0,0,0),D=0,S=le,E=tt}return}Ze=Ze||Ke,Bt=Bt||We,Et=Et||Ye,(Ke!==M||Ze!==G)&&(n.blendEquationSeparate(Ve[Ke],Ve[Ze]),M=Ke,G=Ze),(We!==P||Ye!==q||Bt!==U||Et!==H)&&(n.blendFuncSeparate(_e[We],_e[Ye],_e[Bt],_e[Et]),P=We,q=Ye,U=Bt,H=Et),(qt.equals(A)===!1||tn!==D)&&(n.blendColor(qt.r,qt.g,qt.b,tn),A.copy(qt),D=tn),S=le,E=!1}function lt(le,Ke){le.side===vr?Ce(n.CULL_FACE):pe(n.CULL_FACE);let We=le.side===vi;Ke&&(We=!We),He(We),le.blending===Wa&&le.transparent===!1?Y(ms):Y(le.blending,le.blendEquation,le.blendSrc,le.blendDst,le.blendEquationAlpha,le.blendSrcAlpha,le.blendDstAlpha,le.blendColor,le.blendAlpha,le.premultipliedAlpha),l.setFunc(le.depthFunc),l.setTest(le.depthTest),l.setMask(le.depthWrite),o.setMask(le.colorWrite);const Ye=le.stencilWrite;u.setTest(Ye),Ye&&(u.setMask(le.stencilWriteMask),u.setFunc(le.stencilFunc,le.stencilRef,le.stencilFuncMask),u.setOp(le.stencilFail,le.stencilZFail,le.stencilZPass)),se(le.polygonOffset,le.polygonOffsetFactor,le.polygonOffsetUnits),le.alphaToCoverage===!0?pe(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(le){R!==le&&(le?n.frontFace(n.CW):n.frontFace(n.CCW),R=le)}function B(le){le!==Sg?(pe(n.CULL_FACE),le!==X&&(le===nf?n.cullFace(n.BACK):le===wg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),X=le}function I(le){le!==N&&(ee&&n.lineWidth(le),N=le)}function se(le,Ke,We){le?(pe(n.POLYGON_OFFSET_FILL),(J!==Ke||Q!==We)&&(n.polygonOffset(Ke,We),J=Ke,Q=We)):Ce(n.POLYGON_OFFSET_FILL)}function ye(le){le?pe(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function Me(le){le===void 0&&(le=n.TEXTURE0+ie-1),xe!==le&&(n.activeTexture(le),xe=le)}function Re(le,Ke,We){We===void 0&&(xe===null?We=n.TEXTURE0+ie-1:We=xe);let Ye=T[We];Ye===void 0&&(Ye={type:void 0,texture:void 0},T[We]=Ye),(Ye.type!==le||Ye.texture!==Ke)&&(xe!==We&&(n.activeTexture(We),xe=We),n.bindTexture(le,Ke||fe[le]),Ye.type=le,Ye.texture=Ke)}function qe(){const le=T[xe];le!==void 0&&le.type!==void 0&&(n.bindTexture(le.type,null),le.type=void 0,le.texture=void 0)}function Oe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function je(){try{n.compressedTexImage3D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function nt(){try{n.texSubImage2D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function Je(){try{n.texSubImage3D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function Pe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function ze(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function pt(){try{n.texStorage2D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function it(){try{n.texStorage3D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function ht(){try{n.texImage2D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function $e(){try{n.texImage3D.apply(n,arguments)}catch(le){console.error("THREE.WebGLState:",le)}}function ct(le){K.equals(le)===!1&&(n.scissor(le.x,le.y,le.z,le.w),K.copy(le))}function It(le){ne.equals(le)===!1&&(n.viewport(le.x,le.y,le.z,le.w),ne.copy(le))}function mt(le,Ke){let We=p.get(Ke);We===void 0&&(We=new WeakMap,p.set(Ke,We));let Ye=We.get(le);Ye===void 0&&(Ye=n.getUniformBlockIndex(Ke,le.name),We.set(le,Ye))}function St(le,Ke){const Ye=p.get(Ke).get(le);h.get(Ke)!==Ye&&(n.uniformBlockBinding(Ke,Ye,le.__bindingPointIndex),h.set(Ke,Ye))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),g={},xe=null,T={},d={},x=new WeakMap,b=[],_=null,m=!1,S=null,M=null,P=null,q=null,G=null,U=null,H=null,A=new Ut(0,0,0),D=0,E=!1,R=null,X=null,N=null,J=null,Q=null,K.set(0,0,n.canvas.width,n.canvas.height),ne.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),u.reset()}return{buffers:{color:o,depth:l,stencil:u},enable:pe,disable:Ce,bindFramebuffer:Ie,drawBuffers:re,useProgram:Xe,setBlending:Y,setMaterial:lt,setFlipSided:He,setCullFace:B,setLineWidth:I,setPolygonOffset:se,setScissorTest:ye,activeTexture:Me,bindTexture:Re,unbindTexture:qe,compressedTexImage2D:Oe,compressedTexImage3D:je,texImage2D:ht,texImage3D:$e,updateUBOMapping:mt,uniformBlockBinding:St,texStorage2D:pt,texStorage3D:it,texSubImage2D:nt,texSubImage3D:Je,compressedTexSubImage2D:Pe,compressedTexSubImage3D:ze,scissor:ct,viewport:It,reset:Be}}function Ny(n,e,t,i,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let p;const g=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(B,I){return d?new OffscreenCanvas(B,I):Rc("canvas")}function b(B,I,se,ye){let Me=1;if((B.width>ye||B.height>ye)&&(Me=ye/Math.max(B.width,B.height)),Me<1||I===!0)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap){const Re=I?Cc:Math.floor,qe=Re(Me*B.width),Oe=Re(Me*B.height);p===void 0&&(p=x(qe,Oe));const je=se?x(qe,Oe):p;return je.width=qe,je.height=Oe,je.getContext("2d").drawImage(B,0,0,qe,Oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+qe+"x"+Oe+")."),je}else return"data"in B&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),B;return B}function _(B){return Lh(B.width)&&Lh(B.height)}function m(B){return o?!1:B.wrapS!==ir||B.wrapT!==ir||B.minFilter!==ai&&B.minFilter!==Gi}function S(B,I){return B.generateMipmaps&&I&&B.minFilter!==ai&&B.minFilter!==Gi}function M(B){n.generateMipmap(B)}function P(B,I,se,ye,Me=!1){if(o===!1)return I;if(B!==null){if(n[B]!==void 0)return n[B];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let Re=I;if(I===n.RED&&(se===n.FLOAT&&(Re=n.R32F),se===n.HALF_FLOAT&&(Re=n.R16F),se===n.UNSIGNED_BYTE&&(Re=n.R8)),I===n.RED_INTEGER&&(se===n.UNSIGNED_BYTE&&(Re=n.R8UI),se===n.UNSIGNED_SHORT&&(Re=n.R16UI),se===n.UNSIGNED_INT&&(Re=n.R32UI),se===n.BYTE&&(Re=n.R8I),se===n.SHORT&&(Re=n.R16I),se===n.INT&&(Re=n.R32I)),I===n.RG&&(se===n.FLOAT&&(Re=n.RG32F),se===n.HALF_FLOAT&&(Re=n.RG16F),se===n.UNSIGNED_BYTE&&(Re=n.RG8)),I===n.RGBA){const qe=Me?Ac:$t.getTransfer(ye);se===n.FLOAT&&(Re=n.RGBA32F),se===n.HALF_FLOAT&&(Re=n.RGBA16F),se===n.UNSIGNED_BYTE&&(Re=qe===on?n.SRGB8_ALPHA8:n.RGBA8),se===n.UNSIGNED_SHORT_4_4_4_4&&(Re=n.RGBA4),se===n.UNSIGNED_SHORT_5_5_5_1&&(Re=n.RGB5_A1)}return(Re===n.R16F||Re===n.R32F||Re===n.RG16F||Re===n.RG32F||Re===n.RGBA16F||Re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Re}function q(B,I,se){return S(B,se)===!0||B.isFramebufferTexture&&B.minFilter!==ai&&B.minFilter!==Gi?Math.log2(Math.max(I.width,I.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?I.mipmaps.length:1}function G(B){return B===ai||B===cf||B===Ru?n.NEAREST:n.LINEAR}function U(B){const I=B.target;I.removeEventListener("dispose",U),A(I),I.isVideoTexture&&h.delete(I)}function H(B){const I=B.target;I.removeEventListener("dispose",H),E(I)}function A(B){const I=i.get(B);if(I.__webglInit===void 0)return;const se=B.source,ye=g.get(se);if(ye){const Me=ye[I.__cacheKey];Me.usedTimes--,Me.usedTimes===0&&D(B),Object.keys(ye).length===0&&g.delete(se)}i.remove(B)}function D(B){const I=i.get(B);n.deleteTexture(I.__webglTexture);const se=B.source,ye=g.get(se);delete ye[I.__cacheKey],a.memory.textures--}function E(B){const I=B.texture,se=i.get(B),ye=i.get(I);if(ye.__webglTexture!==void 0&&(n.deleteTexture(ye.__webglTexture),a.memory.textures--),B.depthTexture&&B.depthTexture.dispose(),B.isWebGLCubeRenderTarget)for(let Me=0;Me<6;Me++){if(Array.isArray(se.__webglFramebuffer[Me]))for(let Re=0;Re<se.__webglFramebuffer[Me].length;Re++)n.deleteFramebuffer(se.__webglFramebuffer[Me][Re]);else n.deleteFramebuffer(se.__webglFramebuffer[Me]);se.__webglDepthbuffer&&n.deleteRenderbuffer(se.__webglDepthbuffer[Me])}else{if(Array.isArray(se.__webglFramebuffer))for(let Me=0;Me<se.__webglFramebuffer.length;Me++)n.deleteFramebuffer(se.__webglFramebuffer[Me]);else n.deleteFramebuffer(se.__webglFramebuffer);if(se.__webglDepthbuffer&&n.deleteRenderbuffer(se.__webglDepthbuffer),se.__webglMultisampledFramebuffer&&n.deleteFramebuffer(se.__webglMultisampledFramebuffer),se.__webglColorRenderbuffer)for(let Me=0;Me<se.__webglColorRenderbuffer.length;Me++)se.__webglColorRenderbuffer[Me]&&n.deleteRenderbuffer(se.__webglColorRenderbuffer[Me]);se.__webglDepthRenderbuffer&&n.deleteRenderbuffer(se.__webglDepthRenderbuffer)}if(B.isWebGLMultipleRenderTargets)for(let Me=0,Re=I.length;Me<Re;Me++){const qe=i.get(I[Me]);qe.__webglTexture&&(n.deleteTexture(qe.__webglTexture),a.memory.textures--),i.remove(I[Me])}i.remove(I),i.remove(B)}let R=0;function X(){R=0}function N(){const B=R;return B>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+r.maxTextures),R+=1,B}function J(B){const I=[];return I.push(B.wrapS),I.push(B.wrapT),I.push(B.wrapR||0),I.push(B.magFilter),I.push(B.minFilter),I.push(B.anisotropy),I.push(B.internalFormat),I.push(B.format),I.push(B.type),I.push(B.generateMipmaps),I.push(B.premultiplyAlpha),I.push(B.flipY),I.push(B.unpackAlignment),I.push(B.colorSpace),I.join()}function Q(B,I){const se=i.get(B);if(B.isVideoTexture&&lt(B),B.isRenderTargetTexture===!1&&B.version>0&&se.__version!==B.version){const ye=B.image;if(ye===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(se,B,I);return}}t.bindTexture(n.TEXTURE_2D,se.__webglTexture,n.TEXTURE0+I)}function ie(B,I){const se=i.get(B);if(B.version>0&&se.__version!==B.version){K(se,B,I);return}t.bindTexture(n.TEXTURE_2D_ARRAY,se.__webglTexture,n.TEXTURE0+I)}function ee(B,I){const se=i.get(B);if(B.version>0&&se.__version!==B.version){K(se,B,I);return}t.bindTexture(n.TEXTURE_3D,se.__webglTexture,n.TEXTURE0+I)}function te(B,I){const se=i.get(B);if(B.version>0&&se.__version!==B.version){ne(se,B,I);return}t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture,n.TEXTURE0+I)}const ae={[Ah]:n.REPEAT,[ir]:n.CLAMP_TO_EDGE,[Eh]:n.MIRRORED_REPEAT},xe={[ai]:n.NEAREST,[cf]:n.NEAREST_MIPMAP_NEAREST,[Ru]:n.NEAREST_MIPMAP_LINEAR,[Gi]:n.LINEAR,[t1]:n.LINEAR_MIPMAP_NEAREST,[$o]:n.LINEAR_MIPMAP_LINEAR},T={[f1]:n.NEVER,[y1]:n.ALWAYS,[p1]:n.LESS,[gm]:n.LEQUAL,[m1]:n.EQUAL,[_1]:n.GEQUAL,[g1]:n.GREATER,[v1]:n.NOTEQUAL};function F(B,I,se){if(se?(n.texParameteri(B,n.TEXTURE_WRAP_S,ae[I.wrapS]),n.texParameteri(B,n.TEXTURE_WRAP_T,ae[I.wrapT]),(B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY)&&n.texParameteri(B,n.TEXTURE_WRAP_R,ae[I.wrapR]),n.texParameteri(B,n.TEXTURE_MAG_FILTER,xe[I.magFilter]),n.texParameteri(B,n.TEXTURE_MIN_FILTER,xe[I.minFilter])):(n.texParameteri(B,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(B,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY)&&n.texParameteri(B,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(I.wrapS!==ir||I.wrapT!==ir)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(B,n.TEXTURE_MAG_FILTER,G(I.magFilter)),n.texParameteri(B,n.TEXTURE_MIN_FILTER,G(I.minFilter)),I.minFilter!==ai&&I.minFilter!==Gi&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),I.compareFunction&&(n.texParameteri(B,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(B,n.TEXTURE_COMPARE_FUNC,T[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ye=e.get("EXT_texture_filter_anisotropic");if(I.magFilter===ai||I.minFilter!==Ru&&I.minFilter!==$o||I.type===ds&&e.has("OES_texture_float_linear")===!1||o===!1&&I.type===Jo&&e.has("OES_texture_half_float_linear")===!1)return;(I.anisotropy>1||i.get(I).__currentAnisotropy)&&(n.texParameterf(B,ye.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,r.getMaxAnisotropy())),i.get(I).__currentAnisotropy=I.anisotropy)}}function V(B,I){let se=!1;B.__webglInit===void 0&&(B.__webglInit=!0,I.addEventListener("dispose",U));const ye=I.source;let Me=g.get(ye);Me===void 0&&(Me={},g.set(ye,Me));const Re=J(I);if(Re!==B.__cacheKey){Me[Re]===void 0&&(Me[Re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,se=!0),Me[Re].usedTimes++;const qe=Me[B.__cacheKey];qe!==void 0&&(Me[B.__cacheKey].usedTimes--,qe.usedTimes===0&&D(I)),B.__cacheKey=Re,B.__webglTexture=Me[Re].texture}return se}function K(B,I,se){let ye=n.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(ye=n.TEXTURE_2D_ARRAY),I.isData3DTexture&&(ye=n.TEXTURE_3D);const Me=V(B,I),Re=I.source;t.bindTexture(ye,B.__webglTexture,n.TEXTURE0+se);const qe=i.get(Re);if(Re.version!==qe.__version||Me===!0){t.activeTexture(n.TEXTURE0+se);const Oe=$t.getPrimaries($t.workingColorSpace),je=I.colorSpace===Hi?null:$t.getPrimaries(I.colorSpace),nt=I.colorSpace===Hi||Oe===je?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,I.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,I.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const Je=m(I)&&_(I.image)===!1;let Pe=b(I.image,Je,!1,r.maxTextureSize);Pe=He(I,Pe);const ze=_(Pe)||o,pt=s.convert(I.format,I.colorSpace);let it=s.convert(I.type),ht=P(I.internalFormat,pt,it,I.colorSpace,I.isVideoTexture);F(ye,I,ze);let $e;const ct=I.mipmaps,It=o&&I.isVideoTexture!==!0&&ht!==fm,mt=qe.__version===void 0||Me===!0,St=q(I,Pe,ze);if(I.isDepthTexture)ht=n.DEPTH_COMPONENT,o?I.type===ds?ht=n.DEPTH_COMPONENT32F:I.type===hs?ht=n.DEPTH_COMPONENT24:I.type===qs?ht=n.DEPTH24_STENCIL8:ht=n.DEPTH_COMPONENT16:I.type===ds&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),I.format===Ws&&ht===n.DEPTH_COMPONENT&&I.type!==Qh&&I.type!==hs&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),I.type=hs,it=s.convert(I.type)),I.format===Qa&&ht===n.DEPTH_COMPONENT&&(ht=n.DEPTH_STENCIL,I.type!==qs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),I.type=qs,it=s.convert(I.type))),mt&&(It?t.texStorage2D(n.TEXTURE_2D,1,ht,Pe.width,Pe.height):t.texImage2D(n.TEXTURE_2D,0,ht,Pe.width,Pe.height,0,pt,it,null));else if(I.isDataTexture)if(ct.length>0&&ze){It&&mt&&t.texStorage2D(n.TEXTURE_2D,St,ht,ct[0].width,ct[0].height);for(let Be=0,le=ct.length;Be<le;Be++)$e=ct[Be],It?t.texSubImage2D(n.TEXTURE_2D,Be,0,0,$e.width,$e.height,pt,it,$e.data):t.texImage2D(n.TEXTURE_2D,Be,ht,$e.width,$e.height,0,pt,it,$e.data);I.generateMipmaps=!1}else It?(mt&&t.texStorage2D(n.TEXTURE_2D,St,ht,Pe.width,Pe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Pe.width,Pe.height,pt,it,Pe.data)):t.texImage2D(n.TEXTURE_2D,0,ht,Pe.width,Pe.height,0,pt,it,Pe.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){It&&mt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,St,ht,ct[0].width,ct[0].height,Pe.depth);for(let Be=0,le=ct.length;Be<le;Be++)$e=ct[Be],I.format!==rr?pt!==null?It?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Be,0,0,0,$e.width,$e.height,Pe.depth,pt,$e.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Be,ht,$e.width,$e.height,Pe.depth,0,$e.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?t.texSubImage3D(n.TEXTURE_2D_ARRAY,Be,0,0,0,$e.width,$e.height,Pe.depth,pt,it,$e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Be,ht,$e.width,$e.height,Pe.depth,0,pt,it,$e.data)}else{It&&mt&&t.texStorage2D(n.TEXTURE_2D,St,ht,ct[0].width,ct[0].height);for(let Be=0,le=ct.length;Be<le;Be++)$e=ct[Be],I.format!==rr?pt!==null?It?t.compressedTexSubImage2D(n.TEXTURE_2D,Be,0,0,$e.width,$e.height,pt,$e.data):t.compressedTexImage2D(n.TEXTURE_2D,Be,ht,$e.width,$e.height,0,$e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?t.texSubImage2D(n.TEXTURE_2D,Be,0,0,$e.width,$e.height,pt,it,$e.data):t.texImage2D(n.TEXTURE_2D,Be,ht,$e.width,$e.height,0,pt,it,$e.data)}else if(I.isDataArrayTexture)It?(mt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,St,ht,Pe.width,Pe.height,Pe.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Pe.width,Pe.height,Pe.depth,pt,it,Pe.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ht,Pe.width,Pe.height,Pe.depth,0,pt,it,Pe.data);else if(I.isData3DTexture)It?(mt&&t.texStorage3D(n.TEXTURE_3D,St,ht,Pe.width,Pe.height,Pe.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Pe.width,Pe.height,Pe.depth,pt,it,Pe.data)):t.texImage3D(n.TEXTURE_3D,0,ht,Pe.width,Pe.height,Pe.depth,0,pt,it,Pe.data);else if(I.isFramebufferTexture){if(mt)if(It)t.texStorage2D(n.TEXTURE_2D,St,ht,Pe.width,Pe.height);else{let Be=Pe.width,le=Pe.height;for(let Ke=0;Ke<St;Ke++)t.texImage2D(n.TEXTURE_2D,Ke,ht,Be,le,0,pt,it,null),Be>>=1,le>>=1}}else if(ct.length>0&&ze){It&&mt&&t.texStorage2D(n.TEXTURE_2D,St,ht,ct[0].width,ct[0].height);for(let Be=0,le=ct.length;Be<le;Be++)$e=ct[Be],It?t.texSubImage2D(n.TEXTURE_2D,Be,0,0,pt,it,$e):t.texImage2D(n.TEXTURE_2D,Be,ht,pt,it,$e);I.generateMipmaps=!1}else It?(mt&&t.texStorage2D(n.TEXTURE_2D,St,ht,Pe.width,Pe.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,it,Pe)):t.texImage2D(n.TEXTURE_2D,0,ht,pt,it,Pe);S(I,ze)&&M(ye),qe.__version=Re.version,I.onUpdate&&I.onUpdate(I)}B.__version=I.version}function ne(B,I,se){if(I.image.length!==6)return;const ye=V(B,I),Me=I.source;t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+se);const Re=i.get(Me);if(Me.version!==Re.__version||ye===!0){t.activeTexture(n.TEXTURE0+se);const qe=$t.getPrimaries($t.workingColorSpace),Oe=I.colorSpace===Hi?null:$t.getPrimaries(I.colorSpace),je=I.colorSpace===Hi||qe===Oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,I.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,I.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);const nt=I.isCompressedTexture||I.image[0].isCompressedTexture,Je=I.image[0]&&I.image[0].isDataTexture,Pe=[];for(let Be=0;Be<6;Be++)!nt&&!Je?Pe[Be]=b(I.image[Be],!1,!0,r.maxCubemapSize):Pe[Be]=Je?I.image[Be].image:I.image[Be],Pe[Be]=He(I,Pe[Be]);const ze=Pe[0],pt=_(ze)||o,it=s.convert(I.format,I.colorSpace),ht=s.convert(I.type),$e=P(I.internalFormat,it,ht,I.colorSpace),ct=o&&I.isVideoTexture!==!0,It=Re.__version===void 0||ye===!0;let mt=q(I,ze,pt);F(n.TEXTURE_CUBE_MAP,I,pt);let St;if(nt){ct&&It&&t.texStorage2D(n.TEXTURE_CUBE_MAP,mt,$e,ze.width,ze.height);for(let Be=0;Be<6;Be++){St=Pe[Be].mipmaps;for(let le=0;le<St.length;le++){const Ke=St[le];I.format!==rr?it!==null?ct?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le,0,0,Ke.width,Ke.height,it,Ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le,$e,Ke.width,Ke.height,0,Ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ct?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le,0,0,Ke.width,Ke.height,it,ht,Ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le,$e,Ke.width,Ke.height,0,it,ht,Ke.data)}}}else{St=I.mipmaps,ct&&It&&(St.length>0&&mt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,mt,$e,Pe[0].width,Pe[0].height));for(let Be=0;Be<6;Be++)if(Je){ct?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,Pe[Be].width,Pe[Be].height,it,ht,Pe[Be].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,$e,Pe[Be].width,Pe[Be].height,0,it,ht,Pe[Be].data);for(let le=0;le<St.length;le++){const We=St[le].image[Be].image;ct?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le+1,0,0,We.width,We.height,it,ht,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le+1,$e,We.width,We.height,0,it,ht,We.data)}}else{ct?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,0,0,it,ht,Pe[Be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,$e,it,ht,Pe[Be]);for(let le=0;le<St.length;le++){const Ke=St[le];ct?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le+1,0,0,it,ht,Ke.image[Be]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Be,le+1,$e,it,ht,Ke.image[Be])}}}S(I,pt)&&M(n.TEXTURE_CUBE_MAP),Re.__version=Me.version,I.onUpdate&&I.onUpdate(I)}B.__version=I.version}function ce(B,I,se,ye,Me,Re){const qe=s.convert(se.format,se.colorSpace),Oe=s.convert(se.type),je=P(se.internalFormat,qe,Oe,se.colorSpace);if(!i.get(I).__hasExternalTextures){const Je=Math.max(1,I.width>>Re),Pe=Math.max(1,I.height>>Re);Me===n.TEXTURE_3D||Me===n.TEXTURE_2D_ARRAY?t.texImage3D(Me,Re,je,Je,Pe,I.depth,0,qe,Oe,null):t.texImage2D(Me,Re,je,Je,Pe,0,qe,Oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,B),Y(I)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ye,Me,i.get(se).__webglTexture,0,_e(I)):(Me===n.TEXTURE_2D||Me>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Me<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ye,Me,i.get(se).__webglTexture,Re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(B,I,se){if(n.bindRenderbuffer(n.RENDERBUFFER,B),I.depthBuffer&&!I.stencilBuffer){let ye=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(se||Y(I)){const Me=I.depthTexture;Me&&Me.isDepthTexture&&(Me.type===ds?ye=n.DEPTH_COMPONENT32F:Me.type===hs&&(ye=n.DEPTH_COMPONENT24));const Re=_e(I);Y(I)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,ye,I.width,I.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,ye,I.width,I.height)}else n.renderbufferStorage(n.RENDERBUFFER,ye,I.width,I.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,B)}else if(I.depthBuffer&&I.stencilBuffer){const ye=_e(I);se&&Y(I)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,n.DEPTH24_STENCIL8,I.width,I.height):Y(I)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,n.DEPTH24_STENCIL8,I.width,I.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,B)}else{const ye=I.isWebGLMultipleRenderTargets===!0?I.texture:[I.texture];for(let Me=0;Me<ye.length;Me++){const Re=ye[Me],qe=s.convert(Re.format,Re.colorSpace),Oe=s.convert(Re.type),je=P(Re.internalFormat,qe,Oe,Re.colorSpace),nt=_e(I);se&&Y(I)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt,je,I.width,I.height):Y(I)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt,je,I.width,I.height):n.renderbufferStorage(n.RENDERBUFFER,je,I.width,I.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pe(B,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,B),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(I.depthTexture).__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)&&(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),Q(I.depthTexture,0);const ye=i.get(I.depthTexture).__webglTexture,Me=_e(I);if(I.depthTexture.format===Ws)Y(I)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ye,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ye,0);else if(I.depthTexture.format===Qa)Y(I)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ye,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Ce(B){const I=i.get(B),se=B.isWebGLCubeRenderTarget===!0;if(B.depthTexture&&!I.__autoAllocateDepthBuffer){if(se)throw new Error("target.depthTexture not supported in Cube render targets");pe(I.__webglFramebuffer,B)}else if(se){I.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)t.bindFramebuffer(n.FRAMEBUFFER,I.__webglFramebuffer[ye]),I.__webglDepthbuffer[ye]=n.createRenderbuffer(),fe(I.__webglDepthbuffer[ye],B,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer=n.createRenderbuffer(),fe(I.__webglDepthbuffer,B,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(B,I,se){const ye=i.get(B);I!==void 0&&ce(ye.__webglFramebuffer,B,B.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),se!==void 0&&Ce(B)}function re(B){const I=B.texture,se=i.get(B),ye=i.get(I);B.addEventListener("dispose",H),B.isWebGLMultipleRenderTargets!==!0&&(ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture()),ye.__version=I.version,a.memory.textures++);const Me=B.isWebGLCubeRenderTarget===!0,Re=B.isWebGLMultipleRenderTargets===!0,qe=_(B)||o;if(Me){se.__webglFramebuffer=[];for(let Oe=0;Oe<6;Oe++)if(o&&I.mipmaps&&I.mipmaps.length>0){se.__webglFramebuffer[Oe]=[];for(let je=0;je<I.mipmaps.length;je++)se.__webglFramebuffer[Oe][je]=n.createFramebuffer()}else se.__webglFramebuffer[Oe]=n.createFramebuffer()}else{if(o&&I.mipmaps&&I.mipmaps.length>0){se.__webglFramebuffer=[];for(let Oe=0;Oe<I.mipmaps.length;Oe++)se.__webglFramebuffer[Oe]=n.createFramebuffer()}else se.__webglFramebuffer=n.createFramebuffer();if(Re)if(r.drawBuffers){const Oe=B.texture;for(let je=0,nt=Oe.length;je<nt;je++){const Je=i.get(Oe[je]);Je.__webglTexture===void 0&&(Je.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&B.samples>0&&Y(B)===!1){const Oe=Re?I:[I];se.__webglMultisampledFramebuffer=n.createFramebuffer(),se.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer);for(let je=0;je<Oe.length;je++){const nt=Oe[je];se.__webglColorRenderbuffer[je]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,se.__webglColorRenderbuffer[je]);const Je=s.convert(nt.format,nt.colorSpace),Pe=s.convert(nt.type),ze=P(nt.internalFormat,Je,Pe,nt.colorSpace,B.isXRRenderTarget===!0),pt=_e(B);n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,ze,B.width,B.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+je,n.RENDERBUFFER,se.__webglColorRenderbuffer[je])}n.bindRenderbuffer(n.RENDERBUFFER,null),B.depthBuffer&&(se.__webglDepthRenderbuffer=n.createRenderbuffer(),fe(se.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Me){t.bindTexture(n.TEXTURE_CUBE_MAP,ye.__webglTexture),F(n.TEXTURE_CUBE_MAP,I,qe);for(let Oe=0;Oe<6;Oe++)if(o&&I.mipmaps&&I.mipmaps.length>0)for(let je=0;je<I.mipmaps.length;je++)ce(se.__webglFramebuffer[Oe][je],B,I,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,je);else ce(se.__webglFramebuffer[Oe],B,I,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0);S(I,qe)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){const Oe=B.texture;for(let je=0,nt=Oe.length;je<nt;je++){const Je=Oe[je],Pe=i.get(Je);t.bindTexture(n.TEXTURE_2D,Pe.__webglTexture),F(n.TEXTURE_2D,Je,qe),ce(se.__webglFramebuffer,B,Je,n.COLOR_ATTACHMENT0+je,n.TEXTURE_2D,0),S(Je,qe)&&M(n.TEXTURE_2D)}t.unbindTexture()}else{let Oe=n.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(o?Oe=B.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Oe,ye.__webglTexture),F(Oe,I,qe),o&&I.mipmaps&&I.mipmaps.length>0)for(let je=0;je<I.mipmaps.length;je++)ce(se.__webglFramebuffer[je],B,I,n.COLOR_ATTACHMENT0,Oe,je);else ce(se.__webglFramebuffer,B,I,n.COLOR_ATTACHMENT0,Oe,0);S(I,qe)&&M(Oe),t.unbindTexture()}B.depthBuffer&&Ce(B)}function Xe(B){const I=_(B)||o,se=B.isWebGLMultipleRenderTargets===!0?B.texture:[B.texture];for(let ye=0,Me=se.length;ye<Me;ye++){const Re=se[ye];if(S(Re,I)){const qe=B.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Oe=i.get(Re).__webglTexture;t.bindTexture(qe,Oe),M(qe),t.unbindTexture()}}}function Ve(B){if(o&&B.samples>0&&Y(B)===!1){const I=B.isWebGLMultipleRenderTargets?B.texture:[B.texture],se=B.width,ye=B.height;let Me=n.COLOR_BUFFER_BIT;const Re=[],qe=B.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Oe=i.get(B),je=B.isWebGLMultipleRenderTargets===!0;if(je)for(let nt=0;nt<I.length;nt++)t.bindFramebuffer(n.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let nt=0;nt<I.length;nt++){Re.push(n.COLOR_ATTACHMENT0+nt),B.depthBuffer&&Re.push(qe);const Je=Oe.__ignoreDepthValues!==void 0?Oe.__ignoreDepthValues:!1;if(Je===!1&&(B.depthBuffer&&(Me|=n.DEPTH_BUFFER_BIT),B.stencilBuffer&&(Me|=n.STENCIL_BUFFER_BIT)),je&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Oe.__webglColorRenderbuffer[nt]),Je===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[qe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[qe])),je){const Pe=i.get(I[nt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,se,ye,0,0,se,ye,Me,n.NEAREST),u&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Re)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),je)for(let nt=0;nt<I.length;nt++){t.bindFramebuffer(n.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,Oe.__webglColorRenderbuffer[nt]);const Je=i.get(I[nt]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.TEXTURE_2D,Je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}}function _e(B){return Math.min(r.maxSamples,B.samples)}function Y(B){const I=i.get(B);return o&&B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function lt(B){const I=a.render.frame;h.get(B)!==I&&(h.set(B,I),B.update())}function He(B,I){const se=B.colorSpace,ye=B.format,Me=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||B.format===Th||se!==Vr&&se!==Hi&&($t.getTransfer(se)===on?o===!1?e.has("EXT_sRGB")===!0&&ye===rr?(B.format=Th,B.minFilter=Gi,B.generateMipmaps=!1):I=ym.sRGBToLinear(I):(ye!==rr||Me!==vs)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",se)),I}this.allocateTextureUnit=N,this.resetTextureUnits=X,this.setTexture2D=Q,this.setTexture2DArray=ie,this.setTexture3D=ee,this.setTextureCube=te,this.rebindTextures=Ie,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Y}function Iy(n,e,t){const i=t.isWebGL2;function r(s,a=Hi){let o;const l=$t.getTransfer(a);if(s===vs)return n.UNSIGNED_BYTE;if(s===lm)return n.UNSIGNED_SHORT_4_4_4_4;if(s===cm)return n.UNSIGNED_SHORT_5_5_5_1;if(s===n1)return n.BYTE;if(s===i1)return n.SHORT;if(s===Qh)return n.UNSIGNED_SHORT;if(s===om)return n.INT;if(s===hs)return n.UNSIGNED_INT;if(s===ds)return n.FLOAT;if(s===Jo)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===r1)return n.ALPHA;if(s===rr)return n.RGBA;if(s===s1)return n.LUMINANCE;if(s===a1)return n.LUMINANCE_ALPHA;if(s===Ws)return n.DEPTH_COMPONENT;if(s===Qa)return n.DEPTH_STENCIL;if(s===Th)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===o1)return n.RED;if(s===um)return n.RED_INTEGER;if(s===l1)return n.RG;if(s===hm)return n.RG_INTEGER;if(s===dm)return n.RGBA_INTEGER;if(s===Pu||s===Nu||s===Iu||s===Du)if(l===on)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Pu)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Nu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Iu)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Du)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Pu)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Nu)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Iu)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Du)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===uf||s===hf||s===df||s===ff)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===uf)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===hf)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===df)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ff)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===fm)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===pf||s===mf)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===pf)return l===on?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===mf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===gf||s===vf||s===_f||s===yf||s===bf||s===xf||s===Sf||s===wf||s===Mf||s===Af||s===Ef||s===Tf||s===Lf||s===Cf)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===gf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===vf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===_f)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===yf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===bf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===xf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Sf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===wf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Mf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Af)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ef)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Tf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Lf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Cf)return l===on?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Fu||s===Rf||s===Pf)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Fu)return l===on?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Rf)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Pf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===c1||s===Nf||s===If||s===Df)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Fu)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Nf)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===If)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Df)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===qs?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Dy extends li{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class sr extends Vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fy={type:"move"};class rh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new be,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new be),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new be,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new be),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const b of e.hand.values()){const _=t.getJointPose(b,i),m=this._getHandJoint(u,b);_!==null&&(m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=_.radius),m.visible=_!==null}const h=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],g=h.position.distanceTo(p.position),d=.02,x=.005;u.inputState.pinching&&g>d+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&g<=d-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fy)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new sr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Uy extends so{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,u=null,h=null,p=null,g=null,d=null,x=null;const b=t.getContextAttributes();let _=null,m=null;const S=[],M=[],P=new kt;let q=null;const G=new li;G.layers.enable(1),G.viewport=new un;const U=new li;U.layers.enable(2),U.viewport=new un;const H=[G,U],A=new Dy;A.layers.enable(1),A.layers.enable(2);let D=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let V=S[F];return V===void 0&&(V=new rh,S[F]=V),V.getTargetRaySpace()},this.getControllerGrip=function(F){let V=S[F];return V===void 0&&(V=new rh,S[F]=V),V.getGripSpace()},this.getHand=function(F){let V=S[F];return V===void 0&&(V=new rh,S[F]=V),V.getHandSpace()};function R(F){const V=M.indexOf(F.inputSource);if(V===-1)return;const K=S[V];K!==void 0&&(K.update(F.inputSource,F.frame,u||a),K.dispatchEvent({type:F.type,data:F.inputSource}))}function X(){r.removeEventListener("select",R),r.removeEventListener("selectstart",R),r.removeEventListener("selectend",R),r.removeEventListener("squeeze",R),r.removeEventListener("squeezestart",R),r.removeEventListener("squeezeend",R),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",N);for(let F=0;F<S.length;F++){const V=M[F];V!==null&&(M[F]=null,S[F].disconnect(V))}D=null,E=null,e.setRenderTarget(_),d=null,g=null,p=null,r=null,m=null,T.stop(),i.isPresenting=!1,e.setPixelRatio(q),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){s=F,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(F){u=F},this.getBaseLayer=function(){return g!==null?g:d},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(F){if(r=F,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",R),r.addEventListener("selectstart",R),r.addEventListener("selectend",R),r.addEventListener("squeeze",R),r.addEventListener("squeezestart",R),r.addEventListener("squeezeend",R),r.addEventListener("end",X),r.addEventListener("inputsourceschange",N),b.xrCompatible!==!0&&await t.makeXRCompatible(),q=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const V={antialias:r.renderState.layers===void 0?b.antialias:!0,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,V),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new $s(d.framebufferWidth,d.framebufferHeight,{format:rr,type:vs,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let V=null,K=null,ne=null;b.depth&&(ne=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=b.stencil?Qa:Ws,K=b.stencil?qs:hs);const ce={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:s};p=new XRWebGLBinding(r,t),g=p.createProjectionLayer(ce),r.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),m=new $s(g.textureWidth,g.textureHeight,{format:rr,type:vs,depthTexture:new Rm(g.textureWidth,g.textureHeight,K,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});const fe=e.properties.get(m);fe.__ignoreDepthValues=g.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await r.requestReferenceSpace(o),T.setContext(r),T.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function N(F){for(let V=0;V<F.removed.length;V++){const K=F.removed[V],ne=M.indexOf(K);ne>=0&&(M[ne]=null,S[ne].disconnect(K))}for(let V=0;V<F.added.length;V++){const K=F.added[V];let ne=M.indexOf(K);if(ne===-1){for(let fe=0;fe<S.length;fe++)if(fe>=M.length){M.push(K),ne=fe;break}else if(M[fe]===null){M[fe]=K,ne=fe;break}if(ne===-1)break}const ce=S[ne];ce&&ce.connect(K)}}const J=new be,Q=new be;function ie(F,V,K){J.setFromMatrixPosition(V.matrixWorld),Q.setFromMatrixPosition(K.matrixWorld);const ne=J.distanceTo(Q),ce=V.projectionMatrix.elements,fe=K.projectionMatrix.elements,pe=ce[14]/(ce[10]-1),Ce=ce[14]/(ce[10]+1),Ie=(ce[9]+1)/ce[5],re=(ce[9]-1)/ce[5],Xe=(ce[8]-1)/ce[0],Ve=(fe[8]+1)/fe[0],_e=pe*Xe,Y=pe*Ve,lt=ne/(-Xe+Ve),He=lt*-Xe;V.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(He),F.translateZ(lt),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert();const B=pe+lt,I=Ce+lt,se=_e-He,ye=Y+(ne-He),Me=Ie*Ce/I*B,Re=re*Ce/I*B;F.projectionMatrix.makePerspective(se,ye,Me,Re,B,I),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}function ee(F,V){V===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(V.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(r===null)return;A.near=U.near=G.near=F.near,A.far=U.far=G.far=F.far,(D!==A.near||E!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),D=A.near,E=A.far);const V=F.parent,K=A.cameras;ee(A,V);for(let ne=0;ne<K.length;ne++)ee(K[ne],V);K.length===2?ie(A,G,U):A.projectionMatrix.copy(G.projectionMatrix),te(F,A,V)};function te(F,V,K){K===null?F.matrix.copy(V.matrixWorld):(F.matrix.copy(K.matrixWorld),F.matrix.invert(),F.matrix.multiply(V.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(V.projectionMatrix),F.projectionMatrixInverse.copy(V.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Ko*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(g===null&&d===null))return l},this.setFoveation=function(F){l=F,g!==null&&(g.fixedFoveation=F),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=F)};let ae=null;function xe(F,V){if(h=V.getViewerPose(u||a),x=V,h!==null){const K=h.views;d!==null&&(e.setRenderTargetFramebuffer(m,d.framebuffer),e.setRenderTarget(m));let ne=!1;K.length!==A.cameras.length&&(A.cameras.length=0,ne=!0);for(let ce=0;ce<K.length;ce++){const fe=K[ce];let pe=null;if(d!==null)pe=d.getViewport(fe);else{const Ie=p.getViewSubImage(g,fe);pe=Ie.viewport,ce===0&&(e.setRenderTargetTextures(m,Ie.colorTexture,g.ignoreDepthValues?void 0:Ie.depthStencilTexture),e.setRenderTarget(m))}let Ce=H[ce];Ce===void 0&&(Ce=new li,Ce.layers.enable(ce),Ce.viewport=new un,H[ce]=Ce),Ce.matrix.fromArray(fe.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(fe.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(pe.x,pe.y,pe.width,pe.height),ce===0&&(A.matrix.copy(Ce.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),ne===!0&&A.cameras.push(Ce)}}for(let K=0;K<S.length;K++){const ne=M[K],ce=S[K];ne!==null&&ce!==void 0&&ce.update(ne,V,u||a)}ae&&ae(F,V),V.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:V}),x=null}const T=new Lm;T.setAnimationLoop(xe),this.setAnimationLoop=function(F){ae=F},this.dispose=function(){}}}function Oy(n,e){function t(_,m){_.matrixAutoUpdate===!0&&_.updateMatrix(),m.value.copy(_.matrix)}function i(_,m){m.color.getRGB(_.fogColor.value,Am(n)),m.isFog?(_.fogNear.value=m.near,_.fogFar.value=m.far):m.isFogExp2&&(_.fogDensity.value=m.density)}function r(_,m,S,M,P){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(_,m):m.isMeshToonMaterial?(s(_,m),p(_,m)):m.isMeshPhongMaterial?(s(_,m),h(_,m)):m.isMeshStandardMaterial?(s(_,m),g(_,m),m.isMeshPhysicalMaterial&&d(_,m,P)):m.isMeshMatcapMaterial?(s(_,m),x(_,m)):m.isMeshDepthMaterial?s(_,m):m.isMeshDistanceMaterial?(s(_,m),b(_,m)):m.isMeshNormalMaterial?s(_,m):m.isLineBasicMaterial?(a(_,m),m.isLineDashedMaterial&&o(_,m)):m.isPointsMaterial?l(_,m,S,M):m.isSpriteMaterial?u(_,m):m.isShadowMaterial?(_.color.value.copy(m.color),_.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(_,m){_.opacity.value=m.opacity,m.color&&_.diffuse.value.copy(m.color),m.emissive&&_.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.bumpMap&&(_.bumpMap.value=m.bumpMap,t(m.bumpMap,_.bumpMapTransform),_.bumpScale.value=m.bumpScale,m.side===vi&&(_.bumpScale.value*=-1)),m.normalMap&&(_.normalMap.value=m.normalMap,t(m.normalMap,_.normalMapTransform),_.normalScale.value.copy(m.normalScale),m.side===vi&&_.normalScale.value.negate()),m.displacementMap&&(_.displacementMap.value=m.displacementMap,t(m.displacementMap,_.displacementMapTransform),_.displacementScale.value=m.displacementScale,_.displacementBias.value=m.displacementBias),m.emissiveMap&&(_.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,_.emissiveMapTransform)),m.specularMap&&(_.specularMap.value=m.specularMap,t(m.specularMap,_.specularMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest);const S=e.get(m).envMap;if(S&&(_.envMap.value=S,_.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=m.reflectivity,_.ior.value=m.ior,_.refractionRatio.value=m.refractionRatio),m.lightMap){_.lightMap.value=m.lightMap;const M=n._useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=m.lightMapIntensity*M,t(m.lightMap,_.lightMapTransform)}m.aoMap&&(_.aoMap.value=m.aoMap,_.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,_.aoMapTransform))}function a(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform))}function o(_,m){_.dashSize.value=m.dashSize,_.totalSize.value=m.dashSize+m.gapSize,_.scale.value=m.scale}function l(_,m,S,M){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.size.value=m.size*S,_.scale.value=M*.5,m.map&&(_.map.value=m.map,t(m.map,_.uvTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function u(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.rotation.value=m.rotation,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function h(_,m){_.specular.value.copy(m.specular),_.shininess.value=Math.max(m.shininess,1e-4)}function p(_,m){m.gradientMap&&(_.gradientMap.value=m.gradientMap)}function g(_,m){_.metalness.value=m.metalness,m.metalnessMap&&(_.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,_.metalnessMapTransform)),_.roughness.value=m.roughness,m.roughnessMap&&(_.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,_.roughnessMapTransform)),e.get(m).envMap&&(_.envMapIntensity.value=m.envMapIntensity)}function d(_,m,S){_.ior.value=m.ior,m.sheen>0&&(_.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),_.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(_.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,_.sheenColorMapTransform)),m.sheenRoughnessMap&&(_.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,_.sheenRoughnessMapTransform))),m.clearcoat>0&&(_.clearcoat.value=m.clearcoat,_.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(_.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,_.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(_.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===vi&&_.clearcoatNormalScale.value.negate())),m.iridescence>0&&(_.iridescence.value=m.iridescence,_.iridescenceIOR.value=m.iridescenceIOR,_.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(_.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,_.iridescenceMapTransform)),m.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),m.transmission>0&&(_.transmission.value=m.transmission,_.transmissionSamplerMap.value=S.texture,_.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(_.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,_.transmissionMapTransform)),_.thickness.value=m.thickness,m.thicknessMap&&(_.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=m.attenuationDistance,_.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(_.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(_.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=m.specularIntensity,_.specularColor.value.copy(m.specularColor),m.specularColorMap&&(_.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,_.specularColorMapTransform)),m.specularIntensityMap&&(_.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,_.specularIntensityMapTransform))}function x(_,m){m.matcap&&(_.matcap.value=m.matcap)}function b(_,m){const S=e.get(m).light;_.referencePosition.value.setFromMatrixPosition(S.matrixWorld),_.nearDistance.value=S.shadow.camera.near,_.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ky(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(S,M){const P=M.program;i.uniformBlockBinding(S,P)}function u(S,M){let P=r[S.id];P===void 0&&(x(S),P=h(S),r[S.id]=P,S.addEventListener("dispose",_));const q=M.program;i.updateUBOMapping(S,q);const G=e.render.frame;s[S.id]!==G&&(g(S),s[S.id]=G)}function h(S){const M=p();S.__bindingPointIndex=M;const P=n.createBuffer(),q=S.__size,G=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,P),n.bufferData(n.UNIFORM_BUFFER,q,G),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,P),P}function p(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(S){const M=r[S.id],P=S.uniforms,q=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let G=0,U=P.length;G<U;G++){const H=Array.isArray(P[G])?P[G]:[P[G]];for(let A=0,D=H.length;A<D;A++){const E=H[A];if(d(E,G,A,q)===!0){const R=E.__offset,X=Array.isArray(E.value)?E.value:[E.value];let N=0;for(let J=0;J<X.length;J++){const Q=X[J],ie=b(Q);typeof Q=="number"||typeof Q=="boolean"?(E.__data[0]=Q,n.bufferSubData(n.UNIFORM_BUFFER,R+N,E.__data)):Q.isMatrix3?(E.__data[0]=Q.elements[0],E.__data[1]=Q.elements[1],E.__data[2]=Q.elements[2],E.__data[3]=0,E.__data[4]=Q.elements[3],E.__data[5]=Q.elements[4],E.__data[6]=Q.elements[5],E.__data[7]=0,E.__data[8]=Q.elements[6],E.__data[9]=Q.elements[7],E.__data[10]=Q.elements[8],E.__data[11]=0):(Q.toArray(E.__data,N),N+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,R,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,M,P,q){const G=S.value,U=M+"_"+P;if(q[U]===void 0)return typeof G=="number"||typeof G=="boolean"?q[U]=G:q[U]=G.clone(),!0;{const H=q[U];if(typeof G=="number"||typeof G=="boolean"){if(H!==G)return q[U]=G,!0}else if(H.equals(G)===!1)return H.copy(G),!0}return!1}function x(S){const M=S.uniforms;let P=0;const q=16;for(let U=0,H=M.length;U<H;U++){const A=Array.isArray(M[U])?M[U]:[M[U]];for(let D=0,E=A.length;D<E;D++){const R=A[D],X=Array.isArray(R.value)?R.value:[R.value];for(let N=0,J=X.length;N<J;N++){const Q=X[N],ie=b(Q),ee=P%q;ee!==0&&q-ee<ie.boundary&&(P+=q-ee),R.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=P,P+=ie.storage}}}const G=P%q;return G>0&&(P+=q-G),S.__size=P,S.__cache={},this}function b(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function _(S){const M=S.target;M.removeEventListener("dispose",_);const P=a.indexOf(M.__bindingPointIndex);a.splice(P,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function m(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:u,dispose:m}}class Hc{constructor(e={}){const{canvas:t=D1(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let g;i!==null?g=i.getContextAttributes().alpha:g=a;const d=new Uint32Array(4),x=new Int32Array(4);let b=null,_=null;const m=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Hn,this._useLegacyLights=!1,this.toneMapping=gs,this.toneMappingExposure=1;const M=this;let P=!1,q=0,G=0,U=null,H=-1,A=null;const D=new un,E=new un;let R=null;const X=new Ut(0);let N=0,J=t.width,Q=t.height,ie=1,ee=null,te=null;const ae=new un(0,0,J,Q),xe=new un(0,0,J,Q);let T=!1;const F=new sd;let V=!1,K=!1,ne=null;const ce=new wn,fe=new kt,pe=new be,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ie(){return U===null?ie:1}let re=i;function Xe(j,ge){for(let Ee=0;Ee<j.length;Ee++){const Te=j[Ee],Ae=t.getContext(Te,ge);if(Ae!==null)return Ae}return null}try{const j={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zh}`),t.addEventListener("webglcontextlost",Be,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",Ke,!1),re===null){const ge=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&ge.shift(),re=Xe(ge,j),re===null)throw Xe(ge)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&re instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),re.getShaderPrecisionFormat===void 0&&(re.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(j){throw console.error("THREE.WebGLRenderer: "+j.message),j}let Ve,_e,Y,lt,He,B,I,se,ye,Me,Re,qe,Oe,je,nt,Je,Pe,ze,pt,it,ht,$e,ct,It;function mt(){Ve=new Y5(re),_e=new H5(re,Ve,e),Ve.init(_e),$e=new Iy(re,Ve,_e),Y=new Py(re,Ve,_e),lt=new K5(re),He=new vy,B=new Ny(re,Ve,Y,He,_e,$e,lt),I=new q5(M),se=new X5(M),ye=new s2(re,_e),ct=new z5(re,Ve,ye,_e),Me=new $5(re,ye,lt,ct),Re=new t_(re,Me,ye,lt),pt=new e_(re,_e,B),Je=new V5(He),qe=new gy(M,I,se,Ve,_e,ct,Je),Oe=new Oy(M,He),je=new yy,nt=new Ay(Ve,_e),ze=new B5(M,I,se,Y,Re,g,l),Pe=new Ry(M,Re,_e),It=new ky(re,lt,_e,Y),it=new G5(re,Ve,lt,_e),ht=new J5(re,Ve,lt,_e),lt.programs=qe.programs,M.capabilities=_e,M.extensions=Ve,M.properties=He,M.renderLists=je,M.shadowMap=Pe,M.state=Y,M.info=lt}mt();const St=new Uy(M,re);this.xr=St,this.getContext=function(){return re},this.getContextAttributes=function(){return re.getContextAttributes()},this.forceContextLoss=function(){const j=Ve.get("WEBGL_lose_context");j&&j.loseContext()},this.forceContextRestore=function(){const j=Ve.get("WEBGL_lose_context");j&&j.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(j){j!==void 0&&(ie=j,this.setSize(J,Q,!1))},this.getSize=function(j){return j.set(J,Q)},this.setSize=function(j,ge,Ee=!0){if(St.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=j,Q=ge,t.width=Math.floor(j*ie),t.height=Math.floor(ge*ie),Ee===!0&&(t.style.width=j+"px",t.style.height=ge+"px"),this.setViewport(0,0,j,ge)},this.getDrawingBufferSize=function(j){return j.set(J*ie,Q*ie).floor()},this.setDrawingBufferSize=function(j,ge,Ee){J=j,Q=ge,ie=Ee,t.width=Math.floor(j*Ee),t.height=Math.floor(ge*Ee),this.setViewport(0,0,j,ge)},this.getCurrentViewport=function(j){return j.copy(D)},this.getViewport=function(j){return j.copy(ae)},this.setViewport=function(j,ge,Ee,Te){j.isVector4?ae.set(j.x,j.y,j.z,j.w):ae.set(j,ge,Ee,Te),Y.viewport(D.copy(ae).multiplyScalar(ie).floor())},this.getScissor=function(j){return j.copy(xe)},this.setScissor=function(j,ge,Ee,Te){j.isVector4?xe.set(j.x,j.y,j.z,j.w):xe.set(j,ge,Ee,Te),Y.scissor(E.copy(xe).multiplyScalar(ie).floor())},this.getScissorTest=function(){return T},this.setScissorTest=function(j){Y.setScissorTest(T=j)},this.setOpaqueSort=function(j){ee=j},this.setTransparentSort=function(j){te=j},this.getClearColor=function(j){return j.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(j=!0,ge=!0,Ee=!0){let Te=0;if(j){let Ae=!1;if(U!==null){const st=U.texture.format;Ae=st===dm||st===hm||st===um}if(Ae){const st=U.texture.type,dt=st===vs||st===hs||st===Qh||st===qs||st===lm||st===cm,gt=ze.getClearColor(),yt=ze.getClearAlpha(),Rt=gt.r,bt=gt.g,wt=gt.b;dt?(d[0]=Rt,d[1]=bt,d[2]=wt,d[3]=yt,re.clearBufferuiv(re.COLOR,0,d)):(x[0]=Rt,x[1]=bt,x[2]=wt,x[3]=yt,re.clearBufferiv(re.COLOR,0,x))}else Te|=re.COLOR_BUFFER_BIT}ge&&(Te|=re.DEPTH_BUFFER_BIT),Ee&&(Te|=re.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),re.clear(Te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Be,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",Ke,!1),je.dispose(),nt.dispose(),He.dispose(),I.dispose(),se.dispose(),Re.dispose(),ct.dispose(),It.dispose(),qe.dispose(),St.dispose(),St.removeEventListener("sessionstart",tn),St.removeEventListener("sessionend",tt),ne&&(ne.dispose(),ne=null),Jt.stop()};function Be(j){j.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const j=lt.autoReset,ge=Pe.enabled,Ee=Pe.autoUpdate,Te=Pe.needsUpdate,Ae=Pe.type;mt(),lt.autoReset=j,Pe.enabled=ge,Pe.autoUpdate=Ee,Pe.needsUpdate=Te,Pe.type=Ae}function Ke(j){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",j.statusMessage)}function We(j){const ge=j.target;ge.removeEventListener("dispose",We),Ye(ge)}function Ye(j){Ze(j),He.remove(j)}function Ze(j){const ge=He.get(j).programs;ge!==void 0&&(ge.forEach(function(Ee){qe.releaseProgram(Ee)}),j.isShaderMaterial&&qe.releaseShaderCache(j))}this.renderBufferDirect=function(j,ge,Ee,Te,Ae,st){ge===null&&(ge=Ce);const dt=Ae.isMesh&&Ae.matrixWorld.determinant()<0,gt=yi(j,ge,Ee,Te,Ae);Y.setMaterial(Te,dt);let yt=Ee.index,Rt=1;if(Te.wireframe===!0){if(yt=Me.getWireframeAttribute(Ee),yt===void 0)return;Rt=2}const bt=Ee.drawRange,wt=Ee.attributes.position;let an=bt.start*Rt,Cn=(bt.start+bt.count)*Rt;st!==null&&(an=Math.max(an,st.start*Rt),Cn=Math.min(Cn,(st.start+st.count)*Rt)),yt!==null?(an=Math.max(an,0),Cn=Math.min(Cn,yt.count)):wt!=null&&(an=Math.max(an,0),Cn=Math.min(Cn,wt.count));const dn=Cn-an;if(dn<0||dn===1/0)return;ct.setup(Ae,Te,gt,Ee,yt);let ui,Kt=it;if(yt!==null&&(ui=ye.get(yt),Kt=ht,Kt.setIndex(ui)),Ae.isMesh)Te.wireframe===!0?(Y.setLineWidth(Te.wireframeLinewidth*Ie()),Kt.setMode(re.LINES)):Kt.setMode(re.TRIANGLES);else if(Ae.isLine){let Mt=Te.linewidth;Mt===void 0&&(Mt=1),Y.setLineWidth(Mt*Ie()),Ae.isLineSegments?Kt.setMode(re.LINES):Ae.isLineLoop?Kt.setMode(re.LINE_LOOP):Kt.setMode(re.LINE_STRIP)}else Ae.isPoints?Kt.setMode(re.POINTS):Ae.isSprite&&Kt.setMode(re.TRIANGLES);if(Ae.isBatchedMesh)Kt.renderMultiDraw(Ae._multiDrawStarts,Ae._multiDrawCounts,Ae._multiDrawCount);else if(Ae.isInstancedMesh)Kt.renderInstances(an,dn,Ae.count);else if(Ee.isInstancedBufferGeometry){const Mt=Ee._maxInstanceCount!==void 0?Ee._maxInstanceCount:1/0,Ss=Math.min(Ee.instanceCount,Mt);Kt.renderInstances(an,dn,Ss)}else Kt.render(an,dn)};function Bt(j,ge,Ee){j.transparent===!0&&j.side===vr&&j.forceSinglePass===!1?(j.side=vi,j.needsUpdate=!0,Wi(j,ge,Ee),j.side=_s,j.needsUpdate=!0,Wi(j,ge,Ee),j.side=vr):Wi(j,ge,Ee)}this.compile=function(j,ge,Ee=null){Ee===null&&(Ee=j),_=nt.get(Ee),_.init(),S.push(_),Ee.traverseVisible(function(Ae){Ae.isLight&&Ae.layers.test(ge.layers)&&(_.pushLight(Ae),Ae.castShadow&&_.pushShadow(Ae))}),j!==Ee&&j.traverseVisible(function(Ae){Ae.isLight&&Ae.layers.test(ge.layers)&&(_.pushLight(Ae),Ae.castShadow&&_.pushShadow(Ae))}),_.setupLights(M._useLegacyLights);const Te=new Set;return j.traverse(function(Ae){const st=Ae.material;if(st)if(Array.isArray(st))for(let dt=0;dt<st.length;dt++){const gt=st[dt];Bt(gt,Ee,Ae),Te.add(gt)}else Bt(st,Ee,Ae),Te.add(st)}),S.pop(),_=null,Te},this.compileAsync=function(j,ge,Ee=null){const Te=this.compile(j,ge,Ee);return new Promise(Ae=>{function st(){if(Te.forEach(function(dt){He.get(dt).currentProgram.isReady()&&Te.delete(dt)}),Te.size===0){Ae(j);return}setTimeout(st,10)}Ve.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let Et=null;function qt(j){Et&&Et(j)}function tn(){Jt.stop()}function tt(){Jt.start()}const Jt=new Lm;Jt.setAnimationLoop(qt),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(j){Et=j,St.setAnimationLoop(j),j===null?Jt.stop():Jt.start()},St.addEventListener("sessionstart",tn),St.addEventListener("sessionend",tt),this.render=function(j,ge){if(ge!==void 0&&ge.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ge.parent===null&&ge.matrixWorldAutoUpdate===!0&&ge.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(St.cameraAutoUpdate===!0&&St.updateCamera(ge),ge=St.getCamera()),j.isScene===!0&&j.onBeforeRender(M,j,ge,U),_=nt.get(j,S.length),_.init(),S.push(_),ce.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),F.setFromProjectionMatrix(ce),K=this.localClippingEnabled,V=Je.init(this.clippingPlanes,K),b=je.get(j,m.length),b.init(),m.push(b),gn(j,ge,0,M.sortObjects),b.finish(),M.sortObjects===!0&&b.sort(ee,te),this.info.render.frame++,V===!0&&Je.beginShadows();const Ee=_.state.shadowsArray;if(Pe.render(Ee,j,ge),V===!0&&Je.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(b,j),_.setupLights(M._useLegacyLights),ge.isArrayCamera){const Te=ge.cameras;for(let Ae=0,st=Te.length;Ae<st;Ae++){const dt=Te[Ae];Bn(b,j,dt,dt.viewport)}}else Bn(b,j,ge);U!==null&&(B.updateMultisampleRenderTarget(U),B.updateRenderTargetMipmap(U)),j.isScene===!0&&j.onAfterRender(M,j,ge),ct.resetDefaultState(),H=-1,A=null,S.pop(),S.length>0?_=S[S.length-1]:_=null,m.pop(),m.length>0?b=m[m.length-1]:b=null};function gn(j,ge,Ee,Te){if(j.visible===!1)return;if(j.layers.test(ge.layers)){if(j.isGroup)Ee=j.renderOrder;else if(j.isLOD)j.autoUpdate===!0&&j.update(ge);else if(j.isLight)_.pushLight(j),j.castShadow&&_.pushShadow(j);else if(j.isSprite){if(!j.frustumCulled||F.intersectsSprite(j)){Te&&pe.setFromMatrixPosition(j.matrixWorld).applyMatrix4(ce);const dt=Re.update(j),gt=j.material;gt.visible&&b.push(j,dt,gt,Ee,pe.z,null)}}else if((j.isMesh||j.isLine||j.isPoints)&&(!j.frustumCulled||F.intersectsObject(j))){const dt=Re.update(j),gt=j.material;if(Te&&(j.boundingSphere!==void 0?(j.boundingSphere===null&&j.computeBoundingSphere(),pe.copy(j.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),pe.copy(dt.boundingSphere.center)),pe.applyMatrix4(j.matrixWorld).applyMatrix4(ce)),Array.isArray(gt)){const yt=dt.groups;for(let Rt=0,bt=yt.length;Rt<bt;Rt++){const wt=yt[Rt],an=gt[wt.materialIndex];an&&an.visible&&b.push(j,dt,an,Ee,pe.z,wt)}}else gt.visible&&b.push(j,dt,gt,Ee,pe.z,null)}}const st=j.children;for(let dt=0,gt=st.length;dt<gt;dt++)gn(st[dt],ge,Ee,Te)}function Bn(j,ge,Ee,Te){const Ae=j.opaque,st=j.transmissive,dt=j.transparent;_.setupLightsView(Ee),V===!0&&Je.setGlobalState(M.clippingPlanes,Ee),st.length>0&&vn(Ae,st,ge,Ee),Te&&Y.viewport(D.copy(Te)),Ae.length>0&&sn(Ae,ge,Ee),st.length>0&&sn(st,ge,Ee),dt.length>0&&sn(dt,ge,Ee),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function vn(j,ge,Ee,Te){if((Ee.isScene===!0?Ee.overrideMaterial:null)!==null)return;const st=_e.isWebGL2;ne===null&&(ne=new $s(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")?Jo:vs,minFilter:$o,samples:st?4:0})),M.getDrawingBufferSize(fe),st?ne.setSize(fe.x,fe.y):ne.setSize(Cc(fe.x),Cc(fe.y));const dt=M.getRenderTarget();M.setRenderTarget(ne),M.getClearColor(X),N=M.getClearAlpha(),N<1&&M.setClearColor(16777215,.5),M.clear();const gt=M.toneMapping;M.toneMapping=gs,sn(j,Ee,Te),B.updateMultisampleRenderTarget(ne),B.updateRenderTargetMipmap(ne);let yt=!1;for(let Rt=0,bt=ge.length;Rt<bt;Rt++){const wt=ge[Rt],an=wt.object,Cn=wt.geometry,dn=wt.material,ui=wt.group;if(dn.side===vr&&an.layers.test(Te.layers)){const Kt=dn.side;dn.side=vi,dn.needsUpdate=!0,qn(an,Ee,Te,Cn,dn,ui),dn.side=Kt,dn.needsUpdate=!0,yt=!0}}yt===!0&&(B.updateMultisampleRenderTarget(ne),B.updateRenderTargetMipmap(ne)),M.setRenderTarget(dt),M.setClearColor(X,N),M.toneMapping=gt}function sn(j,ge,Ee){const Te=ge.isScene===!0?ge.overrideMaterial:null;for(let Ae=0,st=j.length;Ae<st;Ae++){const dt=j[Ae],gt=dt.object,yt=dt.geometry,Rt=Te===null?dt.material:Te,bt=dt.group;gt.layers.test(Ee.layers)&&qn(gt,ge,Ee,yt,Rt,bt)}}function qn(j,ge,Ee,Te,Ae,st){j.onBeforeRender(M,ge,Ee,Te,Ae,st),j.modelViewMatrix.multiplyMatrices(Ee.matrixWorldInverse,j.matrixWorld),j.normalMatrix.getNormalMatrix(j.modelViewMatrix),Ae.onBeforeRender(M,ge,Ee,Te,j,st),Ae.transparent===!0&&Ae.side===vr&&Ae.forceSinglePass===!1?(Ae.side=vi,Ae.needsUpdate=!0,M.renderBufferDirect(Ee,ge,Te,Ae,j,st),Ae.side=_s,Ae.needsUpdate=!0,M.renderBufferDirect(Ee,ge,Te,Ae,j,st),Ae.side=vr):M.renderBufferDirect(Ee,ge,Te,Ae,j,st),j.onAfterRender(M,ge,Ee,Te,Ae,st)}function Wi(j,ge,Ee){ge.isScene!==!0&&(ge=Ce);const Te=He.get(j),Ae=_.state.lights,st=_.state.shadowsArray,dt=Ae.state.version,gt=qe.getParameters(j,Ae.state,st,ge,Ee),yt=qe.getProgramCacheKey(gt);let Rt=Te.programs;Te.environment=j.isMeshStandardMaterial?ge.environment:null,Te.fog=ge.fog,Te.envMap=(j.isMeshStandardMaterial?se:I).get(j.envMap||Te.environment),Rt===void 0&&(j.addEventListener("dispose",We),Rt=new Map,Te.programs=Rt);let bt=Rt.get(yt);if(bt!==void 0){if(Te.currentProgram===bt&&Te.lightsStateVersion===dt)return ci(j,gt),bt}else gt.uniforms=qe.getUniforms(j),j.onBuild(Ee,gt,M),j.onBeforeCompile(gt,M),bt=qe.acquireProgram(gt,yt),Rt.set(yt,bt),Te.uniforms=gt.uniforms;const wt=Te.uniforms;return(!j.isShaderMaterial&&!j.isRawShaderMaterial||j.clipping===!0)&&(wt.clippingPlanes=Je.uniform),ci(j,gt),Te.needsLights=Pi(j),Te.lightsStateVersion=dt,Te.needsLights&&(wt.ambientLightColor.value=Ae.state.ambient,wt.lightProbe.value=Ae.state.probe,wt.directionalLights.value=Ae.state.directional,wt.directionalLightShadows.value=Ae.state.directionalShadow,wt.spotLights.value=Ae.state.spot,wt.spotLightShadows.value=Ae.state.spotShadow,wt.rectAreaLights.value=Ae.state.rectArea,wt.ltc_1.value=Ae.state.rectAreaLTC1,wt.ltc_2.value=Ae.state.rectAreaLTC2,wt.pointLights.value=Ae.state.point,wt.pointLightShadows.value=Ae.state.pointShadow,wt.hemisphereLights.value=Ae.state.hemi,wt.directionalShadowMap.value=Ae.state.directionalShadowMap,wt.directionalShadowMatrix.value=Ae.state.directionalShadowMatrix,wt.spotShadowMap.value=Ae.state.spotShadowMap,wt.spotLightMatrix.value=Ae.state.spotLightMatrix,wt.spotLightMap.value=Ae.state.spotLightMap,wt.pointShadowMap.value=Ae.state.pointShadowMap,wt.pointShadowMatrix.value=Ae.state.pointShadowMatrix),Te.currentProgram=bt,Te.uniformsList=null,bt}function Ri(j){if(j.uniformsList===null){const ge=j.currentProgram.getUniforms();j.uniformsList=yc.seqWithValue(ge.seq,j.uniforms)}return j.uniformsList}function ci(j,ge){const Ee=He.get(j);Ee.outputColorSpace=ge.outputColorSpace,Ee.batching=ge.batching,Ee.instancing=ge.instancing,Ee.instancingColor=ge.instancingColor,Ee.skinning=ge.skinning,Ee.morphTargets=ge.morphTargets,Ee.morphNormals=ge.morphNormals,Ee.morphColors=ge.morphColors,Ee.morphTargetsCount=ge.morphTargetsCount,Ee.numClippingPlanes=ge.numClippingPlanes,Ee.numIntersection=ge.numClipIntersection,Ee.vertexAlphas=ge.vertexAlphas,Ee.vertexTangents=ge.vertexTangents,Ee.toneMapping=ge.toneMapping}function yi(j,ge,Ee,Te,Ae){ge.isScene!==!0&&(ge=Ce),B.resetTextureUnits();const st=ge.fog,dt=Te.isMeshStandardMaterial?ge.environment:null,gt=U===null?M.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Vr,yt=(Te.isMeshStandardMaterial?se:I).get(Te.envMap||dt),Rt=Te.vertexColors===!0&&!!Ee.attributes.color&&Ee.attributes.color.itemSize===4,bt=!!Ee.attributes.tangent&&(!!Te.normalMap||Te.anisotropy>0),wt=!!Ee.morphAttributes.position,an=!!Ee.morphAttributes.normal,Cn=!!Ee.morphAttributes.color;let dn=gs;Te.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(dn=M.toneMapping);const ui=Ee.morphAttributes.position||Ee.morphAttributes.normal||Ee.morphAttributes.color,Kt=ui!==void 0?ui.length:0,Mt=He.get(Te),Ss=_.state.lights;if(V===!0&&(K===!0||j!==A)){const Zt=j===A&&Te.id===H;Je.setState(Te,j,Zt)}let Tt=!1;Te.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==Ss.state.version||Mt.outputColorSpace!==gt||Ae.isBatchedMesh&&Mt.batching===!1||!Ae.isBatchedMesh&&Mt.batching===!0||Ae.isInstancedMesh&&Mt.instancing===!1||!Ae.isInstancedMesh&&Mt.instancing===!0||Ae.isSkinnedMesh&&Mt.skinning===!1||!Ae.isSkinnedMesh&&Mt.skinning===!0||Ae.isInstancedMesh&&Mt.instancingColor===!0&&Ae.instanceColor===null||Ae.isInstancedMesh&&Mt.instancingColor===!1&&Ae.instanceColor!==null||Mt.envMap!==yt||Te.fog===!0&&Mt.fog!==st||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Je.numPlanes||Mt.numIntersection!==Je.numIntersection)||Mt.vertexAlphas!==Rt||Mt.vertexTangents!==bt||Mt.morphTargets!==wt||Mt.morphNormals!==an||Mt.morphColors!==Cn||Mt.toneMapping!==dn||_e.isWebGL2===!0&&Mt.morphTargetsCount!==Kt)&&(Tt=!0):(Tt=!0,Mt.__version=Te.version);let Ni=Mt.currentProgram;Tt===!0&&(Ni=Wi(Te,ge,Ae));let ws=!1,cr=!1,wr=!1;const Mn=Ni.getUniforms(),Rn=Mt.uniforms;if(Y.useProgram(Ni.program)&&(ws=!0,cr=!0,wr=!0),Te.id!==H&&(H=Te.id,cr=!0),ws||A!==j){Mn.setValue(re,"projectionMatrix",j.projectionMatrix),Mn.setValue(re,"viewMatrix",j.matrixWorldInverse);const Zt=Mn.map.cameraPosition;Zt!==void 0&&Zt.setValue(re,pe.setFromMatrixPosition(j.matrixWorld)),_e.logarithmicDepthBuffer&&Mn.setValue(re,"logDepthBufFC",2/(Math.log(j.far+1)/Math.LN2)),(Te.isMeshPhongMaterial||Te.isMeshToonMaterial||Te.isMeshLambertMaterial||Te.isMeshBasicMaterial||Te.isMeshStandardMaterial||Te.isShaderMaterial)&&Mn.setValue(re,"isOrthographic",j.isOrthographicCamera===!0),A!==j&&(A=j,cr=!0,wr=!0)}if(Ae.isSkinnedMesh){Mn.setOptional(re,Ae,"bindMatrix"),Mn.setOptional(re,Ae,"bindMatrixInverse");const Zt=Ae.skeleton;Zt&&(_e.floatVertexTextures?(Zt.boneTexture===null&&Zt.computeBoneTexture(),Mn.setValue(re,"boneTexture",Zt.boneTexture,B)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Ae.isBatchedMesh&&(Mn.setOptional(re,Ae,"batchingTexture"),Mn.setValue(re,"batchingTexture",Ae._matricesTexture,B));const ur=Ee.morphAttributes;if((ur.position!==void 0||ur.normal!==void 0||ur.color!==void 0&&_e.isWebGL2===!0)&&pt.update(Ae,Ee,Ni),(cr||Mt.receiveShadow!==Ae.receiveShadow)&&(Mt.receiveShadow=Ae.receiveShadow,Mn.setValue(re,"receiveShadow",Ae.receiveShadow)),Te.isMeshGouraudMaterial&&Te.envMap!==null&&(Rn.envMap.value=yt,Rn.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),cr&&(Mn.setValue(re,"toneMappingExposure",M.toneMappingExposure),Mt.needsLights&&bi(Rn,wr),st&&Te.fog===!0&&Oe.refreshFogUniforms(Rn,st),Oe.refreshMaterialUniforms(Rn,Te,ie,Q,ne),yc.upload(re,Ri(Mt),Rn,B)),Te.isShaderMaterial&&Te.uniformsNeedUpdate===!0&&(yc.upload(re,Ri(Mt),Rn,B),Te.uniformsNeedUpdate=!1),Te.isSpriteMaterial&&Mn.setValue(re,"center",Ae.center),Mn.setValue(re,"modelViewMatrix",Ae.modelViewMatrix),Mn.setValue(re,"normalMatrix",Ae.normalMatrix),Mn.setValue(re,"modelMatrix",Ae.matrixWorld),Te.isShaderMaterial||Te.isRawShaderMaterial){const Zt=Te.uniformsGroups;for(let Mr=0,Zs=Zt.length;Mr<Zs;Mr++)if(_e.isWebGL2){const Qs=Zt[Mr];It.update(Qs,Ni),It.bind(Qs,Ni)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ni}function bi(j,ge){j.ambientLightColor.needsUpdate=ge,j.lightProbe.needsUpdate=ge,j.directionalLights.needsUpdate=ge,j.directionalLightShadows.needsUpdate=ge,j.pointLights.needsUpdate=ge,j.pointLightShadows.needsUpdate=ge,j.spotLights.needsUpdate=ge,j.spotLightShadows.needsUpdate=ge,j.rectAreaLights.needsUpdate=ge,j.hemisphereLights.needsUpdate=ge}function Pi(j){return j.isMeshLambertMaterial||j.isMeshToonMaterial||j.isMeshPhongMaterial||j.isMeshStandardMaterial||j.isShadowMaterial||j.isShaderMaterial&&j.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(j,ge,Ee){He.get(j.texture).__webglTexture=ge,He.get(j.depthTexture).__webglTexture=Ee;const Te=He.get(j);Te.__hasExternalTextures=!0,Te.__hasExternalTextures&&(Te.__autoAllocateDepthBuffer=Ee===void 0,Te.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(j,ge){const Ee=He.get(j);Ee.__webglFramebuffer=ge,Ee.__useDefaultFramebuffer=ge===void 0},this.setRenderTarget=function(j,ge=0,Ee=0){U=j,q=ge,G=Ee;let Te=!0,Ae=null,st=!1,dt=!1;if(j){const yt=He.get(j);yt.__useDefaultFramebuffer!==void 0?(Y.bindFramebuffer(re.FRAMEBUFFER,null),Te=!1):yt.__webglFramebuffer===void 0?B.setupRenderTarget(j):yt.__hasExternalTextures&&B.rebindTextures(j,He.get(j.texture).__webglTexture,He.get(j.depthTexture).__webglTexture);const Rt=j.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(dt=!0);const bt=He.get(j).__webglFramebuffer;j.isWebGLCubeRenderTarget?(Array.isArray(bt[ge])?Ae=bt[ge][Ee]:Ae=bt[ge],st=!0):_e.isWebGL2&&j.samples>0&&B.useMultisampledRTT(j)===!1?Ae=He.get(j).__webglMultisampledFramebuffer:Array.isArray(bt)?Ae=bt[Ee]:Ae=bt,D.copy(j.viewport),E.copy(j.scissor),R=j.scissorTest}else D.copy(ae).multiplyScalar(ie).floor(),E.copy(xe).multiplyScalar(ie).floor(),R=T;if(Y.bindFramebuffer(re.FRAMEBUFFER,Ae)&&_e.drawBuffers&&Te&&Y.drawBuffers(j,Ae),Y.viewport(D),Y.scissor(E),Y.setScissorTest(R),st){const yt=He.get(j.texture);re.framebufferTexture2D(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,re.TEXTURE_CUBE_MAP_POSITIVE_X+ge,yt.__webglTexture,Ee)}else if(dt){const yt=He.get(j.texture),Rt=ge||0;re.framebufferTextureLayer(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,yt.__webglTexture,Ee||0,Rt)}H=-1},this.readRenderTargetPixels=function(j,ge,Ee,Te,Ae,st,dt){if(!(j&&j.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=He.get(j).__webglFramebuffer;if(j.isWebGLCubeRenderTarget&&dt!==void 0&&(gt=gt[dt]),gt){Y.bindFramebuffer(re.FRAMEBUFFER,gt);try{const yt=j.texture,Rt=yt.format,bt=yt.type;if(Rt!==rr&&$e.convert(Rt)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const wt=bt===Jo&&(Ve.has("EXT_color_buffer_half_float")||_e.isWebGL2&&Ve.has("EXT_color_buffer_float"));if(bt!==vs&&$e.convert(bt)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_TYPE)&&!(bt===ds&&(_e.isWebGL2||Ve.has("OES_texture_float")||Ve.has("WEBGL_color_buffer_float")))&&!wt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ge>=0&&ge<=j.width-Te&&Ee>=0&&Ee<=j.height-Ae&&re.readPixels(ge,Ee,Te,Ae,$e.convert(Rt),$e.convert(bt),st)}finally{const yt=U!==null?He.get(U).__webglFramebuffer:null;Y.bindFramebuffer(re.FRAMEBUFFER,yt)}}},this.copyFramebufferToTexture=function(j,ge,Ee=0){const Te=Math.pow(2,-Ee),Ae=Math.floor(ge.image.width*Te),st=Math.floor(ge.image.height*Te);B.setTexture2D(ge,0),re.copyTexSubImage2D(re.TEXTURE_2D,Ee,0,0,j.x,j.y,Ae,st),Y.unbindTexture()},this.copyTextureToTexture=function(j,ge,Ee,Te=0){const Ae=ge.image.width,st=ge.image.height,dt=$e.convert(Ee.format),gt=$e.convert(Ee.type);B.setTexture2D(Ee,0),re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,Ee.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Ee.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,Ee.unpackAlignment),ge.isDataTexture?re.texSubImage2D(re.TEXTURE_2D,Te,j.x,j.y,Ae,st,dt,gt,ge.image.data):ge.isCompressedTexture?re.compressedTexSubImage2D(re.TEXTURE_2D,Te,j.x,j.y,ge.mipmaps[0].width,ge.mipmaps[0].height,dt,ge.mipmaps[0].data):re.texSubImage2D(re.TEXTURE_2D,Te,j.x,j.y,dt,gt,ge.image),Te===0&&Ee.generateMipmaps&&re.generateMipmap(re.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(j,ge,Ee,Te,Ae=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const st=j.max.x-j.min.x+1,dt=j.max.y-j.min.y+1,gt=j.max.z-j.min.z+1,yt=$e.convert(Te.format),Rt=$e.convert(Te.type);let bt;if(Te.isData3DTexture)B.setTexture3D(Te,0),bt=re.TEXTURE_3D;else if(Te.isDataArrayTexture||Te.isCompressedArrayTexture)B.setTexture2DArray(Te,0),bt=re.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,Te.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Te.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,Te.unpackAlignment);const wt=re.getParameter(re.UNPACK_ROW_LENGTH),an=re.getParameter(re.UNPACK_IMAGE_HEIGHT),Cn=re.getParameter(re.UNPACK_SKIP_PIXELS),dn=re.getParameter(re.UNPACK_SKIP_ROWS),ui=re.getParameter(re.UNPACK_SKIP_IMAGES),Kt=Ee.isCompressedTexture?Ee.mipmaps[Ae]:Ee.image;re.pixelStorei(re.UNPACK_ROW_LENGTH,Kt.width),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,Kt.height),re.pixelStorei(re.UNPACK_SKIP_PIXELS,j.min.x),re.pixelStorei(re.UNPACK_SKIP_ROWS,j.min.y),re.pixelStorei(re.UNPACK_SKIP_IMAGES,j.min.z),Ee.isDataTexture||Ee.isData3DTexture?re.texSubImage3D(bt,Ae,ge.x,ge.y,ge.z,st,dt,gt,yt,Rt,Kt.data):Ee.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),re.compressedTexSubImage3D(bt,Ae,ge.x,ge.y,ge.z,st,dt,gt,yt,Kt.data)):re.texSubImage3D(bt,Ae,ge.x,ge.y,ge.z,st,dt,gt,yt,Rt,Kt),re.pixelStorei(re.UNPACK_ROW_LENGTH,wt),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,an),re.pixelStorei(re.UNPACK_SKIP_PIXELS,Cn),re.pixelStorei(re.UNPACK_SKIP_ROWS,dn),re.pixelStorei(re.UNPACK_SKIP_IMAGES,ui),Ae===0&&Te.generateMipmaps&&re.generateMipmap(bt),Y.unbindTexture()},this.initTexture=function(j){j.isCubeTexture?B.setTextureCube(j,0):j.isData3DTexture?B.setTexture3D(j,0):j.isDataArrayTexture||j.isCompressedArrayTexture?B.setTexture2DArray(j,0):B.setTexture2D(j,0),Y.unbindTexture()},this.resetState=function(){q=0,G=0,U=null,Y.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ed?"display-p3":"srgb",t.unpackColorSpace=$t.workingColorSpace===kc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Hn?js:pm}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===js?Hn:Vr}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class By extends Hc{}By.prototype.isWebGL1Renderer=!0;class ld extends Vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Um extends oo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const wp=new wn,Rh=new nd,hc=new Bc,dc=new be;class zy extends Vn{constructor(e=new qi,t=new Um){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),hc.copy(i.boundingSphere),hc.applyMatrix4(r),hc.radius+=s,e.ray.intersectsSphere(hc)===!1)return;wp.copy(r).invert(),Rh.copy(e.ray).applyMatrix4(wp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=i.index,p=i.attributes.position;if(u!==null){const g=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let x=g,b=d;x<b;x++){const _=u.getX(x);dc.fromBufferAttribute(p,_),Mp(dc,_,l,r,e,t,this)}}else{const g=Math.max(0,a.start),d=Math.min(p.count,a.start+a.count);for(let x=g,b=d;x<b;x++)dc.fromBufferAttribute(p,x),Mp(dc,x,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Mp(n,e,t,i,r,s,a){const o=Rh.distanceSqToPoint(n);if(o<t){const l=new be;Rh.closestPointToPoint(n,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class cd extends qi{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const u=this;r=Math.floor(r),s=Math.floor(s);const h=[],p=[],g=[],d=[];let x=0;const b=[],_=i/2;let m=0;S(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ei(p,3)),this.setAttribute("normal",new ei(g,3)),this.setAttribute("uv",new ei(d,2));function S(){const P=new be,q=new be;let G=0;const U=(t-e)/i;for(let H=0;H<=s;H++){const A=[],D=H/s,E=D*(t-e)+e;for(let R=0;R<=r;R++){const X=R/r,N=X*l+o,J=Math.sin(N),Q=Math.cos(N);q.x=E*J,q.y=-D*i+_,q.z=E*Q,p.push(q.x,q.y,q.z),P.set(J,U,Q).normalize(),g.push(P.x,P.y,P.z),d.push(X,1-D),A.push(x++)}b.push(A)}for(let H=0;H<r;H++)for(let A=0;A<s;A++){const D=b[A][H],E=b[A+1][H],R=b[A+1][H+1],X=b[A][H+1];h.push(D,E,X),h.push(E,R,X),G+=6}u.addGroup(m,G,0),m+=G}function M(P){const q=x,G=new kt,U=new be;let H=0;const A=P===!0?e:t,D=P===!0?1:-1;for(let R=1;R<=r;R++)p.push(0,_*D,0),g.push(0,D,0),d.push(.5,.5),x++;const E=x;for(let R=0;R<=r;R++){const N=R/r*l+o,J=Math.cos(N),Q=Math.sin(N);U.x=A*Q,U.y=_*D,U.z=A*J,p.push(U.x,U.y,U.z),g.push(0,D,0),G.x=J*.5+.5,G.y=Q*.5*D+.5,d.push(G.x,G.y),x++}for(let R=0;R<r;R++){const X=q+R,N=E+R;P===!0?h.push(N,N+1,X):h.push(N+1,N,X),H+=3}u.addGroup(m,H,P===!0?1:2),m+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cd(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ud extends qi{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],u=[],h=[];let p=e;const g=(t-e)/r,d=new be,x=new kt;for(let b=0;b<=r;b++){for(let _=0;_<=i;_++){const m=s+_/i*a;d.x=p*Math.cos(m),d.y=p*Math.sin(m),l.push(d.x,d.y,d.z),u.push(0,0,1),x.x=(d.x/t+1)/2,x.y=(d.y/t+1)/2,h.push(x.x,x.y)}p+=g}for(let b=0;b<r;b++){const _=b*(i+1);for(let m=0;m<i;m++){const S=m+_,M=S,P=S+i+1,q=S+i+2,G=S+1;o.push(M,P,G),o.push(P,q,G)}}this.setIndex(o),this.setAttribute("position",new ei(l,3)),this.setAttribute("normal",new ei(u,3)),this.setAttribute("uv",new ei(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ud(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class hd extends qi{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let u=0;const h=[],p=new be,g=new be,d=[],x=[],b=[],_=[];for(let m=0;m<=i;m++){const S=[],M=m/i;let P=0;m===0&&a===0?P=.5/t:m===i&&l===Math.PI&&(P=-.5/t);for(let q=0;q<=t;q++){const G=q/t;p.x=-e*Math.cos(r+G*s)*Math.sin(a+M*o),p.y=e*Math.cos(a+M*o),p.z=e*Math.sin(r+G*s)*Math.sin(a+M*o),x.push(p.x,p.y,p.z),g.copy(p).normalize(),b.push(g.x,g.y,g.z),_.push(G+P,1-M),S.push(u++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<t;S++){const M=h[m][S+1],P=h[m][S],q=h[m+1][S],G=h[m+1][S+1];(m!==0||a>0)&&d.push(M,P,G),(m!==i-1||l<Math.PI)&&d.push(P,q,G)}this.setIndex(d),this.setAttribute("position",new ei(x,3)),this.setAttribute("normal",new ei(b,3)),this.setAttribute("uv",new ei(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hd(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class mi extends oo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mm,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dd extends Vn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const sh=new wn,Ap=new be,Ep=new be;class Om{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.map=null,this.mapPass=null,this.matrix=new wn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sd,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ap.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ap),Ep.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ep),t.updateMatrixWorld(),sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sh),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Tp=new wn,Go=new be,ah=new be;class Gy extends Om{constructor(){super(new li(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new kt(4,2),this._viewportCount=6,this._viewports=[new un(2,1,1,1),new un(0,1,1,1),new un(3,1,1,1),new un(1,1,1,1),new un(3,0,1,1),new un(1,0,1,1)],this._cubeDirections=[new be(1,0,0),new be(-1,0,0),new be(0,0,1),new be(0,0,-1),new be(0,1,0),new be(0,-1,0)],this._cubeUps=[new be(0,1,0),new be(0,1,0),new be(0,1,0),new be(0,1,0),new be(0,0,1),new be(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Go.setFromMatrixPosition(e.matrixWorld),i.position.copy(Go),ah.copy(i.position),ah.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ah),i.updateMatrixWorld(),r.makeTranslation(-Go.x,-Go.y,-Go.z),Tp.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tp)}}class fd extends dd{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Gy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Hy extends Om{constructor(){super(new Cm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ph extends dd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vn.DEFAULT_UP),this.updateMatrix(),this.target=new Vn,this.shadow=new Hy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class pd extends dd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class km{constructor(e,t,i=0,r=1/0){this.ray=new nd(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new id,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Nh(e,this,i,t),i.sort(Lp),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Nh(e[r],this,i,t);return i.sort(Lp),i}}function Lp(n,e){return n.distance-e.distance}function Nh(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)Nh(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zh);class Vy{constructor(e,t={}){this.container=e,this.options=t,this.faultPins=[],this.pinMeshes=[],this.isDragging=!1,this.previousMousePosition={x:0,y:0},this.isARActive=!1,this.videoStream=null,this.videoElement=null,this.initScene(),this.createLaptopModel(),this.setupLights(),this.setupEventListeners(),this.animate()}initScene(){this.width=this.container.clientWidth||800,this.height=this.container.clientHeight||480,this.scene=new ld,this.scene.background=new Ut(659229),this.camera=new li(45,this.width/this.height,.1,1e3),this.camera.position.set(0,3.2,5.5),this.camera.lookAt(0,0,0),this.renderer=new Hc({antialias:!0,preserveDrawingBuffer:!0,alpha:!0}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=rm,this.container.innerHTML="",this.videoElement=document.createElement("video"),this.videoElement.autoplay=!0,this.videoElement.playsInline=!0,this.videoElement.style.cssText="position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:none; z-index:1;",this.container.appendChild(this.videoElement),this.renderer.domElement.style.position="relative",this.renderer.domElement.style.zIndex="2",this.container.appendChild(this.renderer.domElement),this.raycaster=new km,this.mouse=new kt,this.laptopGroup=new sr,this.scene.add(this.laptopGroup),this.pinsGroup=new sr,this.scene.add(this.pinsGroup)}createLaptopModel(){const e=new mi({color:1712432,roughness:.3,metalness:.8}),t=new mi({color:988192,roughness:.6,metalness:.2}),i=new mi({color:330260,roughness:.1,metalness:.9}),r=new mi({color:58879,emissive:58879,emissiveIntensity:.3,roughness:.2}),s=new cn(3.2,.15,2.2),a=new Ht(s,e);a.position.y=0,a.castShadow=!0,a.receiveShadow=!0,a.name="Carcasa Base Inferior",this.laptopGroup.add(a);const o=new cn(.9,.01,.6),l=new Ht(o,r);l.position.set(0,.08,.65),l.name="Touchpad / Cursor",this.laptopGroup.add(l);const u=new cn(2.8,.02,1.1),h=new Ht(u,t);h.position.set(0,.08,-.25),h.name="Teclado Principal",this.laptopGroup.add(h);for(let q=0;q<5;q++)for(let G=0;G<12;G++){const U=new cn(.18,.02,.16),H=new Ht(U,e);H.position.set(-1.2+G*.22,.1,-.65+q*.2),H.name=`Tecla K-${q}-${G}`,this.laptopGroup.add(H)}this.screenLidGroup=new sr,this.screenLidGroup.position.set(0,.08,-1.05);const p=new cn(3.2,2.1,.1);p.translate(0,1.05,0);const g=new Ht(p,e);g.castShadow=!0,g.name="Tapa / Carcasa de Pantalla",this.screenLidGroup.add(g);const d=new cn(2.9,1.8,.02);d.translate(0,1.05,.05);const x=new Ht(d,i);x.name="Pantalla Display LCD/LED",this.screenLidGroup.add(x);const b=new cn(.4,.05,.02);b.translate(0,.15,.06);const _=new Ht(b,r);_.name="Logo de Marca JSR",this.screenLidGroup.add(_),this.screenLidGroup.rotation.x=vm.degToRad(-25),this.laptopGroup.add(this.screenLidGroup);const m=new cn(.02,.05,.2),S=new Ht(m,r);S.position.set(-1.61,0,.2),S.name="Puerto USB-A Izquierdo",this.laptopGroup.add(S);const M=new Ht(m,r);M.position.set(-1.61,0,-.3),M.name="Puerto HDMI / DisplayPort",this.laptopGroup.add(M);const P=new Ht(m,r);P.position.set(1.61,0,.1),P.name="Puerto USB-C / Carga",this.laptopGroup.add(P)}setupLights(){const e=new pd(16777215,.8);this.scene.add(e);const t=new Ph(58879,1.2);t.position.set(5,8,5),t.castShadow=!0,this.scene.add(t);const i=new Ph(9133302,.8);i.position.set(-5,4,-5),this.scene.add(i);const r=new fd(16777215,.5,10);r.position.set(0,3,2),this.scene.add(r)}setupEventListeners(){const e=this.renderer.domElement;e.addEventListener("pointerdown",t=>{this.isDragging=!1,this.previousMousePosition={x:t.clientX,y:t.clientY}}),e.addEventListener("pointermove",t=>{const i=Math.abs(t.clientX-this.previousMousePosition.x),r=Math.abs(t.clientY-this.previousMousePosition.y);(i>3||r>3)&&(this.isDragging=!0),t.buttons===1?(this.laptopGroup.rotation.y+=(t.clientX-this.previousMousePosition.x)*.01,this.laptopGroup.rotation.x+=(t.clientY-this.previousMousePosition.y)*.008,this.laptopGroup.rotation.x=Math.max(-.5,Math.min(1.2,this.laptopGroup.rotation.x))):t.buttons===2&&(this.camera.position.x-=(t.clientX-this.previousMousePosition.x)*.005,this.camera.position.y+=(t.clientY-this.previousMousePosition.y)*.005),this.previousMousePosition={x:t.clientX,y:t.clientY}}),e.addEventListener("contextmenu",t=>t.preventDefault()),e.addEventListener("wheel",t=>{t.preventDefault(),this.camera.position.z+=t.deltaY*.003,this.camera.position.z=Math.max(2.5,Math.min(10,this.camera.position.z))}),e.addEventListener("click",t=>{if(this.isDragging)return;const i=e.getBoundingClientRect();this.mouse.x=(t.clientX-i.left)/this.width*2-1,this.mouse.y=-((t.clientY-i.top)/this.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const r=this.raycaster.intersectObjects(this.laptopGroup.children,!0);if(r.length>0){const s=r[0],a=s.object.name||"Componente Exterior";this.options.onPointClick&&this.options.onPointClick({point:s.point,partName:a,worldPoint:s.point})}}),window.addEventListener("resize",()=>this.onWindowResize())}addFaultPin(e){const t=new hd(.08,16,16),i=new mi({color:16724838,emissive:16724838,emissiveIntensity:.8,roughness:.2}),r=new Ht(t,i);r.position.set(e.x,e.y,e.z);const s=new ud(.1,.16,24),a=new rd({color:16724838,side:vr,transparent:!0,opacity:.8}),o=new Ht(s,a);o.rotation.x=Math.PI/2,r.add(o),r.userData=e,this.pinsGroup.add(r),this.pinMeshes.push(r)}clearFaultPins(){this.pinMeshes.forEach(e=>this.pinsGroup.remove(e)),this.pinMeshes=[]}captureSnapshot(){return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}async toggleARMode(e){if(this.isARActive=e,e){this.scene.background=null,this.renderer.setClearColor(0,0);try{navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(this.videoStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),this.videoElement.srcObject=this.videoStream,this.videoElement.style.display="block")}catch(t){console.warn("Camera access denied or unavailable, using AR WebXR Passthrough Simulation:",t),this.container.style.backgroundImage="radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(6, 10, 20, 0.9) 100%)"}}else this.videoStream&&(this.videoStream.getTracks().forEach(t=>t.stop()),this.videoStream=null),this.videoElement.style.display="none",this.container.style.backgroundImage="",this.scene.background=new Ut(659229)}resetView(){this.laptopGroup.rotation.set(0,0,0),this.camera.position.set(0,3.2,5.5),this.camera.lookAt(0,0,0)}onWindowResize(){this.container&&(this.width=this.container.clientWidth||800,this.height=this.container.clientHeight||480,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height))}animate(){requestAnimationFrame(()=>this.animate());const e=Date.now()*.004;this.pinMeshes.forEach(t=>{const i=t.children[0];if(i){const r=1+Math.sin(e)*.3;i.scale.set(r,r,r)}}),this.renderer.render(this.scene,this.camera)}destroy(){this.renderer&&this.renderer.domElement&&this.renderer.domElement.remove()}}const qy="modulepreload",Wy=function(n){return"/"+n},Cp={},Ih=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(l=>{if(l=Wy(l),l in Cp)return;Cp[l]=!0;const u=l.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":qy,u||(p.as="script"),p.crossOrigin="",p.href=l,o&&p.setAttribute("nonce",o),document.head.appendChild(p),u)return new Promise((g,d)=>{p.addEventListener("load",g),p.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};function Xt(n){"@babel/helpers - typeof";return Xt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Xt(n)}var Qn=Uint8Array,Ti=Uint16Array,md=Int32Array,Vc=new Qn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),qc=new Qn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Dh=new Qn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Bm=function(n,e){for(var t=new Ti(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var r=new md(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)r[s]=s-t[i]<<5|i;return{b:t,r}},zm=Bm(Vc,2),Gm=zm.b,Fh=zm.r;Gm[28]=258,Fh[258]=28;var Hm=Bm(qc,0),jy=Hm.b,Rp=Hm.r,Uh=new Ti(32768);for(var ln=0;ln<32768;++ln){var cs=(ln&43690)>>1|(ln&21845)<<1;cs=(cs&52428)>>2|(cs&13107)<<2,cs=(cs&61680)>>4|(cs&3855)<<4,Uh[ln]=((cs&65280)>>8|(cs&255)<<8)>>1}var br=function(n,e,t){for(var i=n.length,r=0,s=new Ti(e);r<i;++r)n[r]&&++s[n[r]-1];var a=new Ti(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new Ti(1<<e);var l=15-e;for(r=0;r<i;++r)if(n[r])for(var u=r<<4|n[r],h=e-n[r],p=a[n[r]-1]++<<h,g=p|(1<<h)-1;p<=g;++p)o[Uh[p]>>l]=u}else for(o=new Ti(i),r=0;r<i;++r)n[r]&&(o[r]=Uh[a[n[r]-1]++]>>15-n[r]);return o},ys=new Qn(288);for(var ln=0;ln<144;++ln)ys[ln]=8;for(var ln=144;ln<256;++ln)ys[ln]=9;for(var ln=256;ln<280;++ln)ys[ln]=7;for(var ln=280;ln<288;++ln)ys[ln]=8;var Zo=new Qn(32);for(var ln=0;ln<32;++ln)Zo[ln]=5;var Xy=br(ys,9,0),Yy=br(ys,9,1),$y=br(Zo,5,0),Jy=br(Zo,5,1),oh=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Qi=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},lh=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},gd=function(n){return(n+7)/8|0},Vm=function(n,e,t){return(t==null||t>n.length)&&(t=n.length),new Qn(n.subarray(e,t))},Ky=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],tr=function(n,e,t){var i=new Error(e||Ky[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,tr),!t)throw i;return i},Zy=function(n,e,t,i){var r=n.length,s=0;if(!r||e.f&&!e.l)return t||new Qn(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new Qn(r*3));var u=function(Ie){var re=t.length;if(Ie>re){var Xe=new Qn(Math.max(re*2,Ie));Xe.set(t),t=Xe}},h=e.f||0,p=e.p||0,g=e.b||0,d=e.l,x=e.d,b=e.m,_=e.n,m=r*8;do{if(!d){h=Qi(n,p,1);var S=Qi(n,p+1,3);if(p+=3,S)if(S==1)d=Yy,x=Jy,b=9,_=5;else if(S==2){var G=Qi(n,p,31)+257,U=Qi(n,p+10,15)+4,H=G+Qi(n,p+5,31)+1;p+=14;for(var A=new Qn(H),D=new Qn(19),E=0;E<U;++E)D[Dh[E]]=Qi(n,p+E*3,7);p+=U*3;for(var R=oh(D),X=(1<<R)-1,N=br(D,R,1),E=0;E<H;){var J=N[Qi(n,p,X)];p+=J&15;var M=J>>4;if(M<16)A[E++]=M;else{var Q=0,ie=0;for(M==16?(ie=3+Qi(n,p,3),p+=2,Q=A[E-1]):M==17?(ie=3+Qi(n,p,7),p+=3):M==18&&(ie=11+Qi(n,p,127),p+=7);ie--;)A[E++]=Q}}var ee=A.subarray(0,G),te=A.subarray(G);b=oh(ee),_=oh(te),d=br(ee,b,1),x=br(te,_,1)}else tr(1);else{var M=gd(p)+4,P=n[M-4]|n[M-3]<<8,q=M+P;if(q>r){l&&tr(0);break}o&&u(g+P),t.set(n.subarray(M,q),g),e.b=g+=P,e.p=p=q*8,e.f=h;continue}if(p>m){l&&tr(0);break}}o&&u(g+131072);for(var ae=(1<<b)-1,xe=(1<<_)-1,T=p;;T=p){var Q=d[lh(n,p)&ae],F=Q>>4;if(p+=Q&15,p>m){l&&tr(0);break}if(Q||tr(2),F<256)t[g++]=F;else if(F==256){T=p,d=null;break}else{var V=F-254;if(F>264){var E=F-257,K=Vc[E];V=Qi(n,p,(1<<K)-1)+Gm[E],p+=K}var ne=x[lh(n,p)&xe],ce=ne>>4;ne||tr(3),p+=ne&15;var te=jy[ce];if(ce>3){var K=qc[ce];te+=lh(n,p)&(1<<K)-1,p+=K}if(p>m){l&&tr(0);break}o&&u(g+131072);var fe=g+V;if(g<te){var pe=s-te,Ce=Math.min(te,fe);for(pe+g<0&&tr(3);g<Ce;++g)t[g]=i[pe+g]}for(;g<fe;++g)t[g]=t[g-te]}}e.l=d,e.p=T,e.b=g,e.f=h,d&&(h=1,e.m=b,e.d=x,e.n=_)}while(!h);return g!=t.length&&a?Vm(t,0,g):t.subarray(0,g)},Br=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},Ho=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},ch=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var r=t.length,s=t.slice();if(!r)return{t:Wm,l:0};if(r==1){var a=new Qn(t[0].s+1);return a[t[0].s]=1,{t:a,l:1}}t.sort(function(q,G){return q.f-G.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],u=0,h=1,p=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};h!=r-1;)o=t[t[u].f<t[p].f?u++:p++],l=t[u!=h&&t[u].f<t[p].f?u++:p++],t[h++]={s:-1,f:o.f+l.f,l:o,r:l};for(var g=s[0].s,i=1;i<r;++i)s[i].s>g&&(g=s[i].s);var d=new Ti(g+1),x=Oh(t[h-1],d,0);if(x>e){var i=0,b=0,_=x-e,m=1<<_;for(s.sort(function(G,U){return d[U.s]-d[G.s]||G.f-U.f});i<r;++i){var S=s[i].s;if(d[S]>e)b+=m-(1<<x-d[S]),d[S]=e;else break}for(b>>=_;b>0;){var M=s[i].s;d[M]<e?b-=1<<e-d[M]++-1:++i}for(;i>=0&&b;--i){var P=s[i].s;d[P]==e&&(--d[P],++b)}x=e}return{t:new Qn(d),l:x}},Oh=function(n,e,t){return n.s==-1?Math.max(Oh(n.l,e,t+1),Oh(n.r,e,t+1)):e[n.s]=t},Pp=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new Ti(++e),i=0,r=n[0],s=1,a=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==r&&o!=e)++s;else{if(!r&&s>2){for(;s>138;s-=138)a(32754);s>2&&(a(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(a(r),--s;s>6;s-=6)a(8304);s>2&&(a(s-3<<5|8208),s=0)}for(;s--;)a(r);s=1,r=n[o]}return{c:t.subarray(0,i),n:e}},Vo=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},qm=function(n,e,t){var i=t.length,r=gd(e+2);n[r]=i&255,n[r+1]=i>>8,n[r+2]=n[r]^255,n[r+3]=n[r+1]^255;for(var s=0;s<i;++s)n[r+s+4]=t[s];return(r+4+i)*8},Np=function(n,e,t,i,r,s,a,o,l,u,h){Br(e,h++,t),++r[256];for(var p=ch(r,15),g=p.t,d=p.l,x=ch(s,15),b=x.t,_=x.l,m=Pp(g),S=m.c,M=m.n,P=Pp(b),q=P.c,G=P.n,U=new Ti(19),H=0;H<S.length;++H)++U[S[H]&31];for(var H=0;H<q.length;++H)++U[q[H]&31];for(var A=ch(U,7),D=A.t,E=A.l,R=19;R>4&&!D[Dh[R-1]];--R);var X=u+5<<3,N=Vo(r,ys)+Vo(s,Zo)+a,J=Vo(r,g)+Vo(s,b)+a+14+3*R+Vo(U,D)+2*U[16]+3*U[17]+7*U[18];if(l>=0&&X<=N&&X<=J)return qm(e,h,n.subarray(l,l+u));var Q,ie,ee,te;if(Br(e,h,1+(J<N)),h+=2,J<N){Q=br(g,d,0),ie=g,ee=br(b,_,0),te=b;var ae=br(D,E,0);Br(e,h,M-257),Br(e,h+5,G-1),Br(e,h+10,R-4),h+=14;for(var H=0;H<R;++H)Br(e,h+3*H,D[Dh[H]]);h+=3*R;for(var xe=[S,q],T=0;T<2;++T)for(var F=xe[T],H=0;H<F.length;++H){var V=F[H]&31;Br(e,h,ae[V]),h+=D[V],V>15&&(Br(e,h,F[H]>>5&127),h+=F[H]>>12)}}else Q=Xy,ie=ys,ee=$y,te=Zo;for(var H=0;H<o;++H){var K=i[H];if(K>255){var V=K>>18&31;Ho(e,h,Q[V+257]),h+=ie[V+257],V>7&&(Br(e,h,K>>23&31),h+=Vc[V]);var ne=K&31;Ho(e,h,ee[ne]),h+=te[ne],ne>3&&(Ho(e,h,K>>5&8191),h+=qc[ne])}else Ho(e,h,Q[K]),h+=ie[K]}return Ho(e,h,Q[256]),h+ie[256]},Qy=new md([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Wm=new Qn(0),eb=function(n,e,t,i,r,s){var a=s.z||n.length,o=new Qn(i+a+5*(1+Math.ceil(a/7e3))+r),l=o.subarray(i,o.length-r),u=s.l,h=(s.r||0)&7;if(e){h&&(l[0]=s.r>>3);for(var p=Qy[e-1],g=p>>13,d=p&8191,x=(1<<t)-1,b=s.p||new Ti(32768),_=s.h||new Ti(x+1),m=Math.ceil(t/3),S=2*m,M=function(Ve){return(n[Ve]^n[Ve+1]<<m^n[Ve+2]<<S)&x},P=new md(25e3),q=new Ti(288),G=new Ti(32),U=0,H=0,A=s.i||0,D=0,E=s.w||0,R=0;A+2<a;++A){var X=M(A),N=A&32767,J=_[X];if(b[N]=J,_[X]=N,E<=A){var Q=a-A;if((U>7e3||D>24576)&&(Q>423||!u)){h=Np(n,l,0,P,q,G,H,D,R,A-R,h),D=U=H=0,R=A;for(var ie=0;ie<286;++ie)q[ie]=0;for(var ie=0;ie<30;++ie)G[ie]=0}var ee=2,te=0,ae=d,xe=N-J&32767;if(Q>2&&X==M(A-xe))for(var T=Math.min(g,Q)-1,F=Math.min(32767,A),V=Math.min(258,Q);xe<=F&&--ae&&N!=J;){if(n[A+ee]==n[A+ee-xe]){for(var K=0;K<V&&n[A+K]==n[A+K-xe];++K);if(K>ee){if(ee=K,te=xe,K>T)break;for(var ne=Math.min(xe,K-2),ce=0,ie=0;ie<ne;++ie){var fe=A-xe+ie&32767,pe=b[fe],Ce=fe-pe&32767;Ce>ce&&(ce=Ce,J=fe)}}}N=J,J=b[N],xe+=N-J&32767}if(te){P[D++]=268435456|Fh[ee]<<18|Rp[te];var Ie=Fh[ee]&31,re=Rp[te]&31;H+=Vc[Ie]+qc[re],++q[257+Ie],++G[re],E=A+ee,++U}else P[D++]=n[A],++q[n[A]]}}for(A=Math.max(A,E);A<a;++A)P[D++]=n[A],++q[n[A]];h=Np(n,l,u,P,q,G,H,D,R,A-R,h),u||(s.r=h&7|l[h/8|0]<<3,h-=7,s.h=_,s.p=b,s.i=A,s.w=E)}else{for(var A=s.w||0;A<a+u;A+=65535){var Xe=A+65535;Xe>=a&&(l[h/8|0]=u,Xe=a),h=qm(l,h+1,n.subarray(A,Xe))}s.i=a}return Vm(o,0,i+gd(h)+r)},jm=function(){var n=1,e=0;return{p:function(t){for(var i=n,r=e,s=t.length|0,a=0;a!=s;){for(var o=Math.min(a+2655,s);a<o;++a)r+=i+=t[a];i=(i&65535)+15*(i>>16),r=(r&65535)+15*(r>>16)}n=i,e=r},d:function(){return n%=65521,e%=65521,(n&255)<<24|(n&65280)<<8|(e&255)<<8|e>>8}}},tb=function(n,e,t,i,r){if(!r&&(r={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),a=new Qn(s.length+n.length);a.set(s),a.set(n,s.length),n=a,r.w=s.length}return eb(n,e.level==null?6:e.level,e.mem==null?r.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,r)},Xm=function(n,e,t){for(;t;++e)n[e]=t,t>>>=8},nb=function(n,e){var t=e.level,i=t==0?0:t<6?1:t==9?3:2;if(n[0]=120,n[1]=i<<6|(e.dictionary&&32),n[1]|=31-(n[0]<<8|n[1])%31,e.dictionary){var r=jm();r.p(e.dictionary),Xm(n,2,r.d())}},ib=function(n,e){return((n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31)&&tr(6,"invalid zlib data"),(n[1]>>5&1)==1&&tr(6,"invalid zlib data: "+(n[1]&32?"need":"unexpected")+" dictionary"),(n[1]>>3&4)+2};function kh(n,e){e||(e={});var t=jm();t.p(n);var i=tb(n,e,e.dictionary?6:2,4);return nb(i,e),Xm(i,i.length-4,t.d()),i}function rb(n,e){return Zy(n.subarray(ib(n),-4),{i:2},e,e)}var sb=typeof TextDecoder<"u"&&new TextDecoder,ab=0;try{sb.decode(Wm,{stream:!0}),ab=1}catch{}var xt=function(){return typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this}();function uh(){xt.console&&typeof xt.console.log=="function"&&xt.console.log.apply(xt.console,arguments)}var en={log:uh,warn:function(n){xt.console&&(typeof xt.console.warn=="function"?xt.console.warn.apply(xt.console,arguments):uh.call(null,arguments))},error:function(n){xt.console&&(typeof xt.console.error=="function"?xt.console.error.apply(xt.console,arguments):uh(n))}};function hh(n,e,t){var i=new XMLHttpRequest;i.open("GET",n),i.responseType="blob",i.onload=function(){zs(i.response,e,t)},i.onerror=function(){en.error("could not download file")},i.send()}function Ip(n){var e=new XMLHttpRequest;e.open("HEAD",n,!1);try{e.send()}catch{}return e.status>=200&&e.status<=299}function fc(n){try{n.dispatchEvent(new MouseEvent("click"))}catch{var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),n.dispatchEvent(e)}}var Xo,Bh,zs=xt.saveAs||((typeof window>"u"?"undefined":Xt(window))!=="object"||window!==xt?function(){}:typeof HTMLAnchorElement<"u"&&"download"in HTMLAnchorElement.prototype?function(n,e,t){var i=xt.URL||xt.webkitURL,r=document.createElement("a");e=e||n.name||"download",r.download=e,r.rel="noopener",typeof n=="string"?(r.href=n,r.origin!==location.origin?Ip(r.href)?hh(n,e,t):fc(r,r.target="_blank"):fc(r)):(r.href=i.createObjectURL(n),setTimeout(function(){i.revokeObjectURL(r.href)},4e4),setTimeout(function(){fc(r)},0))}:"msSaveOrOpenBlob"in navigator?function(n,e,t){if(e=e||n.name||"download",typeof n=="string")if(Ip(n))hh(n,e,t);else{var i=document.createElement("a");i.href=n,i.target="_blank",setTimeout(function(){fc(i)})}else navigator.msSaveOrOpenBlob(function(r,s){return s===void 0?s={autoBom:!1}:Xt(s)!=="object"&&(en.warn("Deprecated: Expected third argument to be a object"),s={autoBom:!s}),s.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(r.type)?new Blob(["\uFEFF",r],{type:r.type}):r}(n,t),e)}:function(n,e,t,i){if((i=i||open("","_blank"))&&(i.document.title=i.document.body.innerText="downloading..."),typeof n=="string")return hh(n,e,t);var r=n.type==="application/octet-stream",s=/constructor/i.test(xt.HTMLElement)||xt.safari,a=/CriOS\/[\d]+/.test(navigator.userAgent);if((a||r&&s)&&(typeof FileReader>"u"?"undefined":Xt(FileReader))==="object"){var o=new FileReader;o.onloadend=function(){var h=o.result;h=a?h:h.replace(/^data:[^;]*;/,"data:attachment/file;"),i?i.location.href=h:location=h,i=null},o.readAsDataURL(n)}else{var l=xt.URL||xt.webkitURL,u=l.createObjectURL(n);i?i.location=u:location.href=u,i=null,setTimeout(function(){l.revokeObjectURL(u)},4e4)}});/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */function Ym(n){var e;n=n||"",this.ok=!1,n.charAt(0)=="#"&&(n=n.substr(1,6)),n={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"}[n=(n=n.replace(/ /g,"")).toLowerCase()]||n;for(var t=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(o){return[parseInt(o[1]),parseInt(o[2]),parseInt(o[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(o){return[parseInt(o[1],16),parseInt(o[2],16),parseInt(o[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(o){return[parseInt(o[1]+o[1],16),parseInt(o[2]+o[2],16),parseInt(o[3]+o[3],16)]}}],i=0;i<t.length;i++){var r=t[i].re,s=t[i].process,a=r.exec(n);a&&(e=s(a),this.r=e[0],this.g=e[1],this.b=e[2],this.ok=!0)}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r,this.g=this.g<0||isNaN(this.g)?0:this.g>255?255:this.g,this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b,this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},this.toHex=function(){var o=this.r.toString(16),l=this.g.toString(16),u=this.b.toString(16);return o.length==1&&(o="0"+o),l.length==1&&(l="0"+l),u.length==1&&(u="0"+u),"#"+o+l+u}}/**
 * @license
 * Joseph Myers does not specify a particular license for his work.
 *
 * Author: Joseph Myers
 * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
 *
 * Modified by: Owen Leong
 */function dh(n,e){var t=n[0],i=n[1],r=n[2],s=n[3];t=$n(t,i,r,s,e[0],7,-680876936),s=$n(s,t,i,r,e[1],12,-389564586),r=$n(r,s,t,i,e[2],17,606105819),i=$n(i,r,s,t,e[3],22,-1044525330),t=$n(t,i,r,s,e[4],7,-176418897),s=$n(s,t,i,r,e[5],12,1200080426),r=$n(r,s,t,i,e[6],17,-1473231341),i=$n(i,r,s,t,e[7],22,-45705983),t=$n(t,i,r,s,e[8],7,1770035416),s=$n(s,t,i,r,e[9],12,-1958414417),r=$n(r,s,t,i,e[10],17,-42063),i=$n(i,r,s,t,e[11],22,-1990404162),t=$n(t,i,r,s,e[12],7,1804603682),s=$n(s,t,i,r,e[13],12,-40341101),r=$n(r,s,t,i,e[14],17,-1502002290),t=Jn(t,i=$n(i,r,s,t,e[15],22,1236535329),r,s,e[1],5,-165796510),s=Jn(s,t,i,r,e[6],9,-1069501632),r=Jn(r,s,t,i,e[11],14,643717713),i=Jn(i,r,s,t,e[0],20,-373897302),t=Jn(t,i,r,s,e[5],5,-701558691),s=Jn(s,t,i,r,e[10],9,38016083),r=Jn(r,s,t,i,e[15],14,-660478335),i=Jn(i,r,s,t,e[4],20,-405537848),t=Jn(t,i,r,s,e[9],5,568446438),s=Jn(s,t,i,r,e[14],9,-1019803690),r=Jn(r,s,t,i,e[3],14,-187363961),i=Jn(i,r,s,t,e[8],20,1163531501),t=Jn(t,i,r,s,e[13],5,-1444681467),s=Jn(s,t,i,r,e[2],9,-51403784),r=Jn(r,s,t,i,e[7],14,1735328473),t=Kn(t,i=Jn(i,r,s,t,e[12],20,-1926607734),r,s,e[5],4,-378558),s=Kn(s,t,i,r,e[8],11,-2022574463),r=Kn(r,s,t,i,e[11],16,1839030562),i=Kn(i,r,s,t,e[14],23,-35309556),t=Kn(t,i,r,s,e[1],4,-1530992060),s=Kn(s,t,i,r,e[4],11,1272893353),r=Kn(r,s,t,i,e[7],16,-155497632),i=Kn(i,r,s,t,e[10],23,-1094730640),t=Kn(t,i,r,s,e[13],4,681279174),s=Kn(s,t,i,r,e[0],11,-358537222),r=Kn(r,s,t,i,e[3],16,-722521979),i=Kn(i,r,s,t,e[6],23,76029189),t=Kn(t,i,r,s,e[9],4,-640364487),s=Kn(s,t,i,r,e[12],11,-421815835),r=Kn(r,s,t,i,e[15],16,530742520),t=Zn(t,i=Kn(i,r,s,t,e[2],23,-995338651),r,s,e[0],6,-198630844),s=Zn(s,t,i,r,e[7],10,1126891415),r=Zn(r,s,t,i,e[14],15,-1416354905),i=Zn(i,r,s,t,e[5],21,-57434055),t=Zn(t,i,r,s,e[12],6,1700485571),s=Zn(s,t,i,r,e[3],10,-1894986606),r=Zn(r,s,t,i,e[10],15,-1051523),i=Zn(i,r,s,t,e[1],21,-2054922799),t=Zn(t,i,r,s,e[8],6,1873313359),s=Zn(s,t,i,r,e[15],10,-30611744),r=Zn(r,s,t,i,e[6],15,-1560198380),i=Zn(i,r,s,t,e[13],21,1309151649),t=Zn(t,i,r,s,e[4],6,-145523070),s=Zn(s,t,i,r,e[11],10,-1120210379),r=Zn(r,s,t,i,e[2],15,718787259),i=Zn(i,r,s,t,e[9],21,-343485551),n[0]=fs(t,n[0]),n[1]=fs(i,n[1]),n[2]=fs(r,n[2]),n[3]=fs(s,n[3])}function Wc(n,e,t,i,r,s){return e=fs(fs(e,n),fs(i,s)),fs(e<<r|e>>>32-r,t)}function $n(n,e,t,i,r,s,a){return Wc(e&t|~e&i,n,e,r,s,a)}function Jn(n,e,t,i,r,s,a){return Wc(e&i|t&~i,n,e,r,s,a)}function Kn(n,e,t,i,r,s,a){return Wc(e^t^i,n,e,r,s,a)}function Zn(n,e,t,i,r,s,a){return Wc(t^(e|~i),n,e,r,s,a)}function $m(n){var e,t=n.length,i=[1732584193,-271733879,-1732584194,271733878];for(e=64;e<=n.length;e+=64)dh(i,ob(n.substring(e-64,e)));n=n.substring(e-64);var r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<n.length;e++)r[e>>2]|=n.charCodeAt(e)<<(e%4<<3);if(r[e>>2]|=128<<(e%4<<3),e>55)for(dh(i,r),e=0;e<16;e++)r[e]=0;return r[14]=8*t,dh(i,r),i}function ob(n){var e,t=[];for(e=0;e<64;e+=4)t[e>>2]=n.charCodeAt(e)+(n.charCodeAt(e+1)<<8)+(n.charCodeAt(e+2)<<16)+(n.charCodeAt(e+3)<<24);return t}Xo=xt.atob.bind(xt),Bh=xt.btoa.bind(xt);var Dp="0123456789abcdef".split("");function lb(n){for(var e="",t=0;t<4;t++)e+=Dp[n>>8*t+4&15]+Dp[n>>8*t&15];return e}function cb(n){return String.fromCharCode((255&n)>>0,(65280&n)>>8,(16711680&n)>>16,(4278190080&n)>>24)}function zh(n){return $m(n).map(cb).join("")}var ub=function(n){for(var e=0;e<n.length;e++)n[e]=lb(n[e]);return n.join("")}($m("hello"))!="5d41402abc4b2a76b9719d911017c592";function fs(n,e){if(ub){var t=(65535&n)+(65535&e);return(n>>16)+(e>>16)+(t>>16)<<16|65535&t}return n+e&4294967295}/**
 * @license
 * FPDF is released under a permissive license: there is no usage restriction.
 * You may embed it freely in your application (commercial or not), with or
 * without modifications.
 *
 * Reference: http://www.fpdf.org/en/script/script37.php
 */function Gh(n,e){var t,i,r,s;if(n!==t){for(var a=(r=n,s=1+(256/n.length>>0),new Array(s+1).join(r)),o=[],l=0;l<256;l++)o[l]=l;var u=0;for(l=0;l<256;l++){var h=o[l];u=(u+h+a.charCodeAt(l))%256,o[l]=o[u],o[u]=h}t=n,i=o}else o=i;var p=e.length,g=0,d=0,x="";for(l=0;l<p;l++)d=(d+(h=o[g=(g+1)%256]))%256,o[g]=o[d],o[d]=h,a=o[(o[g]+o[d])%256],x+=String.fromCharCode(e.charCodeAt(l)^a);return x}/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * Author: Owen Leong (@owenl131)
 * Date: 15 Oct 2020
 * References:
 * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
 * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
 * http://www.fpdf.org/en/script/script37.php
 */var Fp={print:4,modify:8,copy:16,"annot-forms":32};function za(n,e,t,i){this.v=1,this.r=2;var r=192;n.forEach(function(o){if(Fp.perm!==void 0)throw new Error("Invalid permission: "+o);r+=Fp[o]}),this.padding="(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz";var s=(e+this.padding).substr(0,32),a=(t+this.padding).substr(0,32);this.O=this.processOwnerPassword(s,a),this.P=-(1+(255^r)),this.encryptionKey=zh(s+this.O+this.lsbFirstWord(this.P)+this.hexToBytes(i)).substr(0,5),this.U=Gh(this.encryptionKey,this.padding)}function Ga(n){if(/[^\u0000-\u00ff]/.test(n))throw new Error("Invalid PDF Name Object: "+n+", Only accept ASCII characters.");for(var e="",t=n.length,i=0;i<t;i++){var r=n.charCodeAt(i);r<33||r===35||r===37||r===40||r===41||r===47||r===60||r===62||r===91||r===93||r===123||r===125||r>126?e+="#"+("0"+r.toString(16)).slice(-2):e+=n[i]}return e}function Up(n){if(Xt(n)!=="object")throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");var e={};this.subscribe=function(t,i,r){if(r=r||!1,typeof t!="string"||typeof i!="function"||typeof r!="boolean")throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");e.hasOwnProperty(t)||(e[t]={});var s=Math.random().toString(35);return e[t][s]=[i,!!r],s},this.unsubscribe=function(t){for(var i in e)if(e[i][t])return delete e[i][t],Object.keys(e[i]).length===0&&delete e[i],!0;return!1},this.publish=function(t){if(e.hasOwnProperty(t)){var i=Array.prototype.slice.call(arguments,1),r=[];for(var s in e[t]){var a=e[t][s];try{a[0].apply(n,i)}catch(o){xt.console&&en.error("jsPDF PubSub Error",o.message,o)}a[1]&&r.push(s)}r.length&&r.forEach(this.unsubscribe)}},this.getTopics=function(){return e}}function Pc(n){if(!(this instanceof Pc))return new Pc(n);var e="opacity,stroke-opacity".split(",");for(var t in n)n.hasOwnProperty(t)&&e.indexOf(t)>=0&&(this[t]=n[t]);this.id="",this.objectNumber=-1}function Jm(n,e){this.gState=n,this.matrix=e,this.id="",this.objectNumber=-1}function Vs(n,e,t,i,r){if(!(this instanceof Vs))return new Vs(n,e,t,i,r);this.type=n==="axial"?2:3,this.coords=e,this.colors=t,Jm.call(this,i,r)}function qa(n,e,t,i,r){if(!(this instanceof qa))return new qa(n,e,t,i,r);this.boundingBox=n,this.xStep=e,this.yStep=t,this.stream="",this.cloneIndex=0,Jm.call(this,i,r)}function _t(n){var e,t=typeof arguments[0]=="string"?arguments[0]:"p",i=arguments[1],r=arguments[2],s=arguments[3],a=[],o=1,l=16,u="S",h=null;Xt(n=n||{})==="object"&&(t=n.orientation,i=n.unit||i,r=n.format||r,s=n.compress||n.compressPdf||s,(h=n.encryption||null)!==null&&(h.userPassword=h.userPassword||"",h.ownerPassword=h.ownerPassword||"",h.userPermissions=h.userPermissions||[]),o=typeof n.userUnit=="number"?Math.abs(n.userUnit):1,n.precision!==void 0&&(e=n.precision),n.floatPrecision!==void 0&&(l=n.floatPrecision),u=n.defaultPathOperation||"S"),a=n.filters||(s===!0?["FlateEncode"]:a),i=i||"mm",t=(""+(t||"P")).toLowerCase();var p=n.putOnlyUsedFonts||!1,g={},d={internal:{},__private__:{}};d.__private__.PubSub=Up;var x="1.3",b=d.__private__.getPdfVersion=function(){return x};d.__private__.setPdfVersion=function(v){x=v};var _={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};d.__private__.getPageFormats=function(){return _};var m=d.__private__.getPageFormat=function(v){return _[v]};r=r||"a4";var S={COMPAT:"compat",ADVANCED:"advanced"},M=S.COMPAT;function P(){this.saveGraphicsState(),Y(new tt(ze,0,0,-ze,0,jr()*ze).toString()+" cm"),this.setFontSize(this.getFontSize()/ze),u="n",M=S.ADVANCED}function q(){this.restoreGraphicsState(),u="S",M=S.COMPAT}var G=d.__private__.combineFontStyleAndFontWeight=function(v,C){if(v=="bold"&&C=="normal"||v=="bold"&&C==400||v=="normal"&&C=="italic"||v=="bold"&&C=="italic")throw new Error("Invalid Combination of fontweight and fontstyle");return C&&(v=C==400||C==="normal"?v==="italic"?"italic":"normal":C!=700&&C!=="bold"||v!=="normal"?(C==700?"bold":C)+""+v:"bold"),v};d.advancedAPI=function(v){var C=M===S.COMPAT;return C&&P.call(this),typeof v!="function"||(v(this),C&&q.call(this)),this},d.compatAPI=function(v){var C=M===S.ADVANCED;return C&&q.call(this),typeof v!="function"||(v(this),C&&P.call(this)),this},d.isAdvancedAPI=function(){return M===S.ADVANCED};var U,H=function(v){if(M!==S.ADVANCED)throw new Error(v+" is only available in 'advanced' API mode. You need to call advancedAPI() first.")},A=d.roundToPrecision=d.__private__.roundToPrecision=function(v,C){var Z=e||C;if(isNaN(v)||isNaN(Z))throw new Error("Invalid argument passed to jsPDF.roundToPrecision");return v.toFixed(Z).replace(/0+$/,"")};U=d.hpf=d.__private__.hpf=typeof l=="number"?function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.hpf");return A(v,l)}:l==="smart"?function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.hpf");return A(v,v>-1&&v<1?16:5)}:function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.hpf");return A(v,16)};var D=d.f2=d.__private__.f2=function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.f2");return A(v,2)},E=d.__private__.f3=function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.f3");return A(v,3)},R=d.scale=d.__private__.scale=function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.scale");return M===S.COMPAT?v*ze:M===S.ADVANCED?v:void 0},X=function(v){return M===S.COMPAT?jr()-v:M===S.ADVANCED?v:void 0},N=function(v){return R(X(v))};d.__private__.setPrecision=d.setPrecision=function(v){typeof parseInt(v,10)=="number"&&(e=parseInt(v,10))};var J,Q="00000000000000000000000000000000",ie=d.__private__.getFileId=function(){return Q},ee=d.__private__.setFileId=function(v){return Q=v!==void 0&&/^[a-fA-F0-9]{32}$/.test(v)?v.toUpperCase():Q.split("").map(function(){return"ABCDEF0123456789".charAt(Math.floor(16*Math.random()))}).join(""),h!==null&&(Wn=new za(h.userPermissions,h.userPassword,h.ownerPassword,Q)),Q};d.setFileId=function(v){return ee(v),this},d.getFileId=function(){return ie()};var te=d.__private__.convertDateToPDFDate=function(v){var C=v.getTimezoneOffset(),Z=C<0?"+":"-",oe=Math.floor(Math.abs(C/60)),ve=Math.abs(C%60),Ne=[Z,V(oe),"'",V(ve),"'"].join("");return["D:",v.getFullYear(),V(v.getMonth()+1),V(v.getDate()),V(v.getHours()),V(v.getMinutes()),V(v.getSeconds()),Ne].join("")},ae=d.__private__.convertPDFDateToDate=function(v){var C=parseInt(v.substr(2,4),10),Z=parseInt(v.substr(6,2),10)-1,oe=parseInt(v.substr(8,2),10),ve=parseInt(v.substr(10,2),10),Ne=parseInt(v.substr(12,2),10),Ge=parseInt(v.substr(14,2),10);return new Date(C,Z,oe,ve,Ne,Ge,0)},xe=d.__private__.setCreationDate=function(v){var C;if(v===void 0&&(v=new Date),v instanceof Date)C=te(v);else{if(!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(v))throw new Error("Invalid argument passed to jsPDF.setCreationDate");C=v}return J=C},T=d.__private__.getCreationDate=function(v){var C=J;return v==="jsDate"&&(C=ae(J)),C};d.setCreationDate=function(v){return xe(v),this},d.getCreationDate=function(v){return T(v)};var F,V=d.__private__.padd2=function(v){return("0"+parseInt(v)).slice(-2)},K=d.__private__.padd2Hex=function(v){return("00"+(v=v.toString())).substr(v.length)},ne=0,ce=[],fe=[],pe=0,Ce=[],Ie=[],re=!1,Xe=fe,Ve=function(){ne=0,pe=0,fe=[],ce=[],Ce=[],Ri=sn(),ci=sn()};d.__private__.setCustomOutputDestination=function(v){re=!0,Xe=v};var _e=function(v){re||(Xe=v)};d.__private__.resetCustomOutputDestination=function(){re=!1,Xe=fe};var Y=d.__private__.out=function(v){return v=v.toString(),pe+=v.length+1,Xe.push(v),Xe},lt=d.__private__.write=function(v){return Y(arguments.length===1?v.toString():Array.prototype.join.call(arguments," "))},He=d.__private__.getArrayBuffer=function(v){for(var C=v.length,Z=new ArrayBuffer(C),oe=new Uint8Array(Z);C--;)oe[C]=v.charCodeAt(C);return Z},B=[["Helvetica","helvetica","normal","WinAnsiEncoding"],["Helvetica-Bold","helvetica","bold","WinAnsiEncoding"],["Helvetica-Oblique","helvetica","italic","WinAnsiEncoding"],["Helvetica-BoldOblique","helvetica","bolditalic","WinAnsiEncoding"],["Courier","courier","normal","WinAnsiEncoding"],["Courier-Bold","courier","bold","WinAnsiEncoding"],["Courier-Oblique","courier","italic","WinAnsiEncoding"],["Courier-BoldOblique","courier","bolditalic","WinAnsiEncoding"],["Times-Roman","times","normal","WinAnsiEncoding"],["Times-Bold","times","bold","WinAnsiEncoding"],["Times-Italic","times","italic","WinAnsiEncoding"],["Times-BoldItalic","times","bolditalic","WinAnsiEncoding"],["ZapfDingbats","zapfdingbats","normal",null],["Symbol","symbol","normal",null]];d.__private__.getStandardFonts=function(){return B};var I=n.fontSize||16;d.__private__.setFontSize=d.setFontSize=function(v){return I=M===S.ADVANCED?v/ze:v,this};var se,ye=d.__private__.getFontSize=d.getFontSize=function(){return M===S.COMPAT?I:I*ze},Me=n.R2L||!1;d.__private__.setR2L=d.setR2L=function(v){return Me=v,this},d.__private__.getR2L=d.getR2L=function(){return Me};var Re,qe=d.__private__.setZoomMode=function(v){var C=[void 0,null,"fullwidth","fullheight","fullpage","original"];if(/^(?:\d+\.\d*|\d*\.\d+|\d+)%$/.test(v))se=v;else if(isNaN(v)){if(C.indexOf(v)===-1)throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "'+v+'" is not recognized.');se=v}else se=parseInt(v,10)};d.__private__.getZoomMode=function(){return se};var Oe,je=d.__private__.setPageMode=function(v){if([void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"].indexOf(v)==-1)throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+v+'" is not recognized.');Re=v};d.__private__.getPageMode=function(){return Re};var nt=d.__private__.setLayoutMode=function(v){if([void 0,null,"continuous","single","twoleft","tworight","two"].indexOf(v)==-1)throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "'+v+'" is not recognized.');Oe=v};d.__private__.getLayoutMode=function(){return Oe},d.__private__.setDisplayMode=d.setDisplayMode=function(v,C,Z){return qe(v),nt(C),je(Z),this};var Je={title:"",subject:"",author:"",keywords:"",creator:""};d.__private__.getDocumentProperty=function(v){if(Object.keys(Je).indexOf(v)===-1)throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");return Je[v]},d.__private__.getDocumentProperties=function(){return Je},d.__private__.setDocumentProperties=d.setProperties=d.setDocumentProperties=function(v){for(var C in Je)Je.hasOwnProperty(C)&&v[C]&&(Je[C]=v[C]);return this},d.__private__.setDocumentProperty=function(v,C){if(Object.keys(Je).indexOf(v)===-1)throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");return Je[v]=C};var Pe,ze,pt,it,ht,$e={},ct={},It=[],mt={},St={},Be={},le={},Ke=null,We=0,Ye=[],Ze=new Up(d),Bt=n.hotfixes||[],Et={},qt={},tn=[],tt=function v(C,Z,oe,ve,Ne,Ge){if(!(this instanceof v))return new v(C,Z,oe,ve,Ne,Ge);isNaN(C)&&(C=1),isNaN(Z)&&(Z=0),isNaN(oe)&&(oe=0),isNaN(ve)&&(ve=1),isNaN(Ne)&&(Ne=0),isNaN(Ge)&&(Ge=0),this._matrix=[C,Z,oe,ve,Ne,Ge]};Object.defineProperty(tt.prototype,"sx",{get:function(){return this._matrix[0]},set:function(v){this._matrix[0]=v}}),Object.defineProperty(tt.prototype,"shy",{get:function(){return this._matrix[1]},set:function(v){this._matrix[1]=v}}),Object.defineProperty(tt.prototype,"shx",{get:function(){return this._matrix[2]},set:function(v){this._matrix[2]=v}}),Object.defineProperty(tt.prototype,"sy",{get:function(){return this._matrix[3]},set:function(v){this._matrix[3]=v}}),Object.defineProperty(tt.prototype,"tx",{get:function(){return this._matrix[4]},set:function(v){this._matrix[4]=v}}),Object.defineProperty(tt.prototype,"ty",{get:function(){return this._matrix[5]},set:function(v){this._matrix[5]=v}}),Object.defineProperty(tt.prototype,"a",{get:function(){return this._matrix[0]},set:function(v){this._matrix[0]=v}}),Object.defineProperty(tt.prototype,"b",{get:function(){return this._matrix[1]},set:function(v){this._matrix[1]=v}}),Object.defineProperty(tt.prototype,"c",{get:function(){return this._matrix[2]},set:function(v){this._matrix[2]=v}}),Object.defineProperty(tt.prototype,"d",{get:function(){return this._matrix[3]},set:function(v){this._matrix[3]=v}}),Object.defineProperty(tt.prototype,"e",{get:function(){return this._matrix[4]},set:function(v){this._matrix[4]=v}}),Object.defineProperty(tt.prototype,"f",{get:function(){return this._matrix[5]},set:function(v){this._matrix[5]=v}}),Object.defineProperty(tt.prototype,"rotation",{get:function(){return Math.atan2(this.shx,this.sx)}}),Object.defineProperty(tt.prototype,"scaleX",{get:function(){return this.decompose().scale.sx}}),Object.defineProperty(tt.prototype,"scaleY",{get:function(){return this.decompose().scale.sy}}),Object.defineProperty(tt.prototype,"isIdentity",{get:function(){return this.sx===1&&this.shy===0&&this.shx===0&&this.sy===1&&this.tx===0&&this.ty===0}}),tt.prototype.join=function(v){return[this.sx,this.shy,this.shx,this.sy,this.tx,this.ty].map(U).join(v)},tt.prototype.multiply=function(v){var C=v.sx*this.sx+v.shy*this.shx,Z=v.sx*this.shy+v.shy*this.sy,oe=v.shx*this.sx+v.sy*this.shx,ve=v.shx*this.shy+v.sy*this.sy,Ne=v.tx*this.sx+v.ty*this.shx+this.tx,Ge=v.tx*this.shy+v.ty*this.sy+this.ty;return new tt(C,Z,oe,ve,Ne,Ge)},tt.prototype.decompose=function(){var v=this.sx,C=this.shy,Z=this.shx,oe=this.sy,ve=this.tx,Ne=this.ty,Ge=Math.sqrt(v*v+C*C),at=(v/=Ge)*Z+(C/=Ge)*oe;Z-=v*at,oe-=C*at;var ft=Math.sqrt(Z*Z+oe*oe);return at/=ft,v*(oe/=ft)<C*(Z/=ft)&&(v=-v,C=-C,at=-at,Ge=-Ge),{scale:new tt(Ge,0,0,ft,0,0),translate:new tt(1,0,0,1,ve,Ne),rotate:new tt(v,C,-C,v,0,0),skew:new tt(1,0,at,1,0,0)}},tt.prototype.toString=function(v){return this.join(" ")},tt.prototype.inversed=function(){var v=this.sx,C=this.shy,Z=this.shx,oe=this.sy,ve=this.tx,Ne=this.ty,Ge=1/(v*oe-C*Z),at=oe*Ge,ft=-C*Ge,Pt=-Z*Ge,Lt=v*Ge;return new tt(at,ft,Pt,Lt,-at*ve-Pt*Ne,-ft*ve-Lt*Ne)},tt.prototype.applyToPoint=function(v){var C=v.x*this.sx+v.y*this.shx+this.tx,Z=v.x*this.shy+v.y*this.sy+this.ty;return new sa(C,Z)},tt.prototype.applyToRectangle=function(v){var C=this.applyToPoint(v),Z=this.applyToPoint(new sa(v.x+v.w,v.y+v.h));return new vo(C.x,C.y,Z.x-C.x,Z.y-C.y)},tt.prototype.clone=function(){var v=this.sx,C=this.shy,Z=this.shx,oe=this.sy,ve=this.tx,Ne=this.ty;return new tt(v,C,Z,oe,ve,Ne)},d.Matrix=tt;var Jt=d.matrixMult=function(v,C){return C.multiply(v)},gn=new tt(1,0,0,1,0,0);d.unitMatrix=d.identityMatrix=gn;var Bn=function(v,C){if(!St[v]){var Z=(C instanceof Vs?"Sh":"P")+(Object.keys(mt).length+1).toString(10);C.id=Z,St[v]=Z,mt[Z]=C,Ze.publish("addPattern",C)}};d.ShadingPattern=Vs,d.TilingPattern=qa,d.addShadingPattern=function(v,C){return H("addShadingPattern()"),Bn(v,C),this},d.beginTilingPattern=function(v){H("beginTilingPattern()"),vl(v.boundingBox[0],v.boundingBox[1],v.boundingBox[2]-v.boundingBox[0],v.boundingBox[3]-v.boundingBox[1],v.matrix)},d.endTilingPattern=function(v,C){H("endTilingPattern()"),C.stream=Ie[F].join(`
`),Bn(v,C),Ze.publish("endTilingPattern",C),tn.pop().restore()};var vn=d.__private__.newObject=function(){var v=sn();return qn(v,!0),v},sn=d.__private__.newObjectDeferred=function(){return ne++,ce[ne]=function(){return pe},ne},qn=function(v,C){return C=typeof C=="boolean"&&C,ce[v]=pe,C&&Y(v+" 0 obj"),v},Wi=d.__private__.newAdditionalObject=function(){var v={objId:sn(),content:""};return Ce.push(v),v},Ri=sn(),ci=sn(),yi=d.__private__.decodeColorString=function(v){var C=v.split(" ");if(C.length!==2||C[1]!=="g"&&C[1]!=="G")C.length===5&&(C[4]==="k"||C[4]==="K")&&(C=[(1-C[0])*(1-C[3]),(1-C[1])*(1-C[3]),(1-C[2])*(1-C[3]),"r"]);else{var Z=parseFloat(C[0]);C=[Z,Z,Z,"r"]}for(var oe="#",ve=0;ve<3;ve++)oe+=("0"+Math.floor(255*parseFloat(C[ve])).toString(16)).slice(-2);return oe},bi=d.__private__.encodeColorString=function(v){var C;typeof v=="string"&&(v={ch1:v});var Z=v.ch1,oe=v.ch2,ve=v.ch3,Ne=v.ch4,Ge=v.pdfColorType==="draw"?["G","RG","K"]:["g","rg","k"];if(typeof Z=="string"&&Z.charAt(0)!=="#"){var at=new Ym(Z);if(at.ok)Z=at.toHex();else if(!/^\d*\.?\d*$/.test(Z))throw new Error('Invalid color "'+Z+'" passed to jsPDF.encodeColorString.')}if(typeof Z=="string"&&/^#[0-9A-Fa-f]{3}$/.test(Z)&&(Z="#"+Z[1]+Z[1]+Z[2]+Z[2]+Z[3]+Z[3]),typeof Z=="string"&&/^#[0-9A-Fa-f]{6}$/.test(Z)){var ft=parseInt(Z.substr(1),16);Z=ft>>16&255,oe=ft>>8&255,ve=255&ft}if(oe===void 0||Ne===void 0&&Z===oe&&oe===ve)if(typeof Z=="string")C=Z+" "+Ge[0];else switch(v.precision){case 2:C=D(Z/255)+" "+Ge[0];break;case 3:default:C=E(Z/255)+" "+Ge[0]}else if(Ne===void 0||Xt(Ne)==="object"){if(Ne&&!isNaN(Ne.a)&&Ne.a===0)return C=["1.","1.","1.",Ge[1]].join(" ");if(typeof Z=="string")C=[Z,oe,ve,Ge[1]].join(" ");else switch(v.precision){case 2:C=[D(Z/255),D(oe/255),D(ve/255),Ge[1]].join(" ");break;default:case 3:C=[E(Z/255),E(oe/255),E(ve/255),Ge[1]].join(" ")}}else if(typeof Z=="string")C=[Z,oe,ve,Ne,Ge[2]].join(" ");else switch(v.precision){case 2:C=[D(Z),D(oe),D(ve),D(Ne),Ge[2]].join(" ");break;case 3:default:C=[E(Z),E(oe),E(ve),E(Ne),Ge[2]].join(" ")}return C},Pi=d.__private__.getFilters=function(){return a},j=d.__private__.putStream=function(v){var C=(v=v||{}).data||"",Z=v.filters||Pi(),oe=v.alreadyAppliedFilters||[],ve=v.addLength1||!1,Ne=C.length,Ge=v.objectId,at=function(jn){return jn};if(h!==null&&Ge===void 0)throw new Error("ObjectId must be passed to putStream for file encryption");h!==null&&(at=Wn.encryptor(Ge,0));var ft={};Z===!0&&(Z=["FlateEncode"]);var Pt=v.additionalKeyValues||[],Lt=(ft=_t.API.processDataByFilters!==void 0?_t.API.processDataByFilters(C,Z):{data:C,reverseChain:[]}).reverseChain+(Array.isArray(oe)?oe.join(" "):oe.toString());if(ft.data.length!==0&&(Pt.push({key:"Length",value:ft.data.length}),ve===!0&&Pt.push({key:"Length1",value:Ne})),Lt.length!=0)if(Lt.split("/").length-1==1)Pt.push({key:"Filter",value:Lt});else{Pt.push({key:"Filter",value:"["+Lt+"]"});for(var zt=0;zt<Pt.length;zt+=1)if(Pt[zt].key==="DecodeParms"){for(var hn=[],fn=0;fn<ft.reverseChain.split("/").length-1;fn+=1)hn.push("null");hn.push(Pt[zt].value),Pt[zt].value="["+hn.join(" ")+"]"}}Y("<<");for(var An=0;An<Pt.length;An++)Y("/"+Pt[An].key+" "+Pt[An].value);Y(">>"),ft.data.length!==0&&(Y("stream"),Y(at(ft.data)),Y("endstream"))},ge=d.__private__.putPage=function(v){var C=v.number,Z=v.data,oe=v.objId,ve=v.contentsObjId;qn(oe,!0),Y("<</Type /Page"),Y("/Parent "+v.rootDictionaryObjId+" 0 R"),Y("/Resources "+v.resourceDictionaryObjId+" 0 R"),Y("/MediaBox ["+parseFloat(U(v.mediaBox.bottomLeftX))+" "+parseFloat(U(v.mediaBox.bottomLeftY))+" "+U(v.mediaBox.topRightX)+" "+U(v.mediaBox.topRightY)+"]"),v.cropBox!==null&&Y("/CropBox ["+U(v.cropBox.bottomLeftX)+" "+U(v.cropBox.bottomLeftY)+" "+U(v.cropBox.topRightX)+" "+U(v.cropBox.topRightY)+"]"),v.bleedBox!==null&&Y("/BleedBox ["+U(v.bleedBox.bottomLeftX)+" "+U(v.bleedBox.bottomLeftY)+" "+U(v.bleedBox.topRightX)+" "+U(v.bleedBox.topRightY)+"]"),v.trimBox!==null&&Y("/TrimBox ["+U(v.trimBox.bottomLeftX)+" "+U(v.trimBox.bottomLeftY)+" "+U(v.trimBox.topRightX)+" "+U(v.trimBox.topRightY)+"]"),v.artBox!==null&&Y("/ArtBox ["+U(v.artBox.bottomLeftX)+" "+U(v.artBox.bottomLeftY)+" "+U(v.artBox.topRightX)+" "+U(v.artBox.topRightY)+"]"),typeof v.userUnit=="number"&&v.userUnit!==1&&Y("/UserUnit "+v.userUnit),Ze.publish("putPage",{objId:oe,pageContext:Ye[C],pageNumber:C,page:Z}),Y("/Contents "+ve+" 0 R"),Y(">>"),Y("endobj");var Ne=Z.join(`
`);return M===S.ADVANCED&&(Ne+=`
Q`),qn(ve,!0),j({data:Ne,filters:Pi(),objectId:ve}),Y("endobj"),oe},Ee=d.__private__.putPages=function(){var v,C,Z=[];for(v=1;v<=We;v++)Ye[v].objId=sn(),Ye[v].contentsObjId=sn();for(v=1;v<=We;v++)Z.push(ge({number:v,data:Ie[v],objId:Ye[v].objId,contentsObjId:Ye[v].contentsObjId,mediaBox:Ye[v].mediaBox,cropBox:Ye[v].cropBox,bleedBox:Ye[v].bleedBox,trimBox:Ye[v].trimBox,artBox:Ye[v].artBox,userUnit:Ye[v].userUnit,rootDictionaryObjId:Ri,resourceDictionaryObjId:ci}));qn(Ri,!0),Y("<</Type /Pages");var oe="/Kids [";for(C=0;C<We;C++)oe+=Z[C]+" 0 R ";Y(oe+"]"),Y("/Count "+We),Y(">>"),Y("endobj"),Ze.publish("postPutPages")},Te=function(v){Ze.publish("putFont",{font:v,out:Y,newObject:vn,putStream:j}),v.isAlreadyPutted!==!0&&(v.objectNumber=vn(),Y("<<"),Y("/Type /Font"),Y("/BaseFont /"+Ga(v.postScriptName)),Y("/Subtype /Type1"),typeof v.encoding=="string"&&Y("/Encoding /"+v.encoding),Y("/FirstChar 32"),Y("/LastChar 255"),Y(">>"),Y("endobj"))},Ae=function(){for(var v in $e)$e.hasOwnProperty(v)&&(p===!1||p===!0&&g.hasOwnProperty(v))&&Te($e[v])},st=function(v){v.objectNumber=vn();var C=[];C.push({key:"Type",value:"/XObject"}),C.push({key:"Subtype",value:"/Form"}),C.push({key:"BBox",value:"["+[U(v.x),U(v.y),U(v.x+v.width),U(v.y+v.height)].join(" ")+"]"}),C.push({key:"Matrix",value:"["+v.matrix.toString()+"]"});var Z=v.pages[1].join(`
`);j({data:Z,additionalKeyValues:C,objectId:v.objectNumber}),Y("endobj")},dt=function(){for(var v in Et)Et.hasOwnProperty(v)&&st(Et[v])},gt=function(v,C){var Z,oe=[],ve=1/(C-1);for(Z=0;Z<1;Z+=ve)oe.push(Z);if(oe.push(1),v[0].offset!=0){var Ne={offset:0,color:v[0].color};v.unshift(Ne)}if(v[v.length-1].offset!=1){var Ge={offset:1,color:v[v.length-1].color};v.push(Ge)}for(var at="",ft=0,Pt=0;Pt<oe.length;Pt++){for(Z=oe[Pt];Z>v[ft+1].offset;)ft++;var Lt=v[ft].offset,zt=(Z-Lt)/(v[ft+1].offset-Lt),hn=v[ft].color,fn=v[ft+1].color;at+=K(Math.round((1-zt)*hn[0]+zt*fn[0]).toString(16))+K(Math.round((1-zt)*hn[1]+zt*fn[1]).toString(16))+K(Math.round((1-zt)*hn[2]+zt*fn[2]).toString(16))}return at.trim()},yt=function(v,C){C||(C=21);var Z=vn(),oe=gt(v.colors,C),ve=[];ve.push({key:"FunctionType",value:"0"}),ve.push({key:"Domain",value:"[0.0 1.0]"}),ve.push({key:"Size",value:"["+C+"]"}),ve.push({key:"BitsPerSample",value:"8"}),ve.push({key:"Range",value:"[0.0 1.0 0.0 1.0 0.0 1.0]"}),ve.push({key:"Decode",value:"[0.0 1.0 0.0 1.0 0.0 1.0]"}),j({data:oe,additionalKeyValues:ve,alreadyAppliedFilters:["/ASCIIHexDecode"],objectId:Z}),Y("endobj"),v.objectNumber=vn(),Y("<< /ShadingType "+v.type),Y("/ColorSpace /DeviceRGB");var Ne="/Coords ["+U(parseFloat(v.coords[0]))+" "+U(parseFloat(v.coords[1]))+" ";v.type===2?Ne+=U(parseFloat(v.coords[2]))+" "+U(parseFloat(v.coords[3])):Ne+=U(parseFloat(v.coords[2]))+" "+U(parseFloat(v.coords[3]))+" "+U(parseFloat(v.coords[4]))+" "+U(parseFloat(v.coords[5])),Y(Ne+="]"),v.matrix&&Y("/Matrix ["+v.matrix.toString()+"]"),Y("/Function "+Z+" 0 R"),Y("/Extend [true true]"),Y(">>"),Y("endobj")},Rt=function(v,C){var Z=sn(),oe=vn();C.push({resourcesOid:Z,objectOid:oe}),v.objectNumber=oe;var ve=[];ve.push({key:"Type",value:"/Pattern"}),ve.push({key:"PatternType",value:"1"}),ve.push({key:"PaintType",value:"1"}),ve.push({key:"TilingType",value:"1"}),ve.push({key:"BBox",value:"["+v.boundingBox.map(U).join(" ")+"]"}),ve.push({key:"XStep",value:U(v.xStep)}),ve.push({key:"YStep",value:U(v.yStep)}),ve.push({key:"Resources",value:Z+" 0 R"}),v.matrix&&ve.push({key:"Matrix",value:"["+v.matrix.toString()+"]"}),j({data:v.stream,additionalKeyValues:ve,objectId:v.objectNumber}),Y("endobj")},bt=function(v){var C;for(C in mt)mt.hasOwnProperty(C)&&(mt[C]instanceof Vs?yt(mt[C]):mt[C]instanceof qa&&Rt(mt[C],v))},wt=function(v){for(var C in v.objectNumber=vn(),Y("<<"),v)switch(C){case"opacity":Y("/ca "+D(v[C]));break;case"stroke-opacity":Y("/CA "+D(v[C]))}Y(">>"),Y("endobj")},an=function(){var v;for(v in Be)Be.hasOwnProperty(v)&&wt(Be[v])},Cn=function(){for(var v in Y("/XObject <<"),Et)Et.hasOwnProperty(v)&&Et[v].objectNumber>=0&&Y("/"+v+" "+Et[v].objectNumber+" 0 R");Ze.publish("putXobjectDict"),Y(">>")},dn=function(){Wn.oid=vn(),Y("<<"),Y("/Filter /Standard"),Y("/V "+Wn.v),Y("/R "+Wn.r),Y("/U <"+Wn.toHexString(Wn.U)+">"),Y("/O <"+Wn.toHexString(Wn.O)+">"),Y("/P "+Wn.P),Y(">>"),Y("endobj")},ui=function(){for(var v in Y("/Font <<"),$e)$e.hasOwnProperty(v)&&(p===!1||p===!0&&g.hasOwnProperty(v))&&Y("/"+v+" "+$e[v].objectNumber+" 0 R");Y(">>")},Kt=function(){if(Object.keys(mt).length>0){for(var v in Y("/Shading <<"),mt)mt.hasOwnProperty(v)&&mt[v]instanceof Vs&&mt[v].objectNumber>=0&&Y("/"+v+" "+mt[v].objectNumber+" 0 R");Ze.publish("putShadingPatternDict"),Y(">>")}},Mt=function(v){if(Object.keys(mt).length>0){for(var C in Y("/Pattern <<"),mt)mt.hasOwnProperty(C)&&mt[C]instanceof d.TilingPattern&&mt[C].objectNumber>=0&&mt[C].objectNumber<v&&Y("/"+C+" "+mt[C].objectNumber+" 0 R");Ze.publish("putTilingPatternDict"),Y(">>")}},Ss=function(){if(Object.keys(Be).length>0){var v;for(v in Y("/ExtGState <<"),Be)Be.hasOwnProperty(v)&&Be[v].objectNumber>=0&&Y("/"+v+" "+Be[v].objectNumber+" 0 R");Ze.publish("putGStateDict"),Y(">>")}},Tt=function(v){qn(v.resourcesOid,!0),Y("<<"),Y("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),ui(),Kt(),Mt(v.objectOid),Ss(),Cn(),Y(">>"),Y("endobj")},Ni=function(){var v=[];Ae(),an(),dt(),bt(v),Ze.publish("putResources"),v.forEach(Tt),Tt({resourcesOid:ci,objectOid:Number.MAX_SAFE_INTEGER}),Ze.publish("postPutResources")},ws=function(){Ze.publish("putAdditionalObjects");for(var v=0;v<Ce.length;v++){var C=Ce[v];qn(C.objId,!0),Y(C.content),Y("endobj")}Ze.publish("postPutAdditionalObjects")},cr=function(v){ct[v.fontName]=ct[v.fontName]||{},ct[v.fontName][v.fontStyle]=v.id},wr=function(v,C,Z,oe,ve){var Ne={id:"F"+(Object.keys($e).length+1).toString(10),postScriptName:v,fontName:C,fontStyle:Z,encoding:oe,isStandardFont:ve||!1,metadata:{}};return Ze.publish("addFont",{font:Ne,instance:this}),$e[Ne.id]=Ne,cr(Ne),Ne.id},Mn=function(v){for(var C=0,Z=B.length;C<Z;C++){var oe=wr.call(this,v[C][0],v[C][1],v[C][2],B[C][3],!0);p===!1&&(g[oe]=!0);var ve=v[C][0].split("-");cr({id:oe,fontName:ve[0],fontStyle:ve[1]||""})}Ze.publish("addFonts",{fonts:$e,dictionary:ct})},Rn=function(v){return v.foo=function(){try{return v.apply(this,arguments)}catch(oe){var C=oe.stack||"";~C.indexOf(" at ")&&(C=C.split(" at ")[1]);var Z="Error in function "+C.split(`
`)[0].split("<")[0]+": "+oe.message;if(!xt.console)throw new Error(Z);xt.console.error(Z,oe),xt.alert&&alert(Z)}},v.foo.bar=v,v.foo},ur=function(v,C){var Z,oe,ve,Ne,Ge,at,ft,Pt,Lt;if(ve=(C=C||{}).sourceEncoding||"Unicode",Ge=C.outputEncoding,(C.autoencode||Ge)&&$e[Pe].metadata&&$e[Pe].metadata[ve]&&$e[Pe].metadata[ve].encoding&&(Ne=$e[Pe].metadata[ve].encoding,!Ge&&$e[Pe].encoding&&(Ge=$e[Pe].encoding),!Ge&&Ne.codePages&&(Ge=Ne.codePages[0]),typeof Ge=="string"&&(Ge=Ne[Ge]),Ge)){for(ft=!1,at=[],Z=0,oe=v.length;Z<oe;Z++)(Pt=Ge[v.charCodeAt(Z)])?at.push(String.fromCharCode(Pt)):at.push(v[Z]),at[Z].charCodeAt(0)>>8&&(ft=!0);v=at.join("")}for(Z=v.length;ft===void 0&&Z!==0;)v.charCodeAt(Z-1)>>8&&(ft=!0),Z--;if(!ft)return v;for(at=C.noBOM?[]:[254,255],Z=0,oe=v.length;Z<oe;Z++){if((Lt=(Pt=v.charCodeAt(Z))>>8)>>8)throw new Error("Character at position "+Z+" of string '"+v+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");at.push(Lt),at.push(Pt-(Lt<<8))}return String.fromCharCode.apply(void 0,at)},Zt=d.__private__.pdfEscape=d.pdfEscape=function(v,C){return ur(v,C).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},Mr=d.__private__.beginPage=function(v){Ie[++We]=[],Ye[We]={objId:0,contentsObjId:0,userUnit:Number(o),artBox:null,bleedBox:null,cropBox:null,trimBox:null,mediaBox:{bottomLeftX:0,bottomLeftY:0,topRightX:Number(v[0]),topRightY:Number(v[1])}},al(We),_e(Ie[F])},Zs=function(v,C){var Z,oe,ve;switch(t=C||t,typeof v=="string"&&(Z=m(v.toLowerCase()),Array.isArray(Z)&&(oe=Z[0],ve=Z[1])),Array.isArray(v)&&(oe=v[0]*ze,ve=v[1]*ze),isNaN(oe)&&(oe=r[0],ve=r[1]),(oe>14400||ve>14400)&&(en.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"),oe=Math.min(14400,oe),ve=Math.min(14400,ve)),r=[oe,ve],t.substr(0,1)){case"l":ve>oe&&(r=[ve,oe]);break;case"p":oe>ve&&(r=[ve,oe])}Mr(r),dl(fo),Y(ji),mo!==0&&Y(mo+" J"),go!==0&&Y(go+" j"),Ze.publish("addPage",{pageNumber:We})},Qs=function(v){v>0&&v<=We&&(Ie.splice(v,1),Ye.splice(v,1),We--,F>We&&(F=We),this.setPage(F))},al=function(v){v>0&&v<=We&&(F=v)},Jc=d.__private__.getNumberOfPages=d.getNumberOfPages=function(){return Ie.length-1},ol=function(v,C,Z){var oe,ve=void 0;return Z=Z||{},v=v!==void 0?v:$e[Pe].fontName,C=C!==void 0?C:$e[Pe].fontStyle,oe=v.toLowerCase(),ct[oe]!==void 0&&ct[oe][C]!==void 0?ve=ct[oe][C]:ct[v]!==void 0&&ct[v][C]!==void 0?ve=ct[v][C]:Z.disableWarning===!1&&en.warn("Unable to look up font label for font '"+v+"', '"+C+"'. Refer to getFontList() for available fonts."),ve||Z.noFallback||(ve=ct.times[C])==null&&(ve=ct.times.normal),ve},Kc=d.__private__.putInfo=function(){var v=vn(),C=function(oe){return oe};for(var Z in h!==null&&(C=Wn.encryptor(v,0)),Y("<<"),Y("/Producer ("+Zt(C("jsPDF "+_t.version))+")"),Je)Je.hasOwnProperty(Z)&&Je[Z]&&Y("/"+Z.substr(0,1).toUpperCase()+Z.substr(1)+" ("+Zt(C(Je[Z]))+")");Y("/CreationDate ("+Zt(C(J))+")"),Y(">>"),Y("endobj")},co=d.__private__.putCatalog=function(v){var C=(v=v||{}).rootDictionaryObjId||Ri;switch(vn(),Y("<<"),Y("/Type /Catalog"),Y("/Pages "+C+" 0 R"),se||(se="fullwidth"),se){case"fullwidth":Y("/OpenAction [3 0 R /FitH null]");break;case"fullheight":Y("/OpenAction [3 0 R /FitV null]");break;case"fullpage":Y("/OpenAction [3 0 R /Fit]");break;case"original":Y("/OpenAction [3 0 R /XYZ null null 1]");break;default:var Z=""+se;Z.substr(Z.length-1)==="%"&&(se=parseInt(se)/100),typeof se=="number"&&Y("/OpenAction [3 0 R /XYZ null null "+D(se)+"]")}switch(Oe||(Oe="continuous"),Oe){case"continuous":Y("/PageLayout /OneColumn");break;case"single":Y("/PageLayout /SinglePage");break;case"two":case"twoleft":Y("/PageLayout /TwoColumnLeft");break;case"tworight":Y("/PageLayout /TwoColumnRight")}Re&&Y("/PageMode /"+Re),Ze.publish("putCatalog"),Y(">>"),Y("endobj")},Zc=d.__private__.putTrailer=function(){Y("trailer"),Y("<<"),Y("/Size "+(ne+1)),Y("/Root "+ne+" 0 R"),Y("/Info "+(ne-1)+" 0 R"),h!==null&&Y("/Encrypt "+Wn.oid+" 0 R"),Y("/ID [ <"+Q+"> <"+Q+"> ]"),Y(">>")},Qc=d.__private__.putHeader=function(){Y("%PDF-"+x),Y("%ºß¬à")},eu=d.__private__.putXRef=function(){var v="0000000000";Y("xref"),Y("0 "+(ne+1)),Y("0000000000 65535 f ");for(var C=1;C<=ne;C++)typeof ce[C]=="function"?Y((v+ce[C]()).slice(-10)+" 00000 n "):ce[C]!==void 0?Y((v+ce[C]).slice(-10)+" 00000 n "):Y("0000000000 00000 n ")},Ar=d.__private__.buildDocument=function(){Ve(),_e(fe),Ze.publish("buildDocument"),Qc(),Ee(),ws(),Ni(),h!==null&&dn(),Kc(),co();var v=pe;return eu(),Zc(),Y("startxref"),Y(""+v),Y("%%EOF"),_e(Ie[F]),fe.join(`
`)},ea=d.__private__.getBlob=function(v){return new Blob([He(v)],{type:"application/pdf"})},ta=d.output=d.__private__.output=Rn(function(v,C){switch(typeof(C=C||{})=="string"?C={filename:C}:C.filename=C.filename||"generated.pdf",v){case void 0:return Ar();case"save":d.save(C.filename);break;case"arraybuffer":return He(Ar());case"blob":return ea(Ar());case"bloburi":case"bloburl":if(xt.URL!==void 0&&typeof xt.URL.createObjectURL=="function")return xt.URL&&xt.URL.createObjectURL(ea(Ar()))||void 0;en.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");break;case"datauristring":case"dataurlstring":var Z="",oe=Ar();try{Z=Bh(oe)}catch{Z=Bh(unescape(encodeURIComponent(oe)))}return"data:application/pdf;filename="+C.filename+";base64,"+Z;case"pdfobjectnewwindow":if(Object.prototype.toString.call(xt)==="[object Window]"){var ve="https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js",Ne=' integrity="sha512-4ze/a9/4jqu+tX9dfOqJYSvyYd5M6qum/3HpCLr+/Jqf0whc37VUbkpNGHR7/8pSnCFw47T1fmIpwBV7UySh3g==" crossorigin="anonymous"';C.pdfObjectUrl&&(ve=C.pdfObjectUrl,Ne="");var Ge='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="'+ve+'"'+Ne+'><\/script><script >PDFObject.embed("'+this.output("dataurlstring")+'", '+JSON.stringify(C)+");<\/script></body></html>",at=xt.open();return at!==null&&at.document.write(Ge),at}throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");case"pdfjsnewwindow":if(Object.prototype.toString.call(xt)==="[object Window]"){var ft='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="'+(C.pdfJsUrl||"examples/PDF.js/web/viewer.html")+"?file=&downloadName="+C.filename+'" width="500px" height="400px" /></body></html>',Pt=xt.open();if(Pt!==null){Pt.document.write(ft);var Lt=this;Pt.document.documentElement.querySelector("#pdfViewer").onload=function(){Pt.document.title=C.filename,Pt.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(Lt.output("bloburl"))}}return Pt}throw new Error("The option pdfjsnewwindow just works in a browser-environment.");case"dataurlnewwindow":if(Object.prototype.toString.call(xt)!=="[object Window]")throw new Error("The option dataurlnewwindow just works in a browser-environment.");var zt='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="'+this.output("datauristring",C)+'"></iframe></body></html>',hn=xt.open();if(hn!==null&&(hn.document.write(zt),hn.document.title=C.filename),hn||typeof safari>"u")return hn;break;case"datauri":case"dataurl":return xt.document.location.href=this.output("datauristring",C);default:return null}}),ll=function(v){return Array.isArray(Bt)===!0&&Bt.indexOf(v)>-1};switch(i){case"pt":ze=1;break;case"mm":ze=72/25.4;break;case"cm":ze=72/2.54;break;case"in":ze=72;break;case"px":ze=ll("px_scaling")==1?.75:96/72;break;case"pc":case"em":ze=12;break;case"ex":ze=6;break;default:if(typeof i!="number")throw new Error("Invalid unit: "+i);ze=i}var Wn=null;xe(),ee();var tu=function(v){return h!==null?Wn.encryptor(v,0):function(C){return C}},cl=d.__private__.getPageInfo=d.getPageInfo=function(v){if(isNaN(v)||v%1!=0)throw new Error("Invalid argument passed to jsPDF.getPageInfo");return{objId:Ye[v].objId,pageNumber:v,pageContext:Ye[v]}},At=d.__private__.getPageInfoByObjId=function(v){if(isNaN(v)||v%1!=0)throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");for(var C in Ye)if(Ye[C].objId===v)break;return cl(C)},nu=d.__private__.getCurrentPageInfo=d.getCurrentPageInfo=function(){return{objId:Ye[F].objId,pageNumber:F,pageContext:Ye[F]}};d.addPage=function(){return Zs.apply(this,arguments),this},d.setPage=function(){return al.apply(this,arguments),_e.call(this,Ie[F]),this},d.insertPage=function(v){return this.addPage(),this.movePage(F,v),this},d.movePage=function(v,C){var Z,oe;if(v>C){Z=Ie[v],oe=Ye[v];for(var ve=v;ve>C;ve--)Ie[ve]=Ie[ve-1],Ye[ve]=Ye[ve-1];Ie[C]=Z,Ye[C]=oe,this.setPage(C)}else if(v<C){Z=Ie[v],oe=Ye[v];for(var Ne=v;Ne<C;Ne++)Ie[Ne]=Ie[Ne+1],Ye[Ne]=Ye[Ne+1];Ie[C]=Z,Ye[C]=oe,this.setPage(C)}return this},d.deletePage=function(){return Qs.apply(this,arguments),this},d.__private__.text=d.text=function(v,C,Z,oe,ve){var Ne,Ge,at,ft,Pt,Lt,zt,hn,fn,An=(oe=oe||{}).scope||this;if(typeof v=="number"&&typeof C=="number"&&(typeof Z=="string"||Array.isArray(Z))){var jn=Z;Z=C,C=v,v=jn}if(arguments[3]instanceof tt?(H("The transform parameter of text() with a Matrix value"),fn=ve):(at=arguments[4],ft=arguments[5],Xt(zt=arguments[3])==="object"&&zt!==null||(typeof at=="string"&&(ft=at,at=null),typeof zt=="string"&&(ft=zt,zt=null),typeof zt=="number"&&(at=zt,zt=null),oe={flags:zt,angle:at,align:ft})),isNaN(C)||isNaN(Z)||v==null)throw new Error("Invalid arguments passed to jsPDF.text");if(v.length===0)return An;var Dn="",Xi=!1,xi=typeof oe.lineHeightFactor=="number"?oe.lineHeightFactor:As,fr=An.internal.scaleFactor;function _l(nn){return nn=nn.split("	").join(Array(oe.TabLen||9).join(" ")),Zt(nn,zt)}function xo(nn){for(var rn,yn=nn.concat(),Pn=[],Rr=yn.length;Rr--;)typeof(rn=yn.shift())=="string"?Pn.push(rn):Array.isArray(nn)&&(rn.length===1||rn[1]===void 0&&rn[2]===void 0)?Pn.push(rn[0]):Pn.push([rn[0],rn[1],rn[2]]);return Pn}function So(nn,rn){var yn;if(typeof nn=="string")yn=rn(nn)[0];else if(Array.isArray(nn)){for(var Pn,Rr,Ro=nn.concat(),ga=[],wl=Ro.length;wl--;)typeof(Pn=Ro.shift())=="string"?ga.push(rn(Pn)[0]):Array.isArray(Pn)&&typeof Pn[0]=="string"&&(Rr=rn(Pn[0],Pn[1],Pn[2]),ga.push([Rr[0],Rr[1],Rr[2]]));yn=ga}return yn}var oa=!1,wo=!0;if(typeof v=="string")oa=!0;else if(Array.isArray(v)){var Mo=v.concat();Ge=[];for(var la,zn=Mo.length;zn--;)(typeof(la=Mo.shift())!="string"||Array.isArray(la)&&typeof la[0]!="string")&&(wo=!1);oa=wo}if(oa===!1)throw new Error('Type of text must be string or Array. "'+v+'" is not recognized.');typeof v=="string"&&(v=v.match(/[\r?\n]/)?v.split(/\r\n|\r|\n/g):[v]);var ca=I/An.internal.scaleFactor,ua=ca*(xi-1);switch(oe.baseline){case"bottom":Z-=ua;break;case"top":Z+=ca-ua;break;case"hanging":Z+=ca-2*ua;break;case"middle":Z+=ca/2-ua}if((Lt=oe.maxWidth||0)>0&&(typeof v=="string"?v=An.splitTextToSize(v,Lt):Object.prototype.toString.call(v)==="[object Array]"&&(v=v.reduce(function(nn,rn){return nn.concat(An.splitTextToSize(rn,Lt))},[]))),Ne={text:v,x:C,y:Z,options:oe,mutex:{pdfEscape:Zt,activeFontKey:Pe,fonts:$e,activeFontSize:I}},Ze.publish("preProcessText",Ne),v=Ne.text,at=(oe=Ne.options).angle,!(fn instanceof tt)&&at&&typeof at=="number"){at*=Math.PI/180,oe.rotationDirection===0&&(at=-at),M===S.ADVANCED&&(at=-at);var ha=Math.cos(at),Ao=Math.sin(at);fn=new tt(ha,Ao,-Ao,ha,0,0)}else at&&at instanceof tt&&(fn=at);M!==S.ADVANCED||fn||(fn=gn),(Pt=oe.charSpace||ra)!==void 0&&(Dn+=U(R(Pt))+` Tc
`,this.setCharSpace(this.getCharSpace()||0)),(hn=oe.horizontalScale)!==void 0&&(Dn+=U(100*hn)+` Tz
`),oe.lang;var hi=-1,du=oe.renderingMode!==void 0?oe.renderingMode:oe.stroke,Eo=An.internal.getCurrentPageInfo().pageContext;switch(du){case 0:case!1:case"fill":hi=0;break;case 1:case!0:case"stroke":hi=1;break;case 2:case"fillThenStroke":hi=2;break;case 3:case"invisible":hi=3;break;case 4:case"fillAndAddForClipping":hi=4;break;case 5:case"strokeAndAddPathForClipping":hi=5;break;case 6:case"fillThenStrokeAndAddToPathForClipping":hi=6;break;case 7:case"addToPathForClipping":hi=7}var yl=Eo.usedRenderingMode!==void 0?Eo.usedRenderingMode:-1;hi!==-1?Dn+=hi+` Tr
`:yl!==-1&&(Dn+=`0 Tr
`),hi!==-1&&(Eo.usedRenderingMode=hi),ft=oe.align||"left";var Ii,da=I*xi,bl=An.internal.pageSize.getWidth(),xl=$e[Pe];Pt=oe.charSpace||ra,Lt=oe.maxWidth||0,zt=Object.assign({autoencode:!0,noBOM:!0},oe.flags);var Xr=[],Ls=function(nn){return An.getStringUnitWidth(nn,{font:xl,charSpace:Pt,fontSize:I,doKerning:!1})*I/fr};if(Object.prototype.toString.call(v)==="[object Array]"){var di;Ge=xo(v),ft!=="left"&&(Ii=Ge.map(Ls));var ti,Yr=0;if(ft==="right"){C-=Ii[0],v=[],zn=Ge.length;for(var Tr=0;Tr<zn;Tr++)Tr===0?(ti=dr(C),di=Er(Z)):(ti=R(Yr-Ii[Tr]),di=-da),v.push([Ge[Tr],ti,di]),Yr=Ii[Tr]}else if(ft==="center"){C-=Ii[0]/2,v=[],zn=Ge.length;for(var Lr=0;Lr<zn;Lr++)Lr===0?(ti=dr(C),di=Er(Z)):(ti=R((Yr-Ii[Lr])/2),di=-da),v.push([Ge[Lr],ti,di]),Yr=Ii[Lr]}else if(ft==="left"){v=[],zn=Ge.length;for(var fa=0;fa<zn;fa++)v.push(Ge[fa])}else if(ft==="justify"&&xl.encoding==="Identity-H"){v=[],zn=Ge.length,Lt=Lt!==0?Lt:bl;for(var Cr=0,_n=0;_n<zn;_n++)if(di=_n===0?Er(Z):-da,ti=_n===0?dr(C):Cr,_n<zn-1){var To=R((Lt-Ii[_n])/(Ge[_n].split(" ").length-1)),ni=Ge[_n].split(" ");v.push([ni[0]+" ",ti,di]),Cr=0;for(var Di=1;Di<ni.length;Di++){var pa=(Ls(ni[Di-1]+" "+ni[Di])-Ls(ni[Di]))*fr+To;Di==ni.length-1?v.push([ni[Di],pa,0]):v.push([ni[Di]+" ",pa,0]),Cr-=pa}}else v.push([Ge[_n],ti,di]);v.push(["",Cr,0])}else{if(ft!=="justify")throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');for(v=[],zn=Ge.length,Lt=Lt!==0?Lt:bl,_n=0;_n<zn;_n++)di=_n===0?Er(Z):-da,ti=_n===0?dr(C):0,_n<zn-1?Xr.push(U(R((Lt-Ii[_n])/(Ge[_n].split(" ").length-1)))):Xr.push(0),v.push([Ge[_n],ti,di])}}var Sl=typeof oe.R2L=="boolean"?oe.R2L:Me;Sl===!0&&(v=So(v,function(nn,rn,yn){return[nn.split("").reverse().join(""),rn,yn]})),Ne={text:v,x:C,y:Z,options:oe,mutex:{pdfEscape:Zt,activeFontKey:Pe,fonts:$e,activeFontSize:I}},Ze.publish("postProcessText",Ne),v=Ne.text,Xi=Ne.mutex.isHex||!1;var Lo=$e[Pe].encoding;Lo!=="WinAnsiEncoding"&&Lo!=="StandardEncoding"||(v=So(v,function(nn,rn,yn){return[_l(nn),rn,yn]})),Ge=xo(v),v=[];for(var Cs,Rs,$r,Ps=0,ma=1,Ns=Array.isArray(Ge[0])?ma:Ps,Jr="",Co=function(nn,rn,yn){var Pn="";return yn instanceof tt?(yn=typeof oe.angle=="number"?Jt(yn,new tt(1,0,0,1,nn,rn)):Jt(new tt(1,0,0,1,nn,rn),yn),M===S.ADVANCED&&(yn=Jt(new tt(1,0,0,-1,0,0),yn)),Pn=yn.join(" ")+` Tm
`):Pn=U(nn)+" "+U(rn)+` Td
`,Pn},Fi=0;Fi<Ge.length;Fi++){switch(Jr="",Ns){case ma:$r=(Xi?"<":"(")+Ge[Fi][0]+(Xi?">":")"),Cs=parseFloat(Ge[Fi][1]),Rs=parseFloat(Ge[Fi][2]);break;case Ps:$r=(Xi?"<":"(")+Ge[Fi]+(Xi?">":")"),Cs=dr(C),Rs=Er(Z)}Xr!==void 0&&Xr[Fi]!==void 0&&(Jr=Xr[Fi]+` Tw
`),Fi===0?v.push(Jr+Co(Cs,Rs,fn)+$r):Ns===Ps?v.push(Jr+$r):Ns===ma&&v.push(Jr+Co(Cs,Rs,fn)+$r)}v=Ns===Ps?v.join(` Tj
T* `):v.join(` Tj
`),v+=` Tj
`;var Ui=`BT
/`;return Ui+=Pe+" "+I+` Tf
`,Ui+=U(I*xi)+` TL
`,Ui+=Es+`
`,Ui+=Dn,Ui+=v,Y(Ui+="ET"),g[Pe]=!0,An};var iu=d.__private__.clip=d.clip=function(v){return Y(v==="evenodd"?"W*":"W"),this};d.clipEvenOdd=function(){return iu("evenodd")},d.__private__.discardPath=d.discardPath=function(){return Y("n"),this};var hr=d.__private__.isValidStyle=function(v){var C=!1;return[void 0,null,"S","D","F","DF","FD","f","f*","B","B*","n"].indexOf(v)!==-1&&(C=!0),C};d.__private__.setDefaultPathOperation=d.setDefaultPathOperation=function(v){return hr(v)&&(u=v),this};var ul=d.__private__.getStyle=d.getStyle=function(v){var C=u;switch(v){case"D":case"S":C="S";break;case"F":C="f";break;case"FD":case"DF":C="B";break;case"f":case"f*":case"B":case"B*":C=v}return C},hl=d.close=function(){return Y("h"),this};d.stroke=function(){return Y("S"),this},d.fill=function(v){return na("f",v),this},d.fillEvenOdd=function(v){return na("f*",v),this},d.fillStroke=function(v){return na("B",v),this},d.fillStrokeEvenOdd=function(v){return na("B*",v),this};var na=function(v,C){Xt(C)==="object"?su(C,v):Y(v)},uo=function(v){v===null||M===S.ADVANCED&&v===void 0||(v=ul(v),Y(v))};function ru(v,C,Z,oe,ve){var Ne=new qa(C||this.boundingBox,Z||this.xStep,oe||this.yStep,this.gState,ve||this.matrix);Ne.stream=this.stream;var Ge=v+"$$"+this.cloneIndex+++"$$";return Bn(Ge,Ne),Ne}var su=function(v,C){var Z=St[v.key],oe=mt[Z];if(oe instanceof Vs)Y("q"),Y(au(C)),oe.gState&&d.setGState(oe.gState),Y(v.matrix.toString()+" cm"),Y("/"+Z+" sh"),Y("Q");else if(oe instanceof qa){var ve=new tt(1,0,0,-1,0,jr());v.matrix&&(ve=ve.multiply(v.matrix||gn),Z=ru.call(oe,v.key,v.boundingBox,v.xStep,v.yStep,ve).id),Y("q"),Y("/Pattern cs"),Y("/"+Z+" scn"),oe.gState&&d.setGState(oe.gState),Y(C),Y("Q")}},au=function(v){switch(v){case"f":case"F":return"W n";case"f*":return"W* n";case"B":return"W S";case"B*":return"W* S";case"S":return"W S";case"n":return"W n"}},ho=d.moveTo=function(v,C){return Y(U(R(v))+" "+U(N(C))+" m"),this},Ms=d.lineTo=function(v,C){return Y(U(R(v))+" "+U(N(C))+" l"),this},qr=d.curveTo=function(v,C,Z,oe,ve,Ne){return Y([U(R(v)),U(N(C)),U(R(Z)),U(N(oe)),U(R(ve)),U(N(Ne)),"c"].join(" ")),this};d.__private__.line=d.line=function(v,C,Z,oe,ve){if(isNaN(v)||isNaN(C)||isNaN(Z)||isNaN(oe)||!hr(ve))throw new Error("Invalid arguments passed to jsPDF.line");return M===S.COMPAT?this.lines([[Z-v,oe-C]],v,C,[1,1],ve||"S"):this.lines([[Z-v,oe-C]],v,C,[1,1]).stroke()},d.__private__.lines=d.lines=function(v,C,Z,oe,ve,Ne){var Ge,at,ft,Pt,Lt,zt,hn,fn,An,jn,Dn,Xi;if(typeof v=="number"&&(Xi=Z,Z=C,C=v,v=Xi),oe=oe||[1,1],Ne=Ne||!1,isNaN(C)||isNaN(Z)||!Array.isArray(v)||!Array.isArray(oe)||!hr(ve)||typeof Ne!="boolean")throw new Error("Invalid arguments passed to jsPDF.lines");for(ho(C,Z),Ge=oe[0],at=oe[1],Pt=v.length,jn=C,Dn=Z,ft=0;ft<Pt;ft++)(Lt=v[ft]).length===2?(jn=Lt[0]*Ge+jn,Dn=Lt[1]*at+Dn,Ms(jn,Dn)):(zt=Lt[0]*Ge+jn,hn=Lt[1]*at+Dn,fn=Lt[2]*Ge+jn,An=Lt[3]*at+Dn,jn=Lt[4]*Ge+jn,Dn=Lt[5]*at+Dn,qr(zt,hn,fn,An,jn,Dn));return Ne&&hl(),uo(ve),this},d.path=function(v){for(var C=0;C<v.length;C++){var Z=v[C],oe=Z.c;switch(Z.op){case"m":ho(oe[0],oe[1]);break;case"l":Ms(oe[0],oe[1]);break;case"c":qr.apply(this,oe);break;case"h":hl()}}return this},d.__private__.rect=d.rect=function(v,C,Z,oe,ve){if(isNaN(v)||isNaN(C)||isNaN(Z)||isNaN(oe)||!hr(ve))throw new Error("Invalid arguments passed to jsPDF.rect");return M===S.COMPAT&&(oe=-oe),Y([U(R(v)),U(N(C)),U(R(Z)),U(R(oe)),"re"].join(" ")),uo(ve),this},d.__private__.triangle=d.triangle=function(v,C,Z,oe,ve,Ne,Ge){if(isNaN(v)||isNaN(C)||isNaN(Z)||isNaN(oe)||isNaN(ve)||isNaN(Ne)||!hr(Ge))throw new Error("Invalid arguments passed to jsPDF.triangle");return this.lines([[Z-v,oe-C],[ve-Z,Ne-oe],[v-ve,C-Ne]],v,C,[1,1],Ge,!0),this},d.__private__.roundedRect=d.roundedRect=function(v,C,Z,oe,ve,Ne,Ge){if(isNaN(v)||isNaN(C)||isNaN(Z)||isNaN(oe)||isNaN(ve)||isNaN(Ne)||!hr(Ge))throw new Error("Invalid arguments passed to jsPDF.roundedRect");var at=4/3*(Math.SQRT2-1);return ve=Math.min(ve,.5*Z),Ne=Math.min(Ne,.5*oe),this.lines([[Z-2*ve,0],[ve*at,0,ve,Ne-Ne*at,ve,Ne],[0,oe-2*Ne],[0,Ne*at,-ve*at,Ne,-ve,Ne],[2*ve-Z,0],[-ve*at,0,-ve,-Ne*at,-ve,-Ne],[0,2*Ne-oe],[0,-Ne*at,ve*at,-Ne,ve,-Ne]],v+ve,C,[1,1],Ge,!0),this},d.__private__.ellipse=d.ellipse=function(v,C,Z,oe,ve){if(isNaN(v)||isNaN(C)||isNaN(Z)||isNaN(oe)||!hr(ve))throw new Error("Invalid arguments passed to jsPDF.ellipse");var Ne=4/3*(Math.SQRT2-1)*Z,Ge=4/3*(Math.SQRT2-1)*oe;return ho(v+Z,C),qr(v+Z,C-Ge,v+Ne,C-oe,v,C-oe),qr(v-Ne,C-oe,v-Z,C-Ge,v-Z,C),qr(v-Z,C+Ge,v-Ne,C+oe,v,C+oe),qr(v+Ne,C+oe,v+Z,C+Ge,v+Z,C),uo(ve),this},d.__private__.circle=d.circle=function(v,C,Z,oe){if(isNaN(v)||isNaN(C)||isNaN(Z)||!hr(oe))throw new Error("Invalid arguments passed to jsPDF.circle");return this.ellipse(v,C,Z,Z,oe)},d.setFont=function(v,C,Z){return Z&&(C=G(C,Z)),Pe=ol(v,C,{disableWarning:!1}),this};var ou=d.__private__.getFont=d.getFont=function(){return $e[ol.apply(d,arguments)]};d.__private__.getFontList=d.getFontList=function(){var v,C,Z={};for(v in ct)if(ct.hasOwnProperty(v))for(C in Z[v]=[],ct[v])ct[v].hasOwnProperty(C)&&Z[v].push(C);return Z},d.addFont=function(v,C,Z,oe,ve){var Ne=["StandardEncoding","MacRomanEncoding","Identity-H","WinAnsiEncoding"];return arguments[3]&&Ne.indexOf(arguments[3])!==-1?ve=arguments[3]:arguments[3]&&Ne.indexOf(arguments[3])==-1&&(Z=G(Z,oe)),ve=ve||"Identity-H",wr.call(this,v,C,Z,ve)};var As,fo=n.lineWidth||.200025,ia=d.__private__.getLineWidth=d.getLineWidth=function(){return fo},dl=d.__private__.setLineWidth=d.setLineWidth=function(v){return fo=v,Y(U(R(v))+" w"),this};d.__private__.setLineDash=_t.API.setLineDash=_t.API.setLineDashPattern=function(v,C){if(v=v||[],C=C||0,isNaN(C)||!Array.isArray(v))throw new Error("Invalid arguments passed to jsPDF.setLineDash");return v=v.map(function(Z){return U(R(Z))}).join(" "),C=U(R(C)),Y("["+v+"] "+C+" d"),this};var fl=d.__private__.getLineHeight=d.getLineHeight=function(){return I*As};d.__private__.getLineHeight=d.getLineHeight=function(){return I*As};var pl=d.__private__.setLineHeightFactor=d.setLineHeightFactor=function(v){return typeof(v=v||1.15)=="number"&&(As=v),this},ml=d.__private__.getLineHeightFactor=d.getLineHeightFactor=function(){return As};pl(n.lineHeight);var dr=d.__private__.getHorizontalCoordinate=function(v){return R(v)},Er=d.__private__.getVerticalCoordinate=function(v){return M===S.ADVANCED?v:Ye[F].mediaBox.topRightY-Ye[F].mediaBox.bottomLeftY-R(v)},lu=d.__private__.getHorizontalCoordinateString=d.getHorizontalCoordinateString=function(v){return U(dr(v))},Wr=d.__private__.getVerticalCoordinateString=d.getVerticalCoordinateString=function(v){return U(Er(v))},ji=n.strokeColor||"0 G";d.__private__.getStrokeColor=d.getDrawColor=function(){return yi(ji)},d.__private__.setStrokeColor=d.setDrawColor=function(v,C,Z,oe){return ji=bi({ch1:v,ch2:C,ch3:Z,ch4:oe,pdfColorType:"draw",precision:2}),Y(ji),this};var po=n.fillColor||"0 g";d.__private__.getFillColor=d.getFillColor=function(){return yi(po)},d.__private__.setFillColor=d.setFillColor=function(v,C,Z,oe){return po=bi({ch1:v,ch2:C,ch3:Z,ch4:oe,pdfColorType:"fill",precision:2}),Y(po),this};var Es=n.textColor||"0 g",cu=d.__private__.getTextColor=d.getTextColor=function(){return yi(Es)};d.__private__.setTextColor=d.setTextColor=function(v,C,Z,oe){return Es=bi({ch1:v,ch2:C,ch3:Z,ch4:oe,pdfColorType:"text",precision:3}),this};var ra=n.charSpace,uu=d.__private__.getCharSpace=d.getCharSpace=function(){return parseFloat(ra||0)};d.__private__.setCharSpace=d.setCharSpace=function(v){if(isNaN(v))throw new Error("Invalid argument passed to jsPDF.setCharSpace");return ra=v,this};var mo=0;d.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2},d.__private__.setLineCap=d.setLineCap=function(v){var C=d.CapJoinStyles[v];if(C===void 0)throw new Error("Line cap style of '"+v+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return mo=C,Y(C+" J"),this};var go=0;d.__private__.setLineJoin=d.setLineJoin=function(v){var C=d.CapJoinStyles[v];if(C===void 0)throw new Error("Line join style of '"+v+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return go=C,Y(C+" j"),this},d.__private__.setLineMiterLimit=d.__private__.setMiterLimit=d.setLineMiterLimit=d.setMiterLimit=function(v){if(v=v||0,isNaN(v))throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");return Y(U(R(v))+" M"),this},d.GState=Pc,d.setGState=function(v){(v=typeof v=="string"?Be[le[v]]:gl(null,v)).equals(Ke)||(Y("/"+v.id+" gs"),Ke=v)};var gl=function(v,C){if(!v||!le[v]){var Z=!1;for(var oe in Be)if(Be.hasOwnProperty(oe)&&Be[oe].equals(C)){Z=!0;break}if(Z)C=Be[oe];else{var ve="GS"+(Object.keys(Be).length+1).toString(10);Be[ve]=C,C.id=ve}return v&&(le[v]=C.id),Ze.publish("addGState",C),C}};d.addGState=function(v,C){return gl(v,C),this},d.saveGraphicsState=function(){return Y("q"),It.push({key:Pe,size:I,color:Es}),this},d.restoreGraphicsState=function(){Y("Q");var v=It.pop();return Pe=v.key,I=v.size,Es=v.color,Ke=null,this},d.setCurrentTransformationMatrix=function(v){return Y(v.toString()+" cm"),this},d.comment=function(v){return Y("#"+v),this};var sa=function(v,C){var Z=v||0;Object.defineProperty(this,"x",{enumerable:!0,get:function(){return Z},set:function(Ne){isNaN(Ne)||(Z=parseFloat(Ne))}});var oe=C||0;Object.defineProperty(this,"y",{enumerable:!0,get:function(){return oe},set:function(Ne){isNaN(Ne)||(oe=parseFloat(Ne))}});var ve="pt";return Object.defineProperty(this,"type",{enumerable:!0,get:function(){return ve},set:function(Ne){ve=Ne.toString()}}),this},vo=function(v,C,Z,oe){sa.call(this,v,C),this.type="rect";var ve=Z||0;Object.defineProperty(this,"w",{enumerable:!0,get:function(){return ve},set:function(Ge){isNaN(Ge)||(ve=parseFloat(Ge))}});var Ne=oe||0;return Object.defineProperty(this,"h",{enumerable:!0,get:function(){return Ne},set:function(Ge){isNaN(Ge)||(Ne=parseFloat(Ge))}}),this},_o=function(){this.page=We,this.currentPage=F,this.pages=Ie.slice(0),this.pagesContext=Ye.slice(0),this.x=pt,this.y=it,this.matrix=ht,this.width=Ts(F),this.height=jr(F),this.outputDestination=Xe,this.id="",this.objectNumber=-1};_o.prototype.restore=function(){We=this.page,F=this.currentPage,Ye=this.pagesContext,Ie=this.pages,pt=this.x,it=this.y,ht=this.matrix,yo(F,this.width),bo(F,this.height),Xe=this.outputDestination};var vl=function(v,C,Z,oe,ve){tn.push(new _o),We=F=0,Ie=[],pt=v,it=C,ht=ve,Mr([Z,oe])},hu=function(v){if(qt[v])tn.pop().restore();else{var C=new _o,Z="Xo"+(Object.keys(Et).length+1).toString(10);C.id=Z,qt[v]=Z,Et[Z]=C,Ze.publish("addFormObject",C),tn.pop().restore()}};for(var aa in d.beginFormObject=function(v,C,Z,oe,ve){return vl(v,C,Z,oe,ve),this},d.endFormObject=function(v){return hu(v),this},d.doFormObject=function(v,C){var Z=Et[qt[v]];return Y("q"),Y(C.toString()+" cm"),Y("/"+Z.id+" Do"),Y("Q"),this},d.getFormObject=function(v){var C=Et[qt[v]];return{x:C.x,y:C.y,width:C.width,height:C.height,matrix:C.matrix}},d.save=function(v,C){return v=v||"generated.pdf",(C=C||{}).returnPromise=C.returnPromise||!1,C.returnPromise===!1?(zs(ea(Ar()),v),typeof zs.unload=="function"&&xt.setTimeout&&setTimeout(zs.unload,911),this):new Promise(function(Z,oe){try{var ve=zs(ea(Ar()),v);typeof zs.unload=="function"&&xt.setTimeout&&setTimeout(zs.unload,911),Z(ve)}catch(Ne){oe(Ne.message)}})},_t.API)_t.API.hasOwnProperty(aa)&&(aa==="events"&&_t.API.events.length?function(v,C){var Z,oe,ve;for(ve=C.length-1;ve!==-1;ve--)Z=C[ve][0],oe=C[ve][1],v.subscribe.apply(v,[Z].concat(typeof oe=="function"?[oe]:oe))}(Ze,_t.API.events):d[aa]=_t.API[aa]);var Ts=d.getPageWidth=function(v){return(Ye[v=v||F].mediaBox.topRightX-Ye[v].mediaBox.bottomLeftX)/ze},yo=d.setPageWidth=function(v,C){Ye[v].mediaBox.topRightX=C*ze+Ye[v].mediaBox.bottomLeftX},jr=d.getPageHeight=function(v){return(Ye[v=v||F].mediaBox.topRightY-Ye[v].mediaBox.bottomLeftY)/ze},bo=d.setPageHeight=function(v,C){Ye[v].mediaBox.topRightY=C*ze+Ye[v].mediaBox.bottomLeftY};return d.internal={pdfEscape:Zt,getStyle:ul,getFont:ou,getFontSize:ye,getCharSpace:uu,getTextColor:cu,getLineHeight:fl,getLineHeightFactor:ml,getLineWidth:ia,write:lt,getHorizontalCoordinate:dr,getVerticalCoordinate:Er,getCoordinateString:lu,getVerticalCoordinateString:Wr,collections:{},newObject:vn,newAdditionalObject:Wi,newObjectDeferred:sn,newObjectDeferredBegin:qn,getFilters:Pi,putStream:j,events:Ze,scaleFactor:ze,pageSize:{getWidth:function(){return Ts(F)},setWidth:function(v){yo(F,v)},getHeight:function(){return jr(F)},setHeight:function(v){bo(F,v)}},encryptionOptions:h,encryption:Wn,getEncryptor:tu,output:ta,getNumberOfPages:Jc,pages:Ie,out:Y,f2:D,f3:E,getPageInfo:cl,getPageInfoByObjId:At,getCurrentPageInfo:nu,getPDFVersion:b,Point:sa,Rectangle:vo,Matrix:tt,hasHotfix:ll},Object.defineProperty(d.internal.pageSize,"width",{get:function(){return Ts(F)},set:function(v){yo(F,v)},enumerable:!0,configurable:!0}),Object.defineProperty(d.internal.pageSize,"height",{get:function(){return jr(F)},set:function(v){bo(F,v)},enumerable:!0,configurable:!0}),Mn.call(d,B),Pe="F1",Zs(r,t),Ze.publish("initialized"),d}za.prototype.lsbFirstWord=function(n){return String.fromCharCode(n>>0&255,n>>8&255,n>>16&255,n>>24&255)},za.prototype.toHexString=function(n){return n.split("").map(function(e){return("0"+(255&e.charCodeAt(0)).toString(16)).slice(-2)}).join("")},za.prototype.hexToBytes=function(n){for(var e=[],t=0;t<n.length;t+=2)e.push(String.fromCharCode(parseInt(n.substr(t,2),16)));return e.join("")},za.prototype.processOwnerPassword=function(n,e){return Gh(zh(e).substr(0,5),n)},za.prototype.encryptor=function(n,e){var t=zh(this.encryptionKey+String.fromCharCode(255&n,n>>8&255,n>>16&255,255&e,e>>8&255)).substr(0,10);return function(i){return Gh(t,i)}},Pc.prototype.equals=function(n){var e,t="id,objectNumber,equals";if(!n||Xt(n)!==Xt(this))return!1;var i=0;for(e in this)if(!(t.indexOf(e)>=0)){if(this.hasOwnProperty(e)&&!n.hasOwnProperty(e)||this[e]!==n[e])return!1;i++}for(e in n)n.hasOwnProperty(e)&&t.indexOf(e)<0&&i--;return i===0},_t.API={events:[]},_t.version="2.5.2";var mn=_t.API,vd=1,Ks=function(n){return n.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},Oa=function(n){return n.replace(/\\\\/g,"\\").replace(/\\\(/g,"(").replace(/\\\)/g,")")},Ct=function(n){return n.toFixed(2)},us=function(n){return n.toFixed(5)};mn.__acroform__={};var _i=function(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n},Op=function(n){return n*vd},mr=function(n){var e=new Zm,t=ut.internal.getHeight(n)||0,i=ut.internal.getWidth(n)||0;return e.BBox=[0,0,Number(Ct(i)),Number(Ct(t))],e},hb=mn.__acroform__.setBit=function(n,e){if(n=n||0,e=e||0,isNaN(n)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");return n|=1<<e},db=mn.__acroform__.clearBit=function(n,e){if(n=n||0,e=e||0,isNaN(n)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");return n&=~(1<<e)},fb=mn.__acroform__.getBit=function(n,e){if(isNaN(n)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");return n&1<<e?1:0},bn=mn.__acroform__.getBitForPdf=function(n,e){if(isNaN(n)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");return fb(n,e-1)},xn=mn.__acroform__.setBitForPdf=function(n,e){if(isNaN(n)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");return hb(n,e-1)},Sn=mn.__acroform__.clearBitForPdf=function(n,e){if(isNaN(n)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");return db(n,e-1)},pb=mn.__acroform__.calculateCoordinates=function(n,e){var t=e.internal.getHorizontalCoordinate,i=e.internal.getVerticalCoordinate,r=n[0],s=n[1],a=n[2],o=n[3],l={};return l.lowerLeft_X=t(r)||0,l.lowerLeft_Y=i(s+o)||0,l.upperRight_X=t(r+a)||0,l.upperRight_Y=i(s)||0,[Number(Ct(l.lowerLeft_X)),Number(Ct(l.lowerLeft_Y)),Number(Ct(l.upperRight_X)),Number(Ct(l.upperRight_Y))]},mb=function(n){if(n.appearanceStreamContent)return n.appearanceStreamContent;if(n.V||n.DV){var e=[],t=n._V||n.DV,i=Hh(n,t),r=n.scope.internal.getFont(n.fontName,n.fontStyle).id;e.push("/Tx BMC"),e.push("q"),e.push("BT"),e.push(n.scope.__private__.encodeColorString(n.color)),e.push("/"+r+" "+Ct(i.fontSize)+" Tf"),e.push("1 0 0 1 0 0 Tm"),e.push(i.text),e.push("ET"),e.push("Q"),e.push("EMC");var s=mr(n);return s.scope=n.scope,s.stream=e.join(`
`),s}},Hh=function(n,e){var t=n.fontSize===0?n.maxFontSize:n.fontSize,i={text:"",fontSize:""},r=(e=(e=e.substr(0,1)=="("?e.substr(1):e).substr(e.length-1)==")"?e.substr(0,e.length-1):e).split(" ");r=n.multiline?r.map(function(E){return E.split(`
`)}):r.map(function(E){return[E]});var s=t,a=ut.internal.getHeight(n)||0;a=a<0?-a:a;var o=ut.internal.getWidth(n)||0;o=o<0?-o:o;var l=function(E,R,X){if(E+1<r.length){var N=R+" "+r[E+1][0];return pc(N,n,X).width<=o-4}return!1};s++;e:for(;s>0;){e="",s--;var u,h,p=pc("3",n,s).height,g=n.multiline?a-s:(a-p)/2,d=g+=2,x=0,b=0,_=0;if(s<=0){e=`(...) Tj
`,e+="% Width of Text: "+pc(e,n,s=12).width+", FieldWidth:"+o+`
`;break}for(var m="",S=0,M=0;M<r.length;M++)if(r.hasOwnProperty(M)){var P=!1;if(r[M].length!==1&&_!==r[M].length-1){if((p+2)*(S+2)+2>a)continue e;m+=r[M][_],P=!0,b=M,M--}else{m=(m+=r[M][_]+" ").substr(m.length-1)==" "?m.substr(0,m.length-1):m;var q=parseInt(M),G=l(q,m,s),U=M>=r.length-1;if(G&&!U){m+=" ",_=0;continue}if(G||U){if(U)b=q;else if(n.multiline&&(p+2)*(S+2)+2>a)continue e}else{if(!n.multiline||(p+2)*(S+2)+2>a)continue e;b=q}}for(var H="",A=x;A<=b;A++){var D=r[A];if(n.multiline){if(A===b){H+=D[_]+" ",_=(_+1)%D.length;continue}if(A===x){H+=D[D.length-1]+" ";continue}}H+=D[0]+" "}switch(H=H.substr(H.length-1)==" "?H.substr(0,H.length-1):H,h=pc(H,n,s).width,n.textAlign){case"right":u=o-h-2;break;case"center":u=(o-h)/2;break;case"left":default:u=2}e+=Ct(u)+" "+Ct(d)+` Td
`,e+="("+Ks(H)+`) Tj
`,e+=-Ct(u)+` 0 Td
`,d=-(s+2),h=0,x=P?b:b+1,S++,m=""}break}return i.text=e,i.fontSize=s,i},pc=function(n,e,t){var i=e.scope.internal.getFont(e.fontName,e.fontStyle),r=e.scope.getStringUnitWidth(n,{font:i,fontSize:parseFloat(t),charSpace:0})*parseFloat(t);return{height:e.scope.getStringUnitWidth("3",{font:i,fontSize:parseFloat(t),charSpace:0})*parseFloat(t)*1.5,width:r}},gb={fields:[],xForms:[],acroFormDictionaryRoot:null,printedOut:!1,internal:null,isInitialized:!1},vb=function(n,e){var t={type:"reference",object:n};e.internal.getPageInfo(n.page).pageContext.annotations.find(function(i){return i.type===t.type&&i.object===t.object})===void 0&&e.internal.getPageInfo(n.page).pageContext.annotations.push(t)},_b=function(n,e){for(var t in n)if(n.hasOwnProperty(t)){var i=t,r=n[t];e.internal.newObjectDeferredBegin(r.objId,!0),Xt(r)==="object"&&typeof r.putStream=="function"&&r.putStream(),delete n[i]}},yb=function(n,e){if(e.scope=n,n.internal!==void 0&&(n.internal.acroformPlugin===void 0||n.internal.acroformPlugin.isInitialized===!1)){if(or.FieldNum=0,n.internal.acroformPlugin=JSON.parse(JSON.stringify(gb)),n.internal.acroformPlugin.acroFormDictionaryRoot)throw new Error("Exception while creating AcroformDictionary");vd=n.internal.scaleFactor,n.internal.acroformPlugin.acroFormDictionaryRoot=new Qm,n.internal.acroformPlugin.acroFormDictionaryRoot.scope=n,n.internal.acroformPlugin.acroFormDictionaryRoot._eventID=n.internal.events.subscribe("postPutResources",function(){(function(t){t.internal.events.unsubscribe(t.internal.acroformPlugin.acroFormDictionaryRoot._eventID),delete t.internal.acroformPlugin.acroFormDictionaryRoot._eventID,t.internal.acroformPlugin.printedOut=!0})(n)}),n.internal.events.subscribe("buildDocument",function(){(function(t){t.internal.acroformPlugin.acroFormDictionaryRoot.objId=void 0;var i=t.internal.acroformPlugin.acroFormDictionaryRoot.Fields;for(var r in i)if(i.hasOwnProperty(r)){var s=i[r];s.objId=void 0,s.hasAnnotation&&vb(s,t)}})(n)}),n.internal.events.subscribe("putCatalog",function(){(function(t){if(t.internal.acroformPlugin.acroFormDictionaryRoot===void 0)throw new Error("putCatalogCallback: Root missing.");t.internal.write("/AcroForm "+t.internal.acroformPlugin.acroFormDictionaryRoot.objId+" 0 R")})(n)}),n.internal.events.subscribe("postPutPages",function(t){(function(i,r){var s=!i;for(var a in i||(r.internal.newObjectDeferredBegin(r.internal.acroformPlugin.acroFormDictionaryRoot.objId,!0),r.internal.acroformPlugin.acroFormDictionaryRoot.putStream()),i=i||r.internal.acroformPlugin.acroFormDictionaryRoot.Kids)if(i.hasOwnProperty(a)){var o=i[a],l=[],u=o.Rect;if(o.Rect&&(o.Rect=pb(o.Rect,r)),r.internal.newObjectDeferredBegin(o.objId,!0),o.DA=ut.createDefaultAppearanceStream(o),Xt(o)==="object"&&typeof o.getKeyValueListForStream=="function"&&(l=o.getKeyValueListForStream()),o.Rect=u,o.hasAppearanceStream&&!o.appearanceStreamContent){var h=mb(o);l.push({key:"AP",value:"<</N "+h+">>"}),r.internal.acroformPlugin.xForms.push(h)}if(o.appearanceStreamContent){var p="";for(var g in o.appearanceStreamContent)if(o.appearanceStreamContent.hasOwnProperty(g)){var d=o.appearanceStreamContent[g];if(p+="/"+g+" ",p+="<<",Object.keys(d).length>=1||Array.isArray(d)){for(var a in d)if(d.hasOwnProperty(a)){var x=d[a];typeof x=="function"&&(x=x.call(r,o)),p+="/"+a+" "+x+" ",r.internal.acroformPlugin.xForms.indexOf(x)>=0||r.internal.acroformPlugin.xForms.push(x)}}else typeof(x=d)=="function"&&(x=x.call(r,o)),p+="/"+a+" "+x,r.internal.acroformPlugin.xForms.indexOf(x)>=0||r.internal.acroformPlugin.xForms.push(x);p+=">>"}l.push({key:"AP",value:`<<
`+p+">>"})}r.internal.putStream({additionalKeyValues:l,objectId:o.objId}),r.internal.out("endobj")}s&&_b(r.internal.acroformPlugin.xForms,r)})(t,n)}),n.internal.acroformPlugin.isInitialized=!0}},Km=mn.__acroform__.arrayToPdfArray=function(n,e,t){var i=function(a){return a};if(Array.isArray(n)){for(var r="[",s=0;s<n.length;s++)switch(s!==0&&(r+=" "),Xt(n[s])){case"boolean":case"number":case"object":r+=n[s].toString();break;case"string":n[s].substr(0,1)!=="/"?(e!==void 0&&t&&(i=t.internal.getEncryptor(e)),r+="("+Ks(i(n[s].toString()))+")"):r+=n[s].toString()}return r+="]"}throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray")},fh=function(n,e,t){var i=function(r){return r};return e!==void 0&&t&&(i=t.internal.getEncryptor(e)),(n=n||"").toString(),n="("+Ks(i(n))+")"},_r=function(){this._objId=void 0,this._scope=void 0,Object.defineProperty(this,"objId",{get:function(){if(this._objId===void 0){if(this.scope===void 0)return;this._objId=this.scope.internal.newObjectDeferred()}return this._objId},set:function(n){this._objId=n}}),Object.defineProperty(this,"scope",{value:this._scope,writable:!0})};_r.prototype.toString=function(){return this.objId+" 0 R"},_r.prototype.putStream=function(){var n=this.getKeyValueListForStream();this.scope.internal.putStream({data:this.stream,additionalKeyValues:n,objectId:this.objId}),this.scope.internal.out("endobj")},_r.prototype.getKeyValueListForStream=function(){var n=[],e=Object.getOwnPropertyNames(this).filter(function(s){return s!="content"&&s!="appearanceStreamContent"&&s!="scope"&&s!="objId"&&s.substring(0,1)!="_"});for(var t in e)if(Object.getOwnPropertyDescriptor(this,e[t]).configurable===!1){var i=e[t],r=this[i];r&&(Array.isArray(r)?n.push({key:i,value:Km(r,this.objId,this.scope)}):r instanceof _r?(r.scope=this.scope,n.push({key:i,value:r.objId+" 0 R"})):typeof r!="function"&&n.push({key:i,value:r}))}return n};var Zm=function(){_r.call(this),Object.defineProperty(this,"Type",{value:"/XObject",configurable:!1,writable:!0}),Object.defineProperty(this,"Subtype",{value:"/Form",configurable:!1,writable:!0}),Object.defineProperty(this,"FormType",{value:1,configurable:!1,writable:!0});var n,e=[];Object.defineProperty(this,"BBox",{configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"Resources",{value:"2 0 R",configurable:!1,writable:!0}),Object.defineProperty(this,"stream",{enumerable:!1,configurable:!0,set:function(t){n=t.trim()},get:function(){return n||null}})};_i(Zm,_r);var Qm=function(){_r.call(this);var n,e=[];Object.defineProperty(this,"Kids",{enumerable:!1,configurable:!0,get:function(){return e.length>0?e:void 0}}),Object.defineProperty(this,"Fields",{enumerable:!1,configurable:!1,get:function(){return e}}),Object.defineProperty(this,"DA",{enumerable:!1,configurable:!1,get:function(){if(n){var t=function(i){return i};return this.scope&&(t=this.scope.internal.getEncryptor(this.objId)),"("+Ks(t(n))+")"}},set:function(t){n=t}})};_i(Qm,_r);var or=function n(){_r.call(this);var e=4;Object.defineProperty(this,"F",{enumerable:!1,configurable:!1,get:function(){return e},set:function(m){if(isNaN(m))throw new Error('Invalid value "'+m+'" for attribute F supplied.');e=m}}),Object.defineProperty(this,"showWhenPrinted",{enumerable:!0,configurable:!0,get:function(){return!!bn(e,3)},set:function(m){m?this.F=xn(e,3):this.F=Sn(e,3)}});var t=0;Object.defineProperty(this,"Ff",{enumerable:!1,configurable:!1,get:function(){return t},set:function(m){if(isNaN(m))throw new Error('Invalid value "'+m+'" for attribute Ff supplied.');t=m}});var i=[];Object.defineProperty(this,"Rect",{enumerable:!1,configurable:!1,get:function(){if(i.length!==0)return i},set:function(m){i=m!==void 0?m:[]}}),Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,get:function(){return!i||isNaN(i[0])?0:i[0]},set:function(m){i[0]=m}}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,get:function(){return!i||isNaN(i[1])?0:i[1]},set:function(m){i[1]=m}}),Object.defineProperty(this,"width",{enumerable:!0,configurable:!0,get:function(){return!i||isNaN(i[2])?0:i[2]},set:function(m){i[2]=m}}),Object.defineProperty(this,"height",{enumerable:!0,configurable:!0,get:function(){return!i||isNaN(i[3])?0:i[3]},set:function(m){i[3]=m}});var r="";Object.defineProperty(this,"FT",{enumerable:!0,configurable:!1,get:function(){return r},set:function(m){switch(m){case"/Btn":case"/Tx":case"/Ch":case"/Sig":r=m;break;default:throw new Error('Invalid value "'+m+'" for attribute FT supplied.')}}});var s=null;Object.defineProperty(this,"T",{enumerable:!0,configurable:!1,get:function(){if(!s||s.length<1){if(this instanceof Nc)return;s="FieldObject"+n.FieldNum++}var m=function(S){return S};return this.scope&&(m=this.scope.internal.getEncryptor(this.objId)),"("+Ks(m(s))+")"},set:function(m){s=m.toString()}}),Object.defineProperty(this,"fieldName",{configurable:!0,enumerable:!0,get:function(){return s},set:function(m){s=m}});var a="helvetica";Object.defineProperty(this,"fontName",{enumerable:!0,configurable:!0,get:function(){return a},set:function(m){a=m}});var o="normal";Object.defineProperty(this,"fontStyle",{enumerable:!0,configurable:!0,get:function(){return o},set:function(m){o=m}});var l=0;Object.defineProperty(this,"fontSize",{enumerable:!0,configurable:!0,get:function(){return l},set:function(m){l=m}});var u=void 0;Object.defineProperty(this,"maxFontSize",{enumerable:!0,configurable:!0,get:function(){return u===void 0?50/vd:u},set:function(m){u=m}});var h="black";Object.defineProperty(this,"color",{enumerable:!0,configurable:!0,get:function(){return h},set:function(m){h=m}});var p="/F1 0 Tf 0 g";Object.defineProperty(this,"DA",{enumerable:!0,configurable:!1,get:function(){if(!(!p||this instanceof Nc||this instanceof Xs))return fh(p,this.objId,this.scope)},set:function(m){m=m.toString(),p=m}});var g=null;Object.defineProperty(this,"DV",{enumerable:!1,configurable:!1,get:function(){if(g)return this instanceof kn?g:fh(g,this.objId,this.scope)},set:function(m){m=m.toString(),g=this instanceof kn?m:m.substr(0,1)==="("?Oa(m.substr(1,m.length-2)):Oa(m)}}),Object.defineProperty(this,"defaultValue",{enumerable:!0,configurable:!0,get:function(){return this instanceof kn?Oa(g.substr(1,g.length-1)):g},set:function(m){m=m.toString(),g=this instanceof kn?"/"+m:m}});var d=null;Object.defineProperty(this,"_V",{enumerable:!1,configurable:!1,get:function(){if(d)return d},set:function(m){this.V=m}}),Object.defineProperty(this,"V",{enumerable:!1,configurable:!1,get:function(){if(d)return this instanceof kn?d:fh(d,this.objId,this.scope)},set:function(m){m=m.toString(),d=this instanceof kn?m:m.substr(0,1)==="("?Oa(m.substr(1,m.length-2)):Oa(m)}}),Object.defineProperty(this,"value",{enumerable:!0,configurable:!0,get:function(){return this instanceof kn?Oa(d.substr(1,d.length-1)):d},set:function(m){m=m.toString(),d=this instanceof kn?"/"+m:m}}),Object.defineProperty(this,"hasAnnotation",{enumerable:!0,configurable:!0,get:function(){return this.Rect}}),Object.defineProperty(this,"Type",{enumerable:!0,configurable:!1,get:function(){return this.hasAnnotation?"/Annot":null}}),Object.defineProperty(this,"Subtype",{enumerable:!0,configurable:!1,get:function(){return this.hasAnnotation?"/Widget":null}});var x,b=!1;Object.defineProperty(this,"hasAppearanceStream",{enumerable:!0,configurable:!0,get:function(){return b},set:function(m){m=!!m,b=m}}),Object.defineProperty(this,"page",{enumerable:!0,configurable:!0,get:function(){if(x)return x},set:function(m){x=m}}),Object.defineProperty(this,"readOnly",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,1)},set:function(m){m?this.Ff=xn(this.Ff,1):this.Ff=Sn(this.Ff,1)}}),Object.defineProperty(this,"required",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,2)},set:function(m){m?this.Ff=xn(this.Ff,2):this.Ff=Sn(this.Ff,2)}}),Object.defineProperty(this,"noExport",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,3)},set:function(m){m?this.Ff=xn(this.Ff,3):this.Ff=Sn(this.Ff,3)}});var _=null;Object.defineProperty(this,"Q",{enumerable:!0,configurable:!1,get:function(){if(_!==null)return _},set:function(m){if([0,1,2].indexOf(m)===-1)throw new Error('Invalid value "'+m+'" for attribute Q supplied.');_=m}}),Object.defineProperty(this,"textAlign",{get:function(){var m;switch(_){case 0:default:m="left";break;case 1:m="center";break;case 2:m="right"}return m},configurable:!0,enumerable:!0,set:function(m){switch(m){case"right":case 2:_=2;break;case"center":case 1:_=1;break;case"left":case 0:default:_=0}}})};_i(or,_r);var Xa=function(){or.call(this),this.FT="/Ch",this.V="()",this.fontName="zapfdingbats";var n=0;Object.defineProperty(this,"TI",{enumerable:!0,configurable:!1,get:function(){return n},set:function(t){n=t}}),Object.defineProperty(this,"topIndex",{enumerable:!0,configurable:!0,get:function(){return n},set:function(t){n=t}});var e=[];Object.defineProperty(this,"Opt",{enumerable:!0,configurable:!1,get:function(){return Km(e,this.objId,this.scope)},set:function(t){var i,r;r=[],typeof(i=t)=="string"&&(r=function(s,a,o){o||(o=1);for(var l,u=[];l=a.exec(s);)u.push(l[o]);return u}(i,/\((.*?)\)/g)),e=r}}),this.getOptions=function(){return e},this.setOptions=function(t){e=t,this.sort&&e.sort()},this.addOption=function(t){t=(t=t||"").toString(),e.push(t),this.sort&&e.sort()},this.removeOption=function(t,i){for(i=i||!1,t=(t=t||"").toString();e.indexOf(t)!==-1&&(e.splice(e.indexOf(t),1),i!==!1););},Object.defineProperty(this,"combo",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,18)},set:function(t){t?this.Ff=xn(this.Ff,18):this.Ff=Sn(this.Ff,18)}}),Object.defineProperty(this,"edit",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,19)},set:function(t){this.combo===!0&&(t?this.Ff=xn(this.Ff,19):this.Ff=Sn(this.Ff,19))}}),Object.defineProperty(this,"sort",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,20)},set:function(t){t?(this.Ff=xn(this.Ff,20),e.sort()):this.Ff=Sn(this.Ff,20)}}),Object.defineProperty(this,"multiSelect",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,22)},set:function(t){t?this.Ff=xn(this.Ff,22):this.Ff=Sn(this.Ff,22)}}),Object.defineProperty(this,"doNotSpellCheck",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,23)},set:function(t){t?this.Ff=xn(this.Ff,23):this.Ff=Sn(this.Ff,23)}}),Object.defineProperty(this,"commitOnSelChange",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,27)},set:function(t){t?this.Ff=xn(this.Ff,27):this.Ff=Sn(this.Ff,27)}}),this.hasAppearanceStream=!1};_i(Xa,or);var Ya=function(){Xa.call(this),this.fontName="helvetica",this.combo=!1};_i(Ya,Xa);var $a=function(){Ya.call(this),this.combo=!0};_i($a,Ya);var bc=function(){$a.call(this),this.edit=!0};_i(bc,$a);var kn=function(){or.call(this),this.FT="/Btn",Object.defineProperty(this,"noToggleToOff",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,15)},set:function(t){t?this.Ff=xn(this.Ff,15):this.Ff=Sn(this.Ff,15)}}),Object.defineProperty(this,"radio",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,16)},set:function(t){t?this.Ff=xn(this.Ff,16):this.Ff=Sn(this.Ff,16)}}),Object.defineProperty(this,"pushButton",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,17)},set:function(t){t?this.Ff=xn(this.Ff,17):this.Ff=Sn(this.Ff,17)}}),Object.defineProperty(this,"radioIsUnison",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,26)},set:function(t){t?this.Ff=xn(this.Ff,26):this.Ff=Sn(this.Ff,26)}});var n,e={};Object.defineProperty(this,"MK",{enumerable:!1,configurable:!1,get:function(){var t=function(s){return s};if(this.scope&&(t=this.scope.internal.getEncryptor(this.objId)),Object.keys(e).length!==0){var i,r=[];for(i in r.push("<<"),e)r.push("/"+i+" ("+Ks(t(e[i]))+")");return r.push(">>"),r.join(`
`)}},set:function(t){Xt(t)==="object"&&(e=t)}}),Object.defineProperty(this,"caption",{enumerable:!0,configurable:!0,get:function(){return e.CA||""},set:function(t){typeof t=="string"&&(e.CA=t)}}),Object.defineProperty(this,"AS",{enumerable:!1,configurable:!1,get:function(){return n},set:function(t){n=t}}),Object.defineProperty(this,"appearanceState",{enumerable:!0,configurable:!0,get:function(){return n.substr(1,n.length-1)},set:function(t){n="/"+t}})};_i(kn,or);var xc=function(){kn.call(this),this.pushButton=!0};_i(xc,kn);var Ja=function(){kn.call(this),this.radio=!0,this.pushButton=!1;var n=[];Object.defineProperty(this,"Kids",{enumerable:!0,configurable:!1,get:function(){return n},set:function(e){n=e!==void 0?e:[]}})};_i(Ja,kn);var Nc=function(){var n,e;or.call(this),Object.defineProperty(this,"Parent",{enumerable:!1,configurable:!1,get:function(){return n},set:function(r){n=r}}),Object.defineProperty(this,"optionName",{enumerable:!1,configurable:!0,get:function(){return e},set:function(r){e=r}});var t,i={};Object.defineProperty(this,"MK",{enumerable:!1,configurable:!1,get:function(){var r=function(o){return o};this.scope&&(r=this.scope.internal.getEncryptor(this.objId));var s,a=[];for(s in a.push("<<"),i)a.push("/"+s+" ("+Ks(r(i[s]))+")");return a.push(">>"),a.join(`
`)},set:function(r){Xt(r)==="object"&&(i=r)}}),Object.defineProperty(this,"caption",{enumerable:!0,configurable:!0,get:function(){return i.CA||""},set:function(r){typeof r=="string"&&(i.CA=r)}}),Object.defineProperty(this,"AS",{enumerable:!1,configurable:!1,get:function(){return t},set:function(r){t=r}}),Object.defineProperty(this,"appearanceState",{enumerable:!0,configurable:!0,get:function(){return t.substr(1,t.length-1)},set:function(r){t="/"+r}}),this.caption="l",this.appearanceState="Off",this._AppearanceType=ut.RadioButton.Circle,this.appearanceStreamContent=this._AppearanceType.createAppearanceStream(this.optionName)};_i(Nc,or),Ja.prototype.setAppearance=function(n){if(!("createAppearanceStream"in n)||!("getCA"in n))throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");for(var e in this.Kids)if(this.Kids.hasOwnProperty(e)){var t=this.Kids[e];t.appearanceStreamContent=n.createAppearanceStream(t.optionName),t.caption=n.getCA()}},Ja.prototype.createOption=function(n){var e=new Nc;return e.Parent=this,e.optionName=n,this.Kids.push(e),bb.call(this.scope,e),e};var Sc=function(){kn.call(this),this.fontName="zapfdingbats",this.caption="3",this.appearanceState="On",this.value="On",this.textAlign="center",this.appearanceStreamContent=ut.CheckBox.createAppearanceStream()};_i(Sc,kn);var Xs=function(){or.call(this),this.FT="/Tx",Object.defineProperty(this,"multiline",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,13)},set:function(e){e?this.Ff=xn(this.Ff,13):this.Ff=Sn(this.Ff,13)}}),Object.defineProperty(this,"fileSelect",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,21)},set:function(e){e?this.Ff=xn(this.Ff,21):this.Ff=Sn(this.Ff,21)}}),Object.defineProperty(this,"doNotSpellCheck",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,23)},set:function(e){e?this.Ff=xn(this.Ff,23):this.Ff=Sn(this.Ff,23)}}),Object.defineProperty(this,"doNotScroll",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,24)},set:function(e){e?this.Ff=xn(this.Ff,24):this.Ff=Sn(this.Ff,24)}}),Object.defineProperty(this,"comb",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,25)},set:function(e){e?this.Ff=xn(this.Ff,25):this.Ff=Sn(this.Ff,25)}}),Object.defineProperty(this,"richText",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,26)},set:function(e){e?this.Ff=xn(this.Ff,26):this.Ff=Sn(this.Ff,26)}});var n=null;Object.defineProperty(this,"MaxLen",{enumerable:!0,configurable:!1,get:function(){return n},set:function(e){n=e}}),Object.defineProperty(this,"maxLength",{enumerable:!0,configurable:!0,get:function(){return n},set:function(e){Number.isInteger(e)&&(n=e)}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!0,configurable:!0,get:function(){return this.V||this.DV}})};_i(Xs,or);var wc=function(){Xs.call(this),Object.defineProperty(this,"password",{enumerable:!0,configurable:!0,get:function(){return!!bn(this.Ff,14)},set:function(n){n?this.Ff=xn(this.Ff,14):this.Ff=Sn(this.Ff,14)}}),this.password=!0};_i(wc,Xs);var ut={CheckBox:{createAppearanceStream:function(){return{N:{On:ut.CheckBox.YesNormal},D:{On:ut.CheckBox.YesPushDown,Off:ut.CheckBox.OffPushDown}}},YesPushDown:function(n){var e=mr(n);e.scope=n.scope;var t=[],i=n.scope.internal.getFont(n.fontName,n.fontStyle).id,r=n.scope.__private__.encodeColorString(n.color),s=Hh(n,n.caption);return t.push("0.749023 g"),t.push("0 0 "+Ct(ut.internal.getWidth(n))+" "+Ct(ut.internal.getHeight(n))+" re"),t.push("f"),t.push("BMC"),t.push("q"),t.push("0 0 1 rg"),t.push("/"+i+" "+Ct(s.fontSize)+" Tf "+r),t.push("BT"),t.push(s.text),t.push("ET"),t.push("Q"),t.push("EMC"),e.stream=t.join(`
`),e},YesNormal:function(n){var e=mr(n);e.scope=n.scope;var t=n.scope.internal.getFont(n.fontName,n.fontStyle).id,i=n.scope.__private__.encodeColorString(n.color),r=[],s=ut.internal.getHeight(n),a=ut.internal.getWidth(n),o=Hh(n,n.caption);return r.push("1 g"),r.push("0 0 "+Ct(a)+" "+Ct(s)+" re"),r.push("f"),r.push("q"),r.push("0 0 1 rg"),r.push("0 0 "+Ct(a-1)+" "+Ct(s-1)+" re"),r.push("W"),r.push("n"),r.push("0 g"),r.push("BT"),r.push("/"+t+" "+Ct(o.fontSize)+" Tf "+i),r.push(o.text),r.push("ET"),r.push("Q"),e.stream=r.join(`
`),e},OffPushDown:function(n){var e=mr(n);e.scope=n.scope;var t=[];return t.push("0.749023 g"),t.push("0 0 "+Ct(ut.internal.getWidth(n))+" "+Ct(ut.internal.getHeight(n))+" re"),t.push("f"),e.stream=t.join(`
`),e}},RadioButton:{Circle:{createAppearanceStream:function(n){var e={D:{Off:ut.RadioButton.Circle.OffPushDown},N:{}};return e.N[n]=ut.RadioButton.Circle.YesNormal,e.D[n]=ut.RadioButton.Circle.YesPushDown,e},getCA:function(){return"l"},YesNormal:function(n){var e=mr(n);e.scope=n.scope;var t=[],i=ut.internal.getWidth(n)<=ut.internal.getHeight(n)?ut.internal.getWidth(n)/4:ut.internal.getHeight(n)/4;i=Number((.9*i).toFixed(5));var r=ut.internal.Bezier_C,s=Number((i*r).toFixed(5));return t.push("q"),t.push("1 0 0 1 "+us(ut.internal.getWidth(n)/2)+" "+us(ut.internal.getHeight(n)/2)+" cm"),t.push(i+" 0 m"),t.push(i+" "+s+" "+s+" "+i+" 0 "+i+" c"),t.push("-"+s+" "+i+" -"+i+" "+s+" -"+i+" 0 c"),t.push("-"+i+" -"+s+" -"+s+" -"+i+" 0 -"+i+" c"),t.push(s+" -"+i+" "+i+" -"+s+" "+i+" 0 c"),t.push("f"),t.push("Q"),e.stream=t.join(`
`),e},YesPushDown:function(n){var e=mr(n);e.scope=n.scope;var t=[],i=ut.internal.getWidth(n)<=ut.internal.getHeight(n)?ut.internal.getWidth(n)/4:ut.internal.getHeight(n)/4;i=Number((.9*i).toFixed(5));var r=Number((2*i).toFixed(5)),s=Number((r*ut.internal.Bezier_C).toFixed(5)),a=Number((i*ut.internal.Bezier_C).toFixed(5));return t.push("0.749023 g"),t.push("q"),t.push("1 0 0 1 "+us(ut.internal.getWidth(n)/2)+" "+us(ut.internal.getHeight(n)/2)+" cm"),t.push(r+" 0 m"),t.push(r+" "+s+" "+s+" "+r+" 0 "+r+" c"),t.push("-"+s+" "+r+" -"+r+" "+s+" -"+r+" 0 c"),t.push("-"+r+" -"+s+" -"+s+" -"+r+" 0 -"+r+" c"),t.push(s+" -"+r+" "+r+" -"+s+" "+r+" 0 c"),t.push("f"),t.push("Q"),t.push("0 g"),t.push("q"),t.push("1 0 0 1 "+us(ut.internal.getWidth(n)/2)+" "+us(ut.internal.getHeight(n)/2)+" cm"),t.push(i+" 0 m"),t.push(i+" "+a+" "+a+" "+i+" 0 "+i+" c"),t.push("-"+a+" "+i+" -"+i+" "+a+" -"+i+" 0 c"),t.push("-"+i+" -"+a+" -"+a+" -"+i+" 0 -"+i+" c"),t.push(a+" -"+i+" "+i+" -"+a+" "+i+" 0 c"),t.push("f"),t.push("Q"),e.stream=t.join(`
`),e},OffPushDown:function(n){var e=mr(n);e.scope=n.scope;var t=[],i=ut.internal.getWidth(n)<=ut.internal.getHeight(n)?ut.internal.getWidth(n)/4:ut.internal.getHeight(n)/4;i=Number((.9*i).toFixed(5));var r=Number((2*i).toFixed(5)),s=Number((r*ut.internal.Bezier_C).toFixed(5));return t.push("0.749023 g"),t.push("q"),t.push("1 0 0 1 "+us(ut.internal.getWidth(n)/2)+" "+us(ut.internal.getHeight(n)/2)+" cm"),t.push(r+" 0 m"),t.push(r+" "+s+" "+s+" "+r+" 0 "+r+" c"),t.push("-"+s+" "+r+" -"+r+" "+s+" -"+r+" 0 c"),t.push("-"+r+" -"+s+" -"+s+" -"+r+" 0 -"+r+" c"),t.push(s+" -"+r+" "+r+" -"+s+" "+r+" 0 c"),t.push("f"),t.push("Q"),e.stream=t.join(`
`),e}},Cross:{createAppearanceStream:function(n){var e={D:{Off:ut.RadioButton.Cross.OffPushDown},N:{}};return e.N[n]=ut.RadioButton.Cross.YesNormal,e.D[n]=ut.RadioButton.Cross.YesPushDown,e},getCA:function(){return"8"},YesNormal:function(n){var e=mr(n);e.scope=n.scope;var t=[],i=ut.internal.calculateCross(n);return t.push("q"),t.push("1 1 "+Ct(ut.internal.getWidth(n)-2)+" "+Ct(ut.internal.getHeight(n)-2)+" re"),t.push("W"),t.push("n"),t.push(Ct(i.x1.x)+" "+Ct(i.x1.y)+" m"),t.push(Ct(i.x2.x)+" "+Ct(i.x2.y)+" l"),t.push(Ct(i.x4.x)+" "+Ct(i.x4.y)+" m"),t.push(Ct(i.x3.x)+" "+Ct(i.x3.y)+" l"),t.push("s"),t.push("Q"),e.stream=t.join(`
`),e},YesPushDown:function(n){var e=mr(n);e.scope=n.scope;var t=ut.internal.calculateCross(n),i=[];return i.push("0.749023 g"),i.push("0 0 "+Ct(ut.internal.getWidth(n))+" "+Ct(ut.internal.getHeight(n))+" re"),i.push("f"),i.push("q"),i.push("1 1 "+Ct(ut.internal.getWidth(n)-2)+" "+Ct(ut.internal.getHeight(n)-2)+" re"),i.push("W"),i.push("n"),i.push(Ct(t.x1.x)+" "+Ct(t.x1.y)+" m"),i.push(Ct(t.x2.x)+" "+Ct(t.x2.y)+" l"),i.push(Ct(t.x4.x)+" "+Ct(t.x4.y)+" m"),i.push(Ct(t.x3.x)+" "+Ct(t.x3.y)+" l"),i.push("s"),i.push("Q"),e.stream=i.join(`
`),e},OffPushDown:function(n){var e=mr(n);e.scope=n.scope;var t=[];return t.push("0.749023 g"),t.push("0 0 "+Ct(ut.internal.getWidth(n))+" "+Ct(ut.internal.getHeight(n))+" re"),t.push("f"),e.stream=t.join(`
`),e}}},createDefaultAppearanceStream:function(n){var e=n.scope.internal.getFont(n.fontName,n.fontStyle).id,t=n.scope.__private__.encodeColorString(n.color);return"/"+e+" "+n.fontSize+" Tf "+t}};ut.internal={Bezier_C:.551915024494,calculateCross:function(n){var e=ut.internal.getWidth(n),t=ut.internal.getHeight(n),i=Math.min(e,t);return{x1:{x:(e-i)/2,y:(t-i)/2+i},x2:{x:(e-i)/2+i,y:(t-i)/2},x3:{x:(e-i)/2,y:(t-i)/2},x4:{x:(e-i)/2+i,y:(t-i)/2+i}}}},ut.internal.getWidth=function(n){var e=0;return Xt(n)==="object"&&(e=Op(n.Rect[2])),e},ut.internal.getHeight=function(n){var e=0;return Xt(n)==="object"&&(e=Op(n.Rect[3])),e};var bb=mn.addField=function(n){if(yb(this,n),!(n instanceof or))throw new Error("Invalid argument passed to jsPDF.addField.");var e;return(e=n).scope.internal.acroformPlugin.printedOut&&(e.scope.internal.acroformPlugin.printedOut=!1,e.scope.internal.acroformPlugin.acroFormDictionaryRoot=null),e.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(e),n.page=n.scope.internal.getCurrentPageInfo().pageNumber,this};mn.AcroFormChoiceField=Xa,mn.AcroFormListBox=Ya,mn.AcroFormComboBox=$a,mn.AcroFormEditBox=bc,mn.AcroFormButton=kn,mn.AcroFormPushButton=xc,mn.AcroFormRadioButton=Ja,mn.AcroFormCheckBox=Sc,mn.AcroFormTextField=Xs,mn.AcroFormPasswordField=wc,mn.AcroFormAppearance=ut,mn.AcroForm={ChoiceField:Xa,ListBox:Ya,ComboBox:$a,EditBox:bc,Button:kn,PushButton:xc,RadioButton:Ja,CheckBox:Sc,TextField:Xs,PasswordField:wc,Appearance:ut},_t.AcroForm={ChoiceField:Xa,ListBox:Ya,ComboBox:$a,EditBox:bc,Button:kn,PushButton:xc,RadioButton:Ja,CheckBox:Sc,TextField:Xs,PasswordField:wc,Appearance:ut};_t.AcroForm;function e0(n){return n.reduce(function(e,t,i){return e[t]=i,e},{})}(function(n){n.__addimage__={};var e="UNKNOWN",t={PNG:[[137,80,78,71]],TIFF:[[77,77,0,42],[73,73,42,0]],JPEG:[[255,216,255,224,void 0,void 0,74,70,73,70,0],[255,216,255,225,void 0,void 0,69,120,105,102,0,0],[255,216,255,219],[255,216,255,238]],JPEG2000:[[0,0,0,12,106,80,32,32]],GIF87a:[[71,73,70,56,55,97]],GIF89a:[[71,73,70,56,57,97]],WEBP:[[82,73,70,70,void 0,void 0,void 0,void 0,87,69,66,80]],BMP:[[66,77],[66,65],[67,73],[67,80],[73,67],[80,84]]},i=n.__addimage__.getImageFileTypeByImageData=function(E,R){var X,N,J,Q,ie,ee=e;if((R=R||e)==="RGBA"||E.data!==void 0&&E.data instanceof Uint8ClampedArray&&"height"in E&&"width"in E)return"RGBA";if(G(E))for(ie in t)for(J=t[ie],X=0;X<J.length;X+=1){for(Q=!0,N=0;N<J[X].length;N+=1)if(J[X][N]!==void 0&&J[X][N]!==E[N]){Q=!1;break}if(Q===!0){ee=ie;break}}else for(ie in t)for(J=t[ie],X=0;X<J.length;X+=1){for(Q=!0,N=0;N<J[X].length;N+=1)if(J[X][N]!==void 0&&J[X][N]!==E.charCodeAt(N)){Q=!1;break}if(Q===!0){ee=ie;break}}return ee===e&&R!==e&&(ee=R),ee},r=function E(R){for(var X=this.internal.write,N=this.internal.putStream,J=(0,this.internal.getFilters)();J.indexOf("FlateEncode")!==-1;)J.splice(J.indexOf("FlateEncode"),1);R.objectId=this.internal.newObject();var Q=[];if(Q.push({key:"Type",value:"/XObject"}),Q.push({key:"Subtype",value:"/Image"}),Q.push({key:"Width",value:R.width}),Q.push({key:"Height",value:R.height}),R.colorSpace===_.INDEXED?Q.push({key:"ColorSpace",value:"[/Indexed /DeviceRGB "+(R.palette.length/3-1)+" "+("sMask"in R&&R.sMask!==void 0?R.objectId+2:R.objectId+1)+" 0 R]"}):(Q.push({key:"ColorSpace",value:"/"+R.colorSpace}),R.colorSpace===_.DEVICE_CMYK&&Q.push({key:"Decode",value:"[1 0 1 0 1 0 1 0]"})),Q.push({key:"BitsPerComponent",value:R.bitsPerComponent}),"decodeParameters"in R&&R.decodeParameters!==void 0&&Q.push({key:"DecodeParms",value:"<<"+R.decodeParameters+">>"}),"transparency"in R&&Array.isArray(R.transparency)){for(var ie="",ee=0,te=R.transparency.length;ee<te;ee++)ie+=R.transparency[ee]+" "+R.transparency[ee]+" ";Q.push({key:"Mask",value:"["+ie+"]"})}R.sMask!==void 0&&Q.push({key:"SMask",value:R.objectId+1+" 0 R"});var ae=R.filter!==void 0?["/"+R.filter]:void 0;if(N({data:R.data,additionalKeyValues:Q,alreadyAppliedFilters:ae,objectId:R.objectId}),X("endobj"),"sMask"in R&&R.sMask!==void 0){var xe="/Predictor "+R.predictor+" /Colors 1 /BitsPerComponent "+R.bitsPerComponent+" /Columns "+R.width,T={width:R.width,height:R.height,colorSpace:"DeviceGray",bitsPerComponent:R.bitsPerComponent,decodeParameters:xe,data:R.sMask};"filter"in R&&(T.filter=R.filter),E.call(this,T)}if(R.colorSpace===_.INDEXED){var F=this.internal.newObject();N({data:H(new Uint8Array(R.palette)),objectId:F}),X("endobj")}},s=function(){var E=this.internal.collections.addImage_images;for(var R in E)r.call(this,E[R])},a=function(){var E,R=this.internal.collections.addImage_images,X=this.internal.write;for(var N in R)X("/I"+(E=R[N]).index,E.objectId,"0","R")},o=function(){this.internal.collections.addImage_images||(this.internal.collections.addImage_images={},this.internal.events.subscribe("putResources",s),this.internal.events.subscribe("putXobjectDict",a))},l=function(){var E=this.internal.collections.addImage_images;return o.call(this),E},u=function(){return Object.keys(this.internal.collections.addImage_images).length},h=function(E){return typeof n["process"+E.toUpperCase()]=="function"},p=function(E){return Xt(E)==="object"&&E.nodeType===1},g=function(E,R){if(E.nodeName==="IMG"&&E.hasAttribute("src")){var X=""+E.getAttribute("src");if(X.indexOf("data:image/")===0)return Xo(unescape(X).split("base64,").pop());var N=n.loadFile(X,!0);if(N!==void 0)return N}if(E.nodeName==="CANVAS"){if(E.width===0||E.height===0)throw new Error("Given canvas must have data. Canvas width: "+E.width+", height: "+E.height);var J;switch(R){case"PNG":J="image/png";break;case"WEBP":J="image/webp";break;case"JPEG":case"JPG":default:J="image/jpeg"}return Xo(E.toDataURL(J,1).split("base64,").pop())}},d=function(E){var R=this.internal.collections.addImage_images;if(R){for(var X in R)if(E===R[X].alias)return R[X]}},x=function(E,R,X){return E||R||(E=-96,R=-96),E<0&&(E=-1*X.width*72/E/this.internal.scaleFactor),R<0&&(R=-1*X.height*72/R/this.internal.scaleFactor),E===0&&(E=R*X.width/X.height),R===0&&(R=E*X.height/X.width),[E,R]},b=function(E,R,X,N,J,Q){var ie=x.call(this,X,N,J),ee=this.internal.getCoordinateString,te=this.internal.getVerticalCoordinateString,ae=l.call(this);if(X=ie[0],N=ie[1],ae[J.index]=J,Q){Q*=Math.PI/180;var xe=Math.cos(Q),T=Math.sin(Q),F=function(K){return K.toFixed(4)},V=[F(xe),F(T),F(-1*T),F(xe),0,0,"cm"]}this.internal.write("q"),Q?(this.internal.write([1,"0","0",1,ee(E),te(R+N),"cm"].join(" ")),this.internal.write(V.join(" ")),this.internal.write([ee(X),"0","0",ee(N),"0","0","cm"].join(" "))):this.internal.write([ee(X),"0","0",ee(N),ee(E),te(R+N),"cm"].join(" ")),this.isAdvancedAPI()&&this.internal.write([1,0,0,-1,0,0,"cm"].join(" ")),this.internal.write("/I"+J.index+" Do"),this.internal.write("Q")},_=n.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"};n.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"};var m=n.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},S=n.__addimage__.sHashCode=function(E){var R,X,N=0;if(typeof E=="string")for(X=E.length,R=0;R<X;R++)N=(N<<5)-N+E.charCodeAt(R),N|=0;else if(G(E))for(X=E.byteLength/2,R=0;R<X;R++)N=(N<<5)-N+E[R],N|=0;return N},M=n.__addimage__.validateStringAsBase64=function(E){(E=E||"").toString().trim();var R=!0;return E.length===0&&(R=!1),E.length%4!=0&&(R=!1),/^[A-Za-z0-9+/]+$/.test(E.substr(0,E.length-2))===!1&&(R=!1),/^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(E.substr(-2))===!1&&(R=!1),R},P=n.__addimage__.extractImageFromDataUrl=function(E){var R=(E=E||"").split("base64,"),X=null;if(R.length===2){var N=/^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(R[0]);Array.isArray(N)&&(X={mimeType:N[1],charset:N[2],data:R[1]})}return X},q=n.__addimage__.supportsArrayBuffer=function(){return typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"};n.__addimage__.isArrayBuffer=function(E){return q()&&E instanceof ArrayBuffer};var G=n.__addimage__.isArrayBufferView=function(E){return q()&&typeof Uint32Array<"u"&&(E instanceof Int8Array||E instanceof Uint8Array||typeof Uint8ClampedArray<"u"&&E instanceof Uint8ClampedArray||E instanceof Int16Array||E instanceof Uint16Array||E instanceof Int32Array||E instanceof Uint32Array||E instanceof Float32Array||E instanceof Float64Array)},U=n.__addimage__.binaryStringToUint8Array=function(E){for(var R=E.length,X=new Uint8Array(R),N=0;N<R;N++)X[N]=E.charCodeAt(N);return X},H=n.__addimage__.arrayBufferToBinaryString=function(E){for(var R="",X=G(E)?E:new Uint8Array(E),N=0;N<X.length;N+=8192)R+=String.fromCharCode.apply(null,X.subarray(N,N+8192));return R};n.addImage=function(){var E,R,X,N,J,Q,ie,ee,te;if(typeof arguments[1]=="number"?(R=e,X=arguments[1],N=arguments[2],J=arguments[3],Q=arguments[4],ie=arguments[5],ee=arguments[6],te=arguments[7]):(R=arguments[1],X=arguments[2],N=arguments[3],J=arguments[4],Q=arguments[5],ie=arguments[6],ee=arguments[7],te=arguments[8]),Xt(E=arguments[0])==="object"&&!p(E)&&"imageData"in E){var ae=E;E=ae.imageData,R=ae.format||R||e,X=ae.x||X||0,N=ae.y||N||0,J=ae.w||ae.width||J,Q=ae.h||ae.height||Q,ie=ae.alias||ie,ee=ae.compression||ee,te=ae.rotation||ae.angle||te}var xe=this.internal.getFilters();if(ee===void 0&&xe.indexOf("FlateEncode")!==-1&&(ee="SLOW"),isNaN(X)||isNaN(N))throw new Error("Invalid coordinates passed to jsPDF.addImage");o.call(this);var T=A.call(this,E,R,ie,ee);return b.call(this,X,N,J,Q,T,te),this};var A=function(E,R,X,N){var J,Q,ie;if(typeof E=="string"&&i(E)===e){E=unescape(E);var ee=D(E,!1);(ee!==""||(ee=n.loadFile(E,!0))!==void 0)&&(E=ee)}if(p(E)&&(E=g(E,R)),R=i(E,R),!h(R))throw new Error("addImage does not support files of type '"+R+"', please ensure that a plugin for '"+R+"' support is added.");if(((ie=X)==null||ie.length===0)&&(X=function(te){return typeof te=="string"||G(te)?S(te):G(te.data)?S(te.data):null}(E)),(J=d.call(this,X))||(q()&&(E instanceof Uint8Array||R==="RGBA"||(Q=E,E=U(E))),J=this["process"+R.toUpperCase()](E,u.call(this),X,function(te){return te&&typeof te=="string"&&(te=te.toUpperCase()),te in n.image_compression?te:m.NONE}(N),Q)),!J)throw new Error("An unknown error occurred whilst processing the image.");return J},D=n.__addimage__.convertBase64ToBinaryString=function(E,R){var X;R=typeof R!="boolean"||R;var N,J="";if(typeof E=="string"){N=(X=P(E))!==null?X.data:E;try{J=Xo(N)}catch(Q){if(R)throw M(N)?new Error("atob-Error in jsPDF.convertBase64ToBinaryString "+Q.message):new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ")}}return J};n.getImageProperties=function(E){var R,X,N="";if(p(E)&&(E=g(E)),typeof E=="string"&&i(E)===e&&((N=D(E,!1))===""&&(N=n.loadFile(E)||""),E=N),X=i(E),!h(X))throw new Error("addImage does not support files of type '"+X+"', please ensure that a plugin for '"+X+"' support is added.");if(!q()||E instanceof Uint8Array||(E=U(E)),!(R=this["process"+X.toUpperCase()](E)))throw new Error("An unknown error occurred whilst processing the image");return R.fileType=X,R}})(_t.API),function(n){var e=function(t){if(t!==void 0&&t!="")return!0};_t.API.events.push(["addPage",function(t){this.internal.getPageInfo(t.pageNumber).pageContext.annotations=[]}]),n.events.push(["putPage",function(t){for(var i,r,s,a=this.internal.getCoordinateString,o=this.internal.getVerticalCoordinateString,l=this.internal.getPageInfoByObjId(t.objId),u=t.pageContext.annotations,h=!1,p=0;p<u.length&&!h;p++)switch((i=u[p]).type){case"link":(e(i.options.url)||e(i.options.pageNumber))&&(h=!0);break;case"reference":case"text":case"freetext":h=!0}if(h!=0){this.internal.write("/Annots [");for(var g=0;g<u.length;g++){i=u[g];var d=this.internal.pdfEscape,x=this.internal.getEncryptor(t.objId);switch(i.type){case"reference":this.internal.write(" "+i.object.objId+" 0 R ");break;case"text":var b=this.internal.newAdditionalObject(),_=this.internal.newAdditionalObject(),m=this.internal.getEncryptor(b.objId),S=i.title||"Note";s="<</Type /Annot /Subtype /Text "+(r="/Rect ["+a(i.bounds.x)+" "+o(i.bounds.y+i.bounds.h)+" "+a(i.bounds.x+i.bounds.w)+" "+o(i.bounds.y)+"] ")+"/Contents ("+d(m(i.contents))+")",s+=" /Popup "+_.objId+" 0 R",s+=" /P "+l.objId+" 0 R",s+=" /T ("+d(m(S))+") >>",b.content=s;var M=b.objId+" 0 R";s="<</Type /Annot /Subtype /Popup "+(r="/Rect ["+a(i.bounds.x+30)+" "+o(i.bounds.y+i.bounds.h)+" "+a(i.bounds.x+i.bounds.w+30)+" "+o(i.bounds.y)+"] ")+" /Parent "+M,i.open&&(s+=" /Open true"),s+=" >>",_.content=s,this.internal.write(b.objId,"0 R",_.objId,"0 R");break;case"freetext":r="/Rect ["+a(i.bounds.x)+" "+o(i.bounds.y)+" "+a(i.bounds.x+i.bounds.w)+" "+o(i.bounds.y+i.bounds.h)+"] ";var P=i.color||"#000000";s="<</Type /Annot /Subtype /FreeText "+r+"/Contents ("+d(x(i.contents))+")",s+=" /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#"+P+")",s+=" /Border [0 0 0]",s+=" >>",this.internal.write(s);break;case"link":if(i.options.name){var q=this.annotations._nameMap[i.options.name];i.options.pageNumber=q.page,i.options.top=q.y}else i.options.top||(i.options.top=0);if(r="/Rect ["+i.finalBounds.x+" "+i.finalBounds.y+" "+i.finalBounds.w+" "+i.finalBounds.h+"] ",s="",i.options.url)s="<</Type /Annot /Subtype /Link "+r+"/Border [0 0 0] /A <</S /URI /URI ("+d(x(i.options.url))+") >>";else if(i.options.pageNumber)switch(s="<</Type /Annot /Subtype /Link "+r+"/Border [0 0 0] /Dest ["+this.internal.getPageInfo(i.options.pageNumber).objId+" 0 R",i.options.magFactor=i.options.magFactor||"XYZ",i.options.magFactor){case"Fit":s+=" /Fit]";break;case"FitH":s+=" /FitH "+i.options.top+"]";break;case"FitV":i.options.left=i.options.left||0,s+=" /FitV "+i.options.left+"]";break;case"XYZ":default:var G=o(i.options.top);i.options.left=i.options.left||0,i.options.zoom===void 0&&(i.options.zoom=0),s+=" /XYZ "+i.options.left+" "+G+" "+i.options.zoom+"]"}s!=""&&(s+=" >>",this.internal.write(s))}}this.internal.write("]")}}]),n.createAnnotation=function(t){var i=this.internal.getCurrentPageInfo();switch(t.type){case"link":this.link(t.bounds.x,t.bounds.y,t.bounds.w,t.bounds.h,t);break;case"text":case"freetext":i.pageContext.annotations.push(t)}},n.link=function(t,i,r,s,a){var o=this.internal.getCurrentPageInfo(),l=this.internal.getCoordinateString,u=this.internal.getVerticalCoordinateString;o.pageContext.annotations.push({finalBounds:{x:l(t),y:u(i),w:l(t+r),h:u(i+s)},options:a,type:"link"})},n.textWithLink=function(t,i,r,s){var a,o,l=this.getTextWidth(t),u=this.internal.getLineHeight()/this.internal.scaleFactor;if(s.maxWidth!==void 0){o=s.maxWidth;var h=this.splitTextToSize(t,o).length;a=Math.ceil(u*h)}else o=l,a=u;return this.text(t,i,r,s),r+=.2*u,s.align==="center"&&(i-=l/2),s.align==="right"&&(i-=l),this.link(i,r-u,o,a,s),l},n.getTextWidth=function(t){var i=this.internal.getFontSize();return this.getStringUnitWidth(t)*i/this.internal.scaleFactor}}(_t.API),function(n){var e={1569:[65152],1570:[65153,65154],1571:[65155,65156],1572:[65157,65158],1573:[65159,65160],1574:[65161,65162,65163,65164],1575:[65165,65166],1576:[65167,65168,65169,65170],1577:[65171,65172],1578:[65173,65174,65175,65176],1579:[65177,65178,65179,65180],1580:[65181,65182,65183,65184],1581:[65185,65186,65187,65188],1582:[65189,65190,65191,65192],1583:[65193,65194],1584:[65195,65196],1585:[65197,65198],1586:[65199,65200],1587:[65201,65202,65203,65204],1588:[65205,65206,65207,65208],1589:[65209,65210,65211,65212],1590:[65213,65214,65215,65216],1591:[65217,65218,65219,65220],1592:[65221,65222,65223,65224],1593:[65225,65226,65227,65228],1594:[65229,65230,65231,65232],1601:[65233,65234,65235,65236],1602:[65237,65238,65239,65240],1603:[65241,65242,65243,65244],1604:[65245,65246,65247,65248],1605:[65249,65250,65251,65252],1606:[65253,65254,65255,65256],1607:[65257,65258,65259,65260],1608:[65261,65262],1609:[65263,65264,64488,64489],1610:[65265,65266,65267,65268],1649:[64336,64337],1655:[64477],1657:[64358,64359,64360,64361],1658:[64350,64351,64352,64353],1659:[64338,64339,64340,64341],1662:[64342,64343,64344,64345],1663:[64354,64355,64356,64357],1664:[64346,64347,64348,64349],1667:[64374,64375,64376,64377],1668:[64370,64371,64372,64373],1670:[64378,64379,64380,64381],1671:[64382,64383,64384,64385],1672:[64392,64393],1676:[64388,64389],1677:[64386,64387],1678:[64390,64391],1681:[64396,64397],1688:[64394,64395],1700:[64362,64363,64364,64365],1702:[64366,64367,64368,64369],1705:[64398,64399,64400,64401],1709:[64467,64468,64469,64470],1711:[64402,64403,64404,64405],1713:[64410,64411,64412,64413],1715:[64406,64407,64408,64409],1722:[64414,64415],1723:[64416,64417,64418,64419],1726:[64426,64427,64428,64429],1728:[64420,64421],1729:[64422,64423,64424,64425],1733:[64480,64481],1734:[64473,64474],1735:[64471,64472],1736:[64475,64476],1737:[64482,64483],1739:[64478,64479],1740:[64508,64509,64510,64511],1744:[64484,64485,64486,64487],1746:[64430,64431],1747:[64432,64433]},t={65247:{65154:65269,65156:65271,65160:65273,65166:65275},65248:{65154:65270,65156:65272,65160:65274,65166:65276},65165:{65247:{65248:{65258:65010}}},1617:{1612:64606,1613:64607,1614:64608,1615:64609,1616:64610}},i={1612:64606,1613:64607,1614:64608,1615:64609,1616:64610},r=[1570,1571,1573,1575];n.__arabicParser__={};var s=n.__arabicParser__.isInArabicSubstitutionA=function(b){return e[b.charCodeAt(0)]!==void 0},a=n.__arabicParser__.isArabicLetter=function(b){return typeof b=="string"&&/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(b)},o=n.__arabicParser__.isArabicEndLetter=function(b){return a(b)&&s(b)&&e[b.charCodeAt(0)].length<=2},l=n.__arabicParser__.isArabicAlfLetter=function(b){return a(b)&&r.indexOf(b.charCodeAt(0))>=0};n.__arabicParser__.arabicLetterHasIsolatedForm=function(b){return a(b)&&s(b)&&e[b.charCodeAt(0)].length>=1};var u=n.__arabicParser__.arabicLetterHasFinalForm=function(b){return a(b)&&s(b)&&e[b.charCodeAt(0)].length>=2};n.__arabicParser__.arabicLetterHasInitialForm=function(b){return a(b)&&s(b)&&e[b.charCodeAt(0)].length>=3};var h=n.__arabicParser__.arabicLetterHasMedialForm=function(b){return a(b)&&s(b)&&e[b.charCodeAt(0)].length==4},p=n.__arabicParser__.resolveLigatures=function(b){var _=0,m=t,S="",M=0;for(_=0;_<b.length;_+=1)m[b.charCodeAt(_)]!==void 0?(M++,typeof(m=m[b.charCodeAt(_)])=="number"&&(S+=String.fromCharCode(m),m=t,M=0),_===b.length-1&&(m=t,S+=b.charAt(_-(M-1)),_-=M-1,M=0)):(m=t,S+=b.charAt(_-M),_-=M,M=0);return S};n.__arabicParser__.isArabicDiacritic=function(b){return b!==void 0&&i[b.charCodeAt(0)]!==void 0};var g=n.__arabicParser__.getCorrectForm=function(b,_,m){return a(b)?s(b)===!1?-1:!u(b)||!a(_)&&!a(m)||!a(m)&&o(_)||o(b)&&!a(_)||o(b)&&l(_)||o(b)&&o(_)?0:h(b)&&a(_)&&!o(_)&&a(m)&&u(m)?3:o(b)||!a(m)?1:2:-1},d=function(b){var _=0,m=0,S=0,M="",P="",q="",G=(b=b||"").split("\\s+"),U=[];for(_=0;_<G.length;_+=1){for(U.push(""),m=0;m<G[_].length;m+=1)M=G[_][m],P=G[_][m-1],q=G[_][m+1],a(M)?(S=g(M,P,q),U[_]+=S!==-1?String.fromCharCode(e[M.charCodeAt(0)][S]):M):U[_]+=M;U[_]=p(U[_])}return U.join(" ")},x=n.__arabicParser__.processArabic=n.processArabic=function(){var b,_=typeof arguments[0]=="string"?arguments[0]:arguments[0].text,m=[];if(Array.isArray(_)){var S=0;for(m=[],S=0;S<_.length;S+=1)Array.isArray(_[S])?m.push([d(_[S][0]),_[S][1],_[S][2]]):m.push([d(_[S])]);b=m}else b=d(_);return typeof arguments[0]=="string"?b:(arguments[0].text=b,arguments[0])};n.events.push(["preProcessText",x])}(_t.API),_t.API.autoPrint=function(n){var e;switch((n=n||{}).variant=n.variant||"non-conform",n.variant){case"javascript":this.addJS("print({});");break;case"non-conform":default:this.internal.events.subscribe("postPutResources",function(){e=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/S /Named"),this.internal.out("/Type /Action"),this.internal.out("/N /Print"),this.internal.out(">>"),this.internal.out("endobj")}),this.internal.events.subscribe("putCatalog",function(){this.internal.out("/OpenAction "+e+" 0 R")})}return this},function(n){var e=function(){var t=void 0;Object.defineProperty(this,"pdf",{get:function(){return t},set:function(o){t=o}});var i=150;Object.defineProperty(this,"width",{get:function(){return i},set:function(o){i=isNaN(o)||Number.isInteger(o)===!1||o<0?150:o,this.getContext("2d").pageWrapXEnabled&&(this.getContext("2d").pageWrapX=i+1)}});var r=300;Object.defineProperty(this,"height",{get:function(){return r},set:function(o){r=isNaN(o)||Number.isInteger(o)===!1||o<0?300:o,this.getContext("2d").pageWrapYEnabled&&(this.getContext("2d").pageWrapY=r+1)}});var s=[];Object.defineProperty(this,"childNodes",{get:function(){return s},set:function(o){s=o}});var a={};Object.defineProperty(this,"style",{get:function(){return a},set:function(o){a=o}}),Object.defineProperty(this,"parentNode",{})};e.prototype.getContext=function(t,i){var r;if((t=t||"2d")!=="2d")return null;for(r in i)this.pdf.context2d.hasOwnProperty(r)&&(this.pdf.context2d[r]=i[r]);return this.pdf.context2d._canvas=this,this.pdf.context2d},e.prototype.toDataURL=function(){throw new Error("toDataURL is not implemented.")},n.events.push(["initialized",function(){this.canvas=new e,this.canvas.pdf=this}])}(_t.API),function(n){var e={left:0,top:0,bottom:0,right:0},t=!1,i=function(){this.internal.__cell__===void 0&&(this.internal.__cell__={},this.internal.__cell__.padding=3,this.internal.__cell__.headerFunction=void 0,this.internal.__cell__.margins=Object.assign({},e),this.internal.__cell__.margins.width=this.getPageWidth(),r.call(this))},r=function(){this.internal.__cell__.lastCell=new s,this.internal.__cell__.pages=1},s=function(){var l=arguments[0];Object.defineProperty(this,"x",{enumerable:!0,get:function(){return l},set:function(b){l=b}});var u=arguments[1];Object.defineProperty(this,"y",{enumerable:!0,get:function(){return u},set:function(b){u=b}});var h=arguments[2];Object.defineProperty(this,"width",{enumerable:!0,get:function(){return h},set:function(b){h=b}});var p=arguments[3];Object.defineProperty(this,"height",{enumerable:!0,get:function(){return p},set:function(b){p=b}});var g=arguments[4];Object.defineProperty(this,"text",{enumerable:!0,get:function(){return g},set:function(b){g=b}});var d=arguments[5];Object.defineProperty(this,"lineNumber",{enumerable:!0,get:function(){return d},set:function(b){d=b}});var x=arguments[6];return Object.defineProperty(this,"align",{enumerable:!0,get:function(){return x},set:function(b){x=b}}),this};s.prototype.clone=function(){return new s(this.x,this.y,this.width,this.height,this.text,this.lineNumber,this.align)},s.prototype.toArray=function(){return[this.x,this.y,this.width,this.height,this.text,this.lineNumber,this.align]},n.setHeaderFunction=function(l){return i.call(this),this.internal.__cell__.headerFunction=typeof l=="function"?l:void 0,this},n.getTextDimensions=function(l,u){i.call(this);var h=(u=u||{}).fontSize||this.getFontSize(),p=u.font||this.getFont(),g=u.scaleFactor||this.internal.scaleFactor,d=0,x=0,b=0,_=this;if(!Array.isArray(l)&&typeof l!="string"){if(typeof l!="number")throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");l=String(l)}var m=u.maxWidth;m>0?typeof l=="string"?l=this.splitTextToSize(l,m):Object.prototype.toString.call(l)==="[object Array]"&&(l=l.reduce(function(M,P){return M.concat(_.splitTextToSize(P,m))},[])):l=Array.isArray(l)?l:[l];for(var S=0;S<l.length;S++)d<(b=this.getStringUnitWidth(l[S],{font:p})*h)&&(d=b);return d!==0&&(x=l.length),{w:d/=g,h:Math.max((x*h*this.getLineHeightFactor()-h*(this.getLineHeightFactor()-1))/g,0)}},n.cellAddPage=function(){i.call(this),this.addPage();var l=this.internal.__cell__.margins||e;return this.internal.__cell__.lastCell=new s(l.left,l.top,void 0,void 0),this.internal.__cell__.pages+=1,this};var a=n.cell=function(){var l;l=arguments[0]instanceof s?arguments[0]:new s(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]),i.call(this);var u=this.internal.__cell__.lastCell,h=this.internal.__cell__.padding,p=this.internal.__cell__.margins||e,g=this.internal.__cell__.tableHeaderRow,d=this.internal.__cell__.printHeaders;return u.lineNumber!==void 0&&(u.lineNumber===l.lineNumber?(l.x=(u.x||0)+(u.width||0),l.y=u.y||0):u.y+u.height+l.height+p.bottom>this.getPageHeight()?(this.cellAddPage(),l.y=p.top,d&&g&&(this.printHeaderRow(l.lineNumber,!0),l.y+=g[0].height)):l.y=u.y+u.height||l.y),l.text[0]!==void 0&&(this.rect(l.x,l.y,l.width,l.height,t===!0?"FD":void 0),l.align==="right"?this.text(l.text,l.x+l.width-h,l.y+h,{align:"right",baseline:"top"}):l.align==="center"?this.text(l.text,l.x+l.width/2,l.y+h,{align:"center",baseline:"top",maxWidth:l.width-h-h}):this.text(l.text,l.x+h,l.y+h,{align:"left",baseline:"top",maxWidth:l.width-h-h})),this.internal.__cell__.lastCell=l,this};n.table=function(l,u,h,p,g){if(i.call(this),!h)throw new Error("No data for PDF table.");var d,x,b,_,m=[],S=[],M=[],P={},q={},G=[],U=[],H=(g=g||{}).autoSize||!1,A=g.printHeaders!==!1,D=g.css&&g.css["font-size"]!==void 0?16*g.css["font-size"]:g.fontSize||12,E=g.margins||Object.assign({width:this.getPageWidth()},e),R=typeof g.padding=="number"?g.padding:3,X=g.headerBackgroundColor||"#c8c8c8",N=g.headerTextColor||"#000";if(r.call(this),this.internal.__cell__.printHeaders=A,this.internal.__cell__.margins=E,this.internal.__cell__.table_font_size=D,this.internal.__cell__.padding=R,this.internal.__cell__.headerBackgroundColor=X,this.internal.__cell__.headerTextColor=N,this.setFontSize(D),p==null)S=m=Object.keys(h[0]),M=m.map(function(){return"left"});else if(Array.isArray(p)&&Xt(p[0])==="object")for(m=p.map(function(ae){return ae.name}),S=p.map(function(ae){return ae.prompt||ae.name||""}),M=p.map(function(ae){return ae.align||"left"}),d=0;d<p.length;d+=1)q[p[d].name]=p[d].width*(19.049976/25.4);else Array.isArray(p)&&typeof p[0]=="string"&&(S=m=p,M=m.map(function(){return"left"}));if(H||Array.isArray(p)&&typeof p[0]=="string")for(d=0;d<m.length;d+=1){for(P[_=m[d]]=h.map(function(ae){return ae[_]}),this.setFont(void 0,"bold"),G.push(this.getTextDimensions(S[d],{fontSize:this.internal.__cell__.table_font_size,scaleFactor:this.internal.scaleFactor}).w),x=P[_],this.setFont(void 0,"normal"),b=0;b<x.length;b+=1)G.push(this.getTextDimensions(x[b],{fontSize:this.internal.__cell__.table_font_size,scaleFactor:this.internal.scaleFactor}).w);q[_]=Math.max.apply(null,G)+R+R,G=[]}if(A){var J={};for(d=0;d<m.length;d+=1)J[m[d]]={},J[m[d]].text=S[d],J[m[d]].align=M[d];var Q=o.call(this,J,q);U=m.map(function(ae){return new s(l,u,q[ae],Q,J[ae].text,void 0,J[ae].align)}),this.setTableHeaderRow(U),this.printHeaderRow(1,!1)}var ie=p.reduce(function(ae,xe){return ae[xe.name]=xe.align,ae},{});for(d=0;d<h.length;d+=1){"rowStart"in g&&g.rowStart instanceof Function&&g.rowStart({row:d,data:h[d]},this);var ee=o.call(this,h[d],q);for(b=0;b<m.length;b+=1){var te=h[d][m[b]];"cellStart"in g&&g.cellStart instanceof Function&&g.cellStart({row:d,col:b,data:te},this),a.call(this,new s(l,u,q[m[b]],ee,te,d+2,ie[m[b]]))}}return this.internal.__cell__.table_x=l,this.internal.__cell__.table_y=u,this};var o=function(l,u){var h=this.internal.__cell__.padding,p=this.internal.__cell__.table_font_size,g=this.internal.scaleFactor;return Object.keys(l).map(function(d){var x=l[d];return this.splitTextToSize(x.hasOwnProperty("text")?x.text:x,u[d]-h-h)},this).map(function(d){return this.getLineHeightFactor()*d.length*p/g+h+h},this).reduce(function(d,x){return Math.max(d,x)},0)};n.setTableHeaderRow=function(l){i.call(this),this.internal.__cell__.tableHeaderRow=l},n.printHeaderRow=function(l,u){if(i.call(this),!this.internal.__cell__.tableHeaderRow)throw new Error("Property tableHeaderRow does not exist.");var h;if(t=!0,typeof this.internal.__cell__.headerFunction=="function"){var p=this.internal.__cell__.headerFunction(this,this.internal.__cell__.pages);this.internal.__cell__.lastCell=new s(p[0],p[1],p[2],p[3],void 0,-1)}this.setFont(void 0,"bold");for(var g=[],d=0;d<this.internal.__cell__.tableHeaderRow.length;d+=1){h=this.internal.__cell__.tableHeaderRow[d].clone(),u&&(h.y=this.internal.__cell__.margins.top||0,g.push(h)),h.lineNumber=l;var x=this.getTextColor();this.setTextColor(this.internal.__cell__.headerTextColor),this.setFillColor(this.internal.__cell__.headerBackgroundColor),a.call(this,h),this.setTextColor(x)}g.length>0&&this.setTableHeaderRow(g),this.setFont(void 0,"normal"),t=!1}}(_t.API);var t0={italic:["italic","oblique","normal"],oblique:["oblique","italic","normal"],normal:["normal","oblique","italic"]},n0=["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded"],Vh=e0(n0),i0=[100,200,300,400,500,600,700,800,900],xb=e0(i0);function qh(n){var e=n.family.replace(/"|'/g,"").toLowerCase(),t=function(s){return t0[s=s||"normal"]?s:"normal"}(n.style),i=function(s){if(!s)return 400;if(typeof s=="number")return s>=100&&s<=900&&s%100==0?s:400;if(/^\d00$/.test(s))return parseInt(s);switch(s){case"bold":return 700;case"normal":default:return 400}}(n.weight),r=function(s){return typeof Vh[s=s||"normal"]=="number"?s:"normal"}(n.stretch);return{family:e,style:t,weight:i,stretch:r,src:n.src||[],ref:n.ref||{name:e,style:[r,t,i].join(" ")}}}function kp(n,e,t,i){var r;for(r=t;r>=0&&r<e.length;r+=i)if(n[e[r]])return n[e[r]];for(r=t;r>=0&&r<e.length;r-=i)if(n[e[r]])return n[e[r]]}var Sb={"sans-serif":"helvetica",fixed:"courier",monospace:"courier",terminal:"courier",cursive:"times",fantasy:"times",serif:"times"},Bp={caption:"times",icon:"times",menu:"times","message-box":"times","small-caption":"times","status-bar":"times"};function zp(n){return[n.stretch,n.style,n.weight,n.family].join(" ")}function wb(n,e,t){for(var i=(t=t||{}).defaultFontFamily||"times",r=Object.assign({},Sb,t.genericFontFamilies||{}),s=null,a=null,o=0;o<e.length;++o)if(r[(s=qh(e[o])).family]&&(s.family=r[s.family]),n.hasOwnProperty(s.family)){a=n[s.family];break}if(!(a=a||n[i]))throw new Error("Could not find a font-family for the rule '"+zp(s)+"' and default family '"+i+"'.");if(a=function(l,u){if(u[l])return u[l];var h=Vh[l],p=h<=Vh.normal?-1:1,g=kp(u,n0,h,p);if(!g)throw new Error("Could not find a matching font-stretch value for "+l);return g}(s.stretch,a),a=function(l,u){if(u[l])return u[l];for(var h=t0[l],p=0;p<h.length;++p)if(u[h[p]])return u[h[p]];throw new Error("Could not find a matching font-style for "+l)}(s.style,a),!(a=function(l,u){if(u[l])return u[l];if(l===400&&u[500])return u[500];if(l===500&&u[400])return u[400];var h=xb[l],p=kp(u,i0,h,l<400?-1:1);if(!p)throw new Error("Could not find a matching font-weight for value "+l);return p}(s.weight,a)))throw new Error("Failed to resolve a font for the rule '"+zp(s)+"'.");return a}function Gp(n){return n.trimLeft()}function Mb(n,e){for(var t=0;t<n.length;){if(n.charAt(t)===e)return[n.substring(0,t),n.substring(t+1)];t+=1}return null}function Ab(n){var e=n.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);return e===null?null:[e[0],n.substring(e[0].length)]}var mc,Hp,Vp,ph=["times"];(function(n){var e,t,i,r,s,a,o,l,u,h=function(T){return T=T||{},this.isStrokeTransparent=T.isStrokeTransparent||!1,this.strokeOpacity=T.strokeOpacity||1,this.strokeStyle=T.strokeStyle||"#000000",this.fillStyle=T.fillStyle||"#000000",this.isFillTransparent=T.isFillTransparent||!1,this.fillOpacity=T.fillOpacity||1,this.font=T.font||"10px sans-serif",this.textBaseline=T.textBaseline||"alphabetic",this.textAlign=T.textAlign||"left",this.lineWidth=T.lineWidth||1,this.lineJoin=T.lineJoin||"miter",this.lineCap=T.lineCap||"butt",this.path=T.path||[],this.transform=T.transform!==void 0?T.transform.clone():new l,this.globalCompositeOperation=T.globalCompositeOperation||"normal",this.globalAlpha=T.globalAlpha||1,this.clip_path=T.clip_path||[],this.currentPoint=T.currentPoint||new a,this.miterLimit=T.miterLimit||10,this.lastPoint=T.lastPoint||new a,this.lineDashOffset=T.lineDashOffset||0,this.lineDash=T.lineDash||[],this.margin=T.margin||[0,0,0,0],this.prevPageLastElemOffset=T.prevPageLastElemOffset||0,this.ignoreClearRect=typeof T.ignoreClearRect!="boolean"||T.ignoreClearRect,this};n.events.push(["initialized",function(){this.context2d=new p(this),e=this.internal.f2,t=this.internal.getCoordinateString,i=this.internal.getVerticalCoordinateString,r=this.internal.getHorizontalCoordinate,s=this.internal.getVerticalCoordinate,a=this.internal.Point,o=this.internal.Rectangle,l=this.internal.Matrix,u=new h}]);var p=function(T){Object.defineProperty(this,"canvas",{get:function(){return{parentNode:!1,style:!1}}});var F=T;Object.defineProperty(this,"pdf",{get:function(){return F}});var V=!1;Object.defineProperty(this,"pageWrapXEnabled",{get:function(){return V},set:function(_e){V=!!_e}});var K=!1;Object.defineProperty(this,"pageWrapYEnabled",{get:function(){return K},set:function(_e){K=!!_e}});var ne=0;Object.defineProperty(this,"posX",{get:function(){return ne},set:function(_e){isNaN(_e)||(ne=_e)}});var ce=0;Object.defineProperty(this,"posY",{get:function(){return ce},set:function(_e){isNaN(_e)||(ce=_e)}}),Object.defineProperty(this,"margin",{get:function(){return u.margin},set:function(_e){var Y;typeof _e=="number"?Y=[_e,_e,_e,_e]:((Y=new Array(4))[0]=_e[0],Y[1]=_e.length>=2?_e[1]:Y[0],Y[2]=_e.length>=3?_e[2]:Y[0],Y[3]=_e.length>=4?_e[3]:Y[1]),u.margin=Y}});var fe=!1;Object.defineProperty(this,"autoPaging",{get:function(){return fe},set:function(_e){fe=_e}});var pe=0;Object.defineProperty(this,"lastBreak",{get:function(){return pe},set:function(_e){pe=_e}});var Ce=[];Object.defineProperty(this,"pageBreaks",{get:function(){return Ce},set:function(_e){Ce=_e}}),Object.defineProperty(this,"ctx",{get:function(){return u},set:function(_e){_e instanceof h&&(u=_e)}}),Object.defineProperty(this,"path",{get:function(){return u.path},set:function(_e){u.path=_e}});var Ie=[];Object.defineProperty(this,"ctxStack",{get:function(){return Ie},set:function(_e){Ie=_e}}),Object.defineProperty(this,"fillStyle",{get:function(){return this.ctx.fillStyle},set:function(_e){var Y;Y=g(_e),this.ctx.fillStyle=Y.style,this.ctx.isFillTransparent=Y.a===0,this.ctx.fillOpacity=Y.a,this.pdf.setFillColor(Y.r,Y.g,Y.b,{a:Y.a}),this.pdf.setTextColor(Y.r,Y.g,Y.b,{a:Y.a})}}),Object.defineProperty(this,"strokeStyle",{get:function(){return this.ctx.strokeStyle},set:function(_e){var Y=g(_e);this.ctx.strokeStyle=Y.style,this.ctx.isStrokeTransparent=Y.a===0,this.ctx.strokeOpacity=Y.a,Y.a===0?this.pdf.setDrawColor(255,255,255):(Y.a,this.pdf.setDrawColor(Y.r,Y.g,Y.b))}}),Object.defineProperty(this,"lineCap",{get:function(){return this.ctx.lineCap},set:function(_e){["butt","round","square"].indexOf(_e)!==-1&&(this.ctx.lineCap=_e,this.pdf.setLineCap(_e))}}),Object.defineProperty(this,"lineWidth",{get:function(){return this.ctx.lineWidth},set:function(_e){isNaN(_e)||(this.ctx.lineWidth=_e,this.pdf.setLineWidth(_e))}}),Object.defineProperty(this,"lineJoin",{get:function(){return this.ctx.lineJoin},set:function(_e){["bevel","round","miter"].indexOf(_e)!==-1&&(this.ctx.lineJoin=_e,this.pdf.setLineJoin(_e))}}),Object.defineProperty(this,"miterLimit",{get:function(){return this.ctx.miterLimit},set:function(_e){isNaN(_e)||(this.ctx.miterLimit=_e,this.pdf.setMiterLimit(_e))}}),Object.defineProperty(this,"textBaseline",{get:function(){return this.ctx.textBaseline},set:function(_e){this.ctx.textBaseline=_e}}),Object.defineProperty(this,"textAlign",{get:function(){return this.ctx.textAlign},set:function(_e){["right","end","center","left","start"].indexOf(_e)!==-1&&(this.ctx.textAlign=_e)}});var re=null;function Xe(_e,Y){if(re===null){var lt=function(He){var B=[];return Object.keys(He).forEach(function(I){He[I].forEach(function(se){var ye=null;switch(se){case"bold":ye={family:I,weight:"bold"};break;case"italic":ye={family:I,style:"italic"};break;case"bolditalic":ye={family:I,weight:"bold",style:"italic"};break;case"":case"normal":ye={family:I}}ye!==null&&(ye.ref={name:I,style:se},B.push(ye))})}),B}(_e.getFontList());re=function(He){for(var B={},I=0;I<He.length;++I){var se=qh(He[I]),ye=se.family,Me=se.stretch,Re=se.style,qe=se.weight;B[ye]=B[ye]||{},B[ye][Me]=B[ye][Me]||{},B[ye][Me][Re]=B[ye][Me][Re]||{},B[ye][Me][Re][qe]=se}return B}(lt.concat(Y))}return re}var Ve=null;Object.defineProperty(this,"fontFaces",{get:function(){return Ve},set:function(_e){re=null,Ve=_e}}),Object.defineProperty(this,"font",{get:function(){return this.ctx.font},set:function(_e){var Y;if(this.ctx.font=_e,(Y=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(_e))!==null){var lt=Y[1],He=(Y[2],Y[3]),B=Y[4],I=(Y[5],Y[6]),se=/^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(B)[2];B=Math.floor(se==="px"?parseFloat(B)*this.pdf.internal.scaleFactor:se==="em"?parseFloat(B)*this.pdf.getFontSize():parseFloat(B)*this.pdf.internal.scaleFactor),this.pdf.setFontSize(B);var ye=function(Je){var Pe,ze,pt=[],it=Je.trim();if(it==="")return ph;if(it in Bp)return[Bp[it]];for(;it!=="";){switch(ze=null,Pe=(it=Gp(it)).charAt(0)){case'"':case"'":ze=Mb(it.substring(1),Pe);break;default:ze=Ab(it)}if(ze===null||(pt.push(ze[0]),(it=Gp(ze[1]))!==""&&it.charAt(0)!==","))return ph;it=it.replace(/^,/,"")}return pt}(I);if(this.fontFaces){var Me=wb(Xe(this.pdf,this.fontFaces),ye.map(function(Je){return{family:Je,stretch:"normal",weight:He,style:lt}}));this.pdf.setFont(Me.ref.name,Me.ref.style)}else{var Re="";(He==="bold"||parseInt(He,10)>=700||lt==="bold")&&(Re="bold"),lt==="italic"&&(Re+="italic"),Re.length===0&&(Re="normal");for(var qe="",Oe={arial:"Helvetica",Arial:"Helvetica",verdana:"Helvetica",Verdana:"Helvetica",helvetica:"Helvetica",Helvetica:"Helvetica","sans-serif":"Helvetica",fixed:"Courier",monospace:"Courier",terminal:"Courier",cursive:"Times",fantasy:"Times",serif:"Times"},je=0;je<ye.length;je++){if(this.pdf.internal.getFont(ye[je],Re,{noFallback:!0,disableWarning:!0})!==void 0){qe=ye[je];break}if(Re==="bolditalic"&&this.pdf.internal.getFont(ye[je],"bold",{noFallback:!0,disableWarning:!0})!==void 0)qe=ye[je],Re="bold";else if(this.pdf.internal.getFont(ye[je],"normal",{noFallback:!0,disableWarning:!0})!==void 0){qe=ye[je],Re="normal";break}}if(qe===""){for(var nt=0;nt<ye.length;nt++)if(Oe[ye[nt]]){qe=Oe[ye[nt]];break}}qe=qe===""?"Times":qe,this.pdf.setFont(qe,Re)}}}}),Object.defineProperty(this,"globalCompositeOperation",{get:function(){return this.ctx.globalCompositeOperation},set:function(_e){this.ctx.globalCompositeOperation=_e}}),Object.defineProperty(this,"globalAlpha",{get:function(){return this.ctx.globalAlpha},set:function(_e){this.ctx.globalAlpha=_e}}),Object.defineProperty(this,"lineDashOffset",{get:function(){return this.ctx.lineDashOffset},set:function(_e){this.ctx.lineDashOffset=_e,xe.call(this)}}),Object.defineProperty(this,"lineDash",{get:function(){return this.ctx.lineDash},set:function(_e){this.ctx.lineDash=_e,xe.call(this)}}),Object.defineProperty(this,"ignoreClearRect",{get:function(){return this.ctx.ignoreClearRect},set:function(_e){this.ctx.ignoreClearRect=!!_e}})};p.prototype.setLineDash=function(T){this.lineDash=T},p.prototype.getLineDash=function(){return this.lineDash.length%2?this.lineDash.concat(this.lineDash):this.lineDash.slice()},p.prototype.fill=function(){P.call(this,"fill",!1)},p.prototype.stroke=function(){P.call(this,"stroke",!1)},p.prototype.beginPath=function(){this.path=[{type:"begin"}]},p.prototype.moveTo=function(T,F){if(isNaN(T)||isNaN(F))throw en.error("jsPDF.context2d.moveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.moveTo");var V=this.ctx.transform.applyToPoint(new a(T,F));this.path.push({type:"mt",x:V.x,y:V.y}),this.ctx.lastPoint=new a(T,F)},p.prototype.closePath=function(){var T=new a(0,0),F=0;for(F=this.path.length-1;F!==-1;F--)if(this.path[F].type==="begin"&&Xt(this.path[F+1])==="object"&&typeof this.path[F+1].x=="number"){T=new a(this.path[F+1].x,this.path[F+1].y);break}this.path.push({type:"close"}),this.ctx.lastPoint=new a(T.x,T.y)},p.prototype.lineTo=function(T,F){if(isNaN(T)||isNaN(F))throw en.error("jsPDF.context2d.lineTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.lineTo");var V=this.ctx.transform.applyToPoint(new a(T,F));this.path.push({type:"lt",x:V.x,y:V.y}),this.ctx.lastPoint=new a(V.x,V.y)},p.prototype.clip=function(){this.ctx.clip_path=JSON.parse(JSON.stringify(this.path)),P.call(this,null,!0)},p.prototype.quadraticCurveTo=function(T,F,V,K){if(isNaN(V)||isNaN(K)||isNaN(T)||isNaN(F))throw en.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");var ne=this.ctx.transform.applyToPoint(new a(V,K)),ce=this.ctx.transform.applyToPoint(new a(T,F));this.path.push({type:"qct",x1:ce.x,y1:ce.y,x:ne.x,y:ne.y}),this.ctx.lastPoint=new a(ne.x,ne.y)},p.prototype.bezierCurveTo=function(T,F,V,K,ne,ce){if(isNaN(ne)||isNaN(ce)||isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K))throw en.error("jsPDF.context2d.bezierCurveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");var fe=this.ctx.transform.applyToPoint(new a(ne,ce)),pe=this.ctx.transform.applyToPoint(new a(T,F)),Ce=this.ctx.transform.applyToPoint(new a(V,K));this.path.push({type:"bct",x1:pe.x,y1:pe.y,x2:Ce.x,y2:Ce.y,x:fe.x,y:fe.y}),this.ctx.lastPoint=new a(fe.x,fe.y)},p.prototype.arc=function(T,F,V,K,ne,ce){if(isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K)||isNaN(ne))throw en.error("jsPDF.context2d.arc: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.arc");if(ce=!!ce,!this.ctx.transform.isIdentity){var fe=this.ctx.transform.applyToPoint(new a(T,F));T=fe.x,F=fe.y;var pe=this.ctx.transform.applyToPoint(new a(0,V)),Ce=this.ctx.transform.applyToPoint(new a(0,0));V=Math.sqrt(Math.pow(pe.x-Ce.x,2)+Math.pow(pe.y-Ce.y,2))}Math.abs(ne-K)>=2*Math.PI&&(K=0,ne=2*Math.PI),this.path.push({type:"arc",x:T,y:F,radius:V,startAngle:K,endAngle:ne,counterclockwise:ce})},p.prototype.arcTo=function(T,F,V,K,ne){throw new Error("arcTo not implemented.")},p.prototype.rect=function(T,F,V,K){if(isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K))throw en.error("jsPDF.context2d.rect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.rect");this.moveTo(T,F),this.lineTo(T+V,F),this.lineTo(T+V,F+K),this.lineTo(T,F+K),this.lineTo(T,F),this.lineTo(T+V,F),this.lineTo(T,F)},p.prototype.fillRect=function(T,F,V,K){if(isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K))throw en.error("jsPDF.context2d.fillRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.fillRect");if(!d.call(this)){var ne={};this.lineCap!=="butt"&&(ne.lineCap=this.lineCap,this.lineCap="butt"),this.lineJoin!=="miter"&&(ne.lineJoin=this.lineJoin,this.lineJoin="miter"),this.beginPath(),this.rect(T,F,V,K),this.fill(),ne.hasOwnProperty("lineCap")&&(this.lineCap=ne.lineCap),ne.hasOwnProperty("lineJoin")&&(this.lineJoin=ne.lineJoin)}},p.prototype.strokeRect=function(T,F,V,K){if(isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K))throw en.error("jsPDF.context2d.strokeRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");x.call(this)||(this.beginPath(),this.rect(T,F,V,K),this.stroke())},p.prototype.clearRect=function(T,F,V,K){if(isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K))throw en.error("jsPDF.context2d.clearRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.clearRect");this.ignoreClearRect||(this.fillStyle="#ffffff",this.fillRect(T,F,V,K))},p.prototype.save=function(T){T=typeof T!="boolean"||T;for(var F=this.pdf.internal.getCurrentPageInfo().pageNumber,V=0;V<this.pdf.internal.getNumberOfPages();V++)this.pdf.setPage(V+1),this.pdf.internal.out("q");if(this.pdf.setPage(F),T){this.ctx.fontSize=this.pdf.internal.getFontSize();var K=new h(this.ctx);this.ctxStack.push(this.ctx),this.ctx=K}},p.prototype.restore=function(T){T=typeof T!="boolean"||T;for(var F=this.pdf.internal.getCurrentPageInfo().pageNumber,V=0;V<this.pdf.internal.getNumberOfPages();V++)this.pdf.setPage(V+1),this.pdf.internal.out("Q");this.pdf.setPage(F),T&&this.ctxStack.length!==0&&(this.ctx=this.ctxStack.pop(),this.fillStyle=this.ctx.fillStyle,this.strokeStyle=this.ctx.strokeStyle,this.font=this.ctx.font,this.lineCap=this.ctx.lineCap,this.lineWidth=this.ctx.lineWidth,this.lineJoin=this.ctx.lineJoin,this.lineDash=this.ctx.lineDash,this.lineDashOffset=this.ctx.lineDashOffset)},p.prototype.toDataURL=function(){throw new Error("toDataUrl not implemented.")};var g=function(T){var F,V,K,ne;if(T.isCanvasGradient===!0&&(T=T.getColor()),!T)return{r:0,g:0,b:0,a:0,style:T};if(/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(T))F=0,V=0,K=0,ne=0;else{var ce=/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(T);if(ce!==null)F=parseInt(ce[1]),V=parseInt(ce[2]),K=parseInt(ce[3]),ne=1;else if((ce=/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(T))!==null)F=parseInt(ce[1]),V=parseInt(ce[2]),K=parseInt(ce[3]),ne=parseFloat(ce[4]);else{if(ne=1,typeof T=="string"&&T.charAt(0)!=="#"){var fe=new Ym(T);T=fe.ok?fe.toHex():"#000000"}T.length===4?(F=T.substring(1,2),F+=F,V=T.substring(2,3),V+=V,K=T.substring(3,4),K+=K):(F=T.substring(1,3),V=T.substring(3,5),K=T.substring(5,7)),F=parseInt(F,16),V=parseInt(V,16),K=parseInt(K,16)}}return{r:F,g:V,b:K,a:ne,style:T}},d=function(){return this.ctx.isFillTransparent||this.globalAlpha==0},x=function(){return!!(this.ctx.isStrokeTransparent||this.globalAlpha==0)};p.prototype.fillText=function(T,F,V,K){if(isNaN(F)||isNaN(V)||typeof T!="string")throw en.error("jsPDF.context2d.fillText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.fillText");if(K=isNaN(K)?void 0:K,!d.call(this)){var ne=ee(this.ctx.transform.rotation),ce=this.ctx.transform.scaleX;R.call(this,{text:T,x:F,y:V,scale:ce,angle:ne,align:this.textAlign,maxWidth:K})}},p.prototype.strokeText=function(T,F,V,K){if(isNaN(F)||isNaN(V)||typeof T!="string")throw en.error("jsPDF.context2d.strokeText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.strokeText");if(!x.call(this)){K=isNaN(K)?void 0:K;var ne=ee(this.ctx.transform.rotation),ce=this.ctx.transform.scaleX;R.call(this,{text:T,x:F,y:V,scale:ce,renderingMode:"stroke",angle:ne,align:this.textAlign,maxWidth:K})}},p.prototype.measureText=function(T){if(typeof T!="string")throw en.error("jsPDF.context2d.measureText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.measureText");var F=this.pdf,V=this.pdf.internal.scaleFactor,K=F.internal.getFontSize(),ne=F.getStringUnitWidth(T)*K/F.internal.scaleFactor,ce=function(fe){var pe=(fe=fe||{}).width||0;return Object.defineProperty(this,"width",{get:function(){return pe}}),this};return new ce({width:ne*=Math.round(96*V/72*1e4)/1e4})},p.prototype.scale=function(T,F){if(isNaN(T)||isNaN(F))throw en.error("jsPDF.context2d.scale: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.scale");var V=new l(T,0,0,F,0,0);this.ctx.transform=this.ctx.transform.multiply(V)},p.prototype.rotate=function(T){if(isNaN(T))throw en.error("jsPDF.context2d.rotate: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.rotate");var F=new l(Math.cos(T),Math.sin(T),-Math.sin(T),Math.cos(T),0,0);this.ctx.transform=this.ctx.transform.multiply(F)},p.prototype.translate=function(T,F){if(isNaN(T)||isNaN(F))throw en.error("jsPDF.context2d.translate: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.translate");var V=new l(1,0,0,1,T,F);this.ctx.transform=this.ctx.transform.multiply(V)},p.prototype.transform=function(T,F,V,K,ne,ce){if(isNaN(T)||isNaN(F)||isNaN(V)||isNaN(K)||isNaN(ne)||isNaN(ce))throw en.error("jsPDF.context2d.transform: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.transform");var fe=new l(T,F,V,K,ne,ce);this.ctx.transform=this.ctx.transform.multiply(fe)},p.prototype.setTransform=function(T,F,V,K,ne,ce){T=isNaN(T)?1:T,F=isNaN(F)?0:F,V=isNaN(V)?0:V,K=isNaN(K)?1:K,ne=isNaN(ne)?0:ne,ce=isNaN(ce)?0:ce,this.ctx.transform=new l(T,F,V,K,ne,ce)};var b=function(){return this.margin[0]>0||this.margin[1]>0||this.margin[2]>0||this.margin[3]>0};p.prototype.drawImage=function(T,F,V,K,ne,ce,fe,pe,Ce){var Ie=this.pdf.getImageProperties(T),re=1,Xe=1,Ve=1,_e=1;K!==void 0&&pe!==void 0&&(Ve=pe/K,_e=Ce/ne,re=Ie.width/K*pe/K,Xe=Ie.height/ne*Ce/ne),ce===void 0&&(ce=F,fe=V,F=0,V=0),K!==void 0&&pe===void 0&&(pe=K,Ce=ne),K===void 0&&pe===void 0&&(pe=Ie.width,Ce=Ie.height);for(var Y,lt=this.ctx.transform.decompose(),He=ee(lt.rotate.shx),B=new l,I=(B=(B=(B=B.multiply(lt.translate)).multiply(lt.skew)).multiply(lt.scale)).applyToRectangle(new o(ce-F*Ve,fe-V*_e,K*re,ne*Xe)),se=_.call(this,I),ye=[],Me=0;Me<se.length;Me+=1)ye.indexOf(se[Me])===-1&&ye.push(se[Me]);if(M(ye),this.autoPaging)for(var Re=ye[0],qe=ye[ye.length-1],Oe=Re;Oe<qe+1;Oe++){this.pdf.setPage(Oe);var je=this.pdf.internal.pageSize.width-this.margin[3]-this.margin[1],nt=Oe===1?this.posY+this.margin[0]:this.margin[0],Je=this.pdf.internal.pageSize.height-this.posY-this.margin[0]-this.margin[2],Pe=this.pdf.internal.pageSize.height-this.margin[0]-this.margin[2],ze=Oe===1?0:Je+(Oe-2)*Pe;if(this.ctx.clip_path.length!==0){var pt=this.path;Y=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=S(Y,this.posX+this.margin[3],-ze+nt+this.ctx.prevPageLastElemOffset),q.call(this,"fill",!0),this.path=pt}var it=JSON.parse(JSON.stringify(I));it=S([it],this.posX+this.margin[3],-ze+nt+this.ctx.prevPageLastElemOffset)[0];var ht=(Oe>Re||Oe<qe)&&b.call(this);ht&&(this.pdf.saveGraphicsState(),this.pdf.rect(this.margin[3],this.margin[0],je,Pe,null).clip().discardPath()),this.pdf.addImage(T,"JPEG",it.x,it.y,it.w,it.h,null,null,He),ht&&this.pdf.restoreGraphicsState()}else this.pdf.addImage(T,"JPEG",I.x,I.y,I.w,I.h,null,null,He)};var _=function(T,F,V){var K=[];F=F||this.pdf.internal.pageSize.width,V=V||this.pdf.internal.pageSize.height-this.margin[0]-this.margin[2];var ne=this.posY+this.ctx.prevPageLastElemOffset;switch(T.type){default:case"mt":case"lt":K.push(Math.floor((T.y+ne)/V)+1);break;case"arc":K.push(Math.floor((T.y+ne-T.radius)/V)+1),K.push(Math.floor((T.y+ne+T.radius)/V)+1);break;case"qct":var ce=te(this.ctx.lastPoint.x,this.ctx.lastPoint.y,T.x1,T.y1,T.x,T.y);K.push(Math.floor((ce.y+ne)/V)+1),K.push(Math.floor((ce.y+ce.h+ne)/V)+1);break;case"bct":var fe=ae(this.ctx.lastPoint.x,this.ctx.lastPoint.y,T.x1,T.y1,T.x2,T.y2,T.x,T.y);K.push(Math.floor((fe.y+ne)/V)+1),K.push(Math.floor((fe.y+fe.h+ne)/V)+1);break;case"rect":K.push(Math.floor((T.y+ne)/V)+1),K.push(Math.floor((T.y+T.h+ne)/V)+1)}for(var pe=0;pe<K.length;pe+=1)for(;this.pdf.internal.getNumberOfPages()<K[pe];)m.call(this);return K},m=function(){var T=this.fillStyle,F=this.strokeStyle,V=this.font,K=this.lineCap,ne=this.lineWidth,ce=this.lineJoin;this.pdf.addPage(),this.fillStyle=T,this.strokeStyle=F,this.font=V,this.lineCap=K,this.lineWidth=ne,this.lineJoin=ce},S=function(T,F,V){for(var K=0;K<T.length;K++)switch(T[K].type){case"bct":T[K].x2+=F,T[K].y2+=V;case"qct":T[K].x1+=F,T[K].y1+=V;case"mt":case"lt":case"arc":default:T[K].x+=F,T[K].y+=V}return T},M=function(T){return T.sort(function(F,V){return F-V})},P=function(T,F){for(var V,K,ne=this.fillStyle,ce=this.strokeStyle,fe=this.lineCap,pe=this.lineWidth,Ce=Math.abs(pe*this.ctx.transform.scaleX),Ie=this.lineJoin,re=JSON.parse(JSON.stringify(this.path)),Xe=JSON.parse(JSON.stringify(this.path)),Ve=[],_e=0;_e<Xe.length;_e++)if(Xe[_e].x!==void 0)for(var Y=_.call(this,Xe[_e]),lt=0;lt<Y.length;lt+=1)Ve.indexOf(Y[lt])===-1&&Ve.push(Y[lt]);for(var He=0;He<Ve.length;He++)for(;this.pdf.internal.getNumberOfPages()<Ve[He];)m.call(this);if(M(Ve),this.autoPaging)for(var B=Ve[0],I=Ve[Ve.length-1],se=B;se<I+1;se++){this.pdf.setPage(se),this.fillStyle=ne,this.strokeStyle=ce,this.lineCap=fe,this.lineWidth=Ce,this.lineJoin=Ie;var ye=this.pdf.internal.pageSize.width-this.margin[3]-this.margin[1],Me=se===1?this.posY+this.margin[0]:this.margin[0],Re=this.pdf.internal.pageSize.height-this.posY-this.margin[0]-this.margin[2],qe=this.pdf.internal.pageSize.height-this.margin[0]-this.margin[2],Oe=se===1?0:Re+(se-2)*qe;if(this.ctx.clip_path.length!==0){var je=this.path;V=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=S(V,this.posX+this.margin[3],-Oe+Me+this.ctx.prevPageLastElemOffset),q.call(this,T,!0),this.path=je}if(K=JSON.parse(JSON.stringify(re)),this.path=S(K,this.posX+this.margin[3],-Oe+Me+this.ctx.prevPageLastElemOffset),F===!1||se===0){var nt=(se>B||se<I)&&b.call(this);nt&&(this.pdf.saveGraphicsState(),this.pdf.rect(this.margin[3],this.margin[0],ye,qe,null).clip().discardPath()),q.call(this,T,F),nt&&this.pdf.restoreGraphicsState()}this.lineWidth=pe}else this.lineWidth=Ce,q.call(this,T,F),this.lineWidth=pe;this.path=re},q=function(T,F){if((T!=="stroke"||F||!x.call(this))&&(T==="stroke"||F||!d.call(this))){for(var V,K,ne=[],ce=this.path,fe=0;fe<ce.length;fe++){var pe=ce[fe];switch(pe.type){case"begin":ne.push({begin:!0});break;case"close":ne.push({close:!0});break;case"mt":ne.push({start:pe,deltas:[],abs:[]});break;case"lt":var Ce=ne.length;if(ce[fe-1]&&!isNaN(ce[fe-1].x)&&(V=[pe.x-ce[fe-1].x,pe.y-ce[fe-1].y],Ce>0)){for(;Ce>=0;Ce--)if(ne[Ce-1].close!==!0&&ne[Ce-1].begin!==!0){ne[Ce-1].deltas.push(V),ne[Ce-1].abs.push(pe);break}}break;case"bct":V=[pe.x1-ce[fe-1].x,pe.y1-ce[fe-1].y,pe.x2-ce[fe-1].x,pe.y2-ce[fe-1].y,pe.x-ce[fe-1].x,pe.y-ce[fe-1].y],ne[ne.length-1].deltas.push(V);break;case"qct":var Ie=ce[fe-1].x+2/3*(pe.x1-ce[fe-1].x),re=ce[fe-1].y+2/3*(pe.y1-ce[fe-1].y),Xe=pe.x+2/3*(pe.x1-pe.x),Ve=pe.y+2/3*(pe.y1-pe.y),_e=pe.x,Y=pe.y;V=[Ie-ce[fe-1].x,re-ce[fe-1].y,Xe-ce[fe-1].x,Ve-ce[fe-1].y,_e-ce[fe-1].x,Y-ce[fe-1].y],ne[ne.length-1].deltas.push(V);break;case"arc":ne.push({deltas:[],abs:[],arc:!0}),Array.isArray(ne[ne.length-1].abs)&&ne[ne.length-1].abs.push(pe)}}K=F?null:T==="stroke"?"stroke":"fill";for(var lt=!1,He=0;He<ne.length;He++)if(ne[He].arc)for(var B=ne[He].abs,I=0;I<B.length;I++){var se=B[I];se.type==="arc"?H.call(this,se.x,se.y,se.radius,se.startAngle,se.endAngle,se.counterclockwise,void 0,F,!lt):X.call(this,se.x,se.y),lt=!0}else if(ne[He].close===!0)this.pdf.internal.out("h"),lt=!1;else if(ne[He].begin!==!0){var ye=ne[He].start.x,Me=ne[He].start.y;N.call(this,ne[He].deltas,ye,Me),lt=!0}K&&A.call(this,K),F&&D.call(this)}},G=function(T){var F=this.pdf.internal.getFontSize()/this.pdf.internal.scaleFactor,V=F*(this.pdf.internal.getLineHeightFactor()-1);switch(this.ctx.textBaseline){case"bottom":return T-V;case"top":return T+F-V;case"hanging":return T+F-2*V;case"middle":return T+F/2-V;case"ideographic":return T;case"alphabetic":default:return T}},U=function(T){return T+this.pdf.internal.getFontSize()/this.pdf.internal.scaleFactor*(this.pdf.internal.getLineHeightFactor()-1)};p.prototype.createLinearGradient=function(){var T=function(){};return T.colorStops=[],T.addColorStop=function(F,V){this.colorStops.push([F,V])},T.getColor=function(){return this.colorStops.length===0?"#000000":this.colorStops[0][1]},T.isCanvasGradient=!0,T},p.prototype.createPattern=function(){return this.createLinearGradient()},p.prototype.createRadialGradient=function(){return this.createLinearGradient()};var H=function(T,F,V,K,ne,ce,fe,pe,Ce){for(var Ie=Q.call(this,V,K,ne,ce),re=0;re<Ie.length;re++){var Xe=Ie[re];re===0&&(Ce?E.call(this,Xe.x1+T,Xe.y1+F):X.call(this,Xe.x1+T,Xe.y1+F)),J.call(this,T,F,Xe.x2,Xe.y2,Xe.x3,Xe.y3,Xe.x4,Xe.y4)}pe?D.call(this):A.call(this,fe)},A=function(T){switch(T){case"stroke":this.pdf.internal.out("S");break;case"fill":this.pdf.internal.out("f")}},D=function(){this.pdf.clip(),this.pdf.discardPath()},E=function(T,F){this.pdf.internal.out(t(T)+" "+i(F)+" m")},R=function(T){var F;switch(T.align){case"right":case"end":F="right";break;case"center":F="center";break;case"left":case"start":default:F="left"}var V=this.pdf.getTextDimensions(T.text),K=G.call(this,T.y),ne=U.call(this,K)-V.h,ce=this.ctx.transform.applyToPoint(new a(T.x,K)),fe=this.ctx.transform.decompose(),pe=new l;pe=(pe=(pe=pe.multiply(fe.translate)).multiply(fe.skew)).multiply(fe.scale);for(var Ce,Ie,re,Xe=this.ctx.transform.applyToRectangle(new o(T.x,K,V.w,V.h)),Ve=pe.applyToRectangle(new o(T.x,ne,V.w,V.h)),_e=_.call(this,Ve),Y=[],lt=0;lt<_e.length;lt+=1)Y.indexOf(_e[lt])===-1&&Y.push(_e[lt]);if(M(Y),this.autoPaging)for(var He=Y[0],B=Y[Y.length-1],I=He;I<B+1;I++){this.pdf.setPage(I);var se=I===1?this.posY+this.margin[0]:this.margin[0],ye=this.pdf.internal.pageSize.height-this.posY-this.margin[0]-this.margin[2],Me=this.pdf.internal.pageSize.height-this.margin[2],Re=Me-this.margin[0],qe=this.pdf.internal.pageSize.width-this.margin[1],Oe=qe-this.margin[3],je=I===1?0:ye+(I-2)*Re;if(this.ctx.clip_path.length!==0){var nt=this.path;Ce=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=S(Ce,this.posX+this.margin[3],-1*je+se),q.call(this,"fill",!0),this.path=nt}var Je=S([JSON.parse(JSON.stringify(Ve))],this.posX+this.margin[3],-je+se+this.ctx.prevPageLastElemOffset)[0];T.scale>=.01&&(Ie=this.pdf.internal.getFontSize(),this.pdf.setFontSize(Ie*T.scale),re=this.lineWidth,this.lineWidth=re*T.scale);var Pe=this.autoPaging!=="text";if(Pe||Je.y+Je.h<=Me){if(Pe||Je.y>=se&&Je.x<=qe){var ze=Pe?T.text:this.pdf.splitTextToSize(T.text,T.maxWidth||qe-Je.x)[0],pt=S([JSON.parse(JSON.stringify(Xe))],this.posX+this.margin[3],-je+se+this.ctx.prevPageLastElemOffset)[0],it=Pe&&(I>He||I<B)&&b.call(this);it&&(this.pdf.saveGraphicsState(),this.pdf.rect(this.margin[3],this.margin[0],Oe,Re,null).clip().discardPath()),this.pdf.text(ze,pt.x,pt.y,{angle:T.angle,align:F,renderingMode:T.renderingMode}),it&&this.pdf.restoreGraphicsState()}}else Je.y<Me&&(this.ctx.prevPageLastElemOffset+=Me-Je.y);T.scale>=.01&&(this.pdf.setFontSize(Ie),this.lineWidth=re)}else T.scale>=.01&&(Ie=this.pdf.internal.getFontSize(),this.pdf.setFontSize(Ie*T.scale),re=this.lineWidth,this.lineWidth=re*T.scale),this.pdf.text(T.text,ce.x+this.posX,ce.y+this.posY,{angle:T.angle,align:F,renderingMode:T.renderingMode,maxWidth:T.maxWidth}),T.scale>=.01&&(this.pdf.setFontSize(Ie),this.lineWidth=re)},X=function(T,F,V,K){V=V||0,K=K||0,this.pdf.internal.out(t(T+V)+" "+i(F+K)+" l")},N=function(T,F,V){return this.pdf.lines(T,F,V,null,null)},J=function(T,F,V,K,ne,ce,fe,pe){this.pdf.internal.out([e(r(V+T)),e(s(K+F)),e(r(ne+T)),e(s(ce+F)),e(r(fe+T)),e(s(pe+F)),"c"].join(" "))},Q=function(T,F,V,K){for(var ne=2*Math.PI,ce=Math.PI/2;F>V;)F-=ne;var fe=Math.abs(V-F);fe<ne&&K&&(fe=ne-fe);for(var pe=[],Ce=K?-1:1,Ie=F;fe>1e-5;){var re=Ie+Ce*Math.min(fe,ce);pe.push(ie.call(this,T,Ie,re)),fe-=Math.abs(re-Ie),Ie=re}return pe},ie=function(T,F,V){var K=(V-F)/2,ne=T*Math.cos(K),ce=T*Math.sin(K),fe=ne,pe=-ce,Ce=fe*fe+pe*pe,Ie=Ce+fe*ne+pe*ce,re=4/3*(Math.sqrt(2*Ce*Ie)-Ie)/(fe*ce-pe*ne),Xe=fe-re*pe,Ve=pe+re*fe,_e=Xe,Y=-Ve,lt=K+F,He=Math.cos(lt),B=Math.sin(lt);return{x1:T*Math.cos(F),y1:T*Math.sin(F),x2:Xe*He-Ve*B,y2:Xe*B+Ve*He,x3:_e*He-Y*B,y3:_e*B+Y*He,x4:T*Math.cos(V),y4:T*Math.sin(V)}},ee=function(T){return 180*T/Math.PI},te=function(T,F,V,K,ne,ce){var fe=T+.5*(V-T),pe=F+.5*(K-F),Ce=ne+.5*(V-ne),Ie=ce+.5*(K-ce),re=Math.min(T,ne,fe,Ce),Xe=Math.max(T,ne,fe,Ce),Ve=Math.min(F,ce,pe,Ie),_e=Math.max(F,ce,pe,Ie);return new o(re,Ve,Xe-re,_e-Ve)},ae=function(T,F,V,K,ne,ce,fe,pe){var Ce,Ie,re,Xe,Ve,_e,Y,lt,He,B,I,se,ye,Me,Re=V-T,qe=K-F,Oe=ne-V,je=ce-K,nt=fe-ne,Je=pe-ce;for(Ie=0;Ie<41;Ie++)He=(Y=(re=T+(Ce=Ie/40)*Re)+Ce*((Ve=V+Ce*Oe)-re))+Ce*(Ve+Ce*(ne+Ce*nt-Ve)-Y),B=(lt=(Xe=F+Ce*qe)+Ce*((_e=K+Ce*je)-Xe))+Ce*(_e+Ce*(ce+Ce*Je-_e)-lt),Ie==0?(I=He,se=B,ye=He,Me=B):(I=Math.min(I,He),se=Math.min(se,B),ye=Math.max(ye,He),Me=Math.max(Me,B));return new o(Math.round(I),Math.round(se),Math.round(ye-I),Math.round(Me-se))},xe=function(){if(this.prevLineDash||this.ctx.lineDash.length||this.ctx.lineDashOffset){var T,F,V=(T=this.ctx.lineDash,F=this.ctx.lineDashOffset,JSON.stringify({lineDash:T,lineDashOffset:F}));this.prevLineDash!==V&&(this.pdf.setLineDash(this.ctx.lineDash,this.ctx.lineDashOffset),this.prevLineDash=V)}}})(_t.API),function(n){var e=function(s){var a,o,l,u,h,p,g,d,x,b;for(o=[],l=0,u=(s+=a="\0\0\0\0".slice(s.length%4||4)).length;u>l;l+=4)(h=(s.charCodeAt(l)<<24)+(s.charCodeAt(l+1)<<16)+(s.charCodeAt(l+2)<<8)+s.charCodeAt(l+3))!==0?(p=(h=((h=((h=((h=(h-(b=h%85))/85)-(x=h%85))/85)-(d=h%85))/85)-(g=h%85))/85)%85,o.push(p+33,g+33,d+33,x+33,b+33)):o.push(122);return function(_,m){for(var S=m;S>0;S--)_.pop()}(o,a.length),String.fromCharCode.apply(String,o)+"~>"},t=function(s){var a,o,l,u,h,p=String,g="length",d=255,x="charCodeAt",b="slice",_="replace";for(s[b](-2),s=s[b](0,-2)[_](/\s/g,"")[_]("z","!!!!!"),l=[],u=0,h=(s+=a="uuuuu"[b](s[g]%5||5))[g];h>u;u+=5)o=52200625*(s[x](u)-33)+614125*(s[x](u+1)-33)+7225*(s[x](u+2)-33)+85*(s[x](u+3)-33)+(s[x](u+4)-33),l.push(d&o>>24,d&o>>16,d&o>>8,d&o);return function(m,S){for(var M=S;M>0;M--)m.pop()}(l,a[g]),p.fromCharCode.apply(p,l)},i=function(s){var a=new RegExp(/^([0-9A-Fa-f]{2})+$/);if((s=s.replace(/\s/g,"")).indexOf(">")!==-1&&(s=s.substr(0,s.indexOf(">"))),s.length%2&&(s+="0"),a.test(s)===!1)return"";for(var o="",l=0;l<s.length;l+=2)o+=String.fromCharCode("0x"+(s[l]+s[l+1]));return o},r=function(s){for(var a=new Uint8Array(s.length),o=s.length;o--;)a[o]=s.charCodeAt(o);return s=(a=kh(a)).reduce(function(l,u){return l+String.fromCharCode(u)},"")};n.processDataByFilters=function(s,a){var o=0,l=s||"",u=[];for(typeof(a=a||[])=="string"&&(a=[a]),o=0;o<a.length;o+=1)switch(a[o]){case"ASCII85Decode":case"/ASCII85Decode":l=t(l),u.push("/ASCII85Encode");break;case"ASCII85Encode":case"/ASCII85Encode":l=e(l),u.push("/ASCII85Decode");break;case"ASCIIHexDecode":case"/ASCIIHexDecode":l=i(l),u.push("/ASCIIHexEncode");break;case"ASCIIHexEncode":case"/ASCIIHexEncode":l=l.split("").map(function(h){return("0"+h.charCodeAt().toString(16)).slice(-2)}).join("")+">",u.push("/ASCIIHexDecode");break;case"FlateEncode":case"/FlateEncode":l=r(l),u.push("/FlateDecode");break;default:throw new Error('The filter: "'+a[o]+'" is not implemented')}return{data:l,reverseChain:u.reverse().join(" ")}}}(_t.API),function(n){n.loadFile=function(e,t,i){return function(r,s,a){s=s!==!1,a=typeof a=="function"?a:function(){};var o=void 0;try{o=function(l,u,h){var p=new XMLHttpRequest,g=0,d=function(x){var b=x.length,_=[],m=String.fromCharCode;for(g=0;g<b;g+=1)_.push(m(255&x.charCodeAt(g)));return _.join("")};if(p.open("GET",l,!u),p.overrideMimeType("text/plain; charset=x-user-defined"),u===!1&&(p.onload=function(){p.status===200?h(d(this.responseText)):h(void 0)}),p.send(null),u&&p.status===200)return d(p.responseText)}(r,s,a)}catch{}return o}(e,t,i)},n.loadImageFile=n.loadFile}(_t.API),function(n){function e(){return(xt.html2canvas?Promise.resolve(xt.html2canvas):Ih(()=>import("./html2canvas.esm-CBrSDip1.js"),[])).catch(function(a){return Promise.reject(new Error("Could not load html2canvas: "+a))}).then(function(a){return a.default?a.default:a})}function t(){return(xt.DOMPurify?Promise.resolve(xt.DOMPurify):Ih(()=>import("./purify.es-BwoZCkIS.js"),[])).catch(function(a){return Promise.reject(new Error("Could not load dompurify: "+a))}).then(function(a){return a.default?a.default:a})}var i=function(a){var o=Xt(a);return o==="undefined"?"undefined":o==="string"||a instanceof String?"string":o==="number"||a instanceof Number?"number":o==="function"||a instanceof Function?"function":a&&a.constructor===Array?"array":a&&a.nodeType===1?"element":o==="object"?"object":"unknown"},r=function(a,o){var l=document.createElement(a);for(var u in o.className&&(l.className=o.className),o.innerHTML&&o.dompurify&&(l.innerHTML=o.dompurify.sanitize(o.innerHTML)),o.style)l.style[u]=o.style[u];return l},s=function a(o){var l=Object.assign(a.convert(Promise.resolve()),JSON.parse(JSON.stringify(a.template))),u=a.convert(Promise.resolve(),l);return u=(u=u.setProgress(1,a,1,[a])).set(o)};(s.prototype=Object.create(Promise.prototype)).constructor=s,s.convert=function(a,o){return a.__proto__=o||s.prototype,a},s.template={prop:{src:null,container:null,overlay:null,canvas:null,img:null,pdf:null,pageSize:null,callback:function(){}},progress:{val:0,state:null,n:0,stack:[]},opt:{filename:"file.pdf",margin:[0,0,0,0],enableLinks:!0,x:0,y:0,html2canvas:{},jsPDF:{},backgroundColor:"transparent"}},s.prototype.from=function(a,o){return this.then(function(){switch(o=o||function(l){switch(i(l)){case"string":return"string";case"element":return l.nodeName.toLowerCase()==="canvas"?"canvas":"element";default:return"unknown"}}(a)){case"string":return this.then(t).then(function(l){return this.set({src:r("div",{innerHTML:a,dompurify:l})})});case"element":return this.set({src:a});case"canvas":return this.set({canvas:a});case"img":return this.set({img:a});default:return this.error("Unknown source type.")}})},s.prototype.to=function(a){switch(a){case"container":return this.toContainer();case"canvas":return this.toCanvas();case"img":return this.toImg();case"pdf":return this.toPdf();default:return this.error("Invalid target.")}},s.prototype.toContainer=function(){return this.thenList([function(){return this.prop.src||this.error("Cannot duplicate - no source HTML.")},function(){return this.prop.pageSize||this.setPageSize()}]).then(function(){var a={position:"relative",display:"inline-block",width:(typeof this.opt.width!="number"||isNaN(this.opt.width)||typeof this.opt.windowWidth!="number"||isNaN(this.opt.windowWidth)?Math.max(this.prop.src.clientWidth,this.prop.src.scrollWidth,this.prop.src.offsetWidth):this.opt.windowWidth)+"px",left:0,right:0,top:0,margin:"auto",backgroundColor:this.opt.backgroundColor},o=function l(u,h){for(var p=u.nodeType===3?document.createTextNode(u.nodeValue):u.cloneNode(!1),g=u.firstChild;g;g=g.nextSibling)h!==!0&&g.nodeType===1&&g.nodeName==="SCRIPT"||p.appendChild(l(g,h));return u.nodeType===1&&(u.nodeName==="CANVAS"?(p.width=u.width,p.height=u.height,p.getContext("2d").drawImage(u,0,0)):u.nodeName!=="TEXTAREA"&&u.nodeName!=="SELECT"||(p.value=u.value),p.addEventListener("load",function(){p.scrollTop=u.scrollTop,p.scrollLeft=u.scrollLeft},!0)),p}(this.prop.src,this.opt.html2canvas.javascriptEnabled);o.tagName==="BODY"&&(a.height=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)+"px"),this.prop.overlay=r("div",{className:"html2pdf__overlay",style:{position:"fixed",overflow:"hidden",zIndex:1e3,left:"-100000px",right:0,bottom:0,top:0}}),this.prop.container=r("div",{className:"html2pdf__container",style:a}),this.prop.container.appendChild(o),this.prop.container.firstChild.appendChild(r("div",{style:{clear:"both",border:"0 none transparent",margin:0,padding:0,height:0}})),this.prop.container.style.float="none",this.prop.overlay.appendChild(this.prop.container),document.body.appendChild(this.prop.overlay),this.prop.container.firstChild.style.position="relative",this.prop.container.height=Math.max(this.prop.container.firstChild.clientHeight,this.prop.container.firstChild.scrollHeight,this.prop.container.firstChild.offsetHeight)+"px"})},s.prototype.toCanvas=function(){var a=[function(){return document.body.contains(this.prop.container)||this.toContainer()}];return this.thenList(a).then(e).then(function(o){var l=Object.assign({},this.opt.html2canvas);return delete l.onrendered,o(this.prop.container,l)}).then(function(o){(this.opt.html2canvas.onrendered||function(){})(o),this.prop.canvas=o,document.body.removeChild(this.prop.overlay)})},s.prototype.toContext2d=function(){var a=[function(){return document.body.contains(this.prop.container)||this.toContainer()}];return this.thenList(a).then(e).then(function(o){var l=this.opt.jsPDF,u=this.opt.fontFaces,h=typeof this.opt.width!="number"||isNaN(this.opt.width)||typeof this.opt.windowWidth!="number"||isNaN(this.opt.windowWidth)?1:this.opt.width/this.opt.windowWidth,p=Object.assign({async:!0,allowTaint:!0,scale:h,scrollX:this.opt.scrollX||0,scrollY:this.opt.scrollY||0,backgroundColor:"#ffffff",imageTimeout:15e3,logging:!0,proxy:null,removeContainer:!0,foreignObjectRendering:!1,useCORS:!1},this.opt.html2canvas);if(delete p.onrendered,l.context2d.autoPaging=this.opt.autoPaging===void 0||this.opt.autoPaging,l.context2d.posX=this.opt.x,l.context2d.posY=this.opt.y,l.context2d.margin=this.opt.margin,l.context2d.fontFaces=u,u)for(var g=0;g<u.length;++g){var d=u[g],x=d.src.find(function(b){return b.format==="truetype"});x&&l.addFont(x.url,d.ref.name,d.ref.style)}return p.windowHeight=p.windowHeight||0,p.windowHeight=p.windowHeight==0?Math.max(this.prop.container.clientHeight,this.prop.container.scrollHeight,this.prop.container.offsetHeight):p.windowHeight,l.context2d.save(!0),o(this.prop.container,p)}).then(function(o){this.opt.jsPDF.context2d.restore(!0),(this.opt.html2canvas.onrendered||function(){})(o),this.prop.canvas=o,document.body.removeChild(this.prop.overlay)})},s.prototype.toImg=function(){return this.thenList([function(){return this.prop.canvas||this.toCanvas()}]).then(function(){var a=this.prop.canvas.toDataURL("image/"+this.opt.image.type,this.opt.image.quality);this.prop.img=document.createElement("img"),this.prop.img.src=a})},s.prototype.toPdf=function(){return this.thenList([function(){return this.toContext2d()}]).then(function(){this.prop.pdf=this.prop.pdf||this.opt.jsPDF})},s.prototype.output=function(a,o,l){return(l=l||"pdf").toLowerCase()==="img"||l.toLowerCase()==="image"?this.outputImg(a,o):this.outputPdf(a,o)},s.prototype.outputPdf=function(a,o){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).then(function(){return this.prop.pdf.output(a,o)})},s.prototype.outputImg=function(a){return this.thenList([function(){return this.prop.img||this.toImg()}]).then(function(){switch(a){case void 0:case"img":return this.prop.img;case"datauristring":case"dataurlstring":return this.prop.img.src;case"datauri":case"dataurl":return document.location.href=this.prop.img.src;default:throw'Image output type "'+a+'" is not supported.'}})},s.prototype.save=function(a){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).set(a?{filename:a}:null).then(function(){this.prop.pdf.save(this.opt.filename)})},s.prototype.doCallback=function(){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).then(function(){this.prop.callback(this.prop.pdf)})},s.prototype.set=function(a){if(i(a)!=="object")return this;var o=Object.keys(a||{}).map(function(l){if(l in s.template.prop)return function(){this.prop[l]=a[l]};switch(l){case"margin":return this.setMargin.bind(this,a.margin);case"jsPDF":return function(){return this.opt.jsPDF=a.jsPDF,this.setPageSize()};case"pageSize":return this.setPageSize.bind(this,a.pageSize);default:return function(){this.opt[l]=a[l]}}},this);return this.then(function(){return this.thenList(o)})},s.prototype.get=function(a,o){return this.then(function(){var l=a in s.template.prop?this.prop[a]:this.opt[a];return o?o(l):l})},s.prototype.setMargin=function(a){return this.then(function(){switch(i(a)){case"number":a=[a,a,a,a];case"array":if(a.length===2&&(a=[a[0],a[1],a[0],a[1]]),a.length===4)break;default:return this.error("Invalid margin array.")}this.opt.margin=a}).then(this.setPageSize)},s.prototype.setPageSize=function(a){function o(l,u){return Math.floor(l*u/72*96)}return this.then(function(){(a=a||_t.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner")||(a.inner={width:a.width-this.opt.margin[1]-this.opt.margin[3],height:a.height-this.opt.margin[0]-this.opt.margin[2]},a.inner.px={width:o(a.inner.width,a.k),height:o(a.inner.height,a.k)},a.inner.ratio=a.inner.height/a.inner.width),this.prop.pageSize=a})},s.prototype.setProgress=function(a,o,l,u){return a!=null&&(this.progress.val=a),o!=null&&(this.progress.state=o),l!=null&&(this.progress.n=l),u!=null&&(this.progress.stack=u),this.progress.ratio=this.progress.val/this.progress.state,this},s.prototype.updateProgress=function(a,o,l,u){return this.setProgress(a?this.progress.val+a:null,o||null,l?this.progress.n+l:null,u?this.progress.stack.concat(u):null)},s.prototype.then=function(a,o){var l=this;return this.thenCore(a,o,function(u,h){return l.updateProgress(null,null,1,[u]),Promise.prototype.then.call(this,function(p){return l.updateProgress(null,u),p}).then(u,h).then(function(p){return l.updateProgress(1),p})})},s.prototype.thenCore=function(a,o,l){l=l||Promise.prototype.then,a&&(a=a.bind(this)),o&&(o=o.bind(this));var u=Promise.toString().indexOf("[native code]")!==-1&&Promise.name==="Promise"?this:s.convert(Object.assign({},this),Promise.prototype),h=l.call(u,a,o);return s.convert(h,this.__proto__)},s.prototype.thenExternal=function(a,o){return Promise.prototype.then.call(this,a,o)},s.prototype.thenList=function(a){var o=this;return a.forEach(function(l){o=o.thenCore(l)}),o},s.prototype.catch=function(a){a&&(a=a.bind(this));var o=Promise.prototype.catch.call(this,a);return s.convert(o,this)},s.prototype.catchExternal=function(a){return Promise.prototype.catch.call(this,a)},s.prototype.error=function(a){return this.then(function(){throw new Error(a)})},s.prototype.using=s.prototype.set,s.prototype.saveAs=s.prototype.save,s.prototype.export=s.prototype.output,s.prototype.run=s.prototype.then,_t.getPageSize=function(a,o,l){if(Xt(a)==="object"){var u=a;a=u.orientation,o=u.unit||o,l=u.format||l}o=o||"mm",l=l||"a4",a=(""+(a||"P")).toLowerCase();var h,p=(""+l).toLowerCase(),g={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};switch(o){case"pt":h=1;break;case"mm":h=72/25.4;break;case"cm":h=72/2.54;break;case"in":h=72;break;case"px":h=.75;break;case"pc":case"em":h=12;break;case"ex":h=6;break;default:throw"Invalid unit: "+o}var d,x=0,b=0;if(g.hasOwnProperty(p))x=g[p][1]/h,b=g[p][0]/h;else try{x=l[1],b=l[0]}catch{throw new Error("Invalid format: "+l)}if(a==="p"||a==="portrait")a="p",b>x&&(d=b,b=x,x=d);else{if(a!=="l"&&a!=="landscape")throw"Invalid orientation: "+a;a="l",x>b&&(d=b,b=x,x=d)}return{width:b,height:x,unit:o,k:h,orientation:a}},n.html=function(a,o){(o=o||{}).callback=o.callback||function(){},o.html2canvas=o.html2canvas||{},o.html2canvas.canvas=o.html2canvas.canvas||this.canvas,o.jsPDF=o.jsPDF||this,o.fontFaces=o.fontFaces?o.fontFaces.map(qh):null;var l=new s(o);return o.worker?l:l.from(a).doCallback()}}(_t.API),_t.API.addJS=function(n){return Vp=n,this.internal.events.subscribe("postPutResources",function(){mc=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/Names [(EmbeddedJS) "+(mc+1)+" 0 R]"),this.internal.out(">>"),this.internal.out("endobj"),Hp=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/S /JavaScript"),this.internal.out("/JS ("+Vp+")"),this.internal.out(">>"),this.internal.out("endobj")}),this.internal.events.subscribe("putCatalog",function(){mc!==void 0&&Hp!==void 0&&this.internal.out("/Names <</JavaScript "+mc+" 0 R>>")}),this},function(n){var e;n.events.push(["postPutResources",function(){var t=this,i=/^(\d+) 0 obj$/;if(this.outline.root.children.length>0)for(var r=t.outline.render().split(/\r\n/),s=0;s<r.length;s++){var a=r[s],o=i.exec(a);if(o!=null){var l=o[1];t.internal.newObjectDeferredBegin(l,!1)}t.internal.write(a)}if(this.outline.createNamedDestinations){var u=this.internal.pages.length,h=[];for(s=0;s<u;s++){var p=t.internal.newObject();h.push(p);var g=t.internal.getPageInfo(s+1);t.internal.write("<< /D["+g.objId+" 0 R /XYZ null null null]>> endobj")}var d=t.internal.newObject();for(t.internal.write("<< /Names [ "),s=0;s<h.length;s++)t.internal.write("(page_"+(s+1)+")"+h[s]+" 0 R");t.internal.write(" ] >>","endobj"),e=t.internal.newObject(),t.internal.write("<< /Dests "+d+" 0 R"),t.internal.write(">>","endobj")}}]),n.events.push(["putCatalog",function(){this.outline.root.children.length>0&&(this.internal.write("/Outlines",this.outline.makeRef(this.outline.root)),this.outline.createNamedDestinations&&this.internal.write("/Names "+e+" 0 R"))}]),n.events.push(["initialized",function(){var t=this;t.outline={createNamedDestinations:!1,root:{children:[]}},t.outline.add=function(i,r,s){var a={title:r,options:s,children:[]};return i==null&&(i=this.root),i.children.push(a),a},t.outline.render=function(){return this.ctx={},this.ctx.val="",this.ctx.pdf=t,this.genIds_r(this.root),this.renderRoot(this.root),this.renderItems(this.root),this.ctx.val},t.outline.genIds_r=function(i){i.id=t.internal.newObjectDeferred();for(var r=0;r<i.children.length;r++)this.genIds_r(i.children[r])},t.outline.renderRoot=function(i){this.objStart(i),this.line("/Type /Outlines"),i.children.length>0&&(this.line("/First "+this.makeRef(i.children[0])),this.line("/Last "+this.makeRef(i.children[i.children.length-1]))),this.line("/Count "+this.count_r({count:0},i)),this.objEnd()},t.outline.renderItems=function(i){for(var r=this.ctx.pdf.internal.getVerticalCoordinateString,s=0;s<i.children.length;s++){var a=i.children[s];this.objStart(a),this.line("/Title "+this.makeString(a.title)),this.line("/Parent "+this.makeRef(i)),s>0&&this.line("/Prev "+this.makeRef(i.children[s-1])),s<i.children.length-1&&this.line("/Next "+this.makeRef(i.children[s+1])),a.children.length>0&&(this.line("/First "+this.makeRef(a.children[0])),this.line("/Last "+this.makeRef(a.children[a.children.length-1])));var o=this.count=this.count_r({count:0},a);if(o>0&&this.line("/Count "+o),a.options&&a.options.pageNumber){var l=t.internal.getPageInfo(a.options.pageNumber);this.line("/Dest ["+l.objId+" 0 R /XYZ 0 "+r(0)+" 0]")}this.objEnd()}for(var u=0;u<i.children.length;u++)this.renderItems(i.children[u])},t.outline.line=function(i){this.ctx.val+=i+`\r
`},t.outline.makeRef=function(i){return i.id+" 0 R"},t.outline.makeString=function(i){return"("+t.internal.pdfEscape(i)+")"},t.outline.objStart=function(i){this.ctx.val+=`\r
`+i.id+` 0 obj\r
<<\r
`},t.outline.objEnd=function(){this.ctx.val+=`>> \r
endobj\r
`},t.outline.count_r=function(i,r){for(var s=0;s<r.children.length;s++)i.count++,this.count_r(i,r.children[s]);return i.count}}])}(_t.API),function(n){var e=[192,193,194,195,196,197,198,199];n.processJPEG=function(t,i,r,s,a,o){var l,u=this.decode.DCT_DECODE,h=null;if(typeof t=="string"||this.__addimage__.isArrayBuffer(t)||this.__addimage__.isArrayBufferView(t)){switch(t=a||t,t=this.__addimage__.isArrayBuffer(t)?new Uint8Array(t):t,(l=function(p){for(var g,d=256*p.charCodeAt(4)+p.charCodeAt(5),x=p.length,b={width:0,height:0,numcomponents:1},_=4;_<x;_+=2){if(_+=d,e.indexOf(p.charCodeAt(_+1))!==-1){g=256*p.charCodeAt(_+5)+p.charCodeAt(_+6),b={width:256*p.charCodeAt(_+7)+p.charCodeAt(_+8),height:g,numcomponents:p.charCodeAt(_+9)};break}d=256*p.charCodeAt(_+2)+p.charCodeAt(_+3)}return b}(t=this.__addimage__.isArrayBufferView(t)?this.__addimage__.arrayBufferToBinaryString(t):t)).numcomponents){case 1:o=this.color_spaces.DEVICE_GRAY;break;case 4:o=this.color_spaces.DEVICE_CMYK;break;case 3:o=this.color_spaces.DEVICE_RGB}h={data:t,width:l.width,height:l.height,colorSpace:o,bitsPerComponent:8,filter:u,index:i,alias:r}}return h}}(_t.API);var ka,gc,qp,Wp,jp,Eb=function(){var n,e,t;function i(s){var a,o,l,u,h,p,g,d,x,b,_,m,S,M;for(this.data=s,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},p=null;;){switch(a=this.readUInt32(),x=(function(){var P,q;for(q=[],P=0;P<4;++P)q.push(String.fromCharCode(this.data[this.pos++]));return q}).call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case"PLTE":this.palette=this.read(a);break;case"fcTL":p&&this.animation.frames.push(p),this.pos+=4,p={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},h=this.readUInt16(),u=this.readUInt16()||100,p.delay=1e3*h/u,p.disposeOp=this.data[this.pos++],p.blendOp=this.data[this.pos++],p.data=[];break;case"IDAT":case"fdAT":for(x==="fdAT"&&(this.pos+=4,a-=4),s=(p!=null?p.data:void 0)||this.imgData,m=0;0<=a?m<a:m>a;0<=a?++m:--m)s.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={},this.colorType){case 3:if(l=this.palette.length/3,this.transparency.indexed=this.read(a),this.transparency.indexed.length>l)throw new Error("More transparent colors than palette size");if((b=l-this.transparency.indexed.length)>0)for(S=0;0<=b?S<b:S>b;0<=b?++S:--S)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(a)[0];break;case 2:this.transparency.rgb=this.read(a)}break;case"tEXt":g=(_=this.read(a)).indexOf(0),d=String.fromCharCode.apply(String,_.slice(0,g)),this.text[d]=String.fromCharCode.apply(String,_.slice(g+1));break;case"IEND":return p&&this.animation.frames.push(p),this.colors=(function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}).call(this),this.hasAlphaChannel=(M=this.colorType)===4||M===6,o=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*o,this.colorSpace=(function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}).call(this),void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=a}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}i.prototype.read=function(s){var a,o;for(o=[],a=0;0<=s?a<s:a>s;0<=s?++a:--a)o.push(this.data[this.pos++]);return o},i.prototype.readUInt32=function(){return this.data[this.pos++]<<24|this.data[this.pos++]<<16|this.data[this.pos++]<<8|this.data[this.pos++]},i.prototype.readUInt16=function(){return this.data[this.pos++]<<8|this.data[this.pos++]},i.prototype.decodePixels=function(s){var a=this.pixelBitlength/8,o=new Uint8Array(this.width*this.height*a),l=0,u=this;if(s==null&&(s=this.imgData),s.length===0)return new Uint8Array(0);function h(p,g,d,x){var b,_,m,S,M,P,q,G,U,H,A,D,E,R,X,N,J,Q,ie,ee,te,ae=Math.ceil((u.width-p)/d),xe=Math.ceil((u.height-g)/x),T=u.width==ae&&u.height==xe;for(R=a*ae,D=T?o:new Uint8Array(R*xe),P=s.length,E=0,_=0;E<xe&&l<P;){switch(s[l++]){case 0:for(S=J=0;J<R;S=J+=1)D[_++]=s[l++];break;case 1:for(S=Q=0;Q<R;S=Q+=1)b=s[l++],M=S<a?0:D[_-a],D[_++]=(b+M)%256;break;case 2:for(S=ie=0;ie<R;S=ie+=1)b=s[l++],m=(S-S%a)/a,X=E&&D[(E-1)*R+m*a+S%a],D[_++]=(X+b)%256;break;case 3:for(S=ee=0;ee<R;S=ee+=1)b=s[l++],m=(S-S%a)/a,M=S<a?0:D[_-a],X=E&&D[(E-1)*R+m*a+S%a],D[_++]=(b+Math.floor((M+X)/2))%256;break;case 4:for(S=te=0;te<R;S=te+=1)b=s[l++],m=(S-S%a)/a,M=S<a?0:D[_-a],E===0?X=N=0:(X=D[(E-1)*R+m*a+S%a],N=m&&D[(E-1)*R+(m-1)*a+S%a]),q=M+X-N,G=Math.abs(q-M),H=Math.abs(q-X),A=Math.abs(q-N),U=G<=H&&G<=A?M:H<=A?X:N,D[_++]=(b+U)%256;break;default:throw new Error("Invalid filter algorithm: "+s[l-1])}if(!T){var F=((g+E*x)*u.width+p)*a,V=E*R;for(S=0;S<ae;S+=1){for(var K=0;K<a;K+=1)o[F++]=D[V++];F+=(d-1)*a}}E++}}return s=rb(s),u.interlaceMethod==1?(h(0,0,8,8),h(4,0,8,8),h(0,4,4,8),h(2,0,4,4),h(0,2,2,4),h(1,0,2,2),h(0,1,1,2)):h(0,0,1,1),o},i.prototype.decodePalette=function(){var s,a,o,l,u,h,p,g,d;for(o=this.palette,h=this.transparency.indexed||[],u=new Uint8Array((h.length||0)+o.length),l=0,s=0,a=p=0,g=o.length;p<g;a=p+=3)u[l++]=o[a],u[l++]=o[a+1],u[l++]=o[a+2],u[l++]=(d=h[s++])!=null?d:255;return u},i.prototype.copyToImageData=function(s,a){var o,l,u,h,p,g,d,x,b,_,m;if(l=this.colors,b=null,o=this.hasAlphaChannel,this.palette.length&&(b=(m=this._decodedPalette)!=null?m:this._decodedPalette=this.decodePalette(),l=4,o=!0),x=(u=s.data||s).length,p=b||a,h=g=0,l===1)for(;h<x;)d=b?4*a[h/4]:g,_=p[d++],u[h++]=_,u[h++]=_,u[h++]=_,u[h++]=o?p[d++]:255,g=d;else for(;h<x;)d=b?4*a[h/4]:g,u[h++]=p[d++],u[h++]=p[d++],u[h++]=p[d++],u[h++]=o?p[d++]:255,g=d},i.prototype.decode=function(){var s;return s=new Uint8Array(this.width*this.height*4),this.copyToImageData(s,this.decodePixels()),s};var r=function(){if(Object.prototype.toString.call(xt)==="[object Window]"){try{e=xt.document.createElement("canvas"),t=e.getContext("2d")}catch{return!1}return!0}return!1};return r(),n=function(s){var a;if(r()===!0)return t.width=s.width,t.height=s.height,t.clearRect(0,0,s.width,s.height),t.putImageData(s,0,0),(a=new Image).src=e.toDataURL(),a;throw new Error("This method requires a Browser with Canvas-capability.")},i.prototype.decodeFrames=function(s){var a,o,l,u,h,p,g,d;if(this.animation){for(d=[],o=h=0,p=(g=this.animation.frames).length;h<p;o=++h)a=g[o],l=s.createImageData(a.width,a.height),u=this.decodePixels(new Uint8Array(a.data)),this.copyToImageData(l,u),a.imageData=l,d.push(a.image=n(l));return d}},i.prototype.renderFrame=function(s,a){var o,l,u;return o=(l=this.animation.frames)[a],u=l[a-1],a===0&&s.clearRect(0,0,this.width,this.height),(u!=null?u.disposeOp:void 0)===1?s.clearRect(u.xOffset,u.yOffset,u.width,u.height):(u!=null?u.disposeOp:void 0)===2&&s.putImageData(u.imageData,u.xOffset,u.yOffset),o.blendOp===0&&s.clearRect(o.xOffset,o.yOffset,o.width,o.height),s.drawImage(o.image,o.xOffset,o.yOffset)},i.prototype.animate=function(s){var a,o,l,u,h,p,g=this;return o=0,p=this.animation,u=p.numFrames,l=p.frames,h=p.numPlays,(a=function(){var d,x;if(d=o++%u,x=l[d],g.renderFrame(s,d),u>1&&o/u<h)return g.animation._timeout=setTimeout(a,x.delay)})()},i.prototype.stopAnimation=function(){var s;return clearTimeout((s=this.animation)!=null?s._timeout:void 0)},i.prototype.render=function(s){var a,o;return s._png&&s._png.stopAnimation(),s._png=this,s.width=this.width,s.height=this.height,a=s.getContext("2d"),this.animation?(this.decodeFrames(a),this.animate(a)):(o=a.createImageData(this.width,this.height),this.copyToImageData(o,this.decodePixels()),a.putImageData(o,0,0))},i}();/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 *//**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */function Tb(n){var e=0;if(n[e++]!==71||n[e++]!==73||n[e++]!==70||n[e++]!==56||(n[e++]+1&253)!=56||n[e++]!==97)throw new Error("Invalid GIF 87a/89a header.");var t=n[e++]|n[e++]<<8,i=n[e++]|n[e++]<<8,r=n[e++],s=r>>7,a=1<<(7&r)+1;n[e++],n[e++];var o=null,l=null;s&&(o=e,l=a,e+=3*a);var u=!0,h=[],p=0,g=null,d=0,x=null;for(this.width=t,this.height=i;u&&e<n.length;)switch(n[e++]){case 33:switch(n[e++]){case 255:if(n[e]!==11||n[e+1]==78&&n[e+2]==69&&n[e+3]==84&&n[e+4]==83&&n[e+5]==67&&n[e+6]==65&&n[e+7]==80&&n[e+8]==69&&n[e+9]==50&&n[e+10]==46&&n[e+11]==48&&n[e+12]==3&&n[e+13]==1&&n[e+16]==0)e+=14,x=n[e++]|n[e++]<<8,e++;else for(e+=12;;){if(!((E=n[e++])>=0))throw Error("Invalid block size");if(E===0)break;e+=E}break;case 249:if(n[e++]!==4||n[e+4]!==0)throw new Error("Invalid graphics extension block.");var b=n[e++];p=n[e++]|n[e++]<<8,g=n[e++],!(1&b)&&(g=null),d=b>>2&7,e++;break;case 254:for(;;){if(!((E=n[e++])>=0))throw Error("Invalid block size");if(E===0)break;e+=E}break;default:throw new Error("Unknown graphic control label: 0x"+n[e-1].toString(16))}break;case 44:var _=n[e++]|n[e++]<<8,m=n[e++]|n[e++]<<8,S=n[e++]|n[e++]<<8,M=n[e++]|n[e++]<<8,P=n[e++],q=P>>6&1,G=1<<(7&P)+1,U=o,H=l,A=!1;P>>7&&(A=!0,U=e,H=G,e+=3*G);var D=e;for(e++;;){var E;if(!((E=n[e++])>=0))throw Error("Invalid block size");if(E===0)break;e+=E}h.push({x:_,y:m,width:S,height:M,has_local_palette:A,palette_offset:U,palette_size:H,data_offset:D,data_length:e-D,transparent_index:g,interlaced:!!q,delay:p,disposal:d});break;case 59:u=!1;break;default:throw new Error("Unknown gif block: 0x"+n[e-1].toString(16))}this.numFrames=function(){return h.length},this.loopCount=function(){return x},this.frameInfo=function(R){if(R<0||R>=h.length)throw new Error("Frame index out of range.");return h[R]},this.decodeAndBlitFrameBGRA=function(R,X){var N=this.frameInfo(R),J=N.width*N.height,Q=new Uint8Array(J);Xp(n,N.data_offset,Q,J);var ie=N.palette_offset,ee=N.transparent_index;ee===null&&(ee=256);var te=N.width,ae=t-te,xe=te,T=4*(N.y*t+N.x),F=4*((N.y+N.height)*t+N.x),V=T,K=4*ae;N.interlaced===!0&&(K+=4*t*7);for(var ne=8,ce=0,fe=Q.length;ce<fe;++ce){var pe=Q[ce];if(xe===0&&(xe=te,(V+=K)>=F&&(K=4*ae+4*t*(ne-1),V=T+(te+ae)*(ne<<1),ne>>=1)),pe===ee)V+=4;else{var Ce=n[ie+3*pe],Ie=n[ie+3*pe+1],re=n[ie+3*pe+2];X[V++]=re,X[V++]=Ie,X[V++]=Ce,X[V++]=255}--xe}},this.decodeAndBlitFrameRGBA=function(R,X){var N=this.frameInfo(R),J=N.width*N.height,Q=new Uint8Array(J);Xp(n,N.data_offset,Q,J);var ie=N.palette_offset,ee=N.transparent_index;ee===null&&(ee=256);var te=N.width,ae=t-te,xe=te,T=4*(N.y*t+N.x),F=4*((N.y+N.height)*t+N.x),V=T,K=4*ae;N.interlaced===!0&&(K+=4*t*7);for(var ne=8,ce=0,fe=Q.length;ce<fe;++ce){var pe=Q[ce];if(xe===0&&(xe=te,(V+=K)>=F&&(K=4*ae+4*t*(ne-1),V=T+(te+ae)*(ne<<1),ne>>=1)),pe===ee)V+=4;else{var Ce=n[ie+3*pe],Ie=n[ie+3*pe+1],re=n[ie+3*pe+2];X[V++]=Ce,X[V++]=Ie,X[V++]=re,X[V++]=255}--xe}}}function Xp(n,e,t,i){for(var r=n[e++],s=1<<r,a=s+1,o=a+1,l=r+1,u=(1<<l)-1,h=0,p=0,g=0,d=n[e++],x=new Int32Array(4096),b=null;;){for(;h<16&&d!==0;)p|=n[e++]<<h,h+=8,d===1?d=n[e++]:--d;if(h<l)break;var _=p&u;if(p>>=l,h-=l,_!==s){if(_===a)break;for(var m=_<o?_:b,S=0,M=m;M>s;)M=x[M]>>8,++S;var P=M;if(g+S+(m!==_?1:0)>i)return void en.log("Warning, gif stream longer than expected.");t[g++]=P;var q=g+=S;for(m!==_&&(t[g++]=P),M=m;S--;)M=x[M],t[--q]=255&M,M>>=8;b!==null&&o<4096&&(x[o++]=b<<8|P,o>=u+1&&l<12&&(++l,u=u<<1|1)),b=_}else o=a+1,u=(1<<(l=r+1))-1,b=null}return g!==i&&en.log("Warning, gif stream shorter than expected."),t}/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/function mh(n){var e,t,i,r,s,a=Math.floor,o=new Array(64),l=new Array(64),u=new Array(64),h=new Array(64),p=new Array(65535),g=new Array(65535),d=new Array(64),x=new Array(64),b=[],_=0,m=7,S=new Array(64),M=new Array(64),P=new Array(64),q=new Array(256),G=new Array(2048),U=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],H=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],A=[0,1,2,3,4,5,6,7,8,9,10,11],D=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],E=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],R=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],X=[0,1,2,3,4,5,6,7,8,9,10,11],N=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],J=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function Q(T,F){for(var V=0,K=0,ne=new Array,ce=1;ce<=16;ce++){for(var fe=1;fe<=T[ce];fe++)ne[F[K]]=[],ne[F[K]][0]=V,ne[F[K]][1]=ce,K++,V++;V*=2}return ne}function ie(T){for(var F=T[0],V=T[1]-1;V>=0;)F&1<<V&&(_|=1<<m),V--,--m<0&&(_==255?(ee(255),ee(0)):ee(_),m=7,_=0)}function ee(T){b.push(T)}function te(T){ee(T>>8&255),ee(255&T)}function ae(T,F,V,K,ne){for(var ce,fe=ne[0],pe=ne[240],Ce=function(B,I){var se,ye,Me,Re,qe,Oe,je,nt,Je,Pe,ze=0;for(Je=0;Je<8;++Je){se=B[ze],ye=B[ze+1],Me=B[ze+2],Re=B[ze+3],qe=B[ze+4],Oe=B[ze+5],je=B[ze+6];var pt=se+(nt=B[ze+7]),it=se-nt,ht=ye+je,$e=ye-je,ct=Me+Oe,It=Me-Oe,mt=Re+qe,St=Re-qe,Be=pt+mt,le=pt-mt,Ke=ht+ct,We=ht-ct;B[ze]=Be+Ke,B[ze+4]=Be-Ke;var Ye=.707106781*(We+le);B[ze+2]=le+Ye,B[ze+6]=le-Ye;var Ze=.382683433*((Be=St+It)-(We=$e+it)),Bt=.5411961*Be+Ze,Et=1.306562965*We+Ze,qt=.707106781*(Ke=It+$e),tn=it+qt,tt=it-qt;B[ze+5]=tt+Bt,B[ze+3]=tt-Bt,B[ze+1]=tn+Et,B[ze+7]=tn-Et,ze+=8}for(ze=0,Je=0;Je<8;++Je){se=B[ze],ye=B[ze+8],Me=B[ze+16],Re=B[ze+24],qe=B[ze+32],Oe=B[ze+40],je=B[ze+48];var Jt=se+(nt=B[ze+56]),gn=se-nt,Bn=ye+je,vn=ye-je,sn=Me+Oe,qn=Me-Oe,Wi=Re+qe,Ri=Re-qe,ci=Jt+Wi,yi=Jt-Wi,bi=Bn+sn,Pi=Bn-sn;B[ze]=ci+bi,B[ze+32]=ci-bi;var j=.707106781*(Pi+yi);B[ze+16]=yi+j,B[ze+48]=yi-j;var ge=.382683433*((ci=Ri+qn)-(Pi=vn+gn)),Ee=.5411961*ci+ge,Te=1.306562965*Pi+ge,Ae=.707106781*(bi=qn+vn),st=gn+Ae,dt=gn-Ae;B[ze+40]=dt+Ee,B[ze+24]=dt-Ee,B[ze+8]=st+Te,B[ze+56]=st-Te,ze++}for(Je=0;Je<64;++Je)Pe=B[Je]*I[Je],d[Je]=Pe>0?Pe+.5|0:Pe-.5|0;return d}(T,F),Ie=0;Ie<64;++Ie)x[U[Ie]]=Ce[Ie];var re=x[0]-V;V=x[0],re==0?ie(K[0]):(ie(K[g[ce=32767+re]]),ie(p[ce]));for(var Xe=63;Xe>0&&x[Xe]==0;)Xe--;if(Xe==0)return ie(fe),V;for(var Ve,_e=1;_e<=Xe;){for(var Y=_e;x[_e]==0&&_e<=Xe;)++_e;var lt=_e-Y;if(lt>=16){Ve=lt>>4;for(var He=1;He<=Ve;++He)ie(pe);lt&=15}ce=32767+x[_e],ie(ne[(lt<<4)+g[ce]]),ie(p[ce]),_e++}return Xe!=63&&ie(fe),V}function xe(T){T=Math.min(Math.max(T,1),100),s!=T&&(function(F){for(var V=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],K=0;K<64;K++){var ne=a((V[K]*F+50)/100);ne=Math.min(Math.max(ne,1),255),o[U[K]]=ne}for(var ce=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],fe=0;fe<64;fe++){var pe=a((ce[fe]*F+50)/100);pe=Math.min(Math.max(pe,1),255),l[U[fe]]=pe}for(var Ce=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],Ie=0,re=0;re<8;re++)for(var Xe=0;Xe<8;Xe++)u[Ie]=1/(o[U[Ie]]*Ce[re]*Ce[Xe]*8),h[Ie]=1/(l[U[Ie]]*Ce[re]*Ce[Xe]*8),Ie++}(T<50?Math.floor(5e3/T):Math.floor(200-2*T)),s=T)}this.encode=function(T,F){F&&xe(F),b=new Array,_=0,m=7,te(65496),te(65504),te(16),ee(74),ee(70),ee(73),ee(70),ee(0),ee(1),ee(1),ee(0),te(1),te(1),ee(0),ee(0),function(){te(65499),te(132),ee(0);for(var ye=0;ye<64;ye++)ee(o[ye]);ee(1);for(var Me=0;Me<64;Me++)ee(l[Me])}(),function(ye,Me){te(65472),te(17),ee(8),te(Me),te(ye),ee(3),ee(1),ee(17),ee(0),ee(2),ee(17),ee(1),ee(3),ee(17),ee(1)}(T.width,T.height),function(){te(65476),te(418),ee(0);for(var ye=0;ye<16;ye++)ee(H[ye+1]);for(var Me=0;Me<=11;Me++)ee(A[Me]);ee(16);for(var Re=0;Re<16;Re++)ee(D[Re+1]);for(var qe=0;qe<=161;qe++)ee(E[qe]);ee(1);for(var Oe=0;Oe<16;Oe++)ee(R[Oe+1]);for(var je=0;je<=11;je++)ee(X[je]);ee(17);for(var nt=0;nt<16;nt++)ee(N[nt+1]);for(var Je=0;Je<=161;Je++)ee(J[Je])}(),te(65498),te(12),ee(3),ee(1),ee(0),ee(2),ee(17),ee(3),ee(17),ee(0),ee(63),ee(0);var V=0,K=0,ne=0;_=0,m=7,this.encode.displayName="_encode_";for(var ce,fe,pe,Ce,Ie,re,Xe,Ve,_e,Y=T.data,lt=T.width,He=T.height,B=4*lt,I=0;I<He;){for(ce=0;ce<B;){for(Ie=B*I+ce,Xe=-1,Ve=0,_e=0;_e<64;_e++)re=Ie+(Ve=_e>>3)*B+(Xe=4*(7&_e)),I+Ve>=He&&(re-=B*(I+1+Ve-He)),ce+Xe>=B&&(re-=ce+Xe-B+4),fe=Y[re++],pe=Y[re++],Ce=Y[re++],S[_e]=(G[fe]+G[pe+256>>0]+G[Ce+512>>0]>>16)-128,M[_e]=(G[fe+768>>0]+G[pe+1024>>0]+G[Ce+1280>>0]>>16)-128,P[_e]=(G[fe+1280>>0]+G[pe+1536>>0]+G[Ce+1792>>0]>>16)-128;V=ae(S,u,V,e,i),K=ae(M,h,K,t,r),ne=ae(P,h,ne,t,r),ce+=32}I+=8}if(m>=0){var se=[];se[1]=m+1,se[0]=(1<<m+1)-1,ie(se)}return te(65497),new Uint8Array(b)},n=n||50,function(){for(var T=String.fromCharCode,F=0;F<256;F++)q[F]=T(F)}(),e=Q(H,A),t=Q(R,X),i=Q(D,E),r=Q(N,J),function(){for(var T=1,F=2,V=1;V<=15;V++){for(var K=T;K<F;K++)g[32767+K]=V,p[32767+K]=[],p[32767+K][1]=V,p[32767+K][0]=K;for(var ne=-(F-1);ne<=-T;ne++)g[32767+ne]=V,p[32767+ne]=[],p[32767+ne][1]=V,p[32767+ne][0]=F-1+ne;T<<=1,F<<=1}}(),function(){for(var T=0;T<256;T++)G[T]=19595*T,G[T+256>>0]=38470*T,G[T+512>>0]=7471*T+32768,G[T+768>>0]=-11059*T,G[T+1024>>0]=-21709*T,G[T+1280>>0]=32768*T+8421375,G[T+1536>>0]=-27439*T,G[T+1792>>0]=-5329*T}(),xe(n)}/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */function er(n,e){if(this.pos=0,this.buffer=n,this.datav=new DataView(n.buffer),this.is_with_alpha=!!e,this.bottom_up=!0,this.flag=String.fromCharCode(this.buffer[0])+String.fromCharCode(this.buffer[1]),this.pos+=2,["BM","BA","CI","CP","IC","PT"].indexOf(this.flag)===-1)throw new Error("Invalid BMP File");this.parseHeader(),this.parseBGR()}function Yp(n){function e(H){if(!H)throw Error("assert :P")}function t(H,A,D){for(var E=0;4>E;E++)if(H[A+E]!=D.charCodeAt(E))return!0;return!1}function i(H,A,D,E,R){for(var X=0;X<R;X++)H[A+X]=D[E+X]}function r(H,A,D,E){for(var R=0;R<E;R++)H[A+R]=D}function s(H){return new Int32Array(H)}function a(H,A){for(var D=[],E=0;E<H;E++)D.push(new A);return D}function o(H,A){var D=[];return function E(R,X,N){for(var J=N[X],Q=0;Q<J&&(R.push(N.length>X+1?[]:new A),!(N.length<X+1));Q++)E(R[Q],X+1,N)}(D,0,H),D}var l=function(){var H=this;function A(c,f){for(var y=1<<f-1>>>0;c&y;)y>>>=1;return y?(c&y-1)+y:c}function D(c,f,y,w,L){e(!(w%y));do c[f+(w-=y)]=L;while(0<w)}function E(c,f,y,w,L){if(e(2328>=L),512>=L)var O=s(512);else if((O=s(L))==null)return 0;return function(k,z,W,$,ue,Se){var we,me,Ue=z,Le=1<<W,he=s(16),de=s(16);for(e(ue!=0),e($!=null),e(k!=null),e(0<W),me=0;me<ue;++me){if(15<$[me])return 0;++he[$[me]]}if(he[0]==ue)return 0;for(de[1]=0,we=1;15>we;++we){if(he[we]>1<<we)return 0;de[we+1]=de[we]+he[we]}for(me=0;me<ue;++me)we=$[me],0<$[me]&&(Se[de[we]++]=me);if(de[15]==1)return($=new R).g=0,$.value=Se[0],D(k,Ue,1,Le,$),Le;var De,ke=-1,Fe=Le-1,ot=0,Qe=1,vt=1,rt=1<<W;for(me=0,we=1,ue=2;we<=W;++we,ue<<=1){if(Qe+=vt<<=1,0>(vt-=he[we]))return 0;for(;0<he[we];--he[we])($=new R).g=we,$.value=Se[me++],D(k,Ue+ot,ue,rt,$),ot=A(ot,we)}for(we=W+1,ue=2;15>=we;++we,ue<<=1){if(Qe+=vt<<=1,0>(vt-=he[we]))return 0;for(;0<he[we];--he[we]){if($=new R,(ot&Fe)!=ke){for(Ue+=rt,De=1<<(ke=we)-W;15>ke&&!(0>=(De-=he[ke]));)++ke,De<<=1;Le+=rt=1<<(De=ke-W),k[z+(ke=ot&Fe)].g=De+W,k[z+ke].value=Ue-z-ke}$.g=we-W,$.value=Se[me++],D(k,Ue+(ot>>W),ue,rt,$),ot=A(ot,we)}}return Qe!=2*de[15]-1?0:Le}(c,f,y,w,L,O)}function R(){this.value=this.g=0}function X(){this.value=this.g=0}function N(){this.G=a(5,R),this.H=s(5),this.jc=this.Qb=this.qb=this.nd=0,this.pd=a(zn,X)}function J(c,f,y,w){e(c!=null),e(f!=null),e(2147483648>w),c.Ca=254,c.I=0,c.b=-8,c.Ka=0,c.oa=f,c.pa=y,c.Jd=f,c.Yc=y+w,c.Zc=4<=w?y+w-4+1:y,ce(c)}function Q(c,f){for(var y=0;0<f--;)y|=pe(c,128)<<f;return y}function ie(c,f){var y=Q(c,f);return fe(c)?-y:y}function ee(c,f,y,w){var L,O=0;for(e(c!=null),e(f!=null),e(4294967288>w),c.Sb=w,c.Ra=0,c.u=0,c.h=0,4<w&&(w=4),L=0;L<w;++L)O+=f[y+L]<<8*L;c.Ra=O,c.bb=w,c.oa=f,c.pa=y}function te(c){for(;8<=c.u&&c.bb<c.Sb;)c.Ra>>>=8,c.Ra+=c.oa[c.pa+c.bb]<<ha-8>>>0,++c.bb,c.u-=8;V(c)&&(c.h=1,c.u=0)}function ae(c,f){if(e(0<=f),!c.h&&f<=ua){var y=F(c)&ca[f];return c.u+=f,te(c),y}return c.h=1,c.u=0}function xe(){this.b=this.Ca=this.I=0,this.oa=[],this.pa=0,this.Jd=[],this.Yc=0,this.Zc=[],this.Ka=0}function T(){this.Ra=0,this.oa=[],this.h=this.u=this.bb=this.Sb=this.pa=0}function F(c){return c.Ra>>>(c.u&ha-1)>>>0}function V(c){return e(c.bb<=c.Sb),c.h||c.bb==c.Sb&&c.u>ha}function K(c,f){c.u=f,c.h=V(c)}function ne(c){c.u>=Ao&&(e(c.u>=Ao),te(c))}function ce(c){e(c!=null&&c.oa!=null),c.pa<c.Zc?(c.I=(c.oa[c.pa++]|c.I<<8)>>>0,c.b+=8):(e(c!=null&&c.oa!=null),c.pa<c.Yc?(c.b+=8,c.I=c.oa[c.pa++]|c.I<<8):c.Ka?c.b=0:(c.I<<=8,c.b+=8,c.Ka=1))}function fe(c){return Q(c,1)}function pe(c,f){var y=c.Ca;0>c.b&&ce(c);var w=c.b,L=y*f>>>8,O=(c.I>>>w>L)+0;for(O?(y-=L,c.I-=L+1<<w>>>0):y=L+1,w=y,L=0;256<=w;)L+=8,w>>=8;return w=7^L+hi[w],c.b-=w,c.Ca=(y<<w)-1,O}function Ce(c,f,y){c[f+0]=y>>24&255,c[f+1]=y>>16&255,c[f+2]=y>>8&255,c[f+3]=y>>0&255}function Ie(c,f){return c[f+0]<<0|c[f+1]<<8}function re(c,f){return Ie(c,f)|c[f+2]<<16}function Xe(c,f){return Ie(c,f)|Ie(c,f+2)<<16}function Ve(c,f){var y=1<<f;return e(c!=null),e(0<f),c.X=s(y),c.X==null?0:(c.Mb=32-f,c.Xa=f,1)}function _e(c,f){e(c!=null),e(f!=null),e(c.Xa==f.Xa),i(f.X,0,c.X,0,1<<f.Xa)}function Y(){this.X=[],this.Xa=this.Mb=0}function lt(c,f,y,w){e(y!=null),e(w!=null);var L=y[0],O=w[0];return L==0&&(L=(c*O+f/2)/f),O==0&&(O=(f*L+c/2)/c),0>=L||0>=O?0:(y[0]=L,w[0]=O,1)}function He(c,f){return c+(1<<f)-1>>>f}function B(c,f){return((4278255360&c)+(4278255360&f)>>>0&4278255360)+((16711935&c)+(16711935&f)>>>0&16711935)>>>0}function I(c,f){H[f]=function(y,w,L,O,k,z,W){var $;for($=0;$<k;++$){var ue=H[c](z[W+$-1],L,O+$);z[W+$]=B(y[w+$],ue)}}}function se(){this.ud=this.hd=this.jd=0}function ye(c,f){return((4278124286&(c^f))>>>1)+(c&f)>>>0}function Me(c){return 0<=c&&256>c?c:0>c?0:255<c?255:void 0}function Re(c,f){return Me(c+(c-f+.5>>1))}function qe(c,f,y){return Math.abs(f-y)-Math.abs(c-y)}function Oe(c,f,y,w,L,O,k){for(w=O[k-1],y=0;y<L;++y)O[k+y]=w=B(c[f+y],w)}function je(c,f,y,w,L){var O;for(O=0;O<y;++O){var k=c[f+O],z=k>>8&255,W=16711935&(W=(W=16711935&k)+((z<<16)+z));w[L+O]=(4278255360&k)+W>>>0}}function nt(c,f){f.jd=c>>0&255,f.hd=c>>8&255,f.ud=c>>16&255}function Je(c,f,y,w,L,O){var k;for(k=0;k<w;++k){var z=f[y+k],W=z>>>8,$=z,ue=255&(ue=(ue=z>>>16)+((c.jd<<24>>24)*(W<<24>>24)>>>5));$=255&($=($=$+((c.hd<<24>>24)*(W<<24>>24)>>>5))+((c.ud<<24>>24)*(ue<<24>>24)>>>5)),L[O+k]=(4278255360&z)+(ue<<16)+$}}function Pe(c,f,y,w,L){H[f]=function(O,k,z,W,$,ue,Se,we,me){for(W=Se;W<we;++W)for(Se=0;Se<me;++Se)$[ue++]=L(z[w(O[k++])])},H[c]=function(O,k,z,W,$,ue,Se){var we=8>>O.b,me=O.Ea,Ue=O.K[0],Le=O.w;if(8>we)for(O=(1<<O.b)-1,Le=(1<<we)-1;k<z;++k){var he,de=0;for(he=0;he<me;++he)he&O||(de=w(W[$++])),ue[Se++]=L(Ue[de&Le]),de>>=we}else H["VP8LMapColor"+y](W,$,Ue,Le,ue,Se,k,z,me)}}function ze(c,f,y,w,L){for(y=f+y;f<y;){var O=c[f++];w[L++]=O>>16&255,w[L++]=O>>8&255,w[L++]=O>>0&255}}function pt(c,f,y,w,L){for(y=f+y;f<y;){var O=c[f++];w[L++]=O>>16&255,w[L++]=O>>8&255,w[L++]=O>>0&255,w[L++]=O>>24&255}}function it(c,f,y,w,L){for(y=f+y;f<y;){var O=(k=c[f++])>>16&240|k>>12&15,k=k>>0&240|k>>28&15;w[L++]=O,w[L++]=k}}function ht(c,f,y,w,L){for(y=f+y;f<y;){var O=(k=c[f++])>>16&248|k>>13&7,k=k>>5&224|k>>3&31;w[L++]=O,w[L++]=k}}function $e(c,f,y,w,L){for(y=f+y;f<y;){var O=c[f++];w[L++]=O>>0&255,w[L++]=O>>8&255,w[L++]=O>>16&255}}function ct(c,f,y,w,L,O){if(O==0)for(y=f+y;f<y;)Ce(w,((O=c[f++])[0]>>24|O[1]>>8&65280|O[2]<<8&16711680|O[3]<<24)>>>0),L+=32;else i(w,L,c,f,y)}function It(c,f){H[f][0]=H[c+"0"],H[f][1]=H[c+"1"],H[f][2]=H[c+"2"],H[f][3]=H[c+"3"],H[f][4]=H[c+"4"],H[f][5]=H[c+"5"],H[f][6]=H[c+"6"],H[f][7]=H[c+"7"],H[f][8]=H[c+"8"],H[f][9]=H[c+"9"],H[f][10]=H[c+"10"],H[f][11]=H[c+"11"],H[f][12]=H[c+"12"],H[f][13]=H[c+"13"],H[f][14]=H[c+"0"],H[f][15]=H[c+"0"]}function mt(c){return c==mu||c==gu||c==Cl||c==vu}function St(){this.eb=[],this.size=this.A=this.fb=0}function Be(){this.y=[],this.f=[],this.ea=[],this.F=[],this.Tc=this.Ed=this.Cd=this.Fd=this.lb=this.Db=this.Ab=this.fa=this.J=this.W=this.N=this.O=0}function le(){this.Rd=this.height=this.width=this.S=0,this.f={},this.f.RGBA=new St,this.f.kb=new Be,this.sd=null}function Ke(){this.width=[0],this.height=[0],this.Pd=[0],this.Qd=[0],this.format=[0]}function We(){this.Id=this.fd=this.Md=this.hb=this.ib=this.da=this.bd=this.cd=this.j=this.v=this.Da=this.Sd=this.ob=0}function Ye(c){return alert("todo:WebPSamplerProcessPlane"),c.T}function Ze(c,f){var y=c.T,w=f.ba.f.RGBA,L=w.eb,O=w.fb+c.ka*w.A,k=ki[f.ba.S],z=c.y,W=c.O,$=c.f,ue=c.N,Se=c.ea,we=c.W,me=f.cc,Ue=f.dc,Le=f.Mc,he=f.Nc,de=c.ka,De=c.ka+c.T,ke=c.U,Fe=ke+1>>1;for(de==0?k(z,W,null,null,$,ue,Se,we,$,ue,Se,we,L,O,null,null,ke):(k(f.ec,f.fc,z,W,me,Ue,Le,he,$,ue,Se,we,L,O-w.A,L,O,ke),++y);de+2<De;de+=2)me=$,Ue=ue,Le=Se,he=we,ue+=c.Rc,we+=c.Rc,O+=2*w.A,k(z,(W+=2*c.fa)-c.fa,z,W,me,Ue,Le,he,$,ue,Se,we,L,O-w.A,L,O,ke);return W+=c.fa,c.j+De<c.o?(i(f.ec,f.fc,z,W,ke),i(f.cc,f.dc,$,ue,Fe),i(f.Mc,f.Nc,Se,we,Fe),y--):1&De||k(z,W,null,null,$,ue,Se,we,$,ue,Se,we,L,O+w.A,null,null,ke),y}function Bt(c,f,y){var w=c.F,L=[c.J];if(w!=null){var O=c.U,k=f.ba.S,z=k==Ll||k==Cl;f=f.ba.f.RGBA;var W=[0],$=c.ka;W[0]=c.T,c.Kb&&($==0?--W[0]:(--$,L[0]-=c.width),c.j+c.ka+c.T==c.o&&(W[0]=c.o-c.j-$));var ue=f.eb;$=f.fb+$*f.A,c=rn(w,L[0],c.width,O,W,ue,$+(z?0:3),f.A),e(y==W),c&&mt(k)&&Ui(ue,$,z,O,W,f.A)}return 0}function Et(c){var f=c.ma,y=f.ba.S,w=11>y,L=y==El||y==Tl||y==Ll||y==pu||y==12||mt(y);if(f.memory=null,f.Ib=null,f.Jb=null,f.Nd=null,!wo(f.Oa,c,L?11:12))return 0;if(L&&mt(y)&&Ge(),c.da)alert("todo:use_scaling");else{if(w){if(f.Ib=Ye,c.Kb){if(y=c.U+1>>1,f.memory=s(c.U+2*y),f.memory==null)return 0;f.ec=f.memory,f.fc=0,f.cc=f.ec,f.dc=f.fc+c.U,f.Mc=f.cc,f.Nc=f.dc+y,f.Ib=Ze,Ge()}}else alert("todo:EmitYUV");L&&(f.Jb=Bt,w&&ve())}if(w&&!Nd){for(c=0;256>c;++c)H0[c]=89858*(c-128)+Pl>>Rl,W0[c]=-22014*(c-128)+Pl,q0[c]=-45773*(c-128),V0[c]=113618*(c-128)+Pl>>Rl;for(c=No;c<bu;++c)f=76283*(c-16)+Pl>>Rl,j0[c-No]=xi(f,255),X0[c-No]=xi(f+8>>4,15);Nd=1}return 1}function qt(c){var f=c.ma,y=c.U,w=c.T;return e(!(1&c.ka)),0>=y||0>=w?0:(y=f.Ib(c,f),f.Jb!=null&&f.Jb(c,f,y),f.Dc+=y,1)}function tn(c){c.ma.memory=null}function tt(c,f,y,w){return ae(c,8)!=47?0:(f[0]=ae(c,14)+1,y[0]=ae(c,14)+1,w[0]=ae(c,1),ae(c,3)!=0?0:!c.h)}function Jt(c,f){if(4>c)return c+1;var y=c-2>>1;return(2+(1&c)<<y)+ae(f,y)+1}function gn(c,f){return 120<f?f-120:1<=(y=((y=L0[f-1])>>4)*c+(8-(15&y)))?y:1;var y}function Bn(c,f,y){var w=F(y),L=c[f+=255&w].g-8;return 0<L&&(K(y,y.u+8),w=F(y),f+=c[f].value,f+=w&(1<<L)-1),K(y,y.u+c[f].g),c[f].value}function vn(c,f,y){return y.g+=c.g,y.value+=c.value<<f>>>0,e(8>=y.g),c.g}function sn(c,f,y){var w=c.xc;return e((f=w==0?0:c.vc[c.md*(y>>w)+(f>>w)])<c.Wb),c.Ya[f]}function qn(c,f,y,w){var L=c.ab,O=c.c*f,k=c.C;f=k+f;var z=y,W=w;for(w=c.Ta,y=c.Ua;0<L--;){var $=c.gc[L],ue=k,Se=f,we=z,me=W,Ue=(W=w,z=y,$.Ea);switch(e(ue<Se),e(Se<=$.nc),$.hc){case 2:yl(we,me,(Se-ue)*Ue,W,z);break;case 0:var Le=ue,he=Se,de=W,De=z,ke=(rt=$).Ea;Le==0&&(du(we,me,null,null,1,de,De),Oe(we,me+1,0,0,ke-1,de,De+1),me+=ke,De+=ke,++Le);for(var Fe=1<<rt.b,ot=Fe-1,Qe=He(ke,rt.b),vt=rt.K,rt=rt.w+(Le>>rt.b)*Qe;Le<he;){var Vt=vt,Wt=rt,Gt=1;for(Eo(we,me,de,De-ke,1,de,De);Gt<ke;){var Ot=(Gt&~ot)+Fe;Ot>ke&&(Ot=ke),(0,Xr[Vt[Wt++]>>8&15])(we,me+ +Gt,de,De+Gt-ke,Ot-Gt,de,De+Gt),Gt=Ot}me+=ke,De+=ke,++Le&ot||(rt+=Qe)}Se!=$.nc&&i(W,z-Ue,W,z+(Se-ue-1)*Ue,Ue);break;case 1:for(Ue=we,he=me,ke=(we=$.Ea)-(De=we&~(de=(me=1<<$.b)-1)),Le=He(we,$.b),Fe=$.K,$=$.w+(ue>>$.b)*Le;ue<Se;){for(ot=Fe,Qe=$,vt=new se,rt=he+De,Vt=he+we;he<rt;)nt(ot[Qe++],vt),Ls(vt,Ue,he,me,W,z),he+=me,z+=me;he<Vt&&(nt(ot[Qe++],vt),Ls(vt,Ue,he,ke,W,z),he+=ke,z+=ke),++ue&de||($+=Le)}break;case 3:if(we==W&&me==z&&0<$.b){for(he=W,we=Ue=z+(Se-ue)*Ue-(De=(Se-ue)*He($.Ea,$.b)),me=W,de=z,Le=[],De=(ke=De)-1;0<=De;--De)Le[De]=me[de+De];for(De=ke-1;0<=De;--De)he[we+De]=Le[De];Ii($,ue,Se,W,Ue,W,z)}else Ii($,ue,Se,we,me,W,z)}z=w,W=y}W!=y&&i(w,y,z,W,O)}function Wi(c,f){var y=c.V,w=c.Ba+c.c*c.C,L=f-c.C;if(e(f<=c.l.o),e(16>=L),0<L){var O=c.l,k=c.Ta,z=c.Ua,W=O.width;if(qn(c,L,y,w),L=z=[z],e((y=c.C)<(w=f)),e(O.v<O.va),w>O.o&&(w=O.o),y<O.j){var $=O.j-y;y=O.j,L[0]+=$*W}if(y>=w?y=0:(L[0]+=4*O.v,O.ka=y-O.j,O.U=O.va-O.v,O.T=w-y,y=1),y){if(z=z[0],11>(y=c.ca).S){var ue=y.f.RGBA,Se=(w=y.S,L=O.U,O=O.T,$=ue.eb,ue.A),we=O;for(ue=ue.fb+c.Ma*ue.A;0<we--;){var me=k,Ue=z,Le=L,he=$,de=ue;switch(w){case Al:di(me,Ue,Le,he,de);break;case El:ti(me,Ue,Le,he,de);break;case mu:ti(me,Ue,Le,he,de),Ui(he,de,0,Le,1,0);break;case wd:Lr(me,Ue,Le,he,de);break;case Tl:ct(me,Ue,Le,he,de,1);break;case gu:ct(me,Ue,Le,he,de,1),Ui(he,de,0,Le,1,0);break;case Ll:ct(me,Ue,Le,he,de,0);break;case Cl:ct(me,Ue,Le,he,de,0),Ui(he,de,1,Le,1,0);break;case pu:Yr(me,Ue,Le,he,de);break;case vu:Yr(me,Ue,Le,he,de),nn(he,de,Le,1,0);break;case Md:Tr(me,Ue,Le,he,de);break;default:e(0)}z+=W,ue+=Se}c.Ma+=O}else alert("todo:EmitRescaledRowsYUVA");e(c.Ma<=y.height)}}c.C=f,e(c.C<=c.i)}function Ri(c){var f;if(0<c.ua)return 0;for(f=0;f<c.Wb;++f){var y=c.Ya[f].G,w=c.Ya[f].H;if(0<y[1][w[1]+0].g||0<y[2][w[2]+0].g||0<y[3][w[3]+0].g)return 0}return 1}function ci(c,f,y,w,L,O){if(c.Z!=0){var k=c.qd,z=c.rd;for(e(Zr[c.Z]!=null);f<y;++f)Zr[c.Z](k,z,w,L,w,L,O),k=w,z=L,L+=O;c.qd=k,c.rd=z}}function yi(c,f){var y=c.l.ma,w=y.Z==0||y.Z==1?c.l.j:c.C;if(w=c.C<w?w:c.C,e(f<=c.l.o),f>w){var L=c.l.width,O=y.ca,k=y.tb+L*w,z=c.V,W=c.Ba+c.c*w,$=c.gc;e(c.ab==1),e($[0].hc==3),bl($[0],w,f,z,W,O,k),ci(y,w,f,O,k,L)}c.C=c.Ma=f}function bi(c,f,y,w,L,O,k){var z=c.$/w,W=c.$%w,$=c.m,ue=c.s,Se=y+c.$,we=Se;L=y+w*L;var me=y+w*O,Ue=280+ue.ua,Le=c.Pb?z:16777216,he=0<ue.ua?ue.Wa:null,de=ue.wc,De=Se<me?sn(ue,W,z):null;e(c.C<O),e(me<=L);var ke=!1;e:for(;;){for(;ke||Se<me;){var Fe=0;if(z>=Le){var ot=Se-y;e((Le=c).Pb),Le.wd=Le.m,Le.xd=ot,0<Le.s.ua&&_e(Le.s.Wa,Le.s.vb),Le=z+R0}if(W&de||(De=sn(ue,W,z)),e(De!=null),De.Qb&&(f[Se]=De.qb,ke=!0),!ke)if(ne($),De.jc){Fe=$,ot=f;var Qe=Se,vt=De.pd[F(Fe)&zn-1];e(De.jc),256>vt.g?(K(Fe,Fe.u+vt.g),ot[Qe]=vt.value,Fe=0):(K(Fe,Fe.u+vt.g-256),e(256<=vt.value),Fe=vt.value),Fe==0&&(ke=!0)}else Fe=Bn(De.G[0],De.H[0],$);if($.h)break;if(ke||256>Fe){if(!ke)if(De.nd)f[Se]=(De.qb|Fe<<8)>>>0;else{if(ne($),ke=Bn(De.G[1],De.H[1],$),ne($),ot=Bn(De.G[2],De.H[2],$),Qe=Bn(De.G[3],De.H[3],$),$.h)break;f[Se]=(Qe<<24|ke<<16|Fe<<8|ot)>>>0}if(ke=!1,++Se,++W>=w&&(W=0,++z,k!=null&&z<=O&&!(z%16)&&k(c,z),he!=null))for(;we<Se;)Fe=f[we++],he.X[(506832829*Fe&4294967295)>>>he.Mb]=Fe}else if(280>Fe){if(Fe=Jt(Fe-256,$),ot=Bn(De.G[4],De.H[4],$),ne($),ot=gn(w,ot=Jt(ot,$)),$.h)break;if(Se-y<ot||L-Se<Fe)break e;for(Qe=0;Qe<Fe;++Qe)f[Se+Qe]=f[Se+Qe-ot];for(Se+=Fe,W+=Fe;W>=w;)W-=w,++z,k!=null&&z<=O&&!(z%16)&&k(c,z);if(e(Se<=L),W&de&&(De=sn(ue,W,z)),he!=null)for(;we<Se;)Fe=f[we++],he.X[(506832829*Fe&4294967295)>>>he.Mb]=Fe}else{if(!(Fe<Ue))break e;for(ke=Fe-280,e(he!=null);we<Se;)Fe=f[we++],he.X[(506832829*Fe&4294967295)>>>he.Mb]=Fe;Fe=Se,e(!(ke>>>(ot=he).Xa)),f[Fe]=ot.X[ke],ke=!0}ke||e($.h==V($))}if(c.Pb&&$.h&&Se<L)e(c.m.h),c.a=5,c.m=c.wd,c.$=c.xd,0<c.s.ua&&_e(c.s.vb,c.s.Wa);else{if($.h)break e;k!=null&&k(c,z>O?O:z),c.a=0,c.$=Se-y}return 1}return c.a=3,0}function Pi(c){e(c!=null),c.vc=null,c.yc=null,c.Ya=null;var f=c.Wa;f!=null&&(f.X=null),c.vb=null,e(c!=null)}function j(){var c=new hu;return c==null?null:(c.a=0,c.xb=Td,It("Predictor","VP8LPredictors"),It("Predictor","VP8LPredictors_C"),It("PredictorAdd","VP8LPredictorsAdd"),It("PredictorAdd","VP8LPredictorsAdd_C"),yl=je,Ls=Je,di=ze,ti=pt,Yr=it,Tr=ht,Lr=$e,H.VP8LMapColor32b=da,H.VP8LMapColor8b=xl,c)}function ge(c,f,y,w,L){var O=1,k=[c],z=[f],W=w.m,$=w.s,ue=null,Se=0;e:for(;;){if(y)for(;O&&ae(W,1);){var we=k,me=z,Ue=w,Le=1,he=Ue.m,de=Ue.gc[Ue.ab],De=ae(he,2);if(Ue.Oc&1<<De)O=0;else{switch(Ue.Oc|=1<<De,de.hc=De,de.Ea=we[0],de.nc=me[0],de.K=[null],++Ue.ab,e(4>=Ue.ab),De){case 0:case 1:de.b=ae(he,3)+2,Le=ge(He(de.Ea,de.b),He(de.nc,de.b),0,Ue,de.K),de.K=de.K[0];break;case 3:var ke,Fe=ae(he,8)+1,ot=16<Fe?0:4<Fe?1:2<Fe?2:3;if(we[0]=He(de.Ea,ot),de.b=ot,ke=Le=ge(Fe,1,0,Ue,de.K)){var Qe,vt=Fe,rt=de,Vt=1<<(8>>rt.b),Wt=s(Vt);if(Wt==null)ke=0;else{var Gt=rt.K[0],Ot=rt.w;for(Wt[0]=rt.K[0][0],Qe=1;Qe<1*vt;++Qe)Wt[Qe]=B(Gt[Ot+Qe],Wt[Qe-1]);for(;Qe<4*Vt;++Qe)Wt[Qe]=0;rt.K[0]=null,rt.K[0]=Wt,ke=1}}Le=ke;break;case 2:break;default:e(0)}O=Le}}if(k=k[0],z=z[0],O&&ae(W,1)&&!(O=1<=(Se=ae(W,4))&&11>=Se)){w.a=3;break e}var Qt;if(Qt=O)t:{var Yt,Nt,En,fi=w,Tn=k,pi=z,jt=Se,wi=y,Mi=fi.m,Fn=fi.s,Gn=[null],ii=1,Bi=0,pr=C0[jt];n:for(;;){if(wi&&ae(Mi,1)){var Un=ae(Mi,3)+2,Nr=He(Tn,Un),Is=He(pi,Un),va=Nr*Is;if(!ge(Nr,Is,0,fi,Gn))break n;for(Gn=Gn[0],Fn.xc=Un,Yt=0;Yt<va;++Yt){var Qr=Gn[Yt]>>8&65535;Gn[Yt]=Qr,Qr>=ii&&(ii=Qr+1)}}if(Mi.h)break n;for(Nt=0;5>Nt;++Nt){var pn=Ad[Nt];!Nt&&0<jt&&(pn+=1<<jt),Bi<pn&&(Bi=pn)}var xu=a(ii*pr,R),Fd=ii,Ud=a(Fd,N);if(Ud==null)var Il=null;else e(65536>=Fd),Il=Ud;var Io=s(Bi);if(Il==null||Io==null||xu==null){fi.a=1;break n}var Dl=xu;for(Yt=En=0;Yt<ii;++Yt){var $i=Il[Yt],_a=$i.G,ya=$i.H,Od=0,Fl=1,kd=0;for(Nt=0;5>Nt;++Nt){pn=Ad[Nt],_a[Nt]=Dl,ya[Nt]=En,!Nt&&0<jt&&(pn+=1<<jt);r:{var Ul,Su=pn,Ol=fi,Do=Io,J0=Dl,K0=En,wu=0,es=Ol.m,Z0=ae(es,1);if(r(Do,0,0,Su),Z0){var Q0=ae(es,1)+1,eg=ae(es,1),Bd=ae(es,eg==0?1:8);Do[Bd]=1,Q0==2&&(Do[Bd=ae(es,8)]=1);var kl=1}else{var zd=s(19),Gd=ae(es,4)+4;if(19<Gd){Ol.a=3;var Bl=0;break r}for(Ul=0;Ul<Gd;++Ul)zd[T0[Ul]]=ae(es,3);var Mu=void 0,Fo=void 0,Hd=Ol,tg=zd,zl=Su,Vd=Do,Au=0,ts=Hd.m,qd=8,Wd=a(128,R);i:for(;E(Wd,0,7,tg,19);){if(ae(ts,1)){var ng=2+2*ae(ts,3);if((Mu=2+ae(ts,ng))>zl)break i}else Mu=zl;for(Fo=0;Fo<zl&&Mu--;){ne(ts);var jd=Wd[0+(127&F(ts))];K(ts,ts.u+jd.g);var ba=jd.value;if(16>ba)Vd[Fo++]=ba,ba!=0&&(qd=ba);else{var ig=ba==16,Xd=ba-16,rg=A0[Xd],Yd=ae(ts,M0[Xd])+rg;if(Fo+Yd>zl)break i;for(var sg=ig?qd:0;0<Yd--;)Vd[Fo++]=sg}}Au=1;break i}Au||(Hd.a=3),kl=Au}(kl=kl&&!es.h)&&(wu=E(J0,K0,8,Do,Su)),kl&&wu!=0?Bl=wu:(Ol.a=3,Bl=0)}if(Bl==0)break n;if(Fl&&E0[Nt]==1&&(Fl=Dl[En].g==0),Od+=Dl[En].g,En+=Bl,3>=Nt){var Uo,Eu=Io[0];for(Uo=1;Uo<pn;++Uo)Io[Uo]>Eu&&(Eu=Io[Uo]);kd+=Eu}}if($i.nd=Fl,$i.Qb=0,Fl&&($i.qb=(_a[3][ya[3]+0].value<<24|_a[1][ya[1]+0].value<<16|_a[2][ya[2]+0].value)>>>0,Od==0&&256>_a[0][ya[0]+0].value&&($i.Qb=1,$i.qb+=_a[0][ya[0]+0].value<<8)),$i.jc=!$i.Qb&&6>kd,$i.jc){var Gl,Ir=$i;for(Gl=0;Gl<zn;++Gl){var ns=Gl,is=Ir.pd[ns],Hl=Ir.G[0][Ir.H[0]+ns];256<=Hl.value?(is.g=Hl.g+256,is.value=Hl.value):(is.g=0,is.value=0,ns>>=vn(Hl,8,is),ns>>=vn(Ir.G[1][Ir.H[1]+ns],16,is),ns>>=vn(Ir.G[2][Ir.H[2]+ns],0,is),vn(Ir.G[3][Ir.H[3]+ns],24,is))}}}Fn.vc=Gn,Fn.Wb=ii,Fn.Ya=Il,Fn.yc=xu,Qt=1;break t}Qt=0}if(!(O=Qt)){w.a=3;break e}if(0<Se){if($.ua=1<<Se,!Ve($.Wa,Se)){w.a=1,O=0;break e}}else $.ua=0;var Tu=w,$d=k,ag=z,Lu=Tu.s,Cu=Lu.xc;if(Tu.c=$d,Tu.i=ag,Lu.md=He($d,Cu),Lu.wc=Cu==0?-1:(1<<Cu)-1,y){w.xb=O0;break e}if((ue=s(k*z))==null){w.a=1,O=0;break e}O=(O=bi(w,ue,0,k,z,z,null))&&!W.h;break e}return O?(L!=null?L[0]=ue:(e(ue==null),e(y)),w.$=0,y||Pi($)):Pi($),O}function Ee(c,f){var y=c.c*c.i,w=y+f+16*f;return e(c.c<=f),c.V=s(w),c.V==null?(c.Ta=null,c.Ua=0,c.a=1,0):(c.Ta=c.V,c.Ua=c.Ba+y+f,1)}function Te(c,f){var y=c.C,w=f-y,L=c.V,O=c.Ba+c.c*y;for(e(f<=c.l.o);0<w;){var k=16<w?16:w,z=c.l.ma,W=c.l.width,$=W*k,ue=z.ca,Se=z.tb+W*y,we=c.Ta,me=c.Ua;qn(c,k,L,O),yn(we,me,ue,Se,$),ci(z,y,y+k,ue,Se,W),w-=k,L+=k*c.c,y+=k}e(y==f),c.C=c.Ma=f}function Ae(){this.ub=this.yd=this.td=this.Rb=0}function st(){this.Kd=this.Ld=this.Ud=this.Td=this.i=this.c=0}function dt(){this.Fb=this.Bb=this.Cb=0,this.Zb=s(4),this.Lb=s(4)}function gt(){this.Yb=function(){var c=[];return function f(y,w,L){for(var O=L[w],k=0;k<O&&(y.push(L.length>w+1?[]:0),!(L.length<w+1));k++)f(y[k],w+1,L)}(c,0,[3,11]),c}()}function yt(){this.jb=s(3),this.Wc=o([4,8],gt),this.Xc=o([4,17],gt)}function Rt(){this.Pc=this.wb=this.Tb=this.zd=0,this.vd=new s(4),this.od=new s(4)}function bt(){this.ld=this.La=this.dd=this.tc=0}function wt(){this.Na=this.la=0}function an(){this.Sc=[0,0],this.Eb=[0,0],this.Qc=[0,0],this.ia=this.lc=0}function Cn(){this.ad=s(384),this.Za=0,this.Ob=s(16),this.$b=this.Ad=this.ia=this.Gc=this.Hc=this.Dd=0}function dn(){this.uc=this.M=this.Nb=0,this.wa=Array(new bt),this.Y=0,this.ya=Array(new Cn),this.aa=0,this.l=new Mt}function ui(){this.y=s(16),this.f=s(8),this.ea=s(8)}function Kt(){this.cb=this.a=0,this.sc="",this.m=new xe,this.Od=new Ae,this.Kc=new st,this.ed=new Rt,this.Qa=new dt,this.Ic=this.$c=this.Aa=0,this.D=new dn,this.Xb=this.Va=this.Hb=this.zb=this.yb=this.Ub=this.za=0,this.Jc=a(8,xe),this.ia=0,this.pb=a(4,an),this.Pa=new yt,this.Bd=this.kc=0,this.Ac=[],this.Bc=0,this.zc=[0,0,0,0],this.Gd=Array(new ui),this.Hd=0,this.rb=Array(new wt),this.sb=0,this.wa=Array(new bt),this.Y=0,this.oc=[],this.pc=0,this.sa=[],this.ta=0,this.qa=[],this.ra=0,this.Ha=[],this.B=this.R=this.Ia=0,this.Ec=[],this.M=this.ja=this.Vb=this.Fc=0,this.ya=Array(new Cn),this.L=this.aa=0,this.gd=o([4,2],bt),this.ga=null,this.Fa=[],this.Cc=this.qc=this.P=0,this.Gb=[],this.Uc=0,this.mb=[],this.nb=0,this.rc=[],this.Ga=this.Vc=0}function Mt(){this.T=this.U=this.ka=this.height=this.width=0,this.y=[],this.f=[],this.ea=[],this.Rc=this.fa=this.W=this.N=this.O=0,this.ma="void",this.put="VP8IoPutHook",this.ac="VP8IoSetupHook",this.bc="VP8IoTeardownHook",this.ha=this.Kb=0,this.data=[],this.hb=this.ib=this.da=this.o=this.j=this.va=this.v=this.Da=this.ob=this.w=0,this.F=[],this.J=0}function Ss(){var c=new Kt;return c!=null&&(c.a=0,c.sc="OK",c.cb=0,c.Xb=0,Po||(Po=cr)),c}function Tt(c,f,y){return c.a==0&&(c.a=f,c.sc=y,c.cb=0),0}function Ni(c,f,y){return 3<=y&&c[f+0]==157&&c[f+1]==1&&c[f+2]==42}function ws(c,f){if(c==null)return 0;if(c.a=0,c.sc="OK",f==null)return Tt(c,2,"null VP8Io passed to VP8GetHeaders()");var y=f.data,w=f.w,L=f.ha;if(4>L)return Tt(c,7,"Truncated header.");var O=y[w+0]|y[w+1]<<8|y[w+2]<<16,k=c.Od;if(k.Rb=!(1&O),k.td=O>>1&7,k.yd=O>>4&1,k.ub=O>>5,3<k.td)return Tt(c,3,"Incorrect keyframe parameters.");if(!k.yd)return Tt(c,4,"Frame not displayable.");w+=3,L-=3;var z=c.Kc;if(k.Rb){if(7>L)return Tt(c,7,"cannot parse picture header");if(!Ni(y,w,L))return Tt(c,3,"Bad code word");z.c=16383&(y[w+4]<<8|y[w+3]),z.Td=y[w+4]>>6,z.i=16383&(y[w+6]<<8|y[w+5]),z.Ud=y[w+6]>>6,w+=7,L-=7,c.za=z.c+15>>4,c.Ub=z.i+15>>4,f.width=z.c,f.height=z.i,f.Da=0,f.j=0,f.v=0,f.va=f.width,f.o=f.height,f.da=0,f.ib=f.width,f.hb=f.height,f.U=f.width,f.T=f.height,r((O=c.Pa).jb,0,255,O.jb.length),e((O=c.Qa)!=null),O.Cb=0,O.Bb=0,O.Fb=1,r(O.Zb,0,0,O.Zb.length),r(O.Lb,0,0,O.Lb)}if(k.ub>L)return Tt(c,7,"bad partition length");J(O=c.m,y,w,k.ub),w+=k.ub,L-=k.ub,k.Rb&&(z.Ld=fe(O),z.Kd=fe(O)),z=c.Qa;var W,$=c.Pa;if(e(O!=null),e(z!=null),z.Cb=fe(O),z.Cb){if(z.Bb=fe(O),fe(O)){for(z.Fb=fe(O),W=0;4>W;++W)z.Zb[W]=fe(O)?ie(O,7):0;for(W=0;4>W;++W)z.Lb[W]=fe(O)?ie(O,6):0}if(z.Bb)for(W=0;3>W;++W)$.jb[W]=fe(O)?Q(O,8):255}else z.Bb=0;if(O.Ka)return Tt(c,3,"cannot parse segment header");if((z=c.ed).zd=fe(O),z.Tb=Q(O,6),z.wb=Q(O,3),z.Pc=fe(O),z.Pc&&fe(O)){for($=0;4>$;++$)fe(O)&&(z.vd[$]=ie(O,6));for($=0;4>$;++$)fe(O)&&(z.od[$]=ie(O,6))}if(c.L=z.Tb==0?0:z.zd?1:2,O.Ka)return Tt(c,3,"cannot parse filter header");var ue=L;if(L=W=w,w=W+ue,z=ue,c.Xb=(1<<Q(c.m,2))-1,ue<3*($=c.Xb))y=7;else{for(W+=3*$,z-=3*$,ue=0;ue<$;++ue){var Se=y[L+0]|y[L+1]<<8|y[L+2]<<16;Se>z&&(Se=z),J(c.Jc[+ue],y,W,Se),W+=Se,z-=Se,L+=3}J(c.Jc[+$],y,W,z),y=W<w?0:5}if(y!=0)return Tt(c,y,"cannot parse partitions");for(y=Q(W=c.m,7),L=fe(W)?ie(W,4):0,w=fe(W)?ie(W,4):0,z=fe(W)?ie(W,4):0,$=fe(W)?ie(W,4):0,W=fe(W)?ie(W,4):0,ue=c.Qa,Se=0;4>Se;++Se){if(ue.Cb){var we=ue.Zb[Se];ue.Fb||(we+=y)}else{if(0<Se){c.pb[Se]=c.pb[0];continue}we=y}var me=c.pb[Se];me.Sc[0]=_u[xi(we+L,127)],me.Sc[1]=yu[xi(we+0,127)],me.Eb[0]=2*_u[xi(we+w,127)],me.Eb[1]=101581*yu[xi(we+z,127)]>>16,8>me.Eb[1]&&(me.Eb[1]=8),me.Qc[0]=_u[xi(we+$,117)],me.Qc[1]=yu[xi(we+W,127)],me.lc=we+W}if(!k.Rb)return Tt(c,4,"Not a key frame.");for(fe(O),k=c.Pa,y=0;4>y;++y){for(L=0;8>L;++L)for(w=0;3>w;++w)for(z=0;11>z;++z)$=pe(O,F0[y][L][w][z])?Q(O,8):I0[y][L][w][z],k.Wc[y][L].Yb[w][z]=$;for(L=0;17>L;++L)k.Xc[y][L]=k.Wc[y][U0[L]]}return c.kc=fe(O),c.kc&&(c.Bd=Q(O,8)),c.cb=1}function cr(c,f,y,w,L,O,k){var z=f[L].Yb[y];for(y=0;16>L;++L){if(!pe(c,z[y+0]))return L;for(;!pe(c,z[y+1]);)if(z=f[++L].Yb[0],y=0,L==16)return 16;var W=f[L+1].Yb;if(pe(c,z[y+2])){var $=c,ue=0;if(pe($,(we=z)[(Se=y)+3]))if(pe($,we[Se+6])){for(z=0,Se=2*(ue=pe($,we[Se+8]))+(we=pe($,we[Se+9+ue])),ue=0,we=P0[Se];we[z];++z)ue+=ue+pe($,we[z]);ue+=3+(8<<Se)}else pe($,we[Se+7])?(ue=7+2*pe($,165),ue+=pe($,145)):ue=5+pe($,159);else ue=pe($,we[Se+4])?3+pe($,we[Se+5]):2;z=W[2]}else ue=1,z=W[1];W=k+N0[L],0>($=c).b&&ce($);var Se,we=$.b,me=(Se=$.Ca>>1)-($.I>>we)>>31;--$.b,$.Ca+=me,$.Ca|=1,$.I-=(Se+1&me)<<we,O[W]=((ue^me)-me)*w[(0<L)+0]}return 16}function wr(c){var f=c.rb[c.sb-1];f.la=0,f.Na=0,r(c.zc,0,0,c.zc.length),c.ja=0}function Mn(c,f){if(c==null)return 0;if(f==null)return Tt(c,2,"NULL VP8Io parameter in VP8Decode().");if(!c.cb&&!ws(c,f))return 0;if(e(c.cb),f.ac==null||f.ac(f)){f.ob&&(c.L=0);var y=Nl[c.L];if(c.L==2?(c.yb=0,c.zb=0):(c.yb=f.v-y>>4,c.zb=f.j-y>>4,0>c.yb&&(c.yb=0),0>c.zb&&(c.zb=0)),c.Va=f.o+15+y>>4,c.Hb=f.va+15+y>>4,c.Hb>c.za&&(c.Hb=c.za),c.Va>c.Ub&&(c.Va=c.Ub),0<c.L){var w=c.ed;for(y=0;4>y;++y){var L;if(c.Qa.Cb){var O=c.Qa.Lb[y];c.Qa.Fb||(O+=w.Tb)}else O=w.Tb;for(L=0;1>=L;++L){var k=c.gd[y][L],z=O;if(w.Pc&&(z+=w.vd[0],L&&(z+=w.od[0])),0<(z=0>z?0:63<z?63:z)){var W=z;0<w.wb&&(W=4<w.wb?W>>2:W>>1)>9-w.wb&&(W=9-w.wb),1>W&&(W=1),k.dd=W,k.tc=2*z+W,k.ld=40<=z?2:15<=z?1:0}else k.tc=0;k.La=L}}}y=0}else Tt(c,6,"Frame setup failed"),y=c.a;if(y=y==0){if(y){c.$c=0,0<c.Aa||(c.Ic=$0);e:{y=c.Ic,w=4*(W=c.za);var $=32*W,ue=W+1,Se=0<c.L?W*(0<c.Aa?2:1):0,we=(c.Aa==2?2:1)*W;if((k=w+832+(L=3*(16*y+Nl[c.L])/2*$)+(O=c.Fa!=null&&0<c.Fa.length?c.Kc.c*c.Kc.i:0))!=k)y=0;else{if(k>c.Vb){if(c.Vb=0,c.Ec=s(k),c.Fc=0,c.Ec==null){y=Tt(c,1,"no memory during frame initialization.");break e}c.Vb=k}k=c.Ec,z=c.Fc,c.Ac=k,c.Bc=z,z+=w,c.Gd=a($,ui),c.Hd=0,c.rb=a(ue+1,wt),c.sb=1,c.wa=Se?a(Se,bt):null,c.Y=0,c.D.Nb=0,c.D.wa=c.wa,c.D.Y=c.Y,0<c.Aa&&(c.D.Y+=W),e(!0),c.oc=k,c.pc=z,z+=832,c.ya=a(we,Cn),c.aa=0,c.D.ya=c.ya,c.D.aa=c.aa,c.Aa==2&&(c.D.aa+=W),c.R=16*W,c.B=8*W,W=($=Nl[c.L])*c.R,$=$/2*c.B,c.sa=k,c.ta=z+W,c.qa=c.sa,c.ra=c.ta+16*y*c.R+$,c.Ha=c.qa,c.Ia=c.ra+8*y*c.B+$,c.$c=0,z+=L,c.mb=O?k:null,c.nb=O?z:null,e(z+O<=c.Fc+c.Vb),wr(c),r(c.Ac,c.Bc,0,w),y=1}}if(y){if(f.ka=0,f.y=c.sa,f.O=c.ta,f.f=c.qa,f.N=c.ra,f.ea=c.Ha,f.Vd=c.Ia,f.fa=c.R,f.Rc=c.B,f.F=null,f.J=0,!wl){for(y=-255;255>=y;++y)Pn[255+y]=0>y?-y:y;for(y=-1020;1020>=y;++y)Rr[1020+y]=-128>y?-128:127<y?127:y;for(y=-112;112>=y;++y)Ro[112+y]=-16>y?-16:15<y?15:y;for(y=-255;510>=y;++y)ga[255+y]=0>y?0:255<y?255:y;wl=1}fa=Kc,Cr=Qs,To=al,ni=Jc,Di=ol,_n=Zs,pa=po,Sl=Es,Lo=uu,Cs=mo,Rs=cu,$r=ra,Ps=go,ma=gl,Ns=ml,Jr=dr,Co=Er,Fi=lu,Yi[0]=hr,Yi[1]=Zc,Yi[2]=nu,Yi[3]=iu,Yi[4]=ul,Yi[5]=na,Yi[6]=hl,Yi[7]=uo,Yi[8]=su,Yi[9]=ru,Kr[0]=ll,Kr[1]=eu,Kr[2]=Ar,Kr[3]=ea,Kr[4]=Wn,Kr[5]=tu,Kr[6]=cl,Pr[0]=qr,Pr[1]=Qc,Pr[2]=au,Pr[3]=ho,Pr[4]=As,Pr[5]=ou,Pr[6]=fo,y=1}else y=0}y&&(y=function(me,Ue){for(me.M=0;me.M<me.Va;++me.M){var Le,he=me.Jc[me.M&me.Xb],de=me.m,De=me;for(Le=0;Le<De.za;++Le){var ke=de,Fe=De,ot=Fe.Ac,Qe=Fe.Bc+4*Le,vt=Fe.zc,rt=Fe.ya[Fe.aa+Le];if(Fe.Qa.Bb?rt.$b=pe(ke,Fe.Pa.jb[0])?2+pe(ke,Fe.Pa.jb[2]):pe(ke,Fe.Pa.jb[1]):rt.$b=0,Fe.kc&&(rt.Ad=pe(ke,Fe.Bd)),rt.Za=!pe(ke,145)+0,rt.Za){var Vt=rt.Ob,Wt=0;for(Fe=0;4>Fe;++Fe){var Gt,Ot=vt[0+Fe];for(Gt=0;4>Gt;++Gt){Ot=D0[ot[Qe+Gt]][Ot];for(var Qt=Ed[pe(ke,Ot[0])];0<Qt;)Qt=Ed[2*Qt+pe(ke,Ot[Qt])];Ot=-Qt,ot[Qe+Gt]=Ot}i(Vt,Wt,ot,Qe,4),Wt+=4,vt[0+Fe]=Ot}}else Ot=pe(ke,156)?pe(ke,128)?1:3:pe(ke,163)?2:0,rt.Ob[0]=Ot,r(ot,Qe,Ot,4),r(vt,0,Ot,4);rt.Dd=pe(ke,142)?pe(ke,114)?pe(ke,183)?1:3:2:0}if(De.m.Ka)return Tt(me,7,"Premature end-of-partition0 encountered.");for(;me.ja<me.za;++me.ja){if(De=he,ke=(de=me).rb[de.sb-1],ot=de.rb[de.sb+de.ja],Le=de.ya[de.aa+de.ja],Qe=de.kc?Le.Ad:0)ke.la=ot.la=0,Le.Za||(ke.Na=ot.Na=0),Le.Hc=0,Le.Gc=0,Le.ia=0;else{var Yt,Nt;if(ke=ot,ot=De,Qe=de.Pa.Xc,vt=de.ya[de.aa+de.ja],rt=de.pb[vt.$b],Fe=vt.ad,Vt=0,Wt=de.rb[de.sb-1],Ot=Gt=0,r(Fe,Vt,0,384),vt.Za)var En=0,fi=Qe[3];else{Qt=s(16);var Tn=ke.Na+Wt.Na;if(Tn=Po(ot,Qe[1],Tn,rt.Eb,0,Qt,0),ke.Na=Wt.Na=(0<Tn)+0,1<Tn)fa(Qt,0,Fe,Vt);else{var pi=Qt[0]+3>>3;for(Qt=0;256>Qt;Qt+=16)Fe[Vt+Qt]=pi}En=1,fi=Qe[0]}var jt=15&ke.la,wi=15&Wt.la;for(Qt=0;4>Qt;++Qt){var Mi=1&wi;for(pi=Nt=0;4>pi;++pi)jt=jt>>1|(Mi=(Tn=Po(ot,fi,Tn=Mi+(1&jt),rt.Sc,En,Fe,Vt))>En)<<7,Nt=Nt<<2|(3<Tn?3:1<Tn?2:Fe[Vt+0]!=0),Vt+=16;jt>>=4,wi=wi>>1|Mi<<7,Gt=(Gt<<8|Nt)>>>0}for(fi=jt,En=wi>>4,Yt=0;4>Yt;Yt+=2){for(Nt=0,jt=ke.la>>4+Yt,wi=Wt.la>>4+Yt,Qt=0;2>Qt;++Qt){for(Mi=1&wi,pi=0;2>pi;++pi)Tn=Mi+(1&jt),jt=jt>>1|(Mi=0<(Tn=Po(ot,Qe[2],Tn,rt.Qc,0,Fe,Vt)))<<3,Nt=Nt<<2|(3<Tn?3:1<Tn?2:Fe[Vt+0]!=0),Vt+=16;jt>>=2,wi=wi>>1|Mi<<5}Ot|=Nt<<4*Yt,fi|=jt<<4<<Yt,En|=(240&wi)<<Yt}ke.la=fi,Wt.la=En,vt.Hc=Gt,vt.Gc=Ot,vt.ia=43690&Ot?0:rt.ia,Qe=!(Gt|Ot)}if(0<de.L&&(de.wa[de.Y+de.ja]=de.gd[Le.$b][Le.Za],de.wa[de.Y+de.ja].La|=!Qe),De.Ka)return Tt(me,7,"Premature end-of-file encountered.")}if(wr(me),de=Ue,De=1,Le=(he=me).D,ke=0<he.L&&he.M>=he.zb&&he.M<=he.Va,he.Aa==0)e:{if(Le.M=he.M,Le.uc=ke,So(he,Le),De=1,Le=(Nt=he.D).Nb,ke=(Ot=Nl[he.L])*he.R,ot=Ot/2*he.B,Qt=16*Le*he.R,pi=8*Le*he.B,Qe=he.sa,vt=he.ta-ke+Qt,rt=he.qa,Fe=he.ra-ot+pi,Vt=he.Ha,Wt=he.Ia-ot+pi,wi=(jt=Nt.M)==0,Gt=jt>=he.Va-1,he.Aa==2&&So(he,Nt),Nt.uc)for(Mi=(Tn=he).D.M,e(Tn.D.uc),Nt=Tn.yb;Nt<Tn.Hb;++Nt){En=Nt,fi=Mi;var Fn=(Gn=(pn=Tn).D).Nb;Yt=pn.R;var Gn=Gn.wa[Gn.Y+En],ii=pn.sa,Bi=pn.ta+16*Fn*Yt+16*En,pr=Gn.dd,Un=Gn.tc;if(Un!=0)if(e(3<=Un),pn.L==1)0<En&&Jr(ii,Bi,Yt,Un+4),Gn.La&&Fi(ii,Bi,Yt,Un),0<fi&&Ns(ii,Bi,Yt,Un+4),Gn.La&&Co(ii,Bi,Yt,Un);else{var Nr=pn.B,Is=pn.qa,va=pn.ra+8*Fn*Nr+8*En,Qr=pn.Ha,pn=pn.Ia+8*Fn*Nr+8*En;Fn=Gn.ld,0<En&&(Sl(ii,Bi,Yt,Un+4,pr,Fn),Cs(Is,va,Qr,pn,Nr,Un+4,pr,Fn)),Gn.La&&($r(ii,Bi,Yt,Un,pr,Fn),ma(Is,va,Qr,pn,Nr,Un,pr,Fn)),0<fi&&(pa(ii,Bi,Yt,Un+4,pr,Fn),Lo(Is,va,Qr,pn,Nr,Un+4,pr,Fn)),Gn.La&&(Rs(ii,Bi,Yt,Un,pr,Fn),Ps(Is,va,Qr,pn,Nr,Un,pr,Fn))}}if(he.ia&&alert("todo:DitherRow"),de.put!=null){if(Nt=16*jt,jt=16*(jt+1),wi?(de.y=he.sa,de.O=he.ta+Qt,de.f=he.qa,de.N=he.ra+pi,de.ea=he.Ha,de.W=he.Ia+pi):(Nt-=Ot,de.y=Qe,de.O=vt,de.f=rt,de.N=Fe,de.ea=Vt,de.W=Wt),Gt||(jt-=Ot),jt>de.o&&(jt=de.o),de.F=null,de.J=null,he.Fa!=null&&0<he.Fa.length&&Nt<jt&&(de.J=bo(he,de,Nt,jt-Nt),de.F=he.mb,de.F==null&&de.F.length==0)){De=Tt(he,3,"Could not decode alpha data.");break e}Nt<de.j&&(Ot=de.j-Nt,Nt=de.j,e(!(1&Ot)),de.O+=he.R*Ot,de.N+=he.B*(Ot>>1),de.W+=he.B*(Ot>>1),de.F!=null&&(de.J+=de.width*Ot)),Nt<jt&&(de.O+=de.v,de.N+=de.v>>1,de.W+=de.v>>1,de.F!=null&&(de.J+=de.v),de.ka=Nt-de.j,de.U=de.va-de.v,de.T=jt-Nt,De=de.put(de))}Le+1!=he.Ic||Gt||(i(he.sa,he.ta-ke,Qe,vt+16*he.R,ke),i(he.qa,he.ra-ot,rt,Fe+8*he.B,ot),i(he.Ha,he.Ia-ot,Vt,Wt+8*he.B,ot))}if(!De)return Tt(me,6,"Output aborted.")}return 1}(c,f)),f.bc!=null&&f.bc(f),y&=1}return y?(c.cb=0,y):0}function Rn(c,f,y,w,L){L=c[f+y+32*w]+(L>>3),c[f+y+32*w]=-256&L?0>L?0:255:L}function ur(c,f,y,w,L,O){Rn(c,f,0,y,w+L),Rn(c,f,1,y,w+O),Rn(c,f,2,y,w-O),Rn(c,f,3,y,w-L)}function Zt(c){return(20091*c>>16)+c}function Mr(c,f,y,w){var L,O=0,k=s(16);for(L=0;4>L;++L){var z=c[f+0]+c[f+8],W=c[f+0]-c[f+8],$=(35468*c[f+4]>>16)-Zt(c[f+12]),ue=Zt(c[f+4])+(35468*c[f+12]>>16);k[O+0]=z+ue,k[O+1]=W+$,k[O+2]=W-$,k[O+3]=z-ue,O+=4,f++}for(L=O=0;4>L;++L)z=(c=k[O+0]+4)+k[O+8],W=c-k[O+8],$=(35468*k[O+4]>>16)-Zt(k[O+12]),Rn(y,w,0,0,z+(ue=Zt(k[O+4])+(35468*k[O+12]>>16))),Rn(y,w,1,0,W+$),Rn(y,w,2,0,W-$),Rn(y,w,3,0,z-ue),O++,w+=32}function Zs(c,f,y,w){var L=c[f+0]+4,O=35468*c[f+4]>>16,k=Zt(c[f+4]),z=35468*c[f+1]>>16;ur(y,w,0,L+k,c=Zt(c[f+1]),z),ur(y,w,1,L+O,c,z),ur(y,w,2,L-O,c,z),ur(y,w,3,L-k,c,z)}function Qs(c,f,y,w,L){Mr(c,f,y,w),L&&Mr(c,f+16,y,w+4)}function al(c,f,y,w){Cr(c,f+0,y,w,1),Cr(c,f+32,y,w+128,1)}function Jc(c,f,y,w){var L;for(c=c[f+0]+4,L=0;4>L;++L)for(f=0;4>f;++f)Rn(y,w,f,L,c)}function ol(c,f,y,w){c[f+0]&&ni(c,f+0,y,w),c[f+16]&&ni(c,f+16,y,w+4),c[f+32]&&ni(c,f+32,y,w+128),c[f+48]&&ni(c,f+48,y,w+128+4)}function Kc(c,f,y,w){var L,O=s(16);for(L=0;4>L;++L){var k=c[f+0+L]+c[f+12+L],z=c[f+4+L]+c[f+8+L],W=c[f+4+L]-c[f+8+L],$=c[f+0+L]-c[f+12+L];O[0+L]=k+z,O[8+L]=k-z,O[4+L]=$+W,O[12+L]=$-W}for(L=0;4>L;++L)k=(c=O[0+4*L]+3)+O[3+4*L],z=O[1+4*L]+O[2+4*L],W=O[1+4*L]-O[2+4*L],$=c-O[3+4*L],y[w+0]=k+z>>3,y[w+16]=$+W>>3,y[w+32]=k-z>>3,y[w+48]=$-W>>3,w+=64}function co(c,f,y){var w,L=f-32,O=Si,k=255-c[L-1];for(w=0;w<y;++w){var z,W=O,$=k+c[f-1];for(z=0;z<y;++z)c[f+z]=W[$+c[L+z]];f+=32}}function Zc(c,f){co(c,f,4)}function Qc(c,f){co(c,f,8)}function eu(c,f){co(c,f,16)}function Ar(c,f){var y;for(y=0;16>y;++y)i(c,f+32*y,c,f-32,16)}function ea(c,f){var y;for(y=16;0<y;--y)r(c,f,c[f-1],16),f+=32}function ta(c,f,y){var w;for(w=0;16>w;++w)r(f,y+32*w,c,16)}function ll(c,f){var y,w=16;for(y=0;16>y;++y)w+=c[f-1+32*y]+c[f+y-32];ta(w>>5,c,f)}function Wn(c,f){var y,w=8;for(y=0;16>y;++y)w+=c[f-1+32*y];ta(w>>4,c,f)}function tu(c,f){var y,w=8;for(y=0;16>y;++y)w+=c[f+y-32];ta(w>>4,c,f)}function cl(c,f){ta(128,c,f)}function At(c,f,y){return c+2*f+y+2>>2}function nu(c,f){var y,w=f-32;for(w=new Uint8Array([At(c[w-1],c[w+0],c[w+1]),At(c[w+0],c[w+1],c[w+2]),At(c[w+1],c[w+2],c[w+3]),At(c[w+2],c[w+3],c[w+4])]),y=0;4>y;++y)i(c,f+32*y,w,0,w.length)}function iu(c,f){var y=c[f-1],w=c[f-1+32],L=c[f-1+64],O=c[f-1+96];Ce(c,f+0,16843009*At(c[f-1-32],y,w)),Ce(c,f+32,16843009*At(y,w,L)),Ce(c,f+64,16843009*At(w,L,O)),Ce(c,f+96,16843009*At(L,O,O))}function hr(c,f){var y,w=4;for(y=0;4>y;++y)w+=c[f+y-32]+c[f-1+32*y];for(w>>=3,y=0;4>y;++y)r(c,f+32*y,w,4)}function ul(c,f){var y=c[f-1+0],w=c[f-1+32],L=c[f-1+64],O=c[f-1-32],k=c[f+0-32],z=c[f+1-32],W=c[f+2-32],$=c[f+3-32];c[f+0+96]=At(w,L,c[f-1+96]),c[f+1+96]=c[f+0+64]=At(y,w,L),c[f+2+96]=c[f+1+64]=c[f+0+32]=At(O,y,w),c[f+3+96]=c[f+2+64]=c[f+1+32]=c[f+0+0]=At(k,O,y),c[f+3+64]=c[f+2+32]=c[f+1+0]=At(z,k,O),c[f+3+32]=c[f+2+0]=At(W,z,k),c[f+3+0]=At($,W,z)}function hl(c,f){var y=c[f+1-32],w=c[f+2-32],L=c[f+3-32],O=c[f+4-32],k=c[f+5-32],z=c[f+6-32],W=c[f+7-32];c[f+0+0]=At(c[f+0-32],y,w),c[f+1+0]=c[f+0+32]=At(y,w,L),c[f+2+0]=c[f+1+32]=c[f+0+64]=At(w,L,O),c[f+3+0]=c[f+2+32]=c[f+1+64]=c[f+0+96]=At(L,O,k),c[f+3+32]=c[f+2+64]=c[f+1+96]=At(O,k,z),c[f+3+64]=c[f+2+96]=At(k,z,W),c[f+3+96]=At(z,W,W)}function na(c,f){var y=c[f-1+0],w=c[f-1+32],L=c[f-1+64],O=c[f-1-32],k=c[f+0-32],z=c[f+1-32],W=c[f+2-32],$=c[f+3-32];c[f+0+0]=c[f+1+64]=O+k+1>>1,c[f+1+0]=c[f+2+64]=k+z+1>>1,c[f+2+0]=c[f+3+64]=z+W+1>>1,c[f+3+0]=W+$+1>>1,c[f+0+96]=At(L,w,y),c[f+0+64]=At(w,y,O),c[f+0+32]=c[f+1+96]=At(y,O,k),c[f+1+32]=c[f+2+96]=At(O,k,z),c[f+2+32]=c[f+3+96]=At(k,z,W),c[f+3+32]=At(z,W,$)}function uo(c,f){var y=c[f+0-32],w=c[f+1-32],L=c[f+2-32],O=c[f+3-32],k=c[f+4-32],z=c[f+5-32],W=c[f+6-32],$=c[f+7-32];c[f+0+0]=y+w+1>>1,c[f+1+0]=c[f+0+64]=w+L+1>>1,c[f+2+0]=c[f+1+64]=L+O+1>>1,c[f+3+0]=c[f+2+64]=O+k+1>>1,c[f+0+32]=At(y,w,L),c[f+1+32]=c[f+0+96]=At(w,L,O),c[f+2+32]=c[f+1+96]=At(L,O,k),c[f+3+32]=c[f+2+96]=At(O,k,z),c[f+3+64]=At(k,z,W),c[f+3+96]=At(z,W,$)}function ru(c,f){var y=c[f-1+0],w=c[f-1+32],L=c[f-1+64],O=c[f-1+96];c[f+0+0]=y+w+1>>1,c[f+2+0]=c[f+0+32]=w+L+1>>1,c[f+2+32]=c[f+0+64]=L+O+1>>1,c[f+1+0]=At(y,w,L),c[f+3+0]=c[f+1+32]=At(w,L,O),c[f+3+32]=c[f+1+64]=At(L,O,O),c[f+3+64]=c[f+2+64]=c[f+0+96]=c[f+1+96]=c[f+2+96]=c[f+3+96]=O}function su(c,f){var y=c[f-1+0],w=c[f-1+32],L=c[f-1+64],O=c[f-1+96],k=c[f-1-32],z=c[f+0-32],W=c[f+1-32],$=c[f+2-32];c[f+0+0]=c[f+2+32]=y+k+1>>1,c[f+0+32]=c[f+2+64]=w+y+1>>1,c[f+0+64]=c[f+2+96]=L+w+1>>1,c[f+0+96]=O+L+1>>1,c[f+3+0]=At(z,W,$),c[f+2+0]=At(k,z,W),c[f+1+0]=c[f+3+32]=At(y,k,z),c[f+1+32]=c[f+3+64]=At(w,y,k),c[f+1+64]=c[f+3+96]=At(L,w,y),c[f+1+96]=At(O,L,w)}function au(c,f){var y;for(y=0;8>y;++y)i(c,f+32*y,c,f-32,8)}function ho(c,f){var y;for(y=0;8>y;++y)r(c,f,c[f-1],8),f+=32}function Ms(c,f,y){var w;for(w=0;8>w;++w)r(f,y+32*w,c,8)}function qr(c,f){var y,w=8;for(y=0;8>y;++y)w+=c[f+y-32]+c[f-1+32*y];Ms(w>>4,c,f)}function ou(c,f){var y,w=4;for(y=0;8>y;++y)w+=c[f+y-32];Ms(w>>3,c,f)}function As(c,f){var y,w=4;for(y=0;8>y;++y)w+=c[f-1+32*y];Ms(w>>3,c,f)}function fo(c,f){Ms(128,c,f)}function ia(c,f,y){var w=c[f-y],L=c[f+0],O=3*(L-w)+fu[1020+c[f-2*y]-c[f+y]],k=Ml[112+(O+4>>3)];c[f-y]=Si[255+w+Ml[112+(O+3>>3)]],c[f+0]=Si[255+L-k]}function dl(c,f,y,w){var L=c[f+0],O=c[f+y];return Oi[255+c[f-2*y]-c[f-y]]>w||Oi[255+O-L]>w}function fl(c,f,y,w){return 4*Oi[255+c[f-y]-c[f+0]]+Oi[255+c[f-2*y]-c[f+y]]<=w}function pl(c,f,y,w,L){var O=c[f-3*y],k=c[f-2*y],z=c[f-y],W=c[f+0],$=c[f+y],ue=c[f+2*y],Se=c[f+3*y];return 4*Oi[255+z-W]+Oi[255+k-$]>w?0:Oi[255+c[f-4*y]-O]<=L&&Oi[255+O-k]<=L&&Oi[255+k-z]<=L&&Oi[255+Se-ue]<=L&&Oi[255+ue-$]<=L&&Oi[255+$-W]<=L}function ml(c,f,y,w){var L=2*w+1;for(w=0;16>w;++w)fl(c,f+w,y,L)&&ia(c,f+w,y)}function dr(c,f,y,w){var L=2*w+1;for(w=0;16>w;++w)fl(c,f+w*y,1,L)&&ia(c,f+w*y,1)}function Er(c,f,y,w){var L;for(L=3;0<L;--L)ml(c,f+=4*y,y,w)}function lu(c,f,y,w){var L;for(L=3;0<L;--L)dr(c,f+=4,y,w)}function Wr(c,f,y,w,L,O,k,z){for(O=2*O+1;0<L--;){if(pl(c,f,y,O,k))if(dl(c,f,y,z))ia(c,f,y);else{var W=c,$=f,ue=y,Se=W[$-2*ue],we=W[$-ue],me=W[$+0],Ue=W[$+ue],Le=W[$+2*ue],he=27*(De=fu[1020+3*(me-we)+fu[1020+Se-Ue]])+63>>7,de=18*De+63>>7,De=9*De+63>>7;W[$-3*ue]=Si[255+W[$-3*ue]+De],W[$-2*ue]=Si[255+Se+de],W[$-ue]=Si[255+we+he],W[$+0]=Si[255+me-he],W[$+ue]=Si[255+Ue-de],W[$+2*ue]=Si[255+Le-De]}f+=w}}function ji(c,f,y,w,L,O,k,z){for(O=2*O+1;0<L--;){if(pl(c,f,y,O,k))if(dl(c,f,y,z))ia(c,f,y);else{var W=c,$=f,ue=y,Se=W[$-ue],we=W[$+0],me=W[$+ue],Ue=Ml[112+((Le=3*(we-Se))+4>>3)],Le=Ml[112+(Le+3>>3)],he=Ue+1>>1;W[$-2*ue]=Si[255+W[$-2*ue]+he],W[$-ue]=Si[255+Se+Le],W[$+0]=Si[255+we-Ue],W[$+ue]=Si[255+me-he]}f+=w}}function po(c,f,y,w,L,O){Wr(c,f,y,1,16,w,L,O)}function Es(c,f,y,w,L,O){Wr(c,f,1,y,16,w,L,O)}function cu(c,f,y,w,L,O){var k;for(k=3;0<k;--k)ji(c,f+=4*y,y,1,16,w,L,O)}function ra(c,f,y,w,L,O){var k;for(k=3;0<k;--k)ji(c,f+=4,1,y,16,w,L,O)}function uu(c,f,y,w,L,O,k,z){Wr(c,f,L,1,8,O,k,z),Wr(y,w,L,1,8,O,k,z)}function mo(c,f,y,w,L,O,k,z){Wr(c,f,1,L,8,O,k,z),Wr(y,w,1,L,8,O,k,z)}function go(c,f,y,w,L,O,k,z){ji(c,f+4*L,L,1,8,O,k,z),ji(y,w+4*L,L,1,8,O,k,z)}function gl(c,f,y,w,L,O,k,z){ji(c,f+4,1,L,8,O,k,z),ji(y,w+4,1,L,8,O,k,z)}function sa(){this.ba=new le,this.ec=[],this.cc=[],this.Mc=[],this.Dc=this.Nc=this.dc=this.fc=0,this.Oa=new We,this.memory=0,this.Ib="OutputFunc",this.Jb="OutputAlphaFunc",this.Nd="OutputRowFunc"}function vo(){this.data=[],this.offset=this.kd=this.ha=this.w=0,this.na=[],this.xa=this.gb=this.Ja=this.Sa=this.P=0}function _o(){this.nc=this.Ea=this.b=this.hc=0,this.K=[],this.w=0}function vl(){this.ua=0,this.Wa=new Y,this.vb=new Y,this.md=this.xc=this.wc=0,this.vc=[],this.Wb=0,this.Ya=new N,this.yc=new R}function hu(){this.xb=this.a=0,this.l=new Mt,this.ca=new le,this.V=[],this.Ba=0,this.Ta=[],this.Ua=0,this.m=new T,this.Pb=0,this.wd=new T,this.Ma=this.$=this.C=this.i=this.c=this.xd=0,this.s=new vl,this.ab=0,this.gc=a(4,_o),this.Oc=0}function aa(){this.Lc=this.Z=this.$a=this.i=this.c=0,this.l=new Mt,this.ic=0,this.ca=[],this.tb=0,this.qd=null,this.rd=0}function Ts(c,f,y,w,L,O,k){for(c=c==null?0:c[f+0],f=0;f<k;++f)L[O+f]=c+y[w+f]&255,c=L[O+f]}function yo(c,f,y,w,L,O,k){var z;if(c==null)Ts(null,null,y,w,L,O,k);else for(z=0;z<k;++z)L[O+z]=c[f+z]+y[w+z]&255}function jr(c,f,y,w,L,O,k){if(c==null)Ts(null,null,y,w,L,O,k);else{var z,W=c[f+0],$=W,ue=W;for(z=0;z<k;++z)$=ue+(W=c[f+z])-$,ue=y[w+z]+(-256&$?0>$?0:255:$)&255,$=W,L[O+z]=ue}}function bo(c,f,y,w){var L=f.width,O=f.o;if(e(c!=null&&f!=null),0>y||0>=w||y+w>O)return null;if(!c.Cc){if(c.ga==null){var k;if(c.ga=new aa,(k=c.ga==null)||(k=f.width*f.o,e(c.Gb.length==0),c.Gb=s(k),c.Uc=0,c.Gb==null?k=0:(c.mb=c.Gb,c.nb=c.Uc,c.rc=null,k=1),k=!k),!k){k=c.ga;var z=c.Fa,W=c.P,$=c.qc,ue=c.mb,Se=c.nb,we=W+1,me=$-1,Ue=k.l;if(e(z!=null&&ue!=null&&f!=null),Zr[0]=null,Zr[1]=Ts,Zr[2]=yo,Zr[3]=jr,k.ca=ue,k.tb=Se,k.c=f.width,k.i=f.height,e(0<k.c&&0<k.i),1>=$)f=0;else if(k.$a=z[W+0]>>0&3,k.Z=z[W+0]>>2&3,k.Lc=z[W+0]>>4&3,W=z[W+0]>>6&3,0>k.$a||1<k.$a||4<=k.Z||1<k.Lc||W)f=0;else if(Ue.put=qt,Ue.ac=Et,Ue.bc=tn,Ue.ma=k,Ue.width=f.width,Ue.height=f.height,Ue.Da=f.Da,Ue.v=f.v,Ue.va=f.va,Ue.j=f.j,Ue.o=f.o,k.$a)e:{e(k.$a==1),f=j();t:for(;;){if(f==null){f=0;break e}if(e(k!=null),k.mc=f,f.c=k.c,f.i=k.i,f.l=k.l,f.l.ma=k,f.l.width=k.c,f.l.height=k.i,f.a=0,ee(f.m,z,we,me),!ge(k.c,k.i,1,f,null)||(f.ab==1&&f.gc[0].hc==3&&Ri(f.s)?(k.ic=1,z=f.c*f.i,f.Ta=null,f.Ua=0,f.V=s(z),f.Ba=0,f.V==null?(f.a=1,f=0):f=1):(k.ic=0,f=Ee(f,k.c)),!f))break t;f=1;break e}k.mc=null,f=0}else f=me>=k.c*k.i;k=!f}if(k)return null;c.ga.Lc!=1?c.Ga=0:w=O-y}e(c.ga!=null),e(y+w<=O);e:{if(f=(z=c.ga).c,O=z.l.o,z.$a==0){if(we=c.rc,me=c.Vc,Ue=c.Fa,W=c.P+1+y*f,$=c.mb,ue=c.nb+y*f,e(W<=c.P+c.qc),z.Z!=0)for(e(Zr[z.Z]!=null),k=0;k<w;++k)Zr[z.Z](we,me,Ue,W,$,ue,f),we=$,me=ue,ue+=f,W+=f;else for(k=0;k<w;++k)i($,ue,Ue,W,f),we=$,me=ue,ue+=f,W+=f;c.rc=we,c.Vc=me}else{if(e(z.mc!=null),f=y+w,e((k=z.mc)!=null),e(f<=k.i),k.C>=f)f=1;else if(z.ic||ve(),z.ic){z=k.V,we=k.Ba,me=k.c;var Le=k.i,he=(Ue=1,W=k.$/me,$=k.$%me,ue=k.m,Se=k.s,k.$),de=me*Le,De=me*f,ke=Se.wc,Fe=he<De?sn(Se,$,W):null;e(he<=de),e(f<=Le),e(Ri(Se));t:for(;;){for(;!ue.h&&he<De;){if($&ke||(Fe=sn(Se,$,W)),e(Fe!=null),ne(ue),256>(Le=Bn(Fe.G[0],Fe.H[0],ue)))z[we+he]=Le,++he,++$>=me&&($=0,++W<=f&&!(W%16)&&yi(k,W));else{if(!(280>Le)){Ue=0;break t}Le=Jt(Le-256,ue);var ot,Qe=Bn(Fe.G[4],Fe.H[4],ue);if(ne(ue),!(he>=(Qe=gn(me,Qe=Jt(Qe,ue)))&&de-he>=Le)){Ue=0;break t}for(ot=0;ot<Le;++ot)z[we+he+ot]=z[we+he+ot-Qe];for(he+=Le,$+=Le;$>=me;)$-=me,++W<=f&&!(W%16)&&yi(k,W);he<De&&$&ke&&(Fe=sn(Se,$,W))}e(ue.h==V(ue))}yi(k,W>f?f:W);break t}!Ue||ue.h&&he<de?(Ue=0,k.a=ue.h?5:3):k.$=he,f=Ue}else f=bi(k,k.V,k.Ba,k.c,k.i,f,Te);if(!f){w=0;break e}}y+w>=O&&(c.Cc=1),w=1}if(!w)return null;if(c.Cc&&((w=c.ga)!=null&&(w.mc=null),c.ga=null,0<c.Ga))return alert("todo:WebPDequantizeLevels"),null}return c.nb+y*L}function v(c,f,y,w,L,O){for(;0<L--;){var k,z=c,W=f+(y?1:0),$=c,ue=f+(y?0:3);for(k=0;k<w;++k){var Se=$[ue+4*k];Se!=255&&(Se*=32897,z[W+4*k+0]=z[W+4*k+0]*Se>>23,z[W+4*k+1]=z[W+4*k+1]*Se>>23,z[W+4*k+2]=z[W+4*k+2]*Se>>23)}f+=O}}function C(c,f,y,w,L){for(;0<w--;){var O;for(O=0;O<y;++O){var k=c[f+2*O+0],z=15&($=c[f+2*O+1]),W=4369*z,$=(240&$|$>>4)*W>>16;c[f+2*O+0]=(240&k|k>>4)*W>>16&240|(15&k|k<<4)*W>>16>>4&15,c[f+2*O+1]=240&$|z}f+=L}}function Z(c,f,y,w,L,O,k,z){var W,$,ue=255;for($=0;$<L;++$){for(W=0;W<w;++W){var Se=c[f+W];O[k+4*W]=Se,ue&=Se}f+=y,k+=z}return ue!=255}function oe(c,f,y,w,L){var O;for(O=0;O<L;++O)y[w+O]=c[f+O]>>8}function ve(){Ui=v,nn=C,rn=Z,yn=oe}function Ne(c,f,y){H[c]=function(w,L,O,k,z,W,$,ue,Se,we,me,Ue,Le,he,de,De,ke){var Fe,ot=ke-1>>1,Qe=z[W+0]|$[ue+0]<<16,vt=Se[we+0]|me[Ue+0]<<16;e(w!=null);var rt=3*Qe+vt+131074>>2;for(f(w[L+0],255&rt,rt>>16,Le,he),O!=null&&(rt=3*vt+Qe+131074>>2,f(O[k+0],255&rt,rt>>16,de,De)),Fe=1;Fe<=ot;++Fe){var Vt=z[W+Fe]|$[ue+Fe]<<16,Wt=Se[we+Fe]|me[Ue+Fe]<<16,Gt=Qe+Vt+vt+Wt+524296,Ot=Gt+2*(Vt+vt)>>3;rt=Ot+Qe>>1,Qe=(Gt=Gt+2*(Qe+Wt)>>3)+Vt>>1,f(w[L+2*Fe-1],255&rt,rt>>16,Le,he+(2*Fe-1)*y),f(w[L+2*Fe-0],255&Qe,Qe>>16,Le,he+(2*Fe-0)*y),O!=null&&(rt=Gt+vt>>1,Qe=Ot+Wt>>1,f(O[k+2*Fe-1],255&rt,rt>>16,de,De+(2*Fe-1)*y),f(O[k+2*Fe+0],255&Qe,Qe>>16,de,De+(2*Fe+0)*y)),Qe=Vt,vt=Wt}1&ke||(rt=3*Qe+vt+131074>>2,f(w[L+ke-1],255&rt,rt>>16,Le,he+(ke-1)*y),O!=null&&(rt=3*vt+Qe+131074>>2,f(O[k+ke-1],255&rt,rt>>16,de,De+(ke-1)*y)))}}function Ge(){ki[Al]=k0,ki[El]=Ld,ki[wd]=B0,ki[Tl]=Cd,ki[Ll]=Rd,ki[pu]=Pd,ki[Md]=z0,ki[mu]=Ld,ki[gu]=Cd,ki[Cl]=Rd,ki[vu]=Pd}function at(c){return c&-16384?0>c?0:255:c>>G0}function ft(c,f){return at((19077*c>>8)+(26149*f>>8)-14234)}function Pt(c,f,y){return at((19077*c>>8)-(6419*f>>8)-(13320*y>>8)+8708)}function Lt(c,f){return at((19077*c>>8)+(33050*f>>8)-17685)}function zt(c,f,y,w,L){w[L+0]=ft(c,y),w[L+1]=Pt(c,f,y),w[L+2]=Lt(c,f)}function hn(c,f,y,w,L){w[L+0]=Lt(c,f),w[L+1]=Pt(c,f,y),w[L+2]=ft(c,y)}function fn(c,f,y,w,L){var O=Pt(c,f,y);f=O<<3&224|Lt(c,f)>>3,w[L+0]=248&ft(c,y)|O>>5,w[L+1]=f}function An(c,f,y,w,L){var O=240&Lt(c,f)|15;w[L+0]=240&ft(c,y)|Pt(c,f,y)>>4,w[L+1]=O}function jn(c,f,y,w,L){w[L+0]=255,zt(c,f,y,w,L+1)}function Dn(c,f,y,w,L){hn(c,f,y,w,L),w[L+3]=255}function Xi(c,f,y,w,L){zt(c,f,y,w,L),w[L+3]=255}function xi(c,f){return 0>c?0:c>f?f:c}function fr(c,f,y){H[c]=function(w,L,O,k,z,W,$,ue,Se){for(var we=ue+(-2&Se)*y;ue!=we;)f(w[L+0],O[k+0],z[W+0],$,ue),f(w[L+1],O[k+0],z[W+0],$,ue+y),L+=2,++k,++W,ue+=2*y;1&Se&&f(w[L+0],O[k+0],z[W+0],$,ue)}}function _l(c,f,y){return y==0?c==0?f==0?6:5:f==0?4:0:y}function xo(c,f,y,w,L){switch(c>>>30){case 3:Cr(f,y,w,L,0);break;case 2:_n(f,y,w,L);break;case 1:ni(f,y,w,L)}}function So(c,f){var y,w,L=f.M,O=f.Nb,k=c.oc,z=c.pc+40,W=c.oc,$=c.pc+584,ue=c.oc,Se=c.pc+600;for(y=0;16>y;++y)k[z+32*y-1]=129;for(y=0;8>y;++y)W[$+32*y-1]=129,ue[Se+32*y-1]=129;for(0<L?k[z-1-32]=W[$-1-32]=ue[Se-1-32]=129:(r(k,z-32-1,127,21),r(W,$-32-1,127,9),r(ue,Se-32-1,127,9)),w=0;w<c.za;++w){var we=f.ya[f.aa+w];if(0<w){for(y=-1;16>y;++y)i(k,z+32*y-4,k,z+32*y+12,4);for(y=-1;8>y;++y)i(W,$+32*y-4,W,$+32*y+4,4),i(ue,Se+32*y-4,ue,Se+32*y+4,4)}var me=c.Gd,Ue=c.Hd+w,Le=we.ad,he=we.Hc;if(0<L&&(i(k,z-32,me[Ue].y,0,16),i(W,$-32,me[Ue].f,0,8),i(ue,Se-32,me[Ue].ea,0,8)),we.Za){var de=k,De=z-32+16;for(0<L&&(w>=c.za-1?r(de,De,me[Ue].y[15],4):i(de,De,me[Ue+1].y,0,4)),y=0;4>y;y++)de[De+128+y]=de[De+256+y]=de[De+384+y]=de[De+0+y];for(y=0;16>y;++y,he<<=2)de=k,De=z+Id[y],Yi[we.Ob[y]](de,De),xo(he,Le,16*+y,de,De)}else if(de=_l(w,L,we.Ob[0]),Kr[de](k,z),he!=0)for(y=0;16>y;++y,he<<=2)xo(he,Le,16*+y,k,z+Id[y]);for(y=we.Gc,de=_l(w,L,we.Dd),Pr[de](W,$),Pr[de](ue,Se),he=Le,de=W,De=$,255&(we=y>>0)&&(170&we?To(he,256,de,De):Di(he,256,de,De)),we=ue,he=Se,255&(y>>=8)&&(170&y?To(Le,320,we,he):Di(Le,320,we,he)),L<c.Ub-1&&(i(me[Ue].y,0,k,z+480,16),i(me[Ue].f,0,W,$+224,8),i(me[Ue].ea,0,ue,Se+224,8)),y=8*O*c.B,me=c.sa,Ue=c.ta+16*w+16*O*c.R,Le=c.qa,we=c.ra+8*w+y,he=c.Ha,de=c.Ia+8*w+y,y=0;16>y;++y)i(me,Ue+y*c.R,k,z+32*y,16);for(y=0;8>y;++y)i(Le,we+y*c.B,W,$+32*y,8),i(he,de+y*c.B,ue,Se+32*y,8)}}function oa(c,f,y,w,L,O,k,z,W){var $=[0],ue=[0],Se=0,we=W!=null?W.kd:0,me=W??new vo;if(c==null||12>y)return 7;me.data=c,me.w=f,me.ha=y,f=[f],y=[y],me.gb=[me.gb];e:{var Ue=f,Le=y,he=me.gb;if(e(c!=null),e(Le!=null),e(he!=null),he[0]=0,12<=Le[0]&&!t(c,Ue[0],"RIFF")){if(t(c,Ue[0]+8,"WEBP")){he=3;break e}var de=Xe(c,Ue[0]+4);if(12>de||4294967286<de){he=3;break e}if(we&&de>Le[0]-8){he=7;break e}he[0]=de,Ue[0]+=12,Le[0]-=12}he=0}if(he!=0)return he;for(de=0<me.gb[0],y=y[0];;){e:{var De=c;Le=f,he=y;var ke=$,Fe=ue,ot=Ue=[0];if((rt=Se=[Se])[0]=0,8>he[0])he=7;else{if(!t(De,Le[0],"VP8X")){if(Xe(De,Le[0]+4)!=10){he=3;break e}if(18>he[0]){he=7;break e}var Qe=Xe(De,Le[0]+8),vt=1+re(De,Le[0]+12);if(2147483648<=vt*(De=1+re(De,Le[0]+15))){he=3;break e}ot!=null&&(ot[0]=Qe),ke!=null&&(ke[0]=vt),Fe!=null&&(Fe[0]=De),Le[0]+=18,he[0]-=18,rt[0]=1}he=0}}if(Se=Se[0],Ue=Ue[0],he!=0)return he;if(Le=!!(2&Ue),!de&&Se)return 3;if(O!=null&&(O[0]=!!(16&Ue)),k!=null&&(k[0]=Le),z!=null&&(z[0]=0),k=$[0],Ue=ue[0],Se&&Le&&W==null){he=0;break}if(4>y){he=7;break}if(de&&Se||!de&&!Se&&!t(c,f[0],"ALPH")){y=[y],me.na=[me.na],me.P=[me.P],me.Sa=[me.Sa];e:{Qe=c,he=f,de=y;var rt=me.gb;ke=me.na,Fe=me.P,ot=me.Sa,vt=22,e(Qe!=null),e(de!=null),De=he[0];var Vt=de[0];for(e(ke!=null),e(ot!=null),ke[0]=null,Fe[0]=null,ot[0]=0;;){if(he[0]=De,de[0]=Vt,8>Vt){he=7;break e}var Wt=Xe(Qe,De+4);if(4294967286<Wt){he=3;break e}var Gt=8+Wt+1&-2;if(vt+=Gt,0<rt&&vt>rt){he=3;break e}if(!t(Qe,De,"VP8 ")||!t(Qe,De,"VP8L")){he=0;break e}if(Vt[0]<Gt){he=7;break e}t(Qe,De,"ALPH")||(ke[0]=Qe,Fe[0]=De+8,ot[0]=Wt),De+=Gt,Vt-=Gt}}if(y=y[0],me.na=me.na[0],me.P=me.P[0],me.Sa=me.Sa[0],he!=0)break}y=[y],me.Ja=[me.Ja],me.xa=[me.xa];e:if(rt=c,he=f,de=y,ke=me.gb[0],Fe=me.Ja,ot=me.xa,Qe=he[0],De=!t(rt,Qe,"VP8 "),vt=!t(rt,Qe,"VP8L"),e(rt!=null),e(de!=null),e(Fe!=null),e(ot!=null),8>de[0])he=7;else{if(De||vt){if(rt=Xe(rt,Qe+4),12<=ke&&rt>ke-12){he=3;break e}if(we&&rt>de[0]-8){he=7;break e}Fe[0]=rt,he[0]+=8,de[0]-=8,ot[0]=vt}else ot[0]=5<=de[0]&&rt[Qe+0]==47&&!(rt[Qe+4]>>5),Fe[0]=de[0];he=0}if(y=y[0],me.Ja=me.Ja[0],me.xa=me.xa[0],f=f[0],he!=0)break;if(4294967286<me.Ja)return 3;if(z==null||Le||(z[0]=me.xa?2:1),k=[k],Ue=[Ue],me.xa){if(5>y){he=7;break}z=k,we=Ue,Le=O,c==null||5>y?c=0:5<=y&&c[f+0]==47&&!(c[f+4]>>5)?(de=[0],rt=[0],ke=[0],ee(Fe=new T,c,f,y),tt(Fe,de,rt,ke)?(z!=null&&(z[0]=de[0]),we!=null&&(we[0]=rt[0]),Le!=null&&(Le[0]=ke[0]),c=1):c=0):c=0}else{if(10>y){he=7;break}z=Ue,c==null||10>y||!Ni(c,f+3,y-3)?c=0:(we=c[f+0]|c[f+1]<<8|c[f+2]<<16,Le=16383&(c[f+7]<<8|c[f+6]),c=16383&(c[f+9]<<8|c[f+8]),1&we||3<(we>>1&7)||!(we>>4&1)||we>>5>=me.Ja||!Le||!c?c=0:(k&&(k[0]=Le),z&&(z[0]=c),c=1))}if(!c||(k=k[0],Ue=Ue[0],Se&&($[0]!=k||ue[0]!=Ue)))return 3;W!=null&&(W[0]=me,W.offset=f-W.w,e(4294967286>f-W.w),e(W.offset==W.ha-y));break}return he==0||he==7&&Se&&W==null?(O!=null&&(O[0]|=me.na!=null&&0<me.na.length),w!=null&&(w[0]=k),L!=null&&(L[0]=Ue),0):he}function wo(c,f,y){var w=f.width,L=f.height,O=0,k=0,z=w,W=L;if(f.Da=c!=null&&0<c.Da,f.Da&&(z=c.cd,W=c.bd,O=c.v,k=c.j,11>y||(O&=-2,k&=-2),0>O||0>k||0>=z||0>=W||O+z>w||k+W>L))return 0;if(f.v=O,f.j=k,f.va=O+z,f.o=k+W,f.U=z,f.T=W,f.da=c!=null&&0<c.da,f.da){if(!lt(z,W,y=[c.ib],O=[c.hb]))return 0;f.ib=y[0],f.hb=O[0]}return f.ob=c!=null&&c.ob,f.Kb=c==null||!c.Sd,f.da&&(f.ob=f.ib<3*w/4&&f.hb<3*L/4,f.Kb=0),1}function Mo(c){if(c==null)return 2;if(11>c.S){var f=c.f.RGBA;f.fb+=(c.height-1)*f.A,f.A=-f.A}else f=c.f.kb,c=c.height,f.O+=(c-1)*f.fa,f.fa=-f.fa,f.N+=(c-1>>1)*f.Ab,f.Ab=-f.Ab,f.W+=(c-1>>1)*f.Db,f.Db=-f.Db,f.F!=null&&(f.J+=(c-1)*f.lb,f.lb=-f.lb);return 0}function la(c,f,y,w){if(w==null||0>=c||0>=f)return 2;if(y!=null){if(y.Da){var L=y.cd,O=y.bd,k=-2&y.v,z=-2&y.j;if(0>k||0>z||0>=L||0>=O||k+L>c||z+O>f)return 2;c=L,f=O}if(y.da){if(!lt(c,f,L=[y.ib],O=[y.hb]))return 2;c=L[0],f=O[0]}}w.width=c,w.height=f;e:{var W=w.width,$=w.height;if(c=w.S,0>=W||0>=$||!(c>=Al&&13>c))c=2;else{if(0>=w.Rd&&w.sd==null){k=O=L=f=0;var ue=(z=W*Dd[c])*$;if(11>c||(O=($+1)/2*(f=(W+1)/2),c==12&&(k=(L=W)*$)),($=s(ue+2*O+k))==null){c=1;break e}w.sd=$,11>c?((W=w.f.RGBA).eb=$,W.fb=0,W.A=z,W.size=ue):((W=w.f.kb).y=$,W.O=0,W.fa=z,W.Fd=ue,W.f=$,W.N=0+ue,W.Ab=f,W.Cd=O,W.ea=$,W.W=0+ue+O,W.Db=f,W.Ed=O,c==12&&(W.F=$,W.J=0+ue+2*O),W.Tc=k,W.lb=L)}if(f=1,L=w.S,O=w.width,k=w.height,L>=Al&&13>L)if(11>L)c=w.f.RGBA,f&=(z=Math.abs(c.A))*(k-1)+O<=c.size,f&=z>=O*Dd[L],f&=c.eb!=null;else{c=w.f.kb,z=(O+1)/2,ue=(k+1)/2,W=Math.abs(c.fa),$=Math.abs(c.Ab);var Se=Math.abs(c.Db),we=Math.abs(c.lb),me=we*(k-1)+O;f&=W*(k-1)+O<=c.Fd,f&=$*(ue-1)+z<=c.Cd,f=(f&=Se*(ue-1)+z<=c.Ed)&W>=O&$>=z&Se>=z,f&=c.y!=null,f&=c.f!=null,f&=c.ea!=null,L==12&&(f&=we>=O,f&=me<=c.Tc,f&=c.F!=null)}else f=0;c=f?0:2}}return c!=0||y!=null&&y.fd&&(c=Mo(w)),c}var zn=64,ca=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215],ua=24,ha=32,Ao=8,hi=[0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];I("Predictor0","PredictorAdd0"),H.Predictor0=function(){return 4278190080},H.Predictor1=function(c){return c},H.Predictor2=function(c,f,y){return f[y+0]},H.Predictor3=function(c,f,y){return f[y+1]},H.Predictor4=function(c,f,y){return f[y-1]},H.Predictor5=function(c,f,y){return ye(ye(c,f[y+1]),f[y+0])},H.Predictor6=function(c,f,y){return ye(c,f[y-1])},H.Predictor7=function(c,f,y){return ye(c,f[y+0])},H.Predictor8=function(c,f,y){return ye(f[y-1],f[y+0])},H.Predictor9=function(c,f,y){return ye(f[y+0],f[y+1])},H.Predictor10=function(c,f,y){return ye(ye(c,f[y-1]),ye(f[y+0],f[y+1]))},H.Predictor11=function(c,f,y){var w=f[y+0];return 0>=qe(w>>24&255,c>>24&255,(f=f[y-1])>>24&255)+qe(w>>16&255,c>>16&255,f>>16&255)+qe(w>>8&255,c>>8&255,f>>8&255)+qe(255&w,255&c,255&f)?w:c},H.Predictor12=function(c,f,y){var w=f[y+0];return(Me((c>>24&255)+(w>>24&255)-((f=f[y-1])>>24&255))<<24|Me((c>>16&255)+(w>>16&255)-(f>>16&255))<<16|Me((c>>8&255)+(w>>8&255)-(f>>8&255))<<8|Me((255&c)+(255&w)-(255&f)))>>>0},H.Predictor13=function(c,f,y){var w=f[y-1];return(Re((c=ye(c,f[y+0]))>>24&255,w>>24&255)<<24|Re(c>>16&255,w>>16&255)<<16|Re(c>>8&255,w>>8&255)<<8|Re(c>>0&255,w>>0&255))>>>0};var du=H.PredictorAdd0;H.PredictorAdd1=Oe,I("Predictor2","PredictorAdd2"),I("Predictor3","PredictorAdd3"),I("Predictor4","PredictorAdd4"),I("Predictor5","PredictorAdd5"),I("Predictor6","PredictorAdd6"),I("Predictor7","PredictorAdd7"),I("Predictor8","PredictorAdd8"),I("Predictor9","PredictorAdd9"),I("Predictor10","PredictorAdd10"),I("Predictor11","PredictorAdd11"),I("Predictor12","PredictorAdd12"),I("Predictor13","PredictorAdd13");var Eo=H.PredictorAdd2;Pe("ColorIndexInverseTransform","MapARGB","32b",function(c){return c>>8&255},function(c){return c}),Pe("VP8LColorIndexInverseTransformAlpha","MapAlpha","8b",function(c){return c},function(c){return c>>8&255});var yl,Ii=H.ColorIndexInverseTransform,da=H.MapARGB,bl=H.VP8LColorIndexInverseTransformAlpha,xl=H.MapAlpha,Xr=H.VP8LPredictorsAdd=[];Xr.length=16,(H.VP8LPredictors=[]).length=16,(H.VP8LPredictorsAdd_C=[]).length=16,(H.VP8LPredictors_C=[]).length=16;var Ls,di,ti,Yr,Tr,Lr,fa,Cr,_n,To,ni,Di,pa,Sl,Lo,Cs,Rs,$r,Ps,ma,Ns,Jr,Co,Fi,Ui,nn,rn,yn,Pn=s(511),Rr=s(2041),Ro=s(225),ga=s(767),wl=0,fu=Rr,Ml=Ro,Si=ga,Oi=Pn,Al=0,El=1,wd=2,Tl=3,Ll=4,pu=5,Md=6,mu=7,gu=8,Cl=9,vu=10,M0=[2,3,7],A0=[3,3,11],Ad=[280,256,256,256,40],E0=[0,1,1,1,0],T0=[17,18,0,1,2,3,4,5,16,6,7,8,9,10,11,12,13,14,15],L0=[24,7,23,25,40,6,39,41,22,26,38,42,56,5,55,57,21,27,54,58,37,43,72,4,71,73,20,28,53,59,70,74,36,44,88,69,75,52,60,3,87,89,19,29,86,90,35,45,68,76,85,91,51,61,104,2,103,105,18,30,102,106,34,46,84,92,67,77,101,107,50,62,120,1,119,121,83,93,17,31,100,108,66,78,118,122,33,47,117,123,49,63,99,109,82,94,0,116,124,65,79,16,32,98,110,48,115,125,81,95,64,114,126,97,111,80,113,127,96,112],C0=[2954,2956,2958,2962,2970,2986,3018,3082,3212,3468,3980,5004],R0=8,_u=[4,5,6,7,8,9,10,10,11,12,13,14,15,16,17,17,18,19,20,20,21,21,22,22,23,23,24,25,25,26,27,28,29,30,31,32,33,34,35,36,37,37,38,39,40,41,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,93,95,96,98,100,101,102,104,106,108,110,112,114,116,118,122,124,126,128,130,132,134,136,138,140,143,145,148,151,154,157],yu=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,234,239,245,249,254,259,264,269,274,279,284],Po=null,P0=[[173,148,140,0],[176,155,140,135,0],[180,157,141,134,130,0],[254,254,243,230,196,177,153,140,133,130,129,0]],N0=[0,1,4,8,5,2,3,6,9,12,13,10,7,11,14,15],Ed=[-0,1,-1,2,-2,3,4,6,-3,5,-4,-5,-6,7,-7,8,-8,-9],I0=[[[[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128]],[[253,136,254,255,228,219,128,128,128,128,128],[189,129,242,255,227,213,255,219,128,128,128],[106,126,227,252,214,209,255,255,128,128,128]],[[1,98,248,255,236,226,255,255,128,128,128],[181,133,238,254,221,234,255,154,128,128,128],[78,134,202,247,198,180,255,219,128,128,128]],[[1,185,249,255,243,255,128,128,128,128,128],[184,150,247,255,236,224,128,128,128,128,128],[77,110,216,255,236,230,128,128,128,128,128]],[[1,101,251,255,241,255,128,128,128,128,128],[170,139,241,252,236,209,255,255,128,128,128],[37,116,196,243,228,255,255,255,128,128,128]],[[1,204,254,255,245,255,128,128,128,128,128],[207,160,250,255,238,128,128,128,128,128,128],[102,103,231,255,211,171,128,128,128,128,128]],[[1,152,252,255,240,255,128,128,128,128,128],[177,135,243,255,234,225,128,128,128,128,128],[80,129,211,255,194,224,128,128,128,128,128]],[[1,1,255,128,128,128,128,128,128,128,128],[246,1,255,128,128,128,128,128,128,128,128],[255,128,128,128,128,128,128,128,128,128,128]]],[[[198,35,237,223,193,187,162,160,145,155,62],[131,45,198,221,172,176,220,157,252,221,1],[68,47,146,208,149,167,221,162,255,223,128]],[[1,149,241,255,221,224,255,255,128,128,128],[184,141,234,253,222,220,255,199,128,128,128],[81,99,181,242,176,190,249,202,255,255,128]],[[1,129,232,253,214,197,242,196,255,255,128],[99,121,210,250,201,198,255,202,128,128,128],[23,91,163,242,170,187,247,210,255,255,128]],[[1,200,246,255,234,255,128,128,128,128,128],[109,178,241,255,231,245,255,255,128,128,128],[44,130,201,253,205,192,255,255,128,128,128]],[[1,132,239,251,219,209,255,165,128,128,128],[94,136,225,251,218,190,255,255,128,128,128],[22,100,174,245,186,161,255,199,128,128,128]],[[1,182,249,255,232,235,128,128,128,128,128],[124,143,241,255,227,234,128,128,128,128,128],[35,77,181,251,193,211,255,205,128,128,128]],[[1,157,247,255,236,231,255,255,128,128,128],[121,141,235,255,225,227,255,255,128,128,128],[45,99,188,251,195,217,255,224,128,128,128]],[[1,1,251,255,213,255,128,128,128,128,128],[203,1,248,255,255,128,128,128,128,128,128],[137,1,177,255,224,255,128,128,128,128,128]]],[[[253,9,248,251,207,208,255,192,128,128,128],[175,13,224,243,193,185,249,198,255,255,128],[73,17,171,221,161,179,236,167,255,234,128]],[[1,95,247,253,212,183,255,255,128,128,128],[239,90,244,250,211,209,255,255,128,128,128],[155,77,195,248,188,195,255,255,128,128,128]],[[1,24,239,251,218,219,255,205,128,128,128],[201,51,219,255,196,186,128,128,128,128,128],[69,46,190,239,201,218,255,228,128,128,128]],[[1,191,251,255,255,128,128,128,128,128,128],[223,165,249,255,213,255,128,128,128,128,128],[141,124,248,255,255,128,128,128,128,128,128]],[[1,16,248,255,255,128,128,128,128,128,128],[190,36,230,255,236,255,128,128,128,128,128],[149,1,255,128,128,128,128,128,128,128,128]],[[1,226,255,128,128,128,128,128,128,128,128],[247,192,255,128,128,128,128,128,128,128,128],[240,128,255,128,128,128,128,128,128,128,128]],[[1,134,252,255,255,128,128,128,128,128,128],[213,62,250,255,255,128,128,128,128,128,128],[55,93,255,128,128,128,128,128,128,128,128]],[[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128]]],[[[202,24,213,235,186,191,220,160,240,175,255],[126,38,182,232,169,184,228,174,255,187,128],[61,46,138,219,151,178,240,170,255,216,128]],[[1,112,230,250,199,191,247,159,255,255,128],[166,109,228,252,211,215,255,174,128,128,128],[39,77,162,232,172,180,245,178,255,255,128]],[[1,52,220,246,198,199,249,220,255,255,128],[124,74,191,243,183,193,250,221,255,255,128],[24,71,130,219,154,170,243,182,255,255,128]],[[1,182,225,249,219,240,255,224,128,128,128],[149,150,226,252,216,205,255,171,128,128,128],[28,108,170,242,183,194,254,223,255,255,128]],[[1,81,230,252,204,203,255,192,128,128,128],[123,102,209,247,188,196,255,233,128,128,128],[20,95,153,243,164,173,255,203,128,128,128]],[[1,222,248,255,216,213,128,128,128,128,128],[168,175,246,252,235,205,255,255,128,128,128],[47,116,215,255,211,212,255,255,128,128,128]],[[1,121,236,253,212,214,255,255,128,128,128],[141,84,213,252,201,202,255,219,128,128,128],[42,80,160,240,162,185,255,205,128,128,128]],[[1,1,255,128,128,128,128,128,128,128,128],[244,1,255,128,128,128,128,128,128,128,128],[238,1,255,128,128,128,128,128,128,128,128]]]],D0=[[[231,120,48,89,115,113,120,152,112],[152,179,64,126,170,118,46,70,95],[175,69,143,80,85,82,72,155,103],[56,58,10,171,218,189,17,13,152],[114,26,17,163,44,195,21,10,173],[121,24,80,195,26,62,44,64,85],[144,71,10,38,171,213,144,34,26],[170,46,55,19,136,160,33,206,71],[63,20,8,114,114,208,12,9,226],[81,40,11,96,182,84,29,16,36]],[[134,183,89,137,98,101,106,165,148],[72,187,100,130,157,111,32,75,80],[66,102,167,99,74,62,40,234,128],[41,53,9,178,241,141,26,8,107],[74,43,26,146,73,166,49,23,157],[65,38,105,160,51,52,31,115,128],[104,79,12,27,217,255,87,17,7],[87,68,71,44,114,51,15,186,23],[47,41,14,110,182,183,21,17,194],[66,45,25,102,197,189,23,18,22]],[[88,88,147,150,42,46,45,196,205],[43,97,183,117,85,38,35,179,61],[39,53,200,87,26,21,43,232,171],[56,34,51,104,114,102,29,93,77],[39,28,85,171,58,165,90,98,64],[34,22,116,206,23,34,43,166,73],[107,54,32,26,51,1,81,43,31],[68,25,106,22,64,171,36,225,114],[34,19,21,102,132,188,16,76,124],[62,18,78,95,85,57,50,48,51]],[[193,101,35,159,215,111,89,46,111],[60,148,31,172,219,228,21,18,111],[112,113,77,85,179,255,38,120,114],[40,42,1,196,245,209,10,25,109],[88,43,29,140,166,213,37,43,154],[61,63,30,155,67,45,68,1,209],[100,80,8,43,154,1,51,26,71],[142,78,78,16,255,128,34,197,171],[41,40,5,102,211,183,4,1,221],[51,50,17,168,209,192,23,25,82]],[[138,31,36,171,27,166,38,44,229],[67,87,58,169,82,115,26,59,179],[63,59,90,180,59,166,93,73,154],[40,40,21,116,143,209,34,39,175],[47,15,16,183,34,223,49,45,183],[46,17,33,183,6,98,15,32,183],[57,46,22,24,128,1,54,17,37],[65,32,73,115,28,128,23,128,205],[40,3,9,115,51,192,18,6,223],[87,37,9,115,59,77,64,21,47]],[[104,55,44,218,9,54,53,130,226],[64,90,70,205,40,41,23,26,57],[54,57,112,184,5,41,38,166,213],[30,34,26,133,152,116,10,32,134],[39,19,53,221,26,114,32,73,255],[31,9,65,234,2,15,1,118,73],[75,32,12,51,192,255,160,43,51],[88,31,35,67,102,85,55,186,85],[56,21,23,111,59,205,45,37,192],[55,38,70,124,73,102,1,34,98]],[[125,98,42,88,104,85,117,175,82],[95,84,53,89,128,100,113,101,45],[75,79,123,47,51,128,81,171,1],[57,17,5,71,102,57,53,41,49],[38,33,13,121,57,73,26,1,85],[41,10,67,138,77,110,90,47,114],[115,21,2,10,102,255,166,23,6],[101,29,16,10,85,128,101,196,26],[57,18,10,102,102,213,34,20,43],[117,20,15,36,163,128,68,1,26]],[[102,61,71,37,34,53,31,243,192],[69,60,71,38,73,119,28,222,37],[68,45,128,34,1,47,11,245,171],[62,17,19,70,146,85,55,62,70],[37,43,37,154,100,163,85,160,1],[63,9,92,136,28,64,32,201,85],[75,15,9,9,64,255,184,119,16],[86,6,28,5,64,255,25,248,1],[56,8,17,132,137,255,55,116,128],[58,15,20,82,135,57,26,121,40]],[[164,50,31,137,154,133,25,35,218],[51,103,44,131,131,123,31,6,158],[86,40,64,135,148,224,45,183,128],[22,26,17,131,240,154,14,1,209],[45,16,21,91,64,222,7,1,197],[56,21,39,155,60,138,23,102,213],[83,12,13,54,192,255,68,47,28],[85,26,85,85,128,128,32,146,171],[18,11,7,63,144,171,4,4,246],[35,27,10,146,174,171,12,26,128]],[[190,80,35,99,180,80,126,54,45],[85,126,47,87,176,51,41,20,32],[101,75,128,139,118,146,116,128,85],[56,41,15,176,236,85,37,9,62],[71,30,17,119,118,255,17,18,138],[101,38,60,138,55,70,43,26,142],[146,36,19,30,171,255,97,27,20],[138,45,61,62,219,1,81,188,64],[32,41,20,117,151,142,20,21,163],[112,19,12,61,195,128,48,4,24]]],F0=[[[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[176,246,255,255,255,255,255,255,255,255,255],[223,241,252,255,255,255,255,255,255,255,255],[249,253,253,255,255,255,255,255,255,255,255]],[[255,244,252,255,255,255,255,255,255,255,255],[234,254,254,255,255,255,255,255,255,255,255],[253,255,255,255,255,255,255,255,255,255,255]],[[255,246,254,255,255,255,255,255,255,255,255],[239,253,254,255,255,255,255,255,255,255,255],[254,255,254,255,255,255,255,255,255,255,255]],[[255,248,254,255,255,255,255,255,255,255,255],[251,255,254,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,253,254,255,255,255,255,255,255,255,255],[251,254,254,255,255,255,255,255,255,255,255],[254,255,254,255,255,255,255,255,255,255,255]],[[255,254,253,255,254,255,255,255,255,255,255],[250,255,254,255,254,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]],[[[217,255,255,255,255,255,255,255,255,255,255],[225,252,241,253,255,255,254,255,255,255,255],[234,250,241,250,253,255,253,254,255,255,255]],[[255,254,255,255,255,255,255,255,255,255,255],[223,254,254,255,255,255,255,255,255,255,255],[238,253,254,254,255,255,255,255,255,255,255]],[[255,248,254,255,255,255,255,255,255,255,255],[249,254,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,253,255,255,255,255,255,255,255,255,255],[247,254,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,253,254,255,255,255,255,255,255,255,255],[252,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,254,254,255,255,255,255,255,255,255,255],[253,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,254,253,255,255,255,255,255,255,255,255],[250,255,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]],[[[186,251,250,255,255,255,255,255,255,255,255],[234,251,244,254,255,255,255,255,255,255,255],[251,251,243,253,254,255,254,255,255,255,255]],[[255,253,254,255,255,255,255,255,255,255,255],[236,253,254,255,255,255,255,255,255,255,255],[251,253,253,254,254,255,255,255,255,255,255]],[[255,254,254,255,255,255,255,255,255,255,255],[254,254,254,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,254,255,255,255,255,255,255,255,255,255],[254,254,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]],[[[248,255,255,255,255,255,255,255,255,255,255],[250,254,252,254,255,255,255,255,255,255,255],[248,254,249,253,255,255,255,255,255,255,255]],[[255,253,253,255,255,255,255,255,255,255,255],[246,253,253,255,255,255,255,255,255,255,255],[252,254,251,254,254,255,255,255,255,255,255]],[[255,254,252,255,255,255,255,255,255,255,255],[248,254,253,255,255,255,255,255,255,255,255],[253,255,254,254,255,255,255,255,255,255,255]],[[255,251,254,255,255,255,255,255,255,255,255],[245,251,254,255,255,255,255,255,255,255,255],[253,253,254,255,255,255,255,255,255,255,255]],[[255,251,253,255,255,255,255,255,255,255,255],[252,253,254,255,255,255,255,255,255,255,255],[255,254,255,255,255,255,255,255,255,255,255]],[[255,252,255,255,255,255,255,255,255,255,255],[249,255,254,255,255,255,255,255,255,255,255],[255,255,254,255,255,255,255,255,255,255,255]],[[255,255,253,255,255,255,255,255,255,255,255],[250,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]]],U0=[0,1,2,3,6,4,5,6,6,6,6,6,6,6,6,7,0],Kr=[],Yi=[],Pr=[],O0=1,Td=2,Zr=[],ki=[];Ne("UpsampleRgbLinePair",zt,3),Ne("UpsampleBgrLinePair",hn,3),Ne("UpsampleRgbaLinePair",Xi,4),Ne("UpsampleBgraLinePair",Dn,4),Ne("UpsampleArgbLinePair",jn,4),Ne("UpsampleRgba4444LinePair",An,2),Ne("UpsampleRgb565LinePair",fn,2);var k0=H.UpsampleRgbLinePair,B0=H.UpsampleBgrLinePair,Ld=H.UpsampleRgbaLinePair,Cd=H.UpsampleBgraLinePair,Rd=H.UpsampleArgbLinePair,Pd=H.UpsampleRgba4444LinePair,z0=H.UpsampleRgb565LinePair,Rl=16,Pl=1<<Rl-1,No=-227,bu=482,G0=6,Nd=0,H0=s(256),V0=s(256),q0=s(256),W0=s(256),j0=s(bu-No),X0=s(bu-No);fr("YuvToRgbRow",zt,3),fr("YuvToBgrRow",hn,3),fr("YuvToRgbaRow",Xi,4),fr("YuvToBgraRow",Dn,4),fr("YuvToArgbRow",jn,4),fr("YuvToRgba4444Row",An,2),fr("YuvToRgb565Row",fn,2);var Id=[0,4,8,12,128,132,136,140,256,260,264,268,384,388,392,396],Nl=[0,2,8],Y0=[8,7,6,4,4,2,2,2,1,1,1,1],$0=1;this.WebPDecodeRGBA=function(c,f,y,w,L){var O=El,k=new sa,z=new le;k.ba=z,z.S=O,z.width=[z.width],z.height=[z.height];var W=z.width,$=z.height,ue=new Ke;if(ue==null||c==null)var Se=2;else e(ue!=null),Se=oa(c,f,y,ue.width,ue.height,ue.Pd,ue.Qd,ue.format,null);if(Se!=0?W=0:(W!=null&&(W[0]=ue.width[0]),$!=null&&($[0]=ue.height[0]),W=1),W){z.width=z.width[0],z.height=z.height[0],w!=null&&(w[0]=z.width),L!=null&&(L[0]=z.height);e:{if(w=new Mt,(L=new vo).data=c,L.w=f,L.ha=y,L.kd=1,f=[0],e(L!=null),((c=oa(L.data,L.w,L.ha,null,null,null,f,null,L))==0||c==7)&&f[0]&&(c=4),(f=c)==0){if(e(k!=null),w.data=L.data,w.w=L.w+L.offset,w.ha=L.ha-L.offset,w.put=qt,w.ac=Et,w.bc=tn,w.ma=k,L.xa){if((c=j())==null){k=1;break e}if(function(we,me){var Ue=[0],Le=[0],he=[0];t:for(;;){if(we==null)return 0;if(me==null)return we.a=2,0;if(we.l=me,we.a=0,ee(we.m,me.data,me.w,me.ha),!tt(we.m,Ue,Le,he)){we.a=3;break t}if(we.xb=Td,me.width=Ue[0],me.height=Le[0],!ge(Ue[0],Le[0],1,we,null))break t;return 1}return e(we.a!=0),0}(c,w)){if(w=(f=la(w.width,w.height,k.Oa,k.ba))==0){t:{w=c;n:for(;;){if(w==null){w=0;break t}if(e(w.s.yc!=null),e(w.s.Ya!=null),e(0<w.s.Wb),e((y=w.l)!=null),e((L=y.ma)!=null),w.xb!=0){if(w.ca=L.ba,w.tb=L.tb,e(w.ca!=null),!wo(L.Oa,y,Tl)){w.a=2;break n}if(!Ee(w,y.width)||y.da)break n;if((y.da||mt(w.ca.S))&&ve(),11>w.ca.S||(alert("todo:WebPInitConvertARGBToYUV"),w.ca.f.kb.F!=null&&ve()),w.Pb&&0<w.s.ua&&w.s.vb.X==null&&!Ve(w.s.vb,w.s.Wa.Xa)){w.a=1;break n}w.xb=0}if(!bi(w,w.V,w.Ba,w.c,w.i,y.o,Wi))break n;L.Dc=w.Ma,w=1;break t}e(w.a!=0),w=0}w=!w}w&&(f=c.a)}else f=c.a}else{if((c=new Ss)==null){k=1;break e}if(c.Fa=L.na,c.P=L.P,c.qc=L.Sa,ws(c,w)){if((f=la(w.width,w.height,k.Oa,k.ba))==0){if(c.Aa=0,y=k.Oa,e((L=c)!=null),y!=null){if(0<(W=0>(W=y.Md)?0:100<W?255:255*W/100)){for($=ue=0;4>$;++$)12>(Se=L.pb[$]).lc&&(Se.ia=W*Y0[0>Se.lc?0:Se.lc]>>3),ue|=Se.ia;ue&&(alert("todo:VP8InitRandom"),L.ia=1)}L.Ga=y.Id,100<L.Ga?L.Ga=100:0>L.Ga&&(L.Ga=0)}Mn(c,w)||(f=c.a)}}else f=c.a}f==0&&k.Oa!=null&&k.Oa.fd&&(f=Mo(k.ba))}k=f}O=k!=0?null:11>O?z.f.RGBA.eb:z.f.kb.y}else O=null;return O};var Dd=[3,4,3,4,4,2,2,4,4,4,2,1,1]};function u(H,A){for(var D="",E=0;E<4;E++)D+=String.fromCharCode(H[A++]);return D}function h(H,A){return(H[A+0]<<0|H[A+1]<<8|H[A+2]<<16)>>>0}function p(H,A){return(H[A+0]<<0|H[A+1]<<8|H[A+2]<<16|H[A+3]<<24)>>>0}new l;var g=[0],d=[0],x=[],b=new l,_=n,m=function(H,A){var D={},E=0,R=!1,X=0,N=0;if(D.frames=[],!function(F,V,K,ne){for(var ce=0;ce<ne;ce++)if(F[V+ce]!=K.charCodeAt(ce))return!0;return!1}(H,A,"RIFF",4)){var J,Q;for(p(H,A+=4),A+=8;A<H.length;){var ie=u(H,A),ee=p(H,A+=4);A+=4;var te=ee+(1&ee);switch(ie){case"VP8 ":case"VP8L":D.frames[E]===void 0&&(D.frames[E]={}),(T=D.frames[E]).src_off=R?N:A-8,T.src_size=X+ee+8,E++,R&&(R=!1,X=0,N=0);break;case"VP8X":(T=D.header={}).feature_flags=H[A];var ae=A+4;T.canvas_width=1+h(H,ae),ae+=3,T.canvas_height=1+h(H,ae),ae+=3;break;case"ALPH":R=!0,X=te+8,N=A-8;break;case"ANIM":(T=D.header).bgcolor=p(H,A),ae=A+4,T.loop_count=(J=H)[(Q=ae)+0]<<0|J[Q+1]<<8,ae+=2;break;case"ANMF":var xe,T;(T=D.frames[E]={}).offset_x=2*h(H,A),A+=3,T.offset_y=2*h(H,A),A+=3,T.width=1+h(H,A),A+=3,T.height=1+h(H,A),A+=3,T.duration=h(H,A),A+=3,xe=H[A++],T.dispose=1&xe,T.blend=xe>>1&1}ie!="ANMF"&&(A+=te)}return D}}(_,0);m.response=_,m.rgbaoutput=!0,m.dataurl=!1;var S=m.header?m.header:null,M=m.frames?m.frames:null;if(S){S.loop_counter=S.loop_count,g=[S.canvas_height],d=[S.canvas_width];for(var P=0;P<M.length&&M[P].blend!=0;P++);}var q=M[0],G=b.WebPDecodeRGBA(_,q.src_off,q.src_size,d,g);q.rgba=G,q.imgwidth=d[0],q.imgheight=g[0];for(var U=0;U<d[0]*g[0]*4;U++)x[U]=G[U];return this.width=d,this.height=g,this.data=x,this}(function(n){var e=function(){return typeof kh=="function"},t=function(g,d,x,b){var _=4,m=a;switch(b){case n.image_compression.FAST:_=1,m=s;break;case n.image_compression.MEDIUM:_=6,m=o;break;case n.image_compression.SLOW:_=9,m=l}g=i(g,d,x,m);var S=kh(g,{level:_});return n.__addimage__.arrayBufferToBinaryString(S)},i=function(g,d,x,b){for(var _,m,S,M=g.length/d,P=new Uint8Array(g.length+M),q=h(),G=0;G<M;G+=1){if(S=G*d,_=g.subarray(S,S+d),b)P.set(b(_,x,m),S+G);else{for(var U,H=q.length,A=[];U<H;U+=1)A[U]=q[U](_,x,m);var D=p(A.concat());P.set(A[D],S+G)}m=_}return P},r=function(g){var d=Array.apply([],g);return d.unshift(0),d},s=function(g,d){var x,b=[],_=g.length;b[0]=1;for(var m=0;m<_;m+=1)x=g[m-d]||0,b[m+1]=g[m]-x+256&255;return b},a=function(g,d,x){var b,_=[],m=g.length;_[0]=2;for(var S=0;S<m;S+=1)b=x&&x[S]||0,_[S+1]=g[S]-b+256&255;return _},o=function(g,d,x){var b,_,m=[],S=g.length;m[0]=3;for(var M=0;M<S;M+=1)b=g[M-d]||0,_=x&&x[M]||0,m[M+1]=g[M]+256-(b+_>>>1)&255;return m},l=function(g,d,x){var b,_,m,S,M=[],P=g.length;M[0]=4;for(var q=0;q<P;q+=1)b=g[q-d]||0,_=x&&x[q]||0,m=x&&x[q-d]||0,S=u(b,_,m),M[q+1]=g[q]-S+256&255;return M},u=function(g,d,x){if(g===d&&d===x)return g;var b=Math.abs(d-x),_=Math.abs(g-x),m=Math.abs(g+d-x-x);return b<=_&&b<=m?g:_<=m?d:x},h=function(){return[r,s,a,o,l]},p=function(g){var d=g.map(function(x){return x.reduce(function(b,_){return b+Math.abs(_)},0)});return d.indexOf(Math.min.apply(null,d))};n.processPNG=function(g,d,x,b){var _,m,S,M,P,q,G,U,H,A,D,E,R,X,N,J=this.decode.FLATE_DECODE,Q="";if(this.__addimage__.isArrayBuffer(g)&&(g=new Uint8Array(g)),this.__addimage__.isArrayBufferView(g)){if(g=(S=new Eb(g)).imgData,m=S.bits,_=S.colorSpace,P=S.colors,[4,6].indexOf(S.colorType)!==-1){if(S.bits===8){H=(U=S.pixelBitlength==32?new Uint32Array(S.decodePixels().buffer):S.pixelBitlength==16?new Uint16Array(S.decodePixels().buffer):new Uint8Array(S.decodePixels().buffer)).length,D=new Uint8Array(H*S.colors),A=new Uint8Array(H);var ie,ee=S.pixelBitlength-S.bits;for(X=0,N=0;X<H;X++){for(R=U[X],ie=0;ie<ee;)D[N++]=R>>>ie&255,ie+=S.bits;A[X]=R>>>ie&255}}if(S.bits===16){H=(U=new Uint32Array(S.decodePixels().buffer)).length,D=new Uint8Array(H*(32/S.pixelBitlength)*S.colors),A=new Uint8Array(H*(32/S.pixelBitlength)),E=S.colors>1,X=0,N=0;for(var te=0;X<H;)R=U[X++],D[N++]=R>>>0&255,E&&(D[N++]=R>>>16&255,R=U[X++],D[N++]=R>>>0&255),A[te++]=R>>>16&255;m=8}b!==n.image_compression.NONE&&e()?(g=t(D,S.width*S.colors,S.colors,b),G=t(A,S.width,1,b)):(g=D,G=A,J=void 0)}if(S.colorType===3&&(_=this.color_spaces.INDEXED,q=S.palette,S.transparency.indexed)){var ae=S.transparency.indexed,xe=0;for(X=0,H=ae.length;X<H;++X)xe+=ae[X];if((xe/=255)===H-1&&ae.indexOf(0)!==-1)M=[ae.indexOf(0)];else if(xe!==H){for(U=S.decodePixels(),A=new Uint8Array(U.length),X=0,H=U.length;X<H;X++)A[X]=ae[U[X]];G=t(A,S.width,1)}}var T=function(F){var V;switch(F){case n.image_compression.FAST:V=11;break;case n.image_compression.MEDIUM:V=13;break;case n.image_compression.SLOW:V=14;break;default:V=12}return V}(b);return J===this.decode.FLATE_DECODE&&(Q="/Predictor "+T+" "),Q+="/Colors "+P+" /BitsPerComponent "+m+" /Columns "+S.width,(this.__addimage__.isArrayBuffer(g)||this.__addimage__.isArrayBufferView(g))&&(g=this.__addimage__.arrayBufferToBinaryString(g)),(G&&this.__addimage__.isArrayBuffer(G)||this.__addimage__.isArrayBufferView(G))&&(G=this.__addimage__.arrayBufferToBinaryString(G)),{alias:x,data:g,index:d,filter:J,decodeParameters:Q,transparency:M,palette:q,sMask:G,predictor:T,width:S.width,height:S.height,bitsPerComponent:m,colorSpace:_}}}})(_t.API),function(n){n.processGIF89A=function(e,t,i,r){var s=new Tb(e),a=s.width,o=s.height,l=[];s.decodeAndBlitFrameRGBA(0,l);var u={data:l,width:a,height:o},h=new mh(100).encode(u,100);return n.processJPEG.call(this,h,t,i,r)},n.processGIF87A=n.processGIF89A}(_t.API),er.prototype.parseHeader=function(){if(this.fileSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.reserved=this.datav.getUint32(this.pos,!0),this.pos+=4,this.offset=this.datav.getUint32(this.pos,!0),this.pos+=4,this.headerSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.width=this.datav.getUint32(this.pos,!0),this.pos+=4,this.height=this.datav.getInt32(this.pos,!0),this.pos+=4,this.planes=this.datav.getUint16(this.pos,!0),this.pos+=2,this.bitPP=this.datav.getUint16(this.pos,!0),this.pos+=2,this.compress=this.datav.getUint32(this.pos,!0),this.pos+=4,this.rawSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.hr=this.datav.getUint32(this.pos,!0),this.pos+=4,this.vr=this.datav.getUint32(this.pos,!0),this.pos+=4,this.colors=this.datav.getUint32(this.pos,!0),this.pos+=4,this.importantColors=this.datav.getUint32(this.pos,!0),this.pos+=4,this.bitPP===16&&this.is_with_alpha&&(this.bitPP=15),this.bitPP<15){var n=this.colors===0?1<<this.bitPP:this.colors;this.palette=new Array(n);for(var e=0;e<n;e++){var t=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),r=this.datav.getUint8(this.pos++,!0),s=this.datav.getUint8(this.pos++,!0);this.palette[e]={red:r,green:i,blue:t,quad:s}}}this.height<0&&(this.height*=-1,this.bottom_up=!1)},er.prototype.parseBGR=function(){this.pos=this.offset;try{var n="bit"+this.bitPP,e=this.width*this.height*4;this.data=new Uint8Array(e),this[n]()}catch(t){en.log("bit decode error:"+t)}},er.prototype.bit1=function(){var n,e=Math.ceil(this.width/8),t=e%4;for(n=this.height-1;n>=0;n--){for(var i=this.bottom_up?n:this.height-1-n,r=0;r<e;r++)for(var s=this.datav.getUint8(this.pos++,!0),a=i*this.width*4+8*r*4,o=0;o<8&&8*r+o<this.width;o++){var l=this.palette[s>>7-o&1];this.data[a+4*o]=l.blue,this.data[a+4*o+1]=l.green,this.data[a+4*o+2]=l.red,this.data[a+4*o+3]=255}t!==0&&(this.pos+=4-t)}},er.prototype.bit4=function(){for(var n=Math.ceil(this.width/2),e=n%4,t=this.height-1;t>=0;t--){for(var i=this.bottom_up?t:this.height-1-t,r=0;r<n;r++){var s=this.datav.getUint8(this.pos++,!0),a=i*this.width*4+2*r*4,o=s>>4,l=15&s,u=this.palette[o];if(this.data[a]=u.blue,this.data[a+1]=u.green,this.data[a+2]=u.red,this.data[a+3]=255,2*r+1>=this.width)break;u=this.palette[l],this.data[a+4]=u.blue,this.data[a+4+1]=u.green,this.data[a+4+2]=u.red,this.data[a+4+3]=255}e!==0&&(this.pos+=4-e)}},er.prototype.bit8=function(){for(var n=this.width%4,e=this.height-1;e>=0;e--){for(var t=this.bottom_up?e:this.height-1-e,i=0;i<this.width;i++){var r=this.datav.getUint8(this.pos++,!0),s=t*this.width*4+4*i;if(r<this.palette.length){var a=this.palette[r];this.data[s]=a.red,this.data[s+1]=a.green,this.data[s+2]=a.blue,this.data[s+3]=255}else this.data[s]=255,this.data[s+1]=255,this.data[s+2]=255,this.data[s+3]=255}n!==0&&(this.pos+=4-n)}},er.prototype.bit15=function(){for(var n=this.width%3,e=parseInt("11111",2),t=this.height-1;t>=0;t--){for(var i=this.bottom_up?t:this.height-1-t,r=0;r<this.width;r++){var s=this.datav.getUint16(this.pos,!0);this.pos+=2;var a=(s&e)/e*255|0,o=(s>>5&e)/e*255|0,l=(s>>10&e)/e*255|0,u=s>>15?255:0,h=i*this.width*4+4*r;this.data[h]=l,this.data[h+1]=o,this.data[h+2]=a,this.data[h+3]=u}this.pos+=n}},er.prototype.bit16=function(){for(var n=this.width%3,e=parseInt("11111",2),t=parseInt("111111",2),i=this.height-1;i>=0;i--){for(var r=this.bottom_up?i:this.height-1-i,s=0;s<this.width;s++){var a=this.datav.getUint16(this.pos,!0);this.pos+=2;var o=(a&e)/e*255|0,l=(a>>5&t)/t*255|0,u=(a>>11)/e*255|0,h=r*this.width*4+4*s;this.data[h]=u,this.data[h+1]=l,this.data[h+2]=o,this.data[h+3]=255}this.pos+=n}},er.prototype.bit24=function(){for(var n=this.height-1;n>=0;n--){for(var e=this.bottom_up?n:this.height-1-n,t=0;t<this.width;t++){var i=this.datav.getUint8(this.pos++,!0),r=this.datav.getUint8(this.pos++,!0),s=this.datav.getUint8(this.pos++,!0),a=e*this.width*4+4*t;this.data[a]=s,this.data[a+1]=r,this.data[a+2]=i,this.data[a+3]=255}this.pos+=this.width%4}},er.prototype.bit32=function(){for(var n=this.height-1;n>=0;n--)for(var e=this.bottom_up?n:this.height-1-n,t=0;t<this.width;t++){var i=this.datav.getUint8(this.pos++,!0),r=this.datav.getUint8(this.pos++,!0),s=this.datav.getUint8(this.pos++,!0),a=this.datav.getUint8(this.pos++,!0),o=e*this.width*4+4*t;this.data[o]=s,this.data[o+1]=r,this.data[o+2]=i,this.data[o+3]=a}},er.prototype.getData=function(){return this.data},function(n){n.processBMP=function(e,t,i,r){var s=new er(e,!1),a=s.width,o=s.height,l={data:s.getData(),width:a,height:o},u=new mh(100).encode(l,100);return n.processJPEG.call(this,u,t,i,r)}}(_t.API),Yp.prototype.getData=function(){return this.data},function(n){n.processWEBP=function(e,t,i,r){var s=new Yp(e),a=s.width,o=s.height,l={data:s.getData(),width:a,height:o},u=new mh(100).encode(l,100);return n.processJPEG.call(this,u,t,i,r)}}(_t.API),_t.API.processRGBA=function(n,e,t){for(var i=n.data,r=i.length,s=new Uint8Array(r/4*3),a=new Uint8Array(r/4),o=0,l=0,u=0;u<r;u+=4){var h=i[u],p=i[u+1],g=i[u+2],d=i[u+3];s[o++]=h,s[o++]=p,s[o++]=g,a[l++]=d}var x=this.__addimage__.arrayBufferToBinaryString(s);return{alpha:this.__addimage__.arrayBufferToBinaryString(a),data:x,index:e,alias:t,colorSpace:"DeviceRGB",bitsPerComponent:8,width:n.width,height:n.height}},_t.API.setLanguage=function(n){return this.internal.languageSettings===void 0&&(this.internal.languageSettings={},this.internal.languageSettings.isSubscribed=!1),{af:"Afrikaans",sq:"Albanian",ar:"Arabic (Standard)","ar-DZ":"Arabic (Algeria)","ar-BH":"Arabic (Bahrain)","ar-EG":"Arabic (Egypt)","ar-IQ":"Arabic (Iraq)","ar-JO":"Arabic (Jordan)","ar-KW":"Arabic (Kuwait)","ar-LB":"Arabic (Lebanon)","ar-LY":"Arabic (Libya)","ar-MA":"Arabic (Morocco)","ar-OM":"Arabic (Oman)","ar-QA":"Arabic (Qatar)","ar-SA":"Arabic (Saudi Arabia)","ar-SY":"Arabic (Syria)","ar-TN":"Arabic (Tunisia)","ar-AE":"Arabic (U.A.E.)","ar-YE":"Arabic (Yemen)",an:"Aragonese",hy:"Armenian",as:"Assamese",ast:"Asturian",az:"Azerbaijani",eu:"Basque",be:"Belarusian",bn:"Bengali",bs:"Bosnian",br:"Breton",bg:"Bulgarian",my:"Burmese",ca:"Catalan",ch:"Chamorro",ce:"Chechen",zh:"Chinese","zh-HK":"Chinese (Hong Kong)","zh-CN":"Chinese (PRC)","zh-SG":"Chinese (Singapore)","zh-TW":"Chinese (Taiwan)",cv:"Chuvash",co:"Corsican",cr:"Cree",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch (Standard)","nl-BE":"Dutch (Belgian)",en:"English","en-AU":"English (Australia)","en-BZ":"English (Belize)","en-CA":"English (Canada)","en-IE":"English (Ireland)","en-JM":"English (Jamaica)","en-NZ":"English (New Zealand)","en-PH":"English (Philippines)","en-ZA":"English (South Africa)","en-TT":"English (Trinidad & Tobago)","en-GB":"English (United Kingdom)","en-US":"English (United States)","en-ZW":"English (Zimbabwe)",eo:"Esperanto",et:"Estonian",fo:"Faeroese",fj:"Fijian",fi:"Finnish",fr:"French (Standard)","fr-BE":"French (Belgium)","fr-CA":"French (Canada)","fr-FR":"French (France)","fr-LU":"French (Luxembourg)","fr-MC":"French (Monaco)","fr-CH":"French (Switzerland)",fy:"Frisian",fur:"Friulian",gd:"Gaelic (Scots)","gd-IE":"Gaelic (Irish)",gl:"Galacian",ka:"Georgian",de:"German (Standard)","de-AT":"German (Austria)","de-DE":"German (Germany)","de-LI":"German (Liechtenstein)","de-LU":"German (Luxembourg)","de-CH":"German (Switzerland)",el:"Greek",gu:"Gujurati",ht:"Haitian",he:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",id:"Indonesian",iu:"Inuktitut",ga:"Irish",it:"Italian (Standard)","it-CH":"Italian (Switzerland)",ja:"Japanese",kn:"Kannada",ks:"Kashmiri",kk:"Kazakh",km:"Khmer",ky:"Kirghiz",tlh:"Klingon",ko:"Korean","ko-KP":"Korean (North Korea)","ko-KR":"Korean (South Korea)",la:"Latin",lv:"Latvian",lt:"Lithuanian",lb:"Luxembourgish",mk:"North Macedonia",ms:"Malay",ml:"Malayalam",mt:"Maltese",mi:"Maori",mr:"Marathi",mo:"Moldavian",nv:"Navajo",ng:"Ndonga",ne:"Nepali",no:"Norwegian",nb:"Norwegian (Bokmal)",nn:"Norwegian (Nynorsk)",oc:"Occitan",or:"Oriya",om:"Oromo",fa:"Persian","fa-IR":"Persian/Iran",pl:"Polish",pt:"Portuguese","pt-BR":"Portuguese (Brazil)",pa:"Punjabi","pa-IN":"Punjabi (India)","pa-PK":"Punjabi (Pakistan)",qu:"Quechua",rm:"Rhaeto-Romanic",ro:"Romanian","ro-MO":"Romanian (Moldavia)",ru:"Russian","ru-MO":"Russian (Moldavia)",sz:"Sami (Lappish)",sg:"Sango",sa:"Sanskrit",sc:"Sardinian",sd:"Sindhi",si:"Singhalese",sr:"Serbian",sk:"Slovak",sl:"Slovenian",so:"Somani",sb:"Sorbian",es:"Spanish","es-AR":"Spanish (Argentina)","es-BO":"Spanish (Bolivia)","es-CL":"Spanish (Chile)","es-CO":"Spanish (Colombia)","es-CR":"Spanish (Costa Rica)","es-DO":"Spanish (Dominican Republic)","es-EC":"Spanish (Ecuador)","es-SV":"Spanish (El Salvador)","es-GT":"Spanish (Guatemala)","es-HN":"Spanish (Honduras)","es-MX":"Spanish (Mexico)","es-NI":"Spanish (Nicaragua)","es-PA":"Spanish (Panama)","es-PY":"Spanish (Paraguay)","es-PE":"Spanish (Peru)","es-PR":"Spanish (Puerto Rico)","es-ES":"Spanish (Spain)","es-UY":"Spanish (Uruguay)","es-VE":"Spanish (Venezuela)",sx:"Sutu",sw:"Swahili",sv:"Swedish","sv-FI":"Swedish (Finland)","sv-SV":"Swedish (Sweden)",ta:"Tamil",tt:"Tatar",te:"Teluga",th:"Thai",tig:"Tigre",ts:"Tsonga",tn:"Tswana",tr:"Turkish",tk:"Turkmen",uk:"Ukrainian",hsb:"Upper Sorbian",ur:"Urdu",ve:"Venda",vi:"Vietnamese",vo:"Volapuk",wa:"Walloon",cy:"Welsh",xh:"Xhosa",ji:"Yiddish",zu:"Zulu"}[n]!==void 0&&(this.internal.languageSettings.languageCode=n,this.internal.languageSettings.isSubscribed===!1&&(this.internal.events.subscribe("putCatalog",function(){this.internal.write("/Lang ("+this.internal.languageSettings.languageCode+")")}),this.internal.languageSettings.isSubscribed=!0)),this},ka=_t.API,gc=ka.getCharWidthsArray=function(n,e){var t,i,r=(e=e||{}).font||this.internal.getFont(),s=e.fontSize||this.internal.getFontSize(),a=e.charSpace||this.internal.getCharSpace(),o=e.widths?e.widths:r.metadata.Unicode.widths,l=o.fof?o.fof:1,u=e.kerning?e.kerning:r.metadata.Unicode.kerning,h=u.fof?u.fof:1,p=e.doKerning!==!1,g=0,d=n.length,x=0,b=o[0]||l,_=[];for(t=0;t<d;t++)i=n.charCodeAt(t),typeof r.metadata.widthOfString=="function"?_.push((r.metadata.widthOfGlyph(r.metadata.characterToGlyph(i))+a*(1e3/s)||0)/1e3):(g=p&&Xt(u[i])==="object"&&!isNaN(parseInt(u[i][x],10))?u[i][x]/h:0,_.push((o[i]||b)/l+g)),x=i;return _},qp=ka.getStringUnitWidth=function(n,e){var t=(e=e||{}).fontSize||this.internal.getFontSize(),i=e.font||this.internal.getFont(),r=e.charSpace||this.internal.getCharSpace();return ka.processArabic&&(n=ka.processArabic(n)),typeof i.metadata.widthOfString=="function"?i.metadata.widthOfString(n,t,r)/t:gc.apply(this,arguments).reduce(function(s,a){return s+a},0)},Wp=function(n,e,t,i){for(var r=[],s=0,a=n.length,o=0;s!==a&&o+e[s]<t;)o+=e[s],s++;r.push(n.slice(0,s));var l=s;for(o=0;s!==a;)o+e[s]>i&&(r.push(n.slice(l,s)),o=0,l=s),o+=e[s],s++;return l!==s&&r.push(n.slice(l,s)),r},jp=function(n,e,t){t||(t={});var i,r,s,a,o,l,u,h=[],p=[h],g=t.textIndent||0,d=0,x=0,b=n.split(" "),_=gc.apply(this,[" ",t])[0];if(l=t.lineIndent===-1?b[0].length+2:t.lineIndent||0){var m=Array(l).join(" "),S=[];b.map(function(P){(P=P.split(/\s*\n/)).length>1?S=S.concat(P.map(function(q,G){return(G&&q.length?`
`:"")+q})):S.push(P[0])}),b=S,l=qp.apply(this,[m,t])}for(s=0,a=b.length;s<a;s++){var M=0;if(i=b[s],l&&i[0]==`
`&&(i=i.substr(1),M=1),g+d+(x=(r=gc.apply(this,[i,t])).reduce(function(P,q){return P+q},0))>e||M){if(x>e){for(o=Wp.apply(this,[i,r,e-(g+d),e]),h.push(o.shift()),h=[o.pop()];o.length;)p.push([o.shift()]);x=r.slice(i.length-(h[0]?h[0].length:0)).reduce(function(P,q){return P+q},0)}else h=[i];p.push(h),g=x+l,d=_}else h.push(i),g+=d+x,d=_}return u=l?function(P,q){return(q?m:"")+P.join(" ")}:function(P){return P.join(" ")},p.map(u)},ka.splitTextToSize=function(n,e,t){var i,r=(t=t||{}).fontSize||this.internal.getFontSize(),s=(function(h){if(h.widths&&h.kerning)return{widths:h.widths,kerning:h.kerning};var p=this.internal.getFont(h.fontName,h.fontStyle);return p.metadata.Unicode?{widths:p.metadata.Unicode.widths||{0:1},kerning:p.metadata.Unicode.kerning||{}}:{font:p.metadata,fontSize:this.internal.getFontSize(),charSpace:this.internal.getCharSpace()}}).call(this,t);i=Array.isArray(n)?n:String(n).split(/\r?\n/);var a=1*this.internal.scaleFactor*e/r;s.textIndent=t.textIndent?1*t.textIndent*this.internal.scaleFactor/r:0,s.lineIndent=t.lineIndent;var o,l,u=[];for(o=0,l=i.length;o<l;o++)u=u.concat(jp.apply(this,[i[o],a,s]));return u},function(n){n.__fontmetrics__=n.__fontmetrics__||{};for(var e="klmnopqrstuvwxyz",t={},i={},r=0;r<e.length;r++)t[e[r]]="0123456789abcdef"[r],i["0123456789abcdef"[r]]=e[r];var s=function(p){return"0x"+parseInt(p,10).toString(16)},a=n.__fontmetrics__.compress=function(p){var g,d,x,b,_=["{"];for(var m in p){if(g=p[m],isNaN(parseInt(m,10))?d="'"+m+"'":(m=parseInt(m,10),d=(d=s(m).slice(2)).slice(0,-1)+i[d.slice(-1)]),typeof g=="number")g<0?(x=s(g).slice(3),b="-"):(x=s(g).slice(2),b=""),x=b+x.slice(0,-1)+i[x.slice(-1)];else{if(Xt(g)!=="object")throw new Error("Don't know what to do with value type "+Xt(g)+".");x=a(g)}_.push(d+x)}return _.push("}"),_.join("")},o=n.__fontmetrics__.uncompress=function(p){if(typeof p!="string")throw new Error("Invalid argument passed to uncompress.");for(var g,d,x,b,_={},m=1,S=_,M=[],P="",q="",G=p.length-1,U=1;U<G;U+=1)(b=p[U])=="'"?g?(x=g.join(""),g=void 0):g=[]:g?g.push(b):b=="{"?(M.push([S,x]),S={},x=void 0):b=="}"?((d=M.pop())[0][d[1]]=S,x=void 0,S=d[0]):b=="-"?m=-1:x===void 0?t.hasOwnProperty(b)?(P+=t[b],x=parseInt(P,16)*m,m=1,P=""):P+=b:t.hasOwnProperty(b)?(q+=t[b],S[x]=parseInt(q,16)*m,m=1,x=void 0,q=""):q+=b;return _},l={codePages:["WinAnsiEncoding"],WinAnsiEncoding:o("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},u={Unicode:{Courier:l,"Courier-Bold":l,"Courier-BoldOblique":l,"Courier-Oblique":l,Helvetica:l,"Helvetica-Bold":l,"Helvetica-BoldOblique":l,"Helvetica-Oblique":l,"Times-Roman":l,"Times-Bold":l,"Times-BoldItalic":l,"Times-Italic":l}},h={Unicode:{"Courier-Oblique":o("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":o("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":o("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:o("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":o("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":o("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Symbol:o("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),Helvetica:o("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":o("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),ZapfDingbats:o("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-Bold":o("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":o("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":o("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":o("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};n.events.push(["addFont",function(p){var g=p.font,d=h.Unicode[g.postScriptName];d&&(g.metadata.Unicode={},g.metadata.Unicode.widths=d.widths,g.metadata.Unicode.kerning=d.kerning);var x=u.Unicode[g.postScriptName];x&&(g.metadata.Unicode.encoding=x,g.encoding=x.codePages[0])}])}(_t.API),function(n){var e=function(t){for(var i=t.length,r=new Uint8Array(i),s=0;s<i;s++)r[s]=t.charCodeAt(s);return r};n.API.events.push(["addFont",function(t){var i=void 0,r=t.font,s=t.instance;if(!r.isStandardFont){if(s===void 0)throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('"+r.postScriptName+"').");if(typeof(i=s.existsFileInVFS(r.postScriptName)===!1?s.loadFile(r.postScriptName):s.getFileFromVFS(r.postScriptName))!="string")throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('"+r.postScriptName+"').");(function(a,o){o=/^\x00\x01\x00\x00/.test(o)?e(o):e(Xo(o)),a.metadata=n.API.TTFFont.open(o),a.metadata.Unicode=a.metadata.Unicode||{encoding:{},kerning:{},widths:[]},a.metadata.glyIdsUsed=[0]})(r,i)}}])}(_t),function(n){function e(){return(xt.canvg?Promise.resolve(xt.canvg):Ih(()=>import("./index.es-CvvN5vxi.js"),[])).catch(function(t){return Promise.reject(new Error("Could not load canvg: "+t))}).then(function(t){return t.default?t.default:t})}_t.API.addSvgAsImage=function(t,i,r,s,a,o,l,u){if(isNaN(i)||isNaN(r))throw en.error("jsPDF.addSvgAsImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");if(isNaN(s)||isNaN(a))throw en.error("jsPDF.addSvgAsImage: Invalid measurements",arguments),new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");var h=document.createElement("canvas");h.width=s,h.height=a;var p=h.getContext("2d");p.fillStyle="#fff",p.fillRect(0,0,h.width,h.height);var g={ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0},d=this;return e().then(function(x){return x.fromString(p,t,g)},function(){return Promise.reject(new Error("Could not load canvg."))}).then(function(x){return x.render(g)}).then(function(){d.addImage(h.toDataURL("image/jpeg",1),i,r,s,a,l,u)})}}(),_t.API.putTotalPages=function(n){var e,t=0;parseInt(this.internal.getFont().id.substr(1),10)<15?(e=new RegExp(n,"g"),t=this.internal.getNumberOfPages()):(e=new RegExp(this.pdfEscape16(n,this.internal.getFont()),"g"),t=this.pdfEscape16(this.internal.getNumberOfPages()+"",this.internal.getFont()));for(var i=1;i<=this.internal.getNumberOfPages();i++)for(var r=0;r<this.internal.pages[i].length;r++)this.internal.pages[i][r]=this.internal.pages[i][r].replace(e,t);return this},_t.API.viewerPreferences=function(n,e){var t;n=n||{},e=e||!1;var i,r,s,a={HideToolbar:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},HideMenubar:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},HideWindowUI:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},FitWindow:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},CenterWindow:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},DisplayDocTitle:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.4},NonFullScreenPageMode:{defaultValue:"UseNone",value:"UseNone",type:"name",explicitSet:!1,valueSet:["UseNone","UseOutlines","UseThumbs","UseOC"],pdfVersion:1.3},Direction:{defaultValue:"L2R",value:"L2R",type:"name",explicitSet:!1,valueSet:["L2R","R2L"],pdfVersion:1.3},ViewArea:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},ViewClip:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintArea:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintClip:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintScaling:{defaultValue:"AppDefault",value:"AppDefault",type:"name",explicitSet:!1,valueSet:["AppDefault","None"],pdfVersion:1.6},Duplex:{defaultValue:"",value:"none",type:"name",explicitSet:!1,valueSet:["Simplex","DuplexFlipShortEdge","DuplexFlipLongEdge","none"],pdfVersion:1.7},PickTrayByPDFSize:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.7},PrintPageRange:{defaultValue:"",value:"",type:"array",explicitSet:!1,valueSet:null,pdfVersion:1.7},NumCopies:{defaultValue:1,value:1,type:"integer",explicitSet:!1,valueSet:null,pdfVersion:1.7}},o=Object.keys(a),l=[],u=0,h=0,p=0;function g(x,b){var _,m=!1;for(_=0;_<x.length;_+=1)x[_]===b&&(m=!0);return m}if(this.internal.viewerpreferences===void 0&&(this.internal.viewerpreferences={},this.internal.viewerpreferences.configuration=JSON.parse(JSON.stringify(a)),this.internal.viewerpreferences.isSubscribed=!1),t=this.internal.viewerpreferences.configuration,n==="reset"||e===!0){var d=o.length;for(p=0;p<d;p+=1)t[o[p]].value=t[o[p]].defaultValue,t[o[p]].explicitSet=!1}if(Xt(n)==="object"){for(r in n)if(s=n[r],g(o,r)&&s!==void 0){if(t[r].type==="boolean"&&typeof s=="boolean")t[r].value=s;else if(t[r].type==="name"&&g(t[r].valueSet,s))t[r].value=s;else if(t[r].type==="integer"&&Number.isInteger(s))t[r].value=s;else if(t[r].type==="array"){for(u=0;u<s.length;u+=1)if(i=!0,s[u].length===1&&typeof s[u][0]=="number")l.push(String(s[u]-1));else if(s[u].length>1){for(h=0;h<s[u].length;h+=1)typeof s[u][h]!="number"&&(i=!1);i===!0&&l.push([s[u][0]-1,s[u][1]-1].join(" "))}t[r].value="["+l.join(" ")+"]"}else t[r].value=t[r].defaultValue;t[r].explicitSet=!0}}return this.internal.viewerpreferences.isSubscribed===!1&&(this.internal.events.subscribe("putCatalog",function(){var x,b=[];for(x in t)t[x].explicitSet===!0&&(t[x].type==="name"?b.push("/"+x+" /"+t[x].value):b.push("/"+x+" "+t[x].value));b.length!==0&&this.internal.write(`/ViewerPreferences
<<
`+b.join(`
`)+`
>>`)}),this.internal.viewerpreferences.isSubscribed=!0),this.internal.viewerpreferences.configuration=t,this},function(n){var e=function(){var i='<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="'+this.internal.__metadata__.namespaceuri+'"><jspdf:metadata>',r=unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')),s=unescape(encodeURIComponent(i)),a=unescape(encodeURIComponent(this.internal.__metadata__.metadata)),o=unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")),l=unescape(encodeURIComponent("</x:xmpmeta>")),u=s.length+a.length+o.length+r.length+l.length;this.internal.__metadata__.metadata_object_number=this.internal.newObject(),this.internal.write("<< /Type /Metadata /Subtype /XML /Length "+u+" >>"),this.internal.write("stream"),this.internal.write(r+s+a+o+l),this.internal.write("endstream"),this.internal.write("endobj")},t=function(){this.internal.__metadata__.metadata_object_number&&this.internal.write("/Metadata "+this.internal.__metadata__.metadata_object_number+" 0 R")};n.addMetadata=function(i,r){return this.internal.__metadata__===void 0&&(this.internal.__metadata__={metadata:i,namespaceuri:r||"http://jspdf.default.namespaceuri/"},this.internal.events.subscribe("putCatalog",t),this.internal.events.subscribe("postPutResources",e)),this}}(_t.API),function(n){var e=n.API,t=e.pdfEscape16=function(s,a){for(var o,l=a.metadata.Unicode.widths,u=["","0","00","000","0000"],h=[""],p=0,g=s.length;p<g;++p){if(o=a.metadata.characterToGlyph(s.charCodeAt(p)),a.metadata.glyIdsUsed.push(o),a.metadata.toUnicode[o]=s.charCodeAt(p),l.indexOf(o)==-1&&(l.push(o),l.push([parseInt(a.metadata.widthOfGlyph(o),10)])),o=="0")return h.join("");o=o.toString(16),h.push(u[4-o.length],o)}return h.join("")},i=function(s){var a,o,l,u,h,p,g;for(h=`/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000><ffff>
endcodespacerange`,l=[],p=0,g=(o=Object.keys(s).sort(function(d,x){return d-x})).length;p<g;p++)a=o[p],l.length>=100&&(h+=`
`+l.length+` beginbfchar
`+l.join(`
`)+`
endbfchar`,l=[]),s[a]!==void 0&&s[a]!==null&&typeof s[a].toString=="function"&&(u=("0000"+s[a].toString(16)).slice(-4),a=("0000"+(+a).toString(16)).slice(-4),l.push("<"+a+"><"+u+">"));return l.length&&(h+=`
`+l.length+` beginbfchar
`+l.join(`
`)+`
endbfchar
`),h+=`endcmap
CMapName currentdict /CMap defineresource pop
end
end`};e.events.push(["putFont",function(s){(function(a){var o=a.font,l=a.out,u=a.newObject,h=a.putStream;if(o.metadata instanceof n.API.TTFFont&&o.encoding==="Identity-H"){for(var p=o.metadata.Unicode.widths,g=o.metadata.subset.encode(o.metadata.glyIdsUsed,1),d="",x=0;x<g.length;x++)d+=String.fromCharCode(g[x]);var b=u();h({data:d,addLength1:!0,objectId:b}),l("endobj");var _=u();h({data:i(o.metadata.toUnicode),addLength1:!0,objectId:_}),l("endobj");var m=u();l("<<"),l("/Type /FontDescriptor"),l("/FontName /"+Ga(o.fontName)),l("/FontFile2 "+b+" 0 R"),l("/FontBBox "+n.API.PDFObject.convert(o.metadata.bbox)),l("/Flags "+o.metadata.flags),l("/StemV "+o.metadata.stemV),l("/ItalicAngle "+o.metadata.italicAngle),l("/Ascent "+o.metadata.ascender),l("/Descent "+o.metadata.decender),l("/CapHeight "+o.metadata.capHeight),l(">>"),l("endobj");var S=u();l("<<"),l("/Type /Font"),l("/BaseFont /"+Ga(o.fontName)),l("/FontDescriptor "+m+" 0 R"),l("/W "+n.API.PDFObject.convert(p)),l("/CIDToGIDMap /Identity"),l("/DW 1000"),l("/Subtype /CIDFontType2"),l("/CIDSystemInfo"),l("<<"),l("/Supplement 0"),l("/Registry (Adobe)"),l("/Ordering ("+o.encoding+")"),l(">>"),l(">>"),l("endobj"),o.objectNumber=u(),l("<<"),l("/Type /Font"),l("/Subtype /Type0"),l("/ToUnicode "+_+" 0 R"),l("/BaseFont /"+Ga(o.fontName)),l("/Encoding /"+o.encoding),l("/DescendantFonts ["+S+" 0 R]"),l(">>"),l("endobj"),o.isAlreadyPutted=!0}})(s)}]),e.events.push(["putFont",function(s){(function(a){var o=a.font,l=a.out,u=a.newObject,h=a.putStream;if(o.metadata instanceof n.API.TTFFont&&o.encoding==="WinAnsiEncoding"){for(var p=o.metadata.rawData,g="",d=0;d<p.length;d++)g+=String.fromCharCode(p[d]);var x=u();h({data:g,addLength1:!0,objectId:x}),l("endobj");var b=u();h({data:i(o.metadata.toUnicode),addLength1:!0,objectId:b}),l("endobj");var _=u();l("<<"),l("/Descent "+o.metadata.decender),l("/CapHeight "+o.metadata.capHeight),l("/StemV "+o.metadata.stemV),l("/Type /FontDescriptor"),l("/FontFile2 "+x+" 0 R"),l("/Flags 96"),l("/FontBBox "+n.API.PDFObject.convert(o.metadata.bbox)),l("/FontName /"+Ga(o.fontName)),l("/ItalicAngle "+o.metadata.italicAngle),l("/Ascent "+o.metadata.ascender),l(">>"),l("endobj"),o.objectNumber=u();for(var m=0;m<o.metadata.hmtx.widths.length;m++)o.metadata.hmtx.widths[m]=parseInt(o.metadata.hmtx.widths[m]*(1e3/o.metadata.head.unitsPerEm));l("<</Subtype/TrueType/Type/Font/ToUnicode "+b+" 0 R/BaseFont/"+Ga(o.fontName)+"/FontDescriptor "+_+" 0 R/Encoding/"+o.encoding+" /FirstChar 29 /LastChar 255 /Widths "+n.API.PDFObject.convert(o.metadata.hmtx.widths)+">>"),l("endobj"),o.isAlreadyPutted=!0}})(s)}]);var r=function(s){var a,o=s.text||"",l=s.x,u=s.y,h=s.options||{},p=s.mutex||{},g=p.pdfEscape,d=p.activeFontKey,x=p.fonts,b=d,_="",m=0,S="",M=x[b].encoding;if(x[b].encoding!=="Identity-H")return{text:o,x:l,y:u,options:h,mutex:p};for(S=o,b=d,Array.isArray(o)&&(S=o[0]),m=0;m<S.length;m+=1)x[b].metadata.hasOwnProperty("cmap")&&(a=x[b].metadata.cmap.unicode.codeMap[S[m].charCodeAt(0)]),a||S[m].charCodeAt(0)<256&&x[b].metadata.hasOwnProperty("Unicode")?_+=S[m]:_+="";var P="";return parseInt(b.slice(1))<14||M==="WinAnsiEncoding"?P=g(_,b).split("").map(function(q){return q.charCodeAt(0).toString(16)}).join(""):M==="Identity-H"&&(P=t(_,x[b])),p.isHex=!0,{text:P,x:l,y:u,options:h,mutex:p}};e.events.push(["postProcessText",function(s){var a=s.text||"",o=[],l={text:a,x:s.x,y:s.y,options:s.options,mutex:s.mutex};if(Array.isArray(a)){var u=0;for(u=0;u<a.length;u+=1)Array.isArray(a[u])&&a[u].length===3?o.push([r(Object.assign({},l,{text:a[u][0]})).text,a[u][1],a[u][2]]):o.push(r(Object.assign({},l,{text:a[u]})).text);s.text=o}else s.text=r(Object.assign({},l,{text:a})).text}])}(_t),function(n){var e=function(){return this.internal.vFS===void 0&&(this.internal.vFS={}),!0};n.existsFileInVFS=function(t){return e.call(this),this.internal.vFS[t]!==void 0},n.addFileToVFS=function(t,i){return e.call(this),this.internal.vFS[t]=i,this},n.getFileFromVFS=function(t){return e.call(this),this.internal.vFS[t]!==void 0?this.internal.vFS[t]:null}}(_t.API),function(n){n.__bidiEngine__=n.prototype.__bidiEngine__=function(i){var r,s,a,o,l,u,h,p=e,g=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],d=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],x={L:0,R:1,EN:2,AN:3,N:4,B:5,S:6},b={0:0,5:1,6:2,7:3,32:4,251:5,254:6,255:7},_=["(",")","(","<",">","<","[","]","[","{","}","{","«","»","«","‹","›","‹","⁅","⁆","⁅","⁽","⁾","⁽","₍","₎","₍","≤","≥","≤","〈","〉","〈","﹙","﹚","﹙","﹛","﹜","﹛","﹝","﹞","﹝","﹤","﹥","﹤"],m=new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/),S=!1,M=0;this.__bidiEngine__={};var P=function(E){var R=E.charCodeAt(),X=R>>8,N=b[X];return N!==void 0?p[256*N+(255&R)]:X===252||X===253?"AL":m.test(X)?"L":X===8?"R":"N"},q=function(E){for(var R,X=0;X<E.length;X++){if((R=P(E.charAt(X)))==="L")return!1;if(R==="R")return!0}return!1},G=function(E,R,X,N){var J,Q,ie,ee,te=R[N];switch(te){case"L":case"R":S=!1;break;case"N":case"AN":break;case"EN":S&&(te="AN");break;case"AL":S=!0,te="R";break;case"WS":te="N";break;case"CS":N<1||N+1>=R.length||(J=X[N-1])!=="EN"&&J!=="AN"||(Q=R[N+1])!=="EN"&&Q!=="AN"?te="N":S&&(Q="AN"),te=Q===J?Q:"N";break;case"ES":te=(J=N>0?X[N-1]:"B")==="EN"&&N+1<R.length&&R[N+1]==="EN"?"EN":"N";break;case"ET":if(N>0&&X[N-1]==="EN"){te="EN";break}if(S){te="N";break}for(ie=N+1,ee=R.length;ie<ee&&R[ie]==="ET";)ie++;te=ie<ee&&R[ie]==="EN"?"EN":"N";break;case"NSM":if(a&&!o){for(ee=R.length,ie=N+1;ie<ee&&R[ie]==="NSM";)ie++;if(ie<ee){var ae=E[N],xe=ae>=1425&&ae<=2303||ae===64286;if(J=R[ie],xe&&(J==="R"||J==="AL")){te="R";break}}}te=N<1||(J=R[N-1])==="B"?"N":X[N-1];break;case"B":S=!1,r=!0,te=M;break;case"S":s=!0,te="N";break;case"LRE":case"RLE":case"LRO":case"RLO":case"PDF":S=!1;break;case"BN":te="N"}return te},U=function(E,R,X){var N=E.split("");return X&&H(N,X,{hiLevel:M}),N.reverse(),R&&R.reverse(),N.join("")},H=function(E,R,X){var N,J,Q,ie,ee,te=-1,ae=E.length,xe=0,T=[],F=M?d:g,V=[];for(S=!1,r=!1,s=!1,J=0;J<ae;J++)V[J]=P(E[J]);for(Q=0;Q<ae;Q++){if(ee=xe,T[Q]=G(E,V,T,Q),N=240&(xe=F[ee][x[T[Q]]]),xe&=15,R[Q]=ie=F[xe][5],N>0)if(N===16){for(J=te;J<Q;J++)R[J]=1;te=-1}else te=-1;if(F[xe][6])te===-1&&(te=Q);else if(te>-1){for(J=te;J<Q;J++)R[J]=ie;te=-1}V[Q]==="B"&&(R[Q]=0),X.hiLevel|=ie}s&&function(K,ne,ce){for(var fe=0;fe<ce;fe++)if(K[fe]==="S"){ne[fe]=M;for(var pe=fe-1;pe>=0&&K[pe]==="WS";pe--)ne[pe]=M}}(V,R,ae)},A=function(E,R,X,N,J){if(!(J.hiLevel<E)){if(E===1&&M===1&&!r)return R.reverse(),void(X&&X.reverse());for(var Q,ie,ee,te,ae=R.length,xe=0;xe<ae;){if(N[xe]>=E){for(ee=xe+1;ee<ae&&N[ee]>=E;)ee++;for(te=xe,ie=ee-1;te<ie;te++,ie--)Q=R[te],R[te]=R[ie],R[ie]=Q,X&&(Q=X[te],X[te]=X[ie],X[ie]=Q);xe=ee}xe++}}},D=function(E,R,X){var N=E.split(""),J={hiLevel:M};return X||(X=[]),H(N,X,J),function(Q,ie,ee){if(ee.hiLevel!==0&&h)for(var te,ae=0;ae<Q.length;ae++)ie[ae]===1&&(te=_.indexOf(Q[ae]))>=0&&(Q[ae]=_[te+1])}(N,X,J),A(2,N,R,X,J),A(1,N,R,X,J),N.join("")};return this.__bidiEngine__.doBidiReorder=function(E,R,X){if(function(J,Q){if(Q)for(var ie=0;ie<J.length;ie++)Q[ie]=ie;o===void 0&&(o=q(J)),u===void 0&&(u=q(J))}(E,R),a||!l||u)if(a&&l&&o^u)M=o?1:0,E=U(E,R,X);else if(!a&&l&&u)M=o?1:0,E=D(E,R,X),E=U(E,R);else if(!a||o||l||u){if(a&&!l&&o^u)E=U(E,R),o?(M=0,E=D(E,R,X)):(M=1,E=D(E,R,X),E=U(E,R));else if(a&&o&&!l&&u)M=1,E=D(E,R,X),E=U(E,R);else if(!a&&!l&&o^u){var N=h;o?(M=1,E=D(E,R,X),M=0,h=!1,E=D(E,R,X),h=N):(M=0,E=D(E,R,X),E=U(E,R),M=1,h=!1,E=D(E,R,X),h=N,E=U(E,R))}}else M=0,E=D(E,R,X);else M=o?1:0,E=D(E,R,X);return E},this.__bidiEngine__.setOptions=function(E){E&&(a=E.isInputVisual,l=E.isOutputVisual,o=E.isInputRtl,u=E.isOutputRtl,h=E.isSymmetricSwapping)},this.__bidiEngine__.setOptions(i),this.__bidiEngine__};var e=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","N","N","ET","ET","ET","N","N","N","N","N","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","N","ET","ET","ET","ET","N","N","N","N","L","N","N","BN","N","N","ET","ET","EN","EN","N","L","N","N","N","EN","L","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","N","N","N","N","N","ET","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","R","NSM","R","NSM","NSM","R","NSM","NSM","R","NSM","N","N","N","N","N","N","N","N","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","N","N","N","N","N","R","R","R","R","R","N","N","N","N","N","N","N","N","N","N","N","AN","AN","AN","AN","AN","AN","N","N","AL","ET","ET","AL","CS","AL","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","N","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","NSM","NSM","N","NSM","NSM","NSM","NSM","AL","AL","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","N","N","N","N","N","N","N","N","N","N","N","N","N","N","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","R","R","N","N","N","N","R","N","N","N","N","N","WS","WS","WS","WS","WS","WS","WS","WS","WS","WS","WS","BN","BN","BN","L","R","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","WS","B","LRE","RLE","PDF","LRO","RLO","CS","ET","ET","ET","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","CS","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","WS","BN","BN","BN","BN","BN","N","LRI","RLI","FSI","PDI","BN","BN","BN","BN","BN","BN","EN","L","N","N","EN","EN","EN","EN","EN","EN","ES","ES","N","N","N","L","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","ES","ES","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","L","L","N","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","N","N","N","N","N","R","NSM","R","R","R","R","R","R","R","R","R","R","ES","R","R","R","R","R","R","R","R","R","R","R","R","R","N","R","R","R","R","R","N","R","N","R","R","N","R","R","N","R","R","R","R","R","R","R","R","R","R","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","CS","N","CS","N","N","CS","N","N","N","N","N","N","N","N","N","ET","N","N","ES","ES","N","N","N","N","N","ET","ET","N","N","N","N","N","AL","AL","AL","AL","AL","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","N","BN","N","N","N","ET","ET","ET","N","N","N","N","N","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","L","L","L","L","L","L","N","N","L","L","L","L","L","L","N","N","L","L","L","L","L","L","N","N","L","L","L","N","N","N","ET","ET","N","N","N","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"],t=new n.__bidiEngine__({isInputVisual:!0});n.API.events.push(["postProcessText",function(i){var r=i.text,s=(i.x,i.y,i.options||{}),a=(i.mutex,s.lang,[]);if(s.isInputVisual=typeof s.isInputVisual!="boolean"||s.isInputVisual,t.setOptions(s),Object.prototype.toString.call(r)==="[object Array]"){var o=0;for(a=[],o=0;o<r.length;o+=1)Object.prototype.toString.call(r[o])==="[object Array]"?a.push([t.doBidiReorder(r[o][0]),r[o][1],r[o][2]]):a.push([t.doBidiReorder(r[o])]);i.text=a}else i.text=t.doBidiReorder(r);t.setOptions({isInputVisual:!0})}])}(_t),_t.API.TTFFont=function(){function n(e){var t;if(this.rawData=e,t=this.contents=new bs(e),this.contents.pos=4,t.readString(4)==="ttcf")throw new Error("TTCF not supported.");t.pos=0,this.parse(),this.subset=new Hb(this),this.registerTTF()}return n.open=function(e){return new n(e)},n.prototype.parse=function(){return this.directory=new Lb(this.contents),this.head=new Rb(this),this.name=new Fb(this),this.cmap=new r0(this),this.toUnicode={},this.hhea=new Pb(this),this.maxp=new Ub(this),this.hmtx=new Ob(this),this.post=new Ib(this),this.os2=new Nb(this),this.loca=new Gb(this),this.glyf=new kb(this),this.ascender=this.os2.exists&&this.os2.ascender||this.hhea.ascender,this.decender=this.os2.exists&&this.os2.decender||this.hhea.decender,this.lineGap=this.os2.exists&&this.os2.lineGap||this.hhea.lineGap,this.bbox=[this.head.xMin,this.head.yMin,this.head.xMax,this.head.yMax]},n.prototype.registerTTF=function(){var e,t,i,r,s;if(this.scaleFactor=1e3/this.head.unitsPerEm,this.bbox=(function(){var a,o,l,u;for(u=[],a=0,o=(l=this.bbox).length;a<o;a++)e=l[a],u.push(Math.round(e*this.scaleFactor));return u}).call(this),this.stemV=0,this.post.exists?(i=255&(r=this.post.italic_angle),32768&(t=r>>16)&&(t=-(1+(65535^t))),this.italicAngle=+(t+"."+i)):this.italicAngle=0,this.ascender=Math.round(this.ascender*this.scaleFactor),this.decender=Math.round(this.decender*this.scaleFactor),this.lineGap=Math.round(this.lineGap*this.scaleFactor),this.capHeight=this.os2.exists&&this.os2.capHeight||this.ascender,this.xHeight=this.os2.exists&&this.os2.xHeight||0,this.familyClass=(this.os2.exists&&this.os2.familyClass||0)>>8,this.isSerif=(s=this.familyClass)===1||s===2||s===3||s===4||s===5||s===7,this.isScript=this.familyClass===10,this.flags=0,this.post.isFixedPitch&&(this.flags|=1),this.isSerif&&(this.flags|=2),this.isScript&&(this.flags|=8),this.italicAngle!==0&&(this.flags|=64),this.flags|=32,!this.cmap.unicode)throw new Error("No unicode cmap for font")},n.prototype.characterToGlyph=function(e){var t;return((t=this.cmap.unicode)!=null?t.codeMap[e]:void 0)||0},n.prototype.widthOfGlyph=function(e){var t;return t=1e3/this.head.unitsPerEm,this.hmtx.forGlyph(e).advance*t},n.prototype.widthOfString=function(e,t,i){var r,s,a,o;for(a=0,s=0,o=(e=""+e).length;0<=o?s<o:s>o;s=0<=o?++s:--s)r=e.charCodeAt(s),a+=this.widthOfGlyph(this.characterToGlyph(r))+i*(1e3/t)||0;return a*(t/1e3)},n.prototype.lineHeight=function(e,t){var i;return t==null&&(t=!1),i=t?this.lineGap:0,(this.ascender+i-this.decender)/1e3*e},n}();var lr,bs=function(){function n(e){this.data=e??[],this.pos=0,this.length=this.data.length}return n.prototype.readByte=function(){return this.data[this.pos++]},n.prototype.writeByte=function(e){return this.data[this.pos++]=e},n.prototype.readUInt32=function(){return 16777216*this.readByte()+(this.readByte()<<16)+(this.readByte()<<8)+this.readByte()},n.prototype.writeUInt32=function(e){return this.writeByte(e>>>24&255),this.writeByte(e>>16&255),this.writeByte(e>>8&255),this.writeByte(255&e)},n.prototype.readInt32=function(){var e;return(e=this.readUInt32())>=2147483648?e-4294967296:e},n.prototype.writeInt32=function(e){return e<0&&(e+=4294967296),this.writeUInt32(e)},n.prototype.readUInt16=function(){return this.readByte()<<8|this.readByte()},n.prototype.writeUInt16=function(e){return this.writeByte(e>>8&255),this.writeByte(255&e)},n.prototype.readInt16=function(){var e;return(e=this.readUInt16())>=32768?e-65536:e},n.prototype.writeInt16=function(e){return e<0&&(e+=65536),this.writeUInt16(e)},n.prototype.readString=function(e){var t,i;for(i=[],t=0;0<=e?t<e:t>e;t=0<=e?++t:--t)i[t]=String.fromCharCode(this.readByte());return i.join("")},n.prototype.writeString=function(e){var t,i,r;for(r=[],t=0,i=e.length;0<=i?t<i:t>i;t=0<=i?++t:--t)r.push(this.writeByte(e.charCodeAt(t)));return r},n.prototype.readShort=function(){return this.readInt16()},n.prototype.writeShort=function(e){return this.writeInt16(e)},n.prototype.readLongLong=function(){var e,t,i,r,s,a,o,l;return e=this.readByte(),t=this.readByte(),i=this.readByte(),r=this.readByte(),s=this.readByte(),a=this.readByte(),o=this.readByte(),l=this.readByte(),128&e?-1*(72057594037927940*(255^e)+281474976710656*(255^t)+1099511627776*(255^i)+4294967296*(255^r)+16777216*(255^s)+65536*(255^a)+256*(255^o)+(255^l)+1):72057594037927940*e+281474976710656*t+1099511627776*i+4294967296*r+16777216*s+65536*a+256*o+l},n.prototype.writeLongLong=function(e){var t,i;return t=Math.floor(e/4294967296),i=4294967295&e,this.writeByte(t>>24&255),this.writeByte(t>>16&255),this.writeByte(t>>8&255),this.writeByte(255&t),this.writeByte(i>>24&255),this.writeByte(i>>16&255),this.writeByte(i>>8&255),this.writeByte(255&i)},n.prototype.readInt=function(){return this.readInt32()},n.prototype.writeInt=function(e){return this.writeInt32(e)},n.prototype.read=function(e){var t,i;for(t=[],i=0;0<=e?i<e:i>e;i=0<=e?++i:--i)t.push(this.readByte());return t},n.prototype.write=function(e){var t,i,r,s;for(s=[],i=0,r=e.length;i<r;i++)t=e[i],s.push(this.writeByte(t));return s},n}(),Lb=function(){var n;function e(t){var i,r,s;for(this.scalarType=t.readInt(),this.tableCount=t.readShort(),this.searchRange=t.readShort(),this.entrySelector=t.readShort(),this.rangeShift=t.readShort(),this.tables={},r=0,s=this.tableCount;0<=s?r<s:r>s;r=0<=s?++r:--r)i={tag:t.readString(4),checksum:t.readInt(),offset:t.readInt(),length:t.readInt()},this.tables[i.tag]=i}return e.prototype.encode=function(t){var i,r,s,a,o,l,u,h,p,g,d,x,b;for(b in d=Object.keys(t).length,l=Math.log(2),p=16*Math.floor(Math.log(d)/l),a=Math.floor(p/l),h=16*d-p,(r=new bs).writeInt(this.scalarType),r.writeShort(d),r.writeShort(p),r.writeShort(a),r.writeShort(h),s=16*d,u=r.pos+s,o=null,x=[],t)for(g=t[b],r.writeString(b),r.writeInt(n(g)),r.writeInt(u),r.writeInt(g.length),x=x.concat(g),b==="head"&&(o=u),u+=g.length;u%4;)x.push(0),u++;return r.write(x),i=2981146554-n(r.data),r.pos=o+8,r.writeUInt32(i),r.data},n=function(t){var i,r,s,a;for(t=s0.call(t);t.length%4;)t.push(0);for(s=new bs(t),r=0,i=0,a=t.length;i<a;i=i+=4)r+=s.readUInt32();return 4294967295&r},e}(),Cb={}.hasOwnProperty,xr=function(n,e){for(var t in e)Cb.call(e,t)&&(n[t]=e[t]);function i(){this.constructor=n}return i.prototype=e.prototype,n.prototype=new i,n.__super__=e.prototype,n};lr=function(){function n(e){var t;this.file=e,t=this.file.directory.tables[this.tag],this.exists=!!t,t&&(this.offset=t.offset,this.length=t.length,this.parse(this.file.contents))}return n.prototype.parse=function(){},n.prototype.encode=function(){},n.prototype.raw=function(){return this.exists?(this.file.contents.pos=this.offset,this.file.contents.read(this.length)):null},n}();var Rb=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="head",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.revision=t.readInt(),this.checkSumAdjustment=t.readInt(),this.magicNumber=t.readInt(),this.flags=t.readShort(),this.unitsPerEm=t.readShort(),this.created=t.readLongLong(),this.modified=t.readLongLong(),this.xMin=t.readShort(),this.yMin=t.readShort(),this.xMax=t.readShort(),this.yMax=t.readShort(),this.macStyle=t.readShort(),this.lowestRecPPEM=t.readShort(),this.fontDirectionHint=t.readShort(),this.indexToLocFormat=t.readShort(),this.glyphDataFormat=t.readShort()},e.prototype.encode=function(t){var i;return(i=new bs).writeInt(this.version),i.writeInt(this.revision),i.writeInt(this.checkSumAdjustment),i.writeInt(this.magicNumber),i.writeShort(this.flags),i.writeShort(this.unitsPerEm),i.writeLongLong(this.created),i.writeLongLong(this.modified),i.writeShort(this.xMin),i.writeShort(this.yMin),i.writeShort(this.xMax),i.writeShort(this.yMax),i.writeShort(this.macStyle),i.writeShort(this.lowestRecPPEM),i.writeShort(this.fontDirectionHint),i.writeShort(t),i.writeShort(this.glyphDataFormat),i.data},e}(),$p=function(){function n(e,t){var i,r,s,a,o,l,u,h,p,g,d,x,b,_,m,S,M;switch(this.platformID=e.readUInt16(),this.encodingID=e.readShort(),this.offset=t+e.readInt(),p=e.pos,e.pos=this.offset,this.format=e.readUInt16(),this.length=e.readUInt16(),this.language=e.readUInt16(),this.isUnicode=this.platformID===3&&this.encodingID===1&&this.format===4||this.platformID===0&&this.format===4,this.codeMap={},this.format){case 0:for(l=0;l<256;++l)this.codeMap[l]=e.readByte();break;case 4:for(d=e.readUInt16(),g=d/2,e.pos+=6,s=function(){var P,q;for(q=[],l=P=0;0<=g?P<g:P>g;l=0<=g?++P:--P)q.push(e.readUInt16());return q}(),e.pos+=2,b=function(){var P,q;for(q=[],l=P=0;0<=g?P<g:P>g;l=0<=g?++P:--P)q.push(e.readUInt16());return q}(),u=function(){var P,q;for(q=[],l=P=0;0<=g?P<g:P>g;l=0<=g?++P:--P)q.push(e.readUInt16());return q}(),h=function(){var P,q;for(q=[],l=P=0;0<=g?P<g:P>g;l=0<=g?++P:--P)q.push(e.readUInt16());return q}(),r=(this.length-e.pos+this.offset)/2,o=function(){var P,q;for(q=[],l=P=0;0<=r?P<r:P>r;l=0<=r?++P:--P)q.push(e.readUInt16());return q}(),l=m=0,M=s.length;m<M;l=++m)for(_=s[l],i=S=x=b[l];x<=_?S<=_:S>=_;i=x<=_?++S:--S)h[l]===0?a=i+u[l]:(a=o[h[l]/2+(i-x)-(g-l)]||0)!==0&&(a+=u[l]),this.codeMap[i]=65535&a}e.pos=p}return n.encode=function(e,t){var i,r,s,a,o,l,u,h,p,g,d,x,b,_,m,S,M,P,q,G,U,H,A,D,E,R,X,N,J,Q,ie,ee,te,ae,xe,T,F,V,K,ne,ce,fe,pe,Ce,Ie,re;switch(N=new bs,a=Object.keys(e).sort(function(Xe,Ve){return Xe-Ve}),t){case"macroman":for(b=0,_=function(){var Xe=[];for(x=0;x<256;++x)Xe.push(0);return Xe}(),S={0:0},s={},J=0,te=a.length;J<te;J++)S[pe=e[r=a[J]]]==null&&(S[pe]=++b),s[r]={old:e[r],new:S[e[r]]},_[r]=S[e[r]];return N.writeUInt16(1),N.writeUInt16(0),N.writeUInt32(12),N.writeUInt16(0),N.writeUInt16(262),N.writeUInt16(0),N.write(_),{charMap:s,subtable:N.data,maxGlyphID:b+1};case"unicode":for(R=[],p=[],M=0,S={},i={},m=u=null,Q=0,ae=a.length;Q<ae;Q++)S[q=e[r=a[Q]]]==null&&(S[q]=++M),i[r]={old:q,new:S[q]},o=S[q]-r,m!=null&&o===u||(m&&p.push(m),R.push(r),u=o),m=r;for(m&&p.push(m),p.push(65535),R.push(65535),D=2*(A=R.length),H=2*Math.pow(Math.log(A)/Math.LN2,2),g=Math.log(H/2)/Math.LN2,U=2*A-H,l=[],G=[],d=[],x=ie=0,xe=R.length;ie<xe;x=++ie){if(E=R[x],h=p[x],E===65535){l.push(0),G.push(0);break}if(E-(X=i[E].new)>=32768)for(l.push(0),G.push(2*(d.length+A-x)),r=ee=E;E<=h?ee<=h:ee>=h;r=E<=h?++ee:--ee)d.push(i[r].new);else l.push(X-E),G.push(0)}for(N.writeUInt16(3),N.writeUInt16(1),N.writeUInt32(12),N.writeUInt16(4),N.writeUInt16(16+8*A+2*d.length),N.writeUInt16(0),N.writeUInt16(D),N.writeUInt16(H),N.writeUInt16(g),N.writeUInt16(U),ce=0,T=p.length;ce<T;ce++)r=p[ce],N.writeUInt16(r);for(N.writeUInt16(0),fe=0,F=R.length;fe<F;fe++)r=R[fe],N.writeUInt16(r);for(Ce=0,V=l.length;Ce<V;Ce++)o=l[Ce],N.writeUInt16(o);for(Ie=0,K=G.length;Ie<K;Ie++)P=G[Ie],N.writeUInt16(P);for(re=0,ne=d.length;re<ne;re++)b=d[re],N.writeUInt16(b);return{charMap:i,subtable:N.data,maxGlyphID:M+1}}},n}(),r0=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="cmap",e.prototype.parse=function(t){var i,r,s;for(t.pos=this.offset,this.version=t.readUInt16(),s=t.readUInt16(),this.tables=[],this.unicode=null,r=0;0<=s?r<s:r>s;r=0<=s?++r:--r)i=new $p(t,this.offset),this.tables.push(i),i.isUnicode&&this.unicode==null&&(this.unicode=i);return!0},e.encode=function(t,i){var r,s;return i==null&&(i="macroman"),r=$p.encode(t,i),(s=new bs).writeUInt16(0),s.writeUInt16(1),r.table=s.data.concat(r.subtable),r},e}(),Pb=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="hhea",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.ascender=t.readShort(),this.decender=t.readShort(),this.lineGap=t.readShort(),this.advanceWidthMax=t.readShort(),this.minLeftSideBearing=t.readShort(),this.minRightSideBearing=t.readShort(),this.xMaxExtent=t.readShort(),this.caretSlopeRise=t.readShort(),this.caretSlopeRun=t.readShort(),this.caretOffset=t.readShort(),t.pos+=8,this.metricDataFormat=t.readShort(),this.numberOfMetrics=t.readUInt16()},e}(),Nb=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="OS/2",e.prototype.parse=function(t){if(t.pos=this.offset,this.version=t.readUInt16(),this.averageCharWidth=t.readShort(),this.weightClass=t.readUInt16(),this.widthClass=t.readUInt16(),this.type=t.readShort(),this.ySubscriptXSize=t.readShort(),this.ySubscriptYSize=t.readShort(),this.ySubscriptXOffset=t.readShort(),this.ySubscriptYOffset=t.readShort(),this.ySuperscriptXSize=t.readShort(),this.ySuperscriptYSize=t.readShort(),this.ySuperscriptXOffset=t.readShort(),this.ySuperscriptYOffset=t.readShort(),this.yStrikeoutSize=t.readShort(),this.yStrikeoutPosition=t.readShort(),this.familyClass=t.readShort(),this.panose=function(){var i,r;for(r=[],i=0;i<10;++i)r.push(t.readByte());return r}(),this.charRange=function(){var i,r;for(r=[],i=0;i<4;++i)r.push(t.readInt());return r}(),this.vendorID=t.readString(4),this.selection=t.readShort(),this.firstCharIndex=t.readShort(),this.lastCharIndex=t.readShort(),this.version>0&&(this.ascent=t.readShort(),this.descent=t.readShort(),this.lineGap=t.readShort(),this.winAscent=t.readShort(),this.winDescent=t.readShort(),this.codePageRange=function(){var i,r;for(r=[],i=0;i<2;i=++i)r.push(t.readInt());return r}(),this.version>1))return this.xHeight=t.readShort(),this.capHeight=t.readShort(),this.defaultChar=t.readShort(),this.breakChar=t.readShort(),this.maxContext=t.readShort()},e}(),Ib=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="post",e.prototype.parse=function(t){var i,r,s;switch(t.pos=this.offset,this.format=t.readInt(),this.italicAngle=t.readInt(),this.underlinePosition=t.readShort(),this.underlineThickness=t.readShort(),this.isFixedPitch=t.readInt(),this.minMemType42=t.readInt(),this.maxMemType42=t.readInt(),this.minMemType1=t.readInt(),this.maxMemType1=t.readInt(),this.format){case 65536:break;case 131072:var a;for(r=t.readUInt16(),this.glyphNameIndex=[],a=0;0<=r?a<r:a>r;a=0<=r?++a:--a)this.glyphNameIndex.push(t.readUInt16());for(this.names=[],s=[];t.pos<this.offset+this.length;)i=t.readByte(),s.push(this.names.push(t.readString(i)));return s;case 151552:return r=t.readUInt16(),this.offsets=t.read(r);case 196608:break;case 262144:return this.map=(function(){var o,l,u;for(u=[],a=o=0,l=this.file.maxp.numGlyphs;0<=l?o<l:o>l;a=0<=l?++o:--o)u.push(t.readUInt32());return u}).call(this)}},e}(),Db=function(n,e){this.raw=n,this.length=n.length,this.platformID=e.platformID,this.encodingID=e.encodingID,this.languageID=e.languageID},Fb=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="name",e.prototype.parse=function(t){var i,r,s,a,o,l,u,h,p,g,d;for(t.pos=this.offset,t.readShort(),i=t.readShort(),l=t.readShort(),r=[],a=0;0<=i?a<i:a>i;a=0<=i?++a:--a)r.push({platformID:t.readShort(),encodingID:t.readShort(),languageID:t.readShort(),nameID:t.readShort(),length:t.readShort(),offset:this.offset+l+t.readShort()});for(u={},a=p=0,g=r.length;p<g;a=++p)s=r[a],t.pos=s.offset,h=t.readString(s.length),o=new Db(h,s),u[d=s.nameID]==null&&(u[d]=[]),u[s.nameID].push(o);this.strings=u,this.copyright=u[0],this.fontFamily=u[1],this.fontSubfamily=u[2],this.uniqueSubfamily=u[3],this.fontName=u[4],this.version=u[5];try{this.postscriptName=u[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g,"")}catch{this.postscriptName=u[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g,"")}return this.trademark=u[7],this.manufacturer=u[8],this.designer=u[9],this.description=u[10],this.vendorUrl=u[11],this.designerUrl=u[12],this.license=u[13],this.licenseUrl=u[14],this.preferredFamily=u[15],this.preferredSubfamily=u[17],this.compatibleFull=u[18],this.sampleText=u[19]},e}(),Ub=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="maxp",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.numGlyphs=t.readUInt16(),this.maxPoints=t.readUInt16(),this.maxContours=t.readUInt16(),this.maxCompositePoints=t.readUInt16(),this.maxComponentContours=t.readUInt16(),this.maxZones=t.readUInt16(),this.maxTwilightPoints=t.readUInt16(),this.maxStorage=t.readUInt16(),this.maxFunctionDefs=t.readUInt16(),this.maxInstructionDefs=t.readUInt16(),this.maxStackElements=t.readUInt16(),this.maxSizeOfInstructions=t.readUInt16(),this.maxComponentElements=t.readUInt16(),this.maxComponentDepth=t.readUInt16()},e}(),Ob=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="hmtx",e.prototype.parse=function(t){var i,r,s,a,o,l,u;for(t.pos=this.offset,this.metrics=[],i=0,l=this.file.hhea.numberOfMetrics;0<=l?i<l:i>l;i=0<=l?++i:--i)this.metrics.push({advance:t.readUInt16(),lsb:t.readInt16()});for(s=this.file.maxp.numGlyphs-this.file.hhea.numberOfMetrics,this.leftSideBearings=function(){var h,p;for(p=[],i=h=0;0<=s?h<s:h>s;i=0<=s?++h:--h)p.push(t.readInt16());return p}(),this.widths=(function(){var h,p,g,d;for(d=[],h=0,p=(g=this.metrics).length;h<p;h++)a=g[h],d.push(a.advance);return d}).call(this),r=this.widths[this.widths.length-1],u=[],i=o=0;0<=s?o<s:o>s;i=0<=s?++o:--o)u.push(this.widths.push(r));return u},e.prototype.forGlyph=function(t){return t in this.metrics?this.metrics[t]:{advance:this.metrics[this.metrics.length-1].advance,lsb:this.leftSideBearings[t-this.metrics.length]}},e}(),s0=[].slice,kb=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="glyf",e.prototype.parse=function(){return this.cache={}},e.prototype.glyphFor=function(t){var i,r,s,a,o,l,u,h,p,g;return t in this.cache?this.cache[t]:(a=this.file.loca,i=this.file.contents,r=a.indexOf(t),(s=a.lengthOf(t))===0?this.cache[t]=null:(i.pos=this.offset+r,o=(l=new bs(i.read(s))).readShort(),h=l.readShort(),g=l.readShort(),u=l.readShort(),p=l.readShort(),this.cache[t]=o===-1?new zb(l,h,g,u,p):new Bb(l,o,h,g,u,p),this.cache[t]))},e.prototype.encode=function(t,i,r){var s,a,o,l,u;for(o=[],a=[],l=0,u=i.length;l<u;l++)s=t[i[l]],a.push(o.length),s&&(o=o.concat(s.encode(r)));return a.push(o.length),{table:o,offsets:a}},e}(),Bb=function(){function n(e,t,i,r,s,a){this.raw=e,this.numberOfContours=t,this.xMin=i,this.yMin=r,this.xMax=s,this.yMax=a,this.compound=!1}return n.prototype.encode=function(){return this.raw.data},n}(),zb=function(){function n(e,t,i,r,s){var a,o;for(this.raw=e,this.xMin=t,this.yMin=i,this.xMax=r,this.yMax=s,this.compound=!0,this.glyphIDs=[],this.glyphOffsets=[],a=this.raw;o=a.readShort(),this.glyphOffsets.push(a.pos),this.glyphIDs.push(a.readUInt16()),32&o;)a.pos+=1&o?4:2,128&o?a.pos+=8:64&o?a.pos+=4:8&o&&(a.pos+=2)}return n.prototype.encode=function(){var e,t,i;for(t=new bs(s0.call(this.raw.data)),e=0,i=this.glyphIDs.length;e<i;++e)t.pos=this.glyphOffsets[e];return t.data},n}(),Gb=function(n){function e(){return e.__super__.constructor.apply(this,arguments)}return xr(e,lr),e.prototype.tag="loca",e.prototype.parse=function(t){var i,r;return t.pos=this.offset,i=this.file.head.indexToLocFormat,this.offsets=i===0?(function(){var s,a;for(a=[],r=0,s=this.length;r<s;r+=2)a.push(2*t.readUInt16());return a}).call(this):(function(){var s,a;for(a=[],r=0,s=this.length;r<s;r+=4)a.push(t.readUInt32());return a}).call(this)},e.prototype.indexOf=function(t){return this.offsets[t]},e.prototype.lengthOf=function(t){return this.offsets[t+1]-this.offsets[t]},e.prototype.encode=function(t,i){for(var r=new Uint32Array(this.offsets.length),s=0,a=0,o=0;o<r.length;++o)if(r[o]=s,a<i.length&&i[a]==o){++a,r[o]=s;var l=this.offsets[o],u=this.offsets[o+1]-l;u>0&&(s+=u)}for(var h=new Array(4*r.length),p=0;p<r.length;++p)h[4*p+3]=255&r[p],h[4*p+2]=(65280&r[p])>>8,h[4*p+1]=(16711680&r[p])>>16,h[4*p]=(4278190080&r[p])>>24;return h},e}(),Hb=function(){function n(e){this.font=e,this.subset={},this.unicodes={},this.next=33}return n.prototype.generateCmap=function(){var e,t,i,r,s;for(t in r=this.font.cmap.tables[0].codeMap,e={},s=this.subset)i=s[t],e[t]=r[i];return e},n.prototype.glyphsFor=function(e){var t,i,r,s,a,o,l;for(r={},a=0,o=e.length;a<o;a++)r[s=e[a]]=this.font.glyf.glyphFor(s);for(s in t=[],r)(i=r[s])!=null&&i.compound&&t.push.apply(t,i.glyphIDs);if(t.length>0)for(s in l=this.glyphsFor(t))i=l[s],r[s]=i;return r},n.prototype.encode=function(e,t){var i,r,s,a,o,l,u,h,p,g,d,x,b,_,m;for(r in i=r0.encode(this.generateCmap(),"unicode"),a=this.glyphsFor(e),d={0:0},m=i.charMap)d[(l=m[r]).old]=l.new;for(x in g=i.maxGlyphID,a)x in d||(d[x]=g++);return h=function(S){var M,P;for(M in P={},S)P[S[M]]=M;return P}(d),p=Object.keys(h).sort(function(S,M){return S-M}),b=function(){var S,M,P;for(P=[],S=0,M=p.length;S<M;S++)o=p[S],P.push(h[o]);return P}(),s=this.font.glyf.encode(a,b,d),u=this.font.loca.encode(s.offsets,b),_={cmap:this.font.cmap.raw(),glyf:s.table,loca:u,hmtx:this.font.hmtx.raw(),hhea:this.font.hhea.raw(),maxp:this.font.maxp.raw(),post:this.font.post.raw(),name:this.font.name.raw(),head:this.font.head.encode(t)},this.font.os2.exists&&(_["OS/2"]=this.font.os2.raw()),this.font.directory.encode(_)},n}();_t.API.PDFObject=function(){var n;function e(){}return n=function(t,i){return(Array(i+1).join("0")+t).slice(-i)},e.convert=function(t){var i,r,s,a;if(Array.isArray(t))return"["+function(){var o,l,u;for(u=[],o=0,l=t.length;o<l;o++)i=t[o],u.push(e.convert(i));return u}().join(" ")+"]";if(typeof t=="string")return"/"+t;if(t!=null&&t.isString)return"("+t+")";if(t instanceof Date)return"(D:"+n(t.getUTCFullYear(),4)+n(t.getUTCMonth(),2)+n(t.getUTCDate(),2)+n(t.getUTCHours(),2)+n(t.getUTCMinutes(),2)+n(t.getUTCSeconds(),2)+"Z)";if({}.toString.call(t)==="[object Object]"){for(r in s=["<<"],t)a=t[r],s.push("/"+r+" "+e.convert(a));return s.push(">>"),s.join(`
`)}return""+t},e}();var rl={},Vb=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},a0={},Ci={};let _d;const qb=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Ci.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};Ci.getSymbolTotalCodewords=function(e){return qb[e]};Ci.getBCHDigit=function(n){let e=0;for(;n!==0;)e++,n>>>=1;return e};Ci.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');_d=e};Ci.isKanjiModeEnabled=function(){return typeof _d<"u"};Ci.toSJIS=function(e){return _d(e)};var jc={};(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function e(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+t)}}n.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},n.from=function(i,r){if(n.isValid(i))return i;try{return e(i)}catch{return r}}})(jc);function o0(){this.buffer=[],this.length=0}o0.prototype={get:function(n){const e=Math.floor(n/8);return(this.buffer[e]>>>7-n%8&1)===1},put:function(n,e){for(let t=0;t<e;t++)this.putBit((n>>>e-t-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(n){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),n&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var Wb=o0;function sl(n){if(!n||n<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=n,this.data=new Uint8Array(n*n),this.reservedBit=new Uint8Array(n*n)}sl.prototype.set=function(n,e,t,i){const r=n*this.size+e;this.data[r]=t,i&&(this.reservedBit[r]=!0)};sl.prototype.get=function(n,e){return this.data[n*this.size+e]};sl.prototype.xor=function(n,e,t){this.data[n*this.size+e]^=t};sl.prototype.isReserved=function(n,e){return this.reservedBit[n*this.size+e]};var jb=sl,l0={};(function(n){const e=Ci.getSymbolSize;n.getRowColCoords=function(i){if(i===1)return[];const r=Math.floor(i/7)+2,s=e(i),a=s===145?26:Math.ceil((s-13)/(2*r-2))*2,o=[s-7];for(let l=1;l<r-1;l++)o[l]=o[l-1]-a;return o.push(6),o.reverse()},n.getPositions=function(i){const r=[],s=n.getRowColCoords(i),a=s.length;for(let o=0;o<a;o++)for(let l=0;l<a;l++)o===0&&l===0||o===0&&l===a-1||o===a-1&&l===0||r.push([s[o],s[l]]);return r}})(l0);var c0={};const Xb=Ci.getSymbolSize,Jp=7;c0.getPositions=function(e){const t=Xb(e);return[[0,0],[t-Jp,0],[0,t-Jp]]};var u0={};(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};n.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},n.from=function(r){return n.isValid(r)?parseInt(r,10):void 0},n.getPenaltyN1=function(r){const s=r.size;let a=0,o=0,l=0,u=null,h=null;for(let p=0;p<s;p++){o=l=0,u=h=null;for(let g=0;g<s;g++){let d=r.get(p,g);d===u?o++:(o>=5&&(a+=e.N1+(o-5)),u=d,o=1),d=r.get(g,p),d===h?l++:(l>=5&&(a+=e.N1+(l-5)),h=d,l=1)}o>=5&&(a+=e.N1+(o-5)),l>=5&&(a+=e.N1+(l-5))}return a},n.getPenaltyN2=function(r){const s=r.size;let a=0;for(let o=0;o<s-1;o++)for(let l=0;l<s-1;l++){const u=r.get(o,l)+r.get(o,l+1)+r.get(o+1,l)+r.get(o+1,l+1);(u===4||u===0)&&a++}return a*e.N2},n.getPenaltyN3=function(r){const s=r.size;let a=0,o=0,l=0;for(let u=0;u<s;u++){o=l=0;for(let h=0;h<s;h++)o=o<<1&2047|r.get(u,h),h>=10&&(o===1488||o===93)&&a++,l=l<<1&2047|r.get(h,u),h>=10&&(l===1488||l===93)&&a++}return a*e.N3},n.getPenaltyN4=function(r){let s=0;const a=r.data.length;for(let l=0;l<a;l++)s+=r.data[l];return Math.abs(Math.ceil(s*100/a/5)-10)*e.N4};function t(i,r,s){switch(i){case n.Patterns.PATTERN000:return(r+s)%2===0;case n.Patterns.PATTERN001:return r%2===0;case n.Patterns.PATTERN010:return s%3===0;case n.Patterns.PATTERN011:return(r+s)%3===0;case n.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(s/3))%2===0;case n.Patterns.PATTERN101:return r*s%2+r*s%3===0;case n.Patterns.PATTERN110:return(r*s%2+r*s%3)%2===0;case n.Patterns.PATTERN111:return(r*s%3+(r+s)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}n.applyMask=function(r,s){const a=s.size;for(let o=0;o<a;o++)for(let l=0;l<a;l++)s.isReserved(l,o)||s.xor(l,o,t(r,l,o))},n.getBestMask=function(r,s){const a=Object.keys(n.Patterns).length;let o=0,l=1/0;for(let u=0;u<a;u++){s(u),n.applyMask(u,r);const h=n.getPenaltyN1(r)+n.getPenaltyN2(r)+n.getPenaltyN3(r)+n.getPenaltyN4(r);n.applyMask(u,r),h<l&&(l=h,o=u)}return o}})(u0);var Xc={};const ps=jc,vc=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],_c=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Xc.getBlocksCount=function(e,t){switch(t){case ps.L:return vc[(e-1)*4+0];case ps.M:return vc[(e-1)*4+1];case ps.Q:return vc[(e-1)*4+2];case ps.H:return vc[(e-1)*4+3];default:return}};Xc.getTotalCodewordsCount=function(e,t){switch(t){case ps.L:return _c[(e-1)*4+0];case ps.M:return _c[(e-1)*4+1];case ps.Q:return _c[(e-1)*4+2];case ps.H:return _c[(e-1)*4+3];default:return}};var h0={},Yc={};const Yo=new Uint8Array(512),Ic=new Uint8Array(256);(function(){let e=1;for(let t=0;t<255;t++)Yo[t]=e,Ic[e]=t,e<<=1,e&256&&(e^=285);for(let t=255;t<512;t++)Yo[t]=Yo[t-255]})();Yc.log=function(e){if(e<1)throw new Error("log("+e+")");return Ic[e]};Yc.exp=function(e){return Yo[e]};Yc.mul=function(e,t){return e===0||t===0?0:Yo[Ic[e]+Ic[t]]};(function(n){const e=Yc;n.mul=function(i,r){const s=new Uint8Array(i.length+r.length-1);for(let a=0;a<i.length;a++)for(let o=0;o<r.length;o++)s[a+o]^=e.mul(i[a],r[o]);return s},n.mod=function(i,r){let s=new Uint8Array(i);for(;s.length-r.length>=0;){const a=s[0];for(let l=0;l<r.length;l++)s[l]^=e.mul(r[l],a);let o=0;for(;o<s.length&&s[o]===0;)o++;s=s.slice(o)}return s},n.generateECPolynomial=function(i){let r=new Uint8Array([1]);for(let s=0;s<i;s++)r=n.mul(r,new Uint8Array([1,e.exp(s)]));return r}})(h0);const d0=h0;function yd(n){this.genPoly=void 0,this.degree=n,this.degree&&this.initialize(this.degree)}yd.prototype.initialize=function(e){this.degree=e,this.genPoly=d0.generateECPolynomial(this.degree)};yd.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(e.length+this.degree);t.set(e);const i=d0.mod(t,this.genPoly),r=this.degree-i.length;if(r>0){const s=new Uint8Array(this.degree);return s.set(i,r),s}return i};var Yb=yd,f0={},xs={},bd={};bd.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var Sr={};const p0="[0-9]+",$b="[A-Z $%*+\\-./:]+";let Qo="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Qo=Qo.replace(/u/g,"\\u");const Jb="(?:(?![A-Z0-9 $%*+\\-./:]|"+Qo+`)(?:.|[\r
]))+`;Sr.KANJI=new RegExp(Qo,"g");Sr.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");Sr.BYTE=new RegExp(Jb,"g");Sr.NUMERIC=new RegExp(p0,"g");Sr.ALPHANUMERIC=new RegExp($b,"g");const Kb=new RegExp("^"+Qo+"$"),Zb=new RegExp("^"+p0+"$"),Qb=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Sr.testKanji=function(e){return Kb.test(e)};Sr.testNumeric=function(e){return Zb.test(e)};Sr.testAlphanumeric=function(e){return Qb.test(e)};(function(n){const e=bd,t=Sr;n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(s,a){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!e.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?s.ccBits[0]:a<27?s.ccBits[1]:s.ccBits[2]},n.getBestModeForData=function(s){return t.testNumeric(s)?n.NUMERIC:t.testAlphanumeric(s)?n.ALPHANUMERIC:t.testKanji(s)?n.KANJI:n.BYTE},n.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},n.isValid=function(s){return s&&s.bit&&s.ccBits};function i(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+r)}}n.from=function(s,a){if(n.isValid(s))return s;try{return i(s)}catch{return a}}})(xs);(function(n){const e=Ci,t=Xc,i=jc,r=xs,s=bd,a=7973,o=e.getBCHDigit(a);function l(g,d,x){for(let b=1;b<=40;b++)if(d<=n.getCapacity(b,x,g))return b}function u(g,d){return r.getCharCountIndicator(g,d)+4}function h(g,d){let x=0;return g.forEach(function(b){const _=u(b.mode,d);x+=_+b.getBitsLength()}),x}function p(g,d){for(let x=1;x<=40;x++)if(h(g,x)<=n.getCapacity(x,d,r.MIXED))return x}n.from=function(d,x){return s.isValid(d)?parseInt(d,10):x},n.getCapacity=function(d,x,b){if(!s.isValid(d))throw new Error("Invalid QR Code version");typeof b>"u"&&(b=r.BYTE);const _=e.getSymbolTotalCodewords(d),m=t.getTotalCodewordsCount(d,x),S=(_-m)*8;if(b===r.MIXED)return S;const M=S-u(b,d);switch(b){case r.NUMERIC:return Math.floor(M/10*3);case r.ALPHANUMERIC:return Math.floor(M/11*2);case r.KANJI:return Math.floor(M/13);case r.BYTE:default:return Math.floor(M/8)}},n.getBestVersionForData=function(d,x){let b;const _=i.from(x,i.M);if(Array.isArray(d)){if(d.length>1)return p(d,_);if(d.length===0)return 1;b=d[0]}else b=d;return l(b.mode,b.getLength(),_)},n.getEncodedBits=function(d){if(!s.isValid(d)||d<7)throw new Error("Invalid QR Code version");let x=d<<12;for(;e.getBCHDigit(x)-o>=0;)x^=a<<e.getBCHDigit(x)-o;return d<<12|x}})(f0);var m0={};const Wh=Ci,g0=1335,ex=21522,Kp=Wh.getBCHDigit(g0);m0.getEncodedBits=function(e,t){const i=e.bit<<3|t;let r=i<<10;for(;Wh.getBCHDigit(r)-Kp>=0;)r^=g0<<Wh.getBCHDigit(r)-Kp;return(i<<10|r)^ex};var v0={};const tx=xs;function to(n){this.mode=tx.NUMERIC,this.data=n.toString()}to.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};to.prototype.getLength=function(){return this.data.length};to.prototype.getBitsLength=function(){return to.getBitsLength(this.data.length)};to.prototype.write=function(e){let t,i,r;for(t=0;t+3<=this.data.length;t+=3)i=this.data.substr(t,3),r=parseInt(i,10),e.put(r,10);const s=this.data.length-t;s>0&&(i=this.data.substr(t),r=parseInt(i,10),e.put(r,s*3+1))};var nx=to;const ix=xs,gh=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function no(n){this.mode=ix.ALPHANUMERIC,this.data=n}no.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};no.prototype.getLength=function(){return this.data.length};no.prototype.getBitsLength=function(){return no.getBitsLength(this.data.length)};no.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let i=gh.indexOf(this.data[t])*45;i+=gh.indexOf(this.data[t+1]),e.put(i,11)}this.data.length%2&&e.put(gh.indexOf(this.data[t]),6)};var rx=no;const sx=xs;function io(n){this.mode=sx.BYTE,typeof n=="string"?this.data=new TextEncoder().encode(n):this.data=new Uint8Array(n)}io.getBitsLength=function(e){return e*8};io.prototype.getLength=function(){return this.data.length};io.prototype.getBitsLength=function(){return io.getBitsLength(this.data.length)};io.prototype.write=function(n){for(let e=0,t=this.data.length;e<t;e++)n.put(this.data[e],8)};var ax=io;const ox=xs,lx=Ci;function ro(n){this.mode=ox.KANJI,this.data=n}ro.getBitsLength=function(e){return e*13};ro.prototype.getLength=function(){return this.data.length};ro.prototype.getBitsLength=function(){return ro.getBitsLength(this.data.length)};ro.prototype.write=function(n){let e;for(e=0;e<this.data.length;e++){let t=lx.toSJIS(this.data[e]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),n.put(t,13)}};var cx=ro,_0={exports:{}};(function(n){var e={single_source_shortest_paths:function(t,i,r){var s={},a={};a[i]=0;var o=e.PriorityQueue.make();o.push(i,0);for(var l,u,h,p,g,d,x,b,_;!o.empty();){l=o.pop(),u=l.value,p=l.cost,g=t[u]||{};for(h in g)g.hasOwnProperty(h)&&(d=g[h],x=p+d,b=a[h],_=typeof a[h]>"u",(_||b>x)&&(a[h]=x,o.push(h,x),s[h]=u))}if(typeof r<"u"&&typeof a[r]>"u"){var m=["Could not find a path from ",i," to ",r,"."].join("");throw new Error(m)}return s},extract_shortest_path_from_predecessor_list:function(t,i){for(var r=[],s=i;s;)r.push(s),t[s],s=t[s];return r.reverse(),r},find_path:function(t,i,r){var s=e.single_source_shortest_paths(t,i,r);return e.extract_shortest_path_from_predecessor_list(s,r)},PriorityQueue:{make:function(t){var i=e.PriorityQueue,r={},s;t=t||{};for(s in i)i.hasOwnProperty(s)&&(r[s]=i[s]);return r.queue=[],r.sorter=t.sorter||i.default_sorter,r},default_sorter:function(t,i){return t.cost-i.cost},push:function(t,i){var r={value:t,cost:i};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=e})(_0);var ux=_0.exports;(function(n){const e=xs,t=nx,i=rx,r=ax,s=cx,a=Sr,o=Ci,l=ux;function u(m){return unescape(encodeURIComponent(m)).length}function h(m,S,M){const P=[];let q;for(;(q=m.exec(M))!==null;)P.push({data:q[0],index:q.index,mode:S,length:q[0].length});return P}function p(m){const S=h(a.NUMERIC,e.NUMERIC,m),M=h(a.ALPHANUMERIC,e.ALPHANUMERIC,m);let P,q;return o.isKanjiModeEnabled()?(P=h(a.BYTE,e.BYTE,m),q=h(a.KANJI,e.KANJI,m)):(P=h(a.BYTE_KANJI,e.BYTE,m),q=[]),S.concat(M,P,q).sort(function(U,H){return U.index-H.index}).map(function(U){return{data:U.data,mode:U.mode,length:U.length}})}function g(m,S){switch(S){case e.NUMERIC:return t.getBitsLength(m);case e.ALPHANUMERIC:return i.getBitsLength(m);case e.KANJI:return s.getBitsLength(m);case e.BYTE:return r.getBitsLength(m)}}function d(m){return m.reduce(function(S,M){const P=S.length-1>=0?S[S.length-1]:null;return P&&P.mode===M.mode?(S[S.length-1].data+=M.data,S):(S.push(M),S)},[])}function x(m){const S=[];for(let M=0;M<m.length;M++){const P=m[M];switch(P.mode){case e.NUMERIC:S.push([P,{data:P.data,mode:e.ALPHANUMERIC,length:P.length},{data:P.data,mode:e.BYTE,length:P.length}]);break;case e.ALPHANUMERIC:S.push([P,{data:P.data,mode:e.BYTE,length:P.length}]);break;case e.KANJI:S.push([P,{data:P.data,mode:e.BYTE,length:u(P.data)}]);break;case e.BYTE:S.push([{data:P.data,mode:e.BYTE,length:u(P.data)}])}}return S}function b(m,S){const M={},P={start:{}};let q=["start"];for(let G=0;G<m.length;G++){const U=m[G],H=[];for(let A=0;A<U.length;A++){const D=U[A],E=""+G+A;H.push(E),M[E]={node:D,lastCount:0},P[E]={};for(let R=0;R<q.length;R++){const X=q[R];M[X]&&M[X].node.mode===D.mode?(P[X][E]=g(M[X].lastCount+D.length,D.mode)-g(M[X].lastCount,D.mode),M[X].lastCount+=D.length):(M[X]&&(M[X].lastCount=D.length),P[X][E]=g(D.length,D.mode)+4+e.getCharCountIndicator(D.mode,S))}}q=H}for(let G=0;G<q.length;G++)P[q[G]].end=0;return{map:P,table:M}}function _(m,S){let M;const P=e.getBestModeForData(m);if(M=e.from(S,P),M!==e.BYTE&&M.bit<P.bit)throw new Error('"'+m+'" cannot be encoded with mode '+e.toString(M)+`.
 Suggested mode is: `+e.toString(P));switch(M===e.KANJI&&!o.isKanjiModeEnabled()&&(M=e.BYTE),M){case e.NUMERIC:return new t(m);case e.ALPHANUMERIC:return new i(m);case e.KANJI:return new s(m);case e.BYTE:return new r(m)}}n.fromArray=function(S){return S.reduce(function(M,P){return typeof P=="string"?M.push(_(P,null)):P.data&&M.push(_(P.data,P.mode)),M},[])},n.fromString=function(S,M){const P=p(S,o.isKanjiModeEnabled()),q=x(P),G=b(q,M),U=l.find_path(G.map,"start","end"),H=[];for(let A=1;A<U.length-1;A++)H.push(G.table[U[A]].node);return n.fromArray(d(H))},n.rawSplit=function(S){return n.fromArray(p(S,o.isKanjiModeEnabled()))}})(v0);const $c=Ci,vh=jc,hx=Wb,dx=jb,fx=l0,px=c0,jh=u0,Xh=Xc,mx=Yb,Dc=f0,gx=m0,vx=xs,_h=v0;function _x(n,e){const t=n.size,i=px.getPositions(e);for(let r=0;r<i.length;r++){const s=i[r][0],a=i[r][1];for(let o=-1;o<=7;o++)if(!(s+o<=-1||t<=s+o))for(let l=-1;l<=7;l++)a+l<=-1||t<=a+l||(o>=0&&o<=6&&(l===0||l===6)||l>=0&&l<=6&&(o===0||o===6)||o>=2&&o<=4&&l>=2&&l<=4?n.set(s+o,a+l,!0,!0):n.set(s+o,a+l,!1,!0))}}function yx(n){const e=n.size;for(let t=8;t<e-8;t++){const i=t%2===0;n.set(t,6,i,!0),n.set(6,t,i,!0)}}function bx(n,e){const t=fx.getPositions(e);for(let i=0;i<t.length;i++){const r=t[i][0],s=t[i][1];for(let a=-2;a<=2;a++)for(let o=-2;o<=2;o++)a===-2||a===2||o===-2||o===2||a===0&&o===0?n.set(r+a,s+o,!0,!0):n.set(r+a,s+o,!1,!0)}}function xx(n,e){const t=n.size,i=Dc.getEncodedBits(e);let r,s,a;for(let o=0;o<18;o++)r=Math.floor(o/3),s=o%3+t-8-3,a=(i>>o&1)===1,n.set(r,s,a,!0),n.set(s,r,a,!0)}function yh(n,e,t){const i=n.size,r=gx.getEncodedBits(e,t);let s,a;for(s=0;s<15;s++)a=(r>>s&1)===1,s<6?n.set(s,8,a,!0):s<8?n.set(s+1,8,a,!0):n.set(i-15+s,8,a,!0),s<8?n.set(8,i-s-1,a,!0):s<9?n.set(8,15-s-1+1,a,!0):n.set(8,15-s-1,a,!0);n.set(i-8,8,1,!0)}function Sx(n,e){const t=n.size;let i=-1,r=t-1,s=7,a=0;for(let o=t-1;o>0;o-=2)for(o===6&&o--;;){for(let l=0;l<2;l++)if(!n.isReserved(r,o-l)){let u=!1;a<e.length&&(u=(e[a]>>>s&1)===1),n.set(r,o-l,u),s--,s===-1&&(a++,s=7)}if(r+=i,r<0||t<=r){r-=i,i=-i;break}}}function wx(n,e,t){const i=new hx;t.forEach(function(l){i.put(l.mode.bit,4),i.put(l.getLength(),vx.getCharCountIndicator(l.mode,n)),l.write(i)});const r=$c.getSymbolTotalCodewords(n),s=Xh.getTotalCodewordsCount(n,e),a=(r-s)*8;for(i.getLengthInBits()+4<=a&&i.put(0,4);i.getLengthInBits()%8!==0;)i.putBit(0);const o=(a-i.getLengthInBits())/8;for(let l=0;l<o;l++)i.put(l%2?17:236,8);return Mx(i,n,e)}function Mx(n,e,t){const i=$c.getSymbolTotalCodewords(e),r=Xh.getTotalCodewordsCount(e,t),s=i-r,a=Xh.getBlocksCount(e,t),o=i%a,l=a-o,u=Math.floor(i/a),h=Math.floor(s/a),p=h+1,g=u-h,d=new mx(g);let x=0;const b=new Array(a),_=new Array(a);let m=0;const S=new Uint8Array(n.buffer);for(let U=0;U<a;U++){const H=U<l?h:p;b[U]=S.slice(x,x+H),_[U]=d.encode(b[U]),x+=H,m=Math.max(m,H)}const M=new Uint8Array(i);let P=0,q,G;for(q=0;q<m;q++)for(G=0;G<a;G++)q<b[G].length&&(M[P++]=b[G][q]);for(q=0;q<g;q++)for(G=0;G<a;G++)M[P++]=_[G][q];return M}function Ax(n,e,t,i){let r;if(Array.isArray(n))r=_h.fromArray(n);else if(typeof n=="string"){let u=e;if(!u){const h=_h.rawSplit(n);u=Dc.getBestVersionForData(h,t)}r=_h.fromString(n,u||40)}else throw new Error("Invalid data");const s=Dc.getBestVersionForData(r,t);if(!s)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=s;else if(e<s)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+s+`.
`);const a=wx(e,t,r),o=$c.getSymbolSize(e),l=new dx(o);return _x(l,e),yx(l),bx(l,e),yh(l,t,0),e>=7&&xx(l,e),Sx(l,a),isNaN(i)&&(i=jh.getBestMask(l,yh.bind(null,l,t))),jh.applyMask(i,l),yh(l,t,i),{modules:l,version:e,errorCorrectionLevel:t,maskPattern:i,segments:r}}a0.create=function(e,t){if(typeof e>"u"||e==="")throw new Error("No input text");let i=vh.M,r,s;return typeof t<"u"&&(i=vh.from(t.errorCorrectionLevel,vh.M),r=Dc.from(t.version),s=jh.from(t.maskPattern),t.toSJISFunc&&$c.setToSJISFunction(t.toSJISFunc)),Ax(e,r,i,s)};var y0={},xd={};(function(n){function e(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let i=t.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+t);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(s){return[s,s]}))),i.length===6&&i.push("F","F");const r=parseInt(i.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+i.slice(0,6).join("")}}n.getOptions=function(i){i||(i={}),i.color||(i.color={});const r=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,s=i.width&&i.width>=21?i.width:void 0,a=i.scale||4;return{width:s,scale:s?4:a,margin:r,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},n.getScale=function(i,r){return r.width&&r.width>=i+r.margin*2?r.width/(i+r.margin*2):r.scale},n.getImageWidth=function(i,r){const s=n.getScale(i,r);return Math.floor((i+r.margin*2)*s)},n.qrToImageData=function(i,r,s){const a=r.modules.size,o=r.modules.data,l=n.getScale(a,s),u=Math.floor((a+s.margin*2)*l),h=s.margin*l,p=[s.color.light,s.color.dark];for(let g=0;g<u;g++)for(let d=0;d<u;d++){let x=(g*u+d)*4,b=s.color.light;if(g>=h&&d>=h&&g<u-h&&d<u-h){const _=Math.floor((g-h)/l),m=Math.floor((d-h)/l);b=p[o[_*a+m]?1:0]}i[x++]=b.r,i[x++]=b.g,i[x++]=b.b,i[x]=b.a}}})(xd);(function(n){const e=xd;function t(r,s,a){r.clearRect(0,0,s.width,s.height),s.style||(s.style={}),s.height=a,s.width=a,s.style.height=a+"px",s.style.width=a+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(s,a,o){let l=o,u=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(u=i()),l=e.getOptions(l);const h=e.getImageWidth(s.modules.size,l),p=u.getContext("2d"),g=p.createImageData(h,h);return e.qrToImageData(g.data,s,l),t(p,u,h),p.putImageData(g,0,0),u},n.renderToDataURL=function(s,a,o){let l=o;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={});const u=n.render(s,a,l),h=l.type||"image/png",p=l.rendererOpts||{};return u.toDataURL(h,p.quality)}})(y0);var b0={};const Ex=xd;function Zp(n,e){const t=n.a/255,i=e+'="'+n.hex+'"';return t<1?i+" "+e+'-opacity="'+t.toFixed(2).slice(1)+'"':i}function bh(n,e,t){let i=n+e;return typeof t<"u"&&(i+=" "+t),i}function Tx(n,e,t){let i="",r=0,s=!1,a=0;for(let o=0;o<n.length;o++){const l=Math.floor(o%e),u=Math.floor(o/e);!l&&!s&&(s=!0),n[o]?(a++,o>0&&l>0&&n[o-1]||(i+=s?bh("M",l+t,.5+u+t):bh("m",r,0),r=0,s=!1),l+1<e&&n[o+1]||(i+=bh("h",a),a=0)):r++}return i}b0.render=function(e,t,i){const r=Ex.getOptions(t),s=e.modules.size,a=e.modules.data,o=s+r.margin*2,l=r.color.light.a?"<path "+Zp(r.color.light,"fill")+' d="M0 0h'+o+"v"+o+'H0z"/>':"",u="<path "+Zp(r.color.dark,"stroke")+' d="'+Tx(a,s,r.margin)+'"/>',h='viewBox="0 0 '+o+" "+o+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(r.width?'width="'+r.width+'" height="'+r.width+'" ':"")+h+' shape-rendering="crispEdges">'+l+u+`</svg>
`;return typeof i=="function"&&i(null,g),g};const Lx=Vb,Yh=a0,x0=y0,Cx=b0;function Sd(n,e,t,i,r){const s=[].slice.call(arguments,1),a=s.length,o=typeof s[a-1]=="function";if(!o&&!Lx())throw new Error("Callback required as last argument");if(o){if(a<2)throw new Error("Too few arguments provided");a===2?(r=t,t=e,e=i=void 0):a===3&&(e.getContext&&typeof r>"u"?(r=i,i=void 0):(r=i,i=t,t=e,e=void 0))}else{if(a<1)throw new Error("Too few arguments provided");return a===1?(t=e,e=i=void 0):a===2&&!e.getContext&&(i=t,t=e,e=void 0),new Promise(function(l,u){try{const h=Yh.create(t,i);l(n(h,e,i))}catch(h){u(h)}})}try{const l=Yh.create(t,i);r(null,n(l,e,i))}catch(l){r(l)}}rl.create=Yh.create;rl.toCanvas=Sd.bind(null,x0.render);rl.toDataURL=Sd.bind(null,x0.renderToDataURL);rl.toString=Sd.bind(null,function(n,e,t){return Cx.render(n,t)});async function S0(n,e=null){const t=new _t({orientation:"portrait",unit:"mm",format:"a4"});t.setFillColor(11,15,25),t.rect(0,0,210,32,"F"),t.setFont("helvetica","bold"),t.setFontSize(22),t.setTextColor(0,229,255),t.text("MULTISERVICIOS JSR",14,16),t.setFontSize(9),t.setTextColor(180,190,210),t.text("Servicio Técnico Especializado - Laptops, PCs & Mantenimiento 3D",14,23),t.text("RUC: 20601234567 | Tel: +51 987 654 321 | Av. Central 450, Lima",14,28),t.setFillColor(0,229,255),t.rect(145,8,52,18,"F"),t.setFontSize(10),t.setTextColor(4,9,20),t.text("TICKET DE RECEPCION",145,14),t.setFontSize(14),t.text(n.id||"JSR-0000",154,21),t.setFontSize(11),t.setFont("helvetica","bold"),t.setTextColor(11,15,25),t.text("1. DATOS DEL CLIENTE Y EQUIPO",14,42),t.setLineWidth(.4),t.setDrawColor(200,210,225),t.rect(14,45,182,32),t.setFontSize(9.5),t.setFont("helvetica","normal"),t.setTextColor(50,60,75),t.text(`Cliente: ${n.customerName||"-"}`,18,52),t.text(`DNI / RUC: ${n.customerDni||"-"}`,18,58),t.text(`Telefono: ${n.customerPhone||"-"}`,18,64),t.text(`Fecha Ingreso: ${Kh(n.createdAt)}`,18,70),t.text(`Equipo: ${n.deviceModel||"-"}`,105,52),t.text(`N° Serie: ${n.deviceSerial||"-"}`,105,58),t.text(`Tecnico Asignado: ${n.technician||"Por Asignar"}`,105,64),t.text(`Costo Est. Diagnostico: ${yr(n.estimatedCost||0)}`,105,70);let i=86;if(t.setFontSize(11),t.setFont("helvetica","bold"),t.setTextColor(11,15,25),t.text("2. INSPECCION 3D Y MAPEO DE FALLAS",14,i),i+=4,t.rect(14,i,182,75),e)try{t.addImage(e,"PNG",16,i+2,95,70)}catch(s){console.warn("Could not add 3D snapshot to PDF",s)}else t.setFontSize(9),t.setTextColor(150,150,150),t.text("[ Modelo 3D Registrado ]",40,i+35);t.setFontSize(9.5),t.setFont("helvetica","bold"),t.setTextColor(220,30,70),t.text("Puntos Criticos Detectados:",115,i+8),t.setFont("helvetica","normal"),t.setFontSize(8.5),t.setTextColor(50,60,75);const r=n.faults3D||[];r.length===0?t.text("• Ninguna falla visual externa.",115,i+16):r.forEach((s,a)=>{const o=i+16+a*11;o<i+70&&(t.setFont("helvetica","bold"),t.text(`[Pin #${a+1}] ${s.part}:`,115,o),t.setFont("helvetica","normal"),t.text(`- ${s.note}`,118,o+5))}),i+=83,t.setFontSize(11),t.setFont("helvetica","bold"),t.setTextColor(11,15,25),t.text("3. RASTREO EN TIEMPO REAL VIA QR",14,i),i+=4,t.rect(14,i,182,38);try{const s=`${window.location.origin}#tracking?ticket=${n.id}`,a=await rl.toDataURL(s,{margin:1,width:120});t.addImage(a,"PNG",18,i+3,32,32)}catch(s){console.error("Error generating QR",s)}return t.setFontSize(9),t.setFont("helvetica","bold"),t.setTextColor(0,150,180),t.text("Consulte el estado visual 3D de su laptop desde su celular:",55,i+10),t.setFont("helvetica","normal"),t.setTextColor(60,70,85),t.text("1. Escanee el código QR con la cámara de su smartphone.",55,i+16),t.text(`2. O ingrese a la web e introduzca su N° Ticket: ${n.id}`,55,i+22),t.text("3. Visualice los avances y confirmación de listo para recoger.",55,i+28),i+=44,t.setFontSize(8),t.setTextColor(120,130,140),t.text("Términos: Los equipos no retirados pasados los 60 días quedan sujetos a disposición del taller. Garantía cubre mano de obra y repuestos especificados.",14,i),i+=20,t.line(25,i,85,i),t.line(125,i,185,i),t.setFontSize(9),t.setTextColor(50,60,75),t.text("Firma Cliente / DNI",40,i+5),t.text("Firma Recepción JSR",142,i+5),t.save(`Ticket_Multiservicios_JSR_${n.id}.pdf`),!0}function w0(n){const e=xg();let t=[],i=null,r=null;n.innerHTML=`
    <div class="reception-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">Módulo 1: Recepción e Inspección 3D</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Realice el mapeo interactivo de fallas en el modelo 3D y genere el ticket comprobante con código QR.
          </p>
        </div>
        <div class="badge badge-cyan" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">
          TICKET NUEVO: <span id="current-ticket-badge">${e}</span>
        </div>
      </div>

      <div class="grid-2-1">
        <!-- 3D Viewer Container -->
        <div class="glass-panel viewport-3d-container" style="height: 520px; position: relative;">
          <div class="viewport-overlay">
            <span class="badge badge-red" style="animation: pulseRed 2s infinite;">
              <span class="status-dot-red"></span> MODO INSPECCIÓ N 3D ACTIVO
            </span>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 0.4rem;">
              • Haz clic sobre cualquier pieza de la laptop 3D para registrar una falla.<br>
              • Arrastra con clic izquierdo para rotar $360^circ$ | Rueda de mouse para Zoom.
            </p>
          </div>

          <!-- The canvas rendered by Three.js will be placed here -->
          <div id="reception-3d-viewport" style="width: 100%; height: 100%;"></div>

          <div class="viewport-controls-bar">
            <button class="btn btn-primary btn-sm" id="btn-toggle-ar" title="Activar Cámara de Realidad Aumentada">
              📱 Modo Realidad Aumentada (AR)
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-reset-3d" title="Restablecer Vista 3D">
              🔄 Restablecer Vista
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-clear-pins" title="Borrar Puntos 3D">
              🗑️ Limpiar Puntos (${t.length})
            </button>
          </div>
        </div>

        <!-- Reception Form & Pin Checklist -->
        <div class="glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            📋 Datos de Ingreso y Cliente
          </h3>

          <form id="reception-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <label class="form-label">Nombre del Cliente *</label>
              <input type="text" id="cust-name" class="form-control" placeholder="Ej. Carlos Mendoza" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">DNI / RUC *</label>
                <input type="text" id="cust-dni" class="form-control" placeholder="72819034" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Teléfono / WhatsApp *</label>
                <input type="text" id="cust-phone" class="form-control" placeholder="+51 987 654 321" required>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Modelo del Equipo *</label>
                <input type="text" id="dev-model" class="form-control" placeholder="Asus TUF / Lenovo ThinkPad" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Número de Serie *</label>
                <input type="text" id="dev-serial" class="form-control" placeholder="SN-892103" required>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Costo Estimado Diagnóstico (S/)</label>
              <input type="number" id="est-cost" class="form-control" value="80" step="5">
            </div>

            <div style="margin-top: 0.5rem; border-top: 1px solid var(--border-glass); padding-top: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0;">Puntos de Falla 3D Marcados</label>
                <span class="badge badge-red" id="pin-count-badge">${t.length} Puntos</span>
              </div>
              
              <div id="pins-list-container" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;">
                <p style="color: var(--text-dim); font-size: 0.825rem; font-style: italic;">
                  No hay fallas marcadas en el modelo 3D aún. Haz clic sobre la laptop para colocar un pin rojo.
                </p>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem;">
                📄 Registrar Orden y Generar Ticket PDF
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal for Pin Description -->
    <div id="fault-modal" class="modal-backdrop" style="display: none;">
      <div class="modal-card">
        <h3 style="color: var(--accent-red); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          📍 Registrar Falla en Modelo 3D
        </h3>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
          Pieza Seleccionada: <strong id="modal-part-name" style="color: white;">-</strong>
        </p>

        <div class="form-group">
          <label class="form-label">Descripción del Daño / Observación *</label>
          <textarea id="modal-fault-note" class="form-control" rows="3" placeholder="Ej. Raya profunda en la cubierta, puerto flojo, pantalla parpadea..." required></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
          <button type="button" class="btn btn-secondary" id="btn-cancel-modal">Cancelar</button>
          <button type="button" class="btn btn-danger" id="btn-save-pin">📍 Marcar Pin Rojo</button>
        </div>
      </div>
    </div>
  `;const s=n.querySelector("#reception-3d-viewport");r=new Vy(s,{onPointClick:b=>{i=b;const _=n.querySelector("#fault-modal"),m=n.querySelector("#modal-part-name"),S=n.querySelector("#modal-fault-note");m.textContent=b.partName||"Componente Exterior",S.value="",_.style.display="flex",S.focus()}});let a=!1;const o=n.querySelector("#btn-toggle-ar");o&&(o.onclick=async()=>{a=!a,await r.toggleARMode(a),o.textContent=a?"❌ Salir de AR":"📱 Modo Realidad Aumentada (AR)",o.className=a?"btn btn-danger btn-sm":"btn btn-primary btn-sm"});const l=n.querySelector("#btn-reset-3d");l&&(l.onclick=()=>r.resetView());const u=n.querySelector("#btn-clear-pins");u&&(u.onclick=()=>{t=[],r.clearFaultPins(),d()});const h=n.querySelector("#btn-cancel-modal"),p=n.querySelector("#btn-save-pin"),g=n.querySelector("#fault-modal");h.onclick=()=>{g.style.display="none",i=null},p.onclick=()=>{const _=n.querySelector("#modal-fault-note").value.trim();if(!_){alert("Por favor ingrese una observación para la falla.");return}if(i){const m={id:Date.now(),part:i.partName,note:_,x:i.point.x,y:i.point.y,z:i.point.z};t.push(m),r.addFaultPin(m),d()}g.style.display="none",i=null};function d(){const b=n.querySelector("#pins-list-container"),_=n.querySelector("#pin-count-badge"),m=n.querySelector("#btn-clear-pins");if(_&&(_.textContent=`${t.length} Puntos`),m&&(m.textContent=`🗑️ Limpiar Puntos (${t.length})`),t.length===0){b.innerHTML=`
        <p style="color: var(--text-dim); font-size: 0.825rem; font-style: italic;">
          No hay fallas marcadas en el modelo 3D aún. Haz clic sobre la laptop para colocar un pin rojo.
        </p>
      `;return}b.innerHTML=t.map((S,M)=>`
      <div class="fault-pin-item">
        <div>
          <strong style="color: var(--accent-red); font-size: 0.85rem;">[Pin #${M+1}] ${S.part}</strong>
          <p style="color: var(--text-main); font-size: 0.8rem; margin-top: 0.1rem;">${S.note}</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm remove-pin-btn" data-id="${S.id}" style="padding: 0.2rem 0.5rem; color: #ff3366;">✕</button>
      </div>
    `).join(""),b.querySelectorAll(".remove-pin-btn").forEach(S=>{S.onclick=()=>{const M=parseInt(S.getAttribute("data-id"));t=t.filter(P=>P.id!==M),r.clearFaultPins(),t.forEach(P=>r.addFaultPin(P)),d()}})}const x=n.querySelector("#reception-form");x.onsubmit=async b=>{b.preventDefault();const _={id:e,customerName:n.querySelector("#cust-name").value.trim(),customerDni:n.querySelector("#cust-dni").value.trim(),customerPhone:n.querySelector("#cust-phone").value.trim(),deviceModel:n.querySelector("#dev-model").value.trim(),deviceSerial:n.querySelector("#dev-serial").value.trim(),estimatedCost:parseFloat(n.querySelector("#est-cost").value)||80,status:"DIAGNOSTICO",technician:"Ing. Alexis Ruiz",createdAt:new Date().toISOString(),faults3D:t,usedParts:[],warrantyDays:60};nm(_);const m=r.captureSnapshot();await S0(_,m),alert(`¡Orden ${e} registrada con éxito!
Se ha generado y descargado el comprobante PDF con la captura 3D y código QR.`),w0(n)}}class Rx{constructor(e,t={}){this.container=e,this.options=t,this.explodeFactor=.6,this.componentsMap=new Map,this.selectedMesh=null,this.isARActive=!1,this.videoStream=null,this.videoElement=null,this.initScene(),this.createInternalComponents(),this.setupLights(),this.setupEventListeners(),this.animate()}initScene(){this.width=this.container.clientWidth||800,this.height=this.container.clientHeight||480,this.scene=new ld,this.scene.background=new Ut(461588),this.camera=new li(45,this.width/this.height,.1,1e3),this.camera.position.set(0,4.5,5),this.camera.lookAt(0,0,0),this.renderer=new Hc({antialias:!0,preserveDrawingBuffer:!0,alpha:!0}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.innerHTML="",this.videoElement=document.createElement("video"),this.videoElement.autoplay=!0,this.videoElement.playsInline=!0,this.videoElement.style.cssText="position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:none; z-index:1;",this.container.appendChild(this.videoElement),this.renderer.domElement.style.position="relative",this.renderer.domElement.style.zIndex="2",this.container.appendChild(this.renderer.domElement),this.raycaster=new km,this.mouse=new kt,this.explodedGroup=new sr,this.scene.add(this.explodedGroup)}async toggleARMode(e){if(this.isARActive=e,e){this.scene.background=null,this.renderer.setClearColor(0,0);try{navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(this.videoStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),this.videoElement.srcObject=this.videoStream,this.videoElement.style.display="block")}catch(t){console.warn("Camera access denied or unavailable, using AR WebXR Passthrough Simulation:",t),this.container.style.backgroundImage="radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(6, 10, 20, 0.9) 100%)"}}else this.videoStream&&(this.videoStream.getTracks().forEach(t=>t.stop()),this.videoStream=null),this.videoElement.style.display="none",this.container.style.backgroundImage="",this.scene.background=new Ut(461588)}createInternalComponents(){const e=new mi({color:2042173,metalness:.8,roughness:.3}),t=new mi({color:292951,metalness:.2,roughness:.4}),i=new mi({color:11817737,metalness:.9,roughness:.2}),r=new mi({color:1120295,metalness:.1,roughness:.8}),s=new mi({color:165063,metalness:.4,roughness:.4}),a=new mi({color:4405450,metalness:.5,roughness:.3}),o=new mi({color:3621201,metalness:.7,roughness:.3}),l=new cn(3.2,.08,2.2),u=new Ht(l,e);u.userData={id:"BASE",name:"Tapa Inferior de Carcasa",partId:null,basePosY:-.8},this.explodedGroup.add(u),this.componentsMap.set("BASE",u);const h=new cn(2.4,.1,.7),p=new Ht(h,r);p.userData={id:"BATTERY",name:"Batería Interna 56Wh 3 Celdas",partId:"PART-004",basePosY:-.4,posZ:.6},this.explodedGroup.add(p),this.componentsMap.set("BATTERY",p);const g=new cn(2.8,.06,1.3),d=new Ht(g,t);d.userData={id:"MOTHERBOARD",name:"Tarjeta Madre Mainboard System",partId:null,basePosY:-.1,posZ:-.3},this.explodedGroup.add(d),this.componentsMap.set("MOTHERBOARD",d);const x=new sr,b=new cn(.8,.12,.8),_=new Ht(b,o),m=new cd(.04,.04,1.4),S=new Ht(m,i);S.rotation.z=Math.PI/2,S.position.set(.6,.05,0),x.add(_),x.add(S),x.position.set(-.8,0,-.3),_.userData={id:"COOLER",name:"Fan / Cooler Térmico Asus TUF/ROG",partId:"PART-003",basePosY:.35,posZ:-.3,posX:-.8},this.explodedGroup.add(x),this.componentsMap.set("COOLER",x);const M=new cn(.7,.08,.25),P=new Ht(M,s);P.userData={id:"RAM",name:"Memoria RAM Kingston DDR4 16GB 3200MHz",partId:"PART-001",basePosY:.65,posZ:-.1,posX:.3},this.explodedGroup.add(P),this.componentsMap.set("RAM",P);const q=new cn(.6,.06,.2),G=new Ht(q,a);G.userData={id:"SSD",name:"Disco SSD M.2 NVMe 1TB Kingston NV2",partId:"PART-002",basePosY:.65,posZ:-.5,posX:.8},this.explodedGroup.add(G),this.componentsMap.set("SSD",G);const U=new cn(3.2,.08,2.2),H=new Ht(U,e);H.userData={id:"TOP_DECK",name:"Carcasa Superior con Teclado",partId:"PART-007",basePosY:1.2},this.explodedGroup.add(H),this.componentsMap.set("TOP_DECK",H),this.updateExplodePositions()}setupLights(){const e=new pd(16777215,.9);this.scene.add(e);const t=new Ph(58879,1.2);t.position.set(4,6,4),this.scene.add(t);const i=new fd(65437,.8,10);i.position.set(0,2,0),this.scene.add(i)}setupEventListeners(){const e=this.renderer.domElement;e.addEventListener("pointerdown",t=>{this.isDragging=!1,this.previousMousePosition={x:t.clientX,y:t.clientY}}),e.addEventListener("pointermove",t=>{const i=Math.abs(t.clientX-this.previousMousePosition.x),r=Math.abs(t.clientY-this.previousMousePosition.y);(i>3||r>3)&&(this.isDragging=!0),t.buttons===1&&(this.explodedGroup.rotation.y+=(t.clientX-this.previousMousePosition.x)*.01,this.explodedGroup.rotation.x+=(t.clientY-this.previousMousePosition.y)*.008),this.previousMousePosition={x:t.clientX,y:t.clientY}}),e.addEventListener("click",t=>{if(this.isDragging)return;const i=e.getBoundingClientRect();this.mouse.x=(t.clientX-i.left)/this.width*2-1,this.mouse.y=-((t.clientY-i.top)/this.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const r=this.raycaster.intersectObjects(this.explodedGroup.children,!0);if(r.length>0){let s=r[0].object;for(;s&&!s.userData.name&&s.parent;)s=s.parent;s&&s.userData&&this.options.onComponentSelect&&this.options.onComponentSelect(s.userData)}}),window.addEventListener("resize",()=>this.onWindowResize())}setExplodeFactor(e){this.explodeFactor=Math.max(0,Math.min(1,e)),this.updateExplodePositions()}updateExplodePositions(){this.componentsMap.forEach(e=>{const t=e.userData||e.children[0]&&e.children[0].userData||{},i=t.basePosY||0,r=t.posX||0,s=t.posZ||0;e.position.y=i*this.explodeFactor,e.position.x=r*(1+this.explodeFactor*.3),e.position.z=s})}onWindowResize(){this.container&&(this.width=this.container.clientWidth||800,this.height=this.container.clientHeight||480,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height))}animate(){requestAnimationFrame(()=>this.animate()),this.renderer.render(this.scene,this.camera)}destroy(){this.renderer&&this.renderer.domElement&&this.renderer.domElement.remove()}}function Px(n){const e=Hr();Ys();let t=e.length>0?e[0].id:null,i=null,r=null;function s(){return Hr().find(x=>x.id===t)||null}n.innerHTML=`
    <div class="workshop-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">Módulo 2: Taller & Despiece 3D de Repuestos</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Despiece interno en 3D del equipo y descuento automático de repuestos del inventario en tiempo real.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label class="form-label" style="margin: 0; white-space: nowrap;">Orden Activa:</label>
          <select id="workshop-order-select" class="form-control" style="width: 220px; font-weight: 600; color: var(--accent-cyan);">
            ${e.map(x=>`
              <option value="${x.id}" ${x.id===t?"selected":""}>
                ${x.id} - ${x.deviceModel}
              </option>
            `).join("")}
          </select>
        </div>
      </div>

      <div class="grid-2-1">
        <!-- 3D Exploded View Box -->
        <div class="glass-panel viewport-3d-container" style="height: 520px; position: relative;">
          <div class="viewport-overlay">
            <span class="badge badge-amber">
              ⚙️ VISTA EXPLOTADA 3D DE COMPONENTES INTERNOS
            </span>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 0.4rem;">
              • Haz clic en la RAM, SSD, Fan o Batería para seleccionarla e integrarla al inventario.<br>
              • Usa el control deslizante inferior para ajustar el nivel de despiece.
            </p>
          </div>

          <div id="workshop-3d-viewport" style="width: 100%; height: 100%;"></div>

          <!-- Explode Factor Slider & AR Button -->
          <div class="viewport-controls-bar" style="left: 1rem; right: 1rem; justify-content: space-between; align-items: center;">
            <button class="btn btn-primary btn-sm" id="btn-toggle-ar-workshop" title="Activar Cámara de Realidad Aumentada">
              📱 AR Despiece
            </button>
            <div style="display: flex; align-items: center; gap: 0.75rem; width: 55%;">
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">💥 DESPIECE:</span>
              <input type="range" id="explode-slider" min="0" max="1" step="0.02" value="0.6" style="flex: 1; accent-color: var(--accent-cyan); cursor: pointer;">
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-reset-exploded">
              🔄 Vista Inicial
            </button>
          </div>
        </div>

        <!-- Component Inspector & Inventory Sync Card -->
        <div class="glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            🔍 Componente Seleccionado & Stock
          </h3>

          <div id="component-detail-box" style="flex: 1; display: flex; flex-direction: column;">
            <p style="color: var(--text-dim); font-size: 0.875rem; font-style: italic;">
              Haz clic en cualquier pieza dentro del modelo 3D (RAM, SSD, Fan, Batería) para consultar stock y descontar repuestos.
            </p>
          </div>

          <!-- Active Order Summary Box -->
          <div style="border-top: 1px solid var(--border-glass); padding-top: 1rem;">
            <h4 style="font-size: 0.95rem; color: white; margin-bottom: 0.5rem;">Repuestos Asignados a la Orden</h4>
            <div id="assigned-parts-list" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;const a=n.querySelector("#workshop-3d-viewport");r=new Rx(a,{onComponentSelect:x=>{i=x,g()}});let o=!1;const l=n.querySelector("#btn-toggle-ar-workshop");l&&(l.onclick=async()=>{o=!o,await r.toggleARMode(o),l.textContent=o?"❌ Salir AR":"📱 AR Despiece",l.className=o?"btn btn-danger btn-sm":"btn btn-primary btn-sm"});const u=n.querySelector("#explode-slider");u.oninput=x=>{r.setExplodeFactor(parseFloat(x.target.value))};const h=n.querySelector("#btn-reset-exploded");h&&(h.onclick=()=>{u.value=.6,r.setExplodeFactor(.6)});const p=n.querySelector("#workshop-order-select");p.onchange=x=>{t=x.target.value,d()};function g(){const x=n.querySelector("#component-detail-box");if(!i)return;const _=Ys().find(S=>S.id===i.partId)||null;x.innerHTML=`
      <div style="background: rgba(0, 229, 255, 0.06); border: 1px solid rgba(0, 229, 255, 0.2); padding: 0.85rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
        <span class="badge badge-cyan">PIEZA 3D: ${i.id}</span>
        <h4 style="color: white; font-size: 1.05rem; margin-top: 0.3rem;">${i.name}</h4>
      </div>

      ${_?`
        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: var(--text-muted);">Código de Stock:</span>
            <strong style="color: white;">${_.code}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: var(--text-muted);">Stock Disponible en Almacén:</span>
            <strong style="color: ${_.stock>3?"var(--accent-green)":"var(--accent-red)"}; font-size: 1.05rem;">
              ${_.stock} Unidades
            </strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: var(--text-muted);">Precio Unitario Venta:</span>
            <strong style="color: var(--accent-cyan); font-size: 1.05rem;">${yr(_.price)}</strong>
          </div>
        </div>

        <button class="btn btn-success" id="btn-deduct-stock" style="width: 100%; margin-top: auto; padding: 0.75rem;" ${_.stock<=0?"disabled":""}>
          📦 Descontar 1 Unidad de Stock y Vincular a Orden
        </button>
      `:`
        <div style="background: rgba(255, 153, 0, 0.1); border: 1px solid rgba(255, 153, 0, 0.3); padding: 0.85rem; border-radius: var(--radius-sm);">
          <p style="color: var(--accent-amber); font-size: 0.85rem;">
            Este componente es parte de la estructura base y no requiere repuesto de inventario directo.
          </p>
        </div>
      `}
    `;const m=x.querySelector("#btn-deduct-stock");m&&_&&(m.onclick=()=>{const S=s();if(!S){alert("Por favor seleccione una orden de servicio activa.");return}const M=gg(_.id,1);if(M.success){const P=S.usedParts||[],q=P.findIndex(G=>G.partId===_.id);q>=0?P[q].qty+=1:P.push({partId:_.id,name:_.name,qty:1,price:_.price}),S.usedParts=P,S.status="REPARACION",nm(S),alert(`¡1 Unidad de "${_.name}" descontada del stock y vinculada exitosamente a la Orden ${S.id}!`),g(),d()}else alert(M.message||"Error al descontar stock")})}function d(){const x=n.querySelector("#assigned-parts-list"),b=s();if(!b||!b.usedParts||b.usedParts.length===0){x.innerHTML=`
        <p style="color: var(--text-dim); font-size: 0.8rem; font-style: italic;">
          No hay repuestos registrados para esta orden.
        </p>
      `;return}x.innerHTML=b.usedParts.map(_=>`
      <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.04); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm);">
        <span style="font-size: 0.8rem; color: white;">${_.name} (x${_.qty})</span>
        <strong style="font-size: 0.8rem; color: var(--accent-green);">${yr(_.price*_.qty)}</strong>
      </div>
    `).join("")}d()}function $h(n,e="JSR-3099"){let t=e,i=Zd(t);const r=window.location.hash;if(r.includes("ticket=")){const o=r.split("ticket=")[1];o&&(t=o.split("&")[0]),i=Zd(t)}n.innerHTML=`
    <div class="client-portal-module">
      <div style="margin-bottom: 1.5rem; text-align: center;">
        <h1 style="font-size: 2rem; color: white; margin-bottom: 0.4rem;">
          🌐 Portal de Rastreo 3D para Clientes
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Consulte el estado de reparación de su equipo con iluminación e inspección 3D en tiempo real.
        </p>

        <!-- Search Bar -->
        <div style="max-width: 460px; margin: 1.25rem auto 0 auto; display: flex; gap: 0.5rem;">
          <input type="text" id="ticket-search-input" class="form-control" placeholder="Ingrese su N° Ticket (Ej. JSR-3099)" value="${t}" style="text-transform: uppercase; font-size: 1rem; font-weight: 600; text-align: center;">
          <button class="btn btn-primary" id="btn-search-ticket" style="padding: 0 1.25rem;">
            🔍 Buscar
          </button>
        </div>
      </div>

      ${i?`
        <div class="grid-2-1">
          <!-- 3D Status Viewport -->
          <div class="glass-panel viewport-3d-container" style="height: 500px; position: relative;">
            <div class="viewport-overlay" id="portal-status-overlay">
              <!-- Dynamically populated status badge -->
            </div>

            <div id="client-3d-viewport" style="width: 100%; height: 100%;"></div>
          </div>

          <!-- Ticket Summary Card -->
          <div class="glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem;">COMPROBANTE N°</span>
                <h3 style="color: var(--accent-cyan); font-size: 1.35rem;">${i.id}</h3>
              </div>
              <div id="portal-badge-container">
                <!-- Status Badge -->
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Cliente:</span>
                <strong style="color: white;">${i.customerName}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Equipo:</span>
                <strong style="color: white;">${i.deviceModel}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">N° Serie:</span>
                <span style="color: var(--text-main); font-family: monospace;">${i.deviceSerial}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Técnico Asignado:</span>
                <span style="color: var(--accent-cyan);">${i.technician||"En asignación"}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Fecha de Ingreso:</span>
                <span style="color: var(--text-muted);">${Kh(i.createdAt)}</span>
              </div>
            </div>

            <!-- Faults breakdown -->
            <div style="border-top: 1px solid var(--border-glass); padding-top: 0.75rem;">
              <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">
                Diagnóstico de Fallas Reportadas
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.35rem; max-height: 110px; overflow-y: auto;">
                ${(i.faults3D||[]).map(o=>`
                  <div style="font-size: 0.8rem; background: rgba(255,51,102,0.08); border-left: 3px solid #ff3366; padding: 0.3rem 0.5rem; border-radius: 4px;">
                    <strong style="color: white;">${o.part}:</strong> ${o.note}
                  </div>
                `).join("")||'<p style="color: var(--text-dim); font-size: 0.8rem;">Sin observaciones adicionales.</p>'}
              </div>
            </div>

            <!-- Total Cost -->
            <div style="margin-top: auto; border-top: 1px solid var(--border-glass); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <span style="color: var(--text-muted); font-size: 0.9rem;">Costo de Reparación:</span>
              <strong style="color: var(--accent-green); font-size: 1.35rem; font-family: var(--font-heading);">
                ${yr(i.estimatedCost||0)}
              </strong>
            </div>
          </div>
        </div>
      `:`
        <div class="glass-panel" style="text-align: center; padding: 3rem; max-width: 600px; margin: 2rem auto;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="color: white; margin-bottom: 0.5rem;">Ticket No Encontrado</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
            No se encontró ninguna orden registrada con el código <strong>"${t}"</strong>.
          </p>
          <p style="color: var(--text-dim); font-size: 0.825rem;">
            Intente con tickets de demostración: <a href="#" class="demo-ticket-link" data-id="JSR-1024" style="color: var(--accent-cyan);">JSR-1024 (Rojo)</a> | 
            <a href="#" class="demo-ticket-link" data-id="JSR-2058" style="color: var(--accent-amber);">JSR-2058 (Naranja)</a> | 
            <a href="#" class="demo-ticket-link" data-id="JSR-3099" style="color: var(--accent-green);">JSR-3099 (Verde)</a>
          </p>
        </div>
      `}
    </div>
  `;const s=n.querySelector("#btn-search-ticket"),a=n.querySelector("#ticket-search-input");s&&a&&(s.onclick=()=>{const o=a.value.trim().toUpperCase();o&&$h(n,o)},a.onkeypress=o=>{o.key==="Enter"&&s.click()}),n.querySelectorAll(".demo-ticket-link").forEach(o=>{o.onclick=l=>{l.preventDefault();const u=o.getAttribute("data-id");$h(n,u)}}),i&&Nx(n.querySelector("#client-3d-viewport"),i.status,n)}function Nx(n,e,t){if(!n)return;const i=n.clientWidth||800,r=n.clientHeight||500,s=new ld;s.background=new Ut(395796);const a=new li(45,i/r,.1,1e3);a.position.set(0,3,5.5),a.lookAt(0,0,0);const o=new Hc({antialias:!0});o.setSize(i,r),o.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.innerHTML="",n.appendChild(o.domElement);let l=16724838,u='<span class="badge badge-red" style="animation: pulseRed 2s infinite;"><span class="status-dot-red"></span> ESTADO: EN DIAGNOSTICO</span>',h='<span class="badge badge-red">🔴 EN DIAGNOSTICO</span>';e==="REPARACION"?(l=16750848,u='<span class="badge badge-amber"><span style="width:10px;height:10px;background:#ff9900;border-radius:50%;"></span> ESTADO: EN PROCESO DE REPARACION</span>',h='<span class="badge badge-amber">🟠 EN REPARACION</span>'):e==="LISTO"&&(l=65437,u='<span class="badge badge-green" style="animation: pulseGreen 1.8s infinite;"><span class="status-dot-green"></span> ¡LISTO PARA RECOGER!</span>',h='<span class="badge badge-green">🟢 LISTO EN TIENDA</span>');const p=t.querySelector("#portal-status-overlay");p&&(p.innerHTML=u);const g=t.querySelector("#portal-badge-container");g&&(g.innerHTML=h);const d=new sr;s.add(d);const x=new mi({color:1581104,roughness:.3,metalness:.8}),b=new mi({color:l,emissive:l,emissiveIntensity:.9,roughness:.1}),_=new Ht(new cn(3.2,.15,2.2),x);d.add(_);const m=new Ht(new cn(2.8,.02,1.1),b);m.position.set(0,.08,-.25),d.add(m);const S=new sr;S.position.set(0,.08,-1.05);const M=new Ht(new cn(3.2,2.1,.1),x);M.geometry.translate(0,1.05,0),S.add(M);const P=new Ht(new cn(2.9,1.8,.02),b);P.geometry.translate(0,1.05,.05),S.add(P),S.rotation.x=vm.degToRad(-25),d.add(S);const q=new pd(16777215,.5);s.add(q);const G=new fd(l,2.5,12);G.position.set(0,2.5,1),s.add(G);let U=null;if(e==="LISTO"){const A=new qi,D=120,E=new Float32Array(D*3);for(let X=0;X<D*3;X+=3)E[X]=(Math.random()-.5)*6,E[X+1]=Math.random()*4,E[X+2]=(Math.random()-.5)*6;A.setAttribute("position",new ar(E,3));const R=new Um({size:.08,color:65437,transparent:!0,opacity:.8});U=new zy(A,R),s.add(U)}function H(){if(requestAnimationFrame(H),d.rotation.y+=.005,U){U.rotation.y+=.003;const A=U.geometry.attributes.position.array;for(let D=1;D<A.length;D+=3)A[D]+=.008,A[D]>4&&(A[D]=0);U.geometry.attributes.position.needsUpdate=!0}o.render(s,a)}H()}function Ix(n){const t=Hr().filter(i=>i.status==="LISTO"||i.deliveredAt);n.innerHTML=`
    <div class="warranty-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">Módulo 4: Motor de Garantías & Alertas Preventivas</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Control de garantías de servicio y programación de mantenimientos preventivos a los 6 meses.
          </p>
        </div>
        <div class="badge badge-green" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">
          🛡️ ${t.length} GARANTÍ AS ACTIVAS
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 2rem;">
        <!-- Card 1: Garantías de Reparación -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-green); font-size: 1.15rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🛡️ Control de Garantías por Servicio
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${t.length===0?`
              <p style="color: var(--text-dim); font-size: 0.875rem;">No hay garantias registradas aún.</p>
            `:t.map(i=>{const r=i.deliveredAt||i.createdAt,s=new Date(new Date(r).getTime()+(i.warrantyDays||60)*24*60*60*1e3).toISOString(),a=ef(s),o=Math.max(0,Math.min(100,a/(i.warrantyDays||60)*100));return`
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); padding: 0.85rem; border-radius: var(--radius-sm);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <strong style="color: white;">${i.customerName} - Ticket ${i.id}</strong>
                    <span class="badge ${a>15?"badge-green":"badge-amber"}">
                      ${a>0?`${a} Días Restantes`:"Vencida"}
                    </span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    Equipo: ${i.deviceModel} | Garantía: ${i.warrantyDays||60} Días
                  </p>

                  <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${o}%; background: ${a>15?"var(--accent-green)":"var(--accent-amber)"}; transition: width 0.3s;"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Card 2: Alertas Automáticas de 6 Meses -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🔔 Avisos Automáticos a los 6 Meses (Limpieza Térmica)
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${t.map(i=>{const r=i.nextMaintenanceDate||new Date(new Date(i.createdAt).getTime()+15552e6).toISOString(),s=ef(r);return`
                <div style="background: rgba(0, 229, 255, 0.04); border: 1px solid rgba(0, 229, 255, 0.2); padding: 0.85rem; border-radius: var(--radius-sm);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <strong style="color: white;">${i.customerName}</strong>
                    <span class="badge badge-cyan">${s>0?`En ${s} Días`:"¡Programado Hoy!"}</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.6rem;">
                    Mantenimiento Preventivo Sugerido: <strong>Limpieza de Fans + Cambio de Pasta Térmica Arctic MX-4</strong>.
                  </p>

                  <button class="btn btn-secondary btn-sm send-whatsapp-btn" data-phone="${i.customerPhone}" data-name="${i.customerName}" data-model="${i.deviceModel}" style="width: 100%; font-size: 0.8rem; color: var(--accent-green);">
                    📱 Simular Envío de Mensaje por WhatsApp
                  </button>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `,n.querySelectorAll(".send-whatsapp-btn").forEach(i=>{i.onclick=()=>{const r=i.getAttribute("data-name"),s=i.getAttribute("data-model"),a=i.getAttribute("data-phone"),o=`Hola ${r}, desde Multiservicios JSR recordamos que tu laptop ${s} ya cumplió 6 meses desde su mantenimiento. ¡Aprovecha un 20% Dcto en tu Mantenimiento Térmico Preventivo para evitar sobrecalentamiento!`,l=encodeURIComponent(o),u=`https://wa.me/${a.replace(/[^0-9]/g,"")}?text=${l}`;window.open(u,"_blank")}})}function Dx(n){let e="orders";function t(){const r=Hr(),s=Ys();n.innerHTML=`
      <div class="inventory-module">
        <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h1 style="font-size: 1.8rem; color: white;">Módulo 5: Administración de Órdenes & Stock</h1>
            <p style="color: var(--text-muted); font-size: 0.95rem;">
              Control global de reparaciones, estados de taller y catálogo de repuestos.
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem; background: rgba(17, 24, 39, 0.8); padding: 0.35rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
            <button class="btn btn-sm ${e==="orders"?"btn-primary":"btn-secondary"}" id="tab-orders">
              📋 Órdenes de Servicio (${r.length})
            </button>
            <button class="btn btn-sm ${e==="inventory"?"btn-primary":"btn-secondary"}" id="tab-inventory">
              📦 Inventario de Repuestos (${s.length})
            </button>
          </div>
        </div>

        ${e==="orders"?`
          <!-- Orders Table Panel -->
          <div class="glass-panel">
            <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">
              Listado General de Tickets y Estado de Taller
            </h3>

            <div style="overflow-x: auto;">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>N° Ticket</th>
                    <th>Cliente</th>
                    <th>Equipo / Serie</th>
                    <th>Técnico</th>
                    <th>Estado de Trabajo</th>
                    <th>Fecha Ingreso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.map(h=>`
                    <tr>
                      <td><strong style="color: var(--accent-cyan);">${h.id}</strong></td>
                      <td>
                        <strong style="color: white; font-size: 0.9rem;">${h.customerName}</strong><br>
                        <span style="font-size: 0.775rem; color: var(--text-muted);">${h.customerPhone}</span>
                      </td>
                      <td>
                        <span style="color: var(--text-main); font-size: 0.85rem;">${h.deviceModel}</span><br>
                        <span style="font-size: 0.75rem; color: var(--text-dim); font-family: monospace;">${h.deviceSerial}</span>
                      </td>
                      <td><span style="color: var(--text-muted); font-size: 0.85rem;">${h.technician||"-"}</span></td>
                      <td>
                        <select class="form-control status-select" data-id="${h.id}" style="padding: 0.35rem 0.5rem; font-size: 0.8rem; font-weight: 600; width: 155px; color: ${i(h.status)};">
                          <option value="DIAGNOSTICO" ${h.status==="DIAGNOSTICO"?"selected":""}>🔴 En Diagnóstico</option>
                          <option value="REPARACION" ${h.status==="REPARACION"?"selected":""}>🟠 En Reparación</option>
                          <option value="LISTO" ${h.status==="LISTO"?"selected":""}>🟢 Listo para Entregar</option>
                        </select>
                      </td>
                      <td><span style="font-size: 0.8rem; color: var(--text-muted);">${Kh(h.createdAt)}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm print-pdf-btn" data-id="${h.id}">
                          📄 Reimprimir PDF
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `:`
          <!-- Inventory Table Panel -->
          <div class="glass-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="color: white; font-size: 1.1rem;">
                Stock de Repuestos & Insumos Técnicos
              </h3>
              <button class="btn btn-success btn-sm" id="btn-add-part">
                ➕ Registrar Nuevo Repuesto
              </button>
            </div>

            <div style="overflow-x: auto;">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre de Repuesto</th>
                    <th>Categoría</th>
                    <th>Stock Actual</th>
                    <th>Costo</th>
                    <th>Precio Venta</th>
                    <th>Ajuste de Stock</th>
                  </tr>
                </thead>
                <tbody>
                  ${s.map(h=>`
                    <tr>
                      <td><span style="font-family: monospace; color: var(--text-muted);">${h.code}</span></td>
                      <td><strong style="color: white; font-size: 0.9rem;">${h.name}</strong></td>
                      <td><span class="badge badge-cyan" style="font-size: 0.7rem;">${h.category}</span></td>
                      <td>
                        <span class="badge ${h.stock>3?"badge-green":"badge-red"}" style="font-size: 0.85rem;">
                          ${h.stock} Unidades
                        </span>
                      </td>
                      <td><span style="color: var(--text-muted); font-size: 0.85rem;">${yr(h.cost)}</span></td>
                      <td><strong style="color: var(--accent-green); font-size: 0.9rem;">${yr(h.price)}</strong></td>
                      <td>
                        <div style="display: flex; gap: 0.35rem;">
                          <button class="btn btn-secondary btn-sm stock-adj-btn" data-id="${h.id}" data-delta="-1">-1</button>
                          <button class="btn btn-secondary btn-sm stock-adj-btn" data-id="${h.id}" data-delta="1">+1</button>
                        </div>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `}
      </div>

      <!-- Add Part Modal -->
      <div id="add-part-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-card">
          <h3 style="color: var(--accent-green); margin-bottom: 1rem;">➕ Registrar Nuevo Repuesto en Inventario</h3>
          
          <div class="form-group">
            <label class="form-label">Nombre del Repuesto *</label>
            <input type="text" id="new-part-name" class="form-control" placeholder="Ej. Pantalla OLED 14.0 pulgadas" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div class="form-group">
              <label class="form-label">Código SKU *</label>
              <input type="text" id="new-part-code" class="form-control" placeholder="SCR-OLED-14" required>
            </div>
            <div class="form-group">
              <label class="form-label">Categoría *</label>
              <input type="text" id="new-part-cat" class="form-control" placeholder="Pantallas / RAM / SSD" required>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
            <div class="form-group">
              <label class="form-label">Stock Inicial</label>
              <input type="number" id="new-part-stock" class="form-control" value="5">
            </div>
            <div class="form-group">
              <label class="form-label">Costo (S/)</label>
              <input type="number" id="new-part-cost" class="form-control" value="100">
            </div>
            <div class="form-group">
              <label class="form-label">Precio Venta (S/)</label>
              <input type="number" id="new-part-price" class="form-control" value="160">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
            <button class="btn btn-secondary" id="btn-cancel-part-modal">Cancelar</button>
            <button class="btn btn-success" id="btn-save-new-part">Guardar Repuesto</button>
          </div>
        </div>
      </div>
    `,n.querySelector("#tab-orders").onclick=()=>{e="orders",t()},n.querySelector("#tab-inventory").onclick=()=>{e="inventory",t()},n.querySelectorAll(".status-select").forEach(h=>{h.onchange=p=>{const g=h.getAttribute("data-id"),d=p.target.value;mg(g,d),t()}}),n.querySelectorAll(".print-pdf-btn").forEach(h=>{h.onclick=async()=>{const p=h.getAttribute("data-id"),g=r.find(d=>d.id===p);g&&await S0(g)}}),n.querySelectorAll(".stock-adj-btn").forEach(h=>{h.onclick=()=>{const p=h.getAttribute("data-id"),g=parseInt(h.getAttribute("data-delta")),d=s.find(x=>x.id===p);d&&(d.stock=Math.max(0,d.stock+g),Qd(d),t())}});const a=n.querySelector("#btn-add-part"),o=n.querySelector("#add-part-modal"),l=n.querySelector("#btn-cancel-part-modal"),u=n.querySelector("#btn-save-new-part");a&&o&&(a.onclick=()=>{o.style.display="flex"},l.onclick=()=>{o.style.display="none"},u.onclick=()=>{const h=n.querySelector("#new-part-name").value.trim(),p=n.querySelector("#new-part-code").value.trim(),g=n.querySelector("#new-part-cat").value.trim(),d=parseInt(n.querySelector("#new-part-stock").value)||0,x=parseFloat(n.querySelector("#new-part-cost").value)||0,b=parseFloat(n.querySelector("#new-part-price").value)||0;if(!h||!p||!g){alert("Por favor complete el nombre, código y categoría del repuesto.");return}const _={id:`PART-${Date.now()}`,name:h,code:p,category:g,stock:d,cost:x,price:b};Qd(_),o.style.display="none",t()})}function i(r){return r==="DIAGNOSTICO"?"#ff3366":r==="REPARACION"?"#ff9900":r==="LISTO"?"#00ff9d":"#ffffff"}t()}function Fx(n){const e=Hr();Ys();const t=e.reduce((a,o)=>a+(o.estimatedCost||0),0),i=e.reduce((a,o)=>a+(o.usedParts?o.usedParts.reduce((l,u)=>l+u.qty,0):0),0),r=e.length>0?t/e.length:0;n.innerHTML=`
    <div class="reports-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">📊 Módulo de Reportes & Analítica JSR</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Análisis financiero, rotación de repuestos e historial de ganancias de taller.
          </p>
        </div>

        <button class="btn btn-primary btn-sm" id="btn-print-report">
          🖨️ Imprimir Reporte Mensual
        </button>
      </div>

      <!-- Financial Metrics Grid -->
      <div class="grid-3" style="margin-bottom: 1.75rem;">
        <div class="glass-panel">
          <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Ingresos Totales Acumulados</span>
          <h2 style="font-size: 2rem; color: var(--accent-green); margin-top: 0.3rem;">${yr(t)}</h2>
        </div>
        <div class="glass-panel">
          <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Repuestos Instalados</span>
          <h2 style="font-size: 2rem; color: var(--accent-cyan); margin-top: 0.3rem;">${i} Piezas</h2>
        </div>
        <div class="glass-panel">
          <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Ticket Promedio por Reparación</span>
          <h2 style="font-size: 2rem; color: white; margin-top: 0.3rem;">${yr(r)}</h2>
        </div>
      </div>

      <!-- Financial Breakdown Table -->
      <div class="glass-panel">
        <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">
          Desglose Financiero por Orden de Servicio
        </h3>

        <div style="overflow-x: auto;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Cliente</th>
                <th>Equipo</th>
                <th>Repuestos Instalados</th>
                <th>Costo Est. Servicio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(a=>`
                <tr>
                  <td><strong style="color: var(--accent-cyan);">${a.id}</strong></td>
                  <td><strong style="color: white;">${a.customerName}</strong></td>
                  <td><span style="color: var(--text-muted);">${a.deviceModel}</span></td>
                  <td>
                    <span style="font-size: 0.8rem; color: var(--text-main);">
                      ${(a.usedParts||[]).map(o=>`${o.name} (x${o.qty})`).join(", ")||"Sin repuestos adicionales"}
                    </span>
                  </td>
                  <td><strong style="color: var(--accent-green);">${yr(a.estimatedCost||0)}</strong></td>
                  <td>
                    <span class="badge ${a.status==="DIAGNOSTICO"?"badge-red":a.status==="REPARACION"?"badge-amber":"badge-green"}">
                      ${a.status}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;const s=n.querySelector("#btn-print-report");s&&(s.onclick=()=>{window.print()})}function Ux(n){function e(){const t=el(),i=tl();n.innerHTML=`
      <div class="user-management-module">
        <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h1 style="font-size: 1.8rem; color: white;">👥 Registro & Control de Usuarios del Sistema</h1>
            <p style="color: var(--text-muted); font-size: 0.95rem;">
              Administración de cuentas, roles de acceso y datos personales del equipo de Multiservicios JSR.
            </p>
          </div>

          <button class="btn btn-primary" id="btn-add-user-modal">
            ➕ Registrar Nuevo Usuario
          </button>
        </div>

        <div class="glass-panel">
          <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">
            Directorio de Usuarios Registrados (${t.length})
          </h3>

          <div style="overflow-x: auto;">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Nombres y Apellidos</th>
                  <th>DNI / RUC</th>
                  <th>Teléfono / WhatsApp</th>
                  <th>Correo Electrónico</th>
                  <th>Rol de Acceso</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${t.map(l=>`
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <img src="${l.avatarUrl}" style="width: 30px; height: 30px; border-radius: 50%; background: var(--accent-cyan);">
                        <strong style="color: var(--accent-cyan);">${l.username}</strong>
                      </div>
                    </td>
                    <td><strong style="color: white; font-size: 0.9rem;">${l.fullName}</strong></td>
                    <td><span style="font-family: monospace; color: var(--text-muted);">${l.dni||"-"}</span></td>
                    <td><span style="color: var(--text-muted); font-size: 0.85rem;">${l.phone||"-"}</span></td>
                    <td><span style="color: var(--text-muted); font-size: 0.85rem;">${l.email||"-"}</span></td>
                    <td>
                      <span class="badge ${l.role==="ADMIN"?"badge-cyan":l.role==="TECNICO"?"badge-green":"badge-amber"}">
                        ${l.role}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm toggle-status-btn ${l.status==="ACTIVE"?"btn-success":"btn-secondary"}" data-id="${l.id}" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">
                        ${l.status==="ACTIVE"?"🟢 ACTIVO":"🔴 INACTIVO"}
                      </button>
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm delete-user-btn" data-id="${l.id}" data-name="${l.fullName}" data-user="${l.username}" style="padding: 0.25rem 0.6rem; font-size: 0.8rem;">
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add User Modal -->
      <div id="create-user-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-card">
          <h3 style="color: var(--accent-cyan); margin-bottom: 1rem;">➕ Registrar Nuevo Usuario</h3>
          
          <form id="create-user-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Nombres y Apellidos Completos *</label>
              <input type="text" id="new-u-fullname" class="form-control" placeholder="Ej. Pedro Picapiedra" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">DNI / RUC *</label>
                <input type="text" id="new-u-dni" class="form-control" placeholder="72819034" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Teléfono / WhatsApp *</label>
                <input type="text" id="new-u-phone" class="form-control" placeholder="+51 987 654 321" required>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Correo Electrónico *</label>
              <input type="email" id="new-u-email" class="form-control" placeholder="correo@ejemplo.com" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Rol de Sistema</label>
              <select id="new-u-role" class="form-control">
                <option value="TECNICO">Técnico de Taller</option>
                <option value="ADMIN">Administrador General</option>
                <option value="CLIENTE">Cliente Registrado</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Nombre de Usuario *</label>
                <input type="text" id="new-u-username" class="form-control" placeholder="ej. pedro99" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Contraseña *</label>
                <input type="password" id="new-u-password" class="form-control" placeholder="******" required>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-user-modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar y Registrar</button>
            </div>
          </form>
        </div>
      </div>
    `;const r=n.querySelector("#create-user-modal"),s=n.querySelector("#btn-add-user-modal"),a=n.querySelector("#btn-cancel-user-modal");s&&r&&(s.onclick=()=>{r.style.display="flex"},a.onclick=()=>{r.style.display="none"});const o=n.querySelector("#create-user-form");o&&(o.onsubmit=l=>{l.preventDefault();const u={fullName:n.querySelector("#new-u-fullname").value.trim(),dni:n.querySelector("#new-u-dni").value.trim(),phone:n.querySelector("#new-u-phone").value.trim(),email:n.querySelector("#new-u-email").value.trim(),role:n.querySelector("#new-u-role").value,username:n.querySelector("#new-u-username").value.trim(),password:n.querySelector("#new-u-password").value},h=em(u);h.success?(alert(`¡Usuario ${u.username} creado exitosamente!`),r.style.display="none",e()):alert(h.message)}),n.querySelectorAll(".toggle-status-btn").forEach(l=>{l.onclick=()=>{const u=l.getAttribute("data-id"),h=t.find(p=>p.id===u);h&&(h.status=h.status==="ACTIVE"?"INACTIVE":"ACTIVE",cg(h),e())}}),n.querySelectorAll(".delete-user-btn").forEach(l=>{l.onclick=()=>{const u=l.getAttribute("data-id"),h=l.getAttribute("data-name"),p=l.getAttribute("data-user");if(i&&i.id===u){alert("⚠️ No puedes eliminar tu propia cuenta mientras tienes la sesión activa.");return}confirm(`¿Está seguro de eliminar permanentemente a la cuenta de usuario "${p}" (${h})?`)&&(ug(u),alert(`¡La cuenta del usuario "${p}" ha sido eliminada del sistema!`),e())}})}e()}function Ox(n){const e=tm();n.innerHTML=`
    <div class="settings-module">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; color: white;">⚙️ Configuración General del Sistema</h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Ajustes de datos de la tienda, parámetros de comprobante PDF y tarifas base de Multiservicios JSR.
        </p>
      </div>

      <div class="grid-2">
        <!-- Settings Form Card 1 -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            🏢 Datos Comerciales & Empresa
          </h3>

          <form id="settings-company-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Nombre Comercial de la Empresa</label>
              <input type="text" id="set-company" class="form-control" value="${e.companyName||""}" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">RUC de la Tienda</label>
                <input type="text" id="set-ruc" class="form-control" value="${e.ruc||""}" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Teléfono de Atención</label>
                <input type="text" id="set-phone" class="form-control" value="${e.phone||""}" required>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Dirección Física del Local</label>
              <input type="text" id="set-address" class="form-control" value="${e.address||""}" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Correo Electrónico de Contacto</label>
              <input type="email" id="set-email" class="form-control" value="${e.email||""}" required>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 0.75rem;">
              💾 Guardar Datos Comerciales
            </button>
          </form>
        </div>

        <!-- Settings Form Card 2 -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-green); font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            ⚙️ Tarifas & Parámetros de Taller
          </h3>

          <form id="settings-taller-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Costo Base de Diagnóstico (S/)</label>
              <input type="number" id="set-diag-fee" class="form-control" value="${e.baseDiagnosticFee||80}" step="5" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Garantía Estándar por Reparación (Días)</label>
              <input type="number" id="set-warranty-days" class="form-control" value="${e.defaultWarrantyDays||90}" step="15" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Frecuencia de Mantenimiento Preventivo (Meses)</label>
              <input type="number" id="set-maint-months" class="form-control" value="${e.preventiveMaintenanceMonths||6}" step="1" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Tema Visual del Sistema</label>
              <select id="set-theme" class="form-control">
                <option value="cyber-dark" ${e.themeMode==="cyber-dark"?"selected":""}>🌌 Cyber Dark Glassmorphism (Recomendado)</option>
                <option value="neon-blue" ${e.themeMode==="neon-blue"?"selected":""}>⚡ Neon Cyan High Tech</option>
              </select>
            </div>

            <button type="submit" class="btn btn-success" style="margin-top: 0.75rem;">
              💾 Guardar Parámetros de Taller
            </button>
          </form>
        </div>
      </div>
    </div>
  `;const t=n.querySelector("#settings-company-form");t.onsubmit=r=>{r.preventDefault();const s={companyName:n.querySelector("#set-company").value.trim(),ruc:n.querySelector("#set-ruc").value.trim(),phone:n.querySelector("#set-phone").value.trim(),address:n.querySelector("#set-address").value.trim(),email:n.querySelector("#set-email").value.trim()};Kd(s),alert("¡Datos comerciales actualizados exitosamente!")};const i=n.querySelector("#settings-taller-form");i.onsubmit=r=>{r.preventDefault();const s={baseDiagnosticFee:parseFloat(n.querySelector("#set-diag-fee").value)||80,defaultWarrantyDays:parseInt(n.querySelector("#set-warranty-days").value)||90,preventiveMaintenanceMonths:parseInt(n.querySelector("#set-maint-months").value)||6,themeMode:n.querySelector("#set-theme").value};Kd(s),alert("¡Parámetros de taller actualizados exitosamente!")}}document.addEventListener("DOMContentLoaded",()=>{Uc(),Fc();const n=document.getElementById("app");let e="dashboard";const t=window.location.hash;t.includes("dashboard")?e="dashboard":t.includes("reception")?e="reception":t.includes("workshop")?e="workshop":t.includes("tracking")?e="tracking":t.includes("warranties")?e="warranties":t.includes("inventory")?e="inventory":t.includes("reports")?e="reports":t.includes("users")?e="users":t.includes("settings")&&(e="settings");function i(){if(!tl()){n.innerHTML="",bg(n,()=>{i()});return}n.innerHTML="";const s=yg(e,o=>{e=o,window.location.hash=o,i()},()=>{i()});n.appendChild(s);const a=document.createElement("main");switch(a.className="main-content",n.appendChild(a),e){case"dashboard":tf(a,o=>{e=o,window.location.hash=o,i()});break;case"reception":w0(a);break;case"workshop":Px(a);break;case"tracking":$h(a);break;case"warranties":Ix(a);break;case"inventory":Dx(a);break;case"reports":Fx(a);break;case"users":Ux(a);break;case"settings":Ox(a);break;default:tf(a,o=>{e=o,window.location.hash=o,i()})}}window.addEventListener("hashchange",()=>{const r=window.location.hash;r.includes("dashboard")?e="dashboard":r.includes("reception")?e="reception":r.includes("workshop")?e="workshop":r.includes("tracking")?e="tracking":r.includes("warranties")?e="warranties":r.includes("inventory")?e="inventory":r.includes("reports")?e="reports":r.includes("users")?e="users":r.includes("settings")&&(e="settings"),i()}),i()});export{Xt as _};
