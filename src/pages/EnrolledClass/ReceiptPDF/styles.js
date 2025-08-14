import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        display: "flex",
        flexDirection: "column",
        color: "#434343",
    },
    bold: { fontWeight: "bold" },
    normal: { fontWeight: "normal" },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: { width: 250, marginBottom: 10 },
    secondaryLogo: { width: 55 },
    divider: { borderBottomWidth: 1, marginVertical: 10, borderColor: "#ccc" },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        textDecoration: "underline",
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: "#333",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    tableHead: {
        fontWeight: "bold",
        fontSize: 12,
        textAlign: "center",
        color: "#262626",
    },
    tableRow: { flexDirection: "row" },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderColor: "#333",
        borderWidth: 1,
        padding: 5,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "50%"
    },
    section: { marginVertical: 6 },
    footer: { marginTop: "auto", textAlign: "center" },
});

export default styles;
