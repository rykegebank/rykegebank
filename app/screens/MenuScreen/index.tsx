import AppBar from '../../components/GenericAppBar';
import { Strings } from '../../constants'

const MenuScreen = () => {
    return (
        <>
            <AppBar
                title={Strings.menu}
                showBackButton={false}
            />
        </>
    );
};

export default MenuScreen;
