// Punto de entrada principal de la aplicación Multiservicios JSR

import { renderNavbar } from './components/Navbar.js';
import { renderLoginView } from './components/LoginView.js';
import { renderDashboardModule } from './modules/DashboardModule.js';
import { renderReceptionModule } from './modules/ReceptionModule.js';
import { renderWorkshopModule } from './modules/WorkshopModule.js';
import { renderClientPortalModule } from './modules/ClientPortalModule.js';
import { renderWarrantyModule } from './modules/WarrantyModule.js';
import { renderInventoryModule } from './modules/InventoryModule.js';
import { renderReportsModule } from './modules/ReportsModule.js';
import { renderUserManagementModule } from './modules/UserManagementModule.js';
import { renderSettingsModule } from './modules/SettingsModule.js';
import { initStorage } from './services/storage.js';
import { initAuth, getCurrentUser } from './services/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mock storage & authentication databases with default seed data
  initStorage();
  initAuth();

  const app = document.getElementById('app');
  let currentModule = 'dashboard';

  // Check URL hash for direct links (e.g. #tracking?ticket=JSR-3099)
  const hash = window.location.hash;
  if (hash.includes('dashboard')) currentModule = 'dashboard';
  else if (hash.includes('reception')) currentModule = 'reception';
  else if (hash.includes('workshop')) currentModule = 'workshop';
  else if (hash.includes('tracking')) currentModule = 'tracking';
  else if (hash.includes('warranties')) currentModule = 'warranties';
  else if (hash.includes('inventory')) currentModule = 'inventory';
  else if (hash.includes('reports')) currentModule = 'reports';
  else if (hash.includes('users')) currentModule = 'users';
  else if (hash.includes('settings')) currentModule = 'settings';

  function renderApp() {
    const user = getCurrentUser();

    // If user is not logged in, show Login & Registration screen
    if (!user) {
      app.innerHTML = '';
      renderLoginView(app, () => {
        renderApp();
      });
      return;
    }

    app.innerHTML = '';

    // Render sticky navbar with Profile Dropdown & Notifications 🔔
    const navbarElem = renderNavbar(
      currentModule,
      (selectedModule) => {
        currentModule = selectedModule;
        window.location.hash = selectedModule;
        renderApp();
      },
      () => {
        // Logout callback
        renderApp();
      }
    );
    app.appendChild(navbarElem);

    // Create main content container
    const mainContainer = document.createElement('main');
    mainContainer.className = 'main-content';
    app.appendChild(mainContainer);

    // Render active module
    switch (currentModule) {
      case 'dashboard':
        renderDashboardModule(mainContainer, (targetModule) => {
          currentModule = targetModule;
          window.location.hash = targetModule;
          renderApp();
        });
        break;
      case 'reception':
        renderReceptionModule(mainContainer);
        break;
      case 'workshop':
        renderWorkshopModule(mainContainer);
        break;
      case 'tracking':
        renderClientPortalModule(mainContainer);
        break;
      case 'warranties':
        renderWarrantyModule(mainContainer);
        break;
      case 'inventory':
        renderInventoryModule(mainContainer);
        break;
      case 'reports':
        renderReportsModule(mainContainer);
        break;
      case 'users':
        renderUserManagementModule(mainContainer);
        break;
      case 'settings':
        renderSettingsModule(mainContainer);
        break;
      default:
        renderDashboardModule(mainContainer, (targetModule) => {
          currentModule = targetModule;
          window.location.hash = targetModule;
          renderApp();
        });
    }
  }

  // Handle hash changes (back/forward browser buttons)
  window.addEventListener('hashchange', () => {
    const h = window.location.hash;
    if (h.includes('dashboard')) currentModule = 'dashboard';
    else if (h.includes('reception')) currentModule = 'reception';
    else if (h.includes('workshop')) currentModule = 'workshop';
    else if (h.includes('tracking')) currentModule = 'tracking';
    else if (h.includes('warranties')) currentModule = 'warranties';
    else if (h.includes('inventory')) currentModule = 'inventory';
    else if (h.includes('reports')) currentModule = 'reports';
    else if (h.includes('users')) currentModule = 'users';
    else if (h.includes('settings')) currentModule = 'settings';
    renderApp();
  });

  renderApp();
});
