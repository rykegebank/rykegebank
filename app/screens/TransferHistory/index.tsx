import AppBar from '../../components/GenericAppBar';
import { Strings } from '../../constants'

const TransactionHistory = () => {
    return (
        <>
            <AppBar
                title={Strings.transfer}
                showBackButton={true}
            />

        </>
    );
};

export default TransactionHistory;
