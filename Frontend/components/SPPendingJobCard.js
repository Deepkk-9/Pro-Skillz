import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { API_HOST } from '@env';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookedServicesContext from '../context/BookedServicesContext';

const SPPendingJobCard = ({ service, task }) => {
    const { updateBookedServices } = useContext(BookedServicesContext);
    const [getServiceInfo, setGetServiceInfo] = useState(null);
    const [confirming, setConfirming] = useState(false);
    const [rejecting, setRejecting] = useState(false);

    useEffect(() => {
        const fetchServiceInfo = async () => {
            try {
                const response = await fetch(`${API_HOST}/api/service/${service.service}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const getService = await response.json();
                setGetServiceInfo(getService);
            } catch (err) {
                console.log('Error fetching service info:', err.message);
            }
        };

        fetchServiceInfo();
    }, [service.service]);

    const handleConfirm = async () => {
        setConfirming(true);
    };

    const handleReject = async () => {
        setRejecting(true);
    };

    const confirmAction = async () => {
        const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedServiceProvider"));

        try {
            const response = await fetch(`${API_HOST}/api/bookedService/${service._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG}`
                },
                body: JSON.stringify({
                    "status": "Confirmed"
                })
            });

            const updateService = await response.json();

            console.log("updated service", updateService);

            if (updateService) {
                updateBookedServices();
                showNotification('Service Confirmed');
            }
        } catch (err) {
            console.log('Error updating service info:', err.message);
        }

        setConfirming(false);
    };

    const rejectAction = async () => {
        const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedServiceProvider"));

        try {
            const response = await fetch(`${API_HOST}/api/bookedService/${service._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG}`
                },
                body: JSON.stringify({
                    "status": "Cancelled"
                })
            });

            const updateService = await response.json();

            if (updateService) {
                updateBookedServices();
                showNotification('Service Rejected');
            }
        } catch (err) {
            console.log('Error updating service info:', err.message);
        }

        setRejecting(false);
    };

    const showNotification = (message) => {
        Alert.alert('Notification', message);
    };

    if (!getServiceInfo) {
        return null;
    }

    const { name, description, image } = getServiceInfo;

    return (
        <View style={styles.card}>
            <Image style={styles.servImg} resizeMode="contain" source={{ uri: `data:${image.contentType};base64,${image.data}` }} alt="service img" />
            <View style={styles.content}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description} numberOfLines={1}>{description}</Text>
                <View style={styles.dateTimeContainer}>
                    {service.deliveryDates.map((item, index) => {
                        const date = new Date(item);
                        const formattedDate = new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        }).format(date);
                        const formattedTime = new Intl.DateTimeFormat('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        }).format(date);

                        return (
                            <View key={index} style={styles.dateTime}>
                                <Ionicons name="calendar-outline" size={18} color="#333" />
                                <Text style={styles.dateText}>{formattedDate}</Text>
                                <Ionicons name="time-outline" size={18} color="#333" style={{ marginLeft: 5 }} />
                                <Text style={styles.timeText}>{formattedTime}</Text>
                            </View>
                        );
                    })}
                </View>

                {
                    task === "pending" ?
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
                                <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                        </View> :
                        <></>
                }
            </View>

            {confirming && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to confirm this service?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={confirmAction}>
                                <Text style={styles.modalButtonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setConfirming(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {rejecting && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to reject this service?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.rejectButton]} onPress={rejectAction}>
                                <Text style={styles.modalButtonText}>Reject</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setRejecting(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

        </View>
    );
};

export default SPPendingJobCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#ccc"
    },
    servImg: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    content: {
        width: "65%",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    dateTimeContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    dateTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    dateText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#333',
    },
    timeText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#F44336',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
});
