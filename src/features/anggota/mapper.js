export function mapListAnggota(data) {
  return {
    id: data.id,
    member_id: data.attribute.member_id,
    name: data.name,
    email: data.email,
    is_active: data.attribute.is_active_member === true ? "Aktif" : "Non-Aktif",
    phone: data.phone,
    join_date: new Date(data.attribute.join_date).toLocaleDateString(),
  };
}
