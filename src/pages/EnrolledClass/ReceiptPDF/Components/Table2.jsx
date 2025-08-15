import { Text, View } from "@react-pdf/renderer";
import styles from "../styles";

const Table2 = ({ props }) => {
    const {
        className,
        instructorName,
        startDate,
        endDate,
        formatDate,
        duration,
    } = props;
    return (
        <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: "rgba(250, 250, 238, 0.6)" }]}>
                <View style={{ ...styles.tableCol, width: "100%" }}>
                    <Text style={styles.tableHead}>Course Details</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>Course Title</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.normal}>{className}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>Instructor</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.normal}>{instructorName}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>Start Date</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.normal}>
                        {formatDate(false, startDate)}
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>End Date</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.normal}>
                        {formatDate(false, endDate)}
                    </Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>Duration</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.normal}>{duration} days</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.bold}>Location</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.normal}>
                        Autoweg, 3911 TL Rhenen, Netherlands
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Table2;
