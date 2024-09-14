import { Dimensions, StyleSheet } from 'react-native';
import { Border, Color, FontFamily, FontSize, Margin } from '../../assets/static/globalStyles';
import { heightToDp, widthToDp } from '../../responsive/responsive';
function ProviderPaymentStyles() {
    const styles = StyleSheet.create({
        button: {
           width:widthToDp(30),
           backgroundColor:"red",
           padding:heightToDp(1)
          },
        image: {
            width: "100%",
            height: "30%"
        },
        jobTitle: {
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Helvetica",
            color: "#000",
        },
        jobDescriptionContainer: {
            // borderColor:"red",red
            // borderWidth:1,
            marginTop: heightToDp(3.5)
        },
        logoAndJobDesciption: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
        },
        rupeeLogoandNumbers: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
        },
        budgetContainer: {
            // borderColor:"red",
            // borderWidth:1,
            marginTop: heightToDp(3.5)


        },
        logoAndBudget: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
        },
        getDirectionsButton: {
            width: heightToDp(17),
            padding: heightToDp(1.3),
            backgroundColor: "#ffc122",
            borderRadius: heightToDp(7),
            fontSize: heightToDp(2),
            borderColor: "black",
            color: "black",
            marginTop: 3,
            borderWidth: 2,



        },

        directionsContainer: {
            // borderColor:"red",
            // borderWidth:1,
            marginTop: heightToDp(4)


        },
        logoAndWhere: {
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
        },
        textContainer: {
            padding: 30
        },
        postedbynameAndLogo: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,

        },

        customHeadingStyle: {
            fontSize: heightToDp(2),
            letterSpacing: 1.5,
            fontWeight: "700",
            fontFamily: "Helvetica",
            color: "#5a2daf",
        },
        CustomtextStyle: {
            fontSize: heightToDp(2),
            fontFamily: "Helvetica",
            color: "#000",
            fontWeight: 600,
            marginTop: 9,

        },
        profileNameContainer: {
            marginTop: heightToDp(3.5)

        }

    });
    return styles;
}
export default ProviderPaymentStyles