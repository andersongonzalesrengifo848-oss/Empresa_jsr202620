// Generador de Comprobantes PDF con Captura 3D y Código QR para Multiservicios JSR

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { formatCurrency, formatDate } from '../services/utils.js';

export async function generateTicketPDF(orderData, snapshot3DDataUrl = null) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = '#00e5ff';
  const darkColor = '#0b0f19';

  // 1. Header Banner
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(0, 229, 255);
  doc.text('MULTISERVICIOS JSR', 14, 16);

  doc.setFontSize(9);
  doc.setTextColor(180, 190, 210);
  doc.text('Servicio Técnico Especializado - Laptops, PCs & Mantenimiento 3D', 14, 23);
  doc.text('RUC: 20601234567 | Tel: +51 987 654 321 | Av. Central 450, Lima', 14, 28);

  // Ticket Badge Box
  doc.setFillColor(0, 229, 255);
  doc.rect(145, 8, 52, 18, 'F');
  doc.setFontSize(10);
  doc.setTextColor(4, 9, 20);
  doc.text('TICKET DE RECEPCION', 145, 14);
  doc.setFontSize(14);
  doc.text(orderData.id || 'JSR-0000', 154, 21);

  // 2. Customer & Device Info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 15, 25);
  doc.text('1. DATOS DEL CLIENTE Y EQUIPO', 14, 42);

  doc.setLineWidth(0.4);
  doc.setDrawColor(200, 210, 225);
  doc.rect(14, 45, 182, 32);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 60, 75);

  doc.text(`Cliente: ${orderData.customerName || '-'}`, 18, 52);
  doc.text(`DNI / RUC: ${orderData.customerDni || '-'}`, 18, 58);
  doc.text(`Telefono: ${orderData.customerPhone || '-'}`, 18, 64);
  doc.text(`Fecha Ingreso: ${formatDate(orderData.createdAt)}`, 18, 70);

  doc.text(`Equipo: ${orderData.deviceModel || '-'}`, 105, 52);
  doc.text(`N° Serie: ${orderData.deviceSerial || '-'}`, 105, 58);
  doc.text(`Tecnico Asignado: ${orderData.technician || 'Por Asignar'}`, 105, 64);
  doc.text(`Costo Est. Diagnostico: ${formatCurrency(orderData.estimatedCost || 0)}`, 105, 70);

  // 3. 3D Inspection Section & Snapshot
  let currentY = 86;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 15, 25);
  doc.text('2. INSPECCION 3D Y MAPEO DE FALLAS', 14, currentY);

  currentY += 4;
  // Box for 3D layout
  doc.rect(14, currentY, 182, 75);

  if (snapshot3DDataUrl) {
    try {
      doc.addImage(snapshot3DDataUrl, 'PNG', 16, currentY + 2, 95, 70);
    } catch (err) {
      console.warn('Could not add 3D snapshot to PDF', err);
    }
  } else {
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('[ Modelo 3D Registrado ]', 40, currentY + 35);
  }

  // List of initial 3D Fault Pins on the right
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 30, 70);
  doc.text('Puntos Criticos Detectados:', 115, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 60, 75);

  const faults = orderData.faults3D || [];
  if (faults.length === 0) {
    doc.text('• Ninguna falla visual externa.', 115, currentY + 16);
  } else {
    faults.forEach((f, idx) => {
      const fy = currentY + 16 + (idx * 11);
      if (fy < currentY + 70) {
        doc.setFont('helvetica', 'bold');
        doc.text(`[Pin #${idx + 1}] ${f.part}:`, 115, fy);
        doc.setFont('helvetica', 'normal');
        doc.text(`- ${f.note}`, 118, fy + 5);
      }
    });
  }

  currentY += 83;

  // 4. QR Code & Tracking Instructions
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 15, 25);
  doc.text('3. RASTREO EN TIEMPO REAL VIA QR', 14, currentY);

  currentY += 4;
  doc.rect(14, currentY, 182, 38);

  // Generate QR Data URL
  try {
    const trackingUrl = `${window.location.origin}#tracking?ticket=${orderData.id}`;
    const qrDataUrl = await QRCode.toDataURL(trackingUrl, { margin: 1, width: 120 });
    doc.addImage(qrDataUrl, 'PNG', 18, currentY + 3, 32, 32);
  } catch (e) {
    console.error('Error generating QR', e);
  }

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 150, 180);
  doc.text('Consulte el estado visual 3D de su laptop desde su celular:', 55, currentY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 70, 85);
  doc.text('1. Escanee el código QR con la cámara de su smartphone.', 55, currentY + 16);
  doc.text(`2. O ingrese a la web e introduzca su N° Ticket: ${orderData.id}`, 55, currentY + 22);
  doc.text('3. Visualice los avances y confirmación de listo para recoger.', 55, currentY + 28);

  currentY += 44;

  // 5. Signatures & Terms
  doc.setFontSize(8);
  doc.setTextColor(120, 130, 140);
  doc.text('Términos: Los equipos no retirados pasados los 60 días quedan sujetos a disposición del taller. Garantía cubre mano de obra y repuestos especificados.', 14, currentY);

  currentY += 20;
  doc.line(25, currentY, 85, currentY);
  doc.line(125, currentY, 185, currentY);

  doc.setFontSize(9);
  doc.setTextColor(50, 60, 75);
  doc.text('Firma Cliente / DNI', 40, currentY + 5);
  doc.text('Firma Recepción JSR', 142, currentY + 5);

  // Save / Download PDF
  doc.save(`Ticket_Multiservicios_JSR_${orderData.id}.pdf`);
  return true;
}
