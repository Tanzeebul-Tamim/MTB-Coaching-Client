import { Text, View } from "@react-pdf/renderer";
import styles from "../styles";

const Table1 = ({ props }) => {
    const {studentName, studentEmail, paymentDate, formatDate, userDetails, transactionId} = props;

    return (
        <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: "rgba(250, 250, 238, 0.6)" }]}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableHead}>
                        Billing Details (Recipient)
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableHead}>Payment Details</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Name: <Text style={styles.normal}>{studentName}</Text>
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Status: <Text style={styles.normal}>Paid</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Email: <Text style={styles.normal}>{studentEmail}</Text>
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Date of Payment:{" "}
                        <Text style={styles.normal}>
                            {formatDate(false, paymentDate)}
                        </Text>
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Contact No:{" "}
                        <Text style={styles.normal}>
                            +{userDetails?.contactNo}
                        </Text>
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Txn ID:{" "}
                        <Text style={styles.normal}>{transactionId}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Address:{" "}
                        <Text style={styles.normal}>
                            {userDetails?.address}
                        </Text>
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>
                        Payment Method:{" "}
                        <Text style={styles.normal}>Credit Card</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Table1;
