// package com.zaap_canada;

// import androidx.appcompat.app.AppCompatActivity;
// import android.app.Application;
// import android.content.Intent;
// import android.os.Bundle;
// import android.os.Handler;
// import android.view.WindowManager;

// import com.facebook.react.PackageList;
// import com.facebook.react.ReactApplication;
// import com.facebook.react.ReactNativeHost;
// import com.facebook.react.ReactPackage;
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
// import com.facebook.react.defaults.DefaultReactNativeHost;
// import com.facebook.soloader.SoLoader;
// import java.util.List;

// public class SplashActivity extends AppCompatActivity {

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);
//         setContentView(R.layout.launch_screen);

//         new Handler().postDelayed(new Runnable() {
//             public void run() {
//                 Intent intent = new Intent( this,MainActivity.class );
//                 startActivity(intent);
//                 finish();
//             }
//         }, 6000);
//     }
// }

package com.zaap_canada;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    private static final String PREFS_NAME = "MyPrefsFile";
    private static final String SPLASH_SHOWN_KEY = "isSplashShown";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Check if the splash screen has been shown before
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        boolean isSplashShown = prefs.getBoolean(SPLASH_SHOWN_KEY, false);

        if (!isSplashShown) {
            // If splash screen hasn't been shown, show it and mark it as shown
            setContentView(R.layout.launch_screen);
            // Save the flag indicating that the splash screen has been shown
            SharedPreferences.Editor editor = prefs.edit();
            editor.putBoolean(SPLASH_SHOWN_KEY, true);
            editor.apply();

            // Wait for a short delay before launching MainActivity
            new android.os.Handler().postDelayed(
                new Runnable() {
                    public void run() {
                        launchMainActivity();
                    }
                },
                3000 // Adjust the delay time as needed
            );
        } else {
            // If splash screen has been shown before, directly launch MainActivity
            launchMainActivity();
        }
    }

    private void launchMainActivity() {
        Intent intent = new Intent(SplashActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}






