/**
 * Xử lý format tiền
 * CreatedBy: NHGiang - (30/12/2022)
 */
export const formatMoney = (money) => {
    try {
        if (!money) {
            return "0 VND";
        }
        money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "VND" }).format(
            money
        );
        return money;
    } catch (error) {
        return "";
    }
};
