import { Dimensions, StyleSheet } from 'react-native';
import { Border, Color, FontFamily, FontSize, Margin } from '../../assets/static/globalStyles';
import { heightToDp, widthToDp } from '../../responsive/responsive';
function PreviousJobsStyles() {
    const styles = StyleSheet.create({

        previousJobs: {
            height: heightToDp(50),
            paddingBottom: 40
        },
        selectedJobs: {
            height: heightToDp(30),

            marginBottom: 10
        },
        frameParent: {
            padding: heightToDp(2),
            paddingBottom:heightToDp(15)
        },
        myJobs: {
            fontSize: heightToDp(2.8),
            fontWeight: "700",
            fontFamily: "Helvetica",
            color: "#000",
            paddingTop: 5,
            paddingBottom: 10
        },

        selected: {
            fontSize: heightToDp(2.3),
            letterSpacing: 2.4,
            fontWeight: "200",
            fontFamily: "Helvetica",
            color: "#5a2daf",
            paddingBottom: heightToDp(2),
        }


    });
    return styles;
}

export default PreviousJobsStyles;