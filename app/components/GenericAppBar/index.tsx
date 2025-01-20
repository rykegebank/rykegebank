import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Colors, Dimensions } from '../../constants';
import CustomText from '../../components/Texts/customText';

interface AppBarProps {
  title: string | React.ReactNode; // Title can be a string or any React element
  showBackButton?: boolean;
  onBackPress?: () => void;
  centerTitle?: boolean;
  backgroundColor?: string;
  actions?: React.ReactNode[]; // Array of custom action elements
  leading?: React.ReactNode; // Replaceable leading content
}

const AppBar: React.FC<AppBarProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  centerTitle = true,
  backgroundColor = Colors.primaryColor,
  actions = [],
  leading,
}) => {
  const navigation = useNavigation();

  const handleBackPress = (event: GestureResponderEvent) => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack(); // Default action
    }
  };

  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
      {leading ? (
        <View style={styles.leadingContainer}>{leading}</View>
      ) : (
        showBackButton && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={Colors.colorWhite} />
          </TouchableOpacity>
        )
      )}

      <View
        style={[
          styles.titleContainer,
          centerTitle
            ? { alignItems: 'center', justifyContent: 'center' }
            : { marginLeft: 40 },
        ]}
      >
        {typeof title === 'string' ? (
          <CustomText style={styles.title}>{title}</CustomText>
        ) : (
          title
        )}
      </View>

      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <View key={index} style={styles.action}>
            {action}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Dimensions.space15,
  },
  backButton: {
    position: 'absolute',
    left: Dimensions.space10,
    zIndex: 1,
  },
  leadingContainer: {
    position: 'absolute',
    left: Dimensions.space10,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: Colors.colorWhite,
    fontSize: Dimensions.extraLarge,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: Dimensions.space10,
    zIndex: 1,
  },
  action: {
    marginLeft: Dimensions.space10,
  },
});

export default AppBar;
