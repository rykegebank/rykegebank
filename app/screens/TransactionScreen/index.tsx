import AppBar from '../../components/GenericAppBar';
import { Strings } from '../../constants'

const TransactionScreen = () => {
    return (
        <>
            <AppBar
                title={Strings.transaction}
                showBackButton={false}
            />
        </>
    );
};

export default TransactionScreen;
