COLOR='\033[38;2;2;106;181m'
NC='\033[0m'

# echo "*************************************"
# echo "   Migrating to the eKYC package"
# echo "*************************************"
# echo ""
# echo "â–¸ ${COLOR}Creating temporary folder (if not exists).${NC}"
# echo ""

# create temp folder and download the ekyc files that do not fit the repo
# rm -rf "ekycTemp"
# mkdir -p "ekycTemp"

# echo "â–¸ ${COLOR}Downloading library zip...${NC}"

# (cd ekycTemp/ && curl -L "http://dl.dropboxusercontent.com/s/av2mv6royujeyvg/ekyc.zip?dl=0" -o "ekyc.zip")

# echo ""
# echo "â— ${COLOR}Download completed${NC}"
# echo ""


# copy the files into rn-ekyc/ios
# echo "â–¸ ${COLOR}Copying files to eKYC package folder${NC}"
# echo ""
# rsync -a "ekycTemp/ekyc/" "natives/react-native-ekyc/ios"

# delete the one inside the iOS folder
# echo "â–¸ ${COLOR}Removing legacy files from iOS project${NC}"
# rm -rf ios/eKYC ios/eKYC.h ios/eKYC.m ios/EzBio.h ios/EzBio.m ios/LibSodiumReact.h ios/LibSodiumReact.m ios/libRSAMobileSDK.a ios/libRSAMobileSDKSimulator.a ios/MobileAPI.h ios/RSAReactNative.h ios/RSAReactNative.m
# echo ""

# once done, delete the temp folder and lock files
echo "â–¸ ${COLOR}Deleting node modules and lock files, and clean up.${NC}"
rm -rf ios/build ios/Pods ios/Podfile.lock node_modules ekycTemp
echo ""

# Remove legacy files from Android project
echo "â–¸ ${COLOR}Removing legacy files from Android project${NC}"
rm -rf android/build android/app/build android/app/libs/androidArchLifecycleRuntime-2.3.1.jar
echo ""



# install packages
echo "â–¸ ${COLOR}Installing packages${NC}"
npm i --legacy-peer-deps
echo ""

# install PODS
echo "â–¸ ${COLOR}Installing Pods${NC}"
npx pod-install
echo ""

echo "â— ${COLOR}Finish.${NC}"
