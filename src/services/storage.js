// Servicio de Almacenamiento y Base de Datos Simulada para Multiservicios JSR

const STORAGE_KEYS = {
  ORDERS: 'jsr_service_orders_v1',
  INVENTORY: 'jsr_inventory_v1',
  CUSTOMERS: 'jsr_customers_v1',
  NOTIFICATIONS: 'jsr_notifications_v1'
};

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'stock', title: 'Repuesto SSD bajo stock', message: 'Pantalla LED 15.6" con 3 unidades en almacén.', timeAgo: 'Hace 20 min', isRead: false, icon: '📙' },
  { id: 2, type: 'order', title: 'Nueva Orden JSR-1024 asignada', message: 'Laptop Asus TUF A15 asignada a Ing. Alexis Ruiz.', timeAgo: 'Hace 13 min', isRead: false, icon: '🔴' },
  { id: 3, type: 'status', title: 'Orden JSR-2058 en Reparación', message: 'Lenovo ThinkPad E14 en taller de cambio de Fan.', timeAgo: 'Hace 10 min', isRead: false, icon: '🟠' },
  { id: 4, type: 'ready', title: 'Orden JSR-3099 Lista para Recojo', message: 'Dell XPS 13 finalizada para entrega a Juan Pérez.', timeAgo: 'Hace 5 min', isRead: false, icon: '🟢' }
];

const INITIAL_INVENTORY = [
  { id: 'PART-001', name: 'Memoria RAM Kingston DDR4 16GB 3200MHz', category: 'RAM', stock: 8, cost: 120, price: 180, code: 'RAM-DDR4-16' },
  { id: 'PART-002', name: 'Disco SSD M.2 NVMe 1TB Kingston NV2', category: 'Almacenamiento', stock: 12, cost: 190, price: 280, code: 'SSD-NVME-1TB' },
  { id: 'PART-003', name: 'Fan / Cooler Térmico Asus TUF/ROG', category: 'Refrigeración', stock: 5, cost: 45, price: 95, code: 'COOL-ASUS-01' },
  { id: 'PART-004', name: 'Batería Interna Dell 56Wh 3 celdas', category: 'Energía', stock: 4, cost: 140, price: 230, code: 'BAT-DELL-56' },
  { id: 'PART-005', name: 'Pasta Térmica Arctic MX-4 High Performance', category: 'Mantenimiento', stock: 18, cost: 20, price: 45, code: 'PASTE-MX4' },
  { id: 'PART-006', name: 'Pantalla LED 15.6" FHD 144Hz 30 Pines', category: 'Pantallas', stock: 3, cost: 280, price: 420, code: 'SCR-156-144' },
  { id: 'PART-007', name: 'Teclado Retroiluminado Lenovo Legion RGB', category: 'Teclados', stock: 6, cost: 85, price: 150, code: 'KBD-LENOVO-RGB' }
];

