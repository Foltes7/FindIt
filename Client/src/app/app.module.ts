import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { UserStore } from './core/userState/user-state';
import { environment } from 'src/environments/environment';
import { ProfileStore } from './profile/profileState/profile-state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ContentModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([ UserStore, ProfileStore], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: UserStore
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
