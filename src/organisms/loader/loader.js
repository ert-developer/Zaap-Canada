import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Color} from '../../assets/static/globalStyles';

export const TransparentLoader = ({visible}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles1.container}>
        <View style={styles1.loader}>
          <ActivityIndicator size="large" color={Color.colorIndigo} />
        </View>
      </View>
    </Modal>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loader: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
