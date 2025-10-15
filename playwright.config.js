// @ts-check
import { defineConfig , devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
 retries: 1,
  //default timeout is 30 sec
  timeout : 60 * 1000 ,
  expect : {
    timeout : 60 * 1000,
  },

  reporter : 'html',
  
  use: {
    browserName : "chromium",
    //browserName : "firefox",
    headless : false,
    screenshot : 'on',
    trace : 'on',
  },

 });