const INITIAL_ORDERS = [
  {
    id: 'JSR-1024',
    customerName: 'Carlos Mendoza',
    customerPhone: '+51 987 654 321',
    customerDni: '72819034',
    deviceModel: 'Laptop Asus TUF Gaming A15',
    deviceSerial: 'SN-ASUS-99182',
    status: 'DIAGNOSTICO', // DIAGNOSTICO (Rojo), REPARACION (Naranja), LISTO (Verde)
    technician: 'Ing. Alexis Ruiz',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    faults3D: [
      { id: 1, part: 'Pantalla / Tapa Superior', note: 'Raya profunda en tapa y parpadeo de imagen', x: -0.4, y: 0.8, z: -0.2 },
      { id: 2, part: 'Puerto USB Lateral', note: 'Pin sulfatado, no reconoce dispositivos', x: 1.1, y: -0.1, z: 0.3 }
    ],
    usedParts: [],
    estimatedCost: 220,
    warrantyDays: 60
  },
  {
    id: 'JSR-2058',
    customerName: 'María Torres',
    customerPhone: '+51 912 345 678',
    customerDni: '45901238',
    deviceModel: 'Lenovo ThinkPad E14 Gen 2',
    deviceSerial: 'SN-LNV-44019',
    status: 'REPARACION',
    technician: 'Téc. Fernando Silva',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    faults3D: [
      { id: 1, part: 'Módulo de Ventilador', note: 'Zumbido metálico y alta temperatura (92°C)', x: 0.2, y: 0.1, z: 0.1 }
    ],
    usedParts: [
      { partId: 'PART-003', name: 'Fan / Cooler Térmico Asus TUF/ROG', qty: 1, price: 95 },
      { partId: 'PART-005', name: 'Pasta Térmica Arctic MX-4 High Performance', qty: 1, price: 45 }
    ],
    estimatedCost: 140,
    warrantyDays: 90
  },
  {
    id: 'JSR-3099',
    customerName: 'Juan Pérez',
    customerPhone: '+51 955 112 233',
    customerDni: '10923847',
    deviceModel: 'Dell XPS 13 9310',
    deviceSerial: 'SN-DELL-88210',
    status: 'LISTO',
    technician: 'Ing. Alexis Ruiz',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    faults3D: [
      { id: 1, part: 'Teclado y Batería', note: 'Batería inflada y tecla Espacio trabada', x: 0.0, y: -0.1, z: 0.2 }
    ],
    usedParts: [
      { partId: 'PART-004', name: 'Batería Interna Dell 56Wh 3 celdas', qty: 1, price: 230 }
    ],
    estimatedCost: 280,
    warrantyDays: 90,
    nextMaintenanceDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Initialize Storage
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  }
}

// Orders Operations
export function getOrders() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
}

export function getOrderById(ticketId) {
  const orders = getOrders();
  return orders.find(o => o.id.toUpperCase() === ticketId.toUpperCase()) || null;
}

export function saveOrder(orderData) {
  const orders = getOrders();
  const existingIndex = orders.findIndex(o => o.id === orderData.id);
  
  if (existingIndex >= 0) {
    orders[existingIndex] = { ...orders[existingIndex], ...orderData };
  } else {
    orders.unshift(orderData);
  }
  
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return orderData;
}

export function updateOrderStatus(ticketId, newStatus) {
  const orders = getOrders();
  const order = orders.find(o => o.id === ticketId);
  if (order) {
    order.status = newStatus;
    if (newStatus === 'LISTO' && !order.deliveredAt) {
      order.deliveredAt = new Date().toISOString();
      // Set 6-month thermal maintenance date
      const maintDate = new Date();
      maintDate.setMonth(maintDate.getMonth() + 6);
      order.nextMaintenanceDate = maintDate.toISOString();
    }
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }
  return order;
}

// Inventory Operations
export function getInventory() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY)) || [];
}

export function deductInventoryStock(partId, qty = 1) {
  const inventory = getInventory();
  const item = inventory.find(i => i.id === partId);
  if (item && item.stock >= qty) {
    item.stock -= qty;
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    return { success: true, updatedItem: item };
  }
  return { success: false, message: 'Stock insuficiente' };
}

export function saveInventoryItem(itemData) {
  const inventory = getInventory();
  const index = inventory.findIndex(i => i.id === itemData.id);
  if (index >= 0) {
    inventory[index] = itemData;
  } else {
    inventory.push(itemData);
  }
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  return itemData;
}

// Notifications Operations
export function getNotifications() {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || INITIAL_NOTIFICATIONS;
}

export function markNotificationsRead() {
  const notifs = getNotifications();
  notifs.forEach(n => n.isRead = true);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  return notifs;
}

export function addNotification(notif) {
  const notifs = getNotifications();
  notifs.unshift({
    id: Date.now(),
    isRead: false,
    timeAgo: 'Hace un momento',
    ...notif
  });
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  return notifs;
}
