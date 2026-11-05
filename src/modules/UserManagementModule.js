// Módulo: Registro & Administración de Todos los Usuarios (Multiservicios JSR)

import { getUsers, saveUser, deleteUser, registerUser, getCurrentUser } from '../services/auth.js';
import { formatDate } from '../services/utils.js';

export function renderUserManagementModule(container) {
  function render() {
    const users = getUsers();
    const currentUser = getCurrentUser();

    container.innerHTML = `
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
            Directorio de Usuarios Registrados (${users.length})
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
                ${users.map(u => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <img src="${u.avatarUrl}" style="width: 30px; height: 30px; border-radius: 50%; background: var(--accent-cyan);">
                        <strong style="color: var(--accent-cyan);">${u.username}</strong>
                      </div>
                    </td>
                    <td><strong style="color: white; font-size: 0.9rem;">${u.fullName}</strong></td>
                    <td><span style="font-family: monospace; color: var(--text-muted);">${u.dni || '-'}</span></td>
                    <td><span style="color: var(--text-muted); font-size: 0.85rem;">${u.phone || '-'}</span></td>
                    <td><span style="color: var(--text-muted); font-size: 0.85rem;">${u.email || '-'}</span></td>
                    <td>
                      <span class="badge ${u.role === 'ADMIN' ? 'badge-cyan' : u.role === 'TECNICO' ? 'badge-green' : 'badge-amber'}">
                        ${u.role}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm toggle-status-btn ${u.status === 'ACTIVE' ? 'btn-success' : 'btn-secondary'}" data-id="${u.id}" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">
                        ${u.status === 'ACTIVE' ? '🟢 ACTIVO' : '🔴 INACTIVO'}
                      </button>
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm delete-user-btn" data-id="${u.id}" data-name="${u.fullName}" data-user="${u.username}" style="padding: 0.25rem 0.6rem; font-size: 0.8rem;">
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                `).join('')}
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
    `;

    // Modal handlers
    const modal = container.querySelector('#create-user-modal');
    const openModalBtn = container.querySelector('#btn-add-user-modal');
    const closeModalBtn = container.querySelector('#btn-cancel-user-modal');

    if (openModalBtn && modal) {
      openModalBtn.onclick = () => { modal.style.display = 'flex'; };
      closeModalBtn.onclick = () => { modal.style.display = 'none'; };
    }

    const createUserForm = container.querySelector('#create-user-form');
    if (createUserForm) {
      createUserForm.onsubmit = (e) => {
        e.preventDefault();
        const userData = {
          fullName: container.querySelector('#new-u-fullname').value.trim(),
          dni: container.querySelector('#new-u-dni').value.trim(),
          phone: container.querySelector('#new-u-phone').value.trim(),
          email: container.querySelector('#new-u-email').value.trim(),
          role: container.querySelector('#new-u-role').value,
          username: container.querySelector('#new-u-username').value.trim(),
          password: container.querySelector('#new-u-password').value
        };

        const res = registerUser(userData);
        if (res.success) {
          alert(`¡Usuario ${userData.username} creado exitosamente!`);
          modal.style.display = 'none';
          render();
        } else {
          alert(res.message);
        }
      };
    }

    // Toggle Status
    container.querySelectorAll('.toggle-status-btn').forEach(btn => {
      btn.onclick = () => {
        const userId = btn.getAttribute('data-id');
        const user = users.find(u => u.id === userId);
        if (user) {
          user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          saveUser(user);
          render();
        }
      };
    });

    // Delete user handler with self-protection and clear confirmation
    container.querySelectorAll('.delete-user-btn').forEach(btn => {
      btn.onclick = () => {
        const userId = btn.getAttribute('data-id');
        const userName = btn.getAttribute('data-name');
        const userAccount = btn.getAttribute('data-user');

        if (currentUser && currentUser.id === userId) {
          alert('⚠️ No puedes eliminar tu propia cuenta mientras tienes la sesión activa.');
          return;
        }

        if (confirm(`¿Está seguro de eliminar permanentemente a la cuenta de usuario "${userAccount}" (${userName})?`)) {
          deleteUser(userId);
          alert(`¡La cuenta del usuario "${userAccount}" ha sido eliminada del sistema!`);
          render();
        }
      };
    });
  }

  render();
}
