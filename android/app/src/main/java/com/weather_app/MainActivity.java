package com.weather_app;

import com.facebook.react.ReactActivity;

import android.app.NotificationManager;
import android.content.Context;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Weather_App";
  }

  @Override
  public void onResume() {
    super.onResume();
    NotificationManager nMgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    nMgr.cancelAll();
  }
}
