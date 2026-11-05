// Componente Vista de Iniciar Sesión & Registro con Datos Personales (Multiservicios JSR)

import { login, registerUser } from '../services/auth.js';

export function renderLoginView(container, onLoginSuccess) {
  let isRegisterMode = false;

  function render() {
    container.innerHTML = `
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
            <button type="button" class="btn btn-sm ${!isRegisterMode ? 'btn-primary' : 'btn-secondary'}" id="tab-mode-login" style="flex: 1; border-radius: 6px;">
              🔑 Iniciar Sesión
            </button>
            <button type="button" class="btn btn-sm ${isRegisterMode ? 'btn-primary' : 'btn-secondary'}" id="tab-mode-register" style="flex: 1; border-radius: 6px;">
              📝 Registro de Datos
            </button>
          </div>

          ${!isRegisterMode ? `
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
          ` : `
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
          `}
        </div>
      </div>
    `;

    // Tab Switchers
    container.querySelector('#tab-mode-login').onclick = () => { isRegisterMode = false; render(); };
    container.querySelector('#tab-mode-register').onclick = () => { isRegisterMode = true; render(); };

    // Login Form Submit
    const loginForm = container.querySelector('#auth-login-form');
    if (loginForm) {
      loginForm.onsubmit = (e) => {
        e.preventDefault();
        const u = container.querySelector('#login-username').value;
        const p = container.querySelector('#login-password').value;

        const res = login(u, p);
        if (res.success) {
          if (onLoginSuccess) onLoginSuccess(res.user);
        } else {
          alert(res.message);
        }
      };
    }

    // Register Form Submit
    const regForm = container.querySelector('#auth-register-form');
    if (regForm) {
      regForm.onsubmit = (e) => {
        e.preventDefault();
        const userData = {
          fullName: container.querySelector('#reg-fullname').value.trim(),
          dni: container.querySelector('#reg-dni').value.trim(),
          phone: container.querySelector('#reg-phone').value.trim(),
          email: container.querySelector('#reg-email').value.trim(),
          role: container.querySelector('#reg-role').value,
          username: container.querySelector('#reg-username').value.trim(),
          password: container.querySelector('#reg-password').value
        };

        const res = registerUser(userData);
        if (res.success) {
          alert(`¡Cuenta registrada exitosamente!\nBienvenido, ${res.user.fullName}`);
          login(userData.username, userData.password);
          if (onLoginSuccess) onLoginSuccess(res.user);
        } else {
          alert(res.message);
        }
      };
    }

    // Demo Accounts click auto fill
    container.querySelectorAll('.demo-login-fill').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const u = link.getAttribute('data-u');
        const p = link.getAttribute('data-p');
        container.querySelector('#login-username').value = u;
        container.querySelector('#login-password').value = p;
      };
    });
  }

  render();
}
