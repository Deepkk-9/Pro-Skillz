import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Badges from '../../components/Badges';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ServicceProviderProfileScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.top}>
                    <Image style={styles.serviceImg} source={require("../../assets/profileSP.png")} alt='service img' />

                    <View style={styles.pfpName}>
                        <View style={styles.pfp}>
                            <Image style={{ width: 100, height: 100 }} source={require("../../assets/prouser.png")} alt='user img' />
                        </View>

                        <View style={{ marginTop: 15, marginLeft: 10 }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                                Ninad Gaonkar
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                Plumbing professional
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.middle}>
                    <Ionicons name="location" size={20} color={"#eb3325"} />
                    <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>
                        Sahaji Raje Marg Vile Parle East
                    </Text>
                    <Text>
                        . 1.2km
                    </Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badges}>
                    <Badges txt={"4.9 Ratings"} icon={"star"} color={"#FFD700"} />
                    <Badges txt={"Verified"} icon={"shield-checkmark"} color={"#00A0FF"} />
                    <Badges txt={"2hrs Available"} icon={"time"} color={"#40A830"} />
                </ScrollView>


                <View style={styles.bottom}>
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>
                        About:
                    </Text>

                    <Text>
                        Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
                        {"\n"}
                        Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
                    </Text>
                </View>
            </ScrollView>
        </View >
    )
}

export default ServicceProviderProfileScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        padding: 16
    },
    top: {
        position: "relative",
        marginBottom: "20%"
    },
    middle: {
        flexDirection: "row",
        marginVertical: 5
    },
    serviceImg: {
        height: 200,
        width: "100%"
    },
    badges: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 5
    },
    pfpName: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: "-37%"
    },
    pfp: {
        padding: 4,
        borderRadius: 100,
        backgroundColor: "#fff"
    },
    bottom: {
        marginVertical: 5
    }
})