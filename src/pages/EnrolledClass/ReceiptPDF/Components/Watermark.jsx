import { View, Text } from "@react-pdf/renderer";

const Watermark = () => (
    <View
        style={{
            position: "absolute",
            top: "40%",
            transform: "translate(-20%) rotate(-30deg)", // Diagonal
            opacity: 0.1, // Very light
            zIndex: -1,
        }}
    >
        <Text style={{ fontSize: 70, fontWeight: "bold", color: "#000" }}>
            TEAM MTB CLUB
        </Text>
    </View>
);

export default Watermark;
