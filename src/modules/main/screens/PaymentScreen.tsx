import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyles} from '../../../../styles/main.styles';
import TextBlock from '../../../core/components/TextBlock';
import Modal from 'react-native-modal';
import {MainButton} from '../../../core/components/MainButton';
import IconWarn from '../../../../assets/svg/icon-warn.svg';
import PaymentStatus from '../../../core/components/PaymentStatus';
import {transactionsService, walletService} from '../../../core/services';
import {ITransaction} from '../../../core/models/ITransaction';
import {useNavigation} from '@react-navigation/native';
import {NAV_TYPE} from '../../../core/models/ScreenTypes';
import {useDispatch} from 'react-redux';
import {addNotificationItem, setPayClickCount, setWalletBalance} from '../../../store/info.slice';
import dayjs from 'dayjs';
import { initialTransactions } from './DashboardScreen';

const PaymentScreen = ({route}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [operationInProgress, setOperationInProgress] = useState(false);
  const [showStatusInfo, setShowStatusInfo] = useState(false);
  const [operationSucceeded, setOperationSucceeded] = useState(false);
  const [transactionDetails, setTransactionDetails] =
    useState<ITransaction | null>(null);

  const {goBack} = useNavigation<NAV_TYPE>();

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(route.params);
    const {transactionId} = route.params;
    if(transactionId && transactionId >= 1) {
      setShowStatusInfo(true)
      setOperationSucceeded(true);
      const [neededTransactinDetails] = initialTransactions.filter(el => el && el.id === transactionId);
      // @ts-ignore
      setTransactionDetails(neededTransactinDetails);
    }
  }, [route.params]);

  const handleTransactionConfirmed = async () => {
    setOperationInProgress(true);
    transactionsService
      .doTransaction()
      .then(resp => {
        setTransactionDetails(resp);
        setOperationSucceeded(true);
        dispatch(setPayClickCount(1));
        dispatch(
          addNotificationItem({
            id: 4,
            date: dayjs().valueOf(),
            title: 'New successfull transaction',
            text: 'Your have new transaction',
            isRead: false,
            merchant: true,
            icon: true,
          }),
        );
        walletService.getAccountResources('meow')
        .then(resp => {
          dispatch(setWalletBalance(resp.balance))
        })
      })
      .catch(err => {
        setOperationSucceeded(false);
      })
      .finally(() => {
        setShowStatusInfo(true);
        setShowAlert(false);
        setOperationInProgress(false);
      });
  };

  useEffect(() => {
    setShowAlert(true);
  }, []);

  return (
    <SafeAreaView style={{...mainStyles.container}}>
      <View style={{...mainStyles.content, paddingHorizontal: 0}}>
        <PaymentStatus
          details={transactionDetails}
          success={operationSucceeded}
          showStatusInfo={showStatusInfo}
        />

        {!route.params.transactionId && (
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

                  <Pressable
                    onPress={() => goBack()}
                    style={{paddingVertical: 2, borderWidth: 0, width: '60%'}}>
                    <Text
                      style={{fontSize: 16, opacity: 0.7, textAlign: 'center'}}>
                      Cancel
                    </Text>
                  </Pressable>
                </>
              )}
              {operationInProgress && <ActivityIndicator size={'large'} />}
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
