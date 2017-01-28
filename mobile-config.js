// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.meteor.saphari.app',
  name: 'Saphari',
  description: 'Easy ride share application',
  author: 'Naveen Chandupatla',
  email: 'nkchandupatla@gmail.com',
  version: "0.0.1"
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'icons/android/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'icons/android/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'icons/android/mipmap-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'icons/android/mipmap-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'icons/android/mipmap-xxxhdpi/ic_launcher.png'  
});
App.launchScreens({
  'android_mdpi_portrait': 'icons/android/playstore-icon.png',
  'android_mdpi_landscape': 'icons/android/playstore-icon.png',
  'android_hdpi_portrait': 'icons/android/playstore-icon.png',
  'android_hdpi_landscape': 'icons/android/playstore-icon.png',
  'android_xhdpi_portrait': 'icons/android/playstore-icon.png',
  'android_xhdpi_landscape': 'icons/android/playstore-icon.png',
  'android_xxhdpi_portrait': 'icons/android/playstore-icon.png',
  'android_xxhdpi_landscape': 'icons/android/playstore-icon.png'
  
});
App.accessRule("*");
// Set PhoneGap/Cordova preferences
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
//Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '362645497449103',
  API_KEY: '6d46922889eaf69dc4753273103e8e7b'
});
// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);