import AppBar from '../../components/GenericAppBar';
import { Strings, Routes } from '../../constants';
import { useNavigation, useNavigationState } from "@react-navigation/native";

const TransactionHistory = () => {
    const navigation = useNavigation();

    // Extract previous route at the top level (valid hook usage)
    const previousRoute = useNavigationState((state) => {
        const history = state.routes;
        return history.length > 1 ? history[history.length - 1].name : "";
    });

    const handleBackPress = () => {
        // if (previousRoute && previousRoute.includes("transfer")) {
        //     navigation.navigate(Routes.transfer);
        // } else if (previousRoute === Routes.notificationList) {
        //     navigation.navigate(Routes.home);
        // } else {
        //     navigation.goBack();
        // }
        console.log('previousRoute', previousRoute)
        navigation.navigate(Routes.transfer);
    }
        ;

    return (
        <>
            <AppBar
                title={Strings.transfer}
                showBackButton={true}
                onBackPress={handleBackPress} // Pass function reference
            />
        </>
    );
};

export default TransactionHistory;
