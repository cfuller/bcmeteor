#!/bin/sh

export BC_CLIENT_ID=ecedc75d-2bfb-4929-ad37-35469c704588
export BC_CLIENT_SECRET='dU_j1_DVz6NsBEGTPHLgygiiJmJ2L4wPJOgMsAaCSCxM9wx0UlccGOGMSkk2ofKiWQGJP6qFX7ZPuIzz9U-qrg'
export BC_ACCOUNT_ID=4365621380001
export DROPBOX_KEY='rlmdv50j8i3gxoc'
export DROPBOX_SECRET='cg15ywmatefe659'
export DROPBOX_TOKEN='kzYCz3JzSvMAAAAAAAAEQJu1QzEg7L5mtyFu6KLiKpEUSIZ5s5xFHDsYjB4zMtZ4'

compass watch --css-dir=client/css --sass-dir=public/css/sass &
meteor
