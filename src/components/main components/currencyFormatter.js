const currencyFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
});

export default currencyFormatter;