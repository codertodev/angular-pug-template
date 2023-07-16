import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ApiAdvisorProvider } from 'src/app/share/core/api/api-advisor.provider';
import { DataSourceProvider } from 'src/app/share/core/data-source/data-source-provider.service';
import { evalField } from 'src/app/share/core/utils/json.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = '';

  constructor(
    private apiProvider: ApiAdvisorProvider,
    private dataSourceProvider: DataSourceProvider,
    private iconRegistry: MatIconRegistry
  ) {
    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');

    const apiDef = require('src/app/settings/api.yml');
    const dataSourceDef = require('src/app/settings/data-sources.yml');

    this.apiProvider.servers = apiDef.servers;
    Object.entries(apiDef.servers).forEach(([key, value]) => {
      this.apiProvider.servers[key] = evalField(value as string, environment);
    });

    this.apiProvider.add(apiDef.advisors);
    this.dataSourceProvider.addDescriptor('', dataSourceDef.dataSources);
  }
}
