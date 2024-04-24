import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BookedServicesContext from '../../context/BookedServicesContext';
import SPPendingJobCard from '../../components/SPPendingJobCard';

const HomePage = () => {
    const { bookedServices, updateBookedServices } = useContext(BookedServicesContext);
    const [pendingJobs, setPendingJobs] = useState([]);
    const [confirmedJobs, setConfirmedJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [cancelledJobs, setCancelledJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('Pending');

    useEffect(() => {
        updateBookedServices();
    }, []);

    useEffect(() => {
        if (bookedServices) {
            const filterPendingJobs = bookedServices.filter(service => service.status === 'Pending');
            setPendingJobs(filterPendingJobs);
            const filterConfirmedJobs = bookedServices.filter(service => service.status === 'Confirmed');
            setConfirmedJobs(filterConfirmedJobs);
            const filterCompletedJobs = bookedServices.filter(service => service.status === 'Completed');
            setCompletedJobs(filterCompletedJobs);
            const filterCancelledJobs = bookedServices.filter(service => service.status === 'Cancelled');
            setCancelledJobs(filterCancelledJobs);
        }
    }, [bookedServices]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Pending':
                return <PendingComponent />;
            case 'Confirmed':
                return <ConfirmedComponent />;
            case 'Completed':
                return <CompletedComponent />;
            case 'Cancelled':
                return <CancelledComponent />;
            default:
                return null;
        }
    };

    const PendingComponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.contentText}>Pending Jobs</Text>
                {pendingJobs && pendingJobs.length > 0 ? (
                    pendingJobs.map((service, index) => (
                        <SPPendingJobCard key={index} service={service} task="pending" />
                    ))
                ) : (
                    <Text>No Pending Jobs</Text>
                )}
            </ScrollView>
        );
    };

    const ConfirmedComponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.contentText}>Confirmed Jobs</Text>
                {confirmedJobs && confirmedJobs.length > 0 ? (
                    confirmedJobs.map((service, index) => (
                        <SPPendingJobCard key={index} service={service} task="confirmed" />
                    ))
                ) : (
                    <Text>No Confirmed Jobs Found</Text>
                )}
            </ScrollView>
        );
    };
    const CompletedComponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.contentText}>Completed Jobs</Text>
                {completedJobs && completedJobs.length > 0 ? (
                    completedJobs.map((service, index) => (
                        <SPPendingJobCard key={index} service={service} task="completed" />
                    ))
                ) : (
                    <Text>No Completed Jobs Found</Text>
                )}
            </ScrollView>
        );
    }
    const CancelledComponent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.contentText}>Cancelled Jobs</Text>
                {cancelledJobs && cancelledJobs.length > 0 ? (
                    cancelledJobs.map((service, index) => (
                        <SPPendingJobCard key={index} service={service} task="cancelled" />
                    ))
                ) : (
                    <Text>No Cancelled Jobs Found</Text>
                )}
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'Pending' && styles.activeTabButton]}
                        onPress={() => setActiveTab('Pending')}
                    >
                        <Text style={styles.tabButtonText}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'Confirmed' && styles.activeTabButton]}
                        onPress={() => setActiveTab('Confirmed')}
                    >
                        <Text style={styles.tabButtonText}>Confirmed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'Completed' && styles.activeTabButton]}
                        onPress={() => setActiveTab('Completed')}
                    >
                        <Text style={styles.tabButtonText}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'Cancelled' && styles.activeTabButton]}
                        onPress={() => setActiveTab('Cancelled')}
                    >
                        <Text style={styles.tabButtonText}>Cancelled</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.contentContainer}>{renderContent()}</View>
        </View>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 20,
    },
    tabContainer: {
        flexDirection: 'row',
    },
    tabButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    activeTabButton: {
        backgroundColor: '#e0e0e0',
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingBottom: 100
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        marginVertical: 10
    },
});
