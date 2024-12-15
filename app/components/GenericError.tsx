import { Text, TextStyle, ViewStyle } from "react-native";

interface GenericErrorProps extends TextStyle {
  message: string;
}

const GenericError = ({ message, ...props }: GenericErrorProps) => (
  <Text style={{ color: "red", marginBottom: 5, ...props }}>{message}</Text>
);

export default GenericError;
