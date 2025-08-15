import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import styles from "./styles";
import moment from "moment";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Table1 from "./Components/Table1";
import Table2 from "./Components/Table2";
import PricingSummary from "./Components/PricingSummary";
import Watermark from "./Components/Watermark";

const ReceiptPDF = ({ props }) => {
    const {
        userDetails,
        currentDate,
        studentName,
        studentEmail,
        className,
        instructorName,
        transactionId,
        startDate,
        endDate,
        duration,
        price,
        paymentDate,
        invoiceId,
    } = props;

    const formatDate = (full, date) => {
        const shortFormat = "Do MMMM, YYYY";
        const longFormat = "ddd, DD MMM YYYY, hh:mm A";
        return moment(date).format(full ? longFormat : shortFormat);
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* WaterMark */}
                <Watermark />

                {/* Header */}
                <Header props={{ formatDate, currentDate, invoiceId }} />

                <Text style={styles.title}>INVOICE</Text>

                {/* Body */}
                <View style={{ flexGrow: 1 }}>
                    {/* Intro */}
                    <View style={styles.section}>
                        <Text>
                            Thank you for choosing{" "}
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                }}
                            >
                                Professional Mountain Biking Coaching Network
                            </Text>{" "}
                            for your mountain biking journey. You have
                            successfully enrolled in the following course:
                        </Text>
                    </View>
                    {/* Table 1 */}
                    <Table1
                        props={{
                            studentName,
                            studentEmail,
                            paymentDate,
                            formatDate,
                            userDetails,
                            transactionId,
                        }}
                    />
                    {/* Table 2 */}
                    <Table2
                        props={{
                            className,
                            instructorName,
                            startDate,
                            endDate,
                            formatDate,
                            duration,
                        }}
                    />

                    {/* Pricing summary and `Paid` stamp */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <PricingSummary price={price} />
                        <View style={{ marginTop: 30 }}>
                            <Image
                                style={{ width: 130 }}
                                src="/assets/paid-stamp.png"
                            />
                        </View>
                    </View>
                </View>
                {/* Footer */}
                <Footer />
            </Page>
        </Document>
    );
};

export default ReceiptPDF;
