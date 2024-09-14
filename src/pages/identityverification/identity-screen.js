import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Color} from '../../assets/static/globalStyles';
import {InformationIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {IdentityVerificationSvg} from '../../assets/svgImage/indentityverification';
import CustomButton from '../../atoms/button/buttonComponent';
import CustomText from '../../atoms/text/textComponent';
import {heightToDp, widthArea, widthToDp} from '../../responsive/responsive';
const IdentityVerificationScreen = ({OpenServiceProvideForm, isLoading}) => {
  return (
    <SafeAreaView style={styles.safeAreaContent}>
      <ScrollView>
        {/* <View style={styles.horizontalLine} /> */}
        <View style={styles.identityMainContainer}>
          {/* <View style={styles.svg}> */}
          <IdentityVerificationSvg style={styles.svgStyles} />
          {/* </View> */}
          <View style={styles.svgTextContainer}>
            <CustomText text={'Verify your identity to'} style={styles.svgText} />
            <View style={styles.identityTextCOntainer}>
              <CustomText text={'begin working with'} style={styles.svgText} />
              <CustomText text={' Zaap!'} style={styles.zaapText} />
            </View>
            <View style={styles.encryptedcontainer}>
              <Text style={styles.subSvgText}>A few Minutes is all it takes...</Text>
              <Text style={styles.subSvgText}>Your Data is encrypted and fully secured.</Text>
            </View>
          </View>

          <View style={styles.statuslineContainer}>
            <View style={styles.statusLine}>
              <View style={styles.main}>
                <View style={styles.container}>
                  {/* Circle 1 */}
                  <View style={styles.circle} />

                  {/* Vertical Line */}
                  <View style={styles.verticalLine} />

                  {/* Circle 2 */}
                  <View style={styles.circle} />

                  {/* Vertical Line */}
                  <View style={styles.verticalLine} />

                  {/* Circle 3 */}
                  <View style={styles.circle} />
                </View>
                <View style={styles.text}>
                  <View>
                    <CustomText text={'Personal Details'} style={styles.text1} />
                    <Text style={styles.secondText}>Provide a few details to get started</Text>
                  </View>
                  <View style={styles.bankdetails}>
                    <CustomText text={'Bank Details'} style={styles.text1} />
                    <Text style={styles.secondText}>
                      Requred for your direct deposit all your earnings to the choosen accounss
                    </Text>
                  </View>
                  <View style={styles.govtid}>
                    <CustomText text={'Government ID'} style={[styles.text1]} />
                    <Text style={styles.secondText}>Government Issued identification document</Text>
                  </View>
                </View>
              </View>

              <View style={styles.info}>
                <InformationIcon />
                <View>
                  <Text style={styles.infotext}>
                    To enhance user safety, identity verification is crucial for preventing fraud, building trust, and
                    complting with regulatory standards
                  </Text>
                </View>
              </View>
            </View>
            <CustomButton
              title={isLoading ? <ActivityIndicator size={20} color={'white'} /> : 'CONTINUE'}
              style={styles.startVerificationButton}
              textStyle={styles.verificationttext}
              onPress={OpenServiceProvideForm}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IdentityVerificationScreen;
const styles = StyleSheet.create({
  // govtid:{
  //  marginTop:heightToDp(2)
  // },

  identityMainContainer: {
    borderWidth: 1,
    borderColor: Color.colorSilver,
    marginHorizontal: widthToDp(2),
    borderRadius: widthToDp(5),
    marginTop: widthToDp(5),
    backgroundColor: '#f7f7f7',
  },

  infotext: {
    width: widthToDp(60),
    fontSize: widthToDp(3),
    // padding: widthToDp(5),
  },
  info: {
    flexDirection: 'row',
    marginTop: heightToDp(3),
    gap: widthToDp(3),
    textAlign: 'center',
  },
  verificationttext: {
    fontSize: heightToDp(2),
    letterSpacing: 0.3,
  },
  bankdetails: {
    marginTop: heightToDp(1),
  },
  text1: {
    color: 'black',
  },
  secondText: {
    fontSize: heightToDp(1.5),
    // width
  },

  text: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // borderColor: 'yellow',
    // borderWidth: 1,
    // width: widthToDp(59),
  },
  main: {
    flexDirection: 'row',
    gap: 10,

    //  borderColor:"pink",
    //  borderWidth:1,
    height: heightToDp(22),
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    // marginHorizontal: heightToDp(1),
  },
  verticalLine: {
    width: 2,
    height: 50,
    backgroundColor: 'grey',
    borderStyle: 'dashed',
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  VerticalLine: {
    width: 2,
    height: 90,
    backgroundColor: 'red',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  safeAreaContent: {
    // padding:widthArea(20)
  },
  topHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthToDp(2),
  },
  identityVerificationTexte: {
    fontWeight: '800',
    fontSize: heightToDp(2.6),
    color: '#464183',
  },

  getHelpText: {
    fontFamily: 'Helvetica',
    color: '#472a75',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: widthArea(18),
  },
  horizontalLine: {
    width: '100%',
    height: widthToDp(0.2),
    backgroundColor: 'lightgray',
  },
  svg: {
    // borderColor:"red",
    // borderWidth:6,
    height: heightToDp(20),
    width: widthToDp(60),
  },
  svgStyles: {
    marginTop: widthToDp(3),
    marginLeft: widthToDp(3),
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
  },
  svgTextContainer: {
    paddingLeft: widthToDp(14),
    paddingTop: heightToDp(2),
  },
  svgText: {
    fontSize: heightToDp(2.5),
    color: 'black',
    letterSpacing: widthToDp(0.2),
    fontFamily: 'Helvetica',
    fontWeight: '700',
  },

  identityTextCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: heightToDp(0.5),
  },

  zaapText: {
    color: '#464183',
    fontSize: heightToDp(3),
  },

  encryptedcontainer: {
    marginTop: heightToDp(1),
  },
  statuslineContainer: {
    padding: heightToDp(4),
    // borderColor:"orange",
    // borderWidth:3
  },
  statusLine: {
    backgroundColor: 'lightgray',
    width: '100%',
    padding: heightToDp(4),
    borderRadius: widthToDp(3),
    // height: heightToDp(60),
    // borderColor:"red",
    // borderWidth:2
  },

  startVerificationButton: {
    padding: heightToDp(1.5),
    backgroundColor: '#464183',
    borderRadius: heightToDp(2),
    marginTop: heightToDp(2),
  },
  subSvgText: {
    fontSize: heightToDp(1.8),
  },
});
