# Common Issues

If you get and error containing `Error: error:0308010C:digital envelope routines::unsupported` you'll need to either downgrade to node v14 or set `NODE_OPTIONS=--openssl-legacy-provider`.