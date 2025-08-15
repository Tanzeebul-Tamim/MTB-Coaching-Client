import { Text, View, Link } from "@react-pdf/renderer";
import styles from "../styles";

const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.divider} />
            <View>
                <Text
                    style={{
                        ...styles.bold,
                        fontSize: 13,
                        color: "#262626",
                        marginBottom: 5,
                    }}
                >
                    Team MTB Club
                </Text>
                <View>
                    <Text style={styles.bold}>
                        Our Website:{" "}
                        <Link
                            style={styles.normal}
                            src="https://mtbcoachingnetwork.vercel.app"
                        >
                            https://mtbcoachingnetwork.vercel.app
                        </Link>
                    </Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Text style={styles.bold}>
                        Address:{" "}
                        <Text style={styles.normal}>
                            Autoweg, 3911 TL Rhenen, Netherlands
                        </Text>
                    </Text>
                </View>
                <View>
                    <Text style={styles.bold}>
                        Phone: <Text style={styles.normal}>+31644460635 </Text>
                        <Text style={styles.bold}>
                            | Email:{" "}
                            <Link
                                style={{ ...styles.normal, color: "#434343" }}
                                src="mailto:tanzeebul.tamim2003@gmail.com"
                            >
                                info@mtb-club.com
                            </Link>
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Footer;
