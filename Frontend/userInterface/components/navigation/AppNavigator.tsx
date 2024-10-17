import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "@/screens/Login";
import SupervisorHomePage from "@/screens/SupervisorHomePage";
import SupervisorUserPage from "@/screens/SupervisorUserPage";
import {RootStackParamList} from "@/components/navigation/NavigationTypes";
import CreateAccount from "@/screens/CreateAccount";
import SupervisorEditUser from "@/screens/SupervisorEditUser";
import SupervisorCreate from "@/screens/SupervisorCreate";
import RiderDashboard from "@/screens/RiderDashboard";
import UserEditInfo from "@/screens/UserEditInfo";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SupervisorHome" component={SupervisorHomePage} />
        <Stack.Screen name="SupervisorUser" component={SupervisorUserPage} />
        <Stack.Screen name="SupervisorEdit" component={SupervisorEditUser} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="SupervisorCreate" component={SupervisorCreate} />
        <Stack.Screen name="RiderDashboard" component={RiderDashboard} />
        <Stack.Screen name="UserEditInfo" component={UserEditInfo} />
    </Stack.Navigator>
    );
};
