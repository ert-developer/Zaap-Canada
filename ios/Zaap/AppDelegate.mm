#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import "AppDelegate.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Configure Firebase
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  // Request notification permission
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert + UNAuthorizationOptionBadge + UNAuthorizationOptionSound)
                         completionHandler:^(BOOL granted, NSError * _Nullable error) {
       if (granted) {
           // Register for remote notifications if permission is granted
           [[UIApplication sharedApplication] registerForRemoteNotifications];
       }
   }];

  self.moduleName = @"Zaap";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// Handle device token registration
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSString *deviceTokenString = [deviceToken description];
    NSLog(@"Device Token: %@", deviceTokenString);
    // Send device token to Firebase
    [FIRMessaging messaging].APNSToken = deviceToken;
}

// Handle registration failure
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"Failed to register for notifications: %@", error.localizedDescription);
}

// Handle foreground push notifications
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    NSLog(@"Received remote notification in foreground: %@", userInfo);
    completionHandler(UIBackgroundFetchResultNewData);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end