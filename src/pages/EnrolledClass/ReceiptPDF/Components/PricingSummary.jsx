import { Text, View } from "@react-pdf/renderer";
import styles from "../styles";

const PricingSummary = ({ price }) => {
    const { basePrice, taxAmount, total } = price;
    return (
        <View style={{ fontSize: 14, width: "50%" }}>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginVertical: 25,
                    textDecoration: "underline",
                }}
            >
                Invoice Summary
            </Text>
            <View
                style={{
                    fontFamily: "Courier",
                }}
            >
                <View style={styles?.summaryRow}>
                    <View>
                        <Text style={{ ...styles.bold, color: "#262626" }}>
                            Subtotal{" "}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles?.normal}>$ {basePrice}</Text>
                    </View>
                </View>

                <View style={styles?.summaryRow}>
                    <View>
                        <Text style={{ ...styles.bold, color: "#262626" }}>
                            Tax (10%){" "}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles?.normal}>$ {taxAmount}</Text>
                    </View>
                </View>

                <View
                    style={{
                        ...styles?.summaryRow,
                        borderTop: 1,
                        paddingTop: 5,
                        marginTop: 5,
                    }}
                >
                    <View>
                        <Text style={{ ...styles.bold, color: "#262626" }}>
                            Total Amount{" "}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles?.normal}>$ {total}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PricingSummary;
