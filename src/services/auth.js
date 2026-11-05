// Servicio de Autenticación, Usuarios y Configuración de Sistema para Multiservicios JSR

const AUTH_KEYS = {
  USERS: 'jsr_users_v1',
  CURRENT_USER: 'jsr_current_user_v1',
  SETTINGS: 'jsr_settings_v1'
};

const INITIAL_USERS = [
  {
    id: 'USR-001',
    fullName: 'Anderson González',
    dni: '72819034',
    phone: '+51 987 654 321',
    email: 'andersongonzalez@multiserviciosjsr.com',
    role: 'ADMIN', // ADMIN, TECNICO, CLIENTE
    username: 'admin',
    password: 'admin123',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=Anderson'
  },
  {
    id: 'USR-002',
    fullName: 'Ing. Alexis Ruiz',
    dni: '45901238',
    phone: '+51 912 345 678',
    email: 'alexis.ruiz@multiserviciosjsr.com',
    role: 'TECNICO',
    username: 'tecnico',
    password: 'tecnico123',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=Alexis'
  }
];

const INITIAL_SETTINGS = {
  companyName: 'Multiservicios JSR',
  ruc: '20601234567',
  phone: '+51 987 654 321',
  address: 'Av. Central 450, Lima, Perú',
  email: 'contacto@multiserviciosjsr.com',
  baseDiagnosticFee: 80,
  defaultWarrantyDays: 90,
  preventiveMaintenanceMonths: 6,
  themeMode: 'cyber-dark'
};

export function initAuth() {
  if (!localStorage.getItem(AUTH_KEYS.USERS)) {
    localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(AUTH_KEYS.SETTINGS)) {
    localStorage.setItem(AUTH_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  }
  // Default: no auto login on fresh load so Login screen shows up first
}

export function getUsers() {
  initAuth();
  return JSON.parse(localStorage.getItem(AUTH_KEYS.USERS)) || [];
}

export function getCurrentUser() {
  initAuth();
  return JSON.parse(localStorage.getItem(AUTH_KEYS.CURRENT_USER)) || null;
}

export function login(username, password) {
  const users = getUsers();
  const found = users.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );

  if (found) {
    if (found.status === 'INACTIVE') {
      return { success: false, message: 'Su cuenta se encuentra desactivada por el Administrador.' };
    }
    localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(found));
    return { success: true, user: found };
  }

  return { success: false, message: 'Usuario o contraseña incorrectos.' };
}

export function registerUser(userData) {
  const users = getUsers();
  
  // Check username uniqueness
  const exists = users.find(u => u.username.toLowerCase() === userData.username.trim().toLowerCase());
  if (exists) {
    return { success: false, message: `El nombre de usuario "${userData.username}" ya está registrado.` };
  }

  const newUser = {
    id: `USR-${Date.now().toString().slice(-4)}`,
    fullName: userData.fullName || '',
    dni: userData.dni || '',
    phone: userData.phone || '',
    email: userData.email || '',
    role: userData.role || 'TECNICO',
    username: userData.username.trim(),
    password: userData.password,
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(userData.username)}`
  };

  users.push(newUser);
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));
  return { success: true, user: newUser };
}

export function logout() {
  localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
}

export function saveUser(userData) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userData.id);
  if (index >= 0) {
    users[index] = { ...users[index], ...userData };
  } else {
    users.push(userData);
  }
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));

  // If current logged-in user updated their own info, sync current user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userData.id) {
    localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(users[index >= 0 ? index : users.length - 1]));
  }
  return userData;
}

export function deleteUser(userId) {
  let users = getUsers();
  users = users.filter(u => u.id !== userId);
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));
}

// Settings Operations
export function getSettings() {
  initAuth();
  return JSON.parse(localStorage.getItem(AUTH_KEYS.SETTINGS)) || INITIAL_SETTINGS;
}

export function saveSettings(newSettings) {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  localStorage.setItem(AUTH_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
}
