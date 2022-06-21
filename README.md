# daopanel connect

A [Chrome extension](https://chrome.google.com/webstore/category/extensions?hl=en) that links Twitter usernames to [daopanel chat](https://daopanel.chat)
conversations

# Example

![](demo.gif)

---

[daopanel chat](https://daopanel.chat/) is powered by [XMTP](https://xmtp.com/)

# Github Actions
daopanel connect uses github actions to package and publish to the Chrome Web Store. Deployments will
only happen on the `main` branch. Chrome Web Store also needs to review deployments before they
are published which can take a few days.
**Manually increment the version in `manifest.json` or the deployment will fail**