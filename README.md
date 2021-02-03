A quick script to monitor deployed sites.

Copy `config.sample.js` to `config.js`.

Update config file with your email settings and your site info.

I run this on my server with this cron command:
```
*/5 * * * * /root/.nvm/versions/node/v12.20.0/bin/node /root/ci/index.js
```
