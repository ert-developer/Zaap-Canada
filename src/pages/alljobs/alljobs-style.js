import { Dimensions, StyleSheet } from 'react-native';
import { Border, Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';
import { heightToDp,widthToDp } from '../../responsive/responsive';
function AllJobStyles() {
    const styles = StyleSheet.create({

        amountContainer: {
            flexDirection: "row"
        },
        bannerContainer: {
            position: "relative"
        },
        spotlightText: {
            position: "absolute",
            fontSize: heightToDp(0.8),
            color: "white",
            top: 8,
            left: 15,

        },
        spotlightBannerContainer: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: Border.br_8,
        },
        mainContainer: {
            marginBottom: heightToDp(1),
            paddingBottom: heightToDp(5),
            flex: 1,
        },
        rupeeIcon: {
            width: widthToDp(5),
            height: widthToDp(5),
            marginTop: heightToDp(0.6),
        },

        frameParent: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: widthToDp(3),
            marginBottom: heightToDp(0),
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: heightToDp(0.4),
            },
            shadowOpacity: 0.8,
            shadowRadius: 5,
            elevation: 5,
        },
        textContainer: {
            flex: 1,
            marginLeft: heightToDp(2),
            justifyContent: 'center',
        },
        name: {
            fontSize: heightToDp(2),
            fontWeight: '700',
            fontFamily: FontFamily.helvetica,
            color: Color.colorBlack,
        },
        within15Kms: {
            fontSize: heightToDp(1.5),
            fontWeight: '300',
            fontFamily: FontFamily.helvetica,
            color: Color.colorBlack,
            marginTop: heightToDp(0.2),
            flexWrap: 'wrap',
            width: 100,
        },
        text1: {
            fontSize: heightToDp(1.5),
            letterSpacing: 1,
            fontFamily: FontFamily.helvetica,
            color: Color.colorBlack,
            fontWeight: '300',
            marginTop: heightToDp(0.5),
        },
        amountContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
        },
        DateandRadius: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        AgoText: {
            fontSize: heightToDp(1.3),
            fontFamily: FontFamily.helvetica,
            color: '#949494',
            marginRight: heightToDp(2.5),
            marginTop: heightToDp(3),
        },
        backButtonContainer: {
            flexDirection: "row",
            marginLeft: heightToDp(3),
            alignItems: "center",
            marginTop: heightToDp(0.5)
        },

        pageTitle: {
            fontSize: heightToDp(3),
            color: "black",
            marginLeft: heightToDp(1)
        },

    });
    return styles;
}

export default AllJobStyles;
