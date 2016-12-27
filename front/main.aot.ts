import './polyfills';

import { platformBrowser } from '@angular/platform-browser';
// import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../_tmp_aot/front/app/app.module.ngfactory';

// if(prod) enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
