import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import TextBlock from '../../../core/components/TextBlock';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {MainButton} from '../../../core/components/MainButton';
import IconWarn from '../../../../assets/svg/icon-warn.svg';
import PaymentStatus from '../../../core/components/PaymentStatus';

const PaymentScreen = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [operationInProgress, setOperationInProgress] = useState(false);
  const [showStatusInfo, setShowStatusInfo] = useState(false);
  const [operationSucceeded, setOperationSucceeded] = useState(false)

  const handleTransactionConfirmed = () => {
    setOperationInProgress(true);
    setTimeout(() => {
      setShowAlert(false);
      setOperationSucceeded(true);
      setShowStatusInfo(true);
    }, 750);
  };

  useEffect(() => {
    setShowAlert(true); 
  }, []);

  return (
    <SafeAreaView style={{...mainStyles.container}}>
      <View style={{...mainStyles.content, paddingHorizontal: 0}}>
        <PaymentStatus success={operationSucceeded} showStatusInfo={showStatusInfo}/>
        <Modal
          isVisible={showAlert}
          animationIn={'fadeInUp'}
          animationOut={'fadeOutDown'}
          animationInTiming={800}
          animationOutTiming={350}>
          <View
            style={{
              width: Dimensions.get('screen').width - 40,
              height: 280,
              borderRadius: 10,
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              padding: 20,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            {!operationInProgress && (
              <>
                <IconWarn width={42} height={42} style={{marginBottom: 10}} />
                <TextBlock
                  variant={'title'}
                  alignment={'center'}
                  style={{marginBottom: 0}}>
                  Warning!
                </TextBlock>
                <TextBlock
                  variant={'body'}
                  style={{width: '80%', margin: 20, opacity: 0.75}}
                  alignment={'center'}>
                  By granting this{' '}
                  <Text style={{fontWeight: '600'}}>permission</Text>, youre
                  allowing AirPay to withdraw your tokens.{' '}
                </TextBlock>

                <MainButton
                  title={"Yes, I'm sure"}
                  onPress={handleTransactionConfirmed}
                />
              </>
            )}
            {operationInProgress && <ActivityIndicator size={'large'} />}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
