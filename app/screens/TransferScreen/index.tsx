import AppBar from '../../components/GenericAppBar';
import { Strings } from '../../constants'

const TransferScreen = () => {
    return (
        <>
            <AppBar
                title={Strings.transfer}
                showBackButton={false}
            />

        </>
    );
};

export default TransferScreen;
