## Wallet Mobile

### 打包

#### Android

```bash
cd android && ./gradlew assembleDebug -PappName=WalletDebug -PpackageName=net.cctv3.wallet.debug && cd ..
cd android && ./gradlew assembleRelease -PappName=WalletRelease -PpackageName=net.cctv3.wallet.release && cd ..
```
