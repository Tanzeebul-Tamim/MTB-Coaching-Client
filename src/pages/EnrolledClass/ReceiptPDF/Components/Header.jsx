import { Text, View, Image } from "@react-pdf/renderer";
import styles from "../styles";

const Header = ({ props }) => {
    const { formatDate, currentDate, invoiceId } = props;
    return (
        <>
            <View style={styles.headerRow}>
                <Image style={styles.logo} src="/assets/MTB_Coaching_PDF.png" />
                <View style={{ alignItems: "flex-end" }}>
                    <Image style={styles.secondaryLogo} src="/favicon.png" />
                    <Text style={{ fontSize: 10, marginTop: 3 }}>
                        Delivering exceptional services since 2006
                    </Text>
                </View>
            </View>

            <View
                style={{
                    ...styles.headerRow,
                    fontSize: 9,
                    marginTop: 10,
                    marginBottom: 5,
                }}
            >
                <View>
                    <Text style={{ ...styles.bold, color: "#262626" }}>
                        Generated At:{" "}
                        <Text style={styles.normal}>
                            {formatDate(true, currentDate)}
                        </Text>
                    </Text>
                </View>

                <View>
                    <Text style={{ ...styles.bold, color: "#262626" }}>
                        Invoice No:{" "}
                        <Text style={styles.normal}>{invoiceId}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />
        </>
    );
};

export default Header;
