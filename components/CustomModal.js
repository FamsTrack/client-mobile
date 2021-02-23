import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

export default function CustomModal (props) {
  const [visible, setVisible] = useState(true)

  const handlePress = () => {
    setVisible(false)
    props.setVisible()
  }

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => handlePress()}>
        <Card disabled={true}>
          <Text>{props.text}</Text>
          <Button
            style={styles.dismissButton}
            onPress={() => handlePress()}>
            DISMISS
            </Button>
        </Card>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  dismissButton: {
    marginTop: 10
  },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
