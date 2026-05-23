export const selectStyles = {
    control: (provided: any) => ({
        ...provided,
        width: "300px",
        fontSize: "20px",
        borderRadius: "8px",
        border: "none",
        padding: "8px 16px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
        "&:hover": {
            border: "none",
            boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow .3s ease",
        },
    }),

    menu: (provided: any) => ({
        ...provided,
        width: "350px",
        transition: "box-shadow .3s ease"
    }),

    option: (provided: any, state: any) => ({
        ...provided,
        maxWidth: "350px",
        fontFamily: "Inter",
        backgroundColor: state.isSelected ? "var(--accent-color-lite)" : state.isFocused ? "var(--accent-color-lite)" : "white",
        color: state.isSelected ? "white" : "black",
        padding: "8px 16px",
        fontSize: "18px",
    }),

    singleValue: (provided: any) => ({
        ...provided,
        color: "#000",
    }),
}