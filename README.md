# vitcomebank

## VietQR reader integration

QR scanning uses the [apivitqr](https://github.com/ming9919-beep/apivitqr) service for payload and image parsing. The frontend proxies requests to `http://127.0.0.1:8000` by default; set `VIETQR_READER_BASE_URL` in `.env.local` to use another hosted instance.

The API source is cloned into `apivitqr`. Install its dependencies once from the workspace root:

```powershell
Set-Location .\apivitqr
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

The API credentials are stored in the ignored `apivitqr\.env.local` file and loaded by `.\apivitqr\start-api.ps1`. Start that script in a separate terminal alongside the Vite frontend. The service can read a name directly from QR field `59`; account-based lookup uses the configured server-side credentials. Scanning still falls back to local QR parsing when the API is unavailable.

## Local demo sign-in

The development login and payment-password fields read `VITE_DEMO_USERNAME`, `VITE_DEMO_PHONE`, `VITE_DEMO_LOGIN_PASSWORD`, and `VITE_DEMO_PAYMENT_PASSWORD` from the ignored `.env.development.local` file. These are client-side demo checks, not production authentication; Vite exposes `VITE_` variables to the browser bundle. Never use real banking credentials. Payment password changes in the demo are saved to this browser's local storage.