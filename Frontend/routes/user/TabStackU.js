import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../app/Customer/HomeScreen';

import { Ionicons } from '@expo/vector-icons';
import UserProfileScreen from '../../app/Customer/UserProfileScreen';
import AllCategoryScreen from '../../app/Customer/AllCategoryScreen';
import CartScreen from '../../app/Customer/CartScreen';

const Tab = createBottomTabNavigator();

const TabStackU = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Category') {
                        iconName = focused ? 'apps' : 'apps-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
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
            <Tab.Screen name="Category" component={AllCategoryScreen} />
            <Tab.Screen name='Cart' component={CartScreen}
                options={
                    {
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#3B37FF",
                            elevation: 0,
                        },
                        headerTintColor: "#fff"
                    }} />
            <Tab.Screen name="Profile" component={UserProfileScreen}
                options={
                    {
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "#3B37FF",
                            elevation: 0,
                        },
                        headerTintColor: "#fff"
                    }} />
        </Tab.Navigator>
    );
};

export default TabStackU;