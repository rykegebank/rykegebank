import AppBar from '../../components/GenericAppBar';
import { Strings } from '../../constants'

const WireTransfer = () => {
    return (
        <>
            <AppBar
                title={Strings.transfer}
                showBackButton={true}
            />

        </>
    );
};

export default WireTransfer;
