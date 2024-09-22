export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (fecha: string) => {

  const dateObj = new Date(fecha).toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  return dateObj
}
