import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    // await this.initPushNotifications();
    await this.requestNotificationPermissions();
    await this.scheduleDailyNotification();
  }

  private async initPushNotifications() {
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive === 'granted') {
      await PushNotifications.register();
    }

  }

  private async requestNotificationPermissions() {
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === 'granted') {
      console.log('Notification permissions granted');
    } else {
      console.error('Notification permissions not granted');
    }
  }

  private async scheduleDailyNotification() {
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'GameSwipe Reminder',
          body: 'Start Swiping ;)',
          schedule: {
            repeats: true,
            on: {
              hour: 17,
              minute: 0,
            },
          },
          extra: {
            data: 'Swipe Notification',
          },
        },
      ],
    });

    console.log('Daily notification scheduled at 17:00');
  }
}
