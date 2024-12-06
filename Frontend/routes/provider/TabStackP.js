import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../app/Provider/HomeScreen';
import UserProfileScreen from '../../app/Provider/UserProfileScreen';
import Duejobs from '../../app/Provider/Duejobs';

const Tab = createBottomTabNavigator();

const TabStackP = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color="#3B37FF" />;
                },
                tabBarStyle: {
                    position: 'absolute',
                    height: 60,
                    marginBottom: 20,
                    marginHorizontal: 18,
                    borderRadius: 18
                },
                tabBarShowLabel: false


            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={UserProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabStackP;