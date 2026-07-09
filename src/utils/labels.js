export function getRecordStatusLabel(status) {
  const labels = {
    ACTIVE: "Aktif",
    INACTIVE: "Tidak Aktif",
  };

  return labels[status] || status || "-";
}

export function getInstallmentStatusLabel(status) {
  const labels = {
    PAID: "Lunas",
    PENDING: "Menunggu Pembayaran",
    OVERDUE: "Jatuh Tempo",
    CANCELLED: "Dibatalkan",
  };

  return labels[status] || status || "-";
}

export function getSavingTransactionTypeLabel(typeID) {
  const labels = {
    1: "Setoran",
    2: "Penarikan",
  };

  return labels[typeID] || "-";
}

export function getRoleLabel(roleID) {
  const labels = {
    0: "Super Admin",
    1: "Owner",
    2: "Admin",
    3: "Anggota",
  };

  return labels[roleID] || "-";
}

export function getUserStatusLabel(statusID) {
  const labels = {
    1: "Baru",
    2: "Terverifikasi",
  };

  return labels[statusID] || "-";
}
